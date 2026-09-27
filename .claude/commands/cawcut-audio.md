---
description: Polish dialogue using only native Final Cut Voice Isolation, Loudness and Volume
argument-hint: [project name or FCPXML path]
---

Read root CLAUDE.md and docs/native-audio.md. Input: $ARGUMENTS.

## Strict scope

Improve the chosen project's dialogue using ONLY Final Cut Pro's native Audio Inspector controls:
- Voice Isolation: enabled; tune Amount.
- Loudness: enabled; tune both Amount and Uniformity.
- Volume: tune gain in dB, preserving existing intentional automation.

Do NOT process the audio with ffmpeg filters, Python DSP, HyperFrames mixing, external denoisers, paid APIs, EQ, Noise Removal, Hum Removal, compressor/limiter effects or added plug-ins. Read-only measurement with local tools is allowed. The goal is natural, clean, intelligible speech, not a guaranteed studio-microphone transformation.

## 1. Establish the real input

Identify the currently intended Library, event, project and dialogue components. Ask which target only if ambiguous. Use the latest XML matching the actual current Final Cut edit, not an earlier generated cut that would lose graphics or manual changes. If current project state cannot be read/exported by available tools, explain how to export that project via File > Export XML. Do not overwrite or edit the Library database. Save a recoverable baseline before changing settings. Preserve source media, cuts, graphics, markers, duration, channel routing and synchronization.

Inspect existing processing and media provenance. If audio is already externally processed, disclose that these native controls cannot undo the baked-in processing; don't silently claim a native-only result or substitute different source audio. Do not stack new settings blindly on top of an existing chain. Report pre-existing unrelated effects and leave them unchanged unless the user authorizes removing them.

## 2. Check capability, never fabricate it

Inspect the actual MCP schemas and installed Final Cut XML DTD. Use a supported native setting action if available. If the bridge has no convenience action but the installed schema supports it, make a minimal reproducible XML change using the native elements, not a rendered substitute:
- `adjust-voiceIsolation amount="..."`
- `adjust-loudness amount="..." uniformity="..."`
- `adjust-volume amount="...dB"`

Audio enhancements belong to the correct audio component (`audio-channel-source` or `audio-role-source` as the actual timeline requires), not arbitrary children of an asset-clip. Follow the installed DTD's element order and preserve existing attributes. Volume has clip/component scope; choose a consistent placement and avoid unintentionally applying gain twice. Confirm percentage units/ranges from current documentation or an actual FCP export; don't infer them from a free-form CDATA declaration. Disabled/bypassed state and enabled checkbox must be verified after import, not assumed from an XML element's presence.

If supported UI control is genuinely available, use the native Inspector directly and verify readback. Don't claim access to the screen or native controls that this session does not have. Never install a UI bridge or patch Final Cut without a separate explicit request.

## 3. Tune to this recording

Choose representative quiet speech, loud speech, consonants/sibilants and a pause/noisy passage. Measure the starting signal where possible. Keep both requested enhancements enabled; use the lowest effective positive amount rather than disabling them or defaulting to maximum. Apply consistent settings across cuts from the same recording; adapt to another speaker/microphone only when justified.

Tune Voice Isolation first, comparing a few conservative strengths. Preserve voice body and consonants; reject warbling, metallic sound or chopped words. Then tune Loudness Amount and Uniformity for natural level consistency, rejecting pumping, raised room noise and flattened expression. Finally set Volume based on the PROCESSED signal as played/rendered by Final Cut, avoiding clipping and leaving sensible headroom. Source peak alone cannot predict the post-enhancement output. A modest dialogue peak range can be a starting guide, not a universal optimum or a platform requirement.

Explicitly assess steady air/hiss between words and during pauses. Distinguish background hiss from natural breaths and the consonants /s/, /f/ and /sh/; do not strip those away. Compare the same passages with several Voice Isolation strengths while holding Loudness and Volume fixed. Choose the lowest strength that makes the background unobtrusive without thinning or warbling the voice. Then re-check those pauses after enabling/tuning Loudness: it may raise residual air. Reduce Loudness Amount or Uniformity if necessary before pushing isolation harder, keeping the enhancement enabled. Set final Volume last and re-check the complete native result. Aim for unobtrusive background, not artificial absolute silence. If the three allowed controls cannot sufficiently reduce the noise without harming speech, report that trade-off; don't add Noise Removal, a gate or an external denoiser silently.

Do not assign one universal preset to all users. If you cannot listen to FCP-processed candidates, present clearly labelled trial values, ask for the user's listening comparison, and stop short of calling them optimized. Candidate quality can only be assessed from real Final Cut playback or a native export; an XML check or ffmpeg proxy does not execute Apple's enhancement algorithms.

## 4. Delivery and proof

Prefer the same active project when a verified in-place route exists. If this bridge only reimports XML and therefore needs a new project/version, explain that before importing and obtain the user's choice; do not silently add projects or claim an in-place edit. Avoid importing a new project for every speculative candidate. UI/manual adjustment can audition settings in the existing project if programmatic audition is unavailable.

Validate the updated XML against the installed DTD and compare the timeline/media references to the baseline. Once delivered, verify in the native Audio Inspector that Voice Isolation and Loudness are checked and that the actual percentage and dB values match. Readback/export or user confirmation is required when Inspector access is unavailable.

Compare a representative native before/after at approximately matched listening loudness so "louder" is not mistaken for "better". Use a native Final Cut export for actual post-processing measurements when available. Do not report LUFS/true peak measured from an unprocessed/proxy file as output evidence. If export is manual, give a short specific instruction and report WAITING FOR NATIVE PLAYBACK/EXPORT rather than SUCCESS.

Save local `work/native-audio-report.md`: target, baseline path, native method used, Voice Isolation Amount, Loudness Amount, Loudness Uniformity, Volume dB, proof of enabled settings, audition feedback including residual hiss and voice artifacts, actual measurements if available and remaining manual steps. Report in a concise English table. Claim APPLIED only for confirmed settings, and LISTENING APPROVED only after the user's review. Preserve raw files and the baseline. Stop when the report and verified result (or exact blocking step) are delivered.
