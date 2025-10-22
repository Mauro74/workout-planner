# Workout Planner App

A modern, responsive workout planner built with React, TypeScript, and Vite. Features calendar-based workout scheduling with Supabase database integration.

## Features

- 📅 **Calendar View**: Select dates and assign workouts
- 🏋️ **Workout Management**: Create and customize exercise routines
- 📱 **Mobile Responsive**: Optimized for iPhone and mobile devices
- 🗓️ **Monthly Schedule**: View and manage monthly workout plans
- ☁️ **Cloud Sync**: Supabase database integration with localStorage fallback
- 🔄 **Auto Migration**: Seamlessly migrates from localStorage to cloud database

## Quick Start

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Set up Supabase** (optional - app works with localStorage if not configured):

   - Follow the detailed setup guide in `SUPABASE_SETUP.md`
   - Copy `.env.example` to `.env.local` and add your Supabase credentials

3. **Start development server**:

   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## Database Integration

The app supports both **Supabase** (cloud) and **localStorage** (local) persistence:

- **With Supabase**: Full cloud sync, cross-device access, automatic backups
- **Without Supabase**: Local storage only, works offline

See `SUPABASE_SETUP.md` for detailed database setup instructions.

## Tech Stack

- **React 19** with TypeScript
- **Vite 7** for build tooling
- **Styled-components** for CSS-in-JS
- **Supabase** for database (optional)
- **React Icons** for UI icons
