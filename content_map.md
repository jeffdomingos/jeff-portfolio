# Contrato de Conteúdo e Arquitetura de Informação (Content Map)

Este documento atua como um mapa de conteúdo estruturado, preparado para a reconstrução do portfólio em Next.js com Atomic Design e internacionalização (i18n) em Português e Inglês (pt/en). Nenhuma estilização ou cópia final de texto está embutida aqui, apenas o esqueleto semântico de dados.

## 1) Sitemap
Lista de rotas e páginas normalizadas:
- `/` (Home)
- `/resume` (Resume)
- `/contact` (Contact)
- `/cases/ciclic` (Project: Ciclic)
- `/cases/intelie-performance-report` (Project: Intelie Performance Report)
- `/cases/intelie-annotations-list` (Project: Intelie Annotations List)
- `/cases/voltz-motors` (Project: VOLTZ Motors)
- `/cases/aprendin` (Project: Aprendin)

---

## 2) Estrutura das Páginas

### Page: Home
**Lista ordenada de seções:**
1. Global Header
2. Hero
3. Section Divider (Cases)
4. Case List
5. Visual Break (Divider)
6. Visual Design Work Overview
7. About Summary (Who am I?)
8. Visual Break (Divider)
9. Quick Contacts
10. Global Footer

### Page: Resume
**Lista ordenada de seções:**
1. Global Header
2. Page Title Header
3. Resume Experience
4. Resume Education
5. Resume Skills
6. Global Footer

### Page: Contact
**Lista ordenada de seções:**
1. Global Header
2. Page Title Header
3. Contact Options / Links
4. Global Footer

### Page: Case Details (Template iterável para todos os projetos)
**Lista ordenada de seções:**
1. Global Header
2. Project Hero
3. Project Overview
4. Project Content Blocks (Dinâmicos)
5. Project Conclusion
6. Global Footer

---

## 3) Dicionário de Estruturas de Seções (Modelos de Dados)

### Section: Global Header
- `logo_href`:
- `brand_name`:
- `nav_item_home_pt`:
- `nav_item_home_en`:
- `nav_item_resume_pt`:
- `nav_item_resume_en`:
- `nav_item_contact_pt`:
- `nav_item_contact_en`:
- `nav_more_label_pt`:
- `nav_more_label_en`:
- `social_linkedin_href`:
- `social_email_href`:
- `social_whatsapp_href`:

### Section: Global Footer
- `copyright_text_pt`:
- `copyright_text_en`:

### Section: Hero (Home)
- `headline_pt`:
- `headline_en`:
- `background_media`: PLACEHOLDER

### Section: Section Divider
- `title_pt`:
- `title_en`:

### Section: Case List
- `items`:
  - `title_pt`:
  - `title_en`:
  - `summary_pt`:
  - `summary_en`:
  - `href`:
  - `thumbnail_image`: PLACEHOLDER

### Section: Visual Break
- `background_media`: PLACEHOLDER

### Section: Visual Design Work Overview
- `title_pt`:
- `title_en`:
- `description_pt`:
- `description_en`:
- `cta_label_pt`:
- `cta_label_en`:
- `cta_href`:
- `background_media`: PLACEHOLDER

### Section: About Summary
- `heading_1_pt`:
- `heading_1_en`:
- `paragraph_1_pt`:
- `paragraph_1_en`:
- `heading_2_pt`:
- `heading_2_en`:
- `paragraph_2_pt`:
- `paragraph_2_en`:
- `background_media`: PLACEHOLDER

### Section: Quick Contacts
- `title_pt`:
- `title_en`:
- `email_label_pt`:
- `email_label_en`:
- `email_value`:
- `linkedin_label_pt`:
- `linkedin_label_en`:
- `linkedin_value`:
- `whatsapp_label_pt`:
- `whatsapp_label_en`:
- `whatsapp_value`:

### Section: Page Title Header (Resume / Contact)
- `title_pt`:
- `title_en`:
- `subtitle_pt`:
- `subtitle_en`:

### Section: Resume Experience
- `title_pt`:
- `title_en`:
- `items`:
  - `company_name`:
  - `role_pt`:
  - `role_en`:
  - `dates_pt`:
  - `dates_en`:
  - `bullets_pt`:
  - `bullets_en`:

### Section: Resume Education
- `title_pt`:
- `title_en`:
- `items`:
  - `institution_pt`:
  - `institution_en`:
  - `degree_pt`:
  - `degree_en`:
  - `dates_pt`:
  - `dates_en`:

### Section: Resume Skills
- `title_pt`:
- `title_en`:
- `items`:
  - `category_pt`:
  - `category_en`:
  - `skills_list_pt`:
  - `skills_list_en`:

### Section: Contact Options
- `items`:
  - `platform_name`:
  - `description_pt`:
  - `description_en`:
  - `cta_label_pt`:
  - `cta_label_en`:
  - `href`:
  - `icon`: PLACEHOLDER

### Section: Project Hero
- `project_name_pt`:
- `project_name_en`:
- `role_pt`:
- `role_en`:
- `timeline_pt`:
- `timeline_en`:
- `hero_image`: PLACEHOLDER

### Section: Project Overview
- `title_pt`:
- `title_en`:
- `context_pt`:
- `context_en`:
- `problem_pt`:
- `problem_en`:
- `solution_pt`:
- `solution_en`:

### Section: Project Content Blocks
- `title_pt`:
- `title_en`:
- `items`:
  - `block_type`: (text | image | video | caption)
  - `title_pt`:
  - `title_en`:
  - `content_pt`:
  - `content_en`:
  - `media_src`: PLACEHOLDER

### Section: Project Conclusion
- `title_pt`:
- `title_en`:
- `description_pt`:
- `description_en`:
