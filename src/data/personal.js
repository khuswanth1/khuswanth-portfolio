/**
 * All portfolio content lives here — edit this one file to update the site.
 *
 * Sources: the resume in /public and the public repositories on github.com/khuswanth1.
 * Keep it factual: every project links to code you can show, every claim is something
 * you can talk through in an interview.
 */
import profile480 from '../Assets/img/profile-480.webp';
import profile800 from '../Assets/img/profile-800.webp';
import profileJpg from '../Assets/img/profile-480.jpg';

export const SITE_URL = 'https://portfolio-ten-liard-91.vercel.app';

export const personal = {
  name: 'Khuswanth Rao Jadav',
  shortName: 'Khuswanth',
  role: 'Frontend / React Developer',
  headline: 'Frontend Engineer building responsive, API-driven web apps',
  intro:
    'I build the part of the product people actually touch: fast, responsive React interfaces that hold up in production. I also work comfortably across the API boundary with Java, Spring Boot and SQL.',
  location: 'Hyderabad, India',
  email: 'khuswanthraojadav@gmail.com',
  phone: '+91 7671085912',
  avatar: {
    src: profile800,
    srcSet: `${profile480} 480w, ${profile800} 800w`,
    fallback: profileJpg,
    width: 800,
    height: 1067,
  },
  resumeUrl: `${import.meta.env.BASE_URL}Khuswanth-Rao-Jadav-Resume.pdf`,
  resumeFileName: 'Khuswanth-Rao-Jadav-Resume.pdf',
  github: 'https://github.com/khuswanth1',
  githubUser: 'khuswanth1',
  linkedin: 'https://www.linkedin.com/in/khuswanth-rao-jadav/',
  availability: 'Open to Frontend, React & Full-Stack roles',
  coreStack: ['React.js', 'TypeScript', 'JavaScript (ES6+)', 'Tailwind CSS', 'REST APIs', 'Spring Boot'],
  careerStart: '2025-03-01',
};

export const socials = [
  { label: 'GitHub', url: personal.github, icon: 'github', handle: 'github.com/khuswanth1' },
  { label: 'LinkedIn', url: personal.linkedin, icon: 'linkedin', handle: 'in/khuswanth-rao-jadav' },
  { label: 'Email', url: `mailto:${personal.email}`, icon: 'mail', handle: personal.email },
];

/* ── About ─────────────────────────────────────────────── */
export const about = {
  summary: [
    'I am a frontend engineer at Levitica Technologies, where I ship React and TypeScript features from design handoff to production: authenticated dashboards, multi-step forms and data-heavy tables, all wired to REST APIs. I also track down performance problems such as unnecessary re-renders and slow initial loads.',
    'I go deeper on the backend through my own projects, most recently a Spring Boot microservices system with six services, Spring Cloud Gateway, JWT and Google OAuth2 sign-in, and Razorpay payments, paired with a React frontend. An earlier internship at WaveMaker, building Java and Spring Boot modules with role-based access control, is why I design components with the API, the data and the edge cases in mind.',
  ],
  goals:
    'I am looking for a Frontend or Full-Stack role in Hyderabad, Bengaluru or Chennai (open to remote), where I can own real features end to end and keep raising the bar on UI quality and performance.',
  strengths: [
    {
      title: 'Component architecture',
      text: 'Reusable UI libraries, design tokens and predictable state with Redux Toolkit, Context API and Zustand.',
    },
    {
      title: 'Performance-minded',
      text: 'Route-level code splitting, asset preloading and memoization to keep Core Web Vitals healthy.',
    },
    {
      title: 'API integration',
      text: 'REST and FastAPI integration with authentication, error states and loading states handled properly.',
    },
    {
      title: 'Team delivery',
      text: 'Agile/Scrum ceremonies, peer code reviews in Git, and close work with designers, backend and QA.',
    },
  ],
  facts: [
    { value: '__YEARS__', label: 'Professional experience' },
    { value: '4', label: 'Internships' },
    { value: '9', label: 'Projects shown here' },
    { value: '8.31', label: 'B.Tech CGPA' },
  ],
};

/* Achievements: only facts stated in the resume, LinkedIn profile or project descriptions. */
export const achievements = [
  { icon: 'react', title: 'Converted to full-time', text: 'Moved from Software Engineer Intern to Associate Software Engineer at Levitica Technologies.' },
  { icon: 'tools', title: '10 certifications', text: 'Including Azure AI Fundamentals, HackerRank Frontend Developer and Cisco CCNA: Introduction to Networks.' },
];

/* ── Skills ──────────────────────────────────────────────
 * level: 3 = Advanced (daily use), 2 = Proficient (shipped with it), 1 = Familiar
 */
export const SKILL_LEVELS = { 3: 'Advanced', 2: 'Proficient', 1: 'Familiar' };

export const skills = [
  {
    title: 'Frontend',
    icon: 'layout',
    items: [
      { name: 'React.js', level: 3, icon: 'react' },
      { name: 'JavaScript (ES6+)', level: 3, icon: 'js' },
      { name: 'HTML5 & CSS3', level: 3, icon: 'html' },
      { name: 'Tailwind CSS', level: 3, icon: 'tailwind' },
      { name: 'Responsive Design', level: 3 },
      { name: 'TypeScript', level: 2, icon: 'ts' },
      { name: 'Next.js', level: 2, icon: 'next' },
      { name: 'Material UI', level: 2, icon: 'mui' },
      { name: 'Bootstrap', level: 2, icon: 'bootstrap' },
    ],
  },
  {
    title: 'State & APIs',
    icon: 'api',
    items: [
      { name: 'REST APIs', level: 3 },
      { name: 'Redux Toolkit', level: 2, icon: 'redux' },
      { name: 'Context API', level: 3 },
      { name: 'Zustand', level: 2 },
      { name: 'TanStack Query', level: 1 },
      { name: 'Axios / Fetch', level: 3 },
      { name: 'FastAPI integration', level: 2, icon: 'fastapi' },
      { name: 'Firebase', level: 2, icon: 'firebase' },
    ],
  },
  {
    title: 'Backend & Databases',
    icon: 'server',
    items: [
      { name: 'Java', level: 2, icon: 'java' },
      { name: 'Spring Boot', level: 2, icon: 'spring' },
      { name: 'Spring Security', level: 2 },
      { name: 'MySQL', level: 2, icon: 'mysql' },
      { name: 'PostgreSQL', level: 2 },
      { name: 'OAuth2 / JWT', level: 2 },
      { name: 'Hibernate / JDBC', level: 1 },
      { name: 'Servlets & JSP', level: 1 },
      { name: 'Node.js & Express', level: 1, icon: 'node' },
      { name: 'Python & Django', level: 1, icon: 'python' },
    ],
  },
  {
    title: 'Tools & Practices',
    icon: 'tools',
    items: [
      { name: 'Git & GitHub', level: 3, icon: 'git' },
      { name: 'Chrome DevTools', level: 3 },
      { name: 'Postman', level: 2, icon: 'postman' },
      { name: 'Jest / Vitest', level: 2, icon: 'vitest' },
      { name: 'Docker', level: 1, icon: 'docker' },
      { name: 'Figma', level: 2, icon: 'figma' },
      { name: 'Agile / Scrum', level: 3 },
      { name: 'Linux', level: 1, icon: 'linux' },
    ],
  },
];

/* ── Experience ────────────────────────────────────────── */
export const experience = [
  {
    id: 'levitica',
    role: 'Associate Software Engineer',
    company: 'Levitica Technologies Pvt Ltd',
    location: 'Hyderabad, India',
    period: 'Jul 2025 – Present',
    type: 'Full-time',
    summary:
      'Frontend engineer on production web applications, focused on React feature development, API integration and UI performance.',
    points: [
      'Built and shipped React.js and TypeScript features from design handoff to production, integrating REST and FastAPI endpoints with proper loading, empty and error states.',
      'Developed reusable components, dashboards, multi-step forms and data tables with sorting, filtering and pagination.',
      'Reduced unnecessary re-renders and initial load time on key screens using route-level code splitting, asset preloading and memoization.',
      'Resolved production defects across the React frontend and API layer in an Agile team, with daily stand-ups, sprint reviews and Git-based peer code reviews.',
    ],
    tech: ['React.js', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'REST APIs', 'Git', 'Figma'],
  },
  {
    id: 'levitica-intern',
    role: 'Software Engineer Intern',
    company: 'Levitica Technologies Pvt Ltd',
    location: 'Hyderabad, India',
    period: 'Mar 2025 – Jun 2025',
    type: 'Internship, converted to full-time',
    summary: 'Started as an intern and was converted to a full-time Associate Software Engineer.',
    points: [
      'Built responsive React.js UI components from design specifications.',
      'Integrated REST API endpoints into frontend views.',
    ],
    tech: ['React.js', 'JavaScript', 'REST APIs', 'Tailwind CSS'],
  },
  {
    id: 'wavemaker',
    role: 'Full Stack Java Intern',
    company: 'WaveMaker',
    location: 'Hyderabad, India',
    period: 'Jul 2024 – Sep 2024',
    type: 'Internship',
    summary: 'Full-stack development across enterprise portal front ends and Java / Spring Boot REST services.',
    points: [
      'Built full-stack enterprise modules with Java, Spring Boot, Hibernate, MySQL and REST APIs.',
      'Implemented role-based access control with OAuth2/JWT authentication.',
      'Designed relational schemas and optimised SQL queries to improve performance.',
      'Developed modular front-end views with JavaScript (ES6+), HTML5, CSS3 and Bootstrap, and diagnosed cross-browser defects in Chrome DevTools.',
    ],
    tech: ['Java', 'Spring Boot', 'Hibernate', 'MySQL', 'JavaScript', 'OAuth2/JWT'],
  },
  {
    id: 'lgm',
    role: 'Web Development Intern',
    company: 'LetsGrowMore',
    location: 'Remote',
    period: 'Nov 2022 – Dec 2022',
    type: 'Internship',
    summary: 'Virtual internship focused on core web fundamentals.',
    points: [
      'Built responsive, cross-browser web interfaces with HTML5, CSS3, JavaScript (ES6+) and Bootstrap, using reusable components.',
      'Completed four published tasks: a to-do list app, a React app, a live-preview registration form and a calculator.',
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'React.js'],
  },
  {
    id: 'oasis',
    role: 'Java Development Intern',
    company: 'Oasis Infobyte',
    location: 'Remote',
    period: 'Sep 2022 – Oct 2022',
    type: 'Internship',
    summary: 'Virtual internship focused on Java and object-oriented design.',
    points: [
      'Developed Java applications using Core Java, OOP and data structures, including an ATM interface and a number-guessing game.',
      'Focused on exception handling, debugging and clean code.',
    ],
    tech: ['Java', 'OOP', 'Collections'],
  },
];

/* ── Education ─────────────────────────────────────────── */
export const education = [
  {
    id: 'btech',
    degree: 'Bachelor of Technology (B.Tech)',
    field: 'Computer Engineering',
    institution: 'Sri Venkateswara College of Engineering',
    location: 'Tirupati',
    period: '2020 – 2024',
    score: 'CGPA 8.31 / 10',
  },
  {
    id: 'inter',
    degree: 'Intermediate (MPC)',
    field: 'Mathematics, Physics, Chemistry',
    institution: 'Sri Chaitanya Junior College',
    location: 'Tirupati',
    period: '2018 – 2020',
    score: 'CGPA 6.21',
  },
  {
    id: 'ssc',
    degree: 'Secondary School Certificate (SSC)',
    field: 'Board of Secondary Education',
    institution: 'Prashanth English Medium High School',
    location: 'Tirupati',
    period: '2018',
    score: 'CGPA 8.5',
  },
];

/* ── Certifications ────────────────────────────────────── */
export const certifications = [
  { title: 'Azure AI Fundamentals (AI-900)', issuer: 'Microsoft', category: 'Cloud & AI' },
  { title: 'Frontend Developer (React)', issuer: 'HackerRank', year: '2026', category: 'Frontend' },
  { title: 'React (Basic & Advanced)', issuer: 'HackerRank', year: '2026', category: 'Frontend' },
  { title: 'Software Engineer Role Certification', issuer: 'HackerRank', year: '2026', category: 'Engineering' },
  { title: 'JavaScript (ES6+, DOM, Async JS)', issuer: 'Infosys Springboard', year: '2026', category: 'Frontend' },
  { title: 'CCNA: Introduction to Networks', issuer: 'Cisco Networking Academy', category: 'Networking' },
  { title: 'Cloud Computing', issuer: 'NPTEL (IIT Kharagpur)', year: '2023', category: 'Cloud & AI' },
  { title: 'Database Management Systems', issuer: 'NPTEL (IIT Madras)', year: '2023', category: 'Databases' },
  { title: 'Introduction to Machine Learning', issuer: 'Coursera & Kaggle', year: '2023', category: 'Cloud & AI' },
  { title: 'SQL & Relational Databases', issuer: 'SoloLearn', year: '2022', category: 'Databases' },
];

/* ── Services ──────────────────────────────────────────── */
export const services = [
  {
    icon: 'layout',
    title: 'Frontend Development',
    text: 'Pixel-accurate, responsive and accessible interfaces from a Figma file or a rough idea, in HTML, CSS, Tailwind and modern JavaScript.',
    points: ['Responsive, mobile-first layouts', 'Accessibility and keyboard support', 'Core Web Vitals tuning'],
  },
  {
    icon: 'react',
    title: 'React Development',
    text: 'Single-page apps and dashboards in React and TypeScript with clean component architecture and predictable state.',
    points: ['Reusable component libraries', 'Redux Toolkit, Context or Zustand', 'Code splitting and lazy loading'],
  },
  {
    icon: 'server',
    title: 'Full-Stack Development',
    text: 'React front ends connected to REST APIs, with the Java, Spring Boot and MySQL background to work across the stack.',
    points: ['REST / FastAPI integration', 'JWT & OAuth2 authentication flows', 'Spring Boot + MySQL services'],
  },
];

/* ── Projects ────────────────────────────────────────────
 * category: 'web' | 'dashboard' | 'fullstack' | 'java' | 'python' (tabs with no projects are hidden)
 * image: optional screenshot (import it at the top of this file) — a generated cover is used otherwise
 */
export const PROJECT_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web apps' },
  { id: 'dashboard', label: 'Dashboards' },
  { id: 'fullstack', label: 'Full stack' },
  { id: 'java', label: 'Java' },
  { id: 'python', label: 'Python' },
];

export const projects = [
  {
    slug: 'task-manager',
    title: 'TaskMaster',
    tagline: 'Task management PWA with push notifications and themes',
    category: 'web',
    featured: true,
    accent: '#22d3ee',
    icon: 'tasks',
    description:
      'A productivity app for creating, scheduling and tracking tasks, with Firebase-backed sign-in and storage, browser push notifications and a deeply customisable interface.',
    features: [
      'Create, prioritise and track tasks from a dashboard view',
      'Desktop and web-push notifications for upcoming tasks',
      'Multilingual UI with an i18n layer and multilingual input',
      'Custom themes, Google Fonts picker, sound and calendar settings',
      'Backup and restore settings, profile editing',
      'Containerised with Docker; deployed on Vercel',
    ],
    tech: ['React.js', 'Vite', 'Material UI', 'Tailwind CSS', 'Firebase', 'Docker'],
    github: 'https://github.com/khuswanth1/Task-Management-Application',
    // live: 'https://todo-ashen-gamma-89.vercel.app',
  },
  {
    slug: 'pharmacy-ecommerce',
    title: 'PharmaCare',
    tagline: 'Pharmacy e-commerce with prescriptions and live delivery tracking',
    category: 'web',
    featured: true,
    accent: '#34d399',
    icon: 'pharmacy',
    description:
      'A pharmacy shopping platform with medicine search, cart and checkout, prescription upload, and separate portals for admins, vendors and delivery partners.',
    features: [
      'Medicine catalogue with category pages, debounced search and voice search',
      'Prescription upload with in-browser OCR (Tesseract.js) and webcam capture',
      'Cart, wishlist, saved addresses with map-based location picker',
      'Razorpay checkout flow with payment-failure handling',
      'Order tracking with a live delivery map and ETA estimates',
      'Admin, vendor and delivery-partner dashboards with role-based routing',
    ],
    tech: ['React.js', 'Redux Toolkit', 'Material UI', 'Tailwind CSS', 'Firebase', 'Google Maps', 'Razorpay'],
    github: 'https://github.com/khuswanth1/Pharmacy-E-Commerce-Application',
  },
  {
    slug: 'bookmyshow-clone',
    title: 'BookMyShow Clone',
    tagline: 'Movie and event ticketing with seat maps and QR check-in',
    category: 'web',
    featured: true,
    accent: '#fb7185',
    icon: 'ticket',
    description:
      'A ticketing and events marketplace: browse movies and events by city, pick seats, check out, and get a QR ticket that organisers scan at the venue.',
    features: [
      'City picker and map view of venues (Leaflet)',
      'Interactive seat selection and checkout flow',
      'QR-code tickets and a camera-based check-in scanner (jsQR)',
      'Organizer, vendor, helpdesk and admin portals with role-based access',
      'Server-state caching with TanStack Query',
      'Docker + nginx production image; unit tests with Vitest',
    ],
    tech: ['React.js', 'React Router', 'TanStack Query', 'Tailwind CSS', 'Leaflet', 'Vitest', 'Docker'],
    github: 'https://github.com/khuswanth1/bookmyshow',
  },
  {
    slug: 'fintrack',
    title: 'FinTrack',
    tagline: 'Personal finance dashboard with budgets, goals and insights',
    category: 'dashboard',
    featured: true,
    accent: '#a3e635',
    icon: 'chart',
    description:
      'A personal finance dashboard for tracking transactions, budgets, savings goals and recurring payments, with charts, an insights page and an assistant chat.',
    features: [
      'Google sign-in with Firebase Authentication',
      'Transactions, categories, budgets, goals and recurring payments',
      'Interactive charts for trends and category breakdowns (Recharts)',
      'Insights page and an in-app assistant chat',
      'Real-time updates, light/dark theme and toast notifications',
      'Tested with Vitest and Testing Library; Dockerised',
    ],
    tech: ['React.js', 'React Router', 'Recharts', 'Firebase', 'Tailwind CSS', 'Vitest'],
    github: 'https://github.com/khuswanth1/fintrack',
  },
  {
    slug: 'chatflow',
    title: 'ChatFlow',
    tagline: 'Real-time messaging front end with calls and stories',
    category: 'web',
    accent: '#60a5fa',
    icon: 'chat',
    description:
      'The front end of a real-time messaging app with direct and group chats over WebSockets, call screens, 24-hour status stories and an AI chatbot.',
    features: [
      'Direct and group conversations over WebSockets',
      'Deep-linkable routes for chats, status, calls and settings (React Router v7)',
      '1:1 and group call interfaces (WebRTC)',
      '24-hour disappearing status updates',
      'Dark, light and system themes; mobile-first layout',
      'Global state with Zustand',
    ],
    tech: ['React 19', 'React Router', 'Zustand', 'Tailwind CSS', 'WebSockets'],
    github: 'https://github.com/khuswanth1/chatting-app',
  },
  {
    slug: 'wavely',
    title: 'Wavely',
    tagline: 'Music streaming web app with a persistent player',
    category: 'web',
    accent: '#c084fc',
    icon: 'music',
    description:
      'A music streaming interface with a persistent player and queue, playlists, search, charts and podcasts, plus an admin area for managing the catalogue.',
    features: [
      'Persistent player bar with queue panel and reducer-driven player state',
      'Keyboard shortcuts for playback and navigation',
      'Search, playlists, artists, charts, languages and podcast pages',
      'Spotify account connection via OAuth callback',
      'Admin dashboard for catalogue and source management',
      'Linted with Oxlint, tested with Vitest; Docker + nginx image',
    ],
    tech: ['React.js', 'React Router', 'Tailwind CSS', 'Context API', 'Vitest', 'Docker'],
    github: 'https://github.com/khuswanth1/music-player',
  },
  {
    slug: 'atm-interface',
    title: 'ATM Interface',
    tagline: 'Console banking simulation in Core Java',
    category: 'java',
    accent: '#f472b6',
    icon: 'bank',
    description:
      'A console ATM simulation with PIN authentication, deposits, withdrawals, transfers and a transaction history.',
    features: [
      'PIN-based login and session handling',
      'Deposit, withdrawal and account-to-account transfer',
      'Transaction history and mini statement',
      'Input validation and exception handling',
    ],
    tech: ['Java', 'OOP', 'Collections'],
    github: 'https://github.com/khuswanth1/ATM_Interface',
  },
  {
    slug: 'trivia-seven',
    title: 'Trivia Seven',
    tagline: 'Two-player quiz game with seven categories',
    category: 'java',
    accent: '#facc15',
    icon: 'quiz',
    description:
      'A two-player console quiz with seven knowledge categories, shuffled questions, live scoring and automatic winner evaluation.',
    features: [
      'Turn-based two-player mode',
      'Seven categories with curated question banks',
      'Question shuffling and running scores',
      'Winner evaluation and summary',
    ],
    tech: ['Java', 'OOP', 'Collections'],
    github: 'https://github.com/khuswanth1/triviaWithSeven',
  },
];
