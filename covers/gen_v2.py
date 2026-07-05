import urllib.request, urllib.parse

prompt = "A vibrant colorful flat lay of a daily planner notebook open on a desk, bright pink and orange washi tape, colorful pens and highlighters, fresh flowers in vivid colors, bold cheerful modern aesthetic, high saturation, no text, no people"
p = urllib.parse.quote(prompt)
url = f"https://image.pollinations.ai/prompt/{p}?width=1024&height=1024&seed=4521&nologo=true&model=flux&enhance=true"
req = urllib.request.Request(url, headers={"Authorization": "Bearer sk_PH99UzGO226FaP3YKEl0hIJAclQm2lY9"})
data = urllib.request.urlopen(req, timeout=60).read()
open("p05_v2.jpg", "wb").write(data)
print(len(data), "bytes")
