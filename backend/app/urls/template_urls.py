from django.urls import path
from app.views import template_views as views

urlpatterns = [
    path('', views.get_public_templates, name='get_public_templates'),
]