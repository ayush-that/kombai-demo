# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Production build with Turbopack
npm run start        # Start production server

# Package management (uses pnpm-lock.yaml)
pnpm install         # Install dependencies
```

## Technology Stack

- **Next.js 15.5.4** with App Router and Turbopack
- **React 19.2.0** with TypeScript 5
- **Tailwind CSS v4** for styling
- **GSAP 3.12.5** for professional animations
- **Three.js ecosystem** (`@react-three/fiber`, `@react-three/drei`) for 3D graphics

## Architecture Overview

### Core Components Structure

- **`components/hero-section/neural-network-hero.tsx`** - Main reusable hero component with GSAP animations
- **`components/hero-section/ShaderScene.tsx`** - Three.js shader background with animated patterns

### Key Architectural Patterns

1. **Dynamic 3D Loading**: Three.js components use `dynamic()` imports to prevent SSR issues
2. **GSAP Integration**: Uses `useGSAP` hook for proper animation cleanup and `SplitText` plugin for advanced text animations
3. **Client-Side 3D**: All 3D graphics are client-side only with `"use client"` directive
4. **Component-Based Design**: Highly configurable hero component with props for customization

### Shader System

The `ShaderScene.tsx` implements GLSL fragment shaders with:

- Multiple wave layers creating organic, fluid motion
- CPPN-inspired color generation patterns
- Orange-themed color palette
- Real-time animation using `useFrame` hook

### Animation Features

- Text splitting and staggered reveal animations
- Blur transitions and smooth effects
- Font loading detection before animation start
- Responsive design with Tailwind breakpoints

## File Structure

```
app/                          # Next.js App Router
├── layout.tsx               # Root layout with Geist font
├── page.tsx                 # Home page
├── globals.css              # Global Tailwind styles
└── hero-section/
    └── page.tsx             # Hero section demo

components/
└── hero-section/
    ├── neural-network-hero.tsx  # Main hero component
    └── ShaderScene.tsx         # Three.js background
```

## Development Notes

- Uses **pnpm** as package manager (evident from pnpm-lock.yaml)
- **Turbopack** is enabled for both dev and build scripts in Next.js 15
- TypeScript paths: `@/*` maps to root directory
- All 3D/animation components must be client-side due to GSAP and Three.js requirements
- Shader uniforms are controlled via React state for performance

## Configuration Files

- `next.config.ts` - Minimal Next.js config with Turbopack
- `tsconfig.json` - Strict TypeScript with ES2017 target
- `postcss.config.mjs` - PostCSS for Tailwind CSS v4
