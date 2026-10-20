# The Wild Oasis

<p align="center">
  <img src="src/data/img/logo-light.png" alt="The Wild Oasis logo" width="260" />
</p>

The Wild Oasis is a responsive hotel-management dashboard for staff. It brings bookings, cabins, guest check-ins, business insights, user accounts, and hotel settings together in one protected application.

## Preview

The application opens on a protected dashboard and redirects unauthenticated visitors to the login page. Once signed in, staff can review recent performance, manage bookings and cabins, complete guest check-ins and check-outs, and update operational settings.

**[View the live application](https://the-wild-oasis-pi-blue.vercel.app)**

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [How I built it](#how-i-built-it)
- [What I learned](#what-i-learned)
- [Challenges](#challenges)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Deployment](#deployment)

## Features

- **Secure authentication** — email and password login, protected routes, logout, and persistent Supabase sessions.
- **Dashboard insights** — recent bookings, sales, check-ins, occupancy rate, today's activity, sales trends, and stay-duration charts.
- **Booking management** — browse, filter, sort, paginate, inspect, and delete reservations.
- **Guest operations** — check guests in or out, confirm payment, and add breakfast during check-in.
- **Cabin management** — create, edit, delete, filter, and sort cabins, including image uploads.
- **User management** — create staff accounts without replacing the currently authenticated session.
- **Account settings** — update a user's name, avatar, and password.
- **Hotel settings** — configure booking-length limits, maximum guests, and breakfast pricing.
- **Responsive interface** — collapsible navigation and layouts designed for mobile, tablet, and desktop screens.
- **Light and dark themes** — theme-aware components, charts, and persisted appearance preferences.
- **Friendly feedback** — loading states, validation messages, error boundaries, confirmation dialogs, and toast notifications.

## Tech stack

| Category | Technologies |
| --- | --- |
| Frontend | React 19, TypeScript, Vite |
| Styling | Tailwind CSS 4, shadcn, Base UI, Geist, Lucide React |
| Routing | React Router |
| Server state | TanStack Query |
| Data display and charts | shadcn tables, Recharts |
| Forms and validation | React Hook Form, Zod |
| Backend | Supabase Database, Authentication, and Storage |
| Utilities | date-fns, Sonner, React Error Boundary |
| Deployment | Vercel |

## Project structure

```text
the-wild-oasis/
├── public/                  # Static assets
├── src/
│   ├── components/ui/      # Reusable UI primitives
│   ├── data/               # Development data and image assets
│   ├── features/           # Domain features and their query/mutation hooks
│   │   ├── authentication/
│   │   ├── bookings/
│   │   ├── cabins/
│   │   ├── check-in-out/
│   │   ├── dashboard/
│   │   └── settings/
│   ├── hooks/              # Shared custom hooks
│   ├── lib/                # General utilities
│   ├── pages/              # Route-level page components
│   ├── services/           # Supabase client and API functions
│   ├── shared/             # App shell, navigation, filters, and shared UI
│   ├── App.tsx             # Providers and route definitions
│   ├── index.css           # Theme tokens and global styles
│   └── main.tsx            # Application entry point
├── supabase/               # Supabase notes and database migrations
├── .env.example            # Required environment variables
└── vercel.json             # SPA routing configuration for Vercel
```

## How I built it

I organized the application by business feature so that each area owns its components and React Query hooks. Route-level pages stay small and compose those features into complete screens.

Supabase provides the backend services. The files in `src/services` isolate database, authentication, and storage operations from the UI, while TanStack Query handles fetching, caching, mutations, invalidation, and loading or error states.

Filters, sorting, date ranges, and pagination are stored in URL search parameters. This makes views shareable, keeps browser navigation useful, and avoids hiding important table state inside individual components.

Forms use React Hook Form with Zod validation where structured schemas are helpful. The interface is built from reusable shadcn and Base UI primitives, Tailwind theme tokens, responsive container layouts, and accessible labels and feedback states.

## What I learned

- How to model server state with query keys, targeted cache invalidation, and mutation feedback.
- How to combine Supabase Database, Authentication, and Storage behind a small service layer.
- How URL search parameters can drive reusable filtering, sorting, pagination, and dashboard ranges.
- How to turn booking data into useful operational metrics and responsive Recharts visualizations.
- How to build forms that provide clear validation, disabled states, and accessible feedback.
- How to make data-heavy dashboard screens work across narrow and wide layouts.

## Challenges

### Preserving the active staff session

Creating another staff account with the main Supabase client can replace the current user's session. I solved this by using a separate, non-persistent signup client so an administrator can add a user without being logged out.

### Keeping remote data consistent

Cabin, booking, check-in, and settings mutations affect several screens. Carefully scoped query keys and invalidation keep the dashboard and tables synchronized after every update.

### Making dense data responsive

Tables, charts, filters, and the sidebar all compete for space on smaller displays. Responsive wrapping, container queries, collapsible navigation, and flexible chart sizing keep the interface usable without removing important information.

### Supporting direct links in production

Client-side routes can return a server 404 when refreshed after deployment. The Vercel rewrite sends every route to the application entry point so React Router can resolve it correctly.

## Getting started

### Prerequisites

- Node.js `20.19+` or `22.12+`
- npm
- A Supabase project with the tables and storage buckets used by the application

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/naked-vivi/the-wild-oasis.git
   cd the-wild-oasis
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create your local environment file:

   ```bash
   cp .env.example .env
   ```

4. Add your Supabase credentials to `.env`:

   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

   Use only the public anonymous key in the frontend. Never expose a Supabase service-role key in a `VITE_` variable.

5. Make sure the connected Supabase project provides:

   - `bookings`, `cabins`, `guests`, and `settings` data
   - Supabase Authentication users
   - Public `cabin-images` and `avatars` storage buckets
   - Row Level Security policies that allow authenticated staff to use the required data and storage operations

   > **Note:** The repository does not currently include the complete database schema and seed migrations. To start from a blank Supabase project, create these resources first or add the project's original schema before running the application.

6. Start the development server:

   ```bash
   npm run dev
   ```

7. Open [http://localhost:5173](http://localhost:5173) and sign in with a Supabase user account.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check the project and create a production build |
| `npm run lint` | Run ESLint across the project |
| `npm run preview` | Preview the production build locally |

## Deployment

The project includes a `vercel.json` rewrite for client-side routing. Add the two Supabase environment variables to the Vercel project settings, then deploy the repository normally.
