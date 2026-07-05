#!/bin/bash
cd "$(dirname "$0")"
TOKEN="sk_PH99UzGO226FaP3YKEl0hIJAclQm2lY9"

declare -a PROMPTS=(
  "pr01|glowing abstract line art wall print, minimalist beige gold elegant art, no text, no people"
  "pr02|glowing botanical leaf print with soft light, sage green elegant art, no text, no people"
  "pr03|glowing motivational typography frame with sunburst, warm gold elegant art, no text, no people"
  "pr04|glowing minimalist mountain landscape print, blue teal elegant art, no text, no people"
  "pr05|glowing abstract geometric shapes print, terracotta cream elegant art, no text, no people"
  "pr06|glowing gallery wall art set with frames, neutral gold elegant art, no text, no people"
  "pr07|glowing celestial moon and stars print, indigo gold elegant art, no text, no people"
  "pr08|glowing bathroom wall art with wave pattern, blue white elegant art, no text, no people"
  "pr09|glowing nursery wall art with soft clouds, pastel pink blue elegant art, no text, no people"
  "pr10|glowing kitchen wall art with fruit illustration, warm orange cream elegant art, no text, no people"
  "pr11|glowing abstract fine line face art print, black beige elegant art, no text, no people"
  "pr12|glowing vintage map style wall print, sepia gold elegant art, no text, no people"
  "pr13|glowing tropical palm leaf print, green gold elegant art, no text, no people"
  "pr14|glowing zodiac constellation print, navy gold elegant art, no text, no people"
  "pr15|glowing abstract sunset gradient print, orange purple elegant art, no text, no people"
  "pr16|glowing minimalist office desk print with plant, sage cream elegant art, no text, no people"
)

for entry in "${PROMPTS[@]}"; do
  id="${entry%%|*}"
  prompt="${entry#*|}"
  out="${id}.jpg"
  if [ -s "$out" ]; then
    echo "$id already exists, skip"
    continue
  fi
  enc=$(python -c "import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1]))" "$prompt")
  url="https://image.pollinations.ai/prompt/${enc}?width=768&height=768&seed=101&nologo=true&model=flux&enhance=true"
  for attempt in 1 2 3; do
    curl -s --max-time 100 -o "$out.tmp" -H "Authorization: Bearer $TOKEN" -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" "$url"
    if [ -s "$out.tmp" ] && [ "$(head -c 1 "$out.tmp")" != "{" ]; then
      mv "$out.tmp" "$out"
      echo "$id done (attempt $attempt)"
      break
    else
      echo "$id attempt $attempt failed, retrying"
      rm -f "$out.tmp"
      sleep 3
    fi
  done
done
echo "ALL DONE"
