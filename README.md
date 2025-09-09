# Bunayat - Property Management Platform

<div align="center">
  <img src="https://img.shields.io/badge/React-18-blue" alt="React 18" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue" alt="TypeScript 5.0" />
  <img src="https://img.shields.io/badge/Vite-5.0-purple" alt="Vite 5.0" />
  <img src="https://img.shields.io/badge/Tailwind-3.0-cyan" alt="Tailwind CSS 3.0" />
  <img src="https://img.shields.io/badge/i18n-React_i18next-green" alt="React i18next" />
</div>

## 🌟 Overview

Bunayat is a modern, bilingual property management platform designed specifically for the Omani market. Our landing page showcases the platform's capabilities with full Arabic and English support, local integrations, and a mobile-first responsive design.

## ✨ Features

- **🌐 Bilingual Support**: Full Arabic and English language support with RTL layout
- **📱 Mobile-First**: Responsive design optimized for all devices
- **🎨 Modern UI**: Built with Tailwind CSS and Radix UI components
- **⚡ Performance**: Optimized with Vite and React 18
- **📊 Analytics**: Integrated PostHog for user behavior tracking
- **🔒 Privacy**: GDPR compliant with proper data handling
- **🎯 A/B Testing**: Built-in feature flag support for optimization
- **📧 Contact Forms**: Demo request forms with validation
- **💬 Sticky Contact**: Global floating contact bar for better conversion
- **🎨 Glass Morphism**: Modern UI effects with backdrop blur
- **🚀 SEO Optimized**: Meta tags, structured data, and performance optimization

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS with RTL support
- **UI Components**: Radix UI primitives
- **Internationalization**: react-i18next
- **State Management**: React Query
- **Forms**: React Hook Form with Zod validation
- **Analytics**: PostHog
- **Package Manager**: pnpm

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ (with Corepack enabled)
- pnpm (installed via Corepack)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd bunayat-landing-nextjs
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your configuration:

   ```env
   VITE_PUBLIC_POSTHOG_KEY=your_posthog_key
   VITE_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
   ```

4. **Start development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
bunayat-landing-nextjs/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── forms/      # Form components
│   │   │   ├── sections/   # Page sections
│   │   │   └── ui/         # Base UI components
│   │   │       └── sticky-contact-bar.tsx  # Global contact bar
│   │   ├── contexts/       # React contexts
│   │   ├── hooks/          # Custom hooks
│   │   ├── lib/            # Utilities and configurations
│   │   ├── locales/        # Translation files
│   │   └── pages/          # Page components
│   └── index.html          # HTML template
├── api/                    # API routes
├── server/                 # Server-side code
├── shared/                 # Shared schemas and types
└── dist/                   # Build output
```

## 🌍 Internationalization

The project supports both Arabic and English with automatic RTL layout switching:

- **English**: Default language with LTR layout
- **Arabic**: Full RTL support with proper text alignment
- **Translation Files**: Located in `client/src/locales/`
- **Language Switching**: Automatic detection and manual switching

## 🎨 Styling Guidelines

- **Tailwind CSS**: Utility-first CSS framework
- **RTL Support**: All components support right-to-left layouts
- **Responsive Design**: Mobile-first approach
- **Color System**: Semantic color tokens for consistency
- **Typography**: Inter (English) and Noto Sans Arabic fonts

## 📊 Analytics & Tracking

- **PostHog Integration**: User behavior tracking and analytics
- **A/B Testing**: Feature flag support for experimentation
- **Performance Monitoring**: Core Web Vitals tracking
- **Privacy Compliant**: GDPR-compliant data collection

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

1. **Build the project**

   ```bash
   pnpm build
   ```

2. **Serve the built files**

   ```bash
   pnpm preview
   ```

## 🔧 Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript type checking

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Airbnb configuration
- **Prettier**: Code formatting
- **Husky**: Pre-commit hooks

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

This project is currently restricted to team members only. For internal contributors, please refer to our internal documentation for contribution guidelines.

## 📄 License

This project is proprietary and confidential. All rights reserved.

## 📞 Contact

- **Website**: [bunanyat.com](https://bunanyat.com)
- **Email**: <moh.anghabo@gmail.com>
- **Phone**: +968 9115 5004

## 🎯 Roadmap

- [ ] Multi-language support expansion
- [ ] Advanced analytics dashboard
- [ ] Performance optimization
- [ ] Accessibility improvements
- [ ] Mobile app integration

---

<div align="center">
  <p>Built with ❤️ for the Omani property management market</p>
  <p>© 2025 Bunayat. All rights reserved.</p>
</div>
