#!/bin/bash
cd "$(dirname "$0")"
TOKEN="sk_PH99UzGO226FaP3YKEl0hIJAclQm2lY9"

declare -a PROMPTS=(
  "n01|glowing minimalist habit tracker checklist icon with soft grid lines, vibrant teal purple gradient, futuristic digital art, no text, no people"
  "n02|glowing kanban board with floating task cards, vibrant blue orange gradient, futuristic digital art, no text, no people"
  "n03|glowing coins and rising graph with a minimalist wallet icon, green gold futuristic art, no text, no people"
  "n04|glowing vision board with abstract goal icons and stars, vibrant pink purple futuristic art, no text, no people"
  "n05|glowing weekly calendar grid with meal icons, warm orange teal futuristic art, no text, no people"
  "n06|glowing briefcase with magnifying glass and document icons, navy gold futuristic art, no text, no people"
  "n07|glowing content calendar grid with camera and video icons, vibrant magenta cyan futuristic art, no text, no people"
  "n08|glowing stack of books with a bookmark ribbon, warm amber blue futuristic art, no text, no people"
  "n09|glowing globe with suitcase and location pin, vibrant blue gold futuristic art, no text, no people"
  "n10|glowing wedding rings with checklist and calendar icon, soft pink white gold futuristic art, no text, no people"
  "n11|glowing dumbbell with progress bar and calendar icon, red orange dark futuristic art, no text, no people"
  "n12|glowing graduation cap with open book and clock icon, purple blue futuristic art, no text, no people"
  "n13|glowing handshake with document and clock icon, teal gold futuristic art, no text, no people"
  "n14|glowing house outline with boxes and inventory list icon, warm brown teal futuristic art, no text, no people"
  "n15|glowing wallet with pie chart and coins, green gold futuristic art, no text, no people"
  "n16|glowing open notebook with pen and soft light particles, pastel lavender pink futuristic art, no text, no people"
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
  url="https://image.pollinations.ai/prompt/${enc}?width=768&height=768&seed=88&nologo=true&model=flux&enhance=true"
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
