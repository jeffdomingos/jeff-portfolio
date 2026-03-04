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

# Write Global Report
with open('relatorios/00_relatorio_geral.md', 'w', encoding='utf-8') as global_out:
    global_out.write("# Relatório Geral: Design System e Estrutura Global\n\n")
    global_out.write("Este documento reúne as informações globais e configurações de Design System compartilháveis por todas as páginas do site.\n\n")
    
    global_out.write("## 1. Design System Global\n\n")
    
    colors_list = list(global_colors)
    global_out.write("### Cores Detectadas (Principais do Site Inteiro):\n")
    global_out.write("- Variações principais: " + ", ".join(colors_list[:30]) + ("..." if len(colors_list) > 30 else "") + "\n\n")
    
    fonts_list = list(global_fonts)
    global_out.write("### Famílias de Fontes:\n")
    global_out.write("- Fontes: " + ", ".join(fonts_list[:15]) + ("..." if len(fonts_list) > 15 else "") + "\n\n")
    
    global_out.write("## 2. Padrões Estruturais Comuns\n\n")
    global_out.write("Como a plataforma é unificada (Google Sites), os padrões comportamentais repetem-se nas páginas secundárias. As características a seguir não serão repetidas a cada página, e servem como contexto global de base para o recriação do UI de todas as *views* locais:\n\n")
    
    global_out.write("### Cabeçalho (Header)\n")
    global_out.write("- **Posição:** `fixed` ao topo, de largura `100%` da viewport e sempre no plano superior (z-index alto).\n")
    global_out.write("- **Navegação:** Lista de links principais em flex/inline-block, com expansão interativa em menu cascata para agrupamentos ou links externos, como contatos.\n")
    global_out.write("- **Mobile:** Recolhida e encapsulada em ícone \"hambúrguer\" interativo comportando o mesmo menu nativo. Botão de Lupa à direita para abrir box de busca global da UI.\n\n")
    
    global_out.write("### Blocos Interativos Básicos (Sections & Imagens)\n")
    global_out.write("- **Banners Amplos:** Contêineres configurados em 100% da viewport (ou limite de frame interno), frequentemente renderizando seu background nativo atrelado à prop CSS `background-size: cover; background-position: center center;` para criar heros grandes e chamativos.\n")
    global_out.write("- **Elementos Interativos:** Em sua maioria, hiperlinks normais `<a href=\"...\">` injetados em blocos de listas em grade cobrindo miniaturas e títulos para portfólio.\n\n")

    global_out.write("### Rodapé (Footer)\n")
    global_out.write("- **Formato:** Quando aplicável e estruturado ao final da listagem do DOM, fica encarregado de deter direitos autorais básicos. Na grande maioria das exibições captadas, as páginas injetam componentes no pré-rodapé da própria main container para listar de contatos rápidos antes da div nativa de rodapé final.\n")


# Write Page Reports
for page in pages_data:
    filename = page['file'].replace('/', '_').replace('.html', '.md')
    filepath = os.path.join('relatorios', filename)
    with open(filepath, 'w', encoding='utf-8') as out:
        out.write(f"# Estrutura de Conteúdo Específico: `{page['file']}`\n\n")
        out.write("> **Nota:** Configurações globais de tipografia, cores e blocos sistêmicos (como Header e Footer nativos) encontram-se descritos no arquivo central: `00_relatorio_geral.md`.\n\n")
        
        out.write("## Cabeçalho e Menus Específicos (Header)\n")
        if page['header_links']:
            links_clean = list(dict.fromkeys([l for l in page['header_links'] if l]))
            out.write(f"- **Sub-Links / Rotas Identificadas:** {', '.join(links_clean)}\n\n")
        else:
            out.write("- Nenhum link de navegação extraído ativamente ou ausentes no preenchimento.\n\n")
            
        out.write("## Componentes de Seções Isoladas\n")
        if not page['sections']:
            out.write("- Essa view não encapsula conteúdo através das tags de section semântica, delegando o layout para grid das divs internas ou blocos lineares.\n\n")
            
        for i, sec in enumerate(page['sections']):
            out.write(f"### Seção {i+1}\n")
            if sec['bg']:
                out.write("- **Aparência/Fundos:** Identificado fundo forçado, via cover art de background inline ou gradiente CSS sobre esta região direta.\n")
            else:
                out.write("- **Aparência/Fundos:** Layout vazio (Corpo nativo do container pai).\n")
                
            if sec['texts']:
                snippet = " | ".join(sec['texts'][:15])
                if len(sec['texts']) > 15:
                    snippet += " ..."
                out.write(f"- **Conteúdo Literal Extraído:** {snippet}\n")
            else:
                out.write("- **Conteúdo Literal Extraído:** [Nulo / Exclusivamente Visual]\n")
                
            if sec['links']:
                links_clean = list(dict.fromkeys([l for l in sec['links'] if l]))
                out.write(f"- **Comportamento & Links Nativos:** {', '.join(links_clean)}\n")
            out.write("\n")
            
        out.write("## Textos de Rodapé Opcionais\n")
        if page['footer_text']:
            out.write(f"- **Cópias / Textos Fixados:** {' | '.join(page['footer_text'])}\n\n")
        else:
            out.write("- [Nulo]\n\n")

print("Generated general report and individual reports in 'relatorios' directory.")
