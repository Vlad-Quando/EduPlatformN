from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from users.forms import UserForm
from django.contrib.auth import authenticate, login, logout
from users.models import User
from exercises.models import SystemImages


def login_view(request):
    if request.method == 'POST':
        form = UserForm(data=request.POST)
        if form.is_valid():
            username = request.POST['username']
            password = request.POST['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                user = User.objects.get(username=username)
                return render(request, 'users/profile.html')
            else:
                form = UserForm()
    return render(request, "users/login.html")


@login_required(login_url="users:login")
def profile(request):
    user = request.user
    if request.GET.get('logout', 'false') == 'true':
        logout(request)
        return render(request, "users/login.html")
    data = {
        'request': request,
        'user': user
    }
    return render(request, "users/profile.html", data)


def options_list(request):
    return render(request, "users/options_list.html")


def useradd(request):
    if request.method == 'POST':
        username = request.POST['username']
        firstname = request.POST['firstname']
        lastname = request.POST['lastname']
        email = request.POST['email']
        password = request.POST['password']
        confirm_password = request.POST['confirm_password']

        if password and confirm_password and password == confirm_password:
            user = User.objects.create_user(username, email, password)
            user.first_name = firstname
            user.last_name = lastname
            user.save()

            data = {
                'request': request,
                'user': user,
                'img_placeholder': SystemImages.objects.get(name="Profile_placeholder")
            }
            return render(request, "users/profile.html", data)
    return render(request, "users/useradd.html")