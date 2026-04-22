# Guia de Analytics: PostHog e Rastreamento de URLs

Este portfólio foi instrumentado com ferramentas avançadas para geração de métricas sem a infraestrutura pesada invasiva e ignorando sumariamente contramedidas agressivas (como ad-blockers).

---

## 1. Arquitetura do PostHog

O PostHog está operando via biblioteca nativa `posthog-js`, conectando a UI do Next.js via um Provider configurado no Root Layout.

### **Superando os AdBlockers (Proxy Reverso)**

Ao invés de despachar os eventos diretamente para a URL do PostHog (o que dispararia os bloqueadores de anúncios de muitos navegadores), o `next.config.mjs` foi configurado para **encaminhar** o tráfego da rota "fantasma" `/ingest` para servidores do PostHog.
Dessa forma, toda a sua coleta é visualizada como um tráfego de primeira-parte (First-Party) e nunca toma 'block' local.

### **Contornando o Ponto Cego da SPA (App Router do Next.js)**

O SDK foi forçado (`capture_pageview: false`) a desativar leituras reativas do load da janela. No lugar dele, nós implantamos o Componente rastreador personalizado `PostHogPageView`.
Para evitar que uma sessão do usuário fique eternamente sem mandar um pulso de "saída"  ($pageleave ou scroll_depth) por não recarregar o navegador nas transições React, o componente detecta explicitamente sempre que a aba muda. Ele envia a limpeza do histórico junto com a profundidade do scroll do usuário como encerramento de evento para só então abrir o pageview seguinte.

---

## 2. Bloqueio de Analíticas de Desenvolvedor (O Opt-Out Silencioso)

Para impedir o "sujeira virtual" originada a partir dos seus próprios acessos, uma rota oculta foi acoplada ao sistema.

Sempre que acessar a rota `jeffdomingos.com/admin-jeff`, uma função assíncrona é chamada direto no PostHog ordenando a instalação nativa do cookie de renúncia (Opt-out). **Se o Cookie constar, o Proxy / Ingest cancela ativamente o envio, mesmo para os Web Vitals.**
Isso significa que você continuará enviando seus commits, navegando na Home e olhando as rotas pelo seu navegador pessoal sem atrapalhar a sua média de conversão e visitas orgânicas!

*(Nota: Acesse em abas anônimas para avaliar estatísticas se desejar simular um cliente novo).*

---

## 3. URLs de Compartilhamento ("Rewrites")

Se você enviar sua home page `jeffdomingos.com` nas redes sociais cruamente, todo o tráfego irá se aglutinar originado de `(direct)` - o que anula sua capacidade de saber de onde vieram seus maiores fluxos. Devido a estrutura `i18n` do portfólio, configuramos links camuflados ("Clean URLs") de rastreamento no arquivo de configuração do Next, atuando antes das máscaras do proxy.

Isso significa que o design da URL entregue continuará o que você definiu e limpo, sem redirecionar para um "?parametro", enquanto a home aparece na tela.

### Em Inglês (Padrão)

Na hora de inserir em botões no meio internacional, basta enviar para:
* **Currículo (PDF, Link Interno, Link Tree):** `jeffdomingos.com/cv`
* **Vaga Específica (Entrevista):** `jeffdomingos.com/to/[nome_da_empresa]` *(Ex: jeffdomingos.com/to/google)*
* **E-mail Frio para Tech Lead:** `jeffdomingos.com/linkedin`

### Em Português

A mesma arquitetura se repete se o cliente falar no idioma local. Adicione /pt/ antes para fixar no idioma PT-BR mas ainda rastrear precisamente:
* **Currículo PT-BR:** `jeffdomingos.com/pt/cv`
* **Vaga Específica:** `jeffdomingos.com/para/[nome_da_empresa]` *(Ex: /para/nubank)*
* **Link em posts Nacionais:** `jeffdomingos.com/pt/linkedin`

**Quando eles clicarem, veja seu dashboard do PostHog.** O painel de Pageviews terá o link explícito exato preenchido para cruzar com seu funil de análise UX.

### Super Properties (Persistência da Origem)

O maior problema de Single-Page Applications (SPA) é que as URLs mudam instantaneamente sem recarregar a página. Se você enviasse um recrutador para `/to/google`, no momento em que ele clicasse no botão "About Me", a URL mudaria para `/about` e a atribuição originária do Google seria "perdida" para as métricas daquele evento específico.

Para resolver isso de forma contínua, toda vez que o portal detecta um padrão `/to/`, `/para/`, `/cv` ou `/linkedin` na barra de endereço inicial, ele executa um comando chamado de **Super Property**. A propriedade unificada `origem_campanha` recebe o valor dinâmico exato (ex: *Currículo*, *google* ou *nubank*) e é vinculada permanentemente ao cliente.
Isso garante que:
- O 1º Pageview rastreie a veracidade da campanha primária.
- Todos os próximos *cliques, sessões de gravação, web vitals e pageleaves subsequentes* ao longo do acesso inteiro daquele usuário ficarão perfeitamente selados com a marcação `origem_campanha: valor_origem` nas propriedades do evento.

---

## 4. Analisando em Ambiente Local (Debug)

Rodou `pnpm dev`?
Ao inspecionar a janela local pelo DevTools (F12) vá na aba **Console**. Uma função de Development do `PostHogProvider` entra em ação, imprimindo a cor de todos os disparos diretamente como debug (ex: `send $pageview`, `send $autocapture`).

Com isso garantimos que as atualizações estão ativas muito antes do Dashboard de processamento da Nuvem renderizar as tabelas.
