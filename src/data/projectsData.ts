export type ProjectType =
  | "Frontend"
  | "Backend"
  | "Full-stack"
  | "Web App"
  | "AI Chat"
  | "Website"
  | "Mobile";

export interface Project {
  id: string;
  title: string;
  type: ProjectType;
  image: string; // URL to project image
  languages: string[];
  tags: string[];
  liveUrl: string;
  githubUrl: string;

  // Detail page info
  summary: string;
  approach: string;
  skillsDemonstrated: string[];
  toolsUsed: string[];
  topicsCovered: string[];
  snapshots: string[]; // URLs to project screenshots
}

export const projectsData: Project[] = [
  {
    id: "hushkey",
    title: "HushKey Vault",
    type: "Website",
    image: "/screenshots/hushkey-vault-2025-12-15-082530.png",
    languages: ["TypeScript", "JavaScript", "PostgresQL"],
    tags: [
      "React 19",
      "Vite",
      "Tailwind CSS",
      "Supabase",
      "PostgresQL",
      "Dexie.js",
      "Web Crypto API",
    ],
    liveUrl: "https://hushkeyvault.vercel.app/",
    githubUrl: "https://github.com/JuniorRaja/hushkey-vault-app",

    summary:
      "A zero-knowledge, offline-first password manager built with modern web security standards. Ensures total data sovereignty by encrypting everything client-side before sync, all within a polished Progressive Web App.",
    approach:
      "Designed with a 'security-first' mindset, I utilized the Web Crypto API to implement military-grade AES-256-GCM encryption directly in the browser. To solve the challenge of offline availability, I integrated Dexie.js (IndexedDB) for local storage, ensuring instant access to credentials even without internet. Supabase was chosen for the backend to handle encrypted blob synchronization seamlessly. I prioritized a native-like experience by building it as a PWA, complete with biometric unlock using WebAuthn. The UI was crafted with Tailwind CSS for a sleek, responsive look that adapts to both mobile and desktop workflows.",
    skillsDemonstrated: [
      "Zero-Knowledge Architecture",
      "Client-side Cryptography (Web Crypto API)",
      "Offline-first PWA Development",
      "Biometric Authentication Integration",
      "Secure State Management",
      "Responsive UI/UX Design",
      "Performance Optimization",
    ],
    toolsUsed: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Supabase",
      "Dexie.js",
      "Web Crypto API",
      "Zustand",
    ],
    topicsCovered: [
      "Cybersecurity",
      "Encryption Algorithms",
      "Local-First Software",
      "Progressive Web Apps",
      "State Management",
      "API Integration",
      "Modern Web Security",
    ],
    snapshots: [
      "/screenshots/hushkey-vault-guardian-web 2025-12-15-075218.png",
      "/screenshots/hushkey-vault-guardian-mobile-2025-12-15 075315.png",
      "/screenshots/hushkey-vault-item-details-mobile-2025-12-15-080053.png",
      "/screenshots/hushkey-vault-share-2025-12-15-080403.png",
      "/screenshots/hushkey-vault-search-2025-12-15-075721.png",
      "/screenshots/hushkey-vault-items-list-2025-12-15-080226.png",
    ],
  },
  {
    id: "pr-verse",
    title: "PR verse",
    type: "Website",
    image: "/screenshots/pr-verse-hero-cover-new-2025-11-16T21-01-22-059Z.png",
    languages: ["TypeScript", "JavaScript"],
    tags: ["Next.js", "Tailwind CSS", "Three.js", "Framer Motion", "Vite"],
    liveUrl: "https://prasannar.com/",
    githubUrl: "https://github.com/JuniorRaja/pr-folio",

    summary:
      "A modern, interactive personal portfolio website showcasing projects, skills, and professional journey. Built with cutting-edge web technologies to deliver a smooth, visually engaging experience with 3D elements and smooth animations.",
    approach:
      "Envisioned a space that goes beyond a typical developer portfolio—a complete digital representation of who I am. Started with Vite for blazing-fast development, then built React components with TypeScript to ensure reliability. Integrated Three.js for an interactive 3D globe to visualize my travels and global perspective. Used Framer Motion to create fluid animations that reflect my creative side. Implemented Tailwind CSS for a responsive, modern aesthetic that works seamlessly across all devices. Added dark/light mode to match user preferences and showcase attention to detail. Organized projects with dynamic routing to tell each story individually. Included sections for photography, books, music, and career timeline—creating a holistic view of my journey, not just my code.",
    skillsDemonstrated: [
      "React component architecture and hooks",
      "3D graphics with Three.js",
      "Advanced animations with Framer Motion",
      "Responsive design and mobile optimization",
      "TypeScript for type-safe development",
      "Dark/Light mode implementation",
      "Dynamic routing and data management",
      "Performance optimization",
    ],
    toolsUsed: [
      "Vite",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Three.js",
      "Framer Motion",
      "React Router",
      "Vercel",
    ],
    topicsCovered: [
      "Component-based architecture",
      "3D web graphics",
      "CSS animations and transitions",
      "Responsive web design",
      "State management",
      "API integration",
      "SEO optimization",
      "Performance metrics",
    ],
    snapshots: [
      "/screenshots/pr-verse-about-2025-11-16T20-59-53-129Z.png",
      "/screenshots/pr-verse-contact-2025-11-16T21-00-02-605Z.png",
      "/screenshots/pr-verse-works-2025-11-16T21-00-10-235Z.png",
    ],
  },
  {
    id: "pr-digital-resume",
    title: "PR - Digital Resume",
    type: "Website",
    image:
      "/screenshots/pr-digital-resume-hero-zoomed-2025-11-16T21-10-24-891Z.png",
    languages: ["HTML", "CSS", "JavaScript"],
    tags: ["Resume", "Interactive"],
    liveUrl: "https://juniorraja.github.io/pr-digital-resume/",
    githubUrl: "https://github.com/JuniorRaja/pr-digital-resume",

    summary:
      "A digital resume built with HTML, CSS, and JavaScript as an alternative to traditional PDF resumes. Features a responsive design with interactive elements and modern web technologies.",
    approach:
      "Created a modern digital resume replacing traditional PDF formats. Used semantic HTML for structure, custom CSS for styling and animations, and vanilla JavaScript for interactivity and dynamic content. Ensured responsive design across all devices and added professional typography and layout.",
    skillsDemonstrated: [
      "HTML5 semantic structure",
      "CSS3 styling and animations",
      "Vanilla JavaScript for interactivity",
      "Responsive web design",
      "Web typography and accessibility",
    ],
    toolsUsed: ["HTML5", "CSS3", "JavaScript"],
    topicsCovered: [
      "Semantic HTML",
      "CSS Grid and Flexbox",
      "Responsive design principles",
      "DOM manipulation",
      "Event handling in JavaScript",
    ],
    snapshots: [
      "/screenshots/pr-digital-resume-cover-2025-11-16T20-39-22-533Z.png",
      "/screenshots/pr-digital-resume-cover-2025-11-16T20-39-22-533Z.png",
    ],
  },
  {
    id: "brainwave-ai",
    title: "Brainwave - AI Chat App",
    type: "AI Chat",
    image:
      "/screenshots/brainwave-hero-zoomed-side-2025-11-16T21-10-39-950Z.png",
    languages: ["JavaScript", "CSS", "HTML"],
    tags: ["React", "Tailwind", "AI"],
    liveUrl: "https://chataibrainwave.netlify.app",
    githubUrl: "https://github.com/JuniorRaja/Brainwave-ReactJS",

    summary:
      "A modern AI chat application built with React, featuring an intuitive interface for interacting with AI models. Uses Vite for fast development and Tailwind CSS for modern styling.",
    approach:
      "Developed an AI chat app using React and Vite for performance optimization. Integrated Tailwind CSS for responsive and modern UI design. Implemented features like hero section, features showcase, how-to-use guide, and pricing plans. Focused on user experience with smooth animations and clean layout.",
    skillsDemonstrated: [
      "React component development and state management",
      "Modern CSS with Tailwind utility classes",
      "Vite build tool for optimized development",
      "Responsive web design and mobile optimization",
      "UI/UX design for chat applications",
    ],
    toolsUsed: ["React", "Tailwind CSS", "JavaScript", "Vite", "CSS"],
    topicsCovered: [
      "Component-based architecture in React",
      "Utility-first CSS with Tailwind",
      "Build tools and performance optimization",
      "Responsive design patterns",
      "Chat interface design",
    ],
    snapshots: [
      "/screenshots/brainwave-hero-section-2025-11-16T20-43-41-831Z.png",
      "/screenshots/brainwave-features-section-2025-11-16T20-43-47-528Z.png",
      "/screenshots/brainwave-how-to-use-section-2025-11-16T20-43-54-339Z.png",
    ],
  },
  {
    id: "findashboard",
    title: "FinDashboard",
    type: "Web App",
    image: "/screenshots/findashboard-cover-2025-11-16T20-46-20-355Z.png",
    languages: ["HTML", "CSS", "JavaScript"],
    tags: ["Dashboard", "Finance", "Data Visualization"],
    liveUrl: "https://findashboardbypr.netlify.app/",
    githubUrl: "https://github.com/JuniorRaja/FinDashboard",

    summary:
      "A comprehensive financial dashboard featuring transactional data, charts, and analytics. Displays financial information with responsive design and data visualization using HTML, CSS, and JavaScript.",
    approach:
      "Created a financial dashboard to visualize transactional and financial data. Implemented responsive layout for various screen sizes, added charts for data representation, and included interactive elements like tabs and dark/light mode toggle. Used vanilla JavaScript for dynamic functionality and CSS for modern styling and animations.",
    skillsDemonstrated: [
      "Responsive web design and mobile optimization",
      "Data visualization with HTML/CSS charts",
      "Vanilla JavaScript for dynamic content",
      "CSS media queries and grid layouts",
      "User interface design for dashboards",
    ],
    toolsUsed: ["HTML5", "CSS3", "JavaScript"],
    topicsCovered: [
      "Dashboard UI/UX design",
      "CSS flexbox and grid systems",
      "Chart and graph implementation",
      "Responsive breakpoints",
      "Theme switching (light/dark mode)",
    ],
    snapshots: [
      "/screenshots/findashboard-cover-2025-11-16T20-46-20-355Z.png",
      "/screenshots/findashboard-mid-section-2025-11-16T20-46-30-316Z.png",
    ],
  },
  {
    id: "metaverse-landing",
    title: "Metaverse Landing Page",
    type: "Website",
    image: "/screenshots/metaverse-hero-zoomed-2025-11-16T21-10-59-691Z.png",
    languages: ["JavaScript", "CSS"],
    tags: ["React", "Tailwind", "Framer Motion"],
    liveUrl: "https://prmetaversesite.netlify.app/",
    githubUrl: "https://github.com/JuniorRaja/MetaverseLandingPage_reactJS",

    summary:
      "A visually stunning landing page for a metaverse platform built with Next.js 13, Tailwind CSS, and Framer Motion. Features immersive animations and modern UI design to showcase metaverse concepts.",
    approach:
      "Developed a cutting-edge landing page for a metaverse service using Next.js 13 for server-side rendering and performance. Implemented Tailwind CSS for rapid styling and consistent design system. Used Framer Motion for smooth animations and interactive elements. Structured the page with sections for world exploration, features, pricing, and insights.",
    skillsDemonstrated: [
      "Next.js 13 app directory structure",
      "CSS-in-JS with Tailwind utilities",
      "Advanced animations with Framer Motion",
      "Responsive page layout and design",
      "Component-based React development",
    ],
    toolsUsed: ["Next.js", "Tailwind CSS", "Framer Motion", "JavaScript"],
    topicsCovered: [
      "Server-side rendering with Next.js",
      "Animation libraries integration",
      "Modern CSS frameworks",
      "Landing page optimization",
      "User interaction design",
    ],
    snapshots: [
      "/screenshots/metaverse-hero-anim-2025-11-16T20-50-57-217Z.png",
      "/screenshots/metaverse-section-1-anim-2025-11-16T20-51-14-309Z.png",
      "/screenshots/metaverse-section-2-anim-2025-11-16T20-51-27-798Z.png",
      "/screenshots/metaverse-below-anim-2025-11-16T20-51-38-912Z.png",
    ],
  },
  {
    id: "bank-app-landing",
    title: "Bank App Landing Page",
    type: "Website",
    image: "/screenshots/hoobank-hero-zoomed-2025-11-16T21-11-13-463Z.png",
    languages: ["JavaScript", "CSS", "HTML"],
    tags: ["React", "Tailwind"],
    liveUrl: "https://hoobank-web.netlify.app",
    githubUrl: "https://github.com/JuniorRaja/bankApp_reactJS",

    summary:
      "A modern banking application landing page built with ReactJS, featuring responsive design and modern UI components. Inspired by JavaScript Mastery tutorials, this project demonstrates banking app front-end development.",
    approach:
      "Developed a banking app landing page using React components with Vite for fast development. Applied Tailwind CSS for responsive styling and modern design systems. Created sections for service offerings, features, testimonials, and call-to-action elements. Focused on clean UI/UX design principles for financial applications.",
    skillsDemonstrated: [
      "React component development and hooks",
      "Tailwind CSS utility classes and responsive design",
      "Modern JavaScript ES6+ features",
      "Vite build tool and development setup",
      "Landing page layout and design",
    ],
    toolsUsed: ["React", "Tailwind CSS", "JavaScript", "Vite"],
    topicsCovered: [
      "React component-based architecture",
      "CSS-in-JS with Tailwind utilities",
      "Responsive web design patterns",
      "Modern frontend tooling with Vite",
      "Financial app UI/UX design",
    ],
    snapshots: [
      "/screenshots/hoobank-cover-2025-11-16T20-54-48-524Z.png",
      "/screenshots/hoobank-mid-2025-11-16T20-55-17-496Z.png",
      "/screenshots/hoobank-additional-2025-11-16T20-56-30-003Z.png",
      "/screenshots/hoobank-bottom-2025-11-16T20-55-43-170Z.png",
    ],
  },
];

export const getAllLanguages = (): string[] => {
  const languages = new Set<string>();
  projectsData.forEach((project) => {
    project.languages.forEach((lang) => languages.add(lang));
  });
  return Array.from(languages).sort();
};

export const getAllProjectTypes = (): ProjectType[] => {
  const types = new Set<ProjectType>();
  projectsData.forEach((project) => types.add(project.type));
  return Array.from(types).sort() as ProjectType[];
};

export const getProjectById = (id: string): Project | undefined => {
  return projectsData.find((project) => project.id === id);
};
