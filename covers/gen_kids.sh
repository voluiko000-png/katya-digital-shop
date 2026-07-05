#!/bin/bash
cd "$(dirname "$0")"
TOKEN="sk_PH99UzGO226FaP3YKEl0hIJAclQm2lY9"

declare -a PROMPTS=(
  "ki01|glowing alphabet letters floating with stars, vibrant rainbow colors, playful digital art, no text, no people"
  "ki02|glowing counting numbers with cute shapes, vibrant blue yellow playful digital art, no text, no people"
  "ki03|glowing puzzle pieces fitting together with sparkles, vibrant pink teal playful digital art, no text, no people"
  "ki04|glowing sticker chart with stars and smiley icons, vibrant orange purple playful digital art, no text, no people"
  "ki05|glowing bingo card grid with cute icons, vibrant green pink playful digital art, no text, no people"
  "ki06|glowing maze path with playful arrows, vibrant blue orange playful digital art, no text, no people"
  "ki07|glowing dot to dot connect the stars pattern, vibrant purple yellow playful digital art, no text, no people"
  "ki08|glowing memory matching cards with cute animal shapes, vibrant teal pink playful digital art, no text, no people"
  "ki09|glowing weather chart with sun cloud rain icons, vibrant blue yellow playful digital art, no text, no people"
  "ki10|glowing emotions chart with happy sad face icons, vibrant orange teal playful digital art, no text, no people"
  "ki11|glowing chore chart with cute house icons and stars, vibrant green purple playful digital art, no text, no people"
  "ki12|glowing shapes and colors learning chart, vibrant rainbow playful digital art, no text, no people"
  "ki13|glowing handwriting practice lines with stars, vibrant blue pink playful digital art, no text, no people"
  "ki14|glowing scavenger hunt map with treasure icons, vibrant gold teal playful digital art, no text, no people"
  "ki15|glowing bedtime routine chart with moon and stars, vibrant indigo pink playful digital art, no text, no people"
  "ki16|glowing reward chart with trophy and stickers, vibrant gold purple playful digital art, no text, no people"
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
  url="https://image.pollinations.ai/prompt/${enc}?width=768&height=768&seed=71&nologo=true&model=flux&enhance=true"
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
