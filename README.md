This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

check env.example to create .env file

run pnpm db-sync to sync database

run pnpm make-admin <username> <password> to create admin user

login with admin user at /admin/login

This project is a landing page cms with admin panel. It's view style is block based. It's using drizzle orm for database and jose for authentication.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.