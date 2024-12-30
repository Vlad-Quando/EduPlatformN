import random
import re


def word_from_end(text: str) -> str:

    start_word = None
    result: str = ''

    for i in range(len(text)):
        if text[i].isalpha():
            if start_word is None:
                start_word = i
        else:
            if start_word is not None:
                result += text[start_word:i][::-1] + text[i]
                start_word = None
            else:
                result += text[i]
    
    return result


def remove_vowels(text) -> str:

    result: str = ''
    for i in text:
        if i not in 'аяоеуэюиы':
            result += i
    
    return result


def random_spaces(text: str) -> str:

    result: str = ''

    for i in text:
        if not i == ' ':
            result += i + random.choice(['', '', ' '])
    
    return result


def random_register(text: str) -> str:

    result: str = ''

    for i in text:
        result += random.choice([i.upper(), i.lower()])
    
    return result


def random_register_spaces(text: str) -> str:

    result: str = ''

    for i in text:
        if not i == ' ':
            result += random.choice([i.upper(), i.lower()])
            result += random.choice(['', '', ' '])
    
    return result


def remove_spaces(text: str) -> str:

    result: str = ''

    for i in text:
        if not i == ' ':
            result += i
    
    return result


def annagrams(text: str) -> str:
    start_word = None
    result: str = ''

    for i in range(len(text)):
        if text[i].isalpha():
            if start_word is None:
                start_word = i
    
        else:
            if start_word is not None:
                word_list = list(text[start_word:i])
                random.shuffle(word_list)
                result += ''.join(word_list) + text[i]

                start_word = None
            else:
                result += text[i]
    
    return result


def split_text(text):
    # Регулярное выражение для разбивки текста на слова, знаки препинания и пробелы
    pattern = r'(\s*[\n]+|\s*[^\w\s]+|\s+|\w+(?: \w+)*)'

    # Используем re.findall для поиска всех соответствий
    elements = re.findall(pattern, text)

    # Фильтруем пустые строки
    elements: list[str] = [element for element in elements if element]

    combined_elements = list()
    current_signs = ""

    for elem in elements:
        try:
            if elem[0] in "«»!?,.:;- \n":
                current_signs += elem
            elif elem.isspace():
                current_signs += elem
            elif elem.split()[0].isalpha():
                if not current_signs:
                    combined_elements += elem.split()
                else:
                    combined_elements.append(current_signs)
                    combined_elements += elem.split()
                    current_signs = ""
        except Exception as e:
            print("ERROR |", elem, "|")
    
    if current_signs:
        combined_elements.append(current_signs)
        
    return combined_elements


def get_sentences(text_list: list[str]):
    words = list()
    signs = list()
    item_index = 0
    sentences: list[dict] = list()

    for item in text_list:
        if item.isalpha():
            words.append((item_index, item))
            item_index += 1
        elif item[-1] in ".!?\n«» ":
            signs.append((item_index, item))
            
            sentence = {"words": words.copy(), "signs": signs.copy()}
            sentences.append(sentence)

            words.clear()
            signs.clear()
            item_index = 0
        else:
            signs.append((item_index, item))
            item_index += 1
    
    return sentences


def shuffle_sentence_words(initial_text):
    splitted_text = split_text(initial_text)
    sentences: list[dict] = get_sentences(splitted_text)
    text = " "
    for sentence in sentences:
        cur: list[str] = sentence['words']
        random.shuffle(cur)

        for sign in sentence['signs']:
            cur.insert(sign[0], sign)
        
        for item in cur:
            if item[1].isalpha():
                if text[-1].isalpha():
                    text += ' ' + item[1]
                else:
                    text += item[1]
            elif item[1][0] in ",.!?:;":
                text += item[1]
        
    return text.strip()


def reverse_sentence_words(initial_text):
    splitted_text = split_text(initial_text)
    sentences: list[dict] = get_sentences(splitted_text)
    text = " "
    for sentence in sentences:
        cur: list[str] = sentence['words']
        cur = cur[::-1]

        for sign in sentence['signs']:
            cur.insert(sign[0], sign)
        
        for item in cur:
            if item[1].isalpha():
                if text[-1].isalpha():
                    text += ' ' + item[1]
                else:
                    text += item[1]
            elif item[1][0] in ",.!?:;":
                text += item[1]
        
    return text.strip()    


modes = {"Слова с конца": word_from_end,
         "Убрать гласные": remove_vowels,
         "Перемешать слова": shuffle_sentence_words,
         "Случайные пробелы": random_spaces,
         "Случайные регистры и пробелы": random_register_spaces,
         "Предложения с конца": reverse_sentence_words,
         "Случайный регистр": random_register,
         "Убрать пробелы": remove_spaces,
         "Анаграмма": annagrams}
