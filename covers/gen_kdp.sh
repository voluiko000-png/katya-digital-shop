#!/bin/bash
cd "$(dirname "$0")"
TOKEN="sk_PH99UzGO226FaP3YKEl0hIJAclQm2lY9"

declare -a PROMPTS=(
  "kd01|glowing sudoku puzzle book cover with number grid, blue gold art, no text, no people"
  "kd02|glowing word search puzzle book cover with letter grid, teal orange art, no text, no people"
  "kd03|glowing crossword puzzle book cover with grid pattern, purple gold art, no text, no people"
  "kd04|glowing adult coloring book cover with mandala pattern, gold teal art, no text, no people"
  "kd05|glowing journal notebook cover with lined pages, cream brown art, no text, no people"
  "kd06|glowing gratitude journal book cover with soft light, pink gold art, no text, no people"
  "kd07|glowing baby name book cover with soft pastel stars, pastel blue pink art, no text, no people"
  "kd08|glowing logic puzzle book cover with maze pattern, green blue art, no text, no people"
  "kd09|glowing handwriting practice book cover with lined pages, blue cream art, no text, no people"
  "kd10|glowing dot grid notebook cover with minimalist design, gray gold art, no text, no people"
  "kd11|glowing password organizer book cover with lock icon, navy gold art, no text, no people"
  "kd12|glowing recipe blank book cover with utensils icon, orange cream art, no text, no people"
  "kd13|glowing trivia quiz book cover with question mark icon, purple teal art, no text, no people"
  "kd14|glowing large print word puzzle book cover, blue gold art, no text, no people"
  "kd15|glowing kids activity book cover with fun shapes, rainbow playful art, no text, no people"
  "kd16|glowing planner undated notebook cover with minimalist grid, sage cream art, no text, no people"
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
  url="https://image.pollinations.ai/prompt/${enc}?width=768&height=768&seed=131&nologo=true&model=flux&enhance=true"
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
