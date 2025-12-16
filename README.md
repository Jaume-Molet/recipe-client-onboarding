# 🛰️ Recipe Management Client

A React frontend for the Recipe Management System. This project was built as part of the Frontend Engineering Onboarding to demonstrate proficiency with the Perk stack, legacy constraints, and strict architectural standards.

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

## 🚀 Getting Started

### Prerequisites
* Node.js (v16+ recommended)
* pnpm (v8+)
* **Backend Service**: Ensure the Django `onboarding-recipes` service is running on `http://localhost:8000`.

### Installation

1.  **Clone the repository**
    ```bash
    git clone git@github.com:travelperk/recipe-client-jaume.git
    cd recipe-client-jaume
    ```

2.  **Install dependencies**
    ```bash
    pnpm install
    ```

3.  **Run the Development Server**
    ```bash
    pnpm dev
    ```
    The app will start at `http://localhost:5173`.

