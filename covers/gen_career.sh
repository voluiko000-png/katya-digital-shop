#!/bin/bash
cd "$(dirname "$0")"
TOKEN="sk_PH99UzGO226FaP3YKEl0hIJAclQm2lY9"

declare -a PROMPTS=(
  "ca01|glowing modern resume document with elegant lines, navy gold futuristic art, no text, no people"
  "ca02|glowing cover letter document with pen icon, teal blue futuristic art, no text, no people"
  "ca03|glowing LinkedIn profile card with connection lines, blue cyan futuristic art, no text, no people"
  "ca04|glowing interview checklist with speech bubble icon, purple gold futuristic art, no text, no people"
  "ca05|glowing salary negotiation chart with upward arrow, green gold futuristic art, no text, no people"
  "ca06|glowing career roadmap path with milestone flags, orange teal futuristic art, no text, no people"
  "ca07|glowing portfolio folder with star rating icons, magenta blue futuristic art, no text, no people"
  "ca08|glowing thank you note card with envelope icon, pink gold futuristic art, no text, no people"
  "ca09|glowing networking handshake with connection nodes, teal purple futuristic art, no text, no people"
  "ca10|glowing personal branding shield with star icon, navy pink futuristic art, no text, no people"
  "ca11|glowing career change compass with pathways, blue orange futuristic art, no text, no people"
  "ca12|glowing internship certificate with ribbon icon, gold teal futuristic art, no text, no people"
  "ca13|glowing freelance contract document with signature line, purple green futuristic art, no text, no people"
  "ca14|glowing remote work laptop with globe icon, cyan gold futuristic art, no text, no people"
  "ca15|glowing 30 60 90 day plan chart with milestones, teal orange futuristic art, no text, no people"
  "ca16|glowing skills checklist with growth graph, green blue futuristic art, no text, no people"
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
  url="https://image.pollinations.ai/prompt/${enc}?width=768&height=768&seed=33&nologo=true&model=flux&enhance=true"
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
