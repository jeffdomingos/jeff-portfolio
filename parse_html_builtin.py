from html.parser import HTMLParser
import re

with open('/home/deck/sites.google.com/view/jeffdomingos/index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

class MyParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_style = False
        self.css = ""
        self.header_links = []
        self.sections = []
        self.current_section = None
        self.in_header = False
        self.in_footer = False
        self.footer_text = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'style':
            self.in_style = True
        elif tag == 'header':
            self.in_header = True
        elif tag == 'section':
            self.current_section = {'texts': [], 'bg': [], 'links': []}
            self.sections.append(self.current_section)
        elif tag == 'footer':
            self.in_footer = True
        
        if self.in_header and tag == 'a':
            self.header_links.append(attrs.get('href', ''))
        
        if self.current_section is not None:
            if 'style' in attrs and 'background' in attrs['style']:
                self.current_section['bg'].append(attrs['style'])
            if tag == 'a':
                self.current_section['links'].append(attrs.get('href', ''))

    def handle_endtag(self, tag):
        if tag == 'style':
            self.in_style = False
        elif tag == 'header':
            self.in_header = False
        elif tag == 'section':
            self.current_section = None
        elif tag == 'footer':
            self.in_footer = False

    def handle_data(self, data):
        data = data.strip()
        if not data:
            return
        if self.in_style:
            self.css += data
        elif self.in_header:
            pass # can add text
        elif self.current_section is not None:
            self.current_section['texts'].append(data)
        elif self.in_footer:
            self.footer_text.append(data)

parser = MyParser()
parser.feed(html_content)

print("=== STYLES ===")
colors = set(re.findall(r'#?[0-9a-fA-F]{3,6}|rgba?\([^)]+\)', parser.css))
fonts = set(re.findall(r'font-family:[^;]+', parser.css))
print("Colors:", list(colors)[:20])
print("Fonts:", list(fonts)[:10])

print("\n=== HEADER ===")
print("Links:", parser.header_links)

print("\n=== SECTIONS ===")
for i, sec in enumerate(parser.sections):
    print(f"\n--- Section {i+1} ---")
    print("Backgrounds:", sec['bg'])
    print("Links:", sec['links'])
    print("Texts:", sec['texts'])

print("\n=== FOOTER ===")
print(parser.footer_text)

