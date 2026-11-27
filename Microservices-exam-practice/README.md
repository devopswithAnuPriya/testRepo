# Microservices – Docker Exam Practice Repository

This sample project follows the source-code layout shown in the supplied screenshot: `gateway-service`, `order-service`, `product-service`, and `user-service`. Each service contains `app.js` and `package.json`.

## Services and endpoints

| Service | Port | Main endpoint | Health endpoint |
|---|---:|---|---|
| User | 3000 | `/users` | `/health` |
| Product | 3001 | `/products` | `/health` |
| Order | 3002 | `/orders` | `/health` |
| Gateway | 3003 | `/api/users`, `/api/products`, `/api/orders` | `/health` |

## Folder layout

```text
Microservices-exam-practice/
├── Microservices/
│   ├── gateway-service/
│   │   ├── app.js
│   │   ├── package.json
│   │   └── Dockerfile          # TODO template
│   ├── order-service/
│   ├── product-service/
│   ├── user-service/
│   └── docker-compose.yml      # TODO template
├── reference-solution/
│   ├── gateway-service/
│   ├── order-service/
│   ├── product-service/
│   ├── user-service/
│   └── docker-compose.yml
└── README.md
```

## Prerequisites

- Docker Desktop installed and running.
- VS Code recommended.
- Node.js is not required on the host if you run the application using Docker.

## Practice before looking at the solution

1. Open the `Microservices` folder in VS Code.
2. Read each `app.js` and `package.json`.
3. Complete the Dockerfile in each service folder.
4. Complete `Microservices/docker-compose.yml`.
5. Validate and run your solution using the commands below.

From PowerShell, change directory into the `Microservices` folder:

```powershell
cd path\to\Microservices
docker compose config
docker compose up --build -d
docker compose ps
```

Test the APIs:

```powershell
Invoke-RestMethod http://localhost:3000/users
Invoke-RestMethod http://localhost:3001/products
Invoke-RestMethod http://localhost:3002/orders
Invoke-RestMethod http://localhost:3003/api/users
Invoke-RestMethod http://localhost:3003/api/products
Invoke-RestMethod http://localhost:3003/api/orders
```

Stop the application:

```powershell
docker compose down
```

## Check the reference solution

Only after attempting the task, open `reference-solution/`. From PowerShell:

```powershell
cd path\to\reference-solution
docker compose config
docker compose up --build -d
docker compose ps
```

Test the same endpoints using `localhost`, then stop it with `docker compose down`.

## Troubleshooting

- **Docker engine not running:** open Docker Desktop and wait for the engine to start.
- **Port already allocated:** stop the other container/application using that port.
- **Gateway returns 502:** check `docker compose logs gateway-service`; Gateway must use service DNS names such as `http://user-service:3000`, not `localhost`.
- **Container exits:** run `docker compose logs <service-name>`.
- **Build cannot find a file:** check that `build` points to the correct service folder and that `package.json`, `app.js`, and `Dockerfile` are present.
- **Changes not reflected:** run `docker compose up --build -d`.

## Important concept

Inside a container, `localhost` means that same container. Containers on the shared Compose network reach one another using Compose service names. From your Windows host, use `localhost` with the published ports.
