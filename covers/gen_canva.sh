#!/bin/bash
cd "$(dirname "$0")"
TOKEN="sk_PH99UzGO226FaP3YKEl0hIJAclQm2lY9"

declare -a PROMPTS=(
  "cv01|glowing Instagram post template grid with design elements, vibrant pink purple modern art, no text, no people"
  "cv02|glowing Instagram story template with design elements, vibrant blue teal modern art, no text, no people"
  "cv03|glowing Pinterest pin template with design elements, vibrant red orange modern art, no text, no people"
  "cv04|glowing YouTube thumbnail template with design elements, vibrant purple gold modern art, no text, no people"
  "cv05|glowing business card template with elegant design, navy gold modern art, no text, no people"
  "cv06|glowing flyer poster template with design elements, teal orange modern art, no text, no people"
  "cv07|glowing resume template design with modern layout, blue gray modern art, no text, no people"
  "cv08|glowing presentation slide template with design elements, purple teal modern art, no text, no people"
  "cv09|glowing logo design template with abstract shapes, gold black modern art, no text, no people"
  "cv10|glowing LinkedIn banner template with design elements, blue navy modern art, no text, no people"
  "cv11|glowing TikTok cover template with design elements, vibrant pink black modern art, no text, no people"
  "cv12|glowing email newsletter template with design elements, teal cream modern art, no text, no people"
  "cv13|glowing planner cover template with design elements, pastel pink modern art, no text, no people"
  "cv14|glowing wedding invitation template with elegant design, blush gold modern art, no text, no people"
  "cv15|glowing menu design template with elegant layout, cream brown modern art, no text, no people"
  "cv16|glowing infographic template with design elements, blue orange modern art, no text, no people"
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
  url="https://image.pollinations.ai/prompt/${enc}?width=768&height=768&seed=171&nologo=true&model=flux&enhance=true"
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
