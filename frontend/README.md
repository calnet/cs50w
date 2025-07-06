# Frontend – React + TypeScript + Vite

This is the frontend for my Capstone Accountancy Project, built with React, TypeScript, and Vite. It uses Material-UI (MUI) for UI components and Axios for API requests.

## Getting Started

### Prerequisites

-   Node.js (v18 or higher recommended)
-   npm (v9 or higher)

### Installation

```bash
cd frontend
npm install
```

### Development

To start the development server with hot module replacement:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or as specified in the terminal).

### Build

To build the app for production:

```bash
npm run build
```

### Linting

To check code quality:

```bash
npm run lint
```

## Project Structure

-   `src/` – Main source code
    -   `App.tsx` – App entry point
    -   `routes/` – Route definitions
    -   `layout/` – Layout components (Header, Sidebar, etc.)
    -   `views/` – Page components
    -   `contexts/` – React context providers
    -   `themes/` – MUI theme configuration
    -   `utils/` – Utility functions
    -   `types/` – TypeScript type definitions

## Features

-   React 18 with functional components
-   TypeScript for type safety
-   Vite for fast development
-   Material-UI (MUI) for UI
-   React Router for routing
-   Axios for API requests
-   Context API for state management
-   Code splitting with React.lazy

## Testing

Add tests using Jest and React Testing Library (recommended).

## Contributing

Pull requests are welcome! Please lint and test your code before submitting.

## License

[MIT](LICENSE)
