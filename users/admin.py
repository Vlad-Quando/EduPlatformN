from django.contrib import admin
from users.models import *

# Register your models here.
@admin.register(User)
class UserAdminModel(admin.ModelAdmin):
    list_display = ['username', 'first_name', 'last_name', 'email', 'image',]