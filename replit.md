# replit.md

## Overview

This is a modern property management SaaS landing page for **Bunayat**, targeting landlords and property managers in Oman. The application is built as a full-stack web application with a React frontend and Express backend, featuring bilingual Arabic/English support and local market integrations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React 18** with TypeScript for type safety and modern component development
- **Vite** as the build tool for fast development and optimized production builds
- **Wouter** for client-side routing instead of React Router
- **TanStack Query** for server state management and API caching
- **React Hook Form + Zod** for form validation and type-safe data handling
- **Tailwind CSS** with shadcn/ui component library for consistent styling
- Component-based architecture with reusable UI components organized in `/client/src/components/ui/`

### Backend Architecture
- **Express.js** server with TypeScript
- **RESTful API** design with structured error handling middleware
- **Zod schemas** for request validation and type safety
- **In-memory storage** implementation with interface-based design for easy database migration
- **Vite middleware integration** for development server with HMR support

### Database Strategy
- **Drizzle ORM** configured with PostgreSQL dialect
- **Schema-first approach** with shared type definitions between frontend and backend
- **Migration support** through drizzle-kit for database versioning
- Current implementation uses in-memory storage with interface that can be easily swapped for database persistence

### Styling and Design System
- **Tailwind CSS** with custom color palette and design tokens
- **CSS custom properties** for theming support
- **shadcn/ui** component library with "new-york" style configuration
- **Mobile-first responsive design** with breakpoint considerations
- **Inter font family** for consistent typography
- **Custom animations** and transitions for enhanced user experience

### Form Handling and Validation
- **React Hook Form** for performant form management
- **Zod schemas** for runtime validation and TypeScript type inference
- **Shared validation schemas** between frontend and backend for consistency
- **Toast notifications** for user feedback on form submissions

### Development and Build Process
- **TypeScript configuration** with strict mode enabled
- **ESM modules** throughout the application
- **Path aliases** for clean import statements (@/, @shared/)
- **Development server** with hot reload and error overlay
- **Production build** generates optimized static assets and server bundle

## External Dependencies

### UI and Styling
- **@radix-ui/** - Comprehensive set of unstyled, accessible UI primitives
- **lucide-react** - Icon library for consistent iconography
- **tailwindcss** - Utility-first CSS framework
- **class-variance-authority** - TypeScript-first variant API for components
- **clsx** and **tailwind-merge** - Utility functions for conditional classes

### Database and ORM
- **@neondatabase/serverless** - Serverless PostgreSQL client
- **drizzle-orm** - Type-safe ORM with excellent TypeScript support
- **drizzle-zod** - Integration between Drizzle and Zod for schema validation

### State Management and API
- **@tanstack/react-query** - Server state management and caching
- **@hookform/resolvers** - Validation resolvers for React Hook Form

### Development Tools
- **@replit/** plugins - Development environment integration
- **esbuild** - Fast JavaScript bundler for production builds
- **tsx** - TypeScript execution environment for development server

### Potential Future Integrations
- **Stripe/PayPal** - Payment processing for subscription management
- **WhatsApp Business API** - Direct integration for tenant communication
- **Twilio** - SMS notifications for rent reminders and updates
- **SendGrid/Mailgun** - Email service for automated communications
- **Calendly** - Demo scheduling integration
- **Google Analytics** - User behavior tracking and conversion analysis