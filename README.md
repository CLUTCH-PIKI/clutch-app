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
Each workspace has its own `railway.json` file for independent deployment:
- **API**: Configured with persistent SQLite storage using Railway Volumes. Ensure you create a volume named `sqlite-data` and mount it to `/data` in the Railway dashboard.
- **Front**: Configured as a static site using `npx serve`.

#### Accessing the App
After a successful deployment on Railway:
1. Go to your **Railway Dashboard**.
2. Select your project and click on the **Front** service.
3. In the **Settings** tab, look for the **Public Networking** section to find your generated URL (e.g., `clutch-front.up.railway.app`).
4. Repeat for the **API** service to find its public URL.
5. **Crucial**: Ensure you set the `VITE_API_URL` environment variable in your Front-end service settings to point to your API's public URL (including the `/api` suffix if applicable).

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