# FullStackOpen - Next.js

## Table of Contents
- [Blogs List](#blogs-list)
- [Notes app](#notes-app)


## Blogs List

### Screenshots

<img src="./blogs-list/img/blogs-list-view.png" alt="Blogs List page view" width="325" />
<img src="./blogs-list/img/blog-details-view.png" alt="Blogs details view" width="300" />

### Setup

- Generate a secret key to sign the JWT session tokens
  ```bash
  echo "$(openssl rand -base64 32)"
  ```

- Create an `.env.local` file on the root of your project, add a Neon DB url
  ```conf
  DATABASE_URL="postgresql://<username>:<password>@<hostname>/neondb?channel_binding=require&sslmode=require"
  AUTH_SECRET=your_secret_auth_token
  ```

- Install dependencies
  ```bash
  cd ./blogs-list && npm install
  ```

- Run the migrations
  ```bash
  npx drizzle-kit migrate
  ```

### Usage

#### Development mode

- Start the app (supports hot reloading)
  ```bash
  npm run dev
  ```

- Web UI on http://localhost:3000

#### Production mode

- Build the app
  ```bash
  npm run build
  ```

- Start it
  ```bash
  npm run start
  ```

- Web UI on http://localhost:3000

#### Database access

- Drizzle Studio UI
  ```bash
  npx drizzle-kit studio
  ```

- Access on https://local.drizzle.studio


## Notes app

### Setup

- Generate a secret key to sign the JWT session tokens
  ```bash
  echo "$(openssl rand -base64 32)"
  ```

- Create an `.env.local` file on the root of your project, add a Neon DB url
  ```conf
  DATABASE_URL="postgresql://<username>:<password>@<hostname>/neondb?channel_binding=require&sslmode=require"
  AUTH_SECRET=your_secret_auth_token
  ```  

- Install dependencies
  ```bash
  cd ./notes-app && npm install
  ```

### Usage

#### Development mode

- Start the app (supports hot reloading)
  ```bash
  npm run dev
  ```

- Web UI on http://localhost:3000

#### Production mode

- Build the app
  ```bash
  npm run build
  ```

- Start it
  ```bash
  npm run start
  ```

- Web UI on http://localhost:3000
