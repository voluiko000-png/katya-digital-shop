#!/bin/bash
cd "$(dirname "$0")"
TOKEN="sk_PH99UzGO226FaP3YKEl0hIJAclQm2lY9"

declare -a PROMPTS=(
  "re01|glowing recipe card with fork and spoon icon, warm orange red appetizing art, no text, no people"
  "re02|glowing weekly meal plan grid with food icons, green orange appetizing art, no text, no people"
  "re03|glowing grocery shopping list with cart icon, teal green appetizing art, no text, no people"
  "re04|glowing air fryer recipe card with steam icon, orange red appetizing art, no text, no people"
  "re05|glowing slow cooker recipe card with steam icon, brown orange appetizing art, no text, no people"
  "re06|glowing smoothie recipe card with fruit icons, vibrant pink green appetizing art, no text, no people"
  "re07|glowing baking recipe card with rolling pin icon, warm gold brown appetizing art, no text, no people"
  "re08|glowing vegan recipe card with leaf icon, green teal appetizing art, no text, no people"
  "re09|glowing keto recipe card with avocado icon, green orange appetizing art, no text, no people"
  "re10|glowing kids lunchbox recipe card with cute food icons, vibrant yellow orange appetizing art, no text, no people"
  "re11|glowing holiday recipe card with festive icons, red gold appetizing art, no text, no people"
  "re12|glowing pantry inventory list with jars icon, warm brown teal appetizing art, no text, no people"
  "re13|glowing recipe binder cover with utensils icon, cream orange appetizing art, no text, no people"
  "re14|glowing budget meal plan with coins and food icon, green gold appetizing art, no text, no people"
  "re15|glowing dessert recipe card with cupcake icon, pink gold appetizing art, no text, no people"
  "re16|glowing family cookbook cover with utensils and heart icon, warm red orange appetizing art, no text, no people"
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
  url="https://image.pollinations.ai/prompt/${enc}?width=768&height=768&seed=91&nologo=true&model=flux&enhance=true"
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
