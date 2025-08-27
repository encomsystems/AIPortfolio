# AI Portfolio Application

## Overview

This is a full-stack AI portfolio website showcasing AI automation services and solutions. The application features a modern, responsive design with dark theme styling, contact form functionality, and comprehensive service showcases. Built as a single-page application with a RESTful API backend, it demonstrates AI expertise through an interactive portfolio presentation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Shadcn/ui component library with Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom dark theme configuration and CSS variables
- **State Management**: TanStack Query for server state management
- **Forms**: React Hook Form with Zod validation schemas

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with JSON endpoints
- **Request Handling**: Express middleware for JSON parsing, URL encoding, and request logging
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Development**: Hot reload with Vite integration in development mode

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM configured for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Connection**: Neon Database serverless PostgreSQL integration
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development
- **Session Management**: PostgreSQL session store with connect-pg-simple

### Authentication and Authorization
- **Session Management**: Server-side session handling with PostgreSQL session store
- **User Schema**: Basic user table with username/password authentication prepared
- **Storage Abstraction**: Interface-based user management system ready for implementation

### Component Architecture
- **Design System**: Comprehensive UI component library with consistent theming
- **Layout**: Responsive grid-based layouts with mobile-first approach
- **Navigation**: Smooth scrolling single-page navigation with scroll-triggered styling
- **Forms**: Validated contact forms with toast notifications for user feedback
- **Animations**: CSS animations and transitions for enhanced user experience

### API Structure
- **Contact Endpoint**: POST /api/contact for form submissions with validation
- **Request Logging**: Comprehensive request/response logging with performance metrics
- **Error Handling**: Structured error responses with appropriate HTTP status codes
- **Validation**: Server-side input validation with email format checking

### Build and Development
- **Build System**: Vite for frontend bundling with esbuild for server compilation
- **Development**: Integrated development server with hot module replacement
- **TypeScript**: Strict type checking across frontend, backend, and shared modules
- **Code Organization**: Monorepo structure with shared schemas and clear separation of concerns

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL database hosting
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL dialect
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### UI and Styling
- **Shadcn/ui**: Pre-built component library with Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Radix UI**: Accessible component primitives for complex UI patterns
- **Lucide React**: Icon library for consistent iconography

### Development Tools
- **Vite**: Modern build tool with TypeScript support and React plugins
- **TanStack Query**: Powerful data fetching and caching library
- **React Hook Form**: Performant forms library with validation support
- **Zod**: TypeScript-first schema validation library

### Fonts and Assets
- **Google Fonts**: Inter font family for typography
- **Custom CSS Variables**: Design token system for consistent theming
- **Responsive Images**: Optimized asset delivery

### Third-Party Integrations
- **Replit Integration**: Development environment optimization with banner and error handling
- **Date Handling**: date-fns library for date manipulation and formatting
- **Class Management**: clsx and tailwind-merge for conditional styling