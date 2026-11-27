# Microservices Containerization

A hands-on project demonstrating how to run four Node.js microservices locally, containerize each service with Docker, and run the complete application using Docker Compose.

## Services and ports

| Service | Local/container port | Health-check endpoint |
|---|---:|---|
| User Service | 3000 | `http://localhost:3000/health` |
| Product Service | 3001 | `http://localhost:3001/health` |
| Order Service | 3002 | `http://localhost:3002/health` |
| Gateway Service | 3003 | `http://localhost:3003/health` |

The Gateway Service uses these environment variables to communicate with the other services:

- `USER_SERVICE_URL=http://user-service:3000`
- `PRODUCT_SERVICE_URL=http://product-service:3001`
- `ORDER_SERVICE_URL=http://order-service:3002`

## Prerequisites

- Node.js and npm (for running the services locally)
- Docker Desktop or Docker Engine
- Docker Compose

## Expected project structure

```text
Microservices/
├── user-service/
│   ├── Dockerfile
│   └── package.json
├── product-service/
│   ├── Dockerfile
│   └── package.json
├── order-service/
│   ├── Dockerfile
│   └── package.json
├── gateway-service/
│   ├── Dockerfile
│   └── package.json
└── docker-compose.yml
```

Keep each service's application files in its corresponding directory. The Docker build commands below assume you run them from that service directory.

## 1. Run and test all services locally

Open a separate terminal for each service.

### 1.1 User Service

```powershell
cd user-service
npm install
npm start
```

Test its health endpoint from another terminal:

```powershell
curl.exe http://localhost:3000/health
```

Expected response:

```json
{"service":"user-service","status":"UP"}
```

### 1.2 Product Service

```powershell
cd product-service
npm install
npm start
```

Test:

```powershell
curl.exe http://localhost:3001/health
```

Expected response:

```json
{"service":"product-service","status":"UP"}
```

### 1.3 Order Service

```powershell
cd order-service
npm install
npm start
```

Test:

```powershell
curl.exe http://localhost:3002/health
```

Expected response:

```json
{"service":"order-service","status":"UP"}
```

### 1.4 Gateway Service

```powershell
cd gateway-service
npm install
npm start
```

Test:

```powershell
curl.exe http://localhost:3003/health
```

Expected response:

```json
{"service":"gateway-service","status":"UP"}
```

## 2. Create Dockerfiles and run individual containers

Create a file named `Dockerfile` inside each service directory.

### 2.1 User Service Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

Build the image and verify it:

```powershell
docker build -t user-service:v1 .
docker images
```

Run the container and map host port 3000 to container port 3000:

```powershell
docker run -d --name user-container -p 3000:3000 user-service:v1
docker ps
```

Test the container:

```powershell
curl.exe http://localhost:3000/health
```

### 2.2 Product Service Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
```

Build and run:

```powershell
docker build -t product-service:v1 .
docker images
docker run -d --name product-container -p 3001:3001 product-service:v1
docker ps
```

Test:

```powershell
curl.exe http://localhost:3001/health
```

### 2.3 Order Service Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

EXPOSE 3002

CMD ["npm", "start"]
```

Build and run:

```powershell
docker build -t order-service:v1 .
docker images
docker run -d --name order-container -p 3002:3002 order-service:v1
docker ps
```

Test:

```powershell
curl.exe http://localhost:3002/health
```

### 2.4 Gateway Service Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

EXPOSE 3003

CMD ["npm", "start"]
```

Build and run:

```powershell
docker build -t gateway-service:v1 .
docker images
docker run -d --name gateway-container -p 3003:3003 gateway-service:v1
docker ps
```

Test:

```powershell
curl.exe http://localhost:3003/health
```

## 3. Stop and remove individual containers

Stop the four running containers:

```powershell
docker stop user-container product-container order-container gateway-container
```

Remove them:

```powershell
docker rm user-container product-container order-container gateway-container
```

Check that no project containers remain running:

```powershell
docker ps
```

## 4. Create the Docker Compose file

At the project root (the directory containing all four service folders), create `docker-compose.yml`:

```yaml
services:
  # User Service
  user-service:
    build:
      context: ./user-service
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    networks:
      - microservices-network

  # Product Service
  product-service:
    build:
      context: ./product-service
      dockerfile: Dockerfile
    ports:
      - "3001:3001"
    networks:
      - microservices-network

  # Order Service
  order-service:
    build:
      context: ./order-service
      dockerfile: Dockerfile
    ports:
      - "3002:3002"
    networks:
      - microservices-network

  # Gateway Service
  gateway-service:
    build:
      context: ./gateway-service
      dockerfile: Dockerfile
    ports:
      - "3003:3003"
    environment:
      USER_SERVICE_URL: http://user-service:3000
      PRODUCT_SERVICE_URL: http://product-service:3001
      ORDER_SERVICE_URL: http://order-service:3002
    depends_on:
      - user-service
      - product-service
      - order-service
    networks:
      - microservices-network

# Shared Docker network
networks:
  microservices-network:
    driver: bridge
```

## 5. Build and start all services with Docker Compose

Run these commands from the directory containing `docker-compose.yml`:

```powershell
docker compose up --build -d
docker compose ps
```

`docker compose up --build -d` builds the service images if needed and starts the containers in detached mode. `docker compose ps` displays the Compose services and their status.

## 6. Test the application through the Gateway

Run these commands:

```powershell
curl.exe http://localhost:3003/api/users
curl.exe http://localhost:3003/api/products
curl.exe http://localhost:3003/api/orders
```

The document's screenshots show example responses from the three API routes, including user, product, and order data.

## 7. Useful Docker Compose commands

```powershell
# View running services
docker compose ps

# View logs
docker compose logs

# Follow logs
docker compose logs -f

# Stop and remove the Compose containers and network
docker compose down
```

## Screenshots

The original document's screenshots are included in the `images/` folder and numbered in the order they appear in the document. The images below use those exact sequential filenames.


### Image 1

![Image 1](images/1.png)

### Image 2

![Image 2](images/2.png)

### Image 3

![Image 3](images/3.png)

### Image 4

![Image 4](images/4.png)

### Image 5

![Image 5](images/5.png)

### Image 6

![Image 6](images/6.png)

### Image 7

![Image 7](images/7.png)

### Image 8

![Image 8](images/8.png)

### Image 9

![Image 9](images/9.png)

### Image 10

![Image 10](images/10.png)

### Image 11

![Image 11](images/11.png)

### Image 12

![Image 12](images/12.png)

### Image 13

![Image 13](images/13.png)

### Image 14

![Image 14](images/14.png)

### Image 15

![Image 15](images/15.png)

### Image 16

![Image 16](images/16.png)

### Image 17

![Image 17](images/17.png)

### Image 18

![Image 18](images/18.png)

### Image 19

![Image 19](images/19.png)

### Image 20

![Image 20](images/20.png)

### Image 21

![Image 21](images/21.png)

### Image 22

![Image 22](images/22.png)

### Image 23

![Image 23](images/23.png)

### Image 24

![Image 24](images/24.png)

### Image 25

![Image 25](images/25.png)

### Image 26

![Image 26](images/26.png)

### Image 27

![Image 27](images/27.png)
