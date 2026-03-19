# Coffee Machine Architecture - Docker + Next.js + Supabase

This document explains how Docker, Next.js, and Supabase work together in this project.

## 🏗️ Architecture Overview

```mermaid
graph TB
    subgraph "Development Environment"
        Dev[Developer Machine]
        Docker[Docker Desktop]
        DevApp[Next.js Dev Server<br/>Port 3001]
        DevDB[(Local PostgreSQL<br/>Port 5434)]
    end
    
    subgraph "Production Environment"
        Vercel[Vercel Platform]
        ProdApp[Next.js App<br/>Serverless]
        Supabase[Supabase]
        SupaDB[(PostgreSQL Database)]
        SupaAuth[Authentication]
        SupaStorage[File Storage]
    end
    
    subgraph "Shared Components"
        Prisma[Prisma ORM]
        NextAPI[Next.js API Routes]
        React[React Components]
    end
    
    Dev --> Docker
    Docker --> DevApp
    Docker --> DevDB
    DevApp --> Prisma
    Prisma --> DevDB
    
    Vercel --> ProdApp
    ProdApp --> Prisma
    Prisma --> SupaDB
    Supabase --> SupaDB
    Supabase --> SupaAuth
    Supabase --> SupaStorage
    
    DevApp --> NextAPI
    ProdApp --> NextAPI
    NextAPI --> React
```

## 🔄 Data Flow

### Local Development (Docker)
```
User Browser → Next.js (localhost:3001) → Prisma → PostgreSQL (Docker)
```

### Production (Vercel + Supabase)
```
User Browser → Vercel CDN → Next.js Serverless → Prisma → Supabase PostgreSQL
```

## 📦 Technology Stack

### Frontend Layer
- **Next.js 14**: React framework with App Router
- **React 18**: UI components
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling

### Backend Layer
- **Next.js API Routes**: RESTful endpoints
- **Prisma ORM**: Database access
- **Zod**: Input validation

### Database Layer
- **Development**: PostgreSQL 15 (Docker)
- **Production**: PostgreSQL (Supabase)

### Infrastructure Layer
- **Development**: Docker + Docker Compose
- **Production**: Vercel + Supabase

## 🐳 Docker Setup

### Development Containers

```yaml
services:
  app-dev:
    # Next.js development server
    ports: ["3001:3000"]
    environment:
      DATABASE_URL: postgresql://postgres:postgres@postgres:5432/coffee_machine
    
  postgres:
    # Local PostgreSQL database
    image: postgres:15-alpine
    ports: ["5434:5432"]
```

### Why Docker for Development?

1. **Consistency**: Same environment for all developers
2. **Isolation**: No conflicts with other projects
3. **Easy Setup**: One command to start everything
4. **No Installation**: No need to install PostgreSQL locally
5. **Fast Reset**: Easy to reset database state

## ☁️ Supabase Integration

### What is Supabase?

Supabase is an open-source Firebase alternative that provides:
- **PostgreSQL Database**: Fully managed
- **Authentication**: Built-in auth system
- **Storage**: File uploads and management
- **Real-time**: WebSocket subscriptions
- **Auto APIs**: REST and GraphQL APIs

### Why Supabase?

1. **Free Tier**: 500MB database, 1GB file storage
2. **PostgreSQL**: Full SQL database (not NoSQL)
3. **Prisma Compatible**: Works with existing Prisma schema
4. **Global CDN**: Fast worldwide access
5. **Auto Backups**: Daily backups included
6. **Easy Migration**: Simple to move from local to cloud

### Supabase Features Used

```typescript
// Supabase Client (lib/supabase/client.ts)
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
```

**Current Usage:**
- ✅ PostgreSQL Database (via Prisma)
- ⏳ Authentication (future feature)
- ⏳ Real-time Updates (future feature)
- ⏳ File Storage (future feature)

## 🔀 Deployment Workflows

### Workflow 1: Local Development
```bash
# Start Docker containers
docker-compose -f docker-compose.dev.yml up --build

# Access app
http://localhost:3001

# Database
PostgreSQL on localhost:5434
```

### Workflow 2: Supabase Testing
```bash
# Update .env.local with Supabase credentials
# Run migrations
npx prisma db push

# Start local dev server
npm run dev

# Access app
http://localhost:3000

# Database
Supabase PostgreSQL (cloud)
```

### Workflow 3: Production Deployment
```bash
# Set environment variables in Vercel
# Deploy to Vercel
npx vercel --prod

# Access app
https://your-app.vercel.app

# Database
Supabase PostgreSQL (cloud)
```

## 🔧 Configuration Matrix

| Environment | App Host | Database | Port | URL |
|-------------|----------|----------|------|-----|
| **Docker Dev** | Docker | Local PostgreSQL | 3001 | http://localhost:3001 |
| **Local + Supabase** | localhost | Supabase | 3000 | http://localhost:3000 |
| **Production** | Vercel | Supabase | 443 | https://your-app.vercel.app |

## 📊 Database Schema (Prisma)

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
  binaryTargets = ["native", "linux-musl-openssl-3.0.x"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model CoffeeMachineState {
  id          Int      @id @default(autoincrement())
  waterMl     Int      @default(0)
  coffeeGrams Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model CoffeeRecipe {
  id                Int      @id @default(autoincrement())
  key               String   @unique
  name              String
  coffeeGrams       Int
  waterMilliliters  Int
  description       String?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}
```

**Same schema works for:**
- ✅ Local PostgreSQL (Docker)
- ✅ Supabase PostgreSQL
- ✅ Any PostgreSQL database

## 🚀 Migration Strategy

### From Docker to Supabase

1. **Export data from Docker**:
   ```bash
   docker exec coffee-vercel-dev-postgres pg_dump -U postgres coffee_machine > backup.sql
   ```

2. **Create Supabase project**

3. **Run migrations on Supabase**:
   ```bash
   DATABASE_URL="postgresql://..." npx prisma db push
   ```

4. **Import data to Supabase** (optional):
   ```bash
   psql postgresql://... < backup.sql
   ```

### From Supabase to Docker

1. **Export from Supabase**:
   ```bash
   pg_dump postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres > backup.sql
   ```

2. **Import to Docker**:
   ```bash
   docker exec -i coffee-vercel-dev-postgres psql -U postgres coffee_machine < backup.sql
   ```

## 🔐 Security

### Environment Variables

**Never commit:**
- ❌ `.env.local`
- ❌ `.env`
- ❌ Supabase service role key
- ❌ Database passwords

**Safe to commit:**
- ✅ `.env.local.example`
- ✅ `docker-compose.yml`
- ✅ Prisma schema

### API Keys

- **Public (anon) key**: Safe for client-side
- **Service role key**: Server-side only, never expose

## 📈 Scaling

### Current Setup (Free Tier)
- **Vercel**: 100GB bandwidth/month
- **Supabase**: 500MB database, 2GB bandwidth/month
- **Handles**: ~10,000 requests/month

### When to Upgrade
- **Vercel Pro** ($20/mo): More bandwidth, team features
- **Supabase Pro** ($25/mo): 8GB database, better performance

## 🎯 Best Practices

1. **Use Docker for development**: Consistent environment
2. **Use Supabase for production**: Managed, scalable
3. **Keep Prisma schema in sync**: Single source of truth
4. **Test locally before deploying**: Catch issues early
5. **Use environment variables**: Never hardcode credentials
6. **Run migrations carefully**: Test on staging first

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Docker Documentation](https://docs.docker.com)
- [Vercel Documentation](https://vercel.com/docs)

---

**For setup instructions, see [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)**
