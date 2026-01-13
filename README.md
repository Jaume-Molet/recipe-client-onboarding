# 🛰️ Recipe Management Client

A React frontend for the Recipe Management System. This project was built as part of the Frontend Engineering Onboarding to demonstrate proficiency with the Perk stack, legacy constraints, and strict architectural standards.

https://www.loom.com/share/eb2ffb02dc4a4926a1f0ef0149aa320f

## 📋 Project Overview

This application provides a user interface for creating, viewing, editing, and deleting recipes. It interacts with the Django Backend Service via REST API.

**Key Constraints & Decisions:**
* **React 17**: Downgraded from v19 to ensure stability with the mandated `react-router-dom@5.2.0`.
* **React Router v5**: Strictly adhered to v5 routing logic (`useHistory`, `<Switch>`) as per production requirements.
* **Suitcase UI**: The Design System is **vendored** locally to simulate a monorepo environment while running as a standalone artifact.
* **Build Tool**: Vite (used via `create-react-app` modern replacement) for fast HMR, while maintaining backward compatibility with the legacy React stack.

## 🛠️ Tech Stack

* **Core**: React 17.0.2
* **Routing**: React Router DOM 5.2.0
* **Styling**: @suitcase (Internal Design System)
* **Build**: Vite + pnpm
* **Language**: TypeScript
* **Testing**: Vitest + React Testing Library

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16+ recommended)
- **pnpm** (v8+)
  ```bash
  npm install -g pnpm
  ```
- **Backend Service**: The Django `django-onboarding` service must be running on `http://localhost:8000`

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:Jaume-Molet/recipe-client-onboarding.git
   cd recipe-client
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the Development Server**
   ```bash
   pnpm dev
   ```
   The app will start at `http://localhost:5173`.

### Backend Dependency

This frontend requires the Django backend to be running. Before starting the frontend:

1. Ensure the Django backend is running (see `django-onboarding/README.md`) at https://github.com/travelperk/django-onboarding/pull/58
2. Verify the backend API is accessible:
   ```bash
   curl http://localhost:8000/api/recipes
   ```

The frontend is configured to proxy API requests to `/api` which should be handled by your backend server or a proxy configuration.

## 📁 Project Structure

```
src/
├── api/                    # API client layer
│   ├── client.ts          # API functions (getRecipes, createRecipe, etc.)
│   └── dtos.ts            # TypeScript DTOs matching backend schemas
├── features/              # Feature-based organization
│   ├── RecipeList.tsx    # Recipe list view
│   ├── RecipeForm/       # Recipe creation/editing form
│   └── RecipeDetail/      # Individual recipe detail view
├── suitcase/              # Vendored Suitcase Design System
│   ├── atoms/            # Atomic components (Button, Card, TextInput, etc.)
│   ├── hooks/            # Custom React hooks
│   ├── tokens/           # Design tokens (spacing, colors, typography)
│   └── utils/            # Utility functions
├── App.tsx               # Root component with routing
└── main.tsx              # Application entry point
```

## 🧪 Development

### Running the Development Server

```bash
pnpm dev
```

The development server will start with hot module replacement (HMR) enabled.

### Running Tests

```bash
# Run tests once
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run tests with UI
pnpm test:ui
```

### Building for Production

```bash
pnpm build
```

The production build will be output to the `dist/` directory.

### Preview Production Build

```bash
pnpm preview
```

## 🎨 Features

### Recipe List (`/`)
- View all recipes in a card-based layout
- Navigate to individual recipes
- Create new recipes

### Recipe Detail (`/recipes/:id`)
- View full recipe details (name, author, ingredients)
- Edit recipe (add ingredients)
- Delete recipe (author only)
- Navigate back to recipe list

### Recipe Form (`/recipes/new` or `/recipes/:id/edit`)
- Create new recipes with name, author, and ingredients
- Edit existing recipes (add ingredients only)
- Form validation
- Error handling

## 🔌 API Integration

The frontend communicates with the backend via REST API:

- **GET** `/api/recipes` - List all recipes
- **GET** `/api/recipes/:id` - Get recipe details
- **POST** `/api/recipes` - Create new recipe
- **PATCH** `/api/recipes/:id` - Add ingredients to recipe
- **DELETE** `/api/recipes/:id` - Delete recipe

All API calls use the `author_name` field for user identification (instead of UUIDs) to provide a better user experience.

## 🏗️ Architecture

This project follows **Perk's Frontend Architecture** principles:

- **Feature-based organization**: Components organized by feature, not by type
- **Vertical microfrontend split**: Each page is a complete feature (ready for microfrontend extraction)
- **Design System usage**: All UI components from Suitcase design system
- **React Router v5**: Using production-mandated version 5.2.0
- **Hooks-only**: No class components, using React hooks exclusively

## 🐛 Troubleshooting

### Backend Connection Errors

If you see API errors:

1. Verify the backend is running: `curl http://localhost:8000/api/recipes`
2. Check browser console for CORS errors
3. Ensure backend CORS settings allow requests from `http://localhost:5173`

### Port Already in Use

If port 5173 is already in use, Vite will automatically try the next available port. Check the terminal output for the actual port.

### Build Errors

- Clear `node_modules` and reinstall: `rm -rf node_modules pnpm-lock.yaml && pnpm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

### TypeScript Errors

- Ensure all dependencies are installed: `pnpm install`
- Check that `tsconfig.json` is properly configured

## 📝 Development Notes

- The project uses React 17 for compatibility with `react-router-dom@5.2.0`
- All routing uses React Router v5 patterns (`useHistory`, `<Switch>`, etc.)
- The Suitcase design system is vendored locally - do not modify these components
- API client uses `fetch` with proper error handling
- All components are functional components using hooks

## 🚢 Deployment

For production deployment:

1. Build the application: `pnpm build`
2. Serve the `dist/` directory using a static file server
3. Configure your server to proxy `/api/*` requests to the Django backend
4. Ensure CORS is properly configured on the backend

## 📚 Additional Resources

- [React Router v5 Documentation](https://v5.reactrouter.com/)
- [Vite Documentation](https://vitejs.dev/)
- [Vitest Documentation](https://vitest.dev/)
