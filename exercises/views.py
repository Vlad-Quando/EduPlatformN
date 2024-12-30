from django.shortcuts import render, redirect
from django.contrib import messages

from exercises.models import Exercises, Texts
from exercises.forms import form_exercise_match
from exercises.exercises_logic.exercise_data_collector import exercise_collector_match


templates_folder = ""


def exercises_list(request):
    exercises = Exercises.objects.all()
    context = {
        'exercises': exercises,
    }
    return render(request, "exercises/system-templates/exercises-list.html", context)


def exercise_page(request, exercise_slug):
    global templates_folder
    page_name = ""
    exercise = ""

    if request.method == "GET":
        exercise = Exercises.objects.get(slug=exercise_slug)

        templates_folder = exercise.templates_folder_name
        if templates_folder == "system-templates":
            page_name = "in-develop.html"
        else:
            page_name = "settings.html"

        context = {
            'exercise_data': exercise,
            'slug': exercise_slug
        }

    elif request.method == "POST":
        form = form_exercise_match[exercise_slug](data=request.POST)
        
        if form.is_valid():
            data = exercise_collector_match[exercise_slug](request.POST)
            context = {
                "slug": exercise_slug,
                "data": data,
            }
        page_name = "exe.html"
    try:
        return render(request, f"exercises/{templates_folder}/{page_name}", context)
    except Exception as e:
        return redirect("/")


def add_text(request):
    if request.method == "POST":
        try:
            Texts.objects.create(name=request.POST['name'], content=request.POST['content'])
            messages.info(request, "Текст успешно сохранён!")
        except Exception as e:
            messages.debug(request, e)
    return redirect("/users/options")