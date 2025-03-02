from django.urls import path, include
from . import views
urlpatterns = [
    path('', views.bb_dashboard, name="bb_dashboard"),
]