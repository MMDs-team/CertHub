from django.urls import path
from app.views import template_views as views

urlpatterns = [
    path('', views.get_public_templates, name='get_public_templates'),
    path('<int:pk>', views.get_template, name='get_template'),
    path('history', views.template_history, name='template_history'),
    path('create', views.create_template, name='create_template'),
    path('remove/<int:pk>', views.remove_template, name='remove_template'),
    path('count_fields/<int:pk>', views.count_blank_fields, name='count_blank_fiels'),
    path('make_doc/<int:pk>', views.make_doc, name='make_doc'),
    path('download_doc/<int:pk>', views.donwload_doc, name='donwload_doc'),
    path('get_certs/<int:pk>', views.get_certs, name='get_certs'),
]