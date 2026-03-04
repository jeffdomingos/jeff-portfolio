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
            pass # ignore header text for brevity
        elif self.current_section is not None:
            self.current_section['texts'].append(data)
        elif self.in_footer:
            self.footer_text.append(data)

html_files = sorted(glob.glob('**/*.html', recursive=True))

with open('relatorio_completo_ux_ui.md', 'w', encoding='utf-8') as out:
    out.write("# Relatório Completo de UI/UX: Todas as Páginas do Site\n\n")
    out.write("Este documento estende a avaliação global de Design System, cobrindo o grid, o conteúdo textual e os elementos iterativos de **todas as 15 páginas** em formato sistemático.\n\n")
    
    global_colors = set()
    global_fonts = set()
    
    pages_data = []
    
    for file in html_files:
        with open(file, 'r', encoding='utf-8') as f:
            html_content = f.read()
            
        parser = MyParser()
        parser.feed(html_content)
        
        colors = set(re.findall(r'#?[0-9a-fA-F]{3,6}|rgba?\([^)]+\)', parser.css))
        fonts = set(re.findall(r'font-family:[^;]+', parser.css))
        
        global_colors.update(colors)
        global_fonts.update(fonts)
        
        pages_data.append({
            'file': file,
            'header_links': parser.header_links,
            'sections': parser.sections,
            'footer_text': parser.footer_text
        })

    out.write("## Design System Global (Agregado)\n")
    
    colors_list = list(global_colors)
    out.write("**Cores Detectadas (Principais):**\n")
    out.write(", ".join(colors_list[:30]) + ("..." if len(colors_list) > 30 else "") + "\n\n")
    
    fonts_list = list(global_fonts)
    out.write("**Famílias de Fontes:**\n")
    out.write(", ".join(fonts_list[:15]) + ("..." if len(fonts_list) > 15 else "") + "\n\n")
    
    out.write("---\n\n")
    
    for page in pages_data:
        out.write(f"## Documento: `{page['file']}`\n\n")
        
        out.write("### Cabeçalho (Header)\n")
        if page['header_links']:
            links_clean = list(dict.fromkeys([l for l in page['header_links'] if l]))
            out.write(f"- **Links de Navegação:** {', '.join(links_clean)}\n\n")
        else:
            out.write("- Nenhum link explícito extraído.\n\n")
            
        out.write("### Seções da Página (Sections)\n")
        if not page['sections']:
            out.write("- Nenhuma `<section>` declarada. Layout pode usar sistema de grids com `<div>` primárias.\n\n")
            
        for i, sec in enumerate(page['sections']):
            out.write(f"#### Seção {i+1}\n")
            
            if sec['bg']:
                out.write("- **Fundo (Backgrounds):** Layout usa Background-Images inline ou cores sólidas configuradas diretamente na tag.\n")
            else:
                out.write("- **Fundo:** Margens naturais ou classes globais sem estilização inline de background.\n")
                
            if sec['texts']:
                snippet = " | ".join(sec['texts'][:10])
                if len(sec['texts']) > 10:
                    snippet += " ..."
                out.write(f"- **Textos (Resumo):** {snippet}\n")
            else:
                out.write("- **Conteúdo Textual:** Sem textos limpos encontrados.\n")
                
            if sec['links']:
                links_clean = list(dict.fromkeys([l for l in sec['links'] if l]))
                out.write(f"- **Links / Interações:** {', '.join(links_clean)}\n")
            
            out.write("\n")
            
        out.write("### Rodapé (Footer)\n")
        if page['footer_text']:
            out.write(f"- **Conteúdo:** {' | '.join(page['footer_text'])}\n\n")
        else:
            out.write("- **Conteúdo:** Vazio (Apenas caixas organizadoras).\n\n")
        
        out.write("---\n\n")

print("Report saved to relatorio_completo_ux_ui.md")
