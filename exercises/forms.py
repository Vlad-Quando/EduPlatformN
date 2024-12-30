from django import forms


class TextForm(forms.Form):
    text = forms.CharField()
    mode = forms.CharField()


class FrForm(forms.Form):
    text = forms.CharField()


class MemoForm(forms.Form):
    quantity = forms.CharField()
    time = forms.CharField()


class ShulteForm(forms.Form):
    size = forms.CharField()
    type = forms.CharField()
    angle = forms.CharField()


class StrupForm(forms.Form):
    isTable = forms.CharField(empty_value='no')
    isWords = forms.CharField(empty_value='no')
    quantity = forms.CharField()
    time = forms.CharField()


class JoraForm(forms.Form):
    size = forms.CharField()


form_exercise_match = {
    "texts": TextForm,
    "skorochtenie": FrForm,
    "memo": MemoForm,
    "shulte-table": ShulteForm,
    "strup-test": StrupForm,
    "drakosha-zhora": JoraForm,
}