# ☕ Coffee Machine - Vercel + Supabase + Docker

A Next.js 14 Coffee Machine application that simulates a real coffee machine with resource management, recipe validation, and real-time status updates.

## 🚀 Quick Start (5 Minutes)

### **Option 1: Try it Live**
1. **Visit**: http://localhost:3001 (after starting Docker)
2. **Fill Water**: Enter `1000` in water field, click "Fill"
3. **Fill Coffee**: Enter `250` in coffee field, click "Fill"  
4. **Make Coffee**: Click "Espresso" button
5. **Watch**: See progress bars update in real-time!

### **Option 2: Docker Setup**
```bash
# Clone and start
git clone <your-repo>
cd coffee-machine-vercel

# Linux/Mac (with make)
make dev

# Windows PowerShell (without make)
docker-compose -f docker-compose.dev.yml up --build

# Open http://localhost:3001
```

### **Option 3: Vercel Deploy**
```bash
# Deploy to cloud (no Docker needed)
npx vercel --prod
```

## 📖 What This App Does

**It's a virtual coffee machine that:**
- ✅ Tracks water (2L max) and coffee (500g max) levels
- ✅ Makes 3 coffee types with real recipes
- ✅ Validates resources before making coffee
- ✅ Shows beautiful progress bars and real-time updates
- ✅ Prevents making coffee without enough ingredients

**Perfect for learning Next.js, TypeScript, Docker, and full-stack development!**

### Option 1: Local Development with Docker
```bash
# Clone and setup
git clone <your-repo>
cd coffee-machine-vercel
cp .env.local.example .env.local

# Start development environment
make dev
```

### Option 2: Production with Docker
```bash
# Start production environment
make prod

# Access the app
# App: http://localhost:3000
# Nginx: http://localhost:80
```

### Option 3: Deploy to Vercel + Supabase
```bash
# 1. Create Supabase project
# 2. Update .env.local with Supabase credentials
# 3. Deploy to Vercel
make deploy-vercel
```

## 📁 Project Structure

```
coffee-machine-vercel/
├── app/                    # Next.js 14 App Router
├── components/             # React components
├── lib/                   # Business logic
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript definitions
├── prisma/               # Database schema
├── Dockerfile            # Production Docker image
├── Dockerfile.dev        # Development Docker image
├── docker-compose.yml    # Production Docker Compose
├── docker-compose.dev.yml # Development Docker Compose
├── vercel.json          # Vercel configuration
├── nginx.conf           # Nginx reverse proxy
├── Makefile             # Helper commands
└── README.md            # This file
```

## 🛠️ Available Commands

### Docker Commands

#### **Linux/Mac (with make)**
```bash
make dev          # Start development environment
make prod         # Start production environment
make build        # Build production image
make up           # Start containers
make down         # Stop containers
make logs         # Show logs
make clean        # Clean up containers and images
```

#### **Windows PowerShell (without make)**
```powershell
# Development
docker-compose -f docker-compose.dev.yml up --build     # Start dev environment
docker-compose -f docker-compose.dev.yml up -d --build  # Start in background

# Production
docker-compose up --build -d                            # Start production
docker-compose down                                     # Stop containers
docker-compose logs -f                                  # Show logs
docker-compose logs -f app                              # Show app logs only

# Clean up
docker-compose down -v                                  # Stop and remove volumes
docker system prune -f                                  # Clean Docker system
```

### Database Commands

#### **Linux/Mac**
```bash
make migrate      # Run database migrations
make seed         # Seed database
make db-shell     # Open database shell
```

#### **Windows PowerShell**
```powershell
# Run migrations
docker-compose exec app npx prisma migrate deploy

# Seed database
docker-compose exec app npm run db:seed

# Open database shell
docker-compose exec postgres psql -U postgres -d coffee_machine

# Open app shell
docker-compose exec app sh
```

### Development Commands
```bash
npm install       # Install dependencies
npm test          # Run tests
npm run test:e2e  # Run E2E tests
npm run lint      # Run linting
npm run dev       # Start local dev server (non-Docker)
```

### Deployment Commands
```bash
npx vercel --prod # Deploy to Vercel
```

## 🌐 Deployment Options

### 1. Vercel + Supabase (Recommended)
- **Cost**: ~$10-15/year
- **Features**: Auto-scaling, CDN, SSL, managed database
- **Setup**: One-click deployment

### 2. Docker + Cloud Server
- **Cost**: ~$5-20/month
- **Features**: Full control, custom domain, SSL
- **Setup**: Manual configuration

### 3. Local Docker
- **Cost**: Free
- **Features**: Development, testing, demo
- **Setup**: Local machine

## 🔧 Configuration

### Environment Variables
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Database URL for Prisma
DATABASE_URL="postgresql://postgres:your-password@db.your-project-id.supabase.co:5432/postgres"

# Next.js
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=coffee-machine-secret-key-production
```

### Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed database (optional)
npm run db:seed
```

## ☕ Coffee Machine Usage Guide

### How to Use the Coffee Machine

#### **Step 1: Fill Containers**
When you first start the app, containers are empty:
1. **Fill Water**: Enter amount (1-2000ml) and click "Fill"
2. **Fill Coffee**: Enter amount (1-500g) and click "Fill"

#### **Step 2: Make Coffee**
Choose your coffee type:
- **☕ Espresso**: Uses 8g coffee + 24ml water
- **☕ Double Espresso**: Uses 16g coffee + 48ml water  
- **☕ Americano**: Uses 16g coffee + 148ml water

#### **Step 3: Monitor Status**
- **Progress Bars** show current water/coffee levels
- **Machine Status** displays available coffee types
- **Real-time updates** after each action

### Coffee Recipes & Requirements

| Coffee Type | Coffee Needed | Water Needed | When Available |
|--------------|---------------|--------------|----------------|
| **Espresso** | 8g | 24ml | ≥8g coffee AND ≥24ml water |
| **Double Espresso** | 16g | 48ml | ≥16g coffee AND ≥48ml water |
| **Americano** | 16g | 148ml | ≥16g coffee AND ≥148ml water |

### Container Capacities
- **💧 Water Container**: 2 liters (2000ml max)
- **☕ Coffee Container**: 500 grams (500g max)

### API Endpoints

#### **Get Machine Status**
```bash
GET /api/coffee-machine/status
```
Returns current water/coffee levels and available recipes.

#### **Make Coffee**
```bash
POST /api/coffee-machine/make-espresso
POST /api/coffee-machine/make-double-espresso  
POST /api/coffee-machine/make-americano
```

#### **Fill Containers**
```bash
POST /api/coffee-machine/fill-water
POST /api/coffee-machine/fill-coffee
```

**Request Body:**
```json
{
  "quantity": 100  // Amount in ml (water) or grams (coffee)
}
```

### Example Workflow

1. **Start with empty containers**
   ```json
   {
     "water": {"current": 0, "capacity": 2000},
     "coffee": {"current": 0, "capacity": 500}
   }
   ```

2. **Fill containers**
   - Add 1000ml water → Water: 1000/2000ml (50%)
   - Add 250g coffee → Coffee: 250/500g (50%)

3. **Make coffee**
   - Make espresso → Water: 976ml, Coffee: 242g
   - Make americano → Water: 828ml, Coffee: 226g

4. **Check status**
   - All coffee types available when resources sufficient
   - Buttons disabled when insufficient resources

### Troubleshooting

#### **"Insufficient Resources" Error**
- Check water and coffee levels
- Fill containers as needed
- Each recipe requires specific minimum amounts

#### **Container Not Filling**
- Ensure quantity is within limits (water: 1-2000ml, coffee: 1-500g)
- Check for valid number input
- Verify database connection

#### **Progress Bars Not Updating**
- Refresh the page
- Check browser console for errors
- Verify API endpoints are responding

## 📊 Features

### Coffee Machine Features
- ☕ **Three Coffee Types**: Espresso, Double Espresso, Americano
- 💧 **Smart Resource Management**: Automatic level tracking
- 📊 **Visual Progress Bars**: Real-time status display
- 🎯 **Recipe Validation**: Ensures sufficient resources
- ⚡ **Live Updates**: Instant UI feedback

### UI Features
- 📊 **Progress Bars**: Visual water/coffee levels with percentages
- 🎨 **2-Column Layout**: Water and Coffee side-by-side
- 🎯 **Centered Design**: Modern, clean interface
- 📱 **Responsive**: Works on desktop, tablet, mobile
- ⚡ **Real-time Updates**: Live status changes after each action
- 🔔 **Smart Notifications**: Success/error messages

### Technical Features
- 🚀 **Next.js 14**: Latest React framework
- 🔒 **TypeScript**: Type-safe development
- 🗄️ **PostgreSQL**: Production database
- 🐳 **Docker**: Containerized deployment
- 🧪 **Testing**: Comprehensive test suite
- 📚 **Documentation**: Complete docs

## 🧪 Testing

```bash
# Run all tests
npm test

# Run E2E tests
npm run test:e2e

# Run with coverage
npm run test:coverage
```

## 📈 Monitoring

### Health Checks
- **App Health**: `GET /api/health`
- **Database Health**: Prisma connection test
- **Container Health**: Docker health checks

### Logging
- **Application Logs**: Structured logging
- **Database Logs**: PostgreSQL logs
- **Nginx Logs**: Access and error logs

## 🔒 Security

- **Input Validation**: Zod schema validation
- **Type Safety**: End-to-end TypeScript
- **Environment Variables**: Secure configuration
- **SSL/TLS**: HTTPS encryption
- **SQL Injection Prevention**: Prisma ORM

## 🚀 Performance

- **Server-Side Rendering**: Next.js SSR
- **Static Generation**: Optimized builds
- **Database Optimization**: Prisma queries
- **Caching**: Redis integration
- **CDN**: Global content delivery

## 📞 Support

- **Documentation**: Complete README and architecture docs
- **Issues**: GitHub issue tracker
- **Community**: Open source contribution

## 📄 License

MIT License - feel free to use this project for learning and production.

---

**Built with ❤️ using Next.js 14, TypeScript, Tailwind CSS, PostgreSQL, and Docker**
