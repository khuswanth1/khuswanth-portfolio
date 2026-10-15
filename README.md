<div align="center">

# ⚡ Khuswanth Rao Jadav — Developer Portfolio (Client)

**A high-performance, modern single-page developer portfolio built with React 18, Vite, and Tailwind CSS.**

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Website-00DF81?style=for-the-badge&logo=vercel&logoColor=white)](https://portfolio-ten-liard-91.vercel.app/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4.6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.10-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

[Explore Features](#-key-features) •
[Tech Stack](#-tech-stack) •
[Project Structure](#-project-structure) •
[Getting Started](#-getting-started) •
[Environment Variables](#-environment-variables) •
[Backend Integration](#-backend-integration) •
[Deployment](#-deployment)

---

</div>

## 📌 Overview

This repository contains the complete frontend client for **Khuswanth Rao Jadav's** professional portfolio. Engineered for speed, responsive ergonomics, and engaging micro-interactions, the application showcases professional experience, enterprise projects, technical skills, certifications, and an integrated contact system.

### 🌐 Live Deployment
- **Production URL:** [https://portfolio-ten-liard-91.vercel.app/](https://portfolio-ten-liard-91.vercel.app/)
- **Repository:** [github.com/khuswanth1/khuswanth-portfolio](https://github.com/khuswanth1)

---

## ✨ Key Features

- **🎯 Interactive Hero & Ambient UX:**
  - Mouse-tracking radial spotlight glow (`useSpotlight`).
  - Dynamic typewriter effect cycling through engineering specializations.
  - One-click resume download and direct social action buttons.
  - Infinite auto-scrolling tech marquee with pause-on-hover.

- **💼 Experience & Career Timeline:**
  - Detailed milestones for full-time and internship tenures at Levitica Technologies, WaveMaker, and more.
  - Highlights real-world responsibilities: design handoff execution, reusable UI libraries, and REST/FastAPI integration.

- **🚀 Filterable Projects Showcase:**
  - Category filtering across **Web Apps**, **Dashboards**, **Full Stack**, and **Java**.
  - Deep-dive modal previews (`ProjectModal.jsx`) detailing core architecture, feature breakdown, and direct GitHub links.
  - Fallback-safe dynamic project covers and badges.

- **📊 Comprehensive Skills & Credentials Matrix:**
  - Tiered proficiency levels (*Advanced*, *Proficient*, *Familiar*).
  - Categorized under Frontend, State & APIs, Backend & Databases, and Tools & DevOps.
  - Verified certifications section (Azure AI-900, HackerRank React & Software Engineer, Cisco CCNA, NPTEL).

- **📬 Production-Grade Contact System:**
  - Real-time client-side field validation with accessibility error announcements (`aria-live="polite"`).
  - Hidden honeypot field (`website`) for bot and spam mitigation.
  - Seamless integration with the Django backend REST endpoint.
  - Interactive toast notifications and quick-copy contact cards.

- **⚡ Core Web Vitals & Performance Engineering:**
  - Manual vendor chunking (`react` and `react-dom` separated in Vite Rollup output).
  - Modern image optimization: multi-density WebP formats (`480w`, `800w`) with JPG fallback.
  - Strict security headers (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`) and 1-year immutable asset caching configured via `vercel.json`.

---

## 🛠 Tech Stack

| Domain | Technology / Library | Purpose |
| :--- | :--- | :--- |
| **Framework** | [React 18](https://react.dev/) | Component architecture & state management |
| **Build Tool** | [Vite 5](https://vitejs.dev/) | Lightning-fast HMR and optimized production bundles |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) | Utility-first, responsive design & design tokens |
| **Icons** | [React Icons (Lucide)](https://react-icons.github.io/react-icons/) | Lightweight, unified SVG iconography |
| **Post-processing** | [PostCSS](https://postcss.org/) & [Autoprefixer](https://github.com/postcss/autoprefixer) | Vendor-prefix automation and CSS transformations |
| **Deployment** | [Vercel](https://vercel.com/) | Edge deployment with SPA rewrites and caching |

---

## 📂 Project Structure

```text
client/
├── public/                     # Static assets (Favicon, Manifest, Resume PDF, OG Images)
│   ├── favicon.svg
│   ├── site.webmanifest
│   ├── Khuswanth-Rao-Jadav-Resume.pdf
│   └── og-image.png
├── src/
│   ├── Assets/                 # Compressed avatars and image assets (WebP/JPG)
│   ├── components/             # Reusable UI & presentation components
│   │   ├── AnimatedBackground.jsx  # Canvas / background ambient elements
│   │   ├── BackToTop.jsx           # Floating scroll-to-top button
│   │   ├── CountUp.jsx             # Animated metric counter
│   │   ├── Icon.jsx                # Icon resolver utility
│   │   ├── Navbar.jsx              # Responsive navigation bar with mobile sheet
│   │   ├── ProjectCover.jsx        # Project thumbnail / preview cover
│   │   ├── ProjectModal.jsx        # Project details modal
│   │   ├── Reveal.jsx              # IntersectionObserver entrance animation wrapper
│   │   ├── RoleTyper.jsx           # Typewriter text cycling
│   │   ├── Section.jsx             # Standard section wrapper with header anchors
│   │   ├── TechMarquee.jsx         # Infinite moving tech stack ribbon
│   │   └── Toast.jsx               # Floating feedback toast alert
│   ├── data/
│   │   └── personal.js         # Single source of truth (profile, projects, skills, education)
│   ├── hooks/                  # Custom React hooks
│   │   ├── useInView.js            # Viewport visibility observer
│   │   ├── useSectionRouting.js    # URL hash sync with visible section
│   │   └── useSpotlight.js         # Cursor radial glow tracker
│   ├── lib/
│   │   └── analytics.js        # Client-side telemetry / interaction logger
│   ├── sections/               # Page sections
│   │   ├── About.jsx               # Bio, career narrative, core stats
│   │   ├── Contact.jsx             # Form validation & Django API submission
│   │   ├── Education.jsx           # Education & certification listing
│   │   ├── Experience.jsx          # Professional timeline
│   │   ├── Hero.jsx                # Landing fold & key CTA buttons
│   │   ├── Projects.jsx            # Category filterable gallery
│   │   ├── Services.jsx            # Freelance & engineering capabilities
│   │   └── Skills.jsx              # Categorized tech proficiency grid
│   ├── App.jsx                 # Root layout and section composition
│   ├── index.css               # Global theme tokens, typography, and scrollbar styles
│   └── main.jsx                # React root mount point
├── .env.example                # Sample environment configuration
├── .gitignore                  # Git exclusion rules
├── index.html                  # HTML entry point with JSON-LD schema & meta tags
├── package.json                # Project dependencies and script declarations
├── postcss.config.js           # PostCSS plugin definitions
├── tailwind.config.js          # Theme customizations, colors, and keyframe animations
├── vercel.json                 # Vercel SPA routing and security header rules
└── vite.config.js              # Vite bundling, dev server port, and manual chunks setup
```

---

## 🚀 Getting Started

Follow these steps to run the frontend client locally.

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (version `18.0.0` or higher recommended)
- [npm](https://www.npmjs.com/) (version `9.0.0` or higher)

### 1. Clone the Repository

```bash
git clone https://github.com/khuswanth1/khuswanth-portfolio.git
cd khuswanth-portfolio/client
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `client` directory by copying the sample file:

```bash
cp .env.example .env
```

Set the backend API endpoint URL:

```env
# Local Django development server
VITE_API_URL=http://localhost:5000
```

> **Note:** If testing purely the frontend without the backend server running, you can leave `VITE_API_URL` empty or configure it to point to your deployed backend instance.

### 4. Start the Development Server

```bash
npm run dev
```

The Vite dev server will start and open automatically in your default browser at:
```text
http://localhost:3000/
```

---

## 🔐 Environment Variables

The frontend reads configuration through Vite's `import.meta.env` system:

| Variable | Required | Default | Description |
| :--- | :---: | :---: | :--- |
| `VITE_API_URL` | No | `""` | Base URL of the backend API (e.g. `http://localhost:5000` for local dev or `https://your-backend.onrender.com` in production). |

---

## 📜 Available Scripts

In the project directory, you can run:

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server on port `3000` with instant HMR. |
| `npm run build` | Compiles and optimizes assets into the `dist/` directory for production. |
| `npm run preview` | Locally serves the production build from `dist/` to test output fidelity. |

---

## 🔗 Backend Integration

The client seamlessly pairs with the Django backend server:

- **Endpoint:** `POST ${VITE_API_URL}/api/contact/`
- **Payload:**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "message": "Hello Khuswanth, I'd like to discuss a frontend role.",
    "website": ""
  }
  ```
- **Spam Mitigation:** The `website` field acts as a honeypot. If filled by automated bots, the submission is rejected.
- **Resilience:** The client gracefully reports validation errors received from the server (e.g., rate limits or field format issues) in an intuitive toast interface.

---

## 🌐 Deployment

### Deploying to Vercel

The project includes a production-ready [`vercel.json`](./vercel.json) configuration that handles client-side routing rewrites and cache policies:

1. Connect your repository to [Vercel](https://vercel.com/).
2. Select `client` as the **Root Directory**.
3. Choose **Vite** as the Framework Preset.
4. Add the `VITE_API_URL` environment variable pointing to your production backend.
5. Deploy!

```bash
# Or deploy directly using the Vercel CLI:
npm install -g vercel
vercel
```

---

## 👨‍💻 Author

**Khuswanth Rao Jadav**
- **Role:** Associate Software Engineer (Frontend)
- **Email:** [khuswanthraojadav@gmail.com](mailto:khuswanthraojadav@gmail.com)
- **LinkedIn:** [linkedin.com/in/khuswanth-rao-jadav](https://www.linkedin.com/in/khuswanth-rao-jadav/)
- **GitHub:** [github.com/khuswanth1](https://github.com/khuswanth1)
- **Portfolio:** [portfolio-ten-liard-91.vercel.app](https://portfolio-ten-liard-91.vercel.app/)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
