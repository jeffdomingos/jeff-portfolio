import glob
import os
import re
from html.parser import HTMLParser

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
            pass
        elif self.current_section is not None:
            self.current_section['texts'].append(data)
        elif self.in_footer:
            self.footer_text.append(data)

html_files = sorted(glob.glob('**/*.html', recursive=True))

if not os.path.exists('relatorios'):
    os.makedirs('relatorios')

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        html_content = f.read()
        
    parser = MyParser()
    parser.feed(html_content)
    
    colors = set(re.findall(r'#?[0-9a-fA-F]{3,6}|rgba?\([^)]+\)', parser.css))
    fonts = set(re.findall(r'font-family:[^;]+', parser.css))
    
    # Create valid md filename
    md_filename = file.replace('/', '_').replace('.html', '.md')
    report_path = os.path.join('relatorios', md_filename)
    
    with open(report_path, 'w', encoding='utf-8') as out:
        out.write(f"# Relatório de UI/UX: `{file}`\n\n")
        out.write("## Design System\n")
        
        colors_list = list(colors)
        out.write("**Cores Detectadas:**\n")
        out.write(", ".join(colors_list[:30]) + ("..." if len(colors_list) > 30 else "") + "\n\n")
        
        fonts_list = list(fonts)
        out.write("**Famílias de Fontes:**\n")
        out.write(", ".join(fonts_list[:15]) + ("..." if len(fonts_list) > 15 else "") + "\n\n")
        
        out.write("### Cabeçalho (Header)\n")
        if parser.header_links:
            links_clean = list(dict.fromkeys([l for l in parser.header_links if l]))
            out.write(f"- **Links de Navegação:** {', '.join(links_clean)}\n\n")
        else:
            out.write("- Nenhum link explícito extraído.\n\n")
            
        out.write("### Seções da Página (Sections)\n")
        if not parser.sections:
            out.write("- Nenhuma `<section>` declarada nesta página.\n\n")
            
        for i, sec in enumerate(parser.sections):
            out.write(f"#### Seção {i+1}\n")
            if sec['bg']:
                out.write("- **Fundo (Backgrounds):** Layout usa Background-Images inline ou cores sólidas.\n")
            else:
                out.write("- **Fundo:** Background base do tema.\n")
                
            if sec['texts']:
                snippet = " | ".join(sec['texts'][:10])
                if len(sec['texts']) > 10:
                    snippet += " ..."
                out.write(f"- **Trechos de Texto:** {snippet}\n")
            else:
                out.write("- **Conteúdo Textual:** Sem textos limpos encontrados.\n")
                
            if sec['links']:
                links_clean = list(dict.fromkeys([l for l in sec['links'] if l]))
                out.write(f"- **Links / Interações:** {', '.join(links_clean)}\n")
            out.write("\n")
            
        out.write("### Rodapé (Footer)\n")
        if parser.footer_text:
            out.write(f"- **Conteúdo:** {' | '.join(parser.footer_text)}\n\n")
        else:
            out.write("- **Conteúdo:** Vazio ou contêiner estrutural sem texto explícito.\n\n")

print("Reports saved to the 'relatorios' directory.")
