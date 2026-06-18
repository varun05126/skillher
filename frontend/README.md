# SkillHer Frontend

This is the frontend for the SkillHer project, built with React 19, TypeScript, Vite, and Tailwind CSS.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Then set the `VITE_API_URL` to point to your backend (e.g., `http://localhost:8000/api`).

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Features

- Authentication (login, registration, JWT)
- Profile management
- Skill assessment
- Skill recommendations
- Responsive design with glassmorphism
- Modern UI with gradients and animations