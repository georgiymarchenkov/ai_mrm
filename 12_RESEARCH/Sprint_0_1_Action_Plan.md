---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: research_doc
title: Детальный план Sprint 0 и Sprint 1
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 12_RESEARCH/Sprint_0_1_Action_Plan.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [research, analysis]
---

# Детальный план Sprint 0 и Sprint 1

## 🚀 Sprint 0: Foundation Setup (Неделя 1-2)

**Цель:** Подготовить все необходимое для начала разработки

---

### 📋 Day 1-2: Team Assembly & Kickoff

#### Задачи:

**1. Сформировать команду** ⏱️ 1 день
- [ ] Нанять/назначить Tech Lead
- [ ] Нанять 2 backend разработчиков
- [ ] Нанять 1-2 frontend разработчиков
- [ ] Нанять UI/UX дизайнера
- [ ] Нанять AI/ML инженера (или совместить с backend)
- [ ] Договориться с DevOps инженером (part-time на старте)

**2. Kickoff Meeting** ⏱️ 4 часа
- [ ] Презентация видения продукта
- [ ] Обзор документации (Plan, Architecture, Artifacts)
- [ ] Q&A сессия
- [ ] Обсуждение tech stack
- [ ] Распределение первых задач

**3. Настройка коммуникации** ⏱️ 2 часа
- [ ] Создать Slack workspace / Telegram чат
- [ ] Настроить каналы (#general, #dev, #design, #ai)
- [ ] Добавить всех участников
- [ ] Настроить Notion/Confluence для документации
- [ ] Настроить Linear/Jira для task management

---

### 💻 Day 3-5: Technical Setup

#### Задачи:

**1. Репозиторий и Version Control** ⏱️ 4 часа
```bash
# Создать монорепо структуру
mrm-platform/
├── apps/
│   ├── web/           # Next.js frontend
│   ├── api/           # NestJS backend
│   └── ai-service/    # AI microservice
├── packages/
│   ├── ui/            # Shared UI components
│   ├── types/         # Shared TypeScript types
│   ├── utils/         # Shared utilities
│   └── database/      # Prisma schema
├── docker/
├── scripts/
└── docs/
```

- [ ] Создать GitHub/GitLab репозиторий
- [ ] Настроить `.gitignore`
- [ ] Создать `README.md` с setup инструкциями
- [ ] Настроить branch protection rules (main, develop)
- [ ] Создать PR template
- [ ] Настроить code owners

**2. Development Environment** ⏱️ 8 часов

**Frontend (Next.js):**
```bash
# Создать Next.js проект
npx create-next-app@latest apps/web --typescript --tailwind --app

# Установить зависимости
cd apps/web
npm install @tanstack/react-query zustand
npm install @hookform/resolvers react-hook-form zod
npm install @radix-ui/react-* # UI primitives
npm install lucide-react # Icons
npm install recharts # Charts
npm install date-fns # Date utils
```

- [ ] Настроить Next.js project
- [ ] Установить и настроить Tailwind CSS
- [ ] Настроить shadcn/ui
- [ ] Создать базовые layout компоненты
- [ ] Настроить темную/светлую тему
- [ ] Настроить TypeScript strict mode

**Backend (NestJS):**
```bash
# Создать NestJS проект
npm i -g @nestjs/cli
nest new apps/api

# Установить зависимости
cd apps/api
npm install @nestjs/config @nestjs/jwt @nestjs/passport
npm install @prisma/client
npm install bcrypt class-validator class-transformer
npm install passport passport-jwt
npm install -D prisma
```

- [ ] Настроить NestJS project structure
- [ ] Настроить environment variables
- [ ] Создать модульную структуру (auth, users, projects, artifacts)
- [ ] Настроить validation pipes
- [ ] Настроить global error handling
- [ ] Настроить Swagger для API docs

**3. Database Setup** ⏱️ 6 часов

```bash
# Инициализация Prisma
npx prisma init

# Создать схему (в packages/database/schema.prisma)
```

- [ ] Выбрать PostgreSQL хостинг (Supabase/Railway/Neon для dev)
- [ ] Создать dev database
- [ ] Написать Prisma schema для основных таблиц:
  - organizations
  - users
  - organization_members
  - projects
  - project_members
  - artifacts
- [ ] Создать миграции: `npx prisma migrate dev`
- [ ] Сгенерировать Prisma Client
- [ ] Создать seed script для тестовых данных

**4. Docker Setup** ⏱️ 4 часа

```dockerfile
# docker/Dockerfile.api
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: mrm
      POSTGRES_PASSWORD: dev_password
      POSTGRES_DB: mrm_dev
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
  
  api:
    build:
      context: .
      dockerfile: docker/Dockerfile.api
    ports:
      - "3001:3000"
    environment:
      DATABASE_URL: postgresql://mrm:dev_password@postgres:5432/mrm_dev
      REDIS_URL: redis://redis:6379
    depends_on:
      - postgres
      - redis

volumes:
  postgres_data:
```

- [ ] Создать Dockerfile для API
- [ ] Создать Dockerfile для Web
- [ ] Создать docker-compose.yml для local dev
- [ ] Протестировать запуск: `docker-compose up`

**5. CI/CD Pipeline** ⏱️ 4 часа

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build
```

- [ ] Настроить GitHub Actions для CI
- [ ] Добавить lint job
- [ ] Добавить test job
- [ ] Добавить build job
- [ ] Настроить status checks для PR

---

### 🎨 Day 6-7: Design Foundation

#### Задачи:

**1. Design System** ⏱️ 8 часов
- [ ] Создать Figma workspace
- [ ] Определить цветовую палитру
- [ ] Выбрать типографику (шрифты)
- [ ] Создать базовые компоненты:
  - Buttons (primary, secondary, ghost, destructive)
  - Inputs (text, number, date, select)
  - Cards
  - Modals/Dialogs
  - Toasts/Notifications
  - Tabs
  - Tables
- [ ] Определить spacing system (4px grid)
- [ ] Создать иконки библиотеку

**2. Key Screens Wireframes** ⏱️ 12 часов
- [ ] Auth screens (Login, Register, Reset password)
- [ ] Dashboard (Projects overview)
- [ ] Project detail page
- [ ] Create project flow
- [ ] Artifact pages (Brief, Strategy, Media Plan)
- [ ] AI Chat interface
- [ ] Settings page

**3. Design Tokens** ⏱️ 4 часа
```typescript
// apps/web/src/styles/tokens.ts
export const colors = {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    // ...
    900: '#0c4a6e',
  },
  // ...
};

export const spacing = {
  xs: '0.25rem',  // 4px
  sm: '0.5rem',   // 8px
  md: '1rem',     // 16px
  lg: '1.5rem',   // 24px
  xl: '2rem',     // 32px
};
```

- [ ] Экспортировать design tokens из Figma
- [ ] Создать TypeScript types для tokens
- [ ] Настроить Tailwind config с tokens
- [ ] Документировать usage в Storybook (optional)

---

### 🧪 Day 8-10: Testing & Quality Setup

#### Задачи:

**1. Testing Infrastructure** ⏱️ 6 часов

```bash
# Frontend testing
npm install -D @testing-library/react @testing-library/jest-dom
npm install -D vitest @vitest/ui

# Backend testing
npm install -D @nestjs/testing jest supertest
```

- [ ] Настроить Vitest для frontend
- [ ] Настроить Jest для backend
- [ ] Создать примеры unit tests
- [ ] Настроить test coverage reports
- [ ] Добавить pre-commit hook для тестов

**2. Code Quality Tools** ⏱️ 4 часа

```bash
# ESLint & Prettier
npm install -D eslint prettier eslint-config-prettier
npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin

# Husky для git hooks
npm install -D husky lint-staged
npx husky install
```

```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
```

- [ ] Настроить ESLint
- [ ] Настроить Prettier
- [ ] Настроить Husky + lint-staged
- [ ] Добавить pre-commit hooks (lint, format)
- [ ] Добавить commit message validation (commitlint)

**3. Monitoring Setup** ⏱️ 4 часов
- [ ] Создать Sentry проект
- [ ] Интегрировать Sentry в frontend
- [ ] Интегрировать Sentry в backend
- [ ] Настроить source maps upload
- [ ] Создать simple logging utility

---

### 📚 Day 11-14: Knowledge Base & Documentation

#### Задачи:

**1. Developer Documentation** ⏱️ 6 часов
- [ ] Написать README с setup инструкциями
- [ ] Документировать folder structure
- [ ] Создать CONTRIBUTING.md
- [ ] Документировать coding conventions
- [ ] Создать API documentation template
- [ ] Документировать git workflow (branching strategy)

**2. Product Documentation** ⏱️ 4 часа
- [ ] Создать Product Requirements Document (PRD)
- [ ] Документировать user roles и permissions
- [ ] Создать user stories для MVP
- [ ] Документировать key user flows

**3. AI Knowledge Base Setup** ⏱️ 6 часов
- [ ] Выбрать векторную БД (Pinecone free tier / pgvector)
- [ ] Создать аккаунт и API ключ
- [ ] Индексировать начальные документы:
  - HandBook по управлению проектами (из ваших файлов)
  - Регламенты запуска клиентов
  - Шаблоны артефактов
- [ ] Создать простой RAG pipeline для тестирования
- [ ] Протестировать semantic search

```python
# Простой пример RAG setup
from openai import OpenAI
import pinecone

# Инициализация
client = OpenAI(api_key="...")
pinecone.init(api_key="...", environment="...")

# Создание индекса
index = pinecone.Index("mrm-knowledge")

# Индексация документа
def index_document(text, metadata):
    # Разбить на чанки
    chunks = split_into_chunks(text, chunk_size=500)
    
    # Получить embeddings
    for i, chunk in enumerate(chunks):
        embedding = client.embeddings.create(
            input=chunk,
            model="text-embedding-3-small"
        ).data[0].embedding
        
        # Сохранить в Pinecone
        index.upsert([(
            f"{metadata['doc_id']}_chunk_{i}",
            embedding,
            {"text": chunk, **metadata}
        )])

# Поиск
def search(query, top_k=5):
    query_embedding = client.embeddings.create(
        input=query,
        model="text-embedding-3-small"
    ).data[0].embedding
    
    results = index.query(
        vector=query_embedding,
        top_k=top_k,
        include_metadata=True
    )
    
    return [r.metadata['text'] for r in results.matches]
```

---

## ✅ Sprint 0 Definition of Done

- [ ] Вся команда onboarded и имеет доступ к инструментам
- [ ] Репозиторий создан и настроен
- [ ] Frontend и Backend проекты инициализированы
- [ ] Database schema создана и можно запустить миграции
- [ ] Docker окружение работает локально
- [ ] CI pipeline работает
- [ ] Базовые компоненты UI созданы в Figma
- [ ] Code quality tools настроены
- [ ] Documentation написана
- [ ] Можно сделать простой CRUD операцию end-to-end

---

## 🏗️ Sprint 1: Core MVP Features (Неделя 3-4)

**Цель:** Реализовать базовую функциональность auth + projects

---

### 📅 Week 3: Authentication & User Management

#### Backend Tasks:

**1. Auth Module** ⏱️ 12 часов
```typescript
// apps/api/src/auth/auth.service.ts
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.usersService.create({
      email: dto.email,
      passwordHash: hashedPassword,
      name: dto.name,
    });
    return this.generateTokens(user);
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user || !await bcrypt.compare(dto.password, user.passwordHash)) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.generateTokens(user);
  }

  async refreshToken(refreshToken: string) {
    // Validate refresh token and generate new access token
  }

  private generateTokens(user: User) {
    const payload = { sub: user.id, email: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }
}
```

**Tasks:**
- [ ] Создать Auth module с JWT strategy
- [ ] Реализовать `/auth/register` endpoint
- [ ] Реализовать `/auth/login` endpoint
- [ ] Реализовать `/auth/refresh-token` endpoint
- [ ] Реализовать `/auth/logout` endpoint
- [ ] Добавить email validation
- [ ] Добавить password strength validation
- [ ] Создать Auth guard для защищенных роутов
- [ ] Написать unit tests

**2. Users Module** ⏱️ 8 часов
- [ ] Создать Users module
- [ ] Реализовать `/users/me` endpoint (get current user)
- [ ] Реализовать `/users/me` PATCH endpoint (update profile)
- [ ] Реализовать `/users/me/password` endpoint (change password)
- [ ] Добавить avatar upload (S3/local for now)
- [ ] Написать unit tests

**3. Organizations Module (Basic)** ⏱️ 8 часов
- [ ] Создать Organizations module
- [ ] Реализовать POST `/organizations` (create)
- [ ] Реализовать GET `/organizations` (list user's orgs)
- [ ] Реализовать GET `/organizations/:id` (get single)
- [ ] При создании organization, автоматически добавлять создателя как admin
- [ ] Написать unit tests

#### Frontend Tasks:

**4. Auth Pages** ⏱️ 12 часов

```typescript
// apps/web/src/app/(auth)/login/page.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    await login(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            {...register('email')}
            type="email"
            placeholder="Email"
            error={errors.email?.message}
          />
          <Input
            {...register('password')}
            type="password"
            placeholder="Password"
            error={errors.password?.message}
          />
          <Button type="submit" className="w-full" loading={isLoading}>
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}
```

**Tasks:**
- [ ] Создать Login page
- [ ] Создать Register page
- [ ] Создать Forgot password page
- [ ] Создать Reset password page
- [ ] Реализовать auth forms с validation
- [ ] Создать `useAuth` hook для auth state
- [ ] Настроить protected routes
- [ ] Добавить redirect после login
- [ ] Добавить loading states
- [ ] Добавить error handling

**5. Auth State Management** ⏱️ 6 часов

```typescript
// apps/web/src/stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthStore {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      setTokens: (accessToken, refreshToken) => {
        set({ accessToken });
        // Store refresh token in httpOnly cookie
        document.cookie = `refreshToken=${refreshToken}; path=/; secure; httpOnly`;
      },
      logout: () => {
        set({ user: null, accessToken: null, isAuthenticated: false });
        document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }), // Only persist user, not tokens
    }
  )
);
```

**Tasks:**
- [ ] Создать auth store (Zustand)
- [ ] Реализовать token storage (access token in memory, refresh in httpOnly cookie)
- [ ] Создать API client с автоматическим добавлением auth header
- [ ] Реализовать automatic token refresh
- [ ] Создать `useAuth` hook
- [ ] Создать `ProtectedRoute` component

**6. Settings Page (Profile)** ⏱️ 8 часов
- [ ] Создать Settings layout
- [ ] Создать Profile tab (edit name, email, avatar)
- [ ] Создать Change password form
- [ ] Реализовать avatar upload
- [ ] Добавить form validation
- [ ] Добавить success/error toasts

---

### 📅 Week 4: Projects Management

#### Backend Tasks:

**7. Projects Module** ⏱️ 16 часов

```typescript
// apps/api/src/projects/projects.service.ts
@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, orgId: string, dto: CreateProjectDto) {
    return this.prisma.project.create({
      data: {
        name: dto.name,
        description: dto.description,
        clientName: dto.clientName,
        status: 'draft',
        organizationId: orgId,
        createdById: userId,
        projectMembers: {
          create: {
            userId,
            role: 'pm', // Creator becomes PM
          },
        },
      },
      include: {
        projectMembers: {
          include: { user: true },
        },
      },
    });
  }

  async findAllByOrg(orgId: string, filters?: ProjectFilters) {
    return this.prisma.project.findMany({
      where: {
        organizationId: orgId,
        status: filters?.status,
        // ... other filters
      },
      include: {
        projectMembers: {
          include: { user: true },
        },
        _count: {
          select: {
            artifacts: true,
            tasks: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const project = await this.prisma.project.findFirst({
      where: {
        id,
        projectMembers: {
          some: { userId },
        },
      },
      include: {
        projectMembers: {
          include: { user: true },
        },
        artifacts: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        tasks: {
          where: { status: { not: 'done' } },
          orderBy: { dueDate: 'asc' },
        },
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async update(id: string, userId: string, dto: UpdateProjectDto) {
    // Check permission
    await this.checkPermission(id, userId, 'update');
    
    return this.prisma.project.update({
      where: { id },
      data: dto,
    });
  }

  async addMember(projectId: string, userId: string, role: string) {
    return this.prisma.projectMember.create({
      data: {
        projectId,
        userId,
        role,
      },
    });
  }

  private async checkPermission(projectId: string, userId: string, action: string) {
    const member = await this.prisma.projectMember.findFirst({
      where: { projectId, userId },
    });

    if (!member || !this.hasPermission(member.role, action)) {
      throw new ForbiddenException('Insufficient permissions');
    }
  }

  private hasPermission(role: string, action: string): boolean {
    // Simple permission logic
    const permissions = {
      pm: ['create', 'read', 'update', 'delete', 'manage_members'],
      manager: ['read', 'update', 'manage_members'],
      member: ['read', 'update'],
      viewer: ['read'],
    };
    return permissions[role]?.includes(action) || false;
  }
}
```

**Tasks:**
- [ ] Создать Projects module
- [ ] Реализовать CRUD endpoints:
  - POST `/projects` - create
  - GET `/projects` - list (with filters)
  - GET `/projects/:id` - get single
  - PATCH `/projects/:id` - update
  - DELETE `/projects/:id` - delete (soft delete)
- [ ] Реализовать Project members management:
  - GET `/projects/:id/members` - list members
  - POST `/projects/:id/members` - add member
  - PATCH `/projects/:id/members/:userId` - update role
  - DELETE `/projects/:id/members/:userId` - remove member
- [ ] Добавить permission checks
- [ ] Реализовать filtering (status, search, date range)
- [ ] Реализовать pagination
- [ ] Написать unit tests
- [ ] Написать integration tests

#### Frontend Tasks:

**8. Projects Dashboard** ⏱️ 12 часов

```typescript
// apps/web/src/app/(dashboard)/projects/page.tsx
'use client';

import { useProjects } from '@/hooks/useProjects';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { CreateProjectDialog } from '@/components/projects/CreateProjectDialog';

export default function ProjectsPage() {
  const { projects, isLoading } = useProjects();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage your advertising campaigns</p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : projects.length === 0 ? (
        <EmptyState onCreateClick={() => setCreateDialogOpen(true)} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      <CreateProjectDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
      />
    </div>
  );
}
```

**Tasks:**
- [ ] Создать Projects dashboard page
- [ ] Создать ProjectCard component
- [ ] Добавить filters (status, search)
- [ ] Добавить sorting options
- [ ] Создать empty state
- [ ] Добавить loading skeletons
- [ ] Реализовать pagination

**9. Create Project Flow** ⏱️ 10 часов
- [ ] Создать CreateProjectDialog component
- [ ] Реализовать multi-step форму:
  - Step 1: Basic info (name, client, description)
  - Step 2: Timeline (start/end dates)
  - Step 3: Budget
  - Step 4: Team (add members)
- [ ] Добавить form validation
- [ ] Реализовать create project mutation
- [ ] Добавить success state и redirect
- [ ] Добавить error handling

**10. Project Detail Page** ⏱️ 12 часов

```typescript
// apps/web/src/app/(dashboard)/projects/[id]/page.tsx
'use client';

import { useProject } from '@/hooks/useProject';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectOverview } from '@/components/projects/ProjectOverview';
import { ArtifactsTab } from '@/components/projects/ArtifactsTab';
import { TasksTab } from '@/components/projects/TasksTab';
import { TeamTab } from '@/components/projects/TeamTab';

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const { project, isLoading } = useProject(params.id);

  if (isLoading) return <div>Loading...</div>;
  if (!project) return <div>Project not found</div>;

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{project.name}</h1>
        <p className="text-muted-foreground">{project.clientName}</p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="artifacts">Artifacts</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <ProjectOverview project={project} />
        </TabsContent>

        <TabsContent value="artifacts">
          <ArtifactsTab projectId={project.id} />
        </TabsContent>

        <TabsContent value="tasks">
          <TasksTab projectId={project.id} />
        </TabsContent>

        <TabsContent value="team">
          <TeamTab projectId={project.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

**Tasks:**
- [ ] Создать Project detail page layout
- [ ] Создать ProjectOverview component (stats, timeline, budget)
- [ ] Создать ArtifactsTab (list artifacts, placeholder for now)
- [ ] Создать TasksTab (list tasks, placeholder for now)
- [ ] Создать TeamTab (list members, add/remove)
- [ ] Реализовать edit project flow
- [ ] Добавить delete project confirmation
- [ ] Добавить status change dropdown

---

## ✅ Sprint 1 Definition of Done

**Backend:**
- [ ] Auth endpoints работают (register, login, refresh, logout)
- [ ] Projects CRUD endpoints работают
- [ ] Project members management работает
- [ ] Permission system работает
- [ ] API documentation обновлена (Swagger)
- [ ] Unit tests написаны (>80% coverage)
- [ ] Integration tests написаны

**Frontend:**
- [ ] Пользователь может зарегистрироваться
- [ ] Пользователь может войти в систему
- [ ] Пользователь может создать проект
- [ ] Пользователь видит список проектов
- [ ] Пользователь может открыть детали проекта
- [ ] Пользователь может редактировать проект
- [ ] Пользователь может добавлять членов команды
- [ ] Responsive design (desktop + mobile)
- [ ] Loading states везде
- [ ] Error handling везде

**Infrastructure:**
- [ ] CI pipeline проходит все checks
- [ ] Staging environment развернут
- [ ] Можно сделать полный E2E flow: register → create project → invite member

---

## 📊 Metrics to Track

### Development Velocity:
- Story points completed per sprint
- Burn-down chart
- Code review turnaround time

### Code Quality:
- Test coverage (target: >80%)
- Number of bugs in production
- Code review comments per PR

### Performance:
- API response times (<200ms p95)
- Frontend bundle size (<500KB)
- Lighthouse scores (>90)

---

## 🎯 Success Criteria для Sprint 0-1

**К концу Sprint 1 мы должны иметь:**

✅ Работающее веб-приложение где:
1. Новый пользователь может зарегистрироваться
2. Войти в систему
3. Создать свою организацию (автоматически)
4. Создать первый проект с базовой информацией
5. Пригласить другого пользователя в проект
6. Увидеть список своих проектов
7. Открыть детали проекта

✅ Качество кода:
- Все тесты проходят
- Linter без ошибок
- Code review process налажен

✅ Документация:
- API docs актуальна
- README с setup инструкциями
- Architectural decisions documented

✅ Готовность к Sprint 2:
- Команда понимает кодовую базу
- CI/CD работает стабильно
- Можно быстро итерировать

---

## 📞 Daily Standup Format

Каждый день в 10:00 (15 минут max):

**Каждый участник отвечает на 3 вопроса:**
1. Что сделал вчера?
2. Что планирую сегодня?
3. Есть ли блокеры?

**PM/Tech Lead:**
- Отслеживает прогресс по sprint board
- Помогает resolveблокеры
- Коммуницирует изменения приоритетов

---

## 🔄 Sprint Review & Retrospective

**В конце каждого спринта (пятница):**

**Sprint Review (1 час):**
- Demo готовой функциональности
- Сравнение с sprint goal
- Feedback от stakeholders

**Sprint Retrospective (1 час):**
- Что прошло хорошо? 👍
- Что можно улучшить? 🔧
- Action items на следующий спринт 📝

---

**Документ:** Sprint 0-1 Action Plan  
**Версия:** 1.0  
**Дата:** 23 октября 2025  
**Автор:** AI Assistant  

**Next Steps:** После завершения Sprint 1, перейти к Sprint 2: Artifacts System (Brief + AI)

