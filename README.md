# Clutch

Clutch est une plateforme d'opinion granulaire et d'assistance promotionnelle.

## Vision
Clutch est l'antidote à la saturation publicitaire : la clarté face au bruit. Elle permet aux consommateurs de faire des choix en pleine conscience grâce à des avis vérifiés et détaillés.

## Fonctionnalités
- **Opinion Granulaire** : Avis consommateurs vérifiés et sincères.
- **Loops** : Loteries exclusives pour récompenser la collaboration, co-animées avec des influenceurs.
- **Insights & R&D** : Outils pour les marques pour accéder aux insights de notation et à une bibliothèque UGC (Clutch UGC Program).

## Getting Started

This project uses npm workspaces. You can run both the API and Front-end simultaneously from the root.

### Prerequisites
- Node.js (latest LTS recommended)
- npm

### Installation
```bash
npm install
```

### Development
To launch both apps at the same time:
```bash
npm run dev
```
- **API**: [http://localhost:3000](http://localhost:3000)
- **Front**: [http://localhost:4000](http://localhost:4000)

### Environments
The project uses different branches for environments:
- `dev`: Development environment.
- `staging`: Staging environment for pre-production testing.
- `prod`: Production environment.

Environment variables are managed via `.env.{environment}` files in each workspace.

### Deployment
The project is configured for deployment on **Railway**.

#### Railway Configuration (CRITICAL)
The project MUST be deployed as **two separate services** on Railway to function correctly:

1.  **API Service**:
    *   **Settings > Root Directory**: Set to `api`.
    *   **Settings > Public Networking**: Generate a domain (e.g., `api-clutch.up.railway.app`).
    *   **Settings > Variables**:
        *   `DATABASE_PATH`: `/app/data/clutch.db` (should match `api/railway.json`).
        *   `NEXT_PUBLIC_APP_URL`: The URL of your **Front** service.
    *   **Volumes**: Create a volume named `sqlite-data` and mount it to `/app/data`.

2.  **Front Service**:
    *   **Settings > Root Directory**: Set to `front`.
    *   **Settings > Public Networking**: Generate a domain (e.g., `clutch.up.railway.app`).
    *   **Settings > Variables**:
        *   `VITE_API_URL`: The URL of your **API** service + `/api` (e.g., `https://api-clutch.up.railway.app/api`).

#### Why two services?
Railway services bind to the `$PORT` environment variable. In a monorepo, if you deploy as one service, only one process can bind to the port. Splitting them into two services allows each to have its own port and public URL.

#### Troubleshooting 502 Errors
- **Health Checks**: The API uses `/health` and the Front uses `/` for health checks. Ensure these are configured in the Railway dashboard if you are not using the provided `railway.json` files.
- **Port Binding**: Ensure your services are listening on `0.0.0.0` and the port provided by Railway (`$PORT`). This is already handled in the `package.json` start scripts.
- **Database**: If the API fails to start, check the logs for database initialization errors. The app will fallback to an in-memory database if it cannot write to the volume, to prevent 502s.

#### Legacy Deployment
Netlify configurations are still present but Railway is the recommended platform for this monorepo.
- **Front**: Uses `front/netlify.toml`.
- **API**: Uses `api/netlify.toml`.

### Utility Commands
- `npm run dev:api`: Launch only the API.
- `npm run dev:front`: Launch only the Front-end.
- `npm run build`: Build both projects for development.
- `npm run build:staging`: Build both projects for staging.
- `npm run build:prod`: Build both projects for production.
- `npm run lint`: Lint both projects.
- `npm run test`: Run tests for both projects.