# CS50 Capstone Project - Accounting Application

A comprehensive accounting application built with Django REST Framework backend and React TypeScript frontend.

## 📋 Repository Information

-   **Repository**: [cs50w](https://github.com/calnet/cs50w)
-   **Branch**: `web50/projects/2020/x/capstone`
-   **Course**: CS50's Web Programming with Python and JavaScript
-   **Project**: Final Capstone Project
-   **Author**: calnet
-   **Year**: 2025

## 🚀 Features

### Core Functionality

-   **Customer Management**: Full CRUD operations for customer accounts
-   **Supplier Management**: Manage supplier relationships and accounts
-   **Banking Integration**: Bank account management and reconciliation
-   **Chart of Accounts**: Flexible account structure with nominal codes
-   **Transaction Management**: Complete transaction processing system
-   **Financial Reporting**: Basic reporting capabilities

### Technical Features

-   **REST API**: Comprehensive API with Django REST Framework
-   **Modern Frontend**: React 18 with TypeScript and Material-UI
-   **Authentication**: JWT-based authentication system
-   **Data Grid**: Advanced data grid with Material-UI X
-   **Responsive Design**: Mobile-friendly interface
-   **Development Scripts**: Automated setup and server management

## 🏗️ Architecture

```

├── backend/ # Django REST API
│ ├── users/ # User management & authentication
│ ├── customers/ # Customer operations
│ ├── suppliers/ # Supplier management
│ ├── banking/ # Bank account handling
│ ├── ledgers/ # Chart of accounts
│ ├── transactions/ # Transaction management
│ ├── management/ # Data management utilities
│ └── backend/ # Django settings & configuration
│
├── frontend/ # React TypeScript SPA
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── views/ # Page components
│ │ ├── contexts/ # React contexts
│ │ ├── utils/ # Utility functions
│ │ ├── types/ # TypeScript definitions
│ │ ├── services/ # API services
│ │ ├── layout/ # Layout components
│ │ ├── menu-items/ # Navigation configuration
│ │ ├── routes/ # Route definitions
│ │ ├── themes/ # Theme configuration
│ │ └── ui-component/ # Base UI components
│ └── public/
│
└── scripts/ # Development & deployment scripts

```

## 🛠️ Technology Stack

### Backend

-   **Django 4.1+**: Web framework
-   **Django REST Framework**: API development
-   **SQLite**: Database (development)
-   **JWT Authentication**: Secure API access via djangorestframework-simplejwt
-   **CORS Headers**: Cross-origin support
-   **Python Decouple**: Environment configuration management

### Frontend

-   **React 18**: UI library
-   **TypeScript**: Type safety
-   **Material-UI (MUI)**: Component library with Data Grid
-   **Vite**: Build tool and dev server
-   **Axios**: HTTP client
-   **React Router DOM**: Client-side routing

### Development Tools

-   **Black & Autopep8**: Python code formatting
-   **ESLint**: TypeScript/JavaScript linting
-   **Scripts**: Automated development workflows
-   **VS Code**: Development environment with devcontainer support

## 📋 Prerequisites

-   Node.js 18+ and npm
-   Python 3.11+
-   Git
-   VS Code (recommended for development)

## 🚀 Quick Start

### Automated Setup (Recommended)

1. **Clone the repository**

    ```zsh
    git clone https://github.com/calnet/cs50w.git
    cd capstone
    ```

2. **Run setup script**

    ```zsh
    chmod +x scripts/setup.sh
    ./scripts/setup.sh
    ```

3. **Start the servers**

    **Option A: Local Development (Manual)**

    ```zsh
    # Terminal 1: Start Django backend
    cd backend
    python3 manage.py runserver 0.0.0.0:8000

    # Terminal 2: Start React frontend
    cd frontend
    npm run dev -- --host 0.0.0.0 --port 5173
    ```

    **Option B: Using Scripts (DevContainer/Container Environment)**

    ```zsh
    # For devcontainer/container environments
    chmod +x scripts/start-backend.sh scripts/start-frontend.sh
    ./scripts/start-backend.sh    # Backend in background
    ./scripts/start-frontend.sh   # Frontend in background
    ```

    **Note**: The provided scripts are configured for container environments. For local development, use Option A or modify the script paths.

4. **Access the application**
    - Frontend: http://localhost:5173
    - Backend API: http://localhost:8000
    - Admin Panel: http://localhost:8000/admin

### Manual Development Setup

#### Backend Setup

1. **Create virtual environment**

    ```zsh
    cd backend
    python3 -m venv venv
    source venv/bin/activate
    ```

2. **Install dependencies**

    ```zsh
    pip install -r requirements.txt
    ```

3. **Configure environment**

    The project uses a `.env` file in the root directory for configuration. Make sure it exists with the proper Django settings:

    ```zsh
    # Check if .env exists
    ls -la .env

    # Edit .env with your preferred editor if needed
    code .env  # or nano .env, or vim .env
    ```

4. **Run migrations**

    ```zsh
    python3 manage.py migrate
    python3 manage.py createsuperuser
    ```

5. **Start development server**
    ```zsh
    # Start Django server on all interfaces (for container/network access)
    python3 manage.py runserver 0.0.0.0:8000
    ```

#### Frontend Setup

1. **Install dependencies**

    ```zsh
    cd frontend
    npm install
    ```

2. **Start development server**
    ```zsh
    # Start Vite dev server on all interfaces (matching the scripts)
    npm run dev -- --host 0.0.0.0 --port 5173
    ```

## 📖 API Documentation

### Authentication

All API endpoints (except authentication) require a valid JWT token.

```http
# Login
POST /api/auth/token/
{
  "email": "user@example.com",
  "password": "password"
}

# Refresh token
POST /api/auth/token/refresh/
{
  "refresh": "refresh_token_here"
}
```

### Core Endpoints

#### Customers

```http
GET    /api/customers/           # List customers
POST   /api/customers/           # Create customer
GET    /api/customers/{id}/      # Get customer
PUT    /api/customers/{id}/      # Update customer
DELETE /api/customers/{id}/      # Delete customer
```

#### Banking

```http
GET    /api/banking/             # List bank accounts
POST   /api/banking/             # Create bank account
```

#### Suppliers

```http
GET    /api/suppliers/           # List suppliers
POST   /api/suppliers/           # Create supplier
GET    /api/suppliers/{id}/      # Get supplier
PUT    /api/suppliers/{id}/      # Update supplier
DELETE /api/suppliers/{id}/      # Delete supplier
```

#### Transactions

```http
GET    /api/transactions/        # List transactions
POST   /api/transactions/        # Create transaction
GET    /api/transactions/{id}/   # Get transaction
PUT    /api/transactions/{id}/   # Update transaction
DELETE /api/transactions/{id}/   # Delete transaction
```

#### Chart of Accounts

```http
GET    /api/layouts/             # Account layouts
GET    /api/coa_categories/      # Account categories
GET    /api/nominal_types/       # Nominal types
GET    /api/nominal_codes/       # Nominal codes
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the project root directory:

```env
DEBUG=True
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///backend/db.sqlite3
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173

# For production
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

### Frontend Configuration

The frontend automatically detects the backend URL based on the environment:

-   Development: `http://localhost:8000`
-   Production: Configure in `src/services/api.ts`

## 🧪 Testing

### Backend Tests

```zsh
cd backend
python3 manage.py test
# Or with pytest
pytest
```

### Frontend Tests

```zsh
cd frontend
npm test
```

## 📦 Deployment

### Production Deployment

1. **Set environment variables**

    ```env
    DEBUG=False
    SECRET_KEY=production-secret-key
    DATABASE_URL=postgresql://...
    ALLOWED_HOSTS=yourdomain.com
    ```

2. **Install dependencies**

    ```zsh
    pip install -r requirements.txt
    cd frontend && npm install
    ```

3. **Run migrations**

    ```zsh
    cd backend
    python3 manage.py migrate
    python3 manage.py collectstatic
    ```

4. **Build frontend**
    ```zsh
    cd frontend
    npm run build
    ```

### Development Scripts

The project includes several automation scripts in the `scripts/` directory:

-   `setup.sh`: Initial project setup and dependency installation
-   `start-backend.sh`: Start Django backend server (port 8000)
-   `start-frontend.sh`: Start React frontend server (port 5173)
-   `start-servers.sh`: Attempt to start both servers
-   `servers-test.sh`: Run development servers in test mode

**Important**: These scripts are configured for DevContainer/container environments with paths like `/workspaces/capstone`. For local development on macOS, use the manual commands provided in the Quick Start section.

## 🔍 Development Guidelines

### Code Style

-   **Backend**: Follow PEP 8, use Black and Autopep8 formatters
-   **Frontend**: Use ESLint and Prettier
-   **TypeScript**: Strict mode enabled

### Project Structure

The project follows a clear separation between backend API and frontend SPA:

-   **Backend Apps**: Each Django app handles a specific domain (users, customers, etc.)
-   **Frontend Components**: Organized by feature with reusable UI components
-   **API Design**: RESTful endpoints with consistent naming conventions

### Git Workflow

1. Create feature branch: `git checkout -b dev/feature/new-feature`
2. Make changes and commit: `git commit -m "Add new feature"`
3. Push and create PR: `git push origin dev/feature/new-feature`

### Adding New Features

#### Backend (Django)

1. Create models in appropriate app
2. Add serializers for API representation
3. Create views with proper error handling
4. Add URL patterns
5. Write tests
6. Update API documentation

#### Frontend (React)

1. Create TypeScript interfaces
2. Add API service methods
3. Create React components
4. Add routing if needed
5. Update navigation
6. Write tests

## 🐛 Troubleshooting

### Common Issues

**CORS Errors**

-   Ensure frontend URL is in `CORS_ALLOWED_ORIGINS`
-   Check that both servers are running

**Database Issues**

-   Run migrations: `python3 manage.py migrate`
-   Reset database: `python3 manage.py flush`

**Build Errors**

-   Clear node_modules: `rm -rf node_modules && npm install`
-   Clear browser cache and restart dev server

**Script Permission Issues**

-   Make scripts executable: `chmod +x scripts/*.sh`
-   Run setup script: `./scripts/setup.sh`

### Debug Mode

Enable Django debug toolbar in development:

```python
# backend/settings.py
if DEBUG:
    INSTALLED_APPS += ['debug_toolbar']
    MIDDLEWARE += ['debug_toolbar.middleware.DebugToolbarMiddleware']
```

### Using Development Scripts

**For Container/DevContainer Environments:**

```zsh
# Start individual servers (recommended)
./scripts/start-backend.sh    # Django on port 8000
./scripts/start-frontend.sh   # React on port 5173

# Attempt to start both servers at once
./scripts/start-servers.sh

# Test server configuration
./scripts/servers-test.sh
```

**For Local macOS Development:**

```zsh
# Manual server startup (recommended for local development)
# Terminal 1: Backend
cd backend && python3 manage.py runserver 0.0.0.0:8000

# Terminal 2: Frontend
cd frontend && npm run dev -- --host 0.0.0.0 --port 5173

# Check running processes
ps aux | grep -E '(runserver|vite)'
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b dev/feature/amazing-feature`
3. Follow the code style guidelines
4. Add tests for new functionality
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin dev/feature/amazing-feature`
7. Create a Pull Request

### Development Workflow

1. Use the provided scripts for consistent environment setup
2. Follow the established project structure
3. Update documentation when adding new features
4. Test both backend API and frontend integration

## 📄 License

This project is part of CS50's Web Programming with Python and JavaScript course.

## 📞 Support

For questions or issues:

-   Create an issue in the repository
-   Check the troubleshooting section above
-   Review the development scripts for common tasks

---

**Built with ❤️ for CS50 Web Development Course**

_A comprehensive accounting application demonstrating full-stack development with Django REST Framework and React TypeScript._
