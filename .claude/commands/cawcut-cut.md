---
description: Cut footage naturally and deliver a preview plus editable Final Cut timeline
argument-hint: <video path>
---

Read root CLAUDE.md. Input: $ARGUMENTS. If the source is absent/ambiguous, ask only which file; do not select an old test automatically. Inspect source metadata, record hash, and transcribe locally with word timestamps using actual supported tools. Correct naming in a separate transcript. Verify uncertain boundaries and partial takes against audio.

## Natural filler cleanup

Propose selective removal of distracting hesitation sounds such as "um", "uh", "erm", and prolonged "eee"/"اِ…"/"اُم…" in the recording's actual language. Remove an isolated or prolonged filler only when the surrounding speech joins naturally and meaning, emphasis and delivery are preserved. Do not remove every hesitation automatically, or delete meaningful words such as "so", "well", "like" or their equivalents just because they can be fillers. Preserve natural breaths, expressive pauses and brief conversational hesitations that support the speaker's rhythm. Do not mistake intended vowels or /s/, /f/, /sh/ consonants for filler sounds.

Transcription may omit these sounds or misplace their boundaries. Verify each proposed filler cut against the actual audio and frame-aligned edit points, using surrounding context rather than text-only matching or silence detection. If a filler overlaps a word, removal clips speech, or the join causes a distracting visual jump, keep it or flag it for the user's decision. Do not synthesize replacement speech, time-stretch it or use denoising to erase fillers. Include filler cuts in the same concise keep/remove table with source frame ranges and reasons; clearly flag uncertain cases. Wait for approval of the whole cut proposal before editing.

After approval: cut picture/audio together, retain meaningful breathing room, render a uniquely versioned preview and save exact frame mapping from source to edit. Check approved filler joins in playback for clipped consonants, clicks, abrupt rhythm and webcam jumps; ask the user to review playback. After pacing approval, build FCPXML referencing original media as separate clips; validate DTD, color/audio metadata and handles, import into a clearly named target Library/event/new project and verify presence. Keep preview and timeline audio treatment consistent or disclose differences. No graphics yet. English reports must name whether each operation used MCP or a fallback. Record timings and artifacts in work/.
