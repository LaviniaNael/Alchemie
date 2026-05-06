# Alchemie Nº 7

An immersive, luxury e-commerce experience for Alchemie Nº 7, a premium fragrance brand. This application features high-performance 3D product visualizations, smooth scroll-driven animations, and a highly polished user interface designed to evoke warmth, sophistication, and luminous luxury.

## Features

- **Immersive 3D Experience:** WebGL-powered 3D product showcases using React Three Fiber.
- **Scroll-Driven Animations:** Silky smooth scrolling and dynamic timeline animations powered by GSAP and Lenis.
- **Premium UI/UX:** A meticulously crafted interface using Tailwind CSS and Radix UI components, featuring a warm rose-gold, ivory, and champagne color palette.
- **Dynamic Routing:** Seamless multi-page transitions with React Router.
- **Responsive Design:** A fully responsive layout that provides a flawless experience across all devices.

## Technology Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS + Radix UI Primitives
- **Animations:** GSAP + Framer Motion + Lenis (Smooth Scroll)
- **3D Graphics:** Three.js + React Three Fiber + Drei
- **Routing:** React Router v7
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, or pnpm

### Installation

1. Clone the repository (if applicable)
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

- `src/components/` - Reusable UI components (navigation, typography, etc.)
- `src/sections/` - Major page sections (Hero, Formulation, etc.)
- `src/lib/` - Utility functions and helpers
- `src/App.tsx` - Main application entry point and routing

## Scripts

- `npm run dev` - Starts the Vite development server.
- `npm run build` - Builds the application for production.
- `npm run lint` - Runs ESLint to check for code quality.
- `npm run preview` - Previews the production build locally.
