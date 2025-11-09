# Car Dealership Management System - Project Plan

## 📋 Project Overview

A full-stack car dealership management system with public car listings and a comprehensive admin panel for managing inventory, maintenance records, and analytics.

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **Forms**: React Hook Form
- **UI Components**: Headless UI / Shadcn UI
- **Charts**: Recharts
- **Image Upload**: react-dropzone

### Backend
- **Framework**: Django 5.x
- **API**: Django REST Framework (DRF)
- **Language**: Python 3.10+
- **Authentication**: JWT (djangorestframework-simplejwt)
- **CORS**: django-cors-headers

### Database
- **Primary**: PostgreSQL 15+
- **ORM**: Django ORM

### Storage
- **Images**: Cloudinary (free tier: 25GB storage, 25GB bandwidth/month)

### Development Tools
- **API Testing**: Postman / Thunder Client
- **Database Client**: pgAdmin / DBeaver
- **Version Control**: Git

---

## 📊 Database Schema

### 1. Users & Authentication
```python
User (Django built-in)
├── id (auto)
├── username
├── email
├── password (hashed)
├── is_staff (admin flag)
└── date_joined
```

### 2. Cars Table
```python
Car
├── id (UUID primary key)
├── make (CharField, max=100) - e.g., "Toyota", "BMW"
├── model (CharField, max=100) - e.g., "Camry", "X5"
├── year (IntegerField) - e.g., 2020
├── price (DecimalField) - e.g., 25000.00
├── mileage (IntegerField) - in kilometers
├── vin (CharField, max=17, unique) - Vehicle Identification Number
├── color (CharField, max=50)
├── transmission (CharField, choices) - "Automatic", "Manual"
├── fuel_type (CharField, choices) - "Petrol", "Diesel", "Electric", "Hybrid"
├── description (TextField) - detailed description
├── features (JSONField) - e.g., ["GPS", "Leather Seats", "Sunroof"]
├── status (CharField, choices) - "Available", "Sold", "Reserved"
├── category (ForeignKey to Category)
├── brand (ForeignKey to Brand)
├── views_count (IntegerField, default=0)
├── created_at (DateTimeField, auto_now_add)
├── updated_at (DateTimeField, auto_now)
└── is_featured (BooleanField, default=False)
```

### 3. Car Images Table
```python
CarImage
├── id (auto)
├── car (ForeignKey to Car, related_name='images')
├── image_url (URLField) - Cloudinary URL
├── cloudinary_public_id (CharField) - for deletion
├── is_primary (BooleanField, default=False) - main display image
├── order (IntegerField, default=0) - for sorting
└── uploaded_at (DateTimeField, auto_now_add)
```

### 4. Maintenance Records Table
```python
MaintenanceRecord
├── id (auto)
├── car (ForeignKey to Car, related_name='maintenance_records')
├── repair_date (DateField)
├── total_cost (DecimalField)
├── description (TextField) - overall repair description
├── created_at (DateTimeField, auto_now_add)
└── updated_at (DateTimeField, auto_now)
```

### 5. Maintenance Parts Table
```python
MaintenancePart
├── id (auto)
├── maintenance_record (ForeignKey to MaintenanceRecord, related_name='parts')
├── part_name (CharField, max=200) - e.g., "Brake Pads", "Oil Filter"
├── part_cost (DecimalField)
├── quantity (IntegerField, default=1)
└── notes (TextField, optional)
```

### 6. Categories Table
```python
Category
├── id (auto)
├── name (CharField, max=100, unique) - e.g., "SUV", "Sedan", "Truck"
├── slug (SlugField, unique)
└── description (TextField, optional)
```

### 7. Brands Table
```python
Brand
├── id (auto)
├── name (CharField, max=100, unique) - e.g., "Toyota", "BMW"
├── slug (SlugField, unique)
└── logo_url (URLField, optional)
```

### 8. Analytics Tables

#### Page Views
```python
PageView
├── id (auto)
├── page_url (CharField)
├── visitor_ip (GenericIPAddressField)
├── user_agent (CharField)
├── timestamp (DateTimeField, auto_now_add)
└── session_id (CharField) - for unique visitor tracking
```

#### Car Views
```python
CarView
├── id (auto)
├── car (ForeignKey to Car)
├── visitor_ip (GenericIPAddressField)
├── timestamp (DateTimeField, auto_now_add)
└── session_id (CharField)
```

#### Inquiries
```python
Inquiry
├── id (auto)
├── car (ForeignKey to Car, optional)
├── name (CharField)
├── email (EmailField)
├── phone (CharField, optional)
├── message (TextField)
├── status (CharField, choices) - "New", "Contacted", "Closed"
├── created_at (DateTimeField, auto_now_add)
└── resolved_at (DateTimeField, optional)
```

#### Sales
```python
Sale
├── id (auto)
├── car (ForeignKey to Car)
├── sale_price (DecimalField)
├── sale_date (DateField)
├── customer_name (CharField)
├── customer_email (EmailField)
├── customer_phone (CharField)
├── notes (TextField, optional)
└── created_at (DateTimeField, auto_now_add)
```

---

## 🎯 Features Breakdown

### Public Features (No Authentication Required)

#### 1. Homepage
- Hero section with search bar
- Featured cars carousel
- Statistics (Total cars, categories)
- Call-to-action sections

#### 2. Car Listings Page
- Grid/list view toggle
- Search by make, model, keyword
- Filters:
  - Price range (slider)
  - Year range
  - Mileage range
  - Transmission type
  - Fuel type
  - Category
  - Brand
- Sort by: Price (low/high), Year (new/old), Mileage, Date added
- Pagination
- Results count

#### 3. Car Detail Page
- Image gallery with zoom and carousel
- Full car specifications
- Maintenance history timeline
- Contact/inquiry form
- Similar cars suggestions
- Share buttons (social media)

#### 4. Contact Page
- General inquiry form
- Dealership information
- Map location (optional)

### Admin Features (Authentication Required)

#### 5. Admin Dashboard
**Overview Cards:**
- Total cars in inventory
- Cars sold this month
- Total revenue this month
- Pending inquiries

**Charts & Graphs:**
- Sales trend (last 6 months)
- Most viewed cars (top 10)
- Inquiries per month
- Revenue by category

**Recent Activity:**
- Latest inquiries
- Recent car additions
- Recent sales

#### 6. Car Management Page
**Table View:**
- List all cars with key info
- Quick status change (Available/Sold/Reserved)
- Quick edit/delete buttons
- Bulk actions
- Search and filter

**Add/Edit Car Form:**
- Basic information (make, model, year, price, etc.)
- Multiple image upload with drag-and-drop
- Set primary image
- Reorder images
- Category and brand selection
- Features checklist/tags
- Rich text editor for description
- Preview before saving

#### 7. Maintenance Records Management
- View all maintenance records per car
- Add new maintenance record
- Add multiple parts per record
- Calculate total cost automatically
- Filter by date, car, cost range
- Export to CSV/PDF

#### 8. Categories & Brands Management
- CRUD operations for categories
- CRUD operations for brands
- Assign cars to categories/brands
- View car count per category/brand

#### 9. Analytics Page
**Page Views Section:**
- Total page views (all time, this month, this week)
- Page views graph over time
- Most visited pages

**Car Views Section:**
- Most viewed cars (table with view counts)
- Views by category
- Views trend graph

**Inquiries Section:**
- Total inquiries
- Inquiries by status (New/Contacted/Closed)
- Response time average
- Inquiries trend graph
- View and manage inquiries

**Sales Section:**
- Total sales and revenue
- Sales by month/quarter/year
- Average sale price
- Cars sold by category
- Revenue trend graph
- Top selling models

**Export Options:**
- Download reports as CSV
- Date range filtering for all analytics

#### 10. Inquiry Management
- View all inquiries in table
- Filter by status, date, car
- Quick reply functionality
- Mark as contacted/closed
- Archive old inquiries

#### 11. User Management (Admin only)
- View admin users
- Add new admin users
- Change permissions
- Activity logs

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login/` - Admin login
- `POST /api/auth/logout/` - Admin logout
- `POST /api/auth/refresh/` - Refresh JWT token
- `GET /api/auth/user/` - Get current user info

### Public Endpoints

#### Cars
- `GET /api/cars/` - List all cars (with filters, search, pagination)
- `GET /api/cars/{id}/` - Get single car details
- `POST /api/cars/{id}/view/` - Record car view (for analytics)

#### Categories & Brands
- `GET /api/categories/` - List all categories
- `GET /api/brands/` - List all brands

#### Inquiries
- `POST /api/inquiries/` - Submit inquiry

### Admin Endpoints (Authentication Required)

#### Cars Management
- `POST /api/admin/cars/` - Create new car
- `PUT /api/admin/cars/{id}/` - Update car
- `DELETE /api/admin/cars/{id}/` - Delete car
- `POST /api/admin/cars/{id}/images/` - Upload car images
- `DELETE /api/admin/cars/images/{id}/` - Delete car image
- `PATCH /api/admin/cars/images/{id}/reorder/` - Reorder images

#### Maintenance
- `GET /api/admin/cars/{id}/maintenance/` - List maintenance records for car
- `POST /api/admin/maintenance/` - Create maintenance record
- `PUT /api/admin/maintenance/{id}/` - Update maintenance record
- `DELETE /api/admin/maintenance/{id}/` - Delete maintenance record

#### Categories & Brands
- `POST /api/admin/categories/` - Create category
- `PUT /api/admin/categories/{id}/` - Update category
- `DELETE /api/admin/categories/{id}/` - Delete category
- `POST /api/admin/brands/` - Create brand
- `PUT /api/admin/brands/{id}/` - Update brand
- `DELETE /api/admin/brands/{id}/` - Delete brand

#### Analytics
- `GET /api/admin/analytics/overview/` - Dashboard overview stats
- `GET /api/admin/analytics/page-views/` - Page views data
- `GET /api/admin/analytics/car-views/` - Car views data
- `GET /api/admin/analytics/inquiries/` - Inquiries statistics
- `GET /api/admin/analytics/sales/` - Sales statistics
- `GET /api/admin/analytics/export/` - Export analytics data

#### Inquiries Management
- `GET /api/admin/inquiries/` - List all inquiries
- `PATCH /api/admin/inquiries/{id}/` - Update inquiry status
- `DELETE /api/admin/inquiries/{id}/` - Delete inquiry

#### Sales
- `GET /api/admin/sales/` - List all sales
- `POST /api/admin/sales/` - Record new sale
- `PUT /api/admin/sales/{id}/` - Update sale
- `DELETE /api/admin/sales/{id}/` - Delete sale

---

## 📁 Project File Structure

```
site2/
├── backend/
│   ├── config/                      # Django project settings
│   │   ├── __init__.py
│   │   ├── settings.py              # Main settings
│   │   ├── urls.py                  # Root URL configuration
│   │   ├── wsgi.py
│   │   └── asgi.py
│   ├── apps/
│   │   ├── cars/                    # Cars app
│   │   │   ├── models.py            # Car, CarImage, Category, Brand models
│   │   │   ├── serializers.py       # DRF serializers
│   │   │   ├── views.py             # API views
│   │   │   ├── urls.py              # App URLs
│   │   │   ├── admin.py             # Django admin configuration
│   │   │   └── filters.py           # Filter classes
│   │   ├── maintenance/             # Maintenance app
│   │   │   ├── models.py            # MaintenanceRecord, MaintenancePart
│   │   │   ├── serializers.py
│   │   │   ├── views.py
│   │   │   └── urls.py
│   │   ├── analytics/               # Analytics app
│   │   │   ├── models.py            # PageView, CarView, Inquiry, Sale
│   │   │   ├── serializers.py
│   │   │   ├── views.py
│   │   │   ├── urls.py
│   │   │   └── utils.py             # Analytics calculation functions
│   │   └── users/                   # Custom user app (optional)
│   │       ├── models.py
│   │       ├── serializers.py
│   │       ├── views.py
│   │       └── urls.py
│   ├── media/                       # Local media files (if needed)
│   ├── static/                      # Static files
│   ├── manage.py
│   ├── requirements.txt             # Python dependencies
│   └── .env                         # Environment variables
│
├── frontend/
│   ├── app/                         # Next.js app directory
│   │   ├── layout.tsx               # Root layout
│   │   ├── page.tsx                 # Homepage
│   │   ├── cars/
│   │   │   ├── page.tsx             # Car listings
│   │   │   └── [id]/
│   │   │       └── page.tsx         # Car detail
│   │   ├── contact/
│   │   │   └── page.tsx             # Contact page
│   │   └── admin/                   # Admin pages
│   │       ├── layout.tsx           # Admin layout with sidebar
│   │       ├── dashboard/
│   │       │   └── page.tsx         # Admin dashboard
│   │       ├── cars/
│   │       │   ├── page.tsx         # Car management list
│   │       │   ├── new/
│   │       │   │   └── page.tsx     # Add new car
│   │       │   └── [id]/
│   │       │       └── edit/
│   │       │           └── page.tsx # Edit car
│   │       ├── maintenance/
│   │       │   └── page.tsx         # Maintenance records
│   │       ├── analytics/
│   │       │   └── page.tsx         # Analytics dashboard
│   │       ├── inquiries/
│   │       │   └── page.tsx         # Inquiries management
│   │       └── settings/
│   │           └── page.tsx         # Categories, brands, etc.
│   ├── components/
│   │   ├── ui/                      # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   └── ...
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── AdminSidebar.tsx
│   │   ├── cars/
│   │   │   ├── CarCard.tsx          # Car card component
│   │   │   ├── CarGrid.tsx
│   │   │   ├── CarFilters.tsx
│   │   │   ├── CarGallery.tsx
│   │   │   └── ...
│   │   └── analytics/
│   │       ├── Chart.tsx
│   │       ├── StatsCard.tsx
│   │       └── ...
│   ├── lib/
│   │   ├── api.ts                   # API client (axios instance)
│   │   ├── auth.ts                  # Auth utilities
│   │   └── utils.ts                 # Helper functions
│   ├── hooks/
│   │   ├── useCars.ts               # React Query hooks
│   │   ├── useAuth.ts
│   │   └── ...
│   ├── types/
│   │   └── index.ts                 # TypeScript types/interfaces
│   ├── middleware.ts                # Auth middleware
│   ├── public/                      # Public assets
│   ├── tailwind.config.js
│   ├── next.config.js
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.local                   # Environment variables
│
├── PROJECT_PLAN.md                  # This file
├── LEARNING_DJANGO.md               # Django learning guide
├── README.md                        # Setup instructions
└── .gitignore
```

---

## 🚀 Implementation Phases

### Phase 1: Backend Setup (Days 1-2)
- [ ] Install Python and PostgreSQL
- [ ] Create Django project and apps
- [ ] Set up virtual environment
- [ ] Configure PostgreSQL database
- [ ] Install dependencies (Django, DRF, etc.)
- [ ] Create all models
- [ ] Run migrations
- [ ] Set up Django admin

### Phase 2: Backend API Development (Days 3-5)
- [ ] Create serializers for all models
- [ ] Implement public API endpoints (cars, categories, brands)
- [ ] Implement admin API endpoints (CRUD operations)
- [ ] Set up JWT authentication
- [ ] Configure Cloudinary for image uploads
- [ ] Add filtering, searching, pagination
- [ ] Test all endpoints

### Phase 3: Frontend Setup (Days 6-7)
- [ ] Install Node.js
- [ ] Create Next.js project with TypeScript
- [ ] Set up Tailwind CSS
- [ ] Create base layout components
- [ ] Set up API client with axios
- [ ] Configure environment variables
- [ ] Set up React Query

### Phase 4: Public Pages Development (Days 8-10)
- [ ] Build homepage with featured cars
- [ ] Build car listings page with filters
- [ ] Implement search functionality
- [ ] Build car detail page with gallery
- [ ] Create contact/inquiry form
- [ ] Make responsive for mobile

### Phase 5: Admin Authentication (Day 11)
- [ ] Create login page
- [ ] Implement JWT authentication flow
- [ ] Set up protected routes middleware
- [ ] Create admin layout with sidebar

### Phase 6: Admin Pages Development (Days 12-16)
- [ ] Build admin dashboard with stats
- [ ] Create car management page (list view)
- [ ] Build add/edit car form
- [ ] Implement multi-image upload
- [ ] Build maintenance records management
- [ ] Create categories/brands management
- [ ] Build inquiries management page

### Phase 7: Analytics Implementation (Days 17-18)
- [ ] Implement view tracking (backend)
- [ ] Build analytics dashboard
- [ ] Create charts and graphs
- [ ] Add export functionality
- [ ] Test analytics accuracy

### Phase 8: Testing & Refinement (Days 19-20)
- [ ] Test all features end-to-end
- [ ] Fix bugs
- [ ] Optimize performance
- [ ] Add loading states and error handling
- [ ] Polish UI/UX

### Phase 9: Deployment Preparation (Day 21)
- [ ] Set up production environment variables
- [ ] Configure static files serving
- [ ] Set up database backups
- [ ] Create deployment documentation

---

## 📦 Dependencies

### Backend (requirements.txt)
```
Django>=5.0
djangorestframework>=3.14
psycopg2-binary>=2.9
python-decouple>=3.8
django-cors-headers>=4.3
djangorestframework-simplejwt>=5.3
cloudinary>=1.36
Pillow>=10.1
django-filter>=23.5
```

### Frontend (package.json)
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "axios": "^1.6.0",
    "@tanstack/react-query": "^5.0.0",
    "react-hook-form": "^7.48.0",
    "recharts": "^2.10.0",
    "react-dropzone": "^14.2.0",
    "@headlessui/react": "^1.7.0",
    "clsx": "^2.0.0",
    "date-fns": "^3.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

---

## 🔐 Security Considerations

1. **Authentication**: Use JWT tokens with refresh mechanism
2. **Password**: Django's built-in password hashing
3. **CORS**: Configure allowed origins properly
4. **SQL Injection**: Use Django ORM (parameterized queries)
5. **XSS**: React escapes by default, sanitize user input
6. **File Upload**: Validate file types and sizes, use Cloudinary
7. **Environment Variables**: Never commit .env files
8. **Rate Limiting**: Add rate limiting for API endpoints
9. **HTTPS**: Use HTTPS in production

---

## 🎨 Design Considerations

### Color Scheme (Suggestions)
- Primary: Blue (#2563eb) - Trust, professionalism
- Secondary: Gray (#6b7280) - Modern, clean
- Accent: Orange (#f97316) - Call-to-action
- Success: Green (#10b981)
- Danger: Red (#ef4444)

### Typography
- Headings: Inter or Poppins (bold, modern)
- Body: Inter or System fonts (readable)

### UI/UX Principles
- Mobile-first design
- Fast loading times (optimize images)
- Clear call-to-actions
- Intuitive navigation
- Consistent spacing and layout
- Accessible (WCAG AA)

---

## 📈 Future Enhancements (Optional)

- [ ] Customer accounts (wishlist, saved searches)
- [ ] Advanced search with AI
- [ ] Financing calculator
- [ ] Compare cars feature
- [ ] Email notifications for admin
- [ ] SMS notifications for customers
- [ ] Appointment scheduling
- [ ] Live chat support
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] SEO optimization
- [ ] Blog/news section
- [ ] Customer reviews and ratings

---

## 📞 Support & Resources

### Django Documentation
- Official Docs: https://docs.djangoproject.com/
- DRF Docs: https://www.django-rest-framework.org/

### Next.js Documentation
- Official Docs: https://nextjs.org/docs

### Learning Resources
- See LEARNING_DJANGO.md for Django tutorial
- See README.md for setup instructions

---

**Last Updated**: November 9, 2025
**Version**: 1.0.0
