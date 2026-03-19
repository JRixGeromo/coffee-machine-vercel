# Coffee Machine - Architecture Layers Presentation

Complete architecture visualization showing all layers from client to infrastructure.

## 🏗️ Complete Architecture Layers

```mermaid
graph TB
    subgraph "Layer 1: Client/Browser"
        Browser["Web Browser<br/>Chrome, Firefox, Safari"]
        DevTools["Developer Tools"]
    end
    
    subgraph "Layer 2: Presentation Layer"
        UI["React UI Components"]
        CMA["CoffeeMachineApp<br/>(Container Component)"]
        MS["MachineStatus<br/>(Display)"]
        CB["CoffeeButtons<br/>(Actions)"]
        CC["ContainerControls<br/>(Input)"]
        MD["MessageDisplay<br/>(Feedback)"]
        Hook["useCoffeeMachine Hook<br/>(State Management)"]
    end
    
    subgraph "Layer 3: Application Layer"
        NextApp["Next.js 14 App Router"]
        SSR["Server-Side Rendering"]
        ClientComp["Client Components"]
        ServerComp["Server Components"]
    end
    
    subgraph "Layer 4: API Layer"
        Routes["API Routes<br/>/api/coffee-machine/*"]
        Status["GET /status"]
        MakeE["POST /make-espresso"]
        MakeDE["POST /make-double-espresso"]
        MakeA["POST /make-americano"]
        FillW["POST /fill-water"]
        FillC["POST /fill-coffee"]
    end
    
    subgraph "Layer 5: Business Logic Layer"
        Service["CoffeeMachineService<br/>(Core Logic)"]
        Recipe["Recipe Value Object<br/>(Domain Model)"]
        Validation["Zod Validation<br/>(Input Validation)"]
    end
    
    subgraph "Layer 6: Data Access Layer"
        Prisma["Prisma ORM<br/>(Type-safe Database Client)"]
        Schema["Prisma Schema<br/>(Database Definition)"]
        Migrations["Database Migrations"]
    end
    
    subgraph "Layer 7: Database Layer"
        DB[("PostgreSQL 15<br/>Database")]
        StateTable["coffee_machine_state<br/>(Current State)"]
        RecipeTable["coffee_recipes<br/>(Recipe Definitions)"]
    end
    
    subgraph "Layer 8: Infrastructure Layer"
        Docker["Docker Containers"]
        AppContainer["Next.js App Container<br/>(Port 3001)"]
        DBContainer["PostgreSQL Container<br/>(Port 5434)"]
        Network["Docker Network<br/>(coffee-network)"]
        Volume["Persistent Volume<br/>(postgres_data)"]
    end
    
    subgraph "Layer 9: Cloud Infrastructure (Optional)"
        Vercel["Vercel Platform<br/>(Serverless)"]
        Supabase["Supabase<br/>(Managed PostgreSQL)"]
        CDN["Global CDN"]
    end
    
    %% Connections
    Browser --> UI
    UI --> CMA
    CMA --> MS
    CMA --> CB
    CMA --> CC
    CMA --> MD
    CMA --> Hook
    
    Hook --> NextApp
    NextApp --> SSR
    NextApp --> ClientComp
    NextApp --> ServerComp
    
    ClientComp --> Routes
    ServerComp --> Routes
    
    Routes --> Status
    Routes --> MakeE
    Routes --> MakeDE
    Routes --> MakeA
    Routes --> FillW
    Routes --> FillC
    
    Status --> Service
    MakeE --> Service
    MakeDE --> Service
    MakeA --> Service
    FillW --> Service
    FillC --> Service
    
    Service --> Recipe
    Service --> Validation
    Service --> Prisma
    
    Prisma --> Schema
    Prisma --> Migrations
    Prisma --> DB
    
    DB --> StateTable
    DB --> RecipeTable
    
    Docker --> AppContainer
    Docker --> DBContainer
    Docker --> Network
    Docker --> Volume
    
    AppContainer -.runs.-> NextApp
    DBContainer -.runs.-> DB
    Volume -.persists.-> DB
    
    Vercel -.alternative.-> AppContainer
    Supabase -.alternative.-> DBContainer
    CDN -.serves.-> UI
    
    style Browser fill:#e1f5ff,stroke:#0288d1,stroke-width:2px
    style Routes fill:#fff4e1,stroke:#f57c00,stroke-width:2px
    style Service fill:#ffe1f5,stroke:#c2185b,stroke-width:2px
    style Prisma fill:#e1ffe1,stroke:#388e3c,stroke-width:2px
    style DB fill:#f0f0f0,stroke:#455a64,stroke-width:2px
    style Docker fill:#e3f2fd,stroke:#1976d2,stroke-width:3px
```

## 📊 Layer Responsibilities

### **Layer 1: Client/Browser**
- **Purpose**: User interface rendering and interaction
- **Technology**: Modern web browsers
- **Responsibilities**:
  - Render React components
  - Handle user input
  - Execute JavaScript
  - Manage local state

### **Layer 2: Presentation Layer**
- **Purpose**: UI components and user interaction logic
- **Technology**: React 18, TypeScript, Tailwind CSS
- **Components**:
  - `CoffeeMachineApp`: Main container component
  - `MachineStatus`: Display water/coffee levels with progress bars
  - `CoffeeButtons`: Coffee type selection buttons
  - `ContainerControls`: Fill water/coffee inputs
  - `MessageDisplay`: Success/error notifications
  - `useCoffeeMachine`: Custom React hook for state management

### **Layer 3: Application Layer**
- **Purpose**: Next.js framework orchestration
- **Technology**: Next.js 14 App Router
- **Features**:
  - Server-Side Rendering (SSR)
  - Client Components (interactive)
  - Server Components (data fetching)
  - Routing and navigation
  - Code splitting

### **Layer 4: API Layer**
- **Purpose**: RESTful API endpoints
- **Technology**: Next.js API Routes
- **Endpoints**:
  - `GET /api/coffee-machine/status` - Get machine status
  - `POST /api/coffee-machine/make-espresso` - Make espresso
  - `POST /api/coffee-machine/make-double-espresso` - Make double espresso
  - `POST /api/coffee-machine/make-americano` - Make americano
  - `POST /api/coffee-machine/fill-water` - Fill water container
  - `POST /api/coffee-machine/fill-coffee` - Fill coffee container

### **Layer 5: Business Logic Layer**
- **Purpose**: Core application logic and domain models
- **Technology**: TypeScript classes and functions
- **Components**:
  - `CoffeeMachineService`: Coffee machine operations
  - `Recipe`: Value object for coffee recipes
  - `Zod Validation`: Input/output validation schemas

### **Layer 6: Data Access Layer**
- **Purpose**: Database abstraction and type safety
- **Technology**: Prisma ORM
- **Features**:
  - Type-safe database queries
  - Schema management
  - Migration system
  - Query builder

### **Layer 7: Database Layer**
- **Purpose**: Data persistence
- **Technology**: PostgreSQL 15
- **Tables**:
  - `coffee_machine_state`: Current water/coffee levels
  - `coffee_recipes`: Recipe definitions

### **Layer 8: Infrastructure Layer**
- **Purpose**: Containerization and deployment
- **Technology**: Docker, Docker Compose
- **Components**:
  - Next.js application container
  - PostgreSQL database container
  - Docker network for communication
  - Persistent volume for data

### **Layer 9: Cloud Infrastructure**
- **Purpose**: Production deployment (optional)
- **Technology**: Vercel, Supabase
- **Features**:
  - Serverless deployment
  - Managed database
  - Global CDN
  - Auto-scaling

## 🔄 Data Flow Diagram

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant React
    participant NextJS
    participant API
    participant Service
    participant Prisma
    participant DB

    User->>Browser: Click "Make Espresso"
    Browser->>React: Button onClick Event
    React->>React: Update UI State (Loading)
    React->>NextJS: Fetch Request
    NextJS->>API: POST /api/coffee-machine/make-espresso
    API->>Service: service.makeEspresso()
    Service->>Service: Get Recipe (8g coffee, 24ml water)
    Service->>Prisma: findFirst() - Get Current State
    Prisma->>DB: SELECT * FROM coffee_machine_state
    DB-->>Prisma: {waterMl: 1000, coffeeGrams: 250}
    Prisma-->>Service: Current State
    Service->>Service: Validate Resources (✓ Enough)
    Service->>Service: Calculate New State
    Service->>Prisma: update() - Deduct Resources
    Prisma->>DB: UPDATE coffee_machine_state SET waterMl=976, coffeeGrams=242
    DB-->>Prisma: Updated State
    Prisma-->>Service: New State
    Service-->>API: Success Message + New Status
    API-->>NextJS: JSON Response
    NextJS-->>React: Response Data
    React->>React: Update UI State
    React->>Browser: Re-render Components
    Browser->>User: Show Success + Updated Levels
```

## 🏛️ Architectural Patterns

### **1. Layered Architecture**
```
┌─────────────────────────────────┐
│   Presentation Layer            │
├─────────────────────────────────┤
│   Application Layer             │
├─────────────────────────────────┤
│   Business Logic Layer          │
├─────────────────────────────────┤
│   Data Access Layer             │
├─────────────────────────────────┤
│   Database Layer                │
└─────────────────────────────────┘
```

### **2. Service Layer Pattern**
```typescript
CoffeeMachineService
├── Business Logic
├── Validation
├── State Management
└── Database Operations
```

### **3. Repository Pattern (via Prisma)**
```typescript
Prisma ORM
├── Type-safe Queries
├── Schema Management
├── Migration System
└── Connection Pooling
```

### **4. Value Object Pattern**
```typescript
Recipe
├── Immutable Properties
├── Validation Logic
├── Business Rules
└── Encapsulation
```

## 🔐 Cross-Cutting Concerns

### **Security**
```mermaid
graph LR
    Input[User Input] --> Validation[Zod Validation]
    Validation --> TypeCheck[TypeScript Type Check]
    TypeCheck --> Sanitization[Input Sanitization]
    Sanitization --> Prisma[Prisma ORM]
    Prisma --> DB[(Database)]
    
    style Validation fill:#4CAF50
    style TypeCheck fill:#2196F3
    style Sanitization fill:#FF9800
    style Prisma fill:#9C27B0
```

### **Error Handling**
```mermaid
graph TB
    Error[Error Occurs] --> Catch[Try-Catch Block]
    Catch --> Log[Console.error]
    Catch --> Format[Format Error Message]
    Format --> Response[JSON Error Response]
    Response --> Client[Client Receives Error]
    Client --> Display[Display to User]
    
    style Error fill:#f44336
    style Response fill:#FF9800
    style Display fill:#FFC107
```

### **Logging & Monitoring**
```
Application Logs
├── API Request/Response
├── Error Tracking
├── Performance Metrics
└── Database Queries
```

## 📈 Scalability Considerations

### **Horizontal Scaling**
```mermaid
graph LR
    LB[Load Balancer] --> App1[Next.js Instance 1]
    LB --> App2[Next.js Instance 2]
    LB --> App3[Next.js Instance 3]
    
    App1 --> DB[(PostgreSQL)]
    App2 --> DB
    App3 --> DB
    
    style LB fill:#4CAF50
    style DB fill:#2196F3
```

### **Caching Strategy**
```mermaid
graph TB
    Request[API Request] --> Cache{Cache Hit?}
    Cache -->|Yes| Return[Return Cached Data]
    Cache -->|No| DB[Query Database]
    DB --> Store[Store in Cache]
    Store --> Return
    
    style Cache fill:#FF9800
    style DB fill:#2196F3
```

## 🎯 Design Principles Applied

### **SOLID Principles**
- ✅ **Single Responsibility**: Each layer has one purpose
- ✅ **Open/Closed**: Extensible without modification
- ✅ **Liskov Substitution**: Interfaces are substitutable
- ✅ **Interface Segregation**: Small, focused interfaces
- ✅ **Dependency Inversion**: Depend on abstractions

### **Clean Architecture**
- ✅ **Independence of Frameworks**: Business logic isolated
- ✅ **Testability**: Each layer independently testable
- ✅ **Independence of UI**: UI can be swapped
- ✅ **Independence of Database**: Database can be changed
- ✅ **Independence of External Agencies**: No external dependencies in core

## 🚀 Deployment Architecture

### **Development (Docker)**
```
Developer Machine
└── Docker Desktop
    ├── Next.js Container (Port 3001)
    └── PostgreSQL Container (Port 5434)
```

### **Production (Vercel + Supabase)**
```
Internet
└── Vercel CDN
    └── Next.js Serverless Functions
        └── Supabase PostgreSQL
```

---

**This architecture provides:**
- ✅ Clear separation of concerns
- ✅ Scalability and maintainability
- ✅ Testability at every layer
- ✅ Flexibility for future changes
- ✅ Production-ready infrastructure
