#!/bin/bash
cd "$(dirname "$0")"
TOKEN="sk_PH99UzGO226FaP3YKEl0hIJAclQm2lY9"

declare -a PROMPTS=(
  "we01|glowing wedding invitation card with floral border, soft pink gold elegant art, no text, no people"
  "we02|glowing seating chart board with elegant frame, blush gold elegant art, no text, no people"
  "we03|glowing wedding budget tracker with coins and rings, gold rose elegant art, no text, no people"
  "we04|glowing wedding timeline schedule with clock icon, ivory gold elegant art, no text, no people"
  "we05|glowing guest list book with pen icon, blush pink elegant art, no text, no people"
  "we06|glowing save the date card with calendar icon, gold sage elegant art, no text, no people"
  "we07|glowing wedding menu card with elegant border, cream gold elegant art, no text, no people"
  "we08|glowing vow book with feather pen, ivory rose elegant art, no text, no people"
  "we09|glowing bridal shower invitation with flowers, pink gold elegant art, no text, no people"
  "we10|glowing wedding checklist with rings and flowers, gold blush elegant art, no text, no people"
  "we11|glowing thank you card with floral wreath, rose gold elegant art, no text, no people"
  "we12|glowing table number card with elegant frame, ivory gold elegant art, no text, no people"
  "we13|glowing wedding vendor contact tracker with elegant lines, gold sage elegant art, no text, no people"
  "we14|glowing honeymoon planner with suitcase and heart icon, coral gold elegant art, no text, no people"
  "we15|glowing bachelorette party invitation with confetti, pink purple elegant art, no text, no people"
  "we16|glowing wedding program card with floral border, blush gold elegant art, no text, no people"
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
  url="https://image.pollinations.ai/prompt/${enc}?width=768&height=768&seed=81&nologo=true&model=flux&enhance=true"
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
