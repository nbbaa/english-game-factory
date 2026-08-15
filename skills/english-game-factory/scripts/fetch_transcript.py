#!/usr/bin/env python3
"""
Fetch the English transcript of a YouTube video.

Usage:
    python3 fetch_transcript.py <video_id_or_url> [--lang en]

Prints the plain-text transcript to stdout (sentences joined, no timestamps).

Requires: youtube-transcript-api
    pip install youtube-transcript-api

Exit codes:
    0 - success
    1 - no transcript / video error (message printed to stderr)
"""
import re
import sys


def extract_video_id(arg: str) -> str:
    """Accept a bare video ID or any common YouTube URL form."""
    arg = arg.strip()
    # bare 11-char id
    if re.fullmatch(r"[A-Za-z0-9_-]{11}", arg):
        return arg
    # URL forms
    m = re.search(r"(?:v=|youtu\.be/|/shorts/|/embed/|/v/)([A-Za-z0-9_-]{11})", arg)
    if m:
        return m.group(1)
    raise ValueError(f"Cannot parse video ID from: {arg}")


def main() -> int:
    if len(sys.argv) < 2:
        print("Usage: fetch_transcript.py <video_id_or_url> [--lang en]", file=sys.stderr)
        return 1

    target = sys.argv[1]
    lang = "en"
    if "--lang" in sys.argv:
        i = sys.argv.index("--lang")
        if i + 1 < len(sys.argv):
            lang = sys.argv[i + 1]

    try:
        video_id = extract_video_id(target)
    except ValueError as e:
        print(str(e), file=sys.stderr)
        return 1

    try:
        from youtube_transcript_api import YouTubeTranscriptApi
    except ImportError:
        print("Missing dependency: pip install youtube-transcript-api", file=sys.stderr)
        return 1

    try:
        api = YouTubeTranscriptApi()
        tlist = api.list(video_id)

        # Prefer a manually-written subtitle in the target language; else generated.
        transcript = None
        try:
            transcript = tlist.find_manually_created_transcript([lang])
        except Exception:
            pass
        if transcript is None:
            try:
                transcript = tlist.find_generated_transcript([lang])
            except Exception:
                pass
        if transcript is None:
            # Last resort: any transcript, translated to target language.
            for t in tlist:
                if t.is_translatable:
                    transcript = t.translate(lang)
                    break
        if transcript is None:
            print(f"No transcript available for video {video_id} in language '{lang}'", file=sys.stderr)
            return 1

        data = transcript.fetch()
        text = " ".join(seg.text.replace("\n", " ") for seg in data)
        text = re.sub(r"\s+", " ", text).strip()
        print(text)
        return 0
    except Exception as e:
        print(f"Error fetching transcript: {e}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
