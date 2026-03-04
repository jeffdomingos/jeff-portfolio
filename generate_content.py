import os
import json

def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

schema_ts = """export interface GlobalHeader {
  logoHref: string;
  brandName: string;
  navItemHome: string;
  navItemResume: string;
  navItemContact: string;
  navMoreLabel: string;
  socialLinkedinHref: string;
  socialEmailHref: string;
  socialWhatsappHref: string;
}

export interface GlobalFooter {
  copyrightText: string;
}

export interface GlobalContent {
  header: GlobalHeader;
  footer: GlobalFooter;
}

export interface CaseItem {
  title: string;
  summary: string;
  href: string;
  thumbnailImage: string;
}

export interface AboutSummary {
  heading1: string;
  paragraph1: string;
  heading2: string;
  paragraph2: string;
  backgroundMedia: string;
}

export interface QuickContacts {
  title: string;
  emailLabel: string;
  emailValue: string;
  linkedinLabel: string;
  linkedinValue: string;
  whatsappLabel: string;
  whatsappValue: string;
}

export interface HomePageContent {
  hero: {
    headline: string;
    backgroundMedia: string;
  };
  sectionDividerCases: {
    title: string;
  };
  caseList: {
    items: CaseItem[];
  };
  visualBreak1: {
    backgroundMedia: string;
  };
  visualDesignWork: {
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
    backgroundMedia: string;
  };
  aboutSummary: AboutSummary;
  visualBreak2: {
    backgroundMedia: string;
  };
  quickContacts: QuickContacts;
}

export interface ResumeExperienceItem {
  companyName: string;
  role: string;
  dates: string;
  bullets: string[];
}

export interface ResumeEducationItem {
  institution: string;
  degree: string;
  dates: string;
}

export interface ResumeSkillCategory {
  category: string;
  skillsList: string[];
}

export interface ResumePageContent {
  pageTitleHeader: {
    title: string;
    subtitle: string;
  };
  experience: {
    title: string;
    items: ResumeExperienceItem[];
  };
  education: {
    title: string;
    items: ResumeEducationItem[];
  };
  skills: {
    title: string;
    items: ResumeSkillCategory[];
  };
}

export interface ContactOption {
  platformName: string;
  description: string;
  ctaLabel: string;
  href: string;
  icon: string;
}

export interface ContactPageContent {
  pageTitleHeader: {
    title: string;
    subtitle: string;
  };
  contactOptions: {
    items: ContactOption[];
  };
}

export interface ProjectIndex {
  title: string;
  items: CaseItem[];
}

export interface ProjectMeta {
  slug: string;
  title: string;
  role: string;
  timeline: string;
  thumbnail: string;
  tags: string[];
  featured?: boolean;
}

export interface ProjectContentBlock {
  blockType: 'text' | 'image' | 'video' | 'caption';
  title: string;
  content: string;
  mediaSrc: string;
}
"""

write_file('src/content/schema.ts', schema_ts)

global_json = {
  "header": {
    "logoHref": "#",
    "brandName": "TBD",
    "navItemHome": "TBD",
    "navItemResume": "TBD",
    "navItemContact": "TBD",
    "navMoreLabel": "TBD",
    "socialLinkedinHref": "#",
    "socialEmailHref": "#",
    "socialWhatsappHref": "#"
  },
  "footer": {
    "copyrightText": "TBD"
  }
}

write_file('src/content/pt/global.json', json.dumps(global_json, indent=2))
write_file('src/content/en/global.json', json.dumps(global_json, indent=2))

home_json = {
  "hero": {
    "headline": "TBD",
    "backgroundMedia": "/images/placeholder.png"
  },
  "sectionDividerCases": {
    "title": "TBD"
  },
  "caseList": {
    "items": [
      {
        "title": "TBD",
        "summary": "TBD",
        "href": "#",
        "thumbnailImage": "/images/placeholder.png"
      }
    ]
  },
  "visualBreak1": {
    "backgroundMedia": "/images/placeholder.png"
  },
  "visualDesignWork": {
    "title": "TBD",
    "description": "TBD",
    "ctaLabel": "TBD",
    "ctaHref": "#",
    "backgroundMedia": "/images/placeholder.png"
  },
  "aboutSummary": {
    "heading1": "TBD",
    "paragraph1": "TBD",
    "heading2": "TBD",
    "paragraph2": "TBD",
    "backgroundMedia": "/images/placeholder.png"
  },
  "visualBreak2": {
    "backgroundMedia": "/images/placeholder.png"
  },
  "quickContacts": {
    "title": "TBD",
    "emailLabel": "TBD",
    "emailValue": "TBD",
    "linkedinLabel": "TBD",
    "linkedinValue": "TBD",
    "whatsappLabel": "TBD",
    "whatsappValue": "TBD"
  }
}

write_file('src/content/pt/pages/home.json', json.dumps(home_json, indent=2))
write_file('src/content/en/pages/home.json', json.dumps(home_json, indent=2))

resume_json = {
  "pageTitleHeader": {
    "title": "TBD",
    "subtitle": "TBD"
  },
  "experience": {
    "title": "TBD",
    "items": [
      {
        "companyName": "TBD",
        "role": "TBD",
        "dates": "TBD",
        "bullets": ["TBD"]
      }
    ]
  },
  "education": {
    "title": "TBD",
    "items": [
      {
        "institution": "TBD",
        "degree": "TBD",
        "dates": "TBD"
      }
    ]
  },
  "skills": {
    "title": "TBD",
    "items": [
      {
        "category": "TBD",
        "skillsList": ["TBD"]
      }
    ]
  }
}

write_file('src/content/pt/pages/resume.json', json.dumps(resume_json, indent=2))
write_file('src/content/en/pages/resume.json', json.dumps(resume_json, indent=2))

contact_json = {
  "pageTitleHeader": {
    "title": "TBD",
    "subtitle": "TBD"
  },
  "contactOptions": {
    "items": [
      {
        "platformName": "TBD",
        "description": "TBD",
        "ctaLabel": "TBD",
        "href": "#",
        "icon": "/images/placeholder.png"
      }
    ]
  }
}

write_file('src/content/pt/pages/contact.json', json.dumps(contact_json, indent=2))
write_file('src/content/en/pages/contact.json', json.dumps(contact_json, indent=2))

project_index_json = {
  "title": "TBD",
  "items": [
    {
      "title": "TBD",
      "summary": "TBD",
      "href": "#",
      "thumbnailImage": "/images/placeholder.png"
    }
  ]
}

write_file('src/content/pt/projects/index.json', json.dumps(project_index_json, indent=2))
write_file('src/content/en/projects/index.json', json.dumps(project_index_json, indent=2))

mdx_template = """---
slug: "ciclic"
title: "TBD"
role: "TBD"
timeline: "TBD"
thumbnail: "/images/placeholder.png"
tags: ["TBD"]
featured: true
---

## Context
TBD

## Problem
TBD

## Approach
TBD

## Solution
TBD

## Results
TBD

## Screens
<Image src="/images/placeholder.png" alt="Placeholder" />
"""

write_file('src/content/pt/projects/ciclic.mdx', mdx_template)
write_file('src/content/en/projects/ciclic.mdx', mdx_template)

ambiguidades = """# Ambiguidades Estruturais

1. **Global Footer vazio**: Originalmente sem texto, foi tipado para `copyrightText`, o que pode ser redundante se não for exibido na UI final.
2. **Visual Breaks múltiplos**: Repetição arbitrária de seções "Visual Break" (divisores de imagem) espalhados que talvez poderiam ser simplificados no Layout component.
3. **Quick Contacts versus Contact Page**: Há possível duplicação de propósito entre o widget de "Quick Contacts" da Home e a própria `ContactPageContent`.
4. **Resumo Customizável**: Campos de Resumo (Experience, Education) no JSON podem engessar uma renderização rica (estilos, negritos) onde o MDX serviria melhor.
5. **Tags de projetos**: Diferenciação sobre quais atributos serão indexáveis (tags) e categorias ainda não são refletidas em um enum rígido no `ProjectMeta`.
6. **Project Content Block tipagem rígida**: A tipagem de `ProjectContentBlock` num mix global para MDX pode conflitar, já que MDX permite fluidez natural com React components (ao invés de arrays no JSON/Frontmatter).
7. **Hero em Múltiplos Formatos**: "Hero" global para a Homepage e "Project Hero" para cases requerem modelos separados, o que dilui a padronização.
8. **Valores vazios de href vs âncoras**: A estrutura requer href unificado, mas páginas (como a Home) usavam section ids. O contrato assemelha todas a rotas distintas.
"""

write_file('src/content/ambiguidades.md', ambiguidades)

print("Content structure generated successfully in src/content/")
