from django.contrib import admin

from exercises.models import *


# admin.site.register(Exercises)

@admin.register(Exercises)
class ExercisesAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}
    list_display = ['name',]


@admin.register(Texts)
class TextsAdmin(admin.ModelAdmin):
    list_display = ['name',]


@admin.register(Modes)
class ModesAdmin(admin.ModelAdmin):
    list_display = ['name',]


@admin.register(MemoItems)
class MemoItemsAdmin(admin.ModelAdmin):
    list_display = ['name', 'level', 'theme',]


@admin.register(SystemImages)
class SystemImagesAdmin(admin.ModelAdmin):
    list_display = ['name',]