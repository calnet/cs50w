# CS50 Capstone - Accounting System Development Guide

Full-stack ERP/Accounting application: Django REST API backend + React TypeScript frontend for CS50's capstone requirements.

## Architecture Overview

**Backend**: Django 4.2 + SQLite + Django REST Framework

-   Apps: `banking`, `customers`, `suppliers`, `ledgers`, `users`
-   Custom user model with email authentication
-   API endpoints with serializers and viewsets
-   CORS enabled for frontend integration

**Frontend**: React 18 + TypeScript + Vite + Material-UI

-   Component-based architecture with lazy loading
-   React Router v6 for navigation
-   Axios for HTTP requests
-   Custom theme with Material-UI components

## Development Commands

```bash
# Start both servers
./start-servers.sh

# Backend only
cd backend && python manage.py runserver 0.0.0.0:8000

# Frontend only
cd frontend && npm run dev -- --host 0.0.0.0
```

## Backend Patterns

### Model Structure

-   Base fields: `created_at`, `updated_at` (auto timestamps)
-   Financial amounts: `DecimalField(max_digits=10, decimal_places=2)`
-   String representations via `__str__` method
-   Verbose plural names in Meta class

### API Endpoints

-   Function-based views with `@api_view(['GET', 'POST'])`
-   DRF serializers with custom field methods
-   `update_or_create` pattern for upserts
-   Consistent error handling and status codes

### Key Models

-   `CustomUser`: Email-based authentication
-   `BankAccount`: Financial account management
-   `Customer/Supplier`: Account management with balances
-   `CoaCategory/NominalType/NominalCode`: Chart of accounts structure
-   `CoaLayout`: Nominal code range definitions

## Frontend Patterns

### Component Organization

```
ComponentName/
├── index.tsx          # Export wrapper
├── ComponentName.tsx  # Main implementation
├── components/        # Sub-components
└── hooks/            # Custom hooks
```

### Route Configuration

-   Lazy loading with `Loadable` wrapper
-   Nested routes: `/module/subview`
-   Routes in `/routes/MainRoutes.tsx`

### TypeScript Conventions

-   Strict interface definitions for props
-   `OverridableComponent<SvgIconTypeMap>` for Material-UI icons
-   Proper typing for API responses and state

### Material-UI Integration

-   Custom theme in `/themes/index.tsx`
-   `sx` prop for styling over CSS classes
-   Consistent spacing and color palette
-   Icon components from `@mui/icons-material`

### State Management

-   Local state with `useState` for components
-   Context API for shared state (SidebarContext)
-   Custom hooks for data fetching logic

## Project-Specific Conventions

### Menu System

-   Menu items in `/menu-items/` with type definitions
-   Support for `hidden` property to conditionally show/hide
-   Icon components properly typed as React components

### Navigation Components

-   `NavItem`: Individual menu items with Material-UI styling
-   `NavGroup`: Grouped menu sections
-   `ModuleCard`: Dashboard cards with navigation

### API Integration

-   Base URL: `http://localhost:8000/api/`
-   Axios interceptors for error handling
-   TypeScript interfaces for API responses

### File Naming

-   PascalCase for components (`Dashboard.tsx`)
-   camelCase for hooks (`useDashboardData.tsx`)
-   kebab-case for routes (`/coa/coa-layout`)

## Common Patterns

### Data Grid Component

```tsx
// Standard data grid with Material-UI Table
<TableContainer>
    <Table size="small">
        <TableHead>
            <TableRow>
                {columns.map((col) => (
                    <TableCell key={col.key}>{col.label}</TableCell>
                ))}
            </TableRow>
        </TableHead>
        <TableBody>
            {data.map((row) => (
                <TableRow key={row.id} hover>
                    {/* Row cells */}
                </TableRow>
            ))}
        </TableBody>
    </Table>
</TableContainer>
```

### Dialog Pattern

```tsx
// Form dialogs with validation
const [open, setOpen] = useState(false);
const [formData, setFormData] = useState(initialData);

// Dialog with form submission
<Dialog open={open} onClose={() => setOpen(false)}>
    <DialogTitle>Form Title</DialogTitle>
    <DialogContent>{/* Form fields */}</DialogContent>
    <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
    </DialogActions>
</Dialog>;
```

### API Call Pattern

```tsx
// Custom hook for data fetching
const useFetchData = (url: string) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                setData(response.data);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [url]);

    return { data, loading };
};
```

## Key Integration Points

### CORS Configuration

```python
# Backend settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
```

### API URL Configuration

```typescript
// Frontend config
const hostname = window.location.hostname;
const apiUrl = `http://${hostname}:8000/api/`;
```

## Development Notes

-   SQLite database for development
-   Custom user model with email authentication
-   Material-UI theme customization in `/themes/`
-   Responsive design with Material-UI Grid system
-   Form validation with error handling
-   Loading states and error boundaries

## Build Process

-   Frontend: TypeScript compilation + Vite bundling
-   Backend: Django static file collection
-   Development: Hot reload for both frontend and backend
-   Production: Static file serving and WSGI deployment

Focus on clean separation of concerns, proper TypeScript usage, and Material-UI best practices for professional accounting application development.
