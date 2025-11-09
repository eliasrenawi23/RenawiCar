# Learning Django - A Beginner's Guide

Welcome to Django! This guide will help you understand Django concepts as we build your car dealership application.

---

## 🐍 What is Django?

**Django** is a free, open-source Python web framework that helps you build web applications quickly and efficiently. Think of it as a toolkit that provides pre-built components for common web development tasks.

### Why Django?
- ✅ **Batteries Included**: Comes with everything you need (admin panel, authentication, ORM, etc.)
- ✅ **Secure**: Built-in protection against common security issues
- ✅ **Scalable**: Used by Instagram, Pinterest, NASA
- ✅ **Fast Development**: Write less code, get more done
- ✅ **Great Documentation**: Excellent learning resources

---

## 📚 Core Django Concepts

### 1. Projects vs Apps

#### Django Project
A **project** is your entire website. It's the container for everything.

```
backend/              ← This is your Django PROJECT
├── config/          ← Project settings
├── apps/            ← Your apps go here
└── manage.py        ← Command-line tool
```

#### Django Apps
An **app** is a component of your project that does one specific thing.

```
apps/
├── cars/            ← App for managing cars
├── maintenance/     ← App for maintenance records
└── analytics/       ← App for analytics
```

**Think of it like this:**
- Project = Your entire house
- Apps = Individual rooms (kitchen, bedroom, bathroom)
- Each room has a specific purpose

---

### 2. Models (Database Tables)

**Models** define your data structure. Each model is a Python class that becomes a database table.

#### Example: Car Model

```python
from django.db import models

class Car(models.Model):
    # Fields become database columns
    make = models.CharField(max_length=100)  # Text field
    model = models.CharField(max_length=100)
    year = models.IntegerField()             # Number field
    price = models.DecimalField(max_digits=10, decimal_places=2)
    mileage = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.year} {self.make} {self.model}"
```

**What happens:**
1. Django reads this Python class
2. Creates a database table called `cars_car`
3. Each field becomes a column in the table

**Common Field Types:**
- `CharField`: Text (limited length) - e.g., "Toyota"
- `TextField`: Long text - e.g., descriptions
- `IntegerField`: Whole numbers - e.g., 2020
- `DecimalField`: Decimal numbers - e.g., 25000.50
- `DateField`: Date only - e.g., 2024-11-09
- `DateTimeField`: Date and time
- `BooleanField`: True/False
- `ForeignKey`: Relationship to another model
- `JSONField`: Store JSON data

---

### 3. Migrations (Database Changes)

**Migrations** are Django's way of managing database changes.

#### How it works:

```bash
# Step 1: Create migration files (instructions for database changes)
python manage.py makemigrations

# Step 2: Apply migrations (actually change the database)
python manage.py migrate
```

**What's happening:**
1. You write/change a model in Python
2. `makemigrations` creates a "recipe" file for the changes
3. `migrate` executes the recipe and updates the database

**Example:**
```python
# You add a new field to Car model
class Car(models.Model):
    # ... existing fields ...
    color = models.CharField(max_length=50)  # NEW FIELD
```

```bash
$ python manage.py makemigrations
# Creates: apps/cars/migrations/0002_car_color.py

$ python manage.py migrate
# Database now has a 'color' column in cars table
```

---

### 4. Django Admin Panel

The **admin panel** is a free, built-in interface for managing your data. It's like getting a content management system (CMS) for free!

#### Setup Admin

```python
# apps/cars/admin.py
from django.contrib import admin
from .models import Car

@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ['make', 'model', 'year', 'price']  # Columns to show
    list_filter = ['year', 'make']                     # Add filters
    search_fields = ['make', 'model', 'vin']          # Add search
```

**Access Admin:**
1. Create admin user: `python manage.py createsuperuser`
2. Go to: `http://localhost:8000/admin`
3. Login and manage your data!

**You can:**
- ✅ Add, edit, delete cars
- ✅ Search and filter
- ✅ View all records
- ✅ Customize how data is displayed

---

### 5. Views (Request Handlers)

**Views** are Python functions or classes that handle web requests and return responses.

#### Function-Based View Example

```python
# apps/cars/views.py
from django.http import JsonResponse
from .models import Car

def car_list(request):
    # Get all cars from database
    cars = Car.objects.all()

    # Convert to list of dictionaries
    data = [
        {
            'id': car.id,
            'make': car.make,
            'model': car.model,
            'year': car.year,
            'price': str(car.price)
        }
        for car in cars
    ]

    # Return JSON response
    return JsonResponse({'cars': data})
```

**Flow:**
1. Browser sends request to `/api/cars/`
2. Django routes it to `car_list` view
3. View fetches data from database
4. View returns JSON response
5. Browser receives data

---

### 6. URLs (Routing)

**URLs** map web addresses to views.

```python
# apps/cars/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.car_list, name='car-list'),           # /api/cars/
    path('<int:pk>/', views.car_detail, name='car-detail'),  # /api/cars/123/
]
```

```python
# config/urls.py (main URLs)
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/cars/', include('apps.cars.urls')),  # Include cars URLs
]
```

**How it works:**
- User visits: `http://localhost:8000/api/cars/`
- Django checks URLs
- Finds match: `api/cars/` → `car_list` view
- Executes view and returns response

---

### 7. Django ORM (Database Queries)

**ORM** (Object-Relational Mapping) lets you interact with the database using Python instead of SQL.

#### Common Queries

```python
from apps.cars.models import Car

# Get all cars
cars = Car.objects.all()

# Get one car by ID
car = Car.objects.get(id=1)

# Filter cars
toyota_cars = Car.objects.filter(make='Toyota')
cheap_cars = Car.objects.filter(price__lt=20000)  # price < 20000
new_cars = Car.objects.filter(year__gte=2020)     # year >= 2020

# Get count
count = Car.objects.count()

# Order results
sorted_cars = Car.objects.order_by('-year')  # Newest first (- means descending)

# Chain filters
results = Car.objects.filter(
    make='Toyota',
    year__gte=2020
).order_by('price')

# Create new car
new_car = Car.objects.create(
    make='Toyota',
    model='Camry',
    year=2023,
    price=28000,
    mileage=0
)

# Update car
car = Car.objects.get(id=1)
car.price = 25000
car.save()

# Delete car
car = Car.objects.get(id=1)
car.delete()
```

**No SQL needed!** Django converts Python code to SQL automatically.

---

### 8. Django REST Framework (DRF)

**DRF** makes it easy to build APIs that return JSON data.

#### Serializers (Convert Data)

Serializers convert complex data (like model instances) to JSON and vice versa.

```python
# apps/cars/serializers.py
from rest_framework import serializers
from .models import Car

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ['id', 'make', 'model', 'year', 'price', 'mileage']
```

**What it does:**
- **Serialization**: Model → JSON (for API responses)
- **Deserialization**: JSON → Model (for creating/updating)
- **Validation**: Checks if data is valid

#### API Views with DRF

```python
# apps/cars/views.py
from rest_framework import generics
from .models import Car
from .serializers import CarSerializer

class CarListView(generics.ListAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
```

**Just 4 lines of code gives you:**
- ✅ Get all cars as JSON
- ✅ Pagination
- ✅ Filtering
- ✅ Error handling

---

### 9. Relationships Between Models

#### ForeignKey (Many-to-One)

Many cars can belong to one category.

```python
class Category(models.Model):
    name = models.CharField(max_length=100)

class Car(models.Model):
    # ... other fields ...
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
```

**Usage:**
```python
# Get category of a car
car = Car.objects.get(id=1)
print(car.category.name)  # "SUV"

# Get all cars in a category
suv_category = Category.objects.get(name='SUV')
suv_cars = suv_category.car_set.all()  # All cars in SUV category
```

#### One-to-Many Example: Car Images

One car can have many images.

```python
class CarImage(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name='images')
    image_url = models.URLField()

# Get all images for a car
car = Car.objects.get(id=1)
images = car.images.all()  # Using related_name
```

---

### 10. Authentication & Permissions

#### JWT Authentication

We'll use JWT (JSON Web Tokens) for authentication.

```python
# User logs in with username/password
# Django returns JWT token
# Frontend stores token
# Frontend sends token with each request to admin endpoints
```

**Installation:**
```bash
pip install djangorestframework-simplejwt
```

**Configuration:**
```python
# config/settings.py
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
}
```

**URLs:**
```python
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('api/auth/login/', TokenObtainPairView.as_view()),
    path('api/auth/refresh/', TokenRefreshView.as_view()),
]
```

#### Protected Views

```python
from rest_framework.permissions import IsAdminUser
from rest_framework import generics

class CarCreateView(generics.CreateAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    permission_classes = [IsAdminUser]  # Only admins can create cars
```

---

## 🛠️ Common Django Commands

```bash
# Create new Django project
django-admin startproject config .

# Create new app
python manage.py startapp cars

# Create migrations (after model changes)
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create admin user
python manage.py createsuperuser

# Run development server
python manage.py runserver

# Open Python shell with Django
python manage.py shell

# Collect static files (for production)
python manage.py collectstatic
```

---

## 📂 Django Project Structure Explained

```
backend/
├── config/                    # Project configuration
│   ├── __init__.py           # Makes this a Python package
│   ├── settings.py           # ALL project settings (database, apps, etc.)
│   ├── urls.py               # Main URL configuration
│   ├── wsgi.py               # For deployment
│   └── asgi.py               # For async/websockets
│
├── apps/                      # Your applications
│   └── cars/
│       ├── migrations/       # Database migration files
│       │   └── 0001_initial.py
│       ├── __init__.py       # Makes this a Python package
│       ├── models.py         # Database models (tables)
│       ├── views.py          # Request handlers (logic)
│       ├── serializers.py    # DRF serializers (JSON conversion)
│       ├── urls.py           # App URL routes
│       ├── admin.py          # Admin panel configuration
│       ├── apps.py           # App configuration
│       └── tests.py          # Tests for this app
│
├── manage.py                  # Command-line utility
├── requirements.txt           # Python dependencies
└── .env                       # Environment variables (secrets)
```

---

## 🔄 Django Request/Response Flow

```
1. User visits URL
   ↓
2. Django checks urls.py (finds matching pattern)
   ↓
3. Django calls corresponding view
   ↓
4. View queries database (using models)
   ↓
5. View processes data
   ↓
6. View returns response (JSON, HTML, etc.)
   ↓
7. Response sent to user's browser
```

**Example:**
```
User: GET /api/cars/
  ↓
urls.py: /api/cars/ → CarListView
  ↓
views.py: CarListView.get() → queries Car.objects.all()
  ↓
models.py: Returns all Car objects from database
  ↓
serializers.py: Converts Car objects to JSON
  ↓
Response: {"cars": [{"id": 1, "make": "Toyota", ...}]}
```

---

## 🎯 Quick Tips for Learning Django

1. **Start with Models**: Understand your data structure first
2. **Use Django Admin**: Great for testing models quickly
3. **Read Error Messages**: Django errors are very helpful
4. **Use Django Shell**: Test queries interactively
   ```bash
   python manage.py shell
   >>> from apps.cars.models import Car
   >>> Car.objects.all()
   ```
5. **Check Documentation**: Django docs are excellent
6. **Print Debug Info**: Use `print()` in views to see what's happening
7. **Use Django Debug Toolbar**: Helps see SQL queries and performance

---

## 📖 Learning Resources

### Official Documentation
- **Django Docs**: https://docs.djangoproject.com/
- **DRF Docs**: https://www.django-rest-framework.org/

### Video Tutorials
- **Corey Schafer**: Django tutorials on YouTube
- **Dennis Ivy**: Django REST Framework tutorials
- **freeCodeCamp**: Full Django course

### Practice
- **Django Girls Tutorial**: Great beginner tutorial
- **Django Polls Tutorial**: Official Django tutorial
- **Build projects**: Best way to learn!

---

## 🤔 Common Questions

### Q: Do I need to know SQL?
**A:** No! Django's ORM handles SQL for you. You write Python, Django generates SQL.

### Q: What's the difference between `save()` and `create()`?
**A:**
```python
# create() - Creates AND saves in one step
car = Car.objects.create(make='Toyota', model='Camry')

# save() - Used after creating object or updating
car = Car(make='Toyota', model='Camry')
car.save()  # Now it's saved to database
```

### Q: What does `on_delete=models.CASCADE` mean?
**A:** If a Category is deleted, delete all Cars in that category too.
```python
category = models.ForeignKey(Category, on_delete=models.CASCADE)
```

Options:
- `CASCADE`: Delete related objects
- `PROTECT`: Prevent deletion if related objects exist
- `SET_NULL`: Set to NULL if deleted

### Q: What are querysets?
**A:** QuerySets are lazy database queries. They don't hit the database until you actually use them.
```python
cars = Car.objects.filter(make='Toyota')  # No database query yet!
print(cars)  # NOW it queries the database
```

---

## 🎓 Next Steps

1. **Install Python and PostgreSQL** (see README.md)
2. **Create your first Django project**
3. **Define models** for cars, images, maintenance
4. **Play with Django admin**
5. **Build API endpoints** with DRF
6. **Connect to Next.js frontend**

**Remember:** Django is powerful but approachable. Take it step by step, and you'll be building amazing web applications in no time!

---

**Happy coding!** 🚀

If you have questions while building, check:
1. Django error messages (they're helpful!)
2. Django documentation
3. This guide
4. Stack Overflow

**Last Updated**: November 9, 2025
