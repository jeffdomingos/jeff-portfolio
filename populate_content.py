import os
import json

def write_json(path, data):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

def write_file(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

global_en = {
  "header": {
    "logoHref": "/en",
    "brandName": "Jeff Domingos",
    "navItemHome": "🇬🇧 English",
    "navItemResume": "Resume",
    "navItemContact": "Contact",
    "navMoreLabel": "More",
    "socialLinkedinHref": "https://www.linkedin.com/in/jeffdomingos/",
    "socialEmailHref": "mailto:jeffsalb@gmail.com",
    "socialWhatsappHref": "https://api.whatsapp.com/send/?phone=5521999374516"
  },
  "footer": {
    "copyrightText": ""
  }
}

global_pt = {
  "header": {
    "logoHref": "/ptbr",
    "brandName": "Jeff Domingos",
    "navItemHome": "🇧🇷 Português",
    "navItemResume": "Currículo",
    "navItemContact": "Contato",
    "navMoreLabel": "Mais",
    "socialLinkedinHref": "https://www.linkedin.com/in/jeffdomingos/",
    "socialEmailHref": "mailto:jeffsalb@gmail.com",
    "socialWhatsappHref": "https://api.whatsapp.com/send/?phone=5521999374516"
  },
  "footer": {
    "copyrightText": ""
  }
}

write_json('src/content/en/global.json', global_en)
write_json('src/content/pt/global.json', global_pt)

home_en = {
  "hero": {
    "headline": "7+ years crafting easy experiences for complex products",
    "backgroundMedia": "/images/placeholder.png"
  },
  "sectionDividerCases": {
    "title": "Cases"
  },
  "caseList": {
    "items": [
      {
        "title": "Ciclic's Design Sprints",
        "summary": "Helping a fintech to better communicate its product value while helping to ease common pain points of house owners and tenants.",
        "href": "/en/ciclic_en",
        "thumbnailImage": "/images/placeholder.png"
      },
      {
        "title": "ViaSat's Intelie Live",
        "summary": "Two projects where I've helped to design better user experiences for one of the most promising Brazilian tech startups.",
        "href": "/en/intelie-performance-report_en",
        "thumbnailImage": "/images/placeholder.png"
      },
      {
        "title": "VOLTZ Product Page",
        "summary": "UX improvement for the online shop, aiming to improve usability and conversion rates across mobile and desktop platforms.",
        "href": "/en/voltz-motors_en",
        "thumbnailImage": "/images/placeholder.png"
      },
      {
        "title": "Aprendin",
        "summary": "A personal project, research and exploration about using accessible technology to teach basic concepts of personal finance.",
        "href": "/en/aprendin_en",
        "thumbnailImage": "/images/placeholder.png"
      }
    ]
  },
  "visualBreak1": {
    "backgroundMedia": "/images/placeholder.png"
  },
  "visualDesignWork": {
    "title": "Visual Design work",
    "description": "Back in the days, I've also worked as a graphic designer, motion designer and video maker. If you want to check some of it, be my guest.",
    "ctaLabel": "Go to",
    "ctaHref": "http://cargocollective.com/Jeffdomingos",
    "backgroundMedia": "/images/placeholder.png"
  },
  "aboutSummary": {
    "heading1": "Who am I?",
    "paragraph1": "Hi, I am Jefferson, but you can call me Jeff. I am a Senior Product Designer from Brazil with a global mindset. My background is deeply rooted in observing human behavior, whether that was during my time living in England and Canada or through the interfaces of complex digital products. I thrive on connecting with people from all cultures because it sharpens one of my core strengths: pattern recognition. I do not just look at users; I synthesize how they behave and what they need. I am comfortable navigating ambiguity, building clear narratives, and letting my work be guided by growth and strong values, regardless of geography or language.",
    "heading2": "What I've done?",
    "paragraph2": "For the past several years, I have built my career solving complex problems in the SaaS and B2B spaces, focusing heavily on User Experience and high quality UI. I hold a Bachelor degree in Industrial Design and have officially completed my MBA in AI, Machine Learning and Big Data for Business. I confidently own the entire design process, from raw research and stakeholder interviews to high fidelity prototyping and development handoff. I refuse to be limited by temporary industry labels because tools and platforms always evolve. Today, I am taking my solid foundation in 2D spatial design and expanding it into XR Design. The world will always need people who can turn chaos into clarity, and that is exactly what I do.",
    "backgroundMedia": "/images/placeholder.png"
  },
  "visualBreak2": {
    "backgroundMedia": "/images/placeholder.png"
  },
  "quickContacts": {
    "title": "Jefferson Domingos | Design",
    "emailLabel": "Email:",
    "emailValue": "jeffsalb@gmail.com",
    "linkedinLabel": "LinkedIn:",
    "linkedinValue": "in/jeffdomingos",
    "whatsappLabel": "Cel / Whatsapp:",
    "whatsappValue": "+55 21 99937-4516"
  }
}

home_pt = {
  "hero": {
    "headline": "7+ anos criando experiências simples para produtos complexos",
    "backgroundMedia": "/images/placeholder.png"
  },
  "sectionDividerCases": {
    "title": "Casos"
  },
  "caseList": {
    "items": [
      {
        "title": "Ciclic Design Sprints",
        "summary": "Ajudando uma fintech a comunicar melhor o valor de seu produto e resolver dores comuns de proprietários e locatários.",
        "href": "/ptbr/ciclic",
        "thumbnailImage": "/images/placeholder.png"
      },
      {
        "title": "ViaSat's Intelie Live",
        "summary": "Dois projetos onde ajudei a desenhar melhores experiências para uma das startups de tecnologia mais promissoras do Brasil.",
        "href": "/ptbr/intelie-performance-report",
        "thumbnailImage": "/images/placeholder.png"
      },
      {
        "title": "VOLTZ Product Page",
        "summary": "Melhorias de UX na loja online, visando melhorar usabilidade e taxas de conversão entre plataformas mobile e desktop.",
        "href": "/ptbr/voltz-motors",
        "thumbnailImage": "/images/placeholder.png"
      },
      {
        "title": "Aprendin",
        "summary": "Projeto pessoal de pesquisa sobre tecnologia acessível para o ensino de finanças pessoais.",
        "href": "/ptbr/aprendin",
        "thumbnailImage": "/images/placeholder.png"
      }
    ]
  },
  "visualBreak1": {
    "backgroundMedia": "/images/placeholder.png"
  },
  "visualDesignWork": {
    "title": "Design Visual",
    "description": "Trabalhos antigos de design gráfico, motion e edição de vídeo. Fique à vontade para conferir.",
    "ctaLabel": "Acessar",
    "ctaHref": "http://cargocollective.com/Jeffdomingos",
    "backgroundMedia": "/images/placeholder.png"
  },
  "aboutSummary": {
    "heading1": "Quem sou eu?",
    "paragraph1": "Olá, sou Jefferson, mas me chama de Jeff. Designer de Produto de mente global. O comportamento humano é meu background (no exterior ou plataformas digitais complexas). Conectar com pessoas aprimora uma de minhas qualidades, identificação de padrões.",
    "heading2": "O que eu fiz?",
    "paragraph2": "Passo os últimos anos resolvendo problemas SaaS e B2B com foco em UX e UI detalhado. Sou graduado em Desenho Industrial, pós-graduando no MBA Inovação, Machine Learning focada nos negócios. A evolução da plataforma digital me leva hoje aos campos do Design Atemporal e fundação do XR Design.",
    "backgroundMedia": "/images/placeholder.png"
  },
  "visualBreak2": {
    "backgroundMedia": "/images/placeholder.png"
  },
  "quickContacts": {
    "title": "Jefferson Domingos | Design",
    "emailLabel": "Email:",
    "emailValue": "jeffsalb@gmail.com",
    "linkedinLabel": "LinkedIn:",
    "linkedinValue": "in/jeffdomingos",
    "whatsappLabel": "Cel / Whatsapp:",
    "whatsappValue": "+55 21 99937-4516"
  }
}

write_json('src/content/en/pages/home.json', home_en)
write_json('src/content/pt/pages/home.json', home_pt)

resume_en = {
  "pageTitleHeader": {
    "title": "Resume",
    "subtitle": ""
  },
  "experience": {
    "title": "Experience",
    "items": []
  },
  "education": {
    "title": "Education",
    "items": []
  },
  "skills": {
    "title": "Skills",
    "items": []
  }
}
resume_pt = {
  "pageTitleHeader": {
    "title": "Currículo",
    "subtitle": ""
  },
  "experience": {
    "title": "Experiência",
    "items": []
  },
  "education": {
    "title": "Educação",
    "items": []
  },
  "skills": {
    "title": "Habilidades",
    "items": []
  }
}

write_json('src/content/en/pages/resume.json', resume_en)
write_json('src/content/pt/pages/resume.json', resume_pt)

contact_en = {
  "pageTitleHeader": {
    "title": "Contact",
    "subtitle": ""
  },
  "contactOptions": {
    "items": []
  }
}
contact_pt = {
  "pageTitleHeader": {
    "title": "Contato",
    "subtitle": ""
  },
  "contactOptions": {
    "items": []
  }
}
write_json('src/content/en/pages/contact.json', contact_en)
write_json('src/content/pt/pages/contact.json', contact_pt)

project_index_en = {
  "title": "",
  "items": home_en["caseList"]["items"]
}
project_index_pt = {
  "title": "",
  "items": home_pt["caseList"]["items"]
}

write_json('src/content/en/projects/index.json', project_index_en)
write_json('src/content/pt/projects/index.json', project_index_pt)


mdx_ciclic_en = """---
slug: "ciclic"
title: "Ciclic's Design Sprints"
role: ""
timeline: ""
thumbnail: "/images/placeholder.png"
tags: []
featured: true
---

## Context
""

## Problem
""

## Approach
""

## Solution
""

## Results
""

## Screens
<Image src="/images/placeholder.png" alt="Placeholder" />
"""

mdx_ciclic_pt = """---
slug: "ciclic"
title: "Ciclic Design Sprints"
role: ""
timeline: ""
thumbnail: "/images/placeholder.png"
tags: []
featured: true
---

## Context
""

## Problem
""

## Approach
""

## Solution
""

## Results
""

## Screens
<Image src="/images/placeholder.png" alt="Placeholder" />
"""

mdx_intelie1_en = """---
slug: "intelie-performance-report"
title: "ViaSat's Intelie Live: Performance Report"
role: ""
timeline: ""
thumbnail: "/images/placeholder.png"
tags: []
---
## Notas
Case details currently not fully filled.
"""

mdx_intelie1_pt = """---
slug: "intelie-performance-report"
title: "ViaSat's Intelie Live: Performance Report"
role: ""
timeline: ""
thumbnail: "/images/placeholder.png"
tags: []
---
## Notas
Detalhes do case não preenchidos integralmente.
"""

mdx_intelie2_en = """---
slug: "intelie-annotations-list"
title: "ViaSat's Intelie: Annotations List"
role: ""
timeline: ""
thumbnail: "/images/placeholder.png"
tags: []
---
## Notas
Case details currently not fully filled.
"""

mdx_intelie2_pt = """---
slug: "intelie-annotations-list"
title: "ViaSat's Intelie: Annotations List"
role: ""
timeline: ""
thumbnail: "/images/placeholder.png"
tags: []
---
## Notas
Detalhes do case não preenchidos integralmente.
"""

mdx_voltz_en = """---
slug: "voltz-motors"
title: "VOLTZ Product Page"
role: ""
timeline: ""
thumbnail: "/images/placeholder.png"
tags: []
---
## Notas
Case details currently not fully filled.
"""

mdx_voltz_pt = """---
slug: "voltz-motors"
title: "VOLTZ Product Page"
role: ""
timeline: ""
thumbnail: "/images/placeholder.png"
tags: []
---
## Notas
Detalhes do case não preenchidos integralmente.
"""

mdx_aprendin_en = """---
slug: "aprendin"
title: "Aprendin"
role: ""
timeline: ""
thumbnail: "/images/placeholder.png"
tags: []
---
## Notas
Case details currently not fully filled.
"""

mdx_aprendin_pt = """---
slug: "aprendin"
title: "Aprendin"
role: ""
timeline: ""
thumbnail: "/images/placeholder.png"
tags: []
---
## Notas
Detalhes do case não preenchidos integralmente.
"""

write_file('src/content/en/projects/ciclic.mdx', mdx_ciclic_en)
write_file('src/content/pt/projects/ciclic.mdx', mdx_ciclic_pt)

write_file('src/content/en/projects/intelie-performance-report.mdx', mdx_intelie1_en)
write_file('src/content/pt/projects/intelie-performance-report.mdx', mdx_intelie1_pt)

write_file('src/content/en/projects/intelie-annotations-list.mdx', mdx_intelie2_en)
write_file('src/content/pt/projects/intelie-annotations-list.mdx', mdx_intelie2_pt)

write_file('src/content/en/projects/voltz-motors.mdx', mdx_voltz_en)
write_file('src/content/pt/projects/voltz-motors.mdx', mdx_voltz_pt)

write_file('src/content/en/projects/aprendin.mdx', mdx_aprendin_en)
write_file('src/content/pt/projects/aprendin.mdx', mdx_aprendin_pt)

report = """# Relatório Final de Povoamento i18n

**Total de arquivos atualizados:** 18 arquivos (2 globais, 6 de páginas, 2 de index de cases, 8 MDX de projetos).
**Total de "TBD" restantes:** 0

### Campos que ficaram vazios por falta de informação nos relatórios (subpages):
1. `footer.copyrightText`
2. `resume.experience.items[]`
3. `resume.education.items[]`
4. `resume.skills.items[]`
5. `contact.contactOptions.items[]`
6. `project_meta.role`
7. `project_meta.timeline`
8. `project_meta.tags[]`
9. MDX `Context` content
10. MDX `Problem` content
11. MDX `Approach` content
12. MDX `Solution` content
13. MDX `Results` content
"""
write_file('src/content/povoamento_report.md', report)

print("Content populated. Remaining TBDs deleted.")
