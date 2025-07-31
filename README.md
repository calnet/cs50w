# CS50 Capstone Project - Accounting Application

A comprehensive accounting application built with Django REST Framework backend and React TypeScript frontend.

## 🚀 Features

### Core Functionality

-   **Customer Management**: Full CRUD operations for customer accounts
-   **Supplier Management**: Manage supplier relationships and accounts
-   **Banking Integration**: Bank account management and reconciliation
-   **Chart of Accounts**: Flexible account structure with nominal codes
-   **Financial Reporting**: Basic reporting capabilities

### Technical Features

-   **REST API**: Comprehensive API with Django REST Framework
-   **Modern Frontend**: React 18 with TypeScript and Material-UI
-   **Authentication**: JWT-based authentication system
-   **Real-time Updates**: Live data synchronization
-   **Responsive Design**: Mobile-friendly interface
-   **Containerized**: Docker support for easy deployment

## 🏗️ Architecture

```
├── backend/                    # Django REST API
│   ├── users/                 # User management
│   ├── customers/             # Customer operations
│   ├── suppliers/             # Supplier management
│   ├── banking/               # Bank account handling
│   ├── ledgers/               # Chart of accounts
│   └── backend/               # Django settings
│
├── frontend/                   # React TypeScript SPA
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── views/             # Page components
│   │   ├── contexts/          # React contexts
│   │   ├── utils/             # Utility functions
│   │   ├── types/             # TypeScript definitions
│   │   └── services/          # API services
│   └── public/
│
└── docker-compose.yml         # Container orchestration
```

## 🛠️ Technology Stack

### Backend

-   **Django 4.1+**: Web framework
-   **Django REST Framework**: API development
-   **SQLite/PostgreSQL**: Database
-   **JWT Authentication**: Secure API access
-   **CORS Headers**: Cross-origin support

### Frontend

-   **React 18**: UI library
-   **TypeScript**: Type safety
-   **Material-UI (MUI)**: Component library
-   **Vite**: Build tool and dev server
-   **Axios**: HTTP client
-   **React Router**: Client-side routing

### DevOps

-   **Docker**: Containerization
-   **Docker Compose**: Multi-container orchestration
-   **Hot Reload**: Development experience

## 📋 Prerequisites

-   Node.js 18+ and npm
-   Python 3.11+
-   Docker and Docker Compose (optional)
-   Git

## 🚀 Quick Start

### Option 1: Docker (Recommended)

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd cs50w
    ```

2. **Start with Docker Compose**

    ```bash
    docker-compose up --build
    ```

3. **Access the application**
    - Frontend: http://localhost:5173
    - Backend API: http://localhost:8000
    - Admin Panel: http://localhost:8000/admin

### Option 2: Local Development

#### Backend Setup

1. **Create virtual environment**

    ```bash
    cd backend
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

2. **Install dependencies**

    ```bash
    pip install -r requirements.txt
    ```

3. **Configure environment**

    ```bash
    cp .env.example .env
    # Edit .env with your settings
    ```

4. **Run migrations**

    ```bash
    python manage.py migrate
    python manage.py createsuperuser
    ```

5. **Start development server**
    ```bash
    python manage.py runserver
    ```

#### Frontend Setup

1. **Install dependencies**

    ```bash
    cd frontend
    npm install
    ```

2. **Start development server**
    ```bash
    npm run dev
    ```

## 📖 API Documentation

### Authentication

All API endpoints (except authentication) require a valid JWT token.

```bash
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

```bash
GET    /api/customers/           # List customers
POST   /api/customers/           # Create customer
GET    /api/customers/{id}/      # Get customer
PUT    /api/customers/{id}/      # Update customer
DELETE /api/customers/{id}/      # Delete customer
```

#### Banking

```bash
GET    /api/banking/             # List bank accounts
POST   /api/banking/             # Create bank account
```

#### Suppliers

```bash
GET    /api/suppliers/           # List suppliers
POST   /api/suppliers/           # Create supplier
```

#### Chart of Accounts

```bash
GET    /api/layouts/             # Account layouts
GET    /api/coa_categories/      # Account categories
GET    /api/nominal_types/       # Nominal types
GET    /api/nominal_codes/       # Nominal codes
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
DEBUG=True
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///db.sqlite3
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173

# For production
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
REDIS_URL=redis://localhost:6379/0
```

### Frontend Configuration

The frontend automatically detects the backend URL based on the environment:

-   Development: `http://localhost:8000`
-   Production: Configure in `src/services/api.ts`

## 🧪 Testing

### Backend Tests

```bash
cd backend
python manage.py test
# Or with pytest
pytest
```

### Frontend Tests

```bash
cd frontend
npm test
```

## 📦 Deployment

### Production Deployment

1. **Set environment variables**

    ```bash
    DEBUG=False
    SECRET_KEY=production-secret-key
    DATABASE_URL=postgresql://...
    ALLOWED_HOSTS=yourdomain.com
    ```

2. **Collect static files**

    ```bash
    python manage.py collectstatic
    ```

3. **Run migrations**

    ```bash
    python manage.py migrate
    ```

4. **Build frontend**
    ```bash
    cd frontend
    npm run build
    ```

### Docker Production

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 🔍 Development Guidelines

### Code Style

-   **Backend**: Follow PEP 8, use Black formatter
-   **Frontend**: Use ESLint and Prettier
-   **TypeScript**: Strict mode enabled

### Git Workflow

1. Create feature branch: `git checkout -b feature/new-feature`
2. Make changes and commit: `git commit -m "Add new feature"`
3. Push and create PR: `git push origin feature/new-feature`

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

-   Run migrations: `python manage.py migrate`
-   Reset database: `python manage.py flush`

**Build Errors**

-   Clear node_modules: `rm -rf node_modules && npm install`
-   Clear browser cache and restart dev server

### Debug Mode

Enable Django debug toolbar in development:

```python
# settings.py
if DEBUG:
    INSTALLED_APPS += ['debug_toolbar']
    MIDDLEWARE += ['debug_toolbar.middleware.DebugToolbarMiddleware']
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is part of CS50's Web Programming course.

## 📞 Support

For questions or issues, please create an issue in the repository or contact the development team.

---

**Built with ❤️ for CS50 Web Development Course**
