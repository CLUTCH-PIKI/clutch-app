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
Both apps are configured for deployment on **Netlify**.
- **Front**: Uses `front/netlify.toml` (Vite SPA configuration).
- **API**: Uses `api/netlify.toml` (Next.js with Netlify plugin).

### Utility Commands
- `npm run dev:api`: Launch only the API.
- `npm run dev:front`: Launch only the Front-end.
- `npm run build`: Build both projects for development.
- `npm run build:staging`: Build both projects for staging.
- `npm run build:prod`: Build both projects for production.
- `npm run lint`: Lint both projects.
- `npm run test`: Run tests for both projects.