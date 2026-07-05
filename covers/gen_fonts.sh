#!/bin/bash
cd "$(dirname "$0")"
TOKEN="sk_PH99UzGO226FaP3YKEl0hIJAclQm2lY9"

declare -a PROMPTS=(
  "fo01|glowing elegant script calligraphy letters, gold cream art, no text, no people"
  "fo02|glowing bold modern sans serif letterforms, black white art, no text, no people"
  "fo03|glowing handwritten brush lettering strokes, warm pink gold art, no text, no people"
  "fo04|glowing vintage serif typeface letterforms, sepia brown art, no text, no people"
  "fo05|glowing playful bubble font letterforms, vibrant rainbow art, no text, no people"
  "fo06|glowing minimalist geometric font letterforms, gray teal art, no text, no people"
  "fo07|glowing wedding calligraphy font swirls, blush gold art, no text, no people"
  "fo08|glowing graffiti street font letterforms, neon purple art, no text, no people"
  "fo09|glowing retro groovy font letterforms, orange brown art, no text, no people"
  "fo10|glowing farmhouse rustic font letterforms, cream brown art, no text, no people"
  "fo11|glowing halloween spooky font letterforms, orange black art, no text, no people"
  "fo12|glowing christmas holiday font letterforms, red green gold art, no text, no people"
  "fo13|glowing monogram frame font design, gold navy art, no text, no people"
  "fo14|glowing kids playful cartoon font letterforms, vibrant blue yellow art, no text, no people"
  "fo15|glowing luxury gold foil font letterforms, black gold art, no text, no people"
  "fo16|glowing hand lettered watercolor font strokes, pastel teal pink art, no text, no people"
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
  url="https://image.pollinations.ai/prompt/${enc}?width=768&height=768&seed=141&nologo=true&model=flux&enhance=true"
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
