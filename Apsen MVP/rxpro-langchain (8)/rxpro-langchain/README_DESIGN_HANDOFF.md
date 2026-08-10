# [UI SHELL] - Handoff de Design para Engenharia: Chatbot RX PRO# [UI SHELL] - Handoff de Design para Engenharia: Chatbot RX PRO# RX PRO - ChatKit Next.js



## 📋 Objetivo do Projeto



Este é um **shell de UI em Next.js + Tailwind CSS**, criado pelo Design para servir como a **"casca" visual** do Chatbot RX PRO - Assistente Virtual Afya | Apsen.## 📋 Objetivo do ProjetoAplicação ChatKit com Next.js 15, TypeScript e Tailwind CSS v4.



O objetivo principal é garantir **100% de fidelidade visual ao protótipo do Figma** e fornecer uma base sólida para a equipe de engenharia integrar com o **OpenAI Agent Builder**.



---Este é um **shell de UI em Next.js + Tailwind CSS**, criado por Jefferson Domingos | Product Designer Afya para servir como a **"casca" visual** do Chatbot RX PRO - Assistente Virtual Afya | Apsen.## 🚀 Setup Rápido



## 🎨 Estrutura Visual e Customização



### Como Funciona a CustomizaçãoO objetivo principal é garantir **fidelidade visual ao protótipo do Figma** e fornecer uma base sólida para a equipe de engenharia integrar com o **OpenAI Agent Builder**.



A customização visual **não é feita apenas por CSS**. Este projeto usa a arquitetura de componentes do ChatKit de forma avançada:### 1. Instalar dependências



1. **Web Component Wrapper**: O ChatKit é carregado via script CDN como Web Component (`<chatkit-thread>`)```bash

2. **Componentes React Customizados**: Usamos a prop `components` (quando disponível) ou renderização customizada para "ejetar" os componentes padrão e injetar nossos próprios

3. **Componentes Localizados**: Todos os componentes visuais customizados estão em `app/components/`---npm install



### Componentes Principais```



```## 🎨 Estrutura Visual e Customização

app/components/

├── ChatKitPanelMock.tsx      # Painel mockado (ATIVO) - para testes de UI### 2. Configurar variáveis de ambiente

├── ChatKitPanelReal.tsx      # Painel real (COMENTADO) - para integração com Agent Builder

├── MyCustomMessage.tsx       # Roteador de mensagens (user/assistant/thinking/error)### Como Funciona a Customização

├── BotMessageBubble.tsx      # Bolha cinza do bot com Markdown

├── UserMessageBubble.tsx     # Bolha vermelha do usuárioCopie `.env.local.example` para `.env.local`:

├── ThinkingIndicator.tsx     # Indicador de "digitando..."

├── ErrorBubble.tsx           # Bolha de erro com borda vermelhaA customização visual **não é feita apenas por CSS**. Este projeto usa a arquitetura de componentes do ChatKit de forma avançada:```bash

├── Citation.tsx              # Componente de citação/fonte bibliográfica

├── LinkPreviewCard.tsx       # Card de preview de link (com/sem imagem)cp .env.local.example .env.local

└── RxHeader.tsx              # Header do chat com avatar Apsen

```1. **Web Component Wrapper**: O ChatKit é carregado via script CDN como Web Component (`<chatkit-thread>`)```



---2. **Componentes React Customizados**: Usamos a prop `components` (quando disponível) ou renderização customizada para "ejetar" os componentes padrão e injetar nossos próprios



## 📦 O "Contrato" de Metadados (IMPORTANTE)3. **Componentes Localizados**: Todos os componentes visuais customizados estão em `app/components/`Edite `.env.local` e configure:



### Por que isso é crítico?



Para que os **componentes visuais customizados** (como Citações e Previews de Link) funcionem corretamente, o **backend (RAG)** precisa retornar um objeto `metadata` específico junto com a mensagem do assistente.### Componentes Principais```env



O arquivo `ChatKitPanelMock.tsx` **simula esta estrutura**. Por favor, usem-no como o **"contrato visual"** que o RAG deve seguir.OPENAI_API_KEY=sk-proj-your-actual-key



### Estrutura de Mensagem Esperada```NEXT_PUBLIC_CHATKIT_WORKFLOW_ID=wf_your_workflow_id



```typescriptapp/components/```

{

  "id": "msg_123",├── ChatKitPanelMock.tsx      # Painel mockado (ATIVO) - para testes de UI

  "role": "assistant",

  "content": "Aqui está a resposta com formatação Markdown...",├── ChatKitPanelReal.tsx      # Painel real (COMENTADO) - para integração com Agent Builder**Onde conseguir:**

  "metadata": {

    // Citação/Fonte Bibliográfica (OPCIONAL)├── MyCustomMessage.tsx       # Roteador de mensagens (user/assistant/thinking/error)- **API Key**: https://platform.openai.com/api-keys

    "source": "Baştürk et al., 2016 - Journal of Medicine",

    ├── BotMessageBubble.tsx      # Bolha cinza do bot com Markdown- **Workflow ID**: https://platform.openai.com/chatkit/workflows

    // Preview de Link (OPCIONAL)

    "linkPreview": {├── UserMessageBubble.tsx     # Bolha vermelha do usuário

      "title": "Estudo Comparativo: Eficácia do B. lactis B94",

      "description": "Eficácia do B. lactis B94 vs. S. boulardii em gastroenterite por rotavírus.",├── ThinkingIndicator.tsx     # Indicador de "digitando..."### 3. Criar Workflow no OpenAI

      "url": "https://rxpro.com.br/estudo",

      "imageUrl": "https://exemplo.com/imagem.jpg" // OPCIONAL - se ausente, mostra fallback sem imagem├── ErrorBubble.tsx           # Bolha de erro com borda vermelha

    }

  }├── Citation.tsx              # Componente de citação/fonte bibliográfica1. Acesse https://platform.openai.com/chatkit/workflows

}

```├── LinkPreviewCard.tsx       # Card de preview de link (com/sem imagem)2. Clique em "Create Workflow"



### Exemplos de Uso nos Componentes└── RxHeader.tsx              # Header do chat com avatar Apsen3. Configure:



#### 1. Mensagem Simples (sem metadata)```   - **Name**: RX PRO Assistant

```json

{   - **Instructions**: "Você é um assistente virtual da RX Pro - Afya representando a Apsen. Ajude profissionais de saúde com informações sobre produtos farmacêuticos."

  "role": "assistant",

  "content": "Olá! Como posso ajudar?"---4. Copie o Workflow ID (começa com `wf_`)

}

```

**Resultado**: Apenas a bolha cinza com o texto.

## 📦 O "Contrato" de Metadados (IMPORTANTE)### 4. Rodar o projeto

---



#### 2. Mensagem com Citação

```json### Por que isso é crítico?```bash

{

  "role": "assistant",npm run dev

  "content": "O probiótico demonstrou eficácia comprovada em estudos recentes.",

  "metadata": {Para que os **componentes visuais customizados** (como Citações e Previews de Link) funcionem corretamente, o **backend (RAG)** precisa retornar um objeto `metadata` específico junto com a mensagem do assistente.```

    "source": "Smith et al., 2024 - Journal of Pharmaceutical Sciences"

  }

}

```O arquivo `ChatKitPanelMock.tsx` **simula esta estrutura**. Por favor, usem-no como o **"contrato visual"** que o RAG deve seguir.Abra http://localhost:3000

**Resultado**: Bolha cinza + texto em itálico abaixo com a fonte.



---

### Estrutura de Mensagem Esperada## 📁 Estrutura

#### 3. Mensagem com Preview de Link (com imagem)

```json

{

  "role": "assistant",```typescript```

  "content": "Encontrei este artigo relevante:",

  "metadata": {{chatkit-nextjs/

    "linkPreview": {

      "title": "Guia Completo de Produtos",  "id": "msg_123",├── app/

      "description": "Conheça toda a linha farmacêutica",

      "url": "https://apsen.com.br/catalogo",  "role": "assistant",│   ├── api/

      "imageUrl": "https://cardiologiahmt.com.br/wp-content/uploads/2019/09/estudo-clinico.jpg"

    }  "content": "Aqui está a resposta com formatação Markdown...",│   │   └── create-session/

  }

}  "metadata": {│   │       └── route.ts          # API route para criar sessões

```

**Resultado**: Bolha cinza + card de preview com imagem, título, descrição e link.    // Citação/Fonte Bibliográfica (OPCIONAL)│   ├── globals.css               # Estilos globais + Tailwind



---    "source": "Baştürk et al., 2016 - Journal of Medicine",│   ├── layout.tsx                # Layout raiz com ChatKit script



#### 4. Mensagem com Preview de Link (sem imagem - fallback)    │   └── page.tsx                  # Página principal

```json

{    // Preview de Link (OPCIONAL)├── components/

  "role": "assistant",

  "content": "Aqui está a bula oficial (PDF):",    "linkPreview": {│   ├── ChatKitPanel.tsx          # Componente principal do chat

  "metadata": {

    "linkPreview": {      "title": "Estudo Comparativo: Eficácia do B. lactis B94",│   └── ErrorOverlay.tsx          # Overlay de erros/loading

      "title": "Bula Oficial - Produto X (PDF)",

      "description": "Documento oficial da ANVISA",      "description": "Eficácia do B. lactis B94 vs. S. boulardii em gastroenterite por rotavírus.",├── lib/

      "url": "https://rxpro.com.br/bula.pdf"

      // Sem imageUrl - o card aparece sem imagem      "url": "https://rxpro.com.br/estudo",│   └── config.ts                 # Configurações centralizadas

    }

  }      "imageUrl": "https://exemplo.com/imagem.jpg" // OPCIONAL - se ausente, mostra fallback sem imagem└── .env.local                    # Variáveis de ambiente (não comitar!)

}

```    }```

**Resultado**: Bolha cinza + card de preview sem imagem (apenas ícone de documento).

  }

---

}## 🎨 Personalização

#### 5. Mensagem Completa (citação + preview)

```json```

{

  "role": "assistant",### Cores RX PRO

  "content": "Aqui está um resumo completo sobre o produto:",

  "metadata": {### Exemplos de Uso nos ComponentesDefinidas em `app/globals.css`:

    "source": "Estudo Clínico Apsen, 2024",

    "linkPreview": {- Primary: `#DC2626`

      "title": "Artigo Principal do Produto",

      "description": "Veja como ele atua no organismo.",#### 1. Mensagem Simples (sem metadata)- Header: `#ED2025`

      "url": "https://rxpro.com.br/artigo-completo",

      "imageUrl": "https://cardiologiahmt.com.br/wp-content/uploads/2019/09/estudo-clinico.jpg"```json- Background: `#F9FAFB`

    }

  }{

}

```  "role": "assistant",### Prompts iniciais

**Resultado**: Bolha cinza + citação + card de preview com imagem.

  "content": "Olá! Como posso ajudar?"Edite `lib/config.ts`:

---

}```typescript

## 🚀 Instruções para Integração (Para os Devs)

```export const STARTER_PROMPTS = [

### Passo 1: Trocar para o Painel Real

**Resultado**: Apenas a bolha cinza com o texto.  { label: "...", prompt: "..." },

No arquivo `app/page.tsx`:

]

```tsx

// Comente esta linha:---```

// <ChatKitPanelMock theme="light" />



// Descomente esta linha:

<ChatKitPanelReal theme="light" />#### 2. Mensagem com Citação### Mensagem de boas-vindas

```

```json```typescript

---

{export const GREETING = "Sua mensagem aqui"

### Passo 2: Configurar as Variáveis de Ambiente

  "role": "assistant",```

Crie um arquivo `.env.local` na raiz do projeto com:

  "content": "O probiótico demonstrou eficácia comprovada em estudos recentes.",

```env

# OpenAI Agent Builder  "metadata": {## 🔧 Tecnologias

NEXT_PUBLIC_CHATKIT_WORKFLOW_ID=seu_workflow_id_aqui

    "source": "Smith et al., 2024 - Journal of Pharmaceutical Sciences"

# API Key da OpenAI (para o backend)

OPENAI_API_KEY=sua_api_key_aqui  }- **Next.js 15** - Framework React

```

}- **TypeScript** - Tipagem estática

**Onde conseguir:**

- **API Key**: https://platform.openai.com/api-keys```- **Tailwind CSS v4** - Estilização

- **Workflow ID**: https://platform.openai.com/chatkit/workflows

**Resultado**: Bolha cinza + texto em itálico abaixo com a fonte.- **@openai/chatkit-react** - Componente ChatKit oficial

---

- **OpenAI Workflows API** - Backend AI

### Passo 3: Validar o Endpoint de Criação de Sessão

---

O componente `ChatKitPanelReal` faz uma chamada para `/api/create-session`. 

## 📝 Arquitetura

Certifique-se de que o arquivo `app/api/create-session/route.ts` está funcionando corretamente e retornando:

#### 3. Mensagem com Preview de Link (com imagem)

```json

{```json1. **Frontend** chama `/api/create-session`

  "sessionId": "session_abc123"

}{2. **API Route** cria sessão na OpenAI com API key

```

  "role": "assistant",3. **OpenAI** retorna `client_secret`

---

  "content": "Encontrei este artigo relevante:",4. **ChatKit** usa `client_secret` para autenticar

### Passo 4: Validar o RAG (MAIS IMPORTANTE)

  "metadata": {5. **Mensagens** fluem direto entre ChatKit e OpenAI

**Este é o passo crítico para que a UI funcione 100%.**

    "linkPreview": {

Peça à equipe de backend para garantir que as respostas do **RAG/Agent Builder** incluem o objeto `metadata` (como nos exemplos acima) para que o componente `<MyCustomMessage />` possa renderizar:

      "title": "Guia Completo de Produtos",## 🐛 Troubleshooting

- ✅ Citações bibliográficas

- ✅ Previews de link com/sem imagem      "description": "Conheça toda a linha farmacêutica",

- ✅ Formatação Markdown correta

      "url": "https://apsen.com.br/catalogo",**Erro "Configure NEXT_PUBLIC_CHATKIT_WORKFLOW_ID"**

**Dica**: Use o `ChatKitPanelMock.tsx` como referência. Ele simula exatamente como os metadados devem vir do backend.

      "imageUrl": "https://cardiologiahmt.com.br/wp-content/uploads/2019/09/estudo-clinico.jpg"- Verifique se `.env.local` existe e tem o Workflow ID correto

---

    }- Reinicie o servidor: `Ctrl+C` e `npm run dev` novamente

## 🎨 Paleta de Cores RX PRO

  }

```css

--primary: #ED2025          /* Vermelho RX PRO */}**Chat não carrega**

--primary-dark: #C91D21     /* Hover state */

--background: #F5F5F5       /* Gray 5 - fundo da página */```- Verifique se OPENAI_API_KEY está correta

--header-bg: #FAFAFA        /* Cinza suave do header do chat */

--bot-bubble: #F5F5F5       /* Fundo da bolha do bot */**Resultado**: Bolha cinza + card de preview com imagem, título, descrição e link.- Veja console do navegador (F12) para erros detalhados

--user-bubble: #ED2025      /* Fundo da bolha do usuário */

```- Veja logs do terminal onde rodou `npm run dev`



------



## 📦 Estrutura de Pastas**Script ChatKit não carrega**



```#### 4. Mensagem com Preview de Link (sem imagem - fallback)- Verifique conexão com internet

chatkit-nextjs/

├── app/```json- CDN: https://cdn.platform.openai.com/deployments/chatkit/chatkit.js

│   ├── components/         # Todos os componentes customizados

│   ├── api/{

│   │   └── create-session/ # Endpoint de criação de sessão

│   ├── layout.tsx          # Root layout com fontes e scripts  "role": "assistant",## 🚢 Deploy

│   ├── page.tsx            # Página principal (troca Mock ↔ Real aqui)

│   └── globals.css         # Estilos globais e animações  "content": "Aqui está a bula oficial (PDF):",

├── lib/

│   └── config.ts           # Configurações (WORKFLOW_ID, GREETING, etc.)  "metadata": {### Vercel (Recomendado)

├── public/

│   └── avatar.png          # Logo Apsen para o avatar    "linkPreview": {```bash

└── README.md               # Este arquivo

```      "title": "Bula Oficial - Produto X (PDF)",vercel



---      "description": "Documento oficial da ANVISA",```



## 🧪 Comandos de Teste (Mock)      "url": "https://rxpro.com.br/bula.pdf"



O `ChatKitPanelMock` tem **8 comandos de demonstração** para testar todos os recursos visuais:      // Sem imageUrl - o card aparece sem imagemConfigure as variáveis de ambiente no dashboard da Vercel.



| Comando | Descrição |    }

|---------|-----------|

| `formatacao` | Testa todos os estilos de Markdown (H1, H2, negrito, itálico, listas, citações) |  }### Outras plataformas

| `richtext` | Demonstração completa de formatação rica |

| `citacao` | Mensagem com fonte bibliográfica |}Certifique-se de configurar:

| `artigo` | Preview de link COM imagem |

| `documento` | Preview de link SEM imagem (fallback) |```- `OPENAI_API_KEY` (secret)

| `longo` | Resposta longa para testar scroll |

| `erro` | Bolha de erro com borda vermelha |**Resultado**: Bolha cinza + card de preview sem imagem (apenas ícone de documento).- `NEXT_PUBLIC_CHATKIT_WORKFLOW_ID` (public)

| `completo` | Todos os recursos juntos (citação + preview + Markdown) |



---

---

## 🔧 Tecnologias Utilizadas

#### 5. Mensagem Completa (citação + preview)

- **Next.js 16.0.1** (App Router)```json

- **React 19.2.0**{

- **Tailwind CSS v4** (@tailwindcss/postcss)  "role": "assistant",

- **TypeScript 5**  "content": "Aqui está um resumo completo sobre o produto:",

- **@openai/chatkit-react 1.2.0** (Web Component wrapper)  "metadata": {

- **react-markdown** (renderização de Markdown customizada)    "source": "Estudo Clínico Apsen, 2024",

    "linkPreview": {

---      "title": "Artigo Principal do Produto",

      "description": "Veja como ele atua no organismo.",

## 🚀 Setup Rápido      "url": "https://rxpro.com.br/artigo-completo",

      "imageUrl": "https://cardiologiahmt.com.br/wp-content/uploads/2019/09/estudo-clinico.jpg"

### 1. Instalar dependências    }

```bash  }

npm install}

``````

**Resultado**: Bolha cinza + citação + card de preview com imagem.

### 2. Configurar variáveis de ambiente

```bash---

cp .env.local.example .env.local

# Edite .env.local com suas chaves## 🚀 Instruções para Integração (Para os Devs)

```

### Passo 1: Trocar para o Painel Real

### 3. Rodar o projeto

```bashNo arquivo `app/page.tsx`:

npm run dev

``````tsx

// Comente esta linha:

Abra http://localhost:3000// <ChatKitPanelMock theme="light" />



---// Descomente esta linha:

<ChatKitPanelReal theme="light" />

## 📝 Notas Finais para os Devs```



### Sobre o Mock vs Real---



- O **Mock** é 100% funcional e independente de backend### Passo 2: Configurar as Variáveis de Ambiente

- O **Real** conecta-se ao Agent Builder via Web Component

- **Ambos compartilham os mesmos componentes visuais** (BotMessageBubble, UserMessageBubble, etc.)Crie um arquivo `.env.local` na raiz do projeto com:



### Sobre os Componentes Customizados```env

# OpenAI Agent Builder

- Os componentes em `app/components/` **não devem ser modificados** sem consultar o DesignNEXT_PUBLIC_CHATKIT_WORKFLOW_ID=seu_workflow_id_aqui

- Qualquer mudança visual deve ser feita **apenas nesses componentes**

- O objetivo é manter **100% de fidelidade ao Figma**# API Key da OpenAI (para o backend)

OPENAI_API_KEY=sua_api_key_aqui

### Sobre o Contrato de Metadados```



- **Não mude a estrutura do objeto `metadata`** sem avisar o Design---

- Se o RAG não conseguir retornar a estrutura exata, os componentes simplesmente não renderizarão as citações/previews

- **Teste sempre com o Mock primeiro** para validar a estrutura antes de integrar com o Real### Passo 3: Validar o Endpoint de Criação de Sessão



---O componente `ChatKitPanelReal` faz uma chamada para `/api/create-session`. 



## 🚢 DeployCertifique-se de que o arquivo `app/api/create-session/route.ts` está funcionando corretamente e retornando:



### Vercel (Recomendado)```json

```bash{

vercel  "sessionId": "session_abc123"

```}

```

Configure as variáveis de ambiente no dashboard da Vercel:

- `OPENAI_API_KEY` (secret)---

- `NEXT_PUBLIC_CHATKIT_WORKFLOW_ID` (public)

### Passo 4: Validar o RAG (MAIS IMPORTANTE)

---

**Este é o passo crítico para que a UI funcione 100%.**

## 🤝 Suporte

Peça à equipe de backend para garantir que as respostas do **RAG/Agent Builder** incluem o objeto `metadata` (como nos exemplos acima) para que o componente `<MyCustomMessage />` possa renderizar:

Para dúvidas sobre a UI, componentes ou estrutura visual, entre em contato com a equipe de Design.

- ✅ Citações bibliográficas

Para dúvidas sobre integração com o Agent Builder, consulte a [documentação oficial do ChatKit](https://platform.openai.com/docs/chatkit).- ✅ Previews de link com/sem imagem

- ✅ Formatação Markdown correta

---

**Dica**: Use o `ChatKitPanelMock.tsx` como referência. Ele simula exatamente como os metadados devem vir do backend.

**Construído com ❤️ pelo time de Design para o time de Engenharia**

---

## 🎨 Paleta de Cores RX PRO

```css
--primary: #ED2025          /* Vermelho RX PRO */
--primary-dark: #C91D21     /* Hover state */
--background: #F5F5F5       /* Gray 5 - fundo da página */
--header-bg: #FAFAFA        /* Cinza suave do header do chat */
--bot-bubble: #F5F5F5       /* Fundo da bolha do bot */
--user-bubble: #ED2025      /* Fundo da bolha do usuário */
```

---

## 📦 Estrutura de Pastas

```
chatkit-nextjs/
├── app/
│   ├── components/         # Todos os componentes customizados
│   ├── api/
│   │   └── create-session/ # Endpoint de criação de sessão
│   ├── layout.tsx          # Root layout com fontes e scripts
│   ├── page.tsx            # Página principal (troca Mock ↔ Real aqui)
│   └── globals.css         # Estilos globais e animações
├── lib/
│   └── config.ts           # Configurações (WORKFLOW_ID, GREETING, etc.)
├── public/
│   └── avatar.png          # Logo Apsen para o avatar
└── README.md               # Este arquivo
```

---

## 🧪 Comandos de Teste (Mock)

O `ChatKitPanelMock` tem **8 comandos de demonstração** para testar todos os recursos visuais:

| Comando | Descrição |
|---------|-----------|
| `formatacao` | Testa todos os estilos de Markdown (H1, H2, negrito, itálico, listas, citações) |
| `richtext` | Demonstração completa de formatação rica |
| `citacao` | Mensagem com fonte bibliográfica |
| `artigo` | Preview de link COM imagem |
| `documento` | Preview de link SEM imagem (fallback) |
| `longo` | Resposta longa para testar scroll |
| `erro` | Bolha de erro com borda vermelha |
| `completo` | Todos os recursos juntos (citação + preview + Markdown) |

---

## 🔧 Tecnologias Utilizadas

- **Next.js 16.0.1** (App Router)
- **React 19.2.0**
- **Tailwind CSS v4** (@tailwindcss/postcss)
- **TypeScript 5**
- **@openai/chatkit-react 1.2.0** (Web Component wrapper)
- **react-markdown** (renderização de Markdown customizada)

---

## 📝 Notas Finais para os Devs

### Sobre o Mock vs Real

- O **Mock** é 100% funcional e independente de backend
- O **Real** conecta-se ao Agent Builder via Web Component
- **Ambos compartilham os mesmos componentes visuais** (BotMessageBubble, UserMessageBubble, etc.)

### Sobre os Componentes Customizados

- Os componentes em `app/components/` **não devem ser modificados** sem consultar o Design
- Qualquer mudança visual deve ser feita **apenas nesses componentes**
- O objetivo é manter **100% de fidelidade ao Figma**

### Sobre o Contrato de Metadados

- **Não mude a estrutura do objeto `metadata`** sem avisar o Design
- Se o RAG não conseguir retornar a estrutura exata, os componentes simplesmente não renderizarão as citações/previews
- **Teste sempre com o Mock primeiro** para validar a estrutura antes de integrar com o Real

---

## 🚢 Deploy

### Setup Rápido

```bash
# Instalar dependências
npm install

# Configurar .env.local
cp .env.local.example .env.local
# Edite .env.local com suas chaves

# Rodar desenvolvimento
npm run dev
```

### Vercel (Recomendado)
```bash
vercel
```

Configure as variáveis de ambiente no dashboard da Vercel.

---

## 🤝 Suporte

Para dúvidas sobre a UI, componentes ou estrutura visual, entre em contato com a equipe de Design.

Para dúvidas sobre integração com o Agent Builder, consulte a [documentação oficial do ChatKit](https://platform.openai.com/docs/chatkit).

---

**Construído com ❤️ pelo time de Design para o time de Engenharia**
