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

#### Railway Configuration
The project is designed to be deployed as **two separate services** on Railway from this single repository:

1.  **API Service**:
    *   **Root Directory**: Set to `api` in Railway Settings.
    *   **Config**: Uses `api/railway.json`.
    *   **Persistence**: Ensure you create a volume named `sqlite-data` and mount it to `/app/data` (as defined in `api/railway.json`).
2.  **Front Service**:
    *   **Root Directory**: Set to `front` in Railway Settings.
    *   **Config**: Uses `front/railway.json`.

#### Why two services?
By default, Railway might try to deploy the whole repository as one app if it finds a root `package.json`. However, since the API (Next.js) and Front (Vite) need to bind to different ports, they must be separate services to be reachable via their own public URLs.

#### Accessing the App
After deploying both services:
1.  Go to your **Railway Dashboard**.
2.  Select your **Front** service. In **Settings > Public Networking**, find your URL (e.g., `clutch-front.up.railway.app`).
3.  Select your **API** service. In **Settings > Public Networking**, find your URL (e.g., `clutch-api.up.railway.app`).
4.  **Crucial**: In the **Front** service **Variables**, update `VITE_API_URL` to `https://<your-api-url>/api`.
5.  In the **API** service **Variables**, update `NEXT_PUBLIC_APP_URL` to `https://<your-front-url>`.

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