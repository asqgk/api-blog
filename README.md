# Api Blog

Tecnologias utilizadas: Typescript, Node.js, Redis, PostgreSQL, Docker

# Build:

Configurar .env e ormconfig.json

- yarn install

- yarn run typeorm migration:run

# Containers:

- docker run --name redis -p 6379:6379 -d -d redis:alpine

- docker run --name redis-client -v redisinsight:/db -p 8001:8001 -d -t redislabs/redisinsight:latest

- docker run --name postgres_blog -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
