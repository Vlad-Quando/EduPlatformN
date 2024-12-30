import re

from django.urls import path
from exercises.views import exercises_list, exercise_page, add_text

app_name = 'exercises'

urlpatterns = [
    path('', exercises_list, name="exercises-list"),
    path('<slug:exercise_slug>/', exercise_page, name="exercise-page"),
    path('addtext', add_text, name="add_text"),
]
