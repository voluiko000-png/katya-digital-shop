#!/bin/bash
cd "$(dirname "$0")"
TOKEN="sk_PH99UzGO226FaP3YKEl0hIJAclQm2lY9"

declare -a PROMPTS=(
  "ps01|glowing moody film photo preset icon with color grading wheel, teal orange futuristic art, no text, no people"
  "ps02|glowing bright airy photo preset icon with light rays, soft pastel futuristic art, no text, no people"
  "ps03|glowing warm golden hour photo preset icon with sun flare, gold amber futuristic art, no text, no people"
  "ps04|glowing black and white photo preset icon with contrast dial, monochrome futuristic art, no text, no people"
  "ps05|glowing travel photo preset icon with globe and camera, blue teal futuristic art, no text, no people"
  "ps06|glowing portrait photo preset icon with soft skin tone dial, pink beige futuristic art, no text, no people"
  "ps07|glowing food photography preset icon with color saturation dial, orange red futuristic art, no text, no people"
  "ps08|glowing wedding photo preset icon with soft blush tones, blush gold futuristic art, no text, no people"
  "ps09|glowing urban street photo preset icon with contrast lines, gray blue futuristic art, no text, no people"
  "ps10|glowing nature landscape photo preset icon with green tones, green teal futuristic art, no text, no people"
  "ps11|glowing vintage film grain preset icon with retro colors, sepia orange futuristic art, no text, no people"
  "ps12|glowing Instagram influencer preset icon with vibrant colors, pink purple futuristic art, no text, no people"
  "ps13|glowing Lightroom mobile preset icon with sliders, purple teal futuristic art, no text, no people"
  "ps14|glowing Canva template preset icon with design elements, teal pink futuristic art, no text, no people"
  "ps15|glowing winter photo preset icon with cool blue tones, blue white futuristic art, no text, no people"
  "ps16|glowing summer vibrant preset icon with warm bright tones, orange yellow futuristic art, no text, no people"
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
  url="https://image.pollinations.ai/prompt/${enc}?width=768&height=768&seed=111&nologo=true&model=flux&enhance=true"
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
