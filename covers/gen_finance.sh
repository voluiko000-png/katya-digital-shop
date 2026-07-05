#!/bin/bash
cd "$(dirname "$0")"
TOKEN="sk_PH99UzGO226FaP3YKEl0hIJAclQm2lY9"

declare -a PROMPTS=(
  "fn01|glowing piggy bank with coins falling, green gold futuristic art, no text, no people"
  "fn02|glowing pie chart budget breakdown with coins, teal gold futuristic art, no text, no people"
  "fn03|glowing debt payoff chart with descending bars, red gold futuristic art, no text, no people"
  "fn04|glowing savings jar filling with coins, green teal futuristic art, no text, no people"
  "fn05|glowing investment growth chart with upward arrow, blue gold futuristic art, no text, no people"
  "fn06|glowing credit card with shield icon, navy gold futuristic art, no text, no people"
  "fn07|glowing net worth tracker chart with rising line, purple gold futuristic art, no text, no people"
  "fn08|glowing family budget planner with coins and house icon, teal orange futuristic art, no text, no people"
  "fn09|glowing subscription tracker with recurring circle icon, blue purple futuristic art, no text, no people"
  "fn10|glowing emergency fund shield with coins, green blue futuristic art, no text, no people"
  "fn11|glowing retirement nest egg icon with growth chart, gold teal futuristic art, no text, no people"
  "fn12|glowing tax document with calculator icon, navy teal futuristic art, no text, no people"
  "fn13|glowing side hustle income tracker with coins, orange purple futuristic art, no text, no people"
  "fn14|glowing student loan payoff chart with graduation cap, blue gold futuristic art, no text, no people"
  "fn15|glowing weekly cash envelope system with coins, green gold futuristic art, no text, no people"
  "fn16|glowing financial goals vision board with coins and stars, purple gold futuristic art, no text, no people"
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
  url="https://image.pollinations.ai/prompt/${enc}?width=768&height=768&seed=61&nologo=true&model=flux&enhance=true"
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
