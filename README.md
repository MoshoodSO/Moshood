# Moshood Portfolio

A modern personal portfolio and profile website for Moshood Shoyombo, built with React, TypeScript, Vite, and Tailwind CSS. The app showcases a professional bio, skills, projects, teaching experience, recognitions, and contact details.

## Overview

This repository contains a polished personal portfolio website designed to present:

- professional background and expertise
- technical skills and research interests
- featured projects and open-source work
- academic and industry recognitions
- teaching and mentorship experience
- certificates and achievement highlights
- contact and networking information

The site is structured as a single-page portfolio experience with dedicated sections and a clean, responsive UI.

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Radix UI
- React Router
- Supabase
- TanStack Query
- Framer Motion
- Vitest
- ESLint

## Features

- Responsive portfolio homepage
- Skills and expertise sections
- Projects showcase with stack details and links
- Recognitions and awards timeline
- Teaching and mentorship section
- Certificates and credentials overview
- Contact section with direct links
- Admin profile management backed by Supabase
- Portfolio assistant UI for interactive guidance
- Dark/light theme support

## Project Structure

```bash
.
├── .github/
│   └── workflows/
│       └── jekyll-gh-pages.yml
├── .lovable/
│   └── mcp/
│       └── manifest.json
├── public/
│   ├── favicon.ico
│   ├── favicon.png
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── assets/
│   │   ├── MoshLogo.png
│   │   └── moshood-profile.jpg
│   ├── components/
│   │   ├── ai-elements/
│   │   │   ├── conversation.tsx
│   │   │   ├── loader.tsx
│   │   │   ├── message.tsx
│   │   │   └── prompt-input.tsx
│   │   ├── ui/
│   │   │   ├── accordion.tsx
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── alert.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── navigation-menu.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── textarea.tsx
│   │   │   └── ...
│   │   ├── ContactSection.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ImageUpload.tsx
│   │   ├── NavLink.tsx
│   │   ├── Navbar.tsx
│   │   ├── PageBanner.tsx
│   │   ├── PortfolioAssistant.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── RecognitionsSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── TeachingSection.tsx
│   │   ├── ThemeProvider.tsx
│   │   └── ThemeToggle.tsx
│   ├── data/
│   │   └── profileData.ts
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   ├── use-toast.ts
│   │   └── useProfileData.ts
│   ├── integrations/
│   │   └── supabase/
│   │       ├── client.ts
│   │       ├── previewAuthStorage.ts
│   │       └── types.ts
│   ├── lib/
│   │   ├── mcp/
│   │   │   ├── index.ts
│   │   │   └── tools/
│   │   │       ├── get-contact.ts
│   │   │       ├── get-profile.ts
│   │   │       ├── list-certificates.ts
│   │   │       └── list-projects.ts
│   │   └── utils.ts
│   ├── pages/
│   │   ├── Admin.tsx
│   │   ├── CertificatesPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── Index.tsx
│   │   ├── Login.tsx
│   │   ├── NotFound.tsx
│   │   ├── ProjectsPage.tsx
│   │   ├── RecognitionsPage.tsx
│   │   ├── Signup.tsx
│   │   ├── SkillsPage.tsx
│   │   └── TeachingPage.tsx
│   ├── test/
│   │   ├── example.test.ts
│   │   └── setup.ts
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── supabase/
│   ├── config.toml
│   ├── functions/
│   │   ├── mcp/
│   │   │   └── index.ts
│   │   └── portfolio-chat/
│   │       └── index.ts
│   └── migrations/
│       ├── 20260224222459_c7100105-a1e6-4d1d-98c3-dfa441d11d91.sql
│       └── 20260324131941_09e6c30c-a071-40f0-b415-9cc154928f84.sql
├── .env
├── .gitignore
├── bun.lock
├── components.json
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vercel.json
├── vite.config.ts
├── vitest.config.ts
├── README.md
└── .npmrc (if present in your local setup)
```

## Prerequisites

Before running the project locally, make sure you have:

- Node.js 18+
- npm or bun

## Installation

Clone the repository:

```bash
git clone https://github.com/MoshoodSO/Moshood.git
cd Moshood
```

Install dependencies:

```bash
npm install
```

If your environment uses Bun instead:

```bash
bun install
```

## Environment Setup

This project may rely on a Supabase client configuration through environment variables. Ensure your local environment includes the required values in a `.env` file if applicable.

Example:

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Running the App

Start the development server:

```bash
npm run dev
```

Then open the local Vite URL shown in the terminal (usually `http://localhost:5173`).

## Production Build

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Testing

Run the test suite:

```bash
npm test
```

## Linting

```bash
npm run lint
```

## Deployment

The project is configured for modern frontend deployment and includes Vercel settings. You can deploy it to Vercel or any static hosting platform that supports Vite applications.

## License

This project is intended for personal portfolio use and is distributed under the repository's applicable license terms.

## Contact

- GitHub: https://github.com/MoshoodSO
- LinkedIn: https://www.linkedin.com/in/shoyombo-moshood-582003126
- Personal site: https://moshoodso.vercel.app/
- Email: shoyombomoshood1@gmail.com

## Notes

This repository is primarily built with TypeScript (approximately 98% of the codebase), with supporting CSS styling and a small amount of other assets. It reflects a modern, maintainable frontend portfolio architecture for a personal brand website.
