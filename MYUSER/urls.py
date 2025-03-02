from django.urls import path, include
from . import views
urlpatterns = [
    path('logoutuser', views.logoutuser, name="logoutuser"),
    path('', views.dashboard, name="dashboard"),
    path('/sos', views.sos, name="/sos"),
    path('/request', views.request, name="/request"),
    path('/bloodbanklist', views.bloodbanklist, name="/bloodbanklist"),
    path('/api/bloodbanks/', views.get_blood_banks, name='get_blood_banks'),
    path('/banklist', views.banklist, name='/banklist'),
    path('/donateblood', views.navigation, name='/donateblood'),
    path('/notification', views.notification, name='/notification'),
    path('/impcontact', views.impcontact, name='/impcontact'),
    path('/aboutus', views.aboutus, name='/aboutus'),
    path("/api/transactions/", views.get_transactions, name="get-transactions"),
    path('/api/sos-notifications/', views.get_sos_notifications, name='sos-notifications'),
]