from django.contrib import admin
from .models import Site, Review

@admin.register(Site)
class SiteAdmin(admin.ModelAdmin):
    list_display = ['name']

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    # list_display = ['name']
    pass
