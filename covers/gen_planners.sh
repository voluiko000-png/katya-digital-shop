#!/bin/bash
cd "$(dirname "$0")"
TOKEN="sk_PH99UzGO226FaP3YKEl0hIJAclQm2lY9"

declare -a PROMPTS=(
  "pl01|glowing sunrise over a minimalist daily schedule grid, warm orange pink gradient, futuristic digital art, no text, no people"
  "pl02|glowing weekly planner grid with soft light rays, vibrant teal blue gradient, futuristic digital art, no text, no people"
  "pl03|glowing monthly calendar page with floating stars, purple gold futuristic art, no text, no people"
  "pl04|glowing academic planner with graduation cap and clock, blue teal futuristic art, no text, no people"
  "pl05|glowing self care checklist with candle and leaf icons, soft pink lavender futuristic art, no text, no people"
  "pl06|glowing productivity timer with focus icon and checkmarks, vibrant orange teal futuristic art, no text, no people"
  "pl07|glowing gratitude journal with heart and sun icon, warm gold pink futuristic art, no text, no people"
  "pl08|glowing meal prep planner with fork and calendar grid, green orange futuristic art, no text, no people"
  "pl09|glowing baby milestone planner with soft pastel stars, pastel blue pink futuristic art, no text, no people"
  "pl10|glowing homeschool planner with books and pencil icon, warm amber teal futuristic art, no text, no people"
  "pl11|glowing New Year goals planner with fireworks and stars, gold purple futuristic art, no text, no people"
  "pl12|glowing small business planner with growth chart and briefcase, navy gold futuristic art, no text, no people"
  "pl13|glowing garden planner with plant sprout and calendar grid, green teal futuristic art, no text, no people"
  "pl14|glowing pet care planner with paw print and heart icon, warm orange blue futuristic art, no text, no people"
  "pl15|glowing minimalist to-do list with floating checkmarks, vibrant cyan magenta futuristic art, no text, no people"
  "pl16|glowing yearly overview calendar wheel with soft light particles, purple teal futuristic art, no text, no people"
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
  url="https://image.pollinations.ai/prompt/${enc}?width=768&height=768&seed=99&nologo=true&model=flux&enhance=true"
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
