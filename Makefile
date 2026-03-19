.PHONY: help dev build up down logs clean prod

help: ## Show this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

dev: ## Start development environment
	docker-compose -f docker-compose.dev.yml up --build

dev-d: ## Start development environment in detached mode
	docker-compose -f docker-compose.dev.yml up --build -d

prod: ## Start production environment
	docker-compose up --build -d

prod-local: ## Start production with local database
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d

build: ## Build production image
	docker build -t coffee-machine-vercel .

up: ## Start containers
	docker-compose up -d

down: ## Stop containers
	docker-compose down

logs: ## Show logs
	docker-compose logs -f

logs-app: ## Show app logs
	docker-compose logs -f app

logs-db: ## Show database logs
	docker-compose logs -f postgres

clean: ## Clean up containers and images
	docker-compose down -v
	docker system prune -f

migrate: ## Run database migrations
	docker-compose exec app npx prisma migrate deploy

seed: ## Seed database
	docker-compose exec app npm run db:seed

shell: ## Open shell in app container
	docker-compose exec app sh

db-shell: ## Open database shell
	docker-compose exec postgres psql -U postgres -d coffee_machine

install: ## Install dependencies
	npm install

test: ## Run tests
	npm test

test-e2e: ## Run E2E tests
	npm run test:e2e

lint: ## Run linting
	npm run lint

deploy-vercel: ## Deploy to Vercel
	npx vercel --prod

deploy-local: ## Deploy local production
	@echo "Local production environment running on http://localhost"
	@echo "App: http://localhost:3000"
	@echo "Nginx: http://localhost:80"
	@echo "Database: localhost:5433"
