# Cawcut

A project-local workflow for Claude Code Desktop: check dependencies, install missing free tools, cut footage, build motion graphics, and deliver editable Final Cut Pro timelines.

## Quick start

1. Open this folder in Claude Desktop → **Code → Local**.
2. Send **Check setup** for a short English status table.
3. Send **Set up Cawcut** to install missing dependencies and verify the setup.
4. If needed, approve the project's MCP server and open a new Local Code session. Send **Set up Cawcut** again to finish the checks.
5. Add your recording to `source/` and send **Cut source/intro.mov**, using your actual filename.

No terminal typing is required from the user. Claude runs local commands and may request system permissions. Opening the folder alone does not install anything.

## Commands

| Request | Optional slash command | Result |
|---|---|---|
| Check setup | /cawcut-check | Read-only English readiness table |
| Set up Cawcut | /cawcut-setup | Missing tools installed, MCP configured and smoke tests run |
| Cut source/intro.mov | /cawcut-cut source/intro.mov | Removal proposal, preview and editable timeline |
| Add graphics to the approved intro | /cawcut-graphics | Frame-aware storyboard, overlays and new timeline version |
| Polish audio in the current project | /cawcut-audio | Native Final Cut Voice Isolation, Loudness and Volume |
| Make chapters from the final video | /cawcut-chapters | Final chapter timestamps and optional timeline markers |

Project-owned commands live in `.claude/commands/` and are included in this repository. If the app does not show a slash command, use the plain-English request: `CLAUDE.md` routes it to the same instructions.

## What setup installs and checks

- Checks macOS, Final Cut Pro, Homebrew, Node, ffmpeg/ffprobe, Python and uv.
- Installs missing free dependencies through existing Homebrew where needed.
- Generates a **local** `.mcp.json` for the Final Cut bridge with transcription support, resolves executable paths on the current Mac and preserves unrelated server entries.
- Tests MCP startup and protocol responses, then separately verifies a live tool call inside the active Code session. A successful subprocess is not proof of session connection.
- Installs HyperFrames core and motion-graphics skills **inside this project**, then verifies local video rendering and actual alpha transparency.
- Verifies local transcription dependencies and runs a speech test when source speech is available. If no speech file is provided, reports that accuracy is still unverified.
- Writes a local `work/setup-report.md` with versions, evidence, failures and any required restart.

Final Cut Pro, access to Claude Code local sessions, and Homebrew are user prerequisites. Existing subscriptions and licenses are not free. Setup does not buy software, enable paid APIs or reinstall working tools just to simulate a fresh computer.

## Included versus generated

Included: project instructions, original Cawcut commands, generic visual guidance and the read-only checker.

Generated locally and ignored by Git: `.mcp.json`, downloaded `.claude/skills/`, third-party skill locks, recordings, transcripts, cut lists, renders, per-video HTML projects, reports, dependencies and caches. These are installed or created by the workflow; do not distribute another user's local paths or footage.

The generated MCP file must use the current machine's executable and project paths. Never copy a previous machine's absolute paths. The `.claude` folder contains two different things: **our commands are shared; downloaded skills are not**.

## Files and review

| Folder | Purpose |
|---|---|
| source/ | Original recordings; media stays local and ignored by Git |
| work/ | Transcripts, cut lists and local reports |
| videos/ | Per-video editable graphics source |
| out/ | Rendered previews and graphics |
| docs/ | Reusable workflow guidance |
| scripts/ | Reusable helper code |

Original footage is preserved during editing. Review removal proposals and previews before committing to the edit. Final Cut timelines refer to separate source clips, while rendered graphics remain movable clips; changing graphic text may require re-rendering.

Graphic style, colors, typography and objects are chosen per request, not baked into the toolkit. Supply a brief or reference, for example: `Add two minimal blue callouts and a timeline animation; keep my webcam visible.` If you leave the style open, Claude inspects the footage and proposes a design before rendering; you do not need to specify every shape or hex code. See `docs/visual-direction.md`.

Validation is reported per run; configuration files alone do not prove readiness. A complete setup may require a restart and system permission clicks.

## Native audio polish

Send **Polish audio** to tune only Final Cut's native Voice Isolation, Loudness (Amount and Uniformity) and Volume. Both enhancements must be enabled; amounts are chosen for the current recording, not copied from a universal preset. The workflow does not substitute ffmpeg processing or third-party effects. Listening and final-level validation require native Final Cut playback/export. If the available bridge cannot update the open project, it explains the import limitation before proceeding. See `docs/native-audio.md`.
