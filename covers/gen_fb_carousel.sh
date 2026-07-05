#!/bin/bash
cd "$(dirname "$0")"
TOKEN="sk_PH99UzGO226FaP3YKEl0hIJAclQm2lY9"

declare -a PROMPTS=(
  "fb01|glowing minimalist workspace scene with laptop and floating digital icons, vibrant purple pink gradient, futuristic bold art, no text, no people"
  "fb02|glowing stack of templates and documents floating with sparkles, vibrant teal orange gradient, futuristic bold art, no text, no people"
  "fb03|glowing grid of app icons representing notion canva prompts planners, vibrant blue magenta futuristic bold art, no text, no people"
  "fb04|glowing download arrow into a phone screen with light particles, vibrant green cyan futuristic bold art, no text, no people"
  "fb05|glowing arrow pointing forward with a shopping bag icon, vibrant gold pink futuristic bold art, no text, no people"
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
  url="https://image.pollinations.ai/prompt/${enc}?width=1080&height=1080&seed=55&nologo=true&model=flux&enhance=true"
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
