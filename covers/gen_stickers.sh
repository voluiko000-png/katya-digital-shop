#!/bin/bash
cd "$(dirname "$0")"
TOKEN="sk_PH99UzGO226FaP3YKEl0hIJAclQm2lY9"

declare -a PROMPTS=(
  "st01|glowing cute planner sticker set with checkmarks and stars, vibrant pastel colors art, no text, no people"
  "st02|glowing motivational quote sticker set with sunburst icons, vibrant gold pink art, no text, no people"
  "st03|glowing plant and succulent sticker set, vibrant green art, no text, no people"
  "st04|glowing weather icon sticker set, vibrant blue yellow art, no text, no people"
  "st05|glowing food and drink sticker set, vibrant orange red art, no text, no people"
  "st06|glowing kawaii cute animal sticker set, vibrant pastel pink art, no text, no people"
  "st07|glowing washi tape digital sticker set with patterns, vibrant multicolor art, no text, no people"
  "st08|glowing mood tracker sticker set with faces, vibrant purple yellow art, no text, no people"
  "st09|glowing budget finance sticker set with coins, vibrant green gold art, no text, no people"
  "st10|glowing holiday christmas sticker set, vibrant red green art, no text, no people"
  "st11|glowing GoodNotes digital sticker set with icons, vibrant teal pink art, no text, no people"
  "st12|glowing travel sticker set with suitcase and map icons, vibrant blue orange art, no text, no people"
  "st13|glowing fitness workout sticker set, vibrant red orange art, no text, no people"
  "st14|glowing school study sticker set with books and pencils, vibrant blue yellow art, no text, no people"
  "st15|glowing self care sticker set with candles and hearts, vibrant pink lavender art, no text, no people"
  "st16|glowing productivity task sticker set with arrows and flags, vibrant teal gold art, no text, no people"
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
  url="https://image.pollinations.ai/prompt/${enc}?width=768&height=768&seed=181&nologo=true&model=flux&enhance=true"
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
