from django import forms
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from .models import Profile, SkillAssessment, Recommendation

class BootstrapAuthenticationForm(AuthenticationForm):
    username = forms.CharField(
        widget=forms.TextInput(attrs={
            'class': 'input-glass block w-full mt-1',
            'placeholder': 'Username'
        })
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'class': 'input-glass block w-full mt-1',
            'placeholder': 'Password'
        })
    )

class BootstrapUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        fields = ('username',)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['username'].widget.attrs.update({
            'class': 'input-glass block w-full mt-1',
            'placeholder': 'Username'
        })
        self.fields['password1'].widget.attrs.update({
            'class': 'input-glass block w-full mt-1',
            'placeholder': 'Password'
        })
        self.fields['password2'].widget.attrs.update({
            'class': 'input-glass block w-full mt-1',
            'placeholder': 'Confirm Password'
        })

class SkillAssessmentForm(forms.ModelForm):
    class Meta:
        model = SkillAssessment
        fields = ['skill_name', 'self_rated_level']
        widgets = {
            'skill_name': forms.TextInput(attrs={
                'class': 'input-glass block w-full mt-1',
                'placeholder': 'Enter skill name (e.g., Python, Communication)'
            }),
            'self_rated_level': forms.Select(attrs={
                'class': 'input-glass block w-full mt-1'
            }),
        }