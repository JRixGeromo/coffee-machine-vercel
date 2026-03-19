# Supabase Setup Guide

This guide will help you set up Supabase for the Coffee Machine application.

## 🚀 Quick Setup (5 Steps)

### Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" or "New Project"
3. Sign in with GitHub (recommended)
4. Create a new organization (if you don't have one)
5. Create a new project:
   - **Name**: `coffee-machine`
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free tier is fine for development

### Step 2: Get Your Credentials

Once your project is created (takes ~2 minutes):

1. Go to **Project Settings** → **API**
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **service_role key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (keep this secret!)

3. Go to **Project Settings** → **Database**
4. Scroll to **Connection String** → **URI**
5. Copy the connection string (it will look like):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
6. Replace `[YOUR-PASSWORD]` with the password you created in Step 1

### Step 3: Configure Environment Variables

#### For Vercel Deployment:

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add these variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-production-secret-here
NODE_ENV=production
```

#### For Local Testing with Supabase:

Update your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=coffee-machine-secret-key-development
NODE_ENV=development
```

### Step 4: Run Database Migrations

Push your Prisma schema to Supabase:

```bash
# Generate Prisma client
npx prisma generate

# Push schema to Supabase
npx prisma db push

# Or run migrations
npx prisma migrate deploy
```

### Step 5: Test the Connection

```bash
# Start the development server
npm run dev

# Test the API
curl http://localhost:3000/api/coffee-machine/status
```

You should see:
```json
{
  "success": true,
  "status": {
    "water": {"current": 0, "capacity": 2, "percentage": 0},
    "coffee": {"current": 0, "capacity": 500, "percentage": 0}
  }
}
```

## 🐳 Deployment Options

### Option 1: Docker + Local PostgreSQL (Development)

```bash
# Use local Docker PostgreSQL
docker-compose -f docker-compose.dev.yml up --build

# Access: http://localhost:3001
```

**Environment:**
```env
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/coffee_machine"
```

### Option 2: Local Dev + Supabase (Testing)

```bash
# Use Supabase database from local machine
npm run dev

# Access: http://localhost:3000
```

**Environment:**
```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres"
```

### Option 3: Vercel + Supabase (Production)

```bash
# Deploy to Vercel
npx vercel --prod
```

**Environment:** Set in Vercel dashboard

## 📊 Database Schema

The Prisma schema will create these tables in Supabase:

### `coffee_machine_state`
```sql
CREATE TABLE coffee_machine_state (
  id SERIAL PRIMARY KEY,
  "waterMl" INTEGER NOT NULL DEFAULT 0,
  "coffeeGrams" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);
```

### `coffee_recipes`
```sql
CREATE TABLE coffee_recipes (
  id SERIAL PRIMARY KEY,
  key VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  "coffeeGrams" INTEGER NOT NULL,
  "waterMilliliters" INTEGER NOT NULL,
  description TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);
```

## 🔍 Verify Setup

### Check Database Tables

1. Go to Supabase Dashboard
2. Click **Table Editor**
3. You should see:
   - `coffee_machine_state`
   - `coffee_recipes`

### Check Data

Run a query in Supabase SQL Editor:

```sql
SELECT * FROM coffee_machine_state;
SELECT * FROM coffee_recipes;
```

## 🛠️ Troubleshooting

### Issue: "Invalid API key"
- **Solution**: Check that you copied the correct `anon` key from Supabase dashboard
- Make sure the key starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`

### Issue: "Database connection failed"
- **Solution**: Verify your `DATABASE_URL` is correct
- Make sure you replaced `[YOUR-PASSWORD]` with your actual password
- Check that your IP is not blocked (Supabase allows all IPs by default)

### Issue: "Table does not exist"
- **Solution**: Run migrations:
  ```bash
  npx prisma migrate deploy
  # or
  npx prisma db push
  ```

### Issue: "Authentication failed"
- **Solution**: Double-check your database password
- Try resetting the database password in Supabase dashboard

## 🔐 Security Best Practices

1. **Never commit** `.env.local` or `.env` files
2. **Use environment variables** in Vercel for production
3. **Keep service_role key secret** - only use server-side
4. **Use anon key** for client-side operations
5. **Enable Row Level Security (RLS)** in Supabase for production

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Prisma + Supabase Guide](https://www.prisma.io/docs/guides/database/supabase)
- [Next.js + Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Vercel Deployment](https://vercel.com/docs)

## 🎯 Next Steps

After setup:

1. ✅ Test locally with Supabase
2. ✅ Deploy to Vercel
3. ✅ Set up environment variables in Vercel
4. ✅ Run migrations on production
5. ✅ Test production deployment

---

**Need help?** Check the main [README.md](./README.md) for more information.
