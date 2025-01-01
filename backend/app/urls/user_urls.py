from django.urls import path
from app.views import user_views as views

urlpatterns = [
    path('', views.get_all_users, name='all_users'),
    path('<int:pk>', views.get_single_user, name='get_single_users'),
    path('register', views.register_user, name='user_register'),
    path('login', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile', views.get_user_profile, name='user_profile'),
    path('profile/update', views.update_user_profile, name='user_update_profile'),
]