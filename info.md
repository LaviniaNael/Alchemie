Using Node.js 20, Tailwind CSS v3.4.19, Vite v7.2.4, and React 19.

Project: Alchemie Nº 7 - Luxury Perfume E-commerce Experience

Core Technologies:
  - React Three Fiber & Drei for 3D visualizations
  - GSAP & Framer Motion for scroll-driven animations
  - Lenis for smooth scrolling
  - Tailwind CSS + Radix UI for the user interface
  - React Router v7 for dynamic routing

Custom UI Components:
  CursorGlow, CustomCursor, FluidBackground, GlassBottles, Marquee,
  Navbar, NoiseOverlay, ParticleConstellation, Preloader

Base UI Components (shadcn/Radix):
  accordion, alert-dialog, avatar, button, card, carousel, dialog,
  dropdown-menu, hover-card, input, label, menubar, navigation-menu,
  popover, scroll-area, select, separator, sheet, sidebar, slider,
  tabs, textarea, tooltip

Usage Example:
  import { GlassBottles } from '@/components/GlassBottles'
  import { Button } from '@/components/ui/button'
  import { Preloader } from '@/components/Preloader'

Project Structure:
  src/assets/          Static assets and images
  src/components/      Custom application components
  src/components/ui/   Base UI components (shadcn)
  src/contexts/        React context providers
  src/hooks/           Custom React hooks
  src/lib/             Utility functions
  src/sections/        Major page sections (Hero, Formulation, etc.)
  src/App.tsx          Main application entry and routing
  src/index.css        Global styles and Tailwind directives
  vite.config.ts       Vite build configuration
  tailwind.config.js   Tailwind theme and plugins