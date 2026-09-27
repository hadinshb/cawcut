#!/usr/bin/env node
// Read-only baseline checks. No package installation, network calls or project writes.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const projectArg = process.argv.indexOf('--project');
if (projectArg >= 0 && (!process.argv[projectArg + 1] || process.argv[projectArg + 1].startsWith('--'))) {
  process.stderr.write('Usage: node scripts/doctor.mjs [--project <folder>] [--json]\n');
  process.exit(2);
}
const root = projectArg >= 0 ? path.resolve(process.argv[projectArg + 1]) : path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const rows = [];
const add = (component, status, evidence) => rows.push({ component, status, evidence });
const exists = p => fs.existsSync(p);
const readJson = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const clean = s => String(s).replace(/[|\r\n]/g, ' ').slice(0, 240);
const run = (bin, args) => {
  const r = spawnSync(bin, args, { encoding: 'utf8', timeout: 8000, env: process.env });
  return r.status === 0 ? (r.stdout || r.stderr).trim().split('\n')[0] : null;
};
const locate = name => {
  const dirs = [...(process.env.PATH || '').split(path.delimiter), '/opt/homebrew/bin', '/usr/local/bin', '/usr/bin'];
  for (const d of dirs) {
    const p = path.join(d, name);
    try { fs.accessSync(p, fs.constants.X_OK); return p; } catch {}
  }
  return null;
};
add('Platform', process.platform === 'darwin' ? 'READY' : 'FAILED', `${process.platform}/${process.arch}`);
add('Node', 'READY', process.version);
for (const [name, args] of [['brew', ['--version']], ['ffmpeg', ['-version']], ['ffprobe', ['-version']], ['python3', ['--version']], ['uv', ['--version']], ['uvx', ['--version']]]) {
  const bin = locate(name);
  const version = bin && run(bin, args);
  add(name, !bin ? 'MISSING' : version ? 'READY' : 'FAILED', version || (bin ? 'Executable found; version check failed' : 'Not on PATH or standard locations'));
}
const apps = ['/Applications/Final Cut Pro.app', path.join(os.homedir(), 'Applications/Final Cut Pro.app')];
const fcp = apps.find(exists);
const fcpVersion = fcp && run('/usr/libexec/PlistBuddy', ['-c', 'Print :CFBundleShortVersionString', path.join(fcp, 'Contents/Info.plist')]);
add('Final Cut Pro', fcp ? 'READY' : 'MISSING', fcp ? `${fcpVersion || 'Version unverified'}; app found (import not tested)` : 'Install/licence is a user prerequisite');
try {
  const cfg = readJson(path.join(root, '.mcp.json'));
  const server = cfg.mcpServers?.fcpxml;
  add('Final Cut MCP config', server ? 'CONFIGURED' : 'MISSING', server ? `${server.command}; session connection not tested` : 'No fcpxml server entry');
  if (server) {
    const bin = path.isAbsolute(server.command || '') ? server.command : locate(server.command || '');
    add('MCP executable', bin && exists(bin) ? 'READY' : 'MISSING', bin || 'Resolve executable on this Mac');
    add('MCP search root', server.env?.FCP_PROJECTS_DIR === root ? 'CONFIGURED' : 'UNVERIFIED', server.env?.FCP_PROJECTS_DIR === root ? 'Matches this folder; not a security sandbox' : 'Missing or points to a different folder');
  }
} catch (e) { add('Final Cut MCP config', exists(path.join(root, '.mcp.json')) ? 'FAILED' : 'MISSING', e.code === 'ENOENT' ? 'No .mcp.json' : e.message); }
const skillRoot = path.join(root, '.claude/skills');
const expected = ['hyperframes', 'hyperframes-core', 'hyperframes-cli', 'hyperframes-creative', 'hyperframes-animation', 'hyperframes-keyframes', 'hyperframes-registry', 'hyperframes-studio', 'hyperframes-audio', 'media-use', 'motion-graphics'];
const missing = expected.filter(n => !exists(path.join(skillRoot, n, 'SKILL.md')));
add('HyperFrames skill files', missing.length ? 'MISSING' : 'CONFIGURED', missing.length ? missing.join(', ') : '11 expected files present; session loading not tested');
const videoRoot = path.join(root, 'videos');
const pins = [];
if (exists(videoRoot)) for (const dir of fs.readdirSync(videoRoot)) {
  const pkg = path.join(videoRoot, dir, 'package.json');
  if (!exists(pkg)) continue;
  try {
    const json = readJson(pkg);
    const m = JSON.stringify(json.scripts || {}).match(/hyperframes@([0-9.]+)/);
    if (m) pins.push(`${dir}: ${m[1]}`);
  } catch {}
}
add('HyperFrames project pins', pins.length ? 'CONFIGURED' : 'UNVERIFIED', pins.join('; ') || 'No existing pinned project; setup needed');
add('Render + alpha smoke test', 'UNVERIFIED', 'Run Set up Cawcut; existing output alone is not a fresh test');
add('Local transcription', 'UNVERIFIED', 'Verify Python imports and local model; do not download during check');
add('Live MCP session', 'UNVERIFIED', 'Claude must call a read-only MCP tool in the active session');
if (process.argv.includes('--json')) process.stdout.write(JSON.stringify({ project: root, rows }, null, 2) + '\n');
else {
  process.stdout.write('| Component | Status | Evidence / next step |\n|---|---|---|\n');
  for (const r of rows) process.stdout.write(`| ${clean(r.component)} | ${r.status} | ${clean(r.evidence)} |\n`);
  process.stdout.write('\nNext: ask Claude to verify the live session and run Set up Cawcut for missing or unverified items.\n');
}
