from bs4 import BeautifulSoup
import json
import re

with open('/home/deck/sites.google.com/view/jeffdomingos/index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

soup = BeautifulSoup(html_content, 'html.parser')

print("=== STYLES ===")
style_tags = soup.find_all('style')
for s in style_tags:
    if s.string:
        # just print some basic color/font info
        css = s.string
        colors = set(re.findall(r'#?[0-9a-fA-F]{3,6}|rgba?\([^)]+\)', css))
        fonts = set(re.findall(r'font-family:[^;]+', css))
        print("Colors:", list(colors)[:20])
        print("Fonts:", list(fonts)[:10])

print("\n=== HEADER ===")
header = soup.find('header')
if header:
    links = header.find_all('a')
    for l in links:
        print("Header Link:", l.get_text(strip=True), l.get('href'))

print("\n=== SECTIONS ===")
sections = soup.find_all('section')
for i, sec in enumerate(sections):
    print(f"\n--- Section {i+1} ---")
    print("Backgrounds:", [div.get('style') for div in sec.find_all('div') if div.get('style') and 'background' in div.get('style')])
    texts = [p.get_text(strip=True) for p in sec.find_all(['h1', 'h2', 'h3', 'p', 'span']) if p.get_text(strip=True)]
    print("Texts:", texts[:10]) # print first 10 text blocks

print("\n=== FOOTER ===")
footer = soup.find('footer')
if footer:
    print(footer.get_text(separator=' | ', strip=True))

