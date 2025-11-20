"""
Script to populate the database with sample car data
"""
from apps.cars.models import Car, Category, Brand
from decimal import Decimal

# Get categories and brands
sedan = Category.objects.get(name="Sedan")
suv = Category.objects.get(name="SUV")
truck = Category.objects.get(name="Truck")
sports_car = Category.objects.get(name="Sports Car")

toyota = Brand.objects.get(name="Toyota")
bmw = Brand.objects.get(name="BMW")
ford = Brand.objects.get(name="Ford")
mercedes = Brand.objects.get(name="Mercedes-Benz")
audi = Brand.objects.get(name="Audi")

# Create sample cars
cars_data = [
    {
        'make': 'Toyota',
        'model': 'Camry',
        'year': 2023,
        'vin': '1HGBH41JXMN109186',
        'price': Decimal('28500.00'),
        'mileage': 15000,
        'color': 'Silver',
        'fuel_type': 'petrol',
        'transmission': 'automatic',
        'status': 'available',
        'category': sedan,
        'brand': toyota,
        'description': 'Well-maintained 2023 Toyota Camry with low mileage. Perfect family sedan with excellent fuel economy.',
        'features': ['Backup camera', 'Bluetooth', 'Cruise control', 'Power windows']
    },
    {
        'make': 'BMW',
        'model': 'X5',
        'year': 2022,
        'vin': '5UXWX7C5XBA123456',
        'price': Decimal('65000.00'),
        'mileage': 22000,
        'color': 'Black',
        'fuel_type': 'petrol',
        'transmission': 'automatic',
        'status': 'available',
        'category': suv,
        'brand': bmw,
        'description': 'Luxury SUV with premium features. All-wheel drive, leather interior, navigation system.',
        'features': ['Leather seats', 'Navigation', 'Sunroof', 'AWD', 'Premium sound system']
    },
    {
        'make': 'Ford',
        'model': 'F-150',
        'year': 2021,
        'vin': '1FTFW1E84MFA12345',
        'price': Decimal('42000.00'),
        'mileage': 35000,
        'color': 'Blue',
        'fuel_type': 'petrol',
        'transmission': 'automatic',
        'status': 'available',
        'category': truck,
        'brand': ford,
        'description': 'Powerful pickup truck with towing package. Perfect for work and recreation.',
        'features': ['Towing package', '4WD', 'Bed liner', 'Backup camera']
    },
    {
        'make': 'Mercedes-Benz',
        'model': 'C-Class',
        'year': 2023,
        'vin': 'WDDWF8EB4KR123456',
        'price': Decimal('52000.00'),
        'mileage': 8000,
        'color': 'White',
        'fuel_type': 'petrol',
        'transmission': 'automatic',
        'status': 'available',
        'category': sedan,
        'brand': mercedes,
        'description': 'Elegant Mercedes-Benz C-Class with cutting-edge technology and luxury amenities.',
        'features': ['Premium leather', 'Advanced safety features', 'Digital cockpit', 'Ambient lighting']
    },
    {
        'make': 'Audi',
        'model': 'A4',
        'year': 2022,
        'vin': 'WAUFFAFL4EN123456',
        'price': Decimal('45000.00'),
        'mileage': 18000,
        'color': 'Gray',
        'fuel_type': 'petrol',
        'transmission': 'automatic',
        'status': 'available',
        'category': sedan,
        'brand': audi,
        'description': 'Sophisticated Audi A4 with Quattro all-wheel drive and premium interior.',
        'features': ['Quattro AWD', 'Virtual cockpit', 'Bang & Olufsen sound', 'Heated seats']
    },
    {
        'make': 'Toyota',
        'model': 'RAV4',
        'year': 2023,
        'vin': '2T3P1RFV8PC123456',
        'price': Decimal('35000.00'),
        'mileage': 12000,
        'color': 'Red',
        'fuel_type': 'hybrid',
        'transmission': 'automatic',
        'status': 'available',
        'category': suv,
        'brand': toyota,
        'description': 'Fuel-efficient hybrid SUV with spacious interior and advanced safety features.',
        'features': ['Hybrid engine', 'Toyota Safety Sense', 'Apple CarPlay', 'Android Auto']
    },
]

# Create the cars
created_count = 0
for car_data in cars_data:
    car, created = Car.objects.get_or_create(
        vin=car_data['vin'],
        defaults=car_data
    )
    if created:
        created_count += 1
        print(f"Created: {car.year} {car.make} {car.model}")
    else:
        print(f"Already exists: {car.year} {car.make} {car.model}")

print(f"\nTotal cars created: {created_count}")
print(f"Total cars in database: {Car.objects.count()}")
