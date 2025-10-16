# 🛒 Discord E-Commerce Store

> Modern e-commerce application with Discord-themed design, built with React 19, TypeScript, and Vite.

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1.10-646CFF?style=flat&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

## 🎯 Overview

A comprehensive e-commerce platform inspired by Discord's design language, featuring a modern React architecture with TypeScript, responsive design, and optimized performance. Built with clean code principles and scalable architecture.

## ✨ Features

### 🎨 **UI/UX**
- **Discord-themed design** with authentic color palette
- **Fully responsive** layout for desktop, tablet, and mobile
- **Smooth animations** and hover interactions
- **Infinite carousel** with auto-play functionality
- **Interactive dropdowns** without timing delays

### 🛍️ **E-Commerce Functionality**
- **Product showcase** with dual variants (cards/featured)
- **Collections grid** with 8 different categories
- **Dynamic navigation** with search and filters
- **Shopping cart** integration ready
- **User profile** dropdown with account management

### 🏗️ **Architecture**
- **Modular component** structure with TypeScript
- **Custom hooks** for state management
- **Centralized data** configuration
- **Type-safe** development experience
- **Optimized bundle** with tree-shaking

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/daniferrari1994/e-commerce.git
cd e-commerce

# Install dependencies
npm install
# or
pnpm install

# Start development server
npm run dev
# or
pnpm dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Nav/             # Navigation components
│   ├── Carousel/        # Image carousel
│   ├── ProductShowcase/ # Product display
│   ├── CollectionsGrid/ # Collections layout
│   ├── Footer/          # Footer component
│   └── ...
├── types/               # TypeScript type definitions
├── data/                # Static data and configuration
│   ├── countries.ts     # Countries and currencies
│   ├── navigation.ts    # Menu and navigation data
│   ├── products.ts      # Product and collection data
│   └── index.ts         # Centralized exports
├── hooks/               # Custom React hooks
│   └── useAppHandlers.ts # Application event handlers
├── constants.ts         # App constants and configuration
└── App.tsx             # Main application component
```

## 🛠️ Built With

### Core Technologies
- **[React 19.1.1](https://react.dev/)** - UI library with latest features
- **[TypeScript 5.9.3](https://www.typescriptlang.org/)** - Type-safe development
- **[Vite 7.1.10](https://vite.dev/)** - Fast build tool and dev server

### Development Tools
- **ESLint** - Code linting and formatting
- **CSS Modules** - Component-scoped styling
- **React Hooks** - Modern state management

## 🎨 Design System

### Color Palette
- **Primary**: `#5865F2` (Discord Blurple)
- **Primary Hover**: `#4752C4`
- **Dark**: `#36393F`
- **Text Light**: `#B9BBBE`
- **Background**: `#000000`

### Responsive Breakpoints
- **Mobile**: 480px
- **Tablet**: 768px
- **Desktop**: 1024px
- **Large Desktop**: 1200px

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## 📦 Key Components

### Navigation System
- **Nav**: Primary navigation with search, country selector, and cart
- **SecondaryNav**: Category navigation with smooth dropdowns

### Product Display
- **Carousel**: Infinite scroll image carousel with overlays
- **ProductShowcase**: Unified component for product cards and featured items
- **CollectionsGrid**: Responsive grid layout for collections

### Infrastructure
- **Custom Hooks**: Centralized event handling with `useAppHandlers`
- **Type System**: Comprehensive TypeScript interfaces
- **Data Management**: Organized static data with easy configuration

## 🚀 Performance Optimizations

- ⚡ **Tree-shaking** optimized imports
- 🔄 **Memoized callbacks** to prevent unnecessary re-renders
- 📦 **Code splitting** ready architecture
- 🎯 **Type-safe** development reducing runtime errors
- 📱 **Responsive images** with optimized sizes

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Dani Ferrari**
- GitHub: [@daniferrari1994](https://github.com/daniferrari1994)

## 🙏 Acknowledgments

- Discord for design inspiration
- React team for the amazing framework
- Vite team for the fast build tool
- TypeScript team for type safety

---

<div align="center">
  <p>Built with ❤️ and ☕ by Dani Ferrari</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
