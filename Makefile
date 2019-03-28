APP_CONTAINER_NAME := web

setup:
	cp .env.example .env
	ln -sf `pwd`/scripts/pre-commit.sh .git/hooks/pre-commit
	chmod +x .git/hooks/pre-commit
	docker-compose up -d --build
	docker-compose exec ${APP_CONTAINER_NAME} npm run migrate-up

up:
	docker-compose up -d --build

test:
	docker-compose exec ${APP_CONTAINER_NAME} npm run test

migrate:
	docker-compose exec ${APP_CONTAINER_NAME} npm run migrate-up

eslint:
	docker-compose exec ${APP_CONTAINER_NAME} npm run eslint
