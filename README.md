# Car Dealership Management System

A full-stack car dealership management system with public car listings and a comprehensive admin panel for managing inventory, maintenance records, and analytics.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## ✨ Features

### Public Features
- 🚗 Browse car inventory with advanced search and filtering
- 🖼️ View detailed car information with image galleries
- 📝 Submit inquiries about specific cars
- 📱 Fully responsive design

### Admin Features
- 📊 Comprehensive dashboard with analytics
- ✏️ Full CRUD operations for car inventory
- 🖼️ Multi-image upload with Cloudinary integration
- 🔧 Maintenance records tracking (repairs, parts, costs)
- 📈 Analytics (page views, popular cars, inquiries, sales)
- 🏷️ Categories and brands management
- 💬 Inquiry management system

---

## 🛠️ Tech Stack

**Frontend:**
- Next.js 14+ (React framework with App Router)
- TypeScript
- Tailwind CSS
- React Query (data fetching)
- Axios (HTTP client)

**Backend:**
- Django 5.x (Python web framework)
- Django REST Framework (API)
- PostgreSQL (database)
- Cloudinary (image storage)
- JWT authentication

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

1. **Python 3.10 or higher**
   - Download from: https://www.python.org/downloads/
   - During installation, check "Add Python to PATH"
   - Verify: `python --version`

2. **Node.js 18 or higher**
   - Download from: https://nodejs.org/
   - Verify: `node --version` and `npm --version`

3. **PostgreSQL 15 or higher**
   - Download from: https://www.postgresql.org/download/
   - Remember your PostgreSQL password during installation!
   - Verify: `psql --version`

4. **Git** (optional but recommended)
   - Download from: https://git-scm.com/downloads
   - Verify: `git --version`

### Accounts Needed

1. **Cloudinary Account** (Free tier)
   - Sign up at: https://cloudinary.com/users/register_free
   - Note your: Cloud Name, API Key, API Secret

---

## 🚀 Installation

### Step 1: Clone or Download Project

```bash
# If using Git
git clone <repository-url>
cd site2

# Or simply navigate to the project folder
cd c:\Users\elias.renawi\Documents\RenawiCars\site2
```

### Step 2: Backend Setup

#### 2.1 Create PostgreSQL Database

Open **pgAdmin** or **psql** and create a new database:

```sql
CREATE DATABASE car_dealership;
CREATE USER car_admin WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE car_dealership TO car_admin;
```

**Or using Command Line (Windows):**
```bash
psql -U postgres
CREATE DATABASE car_dealership;
\q
```

#### 2.2 Set Up Python Virtual Environment

```bash
# Navigate to backend folder
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# You should see (venv) in your terminal prompt
```

#### 2.3 Install Python Dependencies

```bash
# Make sure virtual environment is activated!
pip install --upgrade pip
pip install -r requirements.txt
```

#### 2.4 Create Environment Variables File

Create a file named `.env` in the `backend` folder:

```bash
# backend/.env

# Django Settings
SECRET_KEY=your-secret-key-here-change-this-in-production
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database
DB_NAME=car_dealership
DB_USER=car_admin
DB_PASSWORD=your_secure_password
DB_HOST=localhost
DB_PORT=5432

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# CORS (for frontend)
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

**Important:** Replace the placeholder values with your actual credentials!

#### 2.5 Generate Django Secret Key

```bash
# In Python shell
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

Copy the output and paste it as `SECRET_KEY` in your `.env` file.

#### 2.6 Run Migrations

```bash
# Create database tables
python manage.py makemigrations
python manage.py migrate
```

#### 2.7 Create Admin User

```bash
python manage.py createsuperuser
# Follow the prompts to create your admin account
```

### Step 3: Frontend Setup

```bash
# Open a NEW terminal window (keep backend terminal open)
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Create environment variables file
# Create: frontend/.env.local
```

Create `frontend/.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

---

## ⚙️ Configuration

### Backend Configuration (`backend/config/settings.py`)

Key settings are automatically loaded from `.env` file. You can customize:

- **Pagination**: Change default page size
- **File Upload**: Adjust max upload size
- **CORS**: Add additional allowed origins
- **Time Zone**: Change from UTC to your timezone

### Frontend Configuration (`frontend/next.config.js`)

Configure:
- Image domains (Cloudinary)
- API proxy settings
- Build optimization

---

## 🏃 Running the Application

### Development Mode

You need **TWO terminal windows** running simultaneously:

#### Terminal 1: Backend (Django)

```bash
cd backend
venv\Scripts\activate  # Windows
# or: source venv/bin/activate  # Mac/Linux
python manage.py runserver
```

Backend will run at: **http://localhost:8000**

- Django Admin: http://localhost:8000/admin
- API Root: http://localhost:8000/api/

#### Terminal 2: Frontend (Next.js)

```bash
cd frontend
npm run dev
```

Frontend will run at: **http://localhost:3000**

### 🎉 Access the Application

- **Public Site**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **Django Admin**: http://localhost:8000/admin (backend admin panel)
- **API**: http://localhost:8000/api/

---

## 📁 Project Structure

```
site2/
├── backend/                    # Django backend
│   ├── config/                 # Project settings
│   ├── apps/                   # Django apps
│   │   ├── cars/              # Car management
│   │   ├── maintenance/       # Maintenance records
│   │   ├── analytics/         # Analytics tracking
│   │   └── users/             # User management
│   ├── manage.py              # Django CLI
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Environment variables
│
├── frontend/                   # Next.js frontend
│   ├── app/                   # Next.js pages (App Router)
│   │   ├── page.tsx          # Homepage
│   │   ├── cars/             # Car listings
│   │   └── admin/            # Admin pages
│   ├── components/            # React components
│   ├── lib/                   # Utilities
│   ├── hooks/                 # Custom React hooks
│   ├── types/                 # TypeScript types
│   ├── package.json           # Node dependencies
│   └── .env.local            # Environment variables
│
├── PROJECT_PLAN.md            # Detailed project plan
├── LEARNING_DJANGO.md         # Django tutorial
└── README.md                  # This file
```

---

## 📚 API Documentation

### Base URL
```
http://localhost:8000/api
```

### Public Endpoints

#### Get All Cars
```http
GET /api/cars/
```

Query Parameters:
- `search`: Search by make, model, VIN
- `make`: Filter by make
- `year_min`, `year_max`: Filter by year range
- `price_min`, `price_max`: Filter by price range
- `category`: Filter by category ID
- `ordering`: Sort by field (e.g., `-price`, `year`)
- `page`: Page number

**Example:**
```
GET /api/cars/?search=toyota&year_min=2020&ordering=-price&page=1
```

#### Get Single Car
```http
GET /api/cars/{id}/
```

#### Submit Inquiry
```http
POST /api/inquiries/
```

Body:
```json
{
  "car": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "message": "Interested in this car"
}
```

### Admin Endpoints (Requires Authentication)

#### Login
```http
POST /api/auth/login/
```

Body:
```json
{
  "username": "admin",
  "password": "yourpassword"
}
```

Response:
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJh...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJh..."
}
```

Use the `access` token in Authorization header:
```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJh...
```

#### Create Car
```http
POST /api/admin/cars/
Authorization: Bearer {token}
```

#### Update Car
```http
PUT /api/admin/cars/{id}/
Authorization: Bearer {token}
```

#### Delete Car
```http
DELETE /api/admin/cars/{id}/
Authorization: Bearer {token}
```

#### Get Analytics
```http
GET /api/admin/analytics/overview/
Authorization: Bearer {token}
```

For complete API documentation, see `API_DOCUMENTATION.md` (will be created).

---

## 🚢 Deployment

### Deployment Options

1. **Vercel** (Frontend) + **Railway** (Backend + Database)
2. **Heroku** (Full-stack)
3. **DigitalOcean** (VPS)
4. **AWS** (EC2 + RDS)

### Pre-Deployment Checklist

- [ ] Change `DEBUG=False` in production
- [ ] Set strong `SECRET_KEY`
- [ ] Configure `ALLOWED_HOSTS`
- [ ] Set up proper CORS origins
- [ ] Configure PostgreSQL for production
- [ ] Set up static files serving
- [ ] Enable HTTPS
- [ ] Set up database backups
- [ ] Configure error monitoring (Sentry)

Detailed deployment guide will be provided separately.

---

## 🐛 Troubleshooting

### Common Issues

#### 1. "Module not found" errors

**Solution:**
```bash
# Backend
cd backend
venv\Scripts\activate
pip install -r requirements.txt

# Frontend
cd frontend
npm install
```

#### 2. Database connection error

**Check:**
- PostgreSQL is running
- Database exists: `car_dealership`
- Credentials in `.env` are correct
- Port 5432 is not blocked

**Test connection:**
```bash
psql -U car_admin -d car_dealership
```

#### 3. "Port already in use"

**Solution:**
```bash
# Kill process on port 8000 (Windows)
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

#### 4. Cloudinary images not uploading

**Check:**
- Cloudinary credentials in `.env` are correct
- Account is active and not over quota
- File size is within limits

#### 5. CORS errors in browser

**Solution:**
- Add frontend URL to `CORS_ALLOWED_ORIGINS` in backend `.env`
- Restart Django server after changing `.env`

#### 6. Virtual environment not activating

**Windows PowerShell:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
venv\Scripts\Activate.ps1
```

**Or use Command Prompt instead:**
```cmd
venv\Scripts\activate.bat
```

---

## 📖 Learning Resources

### For Django
- See [LEARNING_DJANGO.md](LEARNING_DJANGO.md) for Django tutorial
- Official Django Docs: https://docs.djangoproject.com/
- Django REST Framework: https://www.django-rest-framework.org/

### For Next.js
- Official Docs: https://nextjs.org/docs
- React Docs: https://react.dev/

### For TypeScript
- TypeScript Handbook: https://www.typescriptlang.org/docs/

---

## 🤝 Development Workflow

### Adding a New Feature

1. **Backend:**
   - Create/modify models in `apps/{app}/models.py`
   - Run migrations: `python manage.py makemigrations && python manage.py migrate`
   - Create serializers in `serializers.py`
   - Create views in `views.py`
   - Add URL routes in `urls.py`
   - Test in Django admin or with Postman

2. **Frontend:**
   - Create TypeScript types in `types/index.ts`
   - Create API functions in `lib/api.ts`
   - Create React components in `components/`
   - Create pages in `app/`
   - Test in browser

### Git Workflow (Optional)

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push to remote
git push origin feature/new-feature
```

---

## 📞 Support

If you encounter issues:

1. Check error messages carefully
2. Review [LEARNING_DJANGO.md](LEARNING_DJANGO.md)
3. Check [Troubleshooting](#troubleshooting) section
4. Search Django/Next.js documentation
5. Check Stack Overflow

---

## 📄 License

This project is for educational and commercial use.

---

## 🎯 Next Steps

1. ✅ Install prerequisites
2. ✅ Set up backend and database
3. ✅ Set up frontend
4. ✅ Run both servers
5. ✅ Create your first car in Django admin
6. ✅ View it on the frontend
7. 🚀 Start customizing and building!

---

**Project Version:** 1.0.0
**Last Updated:** November 9, 2025

**Happy coding!** 🚗💻
