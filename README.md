# Product Inventory Panel

This is a simple inventory management panel for products.

## Overview

This project is a web application that allows users to view, search, and add products. It's built using a modern frontend stack:

- **Framework**: React with Vite for a fast development experience.
- **Language**: TypeScript for type safety.
- **Styling**: Tailwind CSS for utility-first styling, with `shadcn/ui` components.
- **Data Fetching & State Management**: TanStack Query (React Query) for managing server state and caching, and Zustand for global client state.
- **Routing**: TanStack Router for type-safe routing.
- **Forms**: React Hook Form for performant form handling, with Zod for schema validation.
- **Backend**: The application uses the `dummyjson.com` API for product data, so it's a frontend-only application demonstrating CRUD operations against a fake API.

## Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd product-inventory-panel
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## Time Taken

The project was developed over multiple sessions with a development time of approximately 4 hours. 

## Limitations and TODOs

- **Newly Added Products**: Newly added products are saved in `localStorage` and will only appear on the first page of the products table when no filters are applied. They are not persisted to a database.
- **No Edit/Delete**: The functionality to edit a product has not been implemented.

---
