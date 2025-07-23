# Sorting Algorithm Visualizer

## Overview

This is a full-stack sorting algorithm visualizer built with React (TypeScript) and Express.js. The application provides an interactive educational tool for visualizing different sorting algorithms, allowing users to observe how various sorting techniques work step-by-step.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with clear separation between client and server components:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: React hooks with TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **Session Management**: PostgreSQL-based sessions with connect-pg-simple
- **Development**: Hot reload with Vite integration

## Key Components

### Visualization Engine
- **BarChart Component**: Renders animated bars representing array elements with different states (comparing, swapping, sorted)
- **Sorting Algorithms**: Implements bubble sort, selection sort, insertion sort, quick sort, and merge sort
- **Animation Controller**: Custom hook (`useSorting`) manages sorting steps, timing, and statistics

### User Interface
- **Control Panel**: Algorithm selection, array size control, animation speed adjustment
- **Statistics Panel**: Real-time tracking of comparisons, array accesses, and progress
- **Responsive Design**: Mobile-friendly layout with adaptive components

### Data Management
- **In-Memory Storage**: Basic user management with extensible storage interface
- **Database Schema**: User table with prepared Drizzle migrations
- **Type Safety**: Zod schemas for runtime validation

## Data Flow

### Latest Updates (January 2025)
- **Java-Style Algorithms**: Converted all sorting algorithms to use Java programming patterns with explicit type declarations, manual swapping, and traditional loop structures
- **Dark Mode Implementation**: Added comprehensive dark/light theme toggle with localStorage persistence and system preference detection
- **Export Functionality**: Added export dialog allowing users to download array data (JSON/CSV), Java source code, and analysis reports

### Core Data Flow
1. **User Interaction**: Control panel updates trigger state changes in the sorting hook
2. **Algorithm Execution**: Selected sorting algorithm generates step-by-step instructions using Java-style implementations
3. **Animation Loop**: Timer-controlled execution of sorting steps with configurable speed
4. **Visual Updates**: Bar chart reflects current array state with color-coded element states
5. **Export Capabilities**: Users can export current state, algorithm code, or comprehensive reports

## External Dependencies

### Core Libraries
- **@tanstack/react-query**: Server state management and caching
- **drizzle-orm**: Type-safe database operations
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **wouter**: Minimal client-side routing

### UI Components
- **@radix-ui/***: Accessible UI primitives for complex components
- **lucide-react**: Icon library
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant handling

### Development Tools
- **vite**: Fast build tool and dev server
- **typescript**: Static type checking
- **esbuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Development Environment
- **Vite Dev Server**: Hot module replacement and fast rebuilds
- **Concurrent Processes**: Frontend and backend run simultaneously
- **Database Migrations**: Drizzle Kit handles schema changes

### Production Build
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Environment Variables**: DATABASE_URL required for PostgreSQL connection
- **Process Management**: Single Node.js process serves both API and static files

### Database Configuration
- **Development**: Local or cloud PostgreSQL via DATABASE_URL
- **Migrations**: Automated schema deployment with `drizzle-kit push`
- **Connection Pooling**: Neon serverless handles connection management

The architecture prioritizes educational value through smooth animations, real-time feedback, and comprehensive algorithm coverage while maintaining clean separation of concerns and type safety throughout the stack.