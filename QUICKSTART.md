# Quick Start Guide

Get your car dealership application running in minutes!

## 📋 Prerequisites Checklist

Before starting, make sure you have:

- [ ] **Python 3.10+** installed → Test with `python --version`
- [ ] **PostgreSQL 15+** installed → Test with `psql --version`
- [ ] **Node.js 18+** installed → Test with `node --version`
- [ ] **Cloudinary account** created → Get credentials from https://cloudinary.com

---

## 🚀 Step-by-Step Setup

### Step 1: Set Up Database (5 minutes)

```bash
# Open PostgreSQL (Windows: use psql from Start Menu, or pgAdmin)
psql -U postgres

# In PostgreSQL shell, run:
CREATE DATABASE car_dealership;
CREATE USER car_admin WITH PASSWORD 'YourSecurePassword123';
GRANT ALL PRIVILEGES ON DATABASE car_dealership TO car_admin;
\q
```

---

### Step 2: Set Up Backend (10 minutes)

```bash
# Navigate to backend folder
cd c:\Users\elias.renawi\Documents\RenawiCars\site2\backend

# Create virtual environment
python -m venv venv

# Activate virtual environment (Windows)
venv\Scripts\activate

# You should see (venv) in your terminal now

# Install dependencies
pip install -r requirements.txt
```

#### Create .env file

```bash
# Copy the example file
copy .env.example .env

# Edit .env with your actual credentials
notepad .env
```

Update these values in `.env`:
- `SECRET_KEY`: Generate new one (instructions below)
- `DB_PASSWORD`: Your PostgreSQL password from Step 1
- `CLOUDINARY_CLOUD_NAME`: From Cloudinary dashboard
- `CLOUDINARY_API_KEY`: From Cloudinary dashboard
- `CLOUDINARY_API_SECRET`: From Cloudinary dashboard

**Generate SECRET_KEY:**
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

#### Run Migrations

```bash
# Create database tables
python manage.py makemigrations
python manage.py migrate

# Create admin user
python manage.py createsuperuser
# Follow prompts: username, email, password
```

#### Start Backend Server

```bash
python manage.py runserver
```

✅ **Backend should now be running at http://localhost:8000**

Test it:
- Django Admin: http://localhost:8000/admin (login with superuser credentials)

---

### Step 3: Set Up Frontend (10 minutes)

**Open a NEW terminal window** (keep backend running)

```bash
# Navigate to frontend folder
cd c:\Users\elias.renawi\Documents\RenawiCars\site2\frontend

# Install dependencies (this may take a few minutes)
npm install

# Create environment file
echo NEXT_PUBLIC_API_URL=http://localhost:8000/api > .env.local

# Start frontend development server
npm run dev
```

✅ **Frontend should now be running at http://localhost:3000**

---

## 🎉 You're Done!

### Access Your Application

- **Public Website**: http://localhost:3000
- **Admin Pages**: http://localhost:3000/admin (login required)
- **Django Admin**: http://localhost:8000/admin (different from Next.js admin)
- **API Docs**: http://localhost:8000/api/

### Test It Out

1. **Add a car in Django Admin:**
   - Go to http://localhost:8000/admin
   - Click "Cars" → "Add Car"
   - Fill in details and save

2. **View it on the website:**
   - Go to http://localhost:3000
   - You should see your car!

---

## 🔧 Daily Development Workflow

Every time you work on the project:

### Terminal 1: Backend
```bash
cd backend
venv\Scripts\activate
python manage.py runserver
```

### Terminal 2: Frontend
```bash
cd frontend
npm run dev
```

---

## ❓ Troubleshooting

### Backend won't start

**Error: "No module named 'django'"**
```bash
# Make sure virtual environment is activated
venv\Scripts\activate
pip install -r requirements.txt
```

**Error: "database does not exist"**
```bash
# Make sure you created the database in Step 1
psql -U postgres
CREATE DATABASE car_dealership;
\q
```

### Frontend won't start

**Error: "command not found: npm"**
- Install Node.js from https://nodejs.org

**Error: Port 3000 already in use**
```bash
# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

### Can't login to admin

- Make sure you created a superuser: `python manage.py createsuperuser`
- Use those credentials to login

---

## 📚 Next Steps

1. ✅ Read [LEARNING_DJANGO.md](LEARNING_DJANGO.md) to understand Django concepts
2. ✅ Check [PROJECT_PLAN.md](PROJECT_PLAN.md) for full project details
3. ✅ See [README.md](README.md) for complete documentation
4. ✅ Start adding your car inventory!
5. ✅ Customize the frontend design

---

## 🆘 Need Help?

1. Check error messages carefully
2. Review [README.md](README.md) troubleshooting section
3. Read [LEARNING_DJANGO.md](LEARNING_DJANGO.md) for Django concepts
4. Search Django documentation: https://docs.djangoproject.com

---

**Happy coding!** 🚗💨
