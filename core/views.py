from django.shortcuts import render, redirect
from django.contrib.auth import login
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.auth.decorators import login_required
from django.urls import reverse_lazy
from django.views import View
from django.contrib import messages
from django.conf import settings
from .models import Profile, SkillAssessment, Recommendation
from .forms import BootstrapUserCreationForm, BootstrapAuthenticationForm, SkillAssessmentForm, ProfileForm
import os
import json
import groq

class RegisterView(View):
    template_name = 'register.html'

    def get(self, request):
        form = BootstrapUserCreationForm()
        return render(request, self.template_name, {'form': form})

    def post(self, request):
        form = BootstrapUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, 'Registration successful.')
            return redirect('dashboard')
        return render(request, self.template_name, {'form': form})

def home(request):
    return render(request, 'home.html')


# We'll use the built-in LoginView and LogoutView via URL configuration

@login_required
def dashboard(request):
    # Check if user has a profile; if not, redirect to profile
    try:
        profile = request.user.profile
    except Profile.DoesNotExist:
        return redirect('profile')

    # Get latest skill assessment
    latest_assessment = SkillAssessment.objects.filter(user=request.user).order_by('-created_at').first()
    # Get most recent recommendations (limit 1 for summary card? The spec says summary card of most recent recommendations (if any))
    # We'll get the latest recommendation for the summary card
    latest_recommendation = Recommendation.objects.filter(user=request.user).order_by('-created_at').first()
    # Count of assessments completed
    assessment_count = SkillAssessment.objects.filter(user=request.user).count()

    context = {
        'profile': profile,
        'latest_assessment': latest_assessment,
        'latest_recommendation': latest_recommendation,
        'assessment_count': assessment_count,
    }
    return render(request, 'dashboard.html', context)

@login_required
def assessment(request):
    if request.method == 'POST':
        form = SkillAssessmentForm(request.POST)
        if form.is_valid():
            assessment = form.save(commit=False)
            assessment.user = request.user
            assessment.save()
            messages.success(request, 'Skill assessment saved successfully.')
            return redirect('dashboard')
    else:
        form = SkillAssessmentForm()
    return render(request, 'assessment.html', {'form': form})

@login_required
def recommendations(request):
    # Handle POST for generating new recommendations
    if request.method == 'POST':
        # Get the user's latest skill assessment
        latest_assessment = SkillAssessment.objects.filter(user=request.user).order_by('-created_at').first()
        if not latest_assessment:
            messages.error(request, 'Please complete a skill assessment before generating recommendations.')
            return redirect('assessment')

        # Prepare prompt for Groq
        prompt = f"""
        Based on the following skill assessment, generate 3 personalized learning recommendations for skill development.
        Skill: {latest_assessment.skill_name}
        Self-rated level: {latest_assessment.get_self_rated_level_display()}

        For each recommendation, provide a title and a brief description (1-2 sentences). Focus on actionable steps to improve this skill.
        Return the recommendations as a JSON object with a "recommendations" key containing an array of objects, each with 'title' and 'description' fields.
        Example format:
        {{
            "recommendations": [
                {{"title": "Recommendation 1", "description": "Description 1"}},
                {{"title": "Recommendation 2", "description": "Description 2"}},
                {{"title": "Recommendation 3", "description": "Description 3"}}
            ]
        }}
        """

        try:
            # Initialize Groq client
            api_key = os.environ.get('GROQ_API_KEY')
            if settings.DEBUG:
                print(f"DEBUG: GROQ_API_KEY present: {bool(api_key)}")
            client = groq.Groq(api_key=api_key)
            # Call the Groq API
            chat_completion = client.chat.completions.create(
                messages=[
                    {
                        "role": "system",
                        "content": "You are an AI assistant that provides personalized learning recommendations for skill development."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                model="llama-3.3-70b-versatile",
                temperature=0.7,
                max_tokens=500,
                response_format={"type": "json_object"}
            )

            # Extract the response
            response_text = chat_completion.choices[0].message.content
            if settings.DEBUG:
                print(f"Groq raw response: {response_text}")
            # Parse the JSON
            data = json.loads(response_text)
            recommendations_list = data.get('recommendations', [])
            if settings.DEBUG:
                print(f"Parsed recommendations list: {recommendations_list}")

            # Save each recommendation
            for rec in recommendations_list[:3]:  # Ensure we only take up to 3
                title = rec.get('title', '').strip()
                description = rec.get('description', '').strip()
                if title and description:
                    Recommendation.objects.create(
                        user=request.user,
                        title=title,
                        description=description,
                        source='groq_ai'
                    )

            if recommendations_list:
                messages.success(request, f'Generated {len(recommendations_list)} new recommendations.')
            else:
                messages.warning(request, 'Could not generate recommendations. Please try again.')

        except Exception as e:
            if settings.DEBUG:
                print(f"Groq error: {e}")
            # Provide user-friendly error messages
            error_msg = str(e)
            if "api_key" in error_msg.lower() or "authentication" in error_msg.lower():
                messages.error(request, 'Authentication error with AI service. Please contact support.')
            elif "rate limit" in error_msg.lower():
                messages.error(request, 'AI service is temporarily busy. Please try again in a few moments.')
            elif "timeout" in error_msg.lower():
                messages.error(request, 'Request timed out. Please try again.')
            else:
                messages.error(request, 'Unable to generate recommendations at this time. Please try again later.')

        return redirect('recommendations')

    # GET request: show list of recommendations
    recommendations_list = Recommendation.objects.filter(user=request.user).order_by('-created_at')

    # Group into newest batch and older
    newest_batch = []
    older_batches = []
    if recommendations_list:
        latest_timestamp = recommendations_list.first().created_at
        for rec in recommendations_list:
            if rec.created_at == latest_timestamp:
                newest_batch.append(rec)
            else:
                older_batches.append(rec)

    context = {
        'newest_batch': newest_batch,
        'older_batches': older_batches,
    }
    return render(request, 'recommendations.html', context)


@login_required
def profile(request):
    # Get or create the user's profile
    profile, created = Profile.objects.get_or_create(user=request.user)

    if request.method == 'POST':
        form = ProfileForm(request.POST, instance=profile)
        if form.is_valid():
            form.save()
            messages.success(request, 'Profile updated successfully!')
            return redirect('dashboard')
    else:
        form = ProfileForm(instance=profile)

    return render(request, 'profile.html', {'form': form})