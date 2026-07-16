export interface GlobalHeader {
  logoHref: string;
  brandName: string;
  navItemHome: string;
  navItemJournal: string;
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
  context?: string;
  title: string;
  summary: string;
  href: string;
  thumbnailImage: string;
  tags?: string[];
  customNumber?: string;
  customCtaLabel?: string;
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

export interface ApproachSection {
  title: string;
  subtitle: string;
  columns: {
    title: string;
    description: string;
  }[];
}

export interface TestimonialsSection {
  title: string;
  subtitle: string;
  items: {
    author: string;
    role: string;
    quote: string;
    details: string;
    avatarUrl: string;
  }[];
}

export interface AvailabilitySection {
  title: string;
  blocks: {
    title: string;
    subtitle: string;
    description: string;
  }[];
}

export interface HomePageContent {
  hero: {
    headline: string;
    subheadline?: string;
    backgroundMedia: string;
    ctaLabel?: string;
    ctaHref?: string;
    carousel: { src: string; caption: string }[];
  };
  sectionDividerCases: {
    title: string;
  };
  caseList: {
    items: CaseItem[];
  };
  approach: ApproachSection;
  testimonials: TestimonialsSection;
  availability: AvailabilitySection;
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
  aboutSummary: AboutSummary; // Keeping this for the commented code
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
  context?: string;
  title: string;
  role: string;
  timeline: string;
  thumbnail: string;
  tags: string[];
  featured?: boolean;
  summary?: string;
  readingTime?: number;
}

export interface ProjectContentBlock {
  type: 'text' | 'image' | 'callout' | 'quote' | 'metric' | 'video' | 'figma' | 'product-trio' | 'links';
  content?: string;
  src?: string;
  alt?: string;
  author?: string;
  label?: string;
  value?: string;
  title?: string;
  invertInDark?: boolean;
  lightBgInDark?: boolean;
  items?: { label: string; url: string }[];
}

export interface JournalMeta {
  slug: string;
  date: string;
  title: string;
  summary: string;
  thumbnail: string;
  tags: string[];
  linkedinUrl?: string;
  instagramUrl?: string;
  readingTime?: number;
}
