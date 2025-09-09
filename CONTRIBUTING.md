# Contributing to Bunayat

Thank you for your interest in contributing to Bunayat! This document provides guidelines and information for developers working on the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Code Style Guidelines](#code-style-guidelines)
- [Project Structure](#project-structure)
- [Internationalization Guidelines](#internationalization-guidelines)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Release Process](#release-process)

## 🤝 Code of Conduct

This project follows a professional code of conduct. Please:

- Be respectful and inclusive
- Focus on constructive feedback
- Maintain confidentiality of proprietary information
- Follow security best practices

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 20+ (with Corepack enabled)
- **pnpm**: Package manager (installed via Corepack)
- **Git**: Version control
- **VS Code**: Recommended editor with extensions

### Required VS Code Extensions

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

## 🛠️ Development Setup

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/your-username/bunayat-landing-nextjs.git
cd bunayat-landing-nextjs

# Add upstream remote
git remote add upstream https://github.com/original-owner/bunayat-landing-nextjs.git
```

### 2. Install Dependencies

```bash
# Enable Corepack (if not already enabled)
corepack enable

# Install dependencies
pnpm install
```

### 3. Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit with your configuration
# Required variables:
# VITE_PUBLIC_POSTHOG_KEY=your_posthog_key
# VITE_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

### 4. Start Development

```bash
# Start development server
pnpm dev

# In another terminal, run type checking
pnpm type-check
```

## 📝 Code Style Guidelines

### TypeScript

- Use **strict TypeScript** with explicit type annotations
- Prefer `interface` over `type` for object shapes
- Use proper generic constraints
- Handle translation arrays with type casting: `(t('key', { returnObjects: true }) as string[])`

```typescript
// ✅ Good
interface UserProps {
  name: string;
  email: string;
  isActive: boolean;
}

// ❌ Avoid
type UserProps = {
  name: string;
  email: string;
}
```

### React Components

- Use **functional components** with hooks
- Prefer **named exports** over default exports
- Use proper TypeScript interfaces for props
- Implement proper error boundaries

```typescript
// ✅ Good
interface ButtonProps {
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ variant, children, onClick }) => {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
};
```

### Styling

- Use **Tailwind CSS** classes, avoid custom CSS
- Always include **RTL support** with `rtl:space-x-reverse`
- Use semantic color tokens (primary, secondary, muted, etc.)
- Ensure proper contrast ratios for accessibility
- **Prefer `gap-4` over `space-x-4`** for more reliable RTL/LTR spacing

```tsx
// ✅ Good - RTL support with gap (preferred)
<div className="flex items-center gap-4">
  <Icon />
  <Text />
</div>

// ✅ Alternative - When space-x is needed
<div className="flex items-center space-x-4 rtl:space-x-reverse">
  <Icon />
  <Text />
</div>

// ✅ Good - Semantic colors
<button className="bg-primary text-primary-foreground hover:bg-primary/90">
  Click me
</button>
```

### File Naming

- **Components**: PascalCase (`UserProfile.tsx`)
- **Hooks**: camelCase with `use` prefix (`useUserData.ts`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Types**: PascalCase (`UserTypes.ts`)

## 🏗️ Project Structure

```
client/src/
├── components/
│   ├── forms/          # Form components
│   ├── sections/       # Page sections (hero, pricing, etc.)
│   └── ui/             # Reusable UI components
│       ├── sticky-contact-bar.tsx  # Global sticky contact component
│       └── ...other UI components
├── contexts/           # React contexts
├── hooks/              # Custom hooks
├── lib/                # Utilities and configurations
├── locales/            # Translation files (en.json, ar.json)
└── pages/              # Page components
```

### Component Organization

- **Sections**: Large page sections (hero, pricing, footer)
- **Forms**: Form-specific components with validation
- **UI**: Reusable, generic components
- **Pages**: Top-level page components

## 🌍 Internationalization Guidelines

### Translation Files

- **English**: `client/src/locales/en.json`
- **Arabic**: `client/src/locales/ar.json`
- Keep both files synchronized
- Use descriptive keys with dot notation

```json
// ✅ Good structure
{
  "hero": {
    "title": "Modern Property Management",
    "subtitle": "Designed for Oman",
    "cta": "Get Started"
  }
}
```

### RTL Support

- Always add `rtl:space-x-reverse` to flex containers
- Use `dir="ltr"` for phone numbers and technical values
- Position icons correctly with `rtl:mr-0 rtl:ml-2`

```tsx
// ✅ Good - RTL spacing
<div className="flex items-center space-x-4 rtl:space-x-reverse">
  <Icon />
  <Text />
</div>

// ✅ Good - LTR for phone numbers
<a href="tel:+96891155004" dir="ltr">+968 9115 5004</a>
```

### Translation Usage

```typescript
// ✅ Good - Type casting for arrays
const items = (t('section.items', { returnObjects: true }) as string[]);

// ✅ Good - Proper key structure
const title = t('hero.title');
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run type checking
pnpm type-check

# Run linting
pnpm lint
```

### Test Guidelines

- Write tests for utility functions
- Test component rendering
- Test form validation
- Test translation switching
- Test RTL layout

## 📤 Pull Request Process

### 1. Create a Branch

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Or bugfix branch
git checkout -b bugfix/issue-description
```

### 2. Make Changes

- Follow code style guidelines
- Add tests if applicable
- Update translations if needed
- Test in both English and Arabic

### 3. Commit Changes

```bash
# Use conventional commits
git commit -m "feat: add new pricing section"
git commit -m "fix: resolve RTL layout issue"
git commit -m "docs: update README with new features"
```

### 4. Push and Create PR

```bash
# Push your branch
git push origin feature/your-feature-name

# Create pull request on GitHub
```

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested in English
- [ ] Tested in Arabic
- [ ] Tested on mobile
- [ ] Tested on desktop

## Screenshots
(if applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Translations updated
- [ ] RTL support verified
```

## 🐛 Issue Reporting

### Bug Reports

Use the bug report template:

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g. macOS, Windows]
- Browser: [e.g. Chrome, Safari]
- Language: [e.g. English, Arabic]
```

### Feature Requests

```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Any alternative solutions or features you've considered.

**Additional context**
Add any other context about the feature request here.
```

## 🚀 Release Process

### Version Bumping

- **Patch**: Bug fixes (`1.0.1`)
- **Minor**: New features (`1.1.0`)
- **Major**: Breaking changes (`2.0.0`)

### Release Checklist

- [ ] All tests passing
- [ ] Documentation updated
- [ ] Translations verified
- [ ] RTL layout tested
- [ ] Performance tested
- [ ] Security review completed

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React i18next](https://react.i18next.com/)
- [PostHog Documentation](https://posthog.com/docs)

## ❓ Questions?

- **Technical Issues**: Create an issue on GitHub
- **General Questions**: Contact the development team
- **Security Concerns**: Email <security@bunanyat.com>

---

Thank you for contributing to Bunayat! 🎉
