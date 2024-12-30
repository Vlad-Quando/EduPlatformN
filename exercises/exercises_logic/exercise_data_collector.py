from django.http.request import QueryDict
from exercises.models import *
from exercises.exercises_logic.text_modes import modes
from exercises.forms import *
from random import shuffle


def shuffle_queryset(array):
    indexes = list(i for i in range(len(array)))
    shuffle(indexes)
    result = list()
    for i in indexes:
        result.append(array[i])
    return result


def collect_data_for_texts(context: QueryDict) -> dict:
    data = dict()

    text = Texts.objects.get(name=context["text"]).content
    mode = Modes.objects.get(name=context["mode"]).name
    data["text"] = modes[mode](text)
    
    return data


def collect_data_for_fr(context: QueryDict) -> dict:
    text = Texts.objects.get(name=context["text"]).content
    time = context['timer']
    text_list = text.split()
    result = ""
    count = 1
    for word in text_list:
        if word.isalpha():
            cur = f' <a class="fr-word" id="{count}" onclick="showResults(event)"><span>' + word + '</span></a>'
            result += cur
        elif len(word) > 1:
            cur = f' <a class="fr-word" id="{count}" onclick="showResults(event)"><span>' + word[:-1] + '</span></a>' + word[-1]
            result += cur
        count += 1
    items = {"text": result.strip(), "time": time}
    return items


def collect_data_for_memo(context: QueryDict):
    items_count = int(context['quantity']) // 2
    preparing_time = int(context['time']) * 1000

    items = list(MemoItems.objects.all())
    shuffle(items)
    items = items[:items_count] * 2
    shuffle(items)

    data = {'items': items, 'preparing_time': preparing_time, "quantity": items_count * 2}

    return data


def collect_data_for_shulte(context: QueryDict):
    size = int(context['size'][0])
    table_type = context['type']
    angle = context['angle']

    if table_type == "nums":
        ordered_array = list(i for i in range(1, size ** 2 + 1))
        unordered_array = ordered_array.copy()
        shuffle(unordered_array)
    elif table_type == "letters":
        ordered_array = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Ю'][:size ** 2]
        unordered_array = ordered_array.copy()
        shuffle(unordered_array)

    return {'ordered_array': ordered_array[::-1], 'unordered_array': unordered_array, 'size': size, 'angle': angle}


def collect_data_for_strup(context: QueryDict):
    data = {
        'красный': 'red',
        'коричневый': 'brown',
        'фиолетовый': 'violet',
        'зелёный': 'green',
        'оранжевый': 'orange',
        'синий': 'blue',
        'чёрный': 'black',
        'жёлтый': 'yellow',
        'белый': 'white',
        'розовый': 'pink',
    }
    data_keys = list(data.keys())

    words = list()
    cur_quantity, i = int(context['quantity']), 0
    while cur_quantity:
        words.append(data_keys[i])
        i += 1
        cur_quantity -= 1
        if i == 10: i = 0
    shuffle(words)
    
    if 'isWords' in context.keys():
        mode = 'words'
    elif 'isTable' in context.keys():
        mode = 'table'
    
    if mode == "table":
        text = ''
        for word in words:
            text += f'<p class="table-word" id="{data[word]}">{word}</p>'
        return {'mode': mode, 'words': text}
    elif mode == "words":
        text = ""
        for i in range(len(words)):
            text += f'<p class="words-word" id="{data[words[i]]}">{words[i]}</p>, '
        text += f'<p class="words-word">Конец!</p>, '
        return {'mode': mode, 'words': text, 'time': float(context['time'])}


def collect_data_for_jora(context:QueryDict):
    time = float(context['timer'])
    size = int(context['size'])
    steps = int(context['steps'])
    items = list()

    alpha_cords = list([{'content': 'А', 'type': 'cordA'}, {'content': 'Б', 'type': 'cordA'},
                        {'content': 'В', 'type': 'cordA'}, {'content': 'Г', 'type': 'cordA'},
                        {'content': 'Д', 'type': 'cordA'}, {'content': 'Е', 'type': 'cordA'},
                        {'content': 'Ж', 'type': 'cordA'}, {'content': 'З', 'type': 'cordA'},
                        {'content': 'И', 'type': 'cordA'}])[:size]
    num_cords = list(i + 1 for i in range(size))

    for i in range(size):
        for j in range(size):
            items.append({'pos': f"{i}-{j}", 'type': 'cell'})

    return {"items": items, 'alphaCords': alpha_cords, 'numCords': num_cords, "time": time, "size": size, "steps": steps}


exercise_collector_match = {
    "texts": collect_data_for_texts,
    "skorochtenie": collect_data_for_fr,
    "memo": collect_data_for_memo,
    "shulte-table": collect_data_for_shulte,
    "strup-test": collect_data_for_strup,
    "drakosha-zhora": collect_data_for_jora,
}