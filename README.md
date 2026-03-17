# Travel@Toulouse

Plateforme de location de logements courte durée à Toulouse — projet portfolio full-stack.

## Stack

| Couche | Technologie |
|--------|-------------|
| Frontend | Angular 21 (standalone components, signals, SCSS) |
| Backend | Node.js + Express 5 + TypeScript |
| ORM | Prisma |
| Base de données | PostgreSQL |

## Structure du projet

```
Travel@Toulouse/
├── front/          # Application Angular
└── back/           # API REST Node.js
    ├── src/
    │   └── index.ts
    ├── prisma/
    │   └── schema.prisma
    └── .env.example
```

## Modèle de données

```prisma
Property   # Logement (titre, description, quartier, prix/nuit, capacité)
  └── Image[]     # Photos du logement
  └── Amenity[]   # Équipements (WiFi, parking, piscine…)
```

## Lancer le projet

### Prérequis

- Node.js 22+
- PostgreSQL

### Backend

```bash
cd back
cp .env.example .env
# Renseigner DATABASE_URL dans .env

npm install
npx prisma migrate dev
npm run dev
```

L'API démarre sur `http://localhost:3000`.

### Frontend

```bash
cd front
npm install
ng serve
```

L'application démarre sur `http://localhost:4200`.

## API

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/health` | Sanity check |
| GET | `/properties` | Liste des logements |

## Variables d'environnement

Copier `back/.env.example` en `back/.env` et renseigner :

```env
DATABASE_URL="postgresql://user:password@localhost:5432/travel_toulouse"
PORT=3000
```
