#!/bin/bash
cd "$(dirname "$0")"
TOKEN="sk_PH99UzGO226FaP3YKEl0hIJAclQm2lY9"

declare -a PROMPTS=(
  "cl01|glowing cute animal clipart set with woodland creatures, pastel green art, no text, no people"
  "cl02|glowing floral bouquet clipart set with watercolor flowers, pink green art, no text, no people"
  "cl03|glowing food and drink clipart set with fruits and coffee, vibrant orange brown art, no text, no people"
  "cl04|glowing holiday christmas clipart set with ornaments, red green gold art, no text, no people"
  "cl05|glowing halloween clipart set with pumpkins and bats, orange black art, no text, no people"
  "cl06|glowing baby shower clipart set with cute icons, pastel blue pink art, no text, no people"
  "cl07|glowing tropical summer clipart set with palm leaves, green yellow art, no text, no people"
  "cl08|glowing school supplies clipart set with pencils and books, blue orange art, no text, no people"
  "cl09|glowing wedding clipart set with rings and flowers, blush gold art, no text, no people"
  "cl10|glowing space and planets clipart set, purple blue art, no text, no people"
  "cl11|glowing farm animals clipart set, warm brown green art, no text, no people"
  "cl12|glowing unicorn and fantasy clipart set, pastel purple pink art, no text, no people"
  "cl13|glowing sports equipment clipart set, blue red art, no text, no people"
  "cl14|glowing camping and outdoors clipart set, green brown art, no text, no people"
  "cl15|glowing sea creatures clipart set, teal blue art, no text, no people"
  "cl16|glowing birthday party clipart set with balloons and cake, pink gold art, no text, no people"
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
  url="https://image.pollinations.ai/prompt/${enc}?width=768&height=768&seed=151&nologo=true&model=flux&enhance=true"
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
