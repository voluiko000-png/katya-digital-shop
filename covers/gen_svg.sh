#!/bin/bash
cd "$(dirname "$0")"
TOKEN="sk_PH99UzGO226FaP3YKEl0hIJAclQm2lY9"

declare -a PROMPTS=(
  "sv01|glowing inspirational quote svg cut file design with elegant script, gold black art, no text, no people"
  "sv02|glowing monogram frame svg cut file design, navy gold art, no text, no people"
  "sv03|glowing animal silhouette svg cut file design, black white art, no text, no people"
  "sv04|glowing floral wreath svg cut file design, green pink art, no text, no people"
  "sv05|glowing holiday christmas svg cut file design, red green art, no text, no people"
  "sv06|glowing sports team svg cut file design, blue red art, no text, no people"
  "sv07|glowing mandala svg cut file design, purple gold art, no text, no people"
  "sv08|glowing family svg cut file design with heart, brown cream art, no text, no people"
  "sv09|glowing baby onesie svg cut file design, pastel blue pink art, no text, no people"
  "sv10|glowing coffee mug svg cut file design, brown orange art, no text, no people"
  "sv11|glowing funny saying svg cut file design, black yellow art, no text, no people"
  "sv12|glowing wedding svg cut file design with rings, blush gold art, no text, no people"
  "sv13|glowing patriotic flag svg cut file design, red blue art, no text, no people"
  "sv14|glowing halloween svg cut file design, orange black art, no text, no people"
  "sv15|glowing nature outdoor svg cut file design with mountains, green teal art, no text, no people"
  "sv16|glowing school mascot svg cut file design, blue gold art, no text, no people"
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
  url="https://image.pollinations.ai/prompt/${enc}?width=768&height=768&seed=191&nologo=true&model=flux&enhance=true"
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
