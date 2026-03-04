const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDir = path.join(__dirname, 'src', 'content');
const projectsDir = path.join(contentDir, 'projects');

// 1. Migrate MDX files
const mdxFiles = fs.readdirSync(projectsDir).filter(f => f.endsWith('.mdx'));
for (const file of mdxFiles) {
    const filePath = path.join(projectsDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(fileContent);
    const d = parsed.data;

    const newData = {
        slug: d.slug,
        thumbnail: d.thumbnail,
        tags: d.tags,
        featured: d.featured,
        home_card: {
            thumbnail: d.home_thumbnail,
            title_pt: d.home_title_pt,
            summary_pt: d.home_summary_pt,
            title_en: d.home_title_en,
            summary_en: d.home_summary_en
        },
        pt: {
            title: d.title_pt,
            role: d.role_pt,
            timeline: d.timeline_pt,
            summary: d.summary_pt,
            body: d.body_pt
        },
        en: {
            title: d.title_en,
            role: d.role_en,
            timeline: d.timeline_en,
            summary: d.summary_en,
            body: d.body_en
        }
    };

    const newFileContent = matter.stringify('', newData);
    fs.writeFileSync(filePath, newFileContent, 'utf8');
}

// 2. Migrate home.json
const homePath = path.join(contentDir, 'pages', 'home.json');
if (fs.existsSync(homePath)) {
    const h = JSON.parse(fs.readFileSync(homePath, 'utf8'));
    const newHome = {
        hero: {
            headline_pt: h.hero_headline_pt,
            headline_en: h.hero_headline_en,
            backgroundMedia: h.hero_backgroundMedia,
            carousel: h.hero_carousel
        },
        cases: {
            title_pt: h.sectionDividerCases_title_pt,
            title_en: h.sectionDividerCases_title_en
        },
        visual_design: {
            title_pt: h.visualDesignWork_title_pt,
            title_en: h.visualDesignWork_title_en,
            description_pt: h.visualDesignWork_description_pt,
            description_en: h.visualDesignWork_description_en,
            ctaLabel_pt: h.visualDesignWork_ctaLabel_pt,
            ctaLabel_en: h.visualDesignWork_ctaLabel_en,
            ctaHref: h.visualDesignWork_ctaHref,
            backgroundMedia: h.visualDesignWork_backgroundMedia
        },
        about: {
            heading1_pt: h.aboutSummary_heading1_pt,
            heading1_en: h.aboutSummary_heading1_en,
            paragraph1_pt: h.aboutSummary_paragraph1_pt,
            paragraph1_en: h.aboutSummary_paragraph1_en,
            heading2_pt: h.aboutSummary_heading2_pt,
            heading2_en: h.aboutSummary_heading2_en,
            paragraph2_pt: h.aboutSummary_paragraph2_pt,
            paragraph2_en: h.aboutSummary_paragraph2_en,
            backgroundMedia: h.aboutSummary_backgroundMedia
        },
        contacts: {
            title: h.quickContacts_title,
            emailValue: h.quickContacts_emailValue,
            linkedinValue: h.quickContacts_linkedinValue,
            whatsappValue: h.quickContacts_whatsappValue
        }
    };
    fs.writeFileSync(homePath, JSON.stringify(newHome, null, 2), 'utf8');
}

console.log('Migration complete.');
