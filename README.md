# Moshood Portfolio

A modern personal portfolio and profile website for Moshood Shoyombo, built with React, TypeScript, Vite, and Tailwind CSS. The app showcases a professional bio, skills, projects, teaching experience, certifications, recognitions, and contact details, with an interactive portfolio assistant included.

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
├── public/
├── src/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── integrations/
│   ├── pages/
│   ├── App.tsx
│   └── main.tsx
├── .env
├── .gitignore
├── components.json
├── eslint.config.js
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
└── README.md
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

This repository is primarily built with TypeScript (approximately 98% of the codebase), with supporting CSS styling and a small amount of other assets. It reflects a modern, maintainable frontend portfolio implementation for a data science, AI, and research-focused profile.
