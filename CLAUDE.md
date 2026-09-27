# Cawcut — local video editing with Claude Code Desktop

Read this file when working in this folder. Use the Desktop app's Code tab, Local environment. User-facing tables and progress are concise ENGLISH by default. Explain errors in plain language. Use another language if explicitly requested.

## Short requests

| Request | Workflow |
|---|---|
| `Check setup` or `/cawcut-check` | Read-only environment report; do not install |
| `Set up Cawcut` or `/cawcut-setup` | Install missing dependencies, configure locally, run smoke tests |
| `Cut <file>` or `/cawcut-cut <file>` | Transcript, removal proposal, preview, editable FCP timeline |
| `Add graphics` or `/cawcut-graphics` | Frame-aware storyboard, transparent overlays, new FCP version |
| `Polish audio` or `/cawcut-audio` | Native Final Cut Voice Isolation, Loudness and Volume only |
| `Make chapters` or `/cawcut-chapters` | Chapters from the final assembled video |

For plain-language requests, read the matching file in `.claude/commands/` and execute its workflow. This also works if slash commands are not displayed in Desktop. Opening this folder loads instructions but MUST NOT trigger installations on its own. Begin checking when the user requests it.

## Workspace

- Original footage: `source/` or an explicitly selected existing file. Never move or overwrite existing originals.
- Working transcripts, cuts, run notes: `work/`.
- Graphics sources: `videos/<unique-project>/`.
- Rendered outputs: `out/`; overlay assets: `out/graphics/`.
- Visual direction: `docs/visual-direction.md`. The current user's prompt/reference owns graphic style, palette, typography and requested objects. This toolkit has no fixed visual theme. If unspecified, inspect the footage and propose a coherent design for approval; users need not supply hex codes or design every object themselves.
- Ask for a source file if no current input is specified. Never assume a previous user's input or timeline.
- Resolve every path relative to THIS project root; no fixed user/home paths in newly generated portable configurations.

## Readiness and setup

Use `node scripts/doctor.mjs` for a baseline table if Node exists. If Node is absent, perform equivalent read-only checks yourself. Configured does not mean connected; installed does not mean smoke-tested. Use statuses READY, MISSING, CONFIGURED, UNVERIFIED, FAILED, NEEDS RESTART.

Do not run an installer during `Check setup`. For `Set up Cawcut`, installation of missing free local dependencies is authorized. Keep changes project-scoped where supported; preserve existing MCP entries and unrelated skills. Homebrew package installation is system-level: show that in the plan. Do not purchase software, enable paid APIs, uninstall existing software, reset global settings, or delete caches to simulate a fresh machine. Ask only for real credential/permission clicks or a material scope change. Retain working pins unless a required skill upgrade procedure applies; record any tested version change.

MCP and newly installed skills may need a fresh Local Code session and a trust approval. Report NEEDS RESTART rather than declaring full readiness. Resume setup in the new session. Final Cut itself and Homebrew are explicit user prerequisites; explain manual installation if absent rather than purchasing or running a privileged bootstrap silently.

## Editing rules

1. Preserve the source; hash before/after. Cut picture and sound together. Never flatten the approved preview into one source clip when generating an editable FCP timeline.
2. Word timestamps are estimates. Verify uncertain boundaries against audio, especially soft consonants and initial partial takes.
3. Keep the last COMPLETE repeated take by default; show a concise removal table and wait for cut approval. Preserve meaningful pauses; approximately 0.25–0.3 s between sentences is a starting point, not a rigid rule. Use fades only in non-speech space.
4. Keep raw transcription and corrected transcription separate. Correct Claude/Cloud spelling without fabricating timing precision. Save source-to-edited frame mapping for every cut.
5. Inspect actual transcription tool schemas: an action may require FCPXML rather than raw MP4. Either build a documented preliminary timeline or use the installed local transcription engine through a reproducible helper; label the method honestly. Never claim an MCP call if Python/ffmpeg did the work.
6. Before FCP import: validate XML, media references, frame rate and color metadata. Use a named target Library/event and new project version. If multiple Libraries are open and the target is unclear, ask for the target. Verify imported project presence; a successful Apple event alone is not proof.
7. Graphics: use final EDITED transcript timing. For Final Cut, prefer a transparent-compatible format such as ProRes 4444 MOV and measure actual alpha; black-background MP4 is opaque. An intentionally opaque graphic must be labelled as a takeover. Preserve original audio.
8. Connected-clip tools may require an asset already registered in XML resources. Inspect the schema and source if needed; use a documented minimal XML correction if unsupported. Check whether offsets are relative to the parent source time. Verify actual resulting frame placement, not only API success.
9. A proxy preview may omit alpha layers. Use a real composite render and ask the user to check Final Cut playback. Check whether audio fades in the preview also exist in the FCP timeline.
10. Re-check version-specific behavior. Log fallbacks and manual steps in `work/`, never call this a zero-human-edit workflow unless actually proved.
11. `Polish audio` has a strict native-only contract in `docs/native-audio.md`. Use only native Voice Isolation, Loudness and Volume, with both enhancements enabled. No external processing fallback. Validate against real Final Cut playback/export; no fixed "best" preset or guarantee of studio sound. Explain XML reimport/in-place limitations before delivery.

## Reporting

First show a short table, then one next action. On setup completion write `work/setup-report.md` with date, versions, configuration scope, smoke-test outputs and outstanding steps; do not mark unknown items READY. Editing runs record first output time and revision time separately. No decorative timers that pretend edited-video time equals real processing time. "$0 additional software/API cost" only when verified; existing subscriptions and licenses still cost money.
