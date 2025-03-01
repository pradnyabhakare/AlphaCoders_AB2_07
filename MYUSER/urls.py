from django.urls import path, include
from . import views
urlpatterns = [
    path('', views.dashboard, name=" App"),
    path('/sos', views.sos, name="/sos"),
]