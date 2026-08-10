import type { ColorScheme, ThemeOption } from "@openai/chatkit";

export const WORKFLOW_ID = process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID?.trim() ?? "";

export const CREATE_SESSION_ENDPOINT = "/api/create-session";

export const PLACEHOLDER_INPUT = "Digite sua mensagem...";

export const GREETING = `👋 **Olá! Sou o Assistente Afya | Apsen**

Este é um protótipo de interface mockado para testes de UX.

📝 **Comandos disponíveis para testar:**

* **"formatacao"** - Ver todos os estilos de Markdown
* **"richtext"** - Ver formatação rica completa
* **"citacao"** - Ver mensagem com fonte bibliográfica  
* **"artigo"** - Ver card de preview com imagem
* **"documento"** - Ver card de preview sem imagem
* **"longo"** - Ver resposta longa (teste de scroll)
* **"erro"** - Ver bolha de erro
* **"completo"** - Ver resposta com todos os recursos

Digite qualquer comando acima para ver como a interface responde! ✨`;

export const getThemeConfig = (theme: ColorScheme): ThemeOption => ({
  colorScheme: theme,
  color: {
    grayscale: {
      hue: 220,
      tint: 6,
      shade: theme === "dark" ? -1 : -4,
    },
    accent: {
      primary: theme === "dark" ? "#EF4444" : "#ED2025", // RX PRO red
      level: 2,
    },
  },
  radius: "round",
});
