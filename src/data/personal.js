import profileImg from '../Assets/KhuswanthRao.jpeg';
import resumePdf from '../Assets/Jadav Khuswanth Rao.pdf';

export const personal = {
  name: 'Khuswanth Rao Jadav',
  firstName: 'Khuswanth Rao',
  role: 'Frontend / React Developer',
  tagline: 'I craft fast, accessible and delightful web experiences.',
  location: 'Hyderabad, Telangana, India',
  email: 'khuswanthraojadav@gmail.com',
  phone: '+91 7671085912', // TODO: replace with your phone number
  avatar: profileImg,
  resumeUrl: resumePdf,
  socials: [
    {
      label: 'GitHub',
      url: 'https://github.com/khuswanth1', // TODO: replace
      icon: 'github',
    },
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/khuswanth-rao-jadav/', // TODO: replace
      icon: 'linkedin',
    },
    {
      label: 'Email',
      url: 'mailto:khuswanthraojadav@gmail.com',
      icon: 'mail',
    },
  ],
  availability: 'Open to Frontend / React Developer roles',
};

/* ── About ─────────────────────────────────────────────── */
export const about = {
  summary: `Frontend / React Developer based in Hyderabad with hands-on experience building
production web applications at Levitica Technologies. I have a strong foundation in JavaScript,
React, UI/UX and REST APIs, plus full-stack exposure through Java/Spring Boot and the MERN stack.

I care about clean code, component architecture, performance and pixel-perfect responsive
interfaces — and I bring designs to life with Tailwind CSS, Material UI and modern React patterns.`,
  highlights: [
    '1+ year of professional React development',
    'Strong JavaScript fundamentals & UI/UX practice',
    'Full-stack exposure — Node.js, Express, Java/Spring Boot, MySQL',
    'Experienced with JWT, OAuth & Google authentication flows',
  ],
  stats: [
    { value: '2+', label: 'Years of hands-on build experience' },
    { value: '5+', label: 'Professional projects shipped' },
    { value: '3', label: 'Internships across frontend & full-stack' },
    { value: '8.31', label: 'B.Tech CGPA' },
  ],
};

/* ── Skills ────────────────────────────────────────────── */
export const skills = [
  {
    title: 'Frontend',
    icon: 'code',
    items: [
      { name: 'JavaScript (ES6+)', level: 92 },
      { name: 'React.js', level: 90 },
      { name: 'Redux Toolkit', level: 80 },
      { name: 'Material UI', level: 88 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'HTML5 & CSS3', level: 95 }
    ],
  },
  {
    title: 'Backend & APIs',
    icon: 'server',
    items: [
      { name: 'Node.js & Express.js', level: 82 },
      {name:'python',level:75},
      {name:'FastAPI',level:70},
      {name:'Django',level:60},
      { name: 'Java & Spring Boot', level: 76 },
      { name: 'REST APIs', level: 88 },
      { name: 'JWT / OAuth / Google Auth', level: 82 },
      { name: 'JSP / Servlets', level: 72 },
      { name: 'Webhooks', level: 72 },
    ],
  },
  {
    title: 'Database & Tools',
    icon: 'database',
    items: [
      { name: 'MySQL', level: 80 },
      { name: 'Git / GitHub', level: 88 },
      { name: 'OpenAI', level: 78 },
      { name: 'Figma / UI Design', level: 80 },
    ],
  },
];

/* ── Experience ────────────────────────────────────────── */
export const experience = [
  {
    id: 1,
    role: "Associate Software Engineer",
    company: "Levitica Technologies Pvt Ltd",
    period: "Mar 2025 – Present",
    current: true,
    type: "Professional",
    color: "#ffe600",
    description: "Spearheading the engineering of high-performance frontend architectures and cross-platform mobile solutions using React.js and React Native. Promoted from Frontend Engineering Intern to Associate Software Engineer, designing pixel-perfect user interfaces with Tailwind CSS, developing responsive components, and leveraging AI dev tools (ChatGPT, GitHub Copilot) to accelerate delivery cycles.",
    technologies: ["React.js", "React Native", "Tailwind CSS", "JavaScript (ES6+)", "HTML5/CSS3", "UI/UX Design", "Figma", "AI Dev Tools"],
    points: [
      "Engineering responsive web & mobile UI using React.js, React Native, and Tailwind CSS.",
      "Designing intuitive UI/UX wireframes, prototypes, and accessible modern interfaces.",
      "Leveraging AI dev tools (ChatGPT / Copilot) to streamline code quality & accelerate delivery.",
      "Leading frontend architecture transitions, performance optimization, and cross-browser compatibility."
    ]
  },
  {
    id: 2,
    role: "Internship",
    company: "Wavemaker",
    period: "Jul 2024 – Sep 2024",
    type: "Internship",
    color: "#00d4ff",
    description: "Engineered scalable enterprise solutions using the Wavemaker low-code ecosystem integrated with custom Java backend services. Orchestrated the full-cycle development of RESTful web services and optimized relational database schemas. Collaborated within an Agile Scrum framework to deliver robust modules, ensuring high code quality through rigorous peer reviews and automated testing.",
    technologies: ["Java EE", "Spring Boot", "RESTful Architecture", "Agile/Scrum", "Low-Code DevOps", "MySQL"],
    points: [
      "Developing scalable Java backend system services.",
      "Architecting efficient RESTful web based services.",
      "Optimizing relational database technical data schemas.",
      "Collaborating within Agile Scrum framework daily."
    ]
  },
  {
    id: 3,
    role: "Internship",
    company: "Lets Grow More",
    period: "Nov 2022 – Dec 2022",
    type: "Internship",
    color: "#ff00f7",
    description: "Conceptualized and deployed modern web interfaces with a primary focus on user-centric design and cross-browser compatibility. Leveraged foundational web technologies to create performant, responsive applications, significantly improving UI accessibility and interaction flow for enhanced end-user engagement.",
    technologies: ["JavaScript ES6", "HTML5 Specialist", "CSS3 Grid/Flex", "Responsive Design", "UI Frameworks"],
    points: [
      "Deploying modern cross-browser compatible interfaces.",
      "Creating performant responsive web based applications.",
      "Improving UI accessibility and interaction flow.",
      "Implementing user-centric frontend design schemes."
    ]
  },
  {
    id: 4,
    role: "Internship",
    company: "Oasis Infobyte",
    period: "Sep 2022 – Oct 2022",
    type: "Internship",
    color: "#7b2fff",
    description: "Advanced core technical competencies through the implementation of complex algorithmic solutions and robust backend logic. Applied Object-Oriented Programming (OOP) principles to develop scalable Java applications, focusing on data structure optimization and the elimination of computational bottlenecks in real-world logic scenarios.",
    technologies: ["Core Java", "OOP Principles", "DSA Optimization", "Logic Engineering", "Backend Testing"],
    points: [
      "Implementing complex algorithmic Java solutions locally.",
      "Applying OOP principles for scalable application logic.",
      "Optimizing data structures to eliminate bottlenecks.",
      "Engineering robust backend logic for real scenarios."
    ]
  }
];

/* ── Education ─────────────────────────────────────────── */
export const education = [
  {
    id: 1,
    degree: "Bachelor of Technology",
    field: "Computer Science and Engineering",
    institution: "Sri Venkateswara College of Engineering",
    location: "Tirupati",
    period: "2020 – 2024",
    cgpa: "8.31",
    score: "CGPA: 8.31",
    icon: "School"
  },
  {
    id: 2,
    degree: "Board of Intermediate Education",
    field: "MPC (Math, Physics, Chemistry)",
    institution: "Sri Chaitanya Junior College",
    location: "Tirupati",
    period: "2018 – 2020",
    cgpa: "6.21",
    score: "CGPA: 6.21",
    icon: "AutoStories"
  },
  {
    id: 3,
    degree: "Board of Secondary School Education",
    field: "SSC",
    institution: "Prashanth English Medium High School",
    location: "Tirupati",
    period: "2018",
    cgpa: "8.5",
    score: "CGPA: 8.5",
    icon: "AccountBalance"
  }
];

/* ── Projects ──────────────────────────────────────────── */
export const projects = [
  {
    id: 1,
    title: "PharmaCare E-Commerce Platform",
    subtitle: "React.js • Spring Boot Microservices • JWT • Cloud Architecture",
    description: "A production-grade full-stack pharmacy e-commerce platform built with React.js and a Spring Boot microservices backend. Features independent authentication, catalog, shopping cart, order, and payment processing services.",
    techStack: ["React.js", "Spring Boot", "Microservices", "Spring Security", "JWT", "RESTful APIs", "Hibernate", "MySQL", "Tailwind CSS"],
    tech: ["React.js", "Spring Boot", "Microservices", "JWT", "MySQL", "Tailwind CSS"],
    features: [
      "Architected scalable microservices backend with isolated Auth, Product, Cart, Order, and Payment services",
      "Designed and secured RESTful APIs with Spring Boot, Spring Data JPA, Hibernate, and JWT/OAuth2 authentication",
      "Built dynamic shopping workflows including real-time product search, cart synchronization, and checkout",
      "Engineered modular React.js components utilizing Context API for seamless global state management",
      "Implemented enterprise API Gateway routing patterns and robust error-handling mechanisms"
    ],
    highlights: [
      "Microservices Backend",
      "JWT & Spring Security",
      "Real-time Search & Cart",
      "API Gateway Routing"
    ],
    gradient: "from-emerald-400 to-teal-600",
    color: "#00ff88",
    accent: "#00ff88",
    github: "https://github.com/khuswanth1/Pharma-app",
    links: { live: "#", code: "https://github.com/khuswanth1/Pharma-app" },
    category: "Microservices Web App"
  },
  {
    id: 2,
    title: "TaskMaster - Productivity Suite",
    subtitle: "React.js • Spring Boot • Material UI • Tailwind CSS • Docker",
    description: "A full-stack productivity and task management suite engineered with React.js and Spring Boot. Delivers responsive task categorization, priority scheduling, and persistent database storage.",
    techStack: ["React.js", "Java", "Spring Boot", "REST API", "Spring Data JPA", "Material UI", "Tailwind CSS", "Docker", "Maven"],
    tech: ["React.js", "Spring Boot", "Material UI", "Tailwind CSS", "Docker"],
    features: [
      "Developed high-throughput RESTful backend endpoints with Spring Boot and JPA persistence",
      "Created an intuitive, accessible React frontend with interactive task boards and filter states",
      "Architected multi-layered application separation across UI, controller API, service, and repository layers",
      "Configured Docker and Docker Compose environments for simplified containerized deployments"
    ],
    highlights: [
      "Interactive Task Boards",
      "Layered Architecture",
      "Spring JPA Persistence",
      "Docker Containerization"
    ],
    gradient: "from-cyan-400 to-blue-600",
    color: "#00f2ff",
    accent: "#00f2ff",
    github: "https://github.com/khuswanth1/Todo",
    links: { live: "#", code: "https://github.com/khuswanth1/Todo" },
    category: "Full Stack Web App"
  },
  {
    id: 3,
    title: "ATM Banking Simulation System",
    subtitle: "Java Core • Object-Oriented Architecture • Transaction Security",
    description: "A robust banking simulation system that emulates real-time ATM transactions with secure PIN validation, deposit, withdrawal, account-to-account transfer, and transaction history tracking.",
    techStack: ["Java", "OOP Design", "Data Structures", "Console UI", "Exception Handling"],
    tech: ["Java", "OOP Design", "Data Structures", "Console UI"],
    features: [
      "Secure PIN-based authentication with session validation",
      "Transactional safety for deposit, withdrawal, and fund transfers",
      "Comprehensive transaction history logging and mini-statement generation",
      "Robust exception handling and data boundary verification"
    ],
    highlights: [
      "PIN Session Security",
      "Transaction Safety",
      "Mini-statement Log",
      "Exception Handling"
    ],
    gradient: "from-purple-500 to-pink-600",
    color: "#ff00f7",
    accent: "#ff00f7",
    github: "https://github.com/khuswanth1/ATM_Interface",
    links: { live: "#", code: "https://github.com/khuswanth1/ATM_Interface" },
    category: "Java Application"
  },
  {
    id: 4,
    title: "Trivia Seven - Interactive Quiz Engine",
    subtitle: "Java • Multi-Category Engine • Two-Player Competitive Logic",
    description: "An interactive two-player competitive quiz platform featuring seven knowledge categories, real-time score tracking, dynamic question randomization, and automated winner evaluation.",
    techStack: ["Java", "Game Logic", "OOP", "Data Collections", "Console UI"],
    tech: ["Java", "Game Logic", "OOP", "Collections"],
    features: [
      "Two-player competitive game mode with turn management",
      "7 distinct knowledge domains and curated question banks",
      "Dynamic question shuffling and real-time score accumulation",
      "Automated winner evaluation and performance summary"
    ],
    highlights: [
      "Two-Player Competitive",
      "7 Knowledge Domains",
      "Dynamic Question Bank",
      "Score Accumulation"
    ],
    gradient: "from-amber-400 to-orange-600",
    color: "#ffe600",
    accent: "#ffe600",
    github: "https://github.com/khuswanth1/triviaWithSeven",
    links: { live: "#", code: "https://github.com/khuswanth1/triviaWithSeven" },
    category: "Java Application"
  }
];

/* ── Certifications ────────────────────────────────────── */
export const certifications = [
  {
    id: 1,
    title: "Frontend Developer (React)",
    issuer: "HackerRank",
    year: "Jul 2026",
    color: "#00f2ff",
    category: "Frontend",
  },
  {
    id: 2,
    title: "React (Basic & Advanced)",
    issuer: "HackerRank",
    year: "Jul 2026",
    color: "#00ff88",
    category: "Frontend",
  },
  {
    id: 3,
    title: "Software Engineer Role Certification",
    issuer: "HackerRank",
    year: "Jul 2026",
    color: "#ffe600",
    category: "Engineering"
  },
  {
    id: 4,
    title: "JavaScript Specialist",
    issuer: "Infosys Springboard",
    year: "Jul 2026",
    color: "#ff00f7",
    category: "Frontend"
  },
  {
    id: 5,
    title: "Cloud Computing Architecture",
    issuer: "NPTEL (IIT Kharagpur)",
    year: "2023",
    color: "#00d4ff",
    category: "Cloud"
  },
  {
    id: 6,
    title: "Introduction to Machine Learning",
    issuer: "Coursera & Kaggle",
    year: "2023",
    color: "#a855f7",
    category: "AI/ML"
  },
  {
    id: 7,
    title: "Database Management Systems (DBMS)",
    issuer: "NPTEL (IIT Madras)",
    year: "2023",
    color: "#ff6b35",
    category: "Database"
  },
  {
    id: 8,
    title: "SQL & Relational Databases",
    issuer: "SoloLearn",
    year: "2022",
    color: "#ffd700",
    category: "Database"
  },
  {
    id: 9,
    title: "Full-Stack Web Development",
    issuer: "Lets Grow More",
    year: "2022",
    color: "#00ff88",
    category: "Web"
  },
  {
    id: 10,
    title: "Java Application Engineering",
    issuer: "Oasis Infobyte",
    year: "2022",
    color: "#7b2fff",
    category: "Programming"
  }
];

/* ── Technologies marquee ──────────────────────────────── */
export const techMarquee = [
  'JavaScript', 'React.js', 'Python', 'FastAPI', 'Django', 'Redux Toolkit', 'Material UI', 'Tailwind CSS',
  'Node.js', 'Express.js', 'REST APIs', 'JWT', 'OAuth', 'MySQL', 'MongoDB',
  'Java', 'Spring Boot', 'Git', 'GitHub', 'HTML5', 'CSS3', 'WaveMaker',
];