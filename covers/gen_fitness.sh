#!/bin/bash
cd "$(dirname "$0")"
TOKEN="sk_PH99UzGO226FaP3YKEl0hIJAclQm2lY9"

declare -a PROMPTS=(
  "fi01|glowing dumbbell with progress chart, red orange futuristic art, no text, no people"
  "fi02|glowing yoga pose silhouette with soft light rays, purple teal futuristic art, no text, no people"
  "fi03|glowing running shoe with speed lines, blue cyan futuristic art, no text, no people"
  "fi04|glowing water bottle with hydration tracker rings, teal blue futuristic art, no text, no people"
  "fi05|glowing meal prep containers with fork icon, green orange futuristic art, no text, no people"
  "fi06|glowing home gym equipment silhouette with energy particles, red gold futuristic art, no text, no people"
  "fi07|glowing stopwatch with heartbeat line, orange red futuristic art, no text, no people"
  "fi08|glowing measuring tape wrapped around a growth arrow, teal green futuristic art, no text, no people"
  "fi09|glowing prenatal fitness silhouette with soft light, pink purple futuristic art, no text, no people"
  "fi10|glowing stretching figure silhouette with flexibility lines, blue purple futuristic art, no text, no people"
  "fi11|glowing protein shake bottle with sparkles, green teal futuristic art, no text, no people"
  "fi12|glowing calendar grid with workout icons, orange blue futuristic art, no text, no people"
  "fi13|glowing resistance band looped in a circle with energy glow, red purple futuristic art, no text, no people"
  "fi14|glowing sleep moon icon with recovery wave lines, indigo teal futuristic art, no text, no people"
  "fi15|glowing step counter footprint trail with light particles, cyan gold futuristic art, no text, no people"
  "fi16|glowing mind body balance icon with lotus and energy rings, purple teal futuristic art, no text, no people"
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
  url="https://image.pollinations.ai/prompt/${enc}?width=768&height=768&seed=41&nologo=true&model=flux&enhance=true"
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
