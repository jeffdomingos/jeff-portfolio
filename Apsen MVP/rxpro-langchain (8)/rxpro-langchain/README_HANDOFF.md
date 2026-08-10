# RX PRO Assist - LangChain Agent Chat UI

## 📋 Sobre Este Projeto

Este é um **fork customizado** do [agent-chat-ui](https://github.com/langchain-ai/agent-chat-ui) da LangChain, adaptado com o **Design System RX PRO** da Afya/Apsen.

**Base técnica:** LangChain Agent Chat UI + LangGraph SDK  
**Design:** 100% fiel ao protótipo Figma RX PRO  
**Objetivo:** Shell de UI pronto para integração com agentes LangChain

---

## 🎨 Estrutura Visual

### Tailwind CSS v4

Este projeto usa **Tailwind CSS v4**, que tem uma sintaxe diferente da v3:

- ❌ Cores **NÃO** são definidas em `tailwind.config.js`
- ✅ Cores **SÃO** definidas em `src/app/globals.css`

### Cores RX PRO

Todas as cores estão definidas em `src/app/globals.css`:

```css
:root {
  /* RX PRO Design System Colors */
  --rx-primary: #ED2025;
  --rx-primary-dark: #C91D21;
  --rx-background: #F5F5F5;
  --rx-header-bg: #FAFAFA;
  --rx-bot-bubble: #F5F5F5;
  --rx-user-bubble: #ED2025;
}

@theme inline {
  /* Registra as cores para o Tailwind */
  --color-rx-primary: var(--rx-primary);
  --color-rx-primary-dark: var(--rx-primary-dark);
  --color-rx-background: var(--rx-background);
  --color-rx-header-bg: var(--rx-header-bg);
  --color-rx-bot-bubble: var(--rx-bot-bubble);
  --color-rx-user-bubble: var(--rx-user-bubble);
}
```

**Para adicionar novas cores:**
1. Adicione a variável em `:root`
2. Registre no `@theme inline`
3. Use no código como `bg-rx-nomeDaCor`

---

## 📦 Componentes Customizados

Todos os componentes visuais estão em `src/components/`:

```
src/components/
├── MockChat.tsx              # Chat mockado para testes de UI (ATIVO)
├── GlobalHeader.tsx          # Header vermelho com logo RX PRO
├── GlobalFooter.tsx          # Footer cinza com copyright
├── BotMessageBubble.tsx      # Bolha cinza do assistente com Markdown
├── UserMessageBubble.tsx     # Bolha vermelha do usuário
├── ThinkingIndicator.tsx     # Indicador "digitando..." animado
├── ErrorBubble.tsx           # Bolha de erro com borda vermelha
├── Citation.tsx              # Citação bibliográfica em itálico
├── LinkPreviewCard.tsx       # Card de preview de link (com/sem imagem)
├── MyCustomMessage.tsx       # Roteador de tipos de mensagem
├── RxHeader.tsx              # Header interno do chat (avatar Apsen)
├── ChatKitPanelMock.tsx      # Painel mockado (do projeto anterior)
└── ChatKitPanelReal.tsx      # Painel real (do projeto anterior)
```

### Componentes Adaptados do Figma

- `BotMessageBubble`: Fundo `#F5F5F5`, renderiza Markdown completo
- `UserMessageBubble`: Fundo `#ED2025`, texto branco, alinhado à direita
- `Citation`: Texto em itálico com ícone de livro
- `LinkPreviewCard`: Card clicável com imagem (ou fallback sem imagem)
- `ErrorBubble`: Borda vermelha, ícone de alerta

---

## 🔀 Mock vs Real

### Modo Mock (ATUAL)

O arquivo `src/app/page.tsx` está renderizando o `MockChat.tsx`:

```tsx
<MockChat />
```

**Vantagens:**
- ✅ Testa UI isoladamente sem backend
- ✅ 8 comandos de demonstração (ver abaixo)
- ✅ Simula delay, thinking indicator, metadata
- ✅ Perfeito para QA visual

### Modo Real (PRODUÇÃO)

Para usar o chat real do LangChain:

1. Abra `src/app/page.tsx`
2. Comente a linha do `MockChat`
3. Descomente o componente `Thread` original

```tsx
{/* --- MOCK VISUAL (Para Testes de UI) --- */}
{/* <MockChat /> */}

{/* --- REAL LANGCHAIN (Para Produção) --- */}
<Thread />
```

---

## 🧪 Comandos de Teste (Mock)

Digite estes comandos no `MockChat` para testar os recursos visuais:

| Comando | Resultado |
|---------|-----------|
| `formatacao` | Todo o Markdown (H1, H2, negrito, itálico, listas) |
| `richtext` | Formatação rica completa com emojis |
| `citacao` | Mensagem com fonte bibliográfica |
| `artigo` | Preview de link COM imagem |
| `documento` | Preview de link SEM imagem (fallback) |
| `longo` | Resposta longa para testar scroll |
| `erro` | Bolha de erro vermelha |
| `completo` | Todos os recursos juntos (citação + preview + Markdown) |

---

## 📦 O Contrato de Metadados

Para que os componentes visuais funcionem, o **backend LangChain** deve retornar mensagens com este formato:

### Mensagem Simples

```json
{
  "id": "msg_123",
  "role": "assistant",
  "content": "Texto da resposta com **Markdown**"
}
```

### Mensagem com Citação

```json
{
  "id": "msg_124",
  "role": "assistant",
  "content": "O probiótico demonstrou eficácia comprovada.",
  "metadata": {
    "source": "Smith et al., 2024 - Journal of Medicine"
  }
}
```

### Mensagem com Preview de Link

```json
{
  "id": "msg_125",
  "role": "assistant",
  "content": "Encontrei este artigo relevante:",
  "metadata": {
    "linkPreview": {
      "title": "Estudo Comparativo",
      "description": "Descrição do estudo",
      "url": "https://exemplo.com/artigo",
      "imageUrl": "https://exemplo.com/imagem.jpg"
    }
  }
}
```

**Nota:** `imageUrl` é opcional. Se ausente, o card mostra um ícone de documento.

### Mensagem Completa

```json
{
  "id": "msg_126",
  "role": "assistant",
  "content": "Resumo completo sobre o produto",
  "metadata": {
    "source": "Estudo Clínico Apsen, 2024",
    "linkPreview": {
      "title": "Artigo Principal",
      "description": "Como o produto atua",
      "url": "https://rxpro.com.br/artigo",
      "imageUrl": "https://exemplo.com/imagem.jpg"
    }
  }
}
```

---

## 🚀 Setup Rápido

### 1. Instalar dependências

```bash
pnpm install
```

### 2. Configurar variáveis de ambiente

```bash
cp .env.example .env.local
```

Edite `.env.local`:

```env
# LangGraph API
NEXT_PUBLIC_API_URL=https://your-langgraph-api.com
NEXT_PUBLIC_ASSISTANT_ID=your_assistant_id

# LangSmith (opcional, para tracing)
LANGSMITH_API_KEY=your_langsmith_key
```

### 3. Rodar o projeto

```bash
pnpm run dev
```

Abra http://localhost:3000

---

## 🔧 Tecnologias

- **Next.js 15.3.2** - Framework React
- **React 19.1.0** - UI library
- **Tailwind CSS v4** - Estilização (`@tailwindcss/postcss`)
- **TypeScript** - Tipagem estática
- **LangGraph SDK 1.0.0** - Integração com agentes LangChain
- **react-markdown** - Renderização de Markdown
- **pnpm** - Gerenciador de pacotes

---

## 📁 Estrutura de Pastas

```
rxpro-langchain/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Página principal (troca Mock ↔ Real aqui)
│   │   ├── globals.css           # Cores RX PRO + Tailwind v4 theme
│   │   └── layout.tsx            # Layout raiz
│   ├── components/
│   │   ├── MockChat.tsx          # Chat mockado (ATIVO)
│   │   ├── GlobalHeader.tsx      # Header vermelho
│   │   ├── GlobalFooter.tsx      # Footer cinza
│   │   ├── BotMessageBubble.tsx  # Bolha do bot
│   │   ├── UserMessageBubble.tsx # Bolha do usuário
│   │   └── ...                   # Outros componentes
│   ├── lib/
│   │   └── config.ts             # Configurações (GREETING, etc.)
│   └── agent/
│       └── ...                   # Código original LangChain
├── public/
│   └── avatar.png                # Logo Apsen
├── tailwind.config.js            # Config Tailwind (apenas estrutura)
└── package.json
```

---

## 🐛 Troubleshooting

### Cores não aparecem

**Problema:** Classes como `bg-rx-primary` não funcionam.

**Solução:** 
1. Verifique se as cores estão em `src/app/globals.css` (`:root` e `@theme inline`)
2. Reinicie o servidor: `Ctrl+C` e `pnpm run dev`
3. Limpe o cache: `rm -rf .next`

### Botão invisível

**Problema:** Botão de envio não aparece.

**Causa:** Tailwind v4 não reconhece a cor.

**Solução:** Use valores hardcoded temporariamente para testar:
```tsx
className="bg-[#ED2025]"  // em vez de bg-rx-primary
```

Se funcionar, o problema é a configuração do Tailwind (ver seção "Cores não aparecem").

### Compilação lenta

**Problema:** Next.js demora muito para compilar.

**Solução:**
```bash
rm -rf .next
rm -rf node_modules
pnpm install
pnpm run dev
```

---

## 🚢 Deploy

### Vercel (Recomendado)

```bash
vercel
```

Configure as variáveis de ambiente no dashboard:
- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_ASSISTANT_ID`
- `LANGSMITH_API_KEY` (opcional)

### Outras plataformas

Certifique-se de configurar:
- Node.js 18+
- Build command: `pnpm run build`
- Output directory: `.next`

---

## 📝 Notas para o Time de Dev

### ⚠️ Não Modifique

- `src/components/GlobalHeader.tsx` - Header fixo do design
- `src/components/GlobalFooter.tsx` - Footer fixo do design
- `src/components/*MessageBubble.tsx` - Componentes visuais do Figma
- `src/app/globals.css` (cores RX PRO) - Sistema de cores aprovado

### ✅ Pode Modificar

- `src/components/MockChat.tsx` - Adicione mais comandos de teste se necessário
- `src/lib/config.ts` - Ajuste mensagens, prompts iniciais
- Componentes do LangChain original em `src/agent/`

### 🎨 Para Adicionar Novas Cores

1. Adicione em `src/app/globals.css`:
   ```css
   :root {
     --rx-nova-cor: #123456;
   }
   
   @theme inline {
     --color-rx-nova-cor: var(--rx-nova-cor);
   }
   ```

2. Use no código:
   ```tsx
   className="bg-rx-nova-cor"
   ```

3. Reinicie o servidor

---

## 🤝 Suporte

**Dúvidas sobre UI/Design:** Equipe de Design RX PRO  
**Dúvidas sobre LangChain:** [Documentação LangChain](https://python.langchain.com/)  
**Dúvidas sobre Next.js:** [Documentação Next.js](https://nextjs.org/docs)

---

**Construído com ❤️ pela equipe RX PRO**
