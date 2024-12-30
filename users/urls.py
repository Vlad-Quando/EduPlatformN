from django.urls import path
from users.views import login_view, profile, options_list, useradd

app_name = 'users'

urlpatterns = [
    path('login/', login_view, name="login"),
    path('profile/', profile, name="profile"),
    path('options/', options_list, name="options_list"),
    path('useradd/', useradd, name='useradd')
]