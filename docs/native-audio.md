# Native Final Cut dialogue polish

Request: **Polish audio** or `/cawcut-audio [project name]`.

This workflow compares ONE passage in ONE audition reel, requests ONE native export, analyzes it and automatically delivers ONE new version of the original full project. It tunes only two native controls:

| Control | Adjustment | Aim |
|---|---|---|
| Voice Isolation | Enabled, recording-specific Amount | Reduce background noise without excessive speech damage |
| Volume | One gain stage in dB | Set a useful level with peak headroom |
| Loudness | OFF, not tuned | Outside this workflow |

It does not replace dialogue with an externally cleaned file. Extraction/decoding and measurement are allowed; external denoising, EQ, gates, compression, limiting, third-party effects and paid APIs are not. Volume scales speech and residual noise together; it does not flatten changing speech dynamics. These two controls cannot guarantee studio-microphone sound or repair baked-in clipping/processing.

## Normal workflow

1. Identify the actual current project, preserve a baseline and inspect linked dialogue/processing. Request a current XML only if the bridge cannot retrieve it. Preserve graphics, edits and other tracks.
2. Build one frame-accurate audition from a representative contiguous 10–15 second passage, repeated with labelled candidate settings. Usually seven candidates: an isolation-off reference, four isolation strengths sharing a safe gain, and two gain variants at a middle isolation strength. Loudness stays off. Candidate ranges adapt to the recording; they are not fixed best presets.
3. Import one clearly named audition project. The user exports its entire timeline as Audio Only WAV, preferably 48 kHz, to `out/<recording>/fcp-export/`. No individual exports or manual slider testing are normally needed.
4. Verify the native export against the saved candidate manifest. Measure speech loudness, true peak, pause noise and relative speech/consonant retention. Compare at matched speech levels in analysis, not simply by which is louder or quieter between words.
5. Select the lowest useful isolation before excessive suppression/diminishing returns, then calculate Volume from the processed signal, loudness target and peak ceiling. Deliver a new full project version with those settings automatically; keep the old project unchanged. If the target changed during the wait, refresh it first so recent work is preserved.
6. The user listens once to confirm naturalness. If measurements are inconclusive, ask for one listening choice rather than claiming a winner. Recommend one additional full-project native export for final QC, not one export per clip. The audition selects settings; full output verifies louder/quieter/noisier regions and the final peak/loudness. Full-project QC stays UNVERIFIED without this evidence; make the request necessary if clipping/artifacts are suspected.

If full-project QC finds a real level mismatch, propose conservative overall or region-level Volume corrections. Keep isolation consistent unless noise/microphone conditions genuinely change; don't assign arbitrary settings to every clip. Mixed music/SFX can invalidate isolated-dialogue measurements, so disclose the limitation. Any further refinement/import needs approval and preserves the current version. Measurement alone still cannot certify naturalness.

The command authorizes the audition and final project versions, not repeated speculative imports or deletion. Resume existing work rather than duplicating projects. Any additional round needs the user's choice. The original recording and project remain intact.

## Measurement versus quality

Steady air/hiss, breaths and /s/, /f/, /sh/ consonants are different. Preserve voice body and speech sounds; zero background energy is not the goal. Loudness matching, spectral comparison and recognition checks can flag damage, but cannot prove that the voice is natural. Report a winner as **MEASUREMENT-SELECTED / LISTENING UNVERIFIED** until listening feedback supports it, never universally best or studio-quality.

Choose gain from actual Final Cut-processed output: add the smaller of the loudness deficit and available true-peak headroom to the candidate gain, with a documented safety margin/range check. If target loudness is impossible without clipping, keep it quieter and explain why. Do not add Loudness or a limiter. The same selected settings apply to the same recording/speaker; do not change music, effects or other recordings blindly.

## Automation boundaries

Native settings are possible when the installed schema/bridge supports them. Audio enhancements belong to the correct audio component; avoid duplicate simultaneous processing and double gain. Validate the installed DTD and verify settings/checkboxes after import. An XML pass or stored setting is not proof of rendered quality.

The current bridge uses XML import for new project versions, not dependable in-place editing. Native Apple processing is not executed by its general ffmpeg preview. The user's WAV must come from Final Cut itself; proxy measurements cannot choose native isolation. Do not promise unattended export without verifying a supported route, install a UI bridge silently, patch the app or write its Library database.

If unrelated existing dialogue processors are active, disclose the conflict and obtain permission before bypass/removal; do not call the result two-control-only while they remain active. Native Loudness is explicitly disabled by this command. Previously baked processing cannot be undone.

Manifest and reports live in `work/<recording>/`, media in `out/<recording>/`, all ignored by Git. Portable instructions contain no personal sample IDs, fixed home paths or prior-user settings.

## References

- [Apple: Enhance audio](https://support.apple.com/guide/final-cut-pro/enhance-audio-verc1fab873/mac)
- [Apple: Volume XML adjustment](https://developer.apple.com/documentation/professional-video-applications/adjust-volume)
- [Bridge: Live mode and native export limitations](https://github.com/DareDev256/fcp-mcp-server#live-mode-macos)

For Voice Isolation XML support, inspect the DTD bundled with the installed Final Cut version and verify units/enabled state against an actual native export.
