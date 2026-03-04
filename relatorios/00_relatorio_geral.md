# Relatório Geral: Design System e Estrutura Global

Este documento reúne as informações globais e configurações de Design System compartilháveis por todas as páginas do site.

## 1. Design System Global

### Cores Detectadas (Principais do Site Inteiro):
- Variações principais: 767, 519, d96d97, 4a8d, 4d9844, rgba(0,0,0,0.6399999857), EDd, 200, rgba(255,255,255,0.6999999881), rgba(255,255,255,0.5), rgba(255,255,255,0.3600000143), b931, a1b, rgba(255,255,255,1), rgba(0,0,0,1), 100, 46adda, 748095, rgba(27,27,27,1), 0819f1, 120, rgba(255,255,255,0.200000003), 9b50ba, rgba(52,52,52,0.1000000015), abe, rgba(225,223,219,1), 5c73, 6ef, eade, rgba(198,198,191,1)...

### Famílias de Fontes:
- Fontes: font-family: 'Source Sans Pro', sans-serif, font-family: Quicksand, sans-serif

## 2. Padrões Estruturais Comuns

Como a plataforma é unificada (Google Sites), os padrões comportamentais repetem-se nas páginas secundárias. As características a seguir não serão repetidas a cada página, e servem como contexto global de base para o recriação do UI de todas as *views* locais:

### Cabeçalho (Header)
- **Posição:** `fixed` ao topo, de largura `100%` da viewport e sempre no plano superior (z-index alto).
- **Navegação:** Lista de links principais em flex/inline-block, com expansão interativa em menu cascata para agrupamentos ou links externos, como contatos.
- **Mobile:** Recolhida e encapsulada em ícone "hambúrguer" interativo comportando o mesmo menu nativo. Botão de Lupa à direita para abrir box de busca global da UI.

### Blocos Interativos Básicos (Sections & Imagens)
- **Banners Amplos:** Contêineres configurados em 100% da viewport (ou limite de frame interno), frequentemente renderizando seu background nativo atrelado à prop CSS `background-size: cover; background-position: center center;` para criar heros grandes e chamativos.
- **Elementos Interativos:** Em sua maioria, hiperlinks normais `<a href="...">` injetados em blocos de listas em grade cobrindo miniaturas e títulos para portfólio.

### Rodapé (Footer)
- **Formato:** Quando aplicável e estruturado ao final da listagem do DOM, fica encarregado de deter direitos autorais básicos. Na grande maioria das exibições captadas, as páginas injetam componentes no pré-rodapé da própria main container para listar de contatos rápidos antes da div nativa de rodapé final.
