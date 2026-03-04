# Ambiguidades Estruturais

1. **Global Footer vazio**: Originalmente sem texto, foi tipado para `copyrightText`, o que pode ser redundante se não for exibido na UI final.
2. **Visual Breaks múltiplos**: Repetição arbitrária de seções "Visual Break" (divisores de imagem) espalhados que talvez poderiam ser simplificados no Layout component.
3. **Quick Contacts versus Contact Page**: Há possível duplicação de propósito entre o widget de "Quick Contacts" da Home e a própria `ContactPageContent`.
4. **Resumo Customizável**: Campos de Resumo (Experience, Education) no JSON podem engessar uma renderização rica (estilos, negritos) onde o MDX serviria melhor.
5. **Tags de projetos**: Diferenciação sobre quais atributos serão indexáveis (tags) e categorias ainda não são refletidas em um enum rígido no `ProjectMeta`.
6. **Project Content Block tipagem rígida**: A tipagem de `ProjectContentBlock` num mix global para MDX pode conflitar, já que MDX permite fluidez natural com React components (ao invés de arrays no JSON/Frontmatter).
7. **Hero em Múltiplos Formatos**: "Hero" global para a Homepage e "Project Hero" para cases requerem modelos separados, o que dilui a padronização.
8. **Valores vazios de href vs âncoras**: A estrutura requer href unificado, mas páginas (como a Home) usavam section ids. O contrato assemelha todas a rotas distintas.
