# Manoj Tiwari — 3D Portfolio + Admin Panel

A modern, dark-themed, interactive portfolio built with **Next.js (App Router)**,
**Tailwind CSS**, **Framer Motion**, and a **Spline** 3D hero — backed by
**Supabase** for project data and secured with **Clerk** authentication for a
private `/admin` CRUD dashboard.

## Tech stack

| Layer        | Choice                                             |
| ------------ | -------------------------------------------------- |
| Framework    | Next.js 15 (App Router) + React 19                 |
| Styling      | Tailwind CSS 3                                      |
| Animation    | Framer Motion                                      |
| 3D           | `@splinetool/react-spline`                         |
| Database     | Supabase (PostgreSQL)                              |
| Auth         | Clerk (protects `/admin`)                          |
| Deploy       | Render (Starter plan) + GitHub                     |

## Getting started (local)

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.local.example .env.local
#   → fill in Clerk + Supabase keys (see "Environment variables" below)

# 3. Run the dev server
npm run dev
#   → http://localhost:3000
```

## Environment variables

Copy `.env.local.example` → `.env.local` and fill in:

- **Clerk** — from the [Clerk dashboard](https://dashboard.clerk.com) → API Keys:
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`
  - `ADMIN_USER_IDS` — your Clerk user id(s), comma-separated. Only these may
    open `/admin`. Find it under Users → your user → **User ID**.
- **Supabase** — from [app.supabase.com](https://app.supabase.com) → Project
  Settings → API:
  - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY` — **server-only**, used by admin CRUD routes.

## Database setup

In Supabase → **SQL Editor**, paste and run [`supabase/schema.sql`](supabase/schema.sql).
It creates the `projects` and `messages` tables, enables Row Level Security
(public can read projects / submit messages; all writes go through the
service-role admin API), and seeds the three starter projects.

## Project structure

```
app/
  layout.tsx        Root layout — wraps everything in <ClerkProvider>
  page.tsx          Public homepage (Hero + section anchors)
  globals.css       Tailwind + theme base styles
components/
  Navbar.tsx        Sticky nav with Clerk sign-in / dashboard link
  Hero.tsx          Animated hero (Framer Motion)
  SplineScene.tsx   3D canvas slot — drop in your Spline scene URL
lib/
  types.ts          Project / message types
  supabase/client.ts   Browser client (anon key)
  supabase/server.ts   Server client (service-role key, admin only)
middleware.ts       Clerk middleware guarding /admin + /api/admin
supabase/schema.sql SQL to create tables, RLS policies, and seed data
render.yaml         Render deployment blueprint
```

## Adding your 3D scene

1. Build a scene at [spline.design](https://spline.design) and export **Code (React)**.
2. Copy the `.splinecode` URL it gives you.
3. Paste it into `SPLINE_SCENE_URL` in [`components/SplineScene.tsx`](components/SplineScene.tsx).

Until then, an animated placeholder orb renders in its place.

## Deploying to Render

1. Push this repo to GitHub.
2. On Render → **New → Blueprint**, point it at the repo (`render.yaml` is
   detected automatically).
3. In the service's **Environment** tab, add the same variables from your
   `.env.local`.
4. Deploy. Render runs `npm ci && npm run build`, then `npm run start` on the
   port it provides (handled by the `start` script).

## Roadmap (next steps)

- [ ] About / Skills section (API Integrations, FMS, Workflow Automation, Next.js)
- [ ] Projects grid fetched from Supabase
- [ ] Contact form → Supabase `messages`
- [ ] `/admin` dashboard with full CRUD over `projects`
```
