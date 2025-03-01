from django.db import models
from django.contrib import admin

class UserAuthData(models.Model):
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=255)  # Store hashed passwords!

    def __str__(self):
        return self.username


admin.site.register(UserAuthData) 