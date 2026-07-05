#!/bin/bash
cd "$(dirname "$0")"
TOKEN="sk_PH99UzGO226FaP3YKEl0hIJAclQm2lY9"

declare -a PROMPTS=(
  "ct01|glowing cute cartoon dinosaur character, vibrant green orange playful art, no text, no people"
  "ct02|glowing cute cartoon astronaut character, vibrant blue purple playful art, no text, no people"
  "ct03|glowing cute cartoon dragon character, vibrant purple gold playful art, no text, no people"
  "ct04|glowing cute cartoon robot character, vibrant teal orange playful art, no text, no people"
  "ct05|glowing cute cartoon fairy character, vibrant pink purple playful art, no text, no people"
  "ct06|glowing cute cartoon superhero character silhouette, vibrant red blue playful art, no text, no people"
  "ct07|glowing cute cartoon pirate character, vibrant brown gold playful art, no text, no people"
  "ct08|glowing cute cartoon mermaid character, vibrant teal pink playful art, no text, no people"
  "ct09|glowing cute cartoon wizard character, vibrant purple blue playful art, no text, no people"
  "ct10|glowing cute cartoon farm animal characters, vibrant green yellow playful art, no text, no people"
  "ct11|glowing cute cartoon jungle animal characters, vibrant orange green playful art, no text, no people"
  "ct12|glowing cute cartoon monster characters, vibrant purple green playful art, no text, no people"
  "ct13|glowing cute cartoon princess character, vibrant pink gold playful art, no text, no people"
  "ct14|glowing cute cartoon knight character, vibrant silver blue playful art, no text, no people"
  "ct15|glowing cute cartoon ninja character, vibrant black red playful art, no text, no people"
  "ct16|glowing cute cartoon vehicle characters, vibrant blue orange playful art, no text, no people"
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
  url="https://image.pollinations.ai/prompt/${enc}?width=768&height=768&seed=161&nologo=true&model=flux&enhance=true"
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
