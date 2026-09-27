# Native Final Cut dialogue polish

Request: **Polish audio** or `/cawcut-audio [project name]`.

This workflow uses three native Final Cut controls only. It does not bake a separately processed audio file into the edit.

| Control | Adjustments | Aim |
|---|---|---|
| Voice Isolation | Enabled, Amount | Suppress competing noise while retaining natural speech |
| Loudness | Enabled, Amount and Uniformity | Balance quiet and loud speech without excessive flattening |
| Volume | Gain in dB | Set final level without clipping |

There is no universal "best" value. Record quality, room sound, microphone and voice change the trade-off. Turning everything up can make speech harsher or distorted. These controls can improve a recording but cannot guarantee that it sounds like a studio microphone, reconstruct clipped audio or fully remove every room reflection.

The current project's actual settings and native playback are the source of truth. Preserve a baseline and audition a short representative passage. Tune isolation, then loudness, then final gain. Final Cut's analysis can assist where available but does not replace listening. Enable both requested enhancements, using minimal effective strength where little correction is needed.

Steady air/hiss between words is an explicit tuning target. Compare the same noisy pauses while changing only Voice Isolation, then check whether Loudness brings the air back up. Lower Loudness Amount or Uniformity before forcing excessive isolation, while keeping both enhancements enabled. Preserve natural breaths and /s/, /f/, /sh/ consonants. Prefer unobtrusive background over absolute silence that makes the voice watery or thin. If these three controls cannot satisfy both noise reduction and voice quality, report the limit rather than adding another processor. Values chosen for one recording are not reusable global defaults.

## Automation boundaries

Native XML settings are possible when the installed schema and bridge support them, but writing a valid XML does not prove that Final Cut applied the settings or that they sound good. Native enhancements are component-level. Respect audio routing; simultaneous voice isolation on duplicate components can garble the result.

The bridge may support only XML reimport, not in-place modification of the open project. The workflow explains this before adding a new project. Current edits must be exported first if only an older XML is available. It never patches the app or edits its Library database.

A general MCP/ffmpeg preview may omit native audio enhancement processing. Only native Final Cut playback or export can confirm the sound. If automation cannot access those steps, the user supplies playback feedback, confirms the Inspector values or exports a sample. External tools may measure that export but must not process it for this workflow.

All settings and measurements are local run data in `work/`, ignored by Git. No fixed presets, personal samples or prior-user results are included.

## References

- [Apple: Enhance audio](https://support.apple.com/guide/final-cut-pro/enhance-audio-verc1fab873/mac)
- [Apple: Loudness XML attributes](https://developer.apple.com/documentation/professional-video-applications/adjust-loudness)
- [Apple: Volume XML adjustment](https://developer.apple.com/documentation/professional-video-applications/adjust-volume)

For Voice Isolation XML support, inspect the DTD bundled with the installed Final Cut version rather than relying on an old online schema. Validate placement, units and enabled state against that version and a real export.
