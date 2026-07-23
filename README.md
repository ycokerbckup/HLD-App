# DisplayOS - HICC Lekki Display Team Portal

A modern, premium internal web application for the HICC Lekki Display Team. Replaces direct Google Sheets interaction with an elegant, user-friendly interface.

## Overview

DisplayOS is built with:
- **Next.js 15** with App Router
- **React 19** and TypeScript
- **TailwindCSS** for styling
- **shadcn/ui** component library
- **Framer Motion** for animations
- **Google Sheets API** as the database
- **NextAuth** for authentication

## Getting Started

### Prerequisites
- Node.js 18+ or later
- npm or yarn
- Google OAuth credentials
- Google Sheets API key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ycokerbckup/HLD-App.git
cd HLD-App
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env.local
```
Edit `.env.local` with your credentials:
- Google OAuth credentials
- Google Sheets IDs
- NextAuth secret

4. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/              # Next.js App Router
├── components/       # Reusable UI components
├── features/         # Feature-first modules
│   ├── auth/
│   ├── dashboard/
│   ├── members/
│   ├── announcements/
│   ├── schedule/
│   ├── training/
│   ├── reports/
│   └── feedback/
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── services/        # Google Sheets services
├── types/           # TypeScript types
└── styles/          # Global styles
```

## Features

- 🔐 **Google OAuth Authentication**
- 📊 **Interactive Dashboard**
- 👥 **Member Directory**
- 📢 **Announcements Feed**
- 📅 **Duty Schedule**
- 🎓 **Training Progress Tracking**
- 📋 **Technical Reports**
- 💬 **Feedback System**
- 📚 **Resources Library**
- ⚙️ **Admin Panel**
- 🎨 **Dark/Light Mode**
- ✨ **Smooth Animations**
- 📱 **Fully Responsive**

## Development

### Build
```bash
npm run build
```

### Type Check
```bash
npm run type-check
```

### Lint
```bash
npm run lint
```

### Format Code
```bash
npm run format
```

## Deployment

Deploy to Vercel for optimal Next.js performance:

```bash
vercel deploy
```

## Architecture Principles

- **Server Components First**: Maximize server rendering, minimize client bundle
- **Feature-First Organization**: Keep related logic and UI together
- **Strict TypeScript**: No `any` types, full type safety
- **Reusable Components**: Build once, use everywhere
- **Clean Separation**: Services layer between data and UI
- **Production Ready**: Always ship tested, polished code

## Security

- Environment variables for sensitive data
- OAuth 2.0 authentication
- CSRF protection via NextAuth
- Secure headers configuration
- Type-safe API routes

## Performance

- Server-side rendering (SSR)
- Static generation where applicable
- Image optimization
- Code splitting
- Caching strategies

## Contributing

1. Create a feature branch
2. Commit changes
3. Push to GitHub
4. Create a Pull Request

## License

Copyright © 2024 HICC Lekki Display Team. All rights reserved.

## Support

For issues or questions, contact the Display Team Lead.
