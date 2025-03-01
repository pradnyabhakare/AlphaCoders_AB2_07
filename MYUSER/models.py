from django.db import models


class UserInfo(models.Model):
    username = models.CharField(max_length=150, unique=True)
    fname = models.CharField(max_length=50)
    mname = models.CharField(max_length=50, blank=True, null=True)
    lname = models.CharField(max_length=50)
    blood_type = models.CharField(max_length=5)
    location = models.CharField(max_length=255)
    contacts = models.TextField()  # Store multiple contacts as comma-separated values or JSON

    def __str__(self):
        return f"{self.fname} {self.lname} ({self.username})"

class PastDonation(models.Model):
    user = models.ForeignKey(UserInfo, on_delete=models.CASCADE, related_name="past_donations")
    where = models.CharField(max_length=255)
    donation_for = models.CharField(max_length=255)  # Avoid using `for` as it's a reserved keyword
    unit = models.CharField(max_length=20)

    def __str__(self):
        return f"Donation by {self.user.username} - {self.unit} at {self.where}"
