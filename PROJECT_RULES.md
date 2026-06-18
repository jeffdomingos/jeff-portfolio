# Project Rules & Architecture (Refactored 2026)

Este documento dita as regras arquiteturais implementadas na base do projeto. **Sempre siga estas diretrizes ao adicionar ou modificar código.**

## 1. Design System & CSS
- **Cores Dinâmicas (OKLCH)**: O sistema de cores não utiliza HEX, RGB ou HSL. Toda a paleta de cores deriva de canais puros definidos em `src/styles/tokens.css` usando a função OKLCH. Nunca defina cores no `tailwind.config.ts` com strings literais de HEX; sempre mapeie para as variáveis CSS (ex: `oklch(var(--color-primary) / <alpha-value>)`).
- **Tema Central**: Para alterar o tom do site, altere a variável `--brand-hue` em `tokens.css`.
- **Tipografia Fluida**: Não utilize breakpoints rígidos do Tailwind para tipografia (como `text-lg md:text-2xl`). Utilize **sempre** os tokens fluidos: `text-step--2` a `text-step-6`. A matemática já lida com o redimensionamento.
- **Espaçamento Fluido**: Para margens e paddings maiores, priorize os tokens fluidos configurados no Tailwind (ex: `p-fluid-m`, `gap-fluid-l`).

## 2. Componentização (Atomic Design)
- **Organisms (`src/components/organisms/`)**: Componentes grandes (como Hero, FAQ, Listas de Cases) vivem aqui. Eles não devem buscar dados ativamente; devem recebê-los via Props do Server Component (`page.tsx`).
- **Atoms/Molecules (`src/components/atoms/`, `src/components/ui/`)**: Blocos puramente visuais, botões, ícones, elementos de interface Shadcn.

## 3. Performance & Imagens
- **Next/Image**: Utilize sempre `<Image>` em vez de `<img>` nativo.
- **Loading Hints (`src/lib/performance/image-hints.ts`)**: Toda imagem deve utilizar os hints mapeados nesse arquivo.
  - O elemento herói (acima da dobra) deve receber `{...LCP_IMAGE}` para ser priorizado no parser do navegador.
  - Elementos da lista ou galeria devem receber `{...BELOW_FOLD_IMAGE}`.
- **Tamanhos (Sizes)**: Sempre inclua uma prop `sizes` (importando as referências em `image-hints.ts` como `IMAGE_SIZES.card`) para não forçar o mobile a baixar imagens para telas Retina grandes.

## 4. Animação
- Utilizamos `framer-motion` para animações baseadas em scroll para preservar o suporte estrito em Safari / iOS, já que `animation-timeline: view()` via CSS ainda não está estável nesses ambientes.
- Sempre envolva `framer-motion` em componentes `"use client"`. O layout da página pai em si (`page.tsx`) deve permanecer como um Server Component estático, delegando as interações apenas aos `organisms`.
