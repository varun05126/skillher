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
        fields = ['skill_name', 'self_rated_level', 'years_of_experience', 'confidence_level', 'frequency_use', 'formal_training', 'primary_goal']
        widgets = {
            'skill_name': forms.TextInput(attrs={
                'class': 'input-glass block w-full mt-1',
                'placeholder': 'Enter skill name (e.g., Python, Communication)'
            }),
            'self_rated_level': forms.Select(attrs={
                'class': 'input-glass block w-full mt-1'
            }),
            'years_of_experience': forms.Select(attrs={
                'class': 'input-glass block w-full mt-1'
            }),
            'confidence_level': forms.Select(attrs={
                'class': 'input-glass block w-full mt-1'
            }),
            'frequency_use': forms.Select(attrs={
                'class': 'input-glass block w-full mt-1'
            }),
            'formal_training': forms.CheckboxInput(attrs={
                'class': 'mt-1'
            }),
            'primary_goal': forms.TextInput(attrs={
                'class': 'input-glass block w-full mt-1',
                'placeholder': "What's your primary goal for improving this skill?"
            }),
        }


class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['bio', 'career_goal', 'experience_level']
        widgets = {
            'bio': forms.Textarea(attrs={
                'class': 'glass w-full px-4 py-2 mb-2 focus:ring-2 focus:ring-indigo-500 focus-ring-opacity-50',
                'rows': 4,
                'placeholder': 'Tell us about yourself...'
            }),
            'career_goal': forms.TextInput(attrs={
                'class': 'glass w-full px-4 py-2 mb-2 focus:ring-2 focus:ring-indigo-500 focus-ring-opacity-50',
                'placeholder': 'Your career goal',
                'list': 'career-goal-suggestions'
            }),
            'experience_level': forms.Select(attrs={
                'class': 'glass w-full px-4 py-2 mb-2 focus:ring-2 focus:ring-indigo-500 focus-ring-opacity-50'
            }),
        }