from django.db import models
from django.contrib import admin

class UserInfo(models.Model):
    username = models.CharField(max_length=150, unique=True)
    fname = models.CharField(max_length=50)
    mname = models.CharField(max_length=50, blank=True, null=True)
    lname = models.CharField(max_length=50)
    blood_type = models.CharField(max_length=5)
    location = models.CharField(max_length=255)
    contacts = models.TextField()

    def __str__(self):
        return f"{self.fname} {self.lname} ({self.username})"

class PastDonation(models.Model):
    user = models.ForeignKey(UserInfo, on_delete=models.CASCADE, related_name="past_donations")
    where = models.CharField(max_length=255)
    donation_for = models.CharField(max_length=255) 
    unit = models.CharField(max_length=20)

    def __str__(self):
        return f"Donation by {self.user.username} - {self.unit} at {self.where}"
    
class Transaction(models.Model):
    STATUS_CHOICES = [
        (True, "completed"),
        (False, "pending"),
    ]
    user_from = models.ForeignKey("UserInfo", on_delete=models.CASCADE, related_name="sent_requests")
    user_full_name = models.CharField(max_length=150)
    user_contact_information = models.TextField()
    request_type = models.CharField(max_length=100)
    request_location = models.CharField(max_length=255)

    user_to = models.ForeignKey("UserInfo", on_delete=models.CASCADE, related_name="received_requests", null=True, blank=True)
    donor_full_name = models.CharField(max_length=150, blank=True, null=True)
    donor_location = models.CharField(max_length=255, blank=True, null=True)
    
    blood_type = models.CharField(max_length=5)
    unit = models.CharField(max_length=20)
    status = models.BooleanField(choices=STATUS_CHOICES, default=False)

    def __str__(self):
        return f"{self.user_full_name} -> {self.donor_full_name if self.donor_full_name else 'Pending'} ({self.blood_type}, {self.unit})"


class BloodBank(models.Model):
    name = models.CharField(max_length=255, unique=True)
    location = models.CharField(max_length=255)
    address = models.TextField()
    contact_no = models.CharField(max_length=15, unique=True)

    # Default storage values for blood units
    default_storage = {
        "A+": 5000, "B+": 5000, "O+": 5000, "A-": 5000,
        "B-": 5000, "O-": 5000, "AB+": 5000, "AB-": 5000
    }
    
    storage = models.JSONField(default=dict)  # Storing as a JSON field

    def save(self, *args, **kwargs):
        if not self.storage:
            self.storage = self.default_storage  # Initialize storage if not set
        super().save(*args, **kwargs)

    def update_stock(self, blood_type, amount):
        """ Update blood stock: reduce or add units """
        if blood_type in self.storage:
            self.storage[blood_type] += amount
            self.save()
        else:
            raise ValueError("Invalid blood type")

    def __str__(self):
        return f"{self.name} ({self.location})"
    

class SOSNotification(models.Model):
    location = models.CharField(max_length=255)
    blood_type = models.CharField(max_length=5)
    info = models.TextField()

    def __str__(self):
        return f"SOS at {self.location}"  
    
admin.site.register(UserInfo) 
admin.site.register(PastDonation) 
admin.site.register(Transaction) 
admin.site.register(BloodBank) 
admin.site.register(SOSNotification) 
