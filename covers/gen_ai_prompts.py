import urllib.request, urllib.parse, os, time, socket

socket.setdefaulttimeout(60)

ITEMS = [
    ("a01", "glowing abstract AI neural network brain with productivity checklist icons, vibrant blue purple gradient, futuristic digital art, no text, no people"),
    ("a02", "neon social media icons floating around a glowing AI orb, vibrant pink orange gradient, futuristic digital art, no text, no people"),
    ("a03", "abstract glowing growth chart and lightbulb with circuit patterns, gold and blue futuristic digital art, no text, no people"),
    ("a04", "glowing camera and pen icons surrounded by digital light particles, vibrant teal magenta futuristic art, no text, no people"),
    ("a05", "glowing vintage typewriter with digital text streams flowing out, warm amber purple futuristic art, no text, no people"),
    ("a06", "glowing envelope with digital network connection lines, vibrant blue green futuristic art, no text, no people"),
    ("a07", "glowing briefcase with an upward arrow and circuit background, navy and gold futuristic art, no text, no people"),
    ("a08", "glowing open book with neural network sparks flying out, purple cyan futuristic art, no text, no people"),
    ("a09", "glowing feather pen writing on a notebook with soft light particles, pastel pink lavender art, no text, no people"),
    ("a10", "swirling colorful digital paint splashes with abstract AI generated art fragments, vivid rainbow futuristic art, no text, no people"),
    ("a11", "glowing binary code streams forming a brain shape, green and black neon futuristic art, no text, no people"),
    ("a12", "glowing fork and plate with digital network overlay, warm orange teal futuristic art, no text, no people"),
    ("a13", "glowing globe with airplane trail and circuit lines, blue and gold futuristic art, no text, no people"),
    ("a14", "glowing wedding rings with floral digital pattern, soft pink white gold futuristic art, no text, no people"),
    ("a15", "glowing dumbbell surrounded by energy particles, red orange dark futuristic art, no text, no people"),
    ("a16", "glowing coins stacked with a rising growth chart and circuit pattern, green and gold futuristic art, no text, no people"),
]

OUT_DIR = os.path.dirname(os.path.abspath(__file__))
TOKEN = "sk_PH99UzGO226FaP3YKEl0hIJAclQm2lY9"

for id_, prompt in ITEMS:
    out_path = os.path.join(OUT_DIR, f"{id_}.jpg")
    if os.path.exists(out_path):
        print(id_, "already exists, skip")
        continue
    p = urllib.parse.quote(prompt)
    url = f"https://image.pollinations.ai/prompt/{p}?width=768&height=768&seed=77&nologo=true&model=flux&enhance=true"
    req = urllib.request.Request(url, headers={
        "Authorization": f"Bearer {TOKEN}",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    })
    try:
        data = urllib.request.urlopen(req, timeout=90).read()
        open(out_path, "wb").write(data)
        print(id_, len(data), "bytes -> done")
    except Exception as e:
        print(id_, "FAILED", e)
    time.sleep(1)

print("ALL DONE")
