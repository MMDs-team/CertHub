from django.contrib import admin
from django.contrib.auth.admin import UserAdmin 
from .models import *

class UserProfileAdmin(UserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'organization', 'is_staff')
    fieldsets = UserAdmin.fieldsets + (('Additional Info', {'fields': ('organization',)}),)

admin.site.register(Template)
admin.site.register(UserProfile, UserProfileAdmin)