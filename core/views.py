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
from datetime import datetime

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

    # Get all assessments for skill progress display
    all_assessments = SkillAssessment.objects.filter(user=request.user).order_by('-created_at')

    # Get most recent recommendations
    latest_recommendation = Recommendation.objects.filter(user=request.user).order_by('-created_at').first()

    # Count of assessments completed
    assessment_count = SkillAssessment.objects.filter(user=request.user).count()

    # Count of recommendations
    recommendation_count = Recommendation.objects.filter(user=request.user).count()

    # Get recent activity (combined assessments and recommendations, ordered by date)
    recent_assessments = SkillAssessment.objects.filter(user=request.user).order_by('-created_at')[:3]
    recent_recommendations = Recommendation.objects.filter(user=request.user).order_by('-created_at')[:3]

    # Combine and sort by date
    recent_activity = []
    for assessment in recent_assessments:
        recent_activity.append({
            'type': 'assessment',
            'date': assessment.created_at,
            'description': f'Assessed {assessment.skill_name} skills',
            'level': assessment.get_self_rated_level_display(),
            'proficiency': assessment.proficiency  # Add proficiency for display
        })
    for recommendation in recent_recommendations:
        recent_activity.append({
            'type': 'recommendation',
            'date': recommendation.created_at,
            'description': recommendation.title,
            'level': recommendation.source
        })

    # Sort by date descending
    recent_activity.sort(key=lambda x: x['date'], reverse=True)
    recent_activity = recent_activity[:5]  # Limit to 5 most recent

    # Calculate learning progress based on latest assessment proficiency
    # If no assessment yet, show 0%
    if latest_assessment:
        progress_percentage = latest_assessment.proficiency
    else:
        progress_percentage = 0

    context = {
        'profile': profile,
        'latest_assessment': latest_assessment,
        'all_assessments': all_assessments,  # For skill progress display
        'latest_recommendation': latest_recommendation,
        'assessment_count': assessment_count,
        'recommendation_count': recommendation_count,
        'recent_activity': recent_activity,
        'progress_percentage': progress_percentage,
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
    # Handle POST for generating new recommendations/skill gap analysis
    if request.method == 'POST':
        # Get the user's latest skill assessment
        latest_assessment = SkillAssessment.objects.filter(user=request.user).order_by('-created_at').first()
        if not latest_assessment:
            messages.error(request, 'Please complete a skill assessment before generating recommendations.')
            return redirect('assessment')

        # Get user profile for additional context
        profile, created = Profile.objects.get_or_create(user=request.user)

        # Prepare prompt for Grok to generate comprehensive skills gap analysis
        proficiency_info = f"{latest_assessment.proficiency}%" if hasattr(latest_assessment, 'proficiency') and latest_assessment.proficiency is not None else "Not assessed"

        prompt = f"""
        Based on the following skill assessment and user profile, provide a comprehensive skills gap analysis for skill development.

        SKILL ASSESSMENT:
        - Skill: {latest_assessment.skill_name}
        - Self-rated level: {latest_assessment.get_self_rated_level_display()}
        - Years of experience: {dict(SkillAssessment.YEARS_OF_EXPERIENCE_CHOICES).get(latest_assessment.years_of_experience, 'Not specified') if latest_assessment.years_of_experience is not None else 'Not specified'}
        - Confidence level: {latest_assessment.confidence_level}/5 if latest_assessment.confidence_level else 'Not specified'
        - Frequency of use: {latest_assessment.frequency_use if latest_assessment.frequency_use else 'Not specified'}
        - Formal training: {'Yes' if latest_assessment.formal_training else 'No'} if hasattr(latest_assessment, 'formal_training') else 'Not specified'
        - Proficiency level: {proficiency_info}
        - Primary goal: {latest_assessment.primary_goal if latest_assessment.primary_goal else 'Not specified'}

        USER PROFILE:
        - Career goal: {profile.career_goal if profile.career_goal else 'Not specified'}
        - Experience level: {profile.get_experience_level_display() if profile.experience_level else 'Not specified'}

        Provide a JSON object with the following keys:
        1. "current_skills": Array of strings representing the user's current skills in this domain
        2. "missing_skills": Array of strings representing skills the user needs to develop
        3. "recommended_skills": Array of strings representing specific skills to focus on learning
        4. "career_readiness": Integer percentage (0-100) representing how prepared the user is for their career goals
        5. "next_steps": Array of strings representing actionable next steps for skill development

        Make the content personalized, actionable, and based on the assessment data provided.
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
                        "content": "You are an AI assistant that provides comprehensive skills gap analysis and personalized learning recommendations for career development."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                model="llama-3.3-70b-versatile",
                temperature=0.7,
                max_tokens=1000,
                response_format={"type": "json_object"}
            )

            # Extract the response
            response_text = chat_completion.choices[0].message.content
            if settings.DEBUG:
                print(f"Groq raw response: {response_text}")
            # Parse the JSON
            data = json.loads(response_text)

            # Extract the analysis components
            current_skills = data.get('current_skills', [])
            missing_skills = data.get('missing_skills', [])
            recommended_skills = data.get('recommended_skills', [])
            career_readiness = data.get('career_readiness', 0)
            next_steps = data.get('next_steps', [])

            # Validate and clean the data
            if not isinstance(current_skills, list):
                current_skills = []
            if not isinstance(missing_skills, list):
                missing_skills = []
            if not isinstance(recommended_skills, list):
                recommended_skills = []
            if not isinstance(next_steps, list):
                next_steps = []

            # Ensure career_readiness is an integer between 0-100
            try:
                career_readiness = int(career_readiness)
                career_readiness = max(0, min(100, career_readiness))  # Clamp between 0-100
            except (ValueError, TypeError):
                career_readiness = 0

            # Clear previous recommendations for this user (to avoid clutter)
            # In a real app, you might want to keep history, but for simplicity we'll replace
            Recommendation.objects.filter(user=request.user).delete()

            # Save the analysis as separate recommendation entries for each category
            # We'll create special marker entries to distinguish the analysis components

            # Save current skills
            if current_skills:
                Recommendation.objects.create(
                    user=request.user,
                    title="Current Skills",
                    description="\n".join([f"• {skill}" for skill in current_skills]),
                    source='groq_analysis'
                )

            # Save missing skills
            if missing_skills:
                Recommendation.objects.create(
                    user=request.user,
                    title="Missing Skills",
                    description="\n".join([f"• {skill}" for skill in missing_skills]),
                    source='groq_analysis'
                )

            # Save recommended skills
            if recommended_skills:
                Recommendation.objects.create(
                    user=request.user,
                    title="Recommended Skills to Learn",
                    description="\n".join([f"• {skill}" for skill in recommended_skills]),
                    source='groq_analysis'
                )

            # Save career readiness
            Recommendation.objects.create(
                user=request.user,
                title="Career Readiness",
                description=f"{career_readiness}% ready for your career goals",
                source='groq_analysis'
            )

            # Save next steps
            if next_steps:
                Recommendation.objects.create(
                    user=request.user,
                    title="Next Steps",
                    description="\n".join([f"• {step}" for step in next_steps]),
                    source='groq_analysis'
                )

            total_items = sum(bool(x) for x in [current_skills, missing_skills, recommended_skills, next_steps]) + 1  # +1 for career readiness
            if total_items > 1:  # At least some content was generated
                messages.success(request, f'Generated comprehensive skills gap analysis with {total_items} components.')
            else:
                messages.warning(request, 'Could not generate complete analysis. Please try again.')

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
                messages.error(request, 'Unable to generate analysis at this time. Please try again later.')

        return redirect('recommendations')

    # GET request: show the skills gap analysis
    # Get all analysis components for the user, ordered by type to display consistently
    analysis_items = Recommendation.objects.filter(user=request.user, source='groq_analysis').order_by('title')

    # Organize by type for easier template handling
    current_skills_item = None
    missing_skills_item = None
    recommended_skills_item = None
    career_readiness_item = None
    next_steps_item = None

    for item in analysis_items:
        if item.title == "Current Skills":
            current_skills_item = item
        elif item.title == "Missing Skills":
            missing_skills_item = item
        elif item.title == "Recommended Skills to Learn":
            recommended_skills_item = item
        elif item.title == "Career Readiness":
            career_readiness_item = item
        elif item.title == "Next Steps":
            next_steps_item = item

    context = {
        'current_skills_item': current_skills_item,
        'missing_skills_item': missing_skills_item,
        'recommended_skills_item': recommended_skills_item,
        'career_readiness_item': career_readiness_item,
        'next_steps_item': next_steps_item,
        'has_analysis': any([current_skills_item, missing_skills_item, recommended_skills_item, career_readiness_item, next_steps_item]),
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


@login_required
def learning_roadmap(request):
    """Generate and display a personalized learning roadmap"""
    # Get the user's latest skill assessment
    latest_assessment = SkillAssessment.objects.filter(user=request.user).order_by('-created_at').first()

    # Get user profile for additional context
    profile, created = Profile.objects.get_or_create(user=request.user)

    # Get user's assessments for history
    assessments = SkillAssessment.objects.filter(user=request.user).order_by('-created_at')

    # Get existing recommendations if any
    recommendations = Recommendation.objects.filter(user=request.user).order_by('-created_at')

    if request.method == 'POST':
        # Generate new roadmap
        if not latest_assessment:
            messages.error(request, 'Please complete a skill assessment before generating a learning roadmap.')
            return redirect('assessment')

        # Prepare prompt for Groq to generate learning roadmap
        proficiency_info = f"{latest_assessment.proficiency}%" if hasattr(latest_assessment, 'proficiency') and latest_assessment.proficiency is not None else "Not assessed"

        # Get list of skills user has been assessed on
        assessed_skills = [a.skill_name for a in assessments]

        prompt = f"""
        Based on the following information, create a personalized learning roadmap for skill development that leads to the user's career goals.

        USER PROFILE:
        - Career goal: {profile.career_goal if profile.career_goal else 'Not specified'}
        - Experience level: {profile.get_experience_level_display() if profile.experience_level else 'Not specified'}

        CURRENT SKILLS ASSESSMENT:
        - Primary skill: {latest_assessment.skill_name}
        - Self-rated level: {latest_assessment.get_self_rated_level_display()}
        - Years of experience: {dict(SkillAssessment.YEARS_OF_EXPERIENCE_CHOICES).get(latest_assessment.years_of_experience, 'Not specified') if latest_assessment.years_of_experience is not None else 'Not specified'}
        - Confidence level: {latest_assessment.confidence_level}/5 if latest_assessment.confidence_level else 'Not specified'
        - Proficiency level: {proficiency_info}
        - Primary goal for this skill: {latest_assessment.primary_goal if latest_assessment.primary_goal else 'Not specified'}

        PREVIOUSLY ASSESSED SKILLS:
        {', '.join(assessed_skills) if assessed_skills else 'None yet'}

        Generate a logical learning progression that builds from the user's current skills toward their career goals.
        The roadmap should include 6-8 sequential steps (skills/topics to learn) that flow naturally from foundation to advanced topics.

        Return a JSON object with:
        1. "roadmap_title": A title for this learning journey
        2. "steps": An array of objects, each containing:
           - "title": The skill/topic to learn
           - "description": A brief description of what to learn and why it's important
           - "estimated_time": Suggested time to complete (e.g., "2-4 weeks")
           - "resources": Array of suggested learning resource types (e.g., ["online course", "tutorial", "practice project"])
        3. "final_goal": The ultimate career or skill goal this roadmap leads to
        4. "total_duration": Estimated total time to complete the full roadmap

        Make the progression logical, starting with foundational concepts and building to advanced topics that align with the user's career goal.
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
                        "content": "You are an expert learning architect and career advisor who creates personalized, sequential learning roadmaps for skill development."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                model="llama-3.3-70b-versatile",
                temperature=0.7,
                max_tokens=1500,
                response_format={"type": "json_object"}
            )

            # Extract the response
            response_text = chat_completion.choices[0].message.content
            if settings.DEBUG:
                print(f"Groq raw response: {response_text}")
            # Parse the JSON
            data = json.loads(response_text)

            # Extract roadmap data
            roadmap_title = data.get('roadmap_title', 'Your Learning Journey')
            steps = data.get('steps', [])
            final_goal = data.get('final_goal', 'Career Readiness')
            total_duration = data.get('total_duration', 'Several months')

            # Validate and clean the data
            if not isinstance(steps, list):
                steps = []

            # Ensure each step has required fields
            cleaned_steps = []
            for step in steps:
                if isinstance(step, dict):
                    cleaned_step = {
                        'title': str(step.get('title', 'Learning Step')),
                        'description': str(step.get('description', 'Develop your skills')),
                        'estimated_time': str(step.get('estimated_time', 'Variable')),
                        'resources': step.get('resources', ['Online resources', 'Practice']) if isinstance(step.get('resources'), list) else ['Online resources', 'Practice']
                    }
                    cleaned_steps.append(cleaned_step)

            # Store the roadmap in the session for display
            request.session['learning_roadmap'] = {
                'title': roadmap_title,
                'steps': cleaned_steps,
                'final_goal': final_goal,
                'total_duration': total_duration,
                'generated_at': datetime.now().isoformat()
            }

            messages.success(request, f'Generated your personalized learning roadmap with {len(cleaned_steps)} steps!')

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
                messages.error(request, 'Unable to generate roadmap at this time. Please try again later.')

        return redirect('learning_roadmap')

    # GET request: show the learning roadmap
    # Get roadmap from session if available, otherwise show empty state
    roadmap_data = request.session.get('learning_roadmap', None)

    context = {
        'latest_assessment': latest_assessment,
        'profile': profile,
        'assessments': assessments,
        'recommendations': recommendations,
        'roadmap': roadmap_data,
        'has_roadmap': roadmap_data is not None and len(roadmap_data.get('steps', [])) > 0,
    }
    return render(request, 'learning_roadmap.html', context)