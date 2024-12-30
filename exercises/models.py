from django.db import models


class Exercises(models.Model):
    name = models.CharField(max_length=20, unique=True, verbose_name="Упражнение")
    image = models.ImageField(upload_to='exercises_images', verbose_name="Изображение")
    slug = models.SlugField(max_length=200, unique=True, blank=True, null=True, verbose_name='URL')
    templates_folder_name = models.CharField(max_length=40, default="in-develop-templates", verbose_name="Папка шаблонов")

    class Meta:
        db_table = 'exercises'
        verbose_name = 'упражнение'
        verbose_name_plural = 'Упражнения'

    def __str__(self):
        return self.name
    
class Texts(models.Model):
    name = models.CharField(max_length=20, unique=True, verbose_name="Заголовок")
    content = models.TextField(verbose_name="Текст")

    class Meta:
        db_table = 'texts'
        verbose_name = 'текст'
        verbose_name_plural = 'тексты'
    
    def __str__(self):
        return self.name


class Modes(models.Model):
    name = models.CharField(verbose_name='Режим', max_length=100, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Режим"
        verbose_name_plural = "Режимы"


class MemoItems(models.Model):

    class Level(models.IntegerChoices):
        First = 1, '1'
        Second = 2, '2'
        Third = 3, '3'
        Fourth = 4, '4'

    class Theme(models.IntegerChoices):
        RoadTransport = 1, 'Транспорт'
        Animals = 2, 'Животные'
        Travel = 3, 'Путешествие'
        Nature = 4, 'Природа'
        Music = 5, 'Музыка'
        Furniture = 6, 'Мебель'
        Landscape = 7, 'Пейзажи'
        Clothes = 8, 'Одежда'

    name = models.CharField(verbose_name='Название', max_length=100, blank=False)
    image = models.ImageField(upload_to='memo_items', verbose_name="Изображение", blank=False)
    level = models.IntegerField(verbose_name="Уровень", choices=Level.choices, unique=False, blank=True, default=Level.First)
    theme = models.IntegerField(verbose_name="Тема", choices=Theme.choices, unique=False, blank=True, null=True)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Memo-предмет"
        verbose_name_plural = "Memo-предметы"

    
class SystemImages(models.Model):
    name = models.CharField(verbose_name='Название', max_length=100, blank=False, unique=True)
    image = models.ImageField(upload_to='sys_img', verbose_name="Изображение", blank=False, default="user_placeholder.png")

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Системное изображение"
        verbose_name_plural = "Системные изображения"