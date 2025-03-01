from django.urls import path, include
from . import views
urlpatterns = [
    path('', views.dashboard, name="dashboard"),
    path('/sos', views.sos, name="/sos"),
    path('/request', views.request, name="/request"),
]