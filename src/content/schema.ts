export interface GlobalHeader {
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
  brandName: string;
  emailLabel: string;
  emailValue: string;
  linkedinLabel: string;
  linkedinValue: string;
  whatsappLabel: string;
  whatsappValue: string;
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
    carousel: { src: string; caption: string }[];
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
  title?: string;
  items?: CaseItem[];
  order?: string[];
}

export interface ProjectMeta {
  slug: string;
  title: string;
  role: string;
  timeline: string;
  thumbnail: string;
  tags: string[];
  featured?: boolean;
  summary?: string;
}

export interface ProjectContentBlock {
  blockType: 'text' | 'image' | 'video' | 'caption';
  title: string;
  content: string;
  mediaSrc: string;
}
