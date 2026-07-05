#!/bin/bash
cd "$(dirname "$0")"
TOKEN="sk_PH99UzGO226FaP3YKEl0hIJAclQm2lY9"

declare -a PROMPTS=(
  "pa01|glowing crochet stitch pattern chart with yarn texture, warm terracotta cream art, no text, no people"
  "pa02|glowing knitting cable pattern chart with needles icon, teal cream art, no text, no people"
  "pa03|glowing amigurumi crochet toy pattern with cute shapes, pastel pink art, no text, no people"
  "pa04|glowing cross stitch pattern grid with floral design, red cream art, no text, no people"
  "pa05|glowing embroidery hoop pattern with floral thread design, sage pink art, no text, no people"
  "pa06|glowing macrame knot pattern with cotton rope texture, beige tan art, no text, no people"
  "pa07|glowing quilting fabric pattern with geometric blocks, blue orange art, no text, no people"
  "pa08|glowing crochet blanket pattern with granny square design, multicolor pastel art, no text, no people"
  "pa09|glowing knitted sweater pattern chart with wool texture, cream brown art, no text, no people"
  "pa10|glowing crochet hat and scarf pattern with yarn ball, gold teal art, no text, no people"
  "pa11|glowing sewing pattern template with fabric scissors icon, coral cream art, no text, no people"
  "pa12|glowing baby blanket knitting pattern with soft pastel yarn, pastel blue pink art, no text, no people"
  "pa13|glowing crochet flower applique pattern, pink green art, no text, no people"
  "pa14|glowing tapestry crochet pattern with geometric design, terracotta teal art, no text, no people"
  "pa15|glowing knitted mittens pattern chart with snowflake design, blue white art, no text, no people"
  "pa16|glowing crochet market bag pattern with rope texture, natural beige art, no text, no people"
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
  url="https://image.pollinations.ai/prompt/${enc}?width=768&height=768&seed=121&nologo=true&model=flux&enhance=true"
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
