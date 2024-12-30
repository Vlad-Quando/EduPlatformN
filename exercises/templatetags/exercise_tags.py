from django import template
from atexit import register
from exercises.models import Texts, Modes, SystemImages


register = template.Library()


@register.simple_tag()
def get_texts():
    texts = Texts.objects.all()
    return texts


@register.simple_tag()
def get_modes():
    modes = Modes.objects.all()
    return modes


@register.simple_tag()
def get_sysImg_url():
    img = SystemImages.objects.get(name="Memo placeholder")
    return img.image.url


@register.simple_tag()
def get_await_time(*data):
    for i in data[0]:
        if 'await-time' in i.keys():
            return i['await-time']

        

@register.simple_tag()
def get_timer_time(*data):
    for i in data[0]:
        if 'timer-time' in i.keys():
            return i['timer-time']
        

@register.simple_tag()
def get_timer_previous_time(*data):
    for i in data[0]:
        if 'timer-time' == i:
            secs = int(i['timer-time'])
            if secs >= 60:
                return f"01:{secs - 60}"
            return secs
    