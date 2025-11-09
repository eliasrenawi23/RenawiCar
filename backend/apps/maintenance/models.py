"""
Maintenance models for tracking car repairs and parts.

This file defines:
- MaintenanceRecord: Overall repair/service record for a car
- MaintenancePart: Individual parts replaced/repaired with costs
"""

from django.db import models
from django.core.validators import MinValueValidator
from apps.cars.models import Car


class MaintenanceRecord(models.Model):
    """
    A maintenance/repair record for a car.
    Tracks when repairs were done and total cost.
    """
    car = models.ForeignKey(
        Car,
        on_delete=models.CASCADE,
        related_name='maintenance_records',
        help_text='The car this maintenance record is for'
    )
    repair_date = models.DateField(
        help_text='Date when the repair/maintenance was performed'
    )
    total_cost = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)],
        help_text='Total cost of this repair (sum of all parts + labor)'
    )
    description = models.TextField(
        help_text='Overall description of what was done',
        blank=True
    )

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Maintenance Record'
        verbose_name_plural = 'Maintenance Records'
        ordering = ['-repair_date']
        indexes = [
            models.Index(fields=['car', '-repair_date']),
        ]

    def __str__(self):
        return f"{self.car} - Maintenance on {self.repair_date}"

    def calculate_total_cost(self):
        """
        Calculate total cost from all parts.
        Returns the sum of (part_cost * quantity) for all parts.
        """
        total = sum(
            part.part_cost * part.quantity
            for part in self.parts.all()
        )
        return total

    def save(self, *args, **kwargs):
        """
        Override save to auto-calculate total cost if not provided.
        """
        super().save(*args, **kwargs)


class MaintenancePart(models.Model):
    """
    Individual part replaced/repaired in a maintenance record.
    """
    maintenance_record = models.ForeignKey(
        MaintenanceRecord,
        on_delete=models.CASCADE,
        related_name='parts',
        help_text='The maintenance record this part belongs to'
    )
    part_name = models.CharField(
        max_length=200,
        help_text='Name of the part (e.g., "Brake Pads", "Oil Filter")'
    )
    part_cost = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)],
        help_text='Cost per unit of this part'
    )
    quantity = models.IntegerField(
        default=1,
        validators=[MinValueValidator(1)],
        help_text='Number of this part used'
    )
    notes = models.TextField(
        blank=True,
        help_text='Additional notes about this part'
    )

    class Meta:
        verbose_name = 'Maintenance Part'
        verbose_name_plural = 'Maintenance Parts'
        ordering = ['part_name']

    def __str__(self):
        return f"{self.part_name} x{self.quantity} (${self.total_cost})"

    @property
    def total_cost(self):
        """Calculate total cost for this part (cost * quantity)"""
        return self.part_cost * self.quantity
