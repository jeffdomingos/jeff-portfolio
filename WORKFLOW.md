# Fluxo de Trabalho (Workflow) Jeff Domingos

Este documento é seu guia oficial de bolso para trabalhar no seu site com Next.js, Vercel, Github e Decap CMS de forma segura, sem perder textos, imagens ou quebrar o que está em produção.

---

## 🚦 A Regra de Ouro (O Início do Dia)
Sempre que você sentar no VS Code para fazer uma alteração no código do seu site, **a primeira coisa** que você deve fazer antes mesmo de rodar o servidor é baixar o conteúdo mais recente que pode ter sido alterado via painel do CMS online.

No terminal, digite:
\`\`\`bash
git pull origin main
\`\`\`
Isso garante que sua máquina local e a Vercel/GitHub sejam "a mesma coisa".

---

## 💻 1. O "Caminho Feliz" Diário (Pequenas mudanças)
Use esse fluxo para mudar cores, consertar textos, ajustar layout CSS ou arrumar bugs rápidos. É o fluxo de **Continuous Deployment**:

1. **Puxe os dados:** `git pull origin main`.
2. **Ligue o servidor local:** `pnpm dev`.
3. **Trabalhe:** Abra `localhost:3000` e vá checando as mudanças em tempo real.
4. **Crie o pacote:** 
   - `git add .` *(adiciona tudo)*
   - `git commit -m "Mensagem dizendo o que fez"` *(empacota)*
5. **Jogue pro Mundo (Deploy):**
   - `git push origin main`

*Pronto! Em 1 minuto a Vercel vai ver seu pacote novo no GitHub, construir o site e substituir a versão em produção, tudo sozinho.*

---

## 🚀 2. O Fluxo de Cautela (Pré-build Local)
Você não precisa fazer isso sempre, mas se fez uma mudança grande no código (como apagar componentes ou mudar nomes de arquivos principais) e quer garantir que nada no Next.js vai quebrar durante o Deploy da Vercel:

1. Pare o servidor (`Ctrl+C`).
2. Digite: `pnpm build`.
3. Aguarde. Se terminar com uma mensagem verde de Sucesso, você está seguro para ir para os passos 4 e 5 (`add`, `commit` e `push`).
4. Se der erro (ex: Typescript apitando variável errada), você arruma na sua máquina, roda `pnpm build` de novo e só depois manda pro GitHub.

---

## 🌿 3. O "Caminho Ninja" (Branches de Rascunho)
Vai redesenhar uma tela inteira do zero? Trocar bibliotecas do projeto? Fazer um refactor monstruoso que vai durar dias? **Não mexa na `main`.**

Na The Vercel, criar uma branch paralela significa ganhar um **"Link de Teste" gratuito online** sem afetar o site oficial `jeffdomingos.com`.

1. **Crie e entre em um Rascunho Novo:** 
   - `git checkout -b redesign-da-home` *(o nome é você que escolhe)*.
2. **Trabalhe normalmente** (dias ou semanas), testando com `pnpm dev`.
3. **Mande o Rascunho para a Nuvem:**
   - Faça os commits (`add .` e `commit -m "..."`).
   - Mande a branch para o servidor: `git push origin redesign-da-home`.
4. **Vercel Preview Link:** 
   - Ao fazer isso, se você for no painel da Vercel, verá um link temporário exclusivo (ex: `jeff-redesign-123.vercel.app`).
   - Mande esse link pra clientes ou amigos para validar o novo site rodando na vida real. Seu antigo `.com` continua no ar intacto para o público.
5. **Bata o Martelo (Merge):**
   - Ficou perfeito? Vá no GitHub.com, clique em "Compare & Pull Request" e depois no botão verde **"Merge"**.
   - O GitHub vai fundir o seu Rascunho com a linha principal (`main`). A Vercel entende isso e atualiza automaticamente o `jeffdomingos.com`.
6. **Volte e limpe sua máquina:**
   - No terminal, digite: `git checkout main` (Para voltar à vida normal).
   - Não esqueça da Regra de Ouro: `git pull origin main` para baixar o resultado final!

---

## 🚨 Se Algo Der Errado no Git ("Conflict / Reject")
Se você rodou `git push origin main` e tomou uma parede vermelha dizendo **REJECTED**, não entre em pânico.

**O que significa?**
O GitHub percebeu que existem arquivos na nuvem (ex: um post novo lá no CMS de ontem à noite) que a sua máquina NÃO TEM. Ele bloqueia o envio pelo seu próprio bem para você não sobrescrevê-los e perder o post.

**Como arrumar?**
- Digite `git pull origin main`. (Siga as dicas do terminal caso precise fazer um merge manual, mas 90% das vezes ele mescla as imagens novas sozinho e tranquilamente).
- Depois do `pull` dar certo, você estará liberado para dar o `git push` comemorativo.
