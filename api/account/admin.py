from django.contrib import admin
from django.contrib.auth.models import Group
from .models import CustomUser, Profile

admin.site.unregister(Group)

@admin.register(CustomUser)
class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'email', 'date_joined', 'is_admin']

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'email']