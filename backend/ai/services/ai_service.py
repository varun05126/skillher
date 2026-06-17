import os
import json
from openai import OpenAI
from django.conf import settings

# Initialize OpenAI client for Groq
# Groq provides an OpenAI-compatible API
GROQ_API_KEY = os.environ.get('GROQ_API_KEY', getattr(settings, 'GROQ_API_KEY', None))
if not GROQ_API_KEY:
    # Raise an error or handle gracefully? We'll raise an error if not set.
    raise ValueError("GROQ_API_KEY must be set in environment variables or Django settings.")

# Groq's OpenAI-compatible endpoint
client = OpenAI(
    api_key=GROQ_API_KEY,
    base_url="https://api.groq.com/openai/v1"
)

def generate_career_recommendation(profile, assessment):
    """
    Generate career recommendations using Groq API.

    Args:
        profile (dict): User profile information (user_id, email, etc.)
        assessment (dict): Dictionary of skill names and scores (0-100)

    Returns:
        dict: Contains:
            - recommended_career (str): Top career recommendation
            - skill_gap (dict): Skill names and gap scores (0-100, where 0 is no gap, 100 is missing)
            - roadmap (dict): 3-month learning roadmap (structured as desired)
            - career_readiness_score (int): Score from 0 to 100
    """
    # Prepare the prompt for Groq
    prompt = f"""
    You are an AI career advisor. Based on the user's skill assessment, provide:
    1. Top 3 career recommendations (we will use the first one as the recommended career)
    2. Skill gap analysis (for the top recommended career, what skills are missing or need improvement)
    3. A 3-month learning roadmap to bridge the skill gaps
    4. A career readiness score (0-100) for the top recommended career

    User Profile:
    - User ID: {profile.get('user_id')}
    - Email: {profile.get('email')}

    Skill Assessment (skill: score out of 100):
    {json.dumps(assessment, indent=2)}

    Please provide the output in the following JSON format only (no additional text):
    {{
        "recommended_career": "Top career recommendation (string)",
        "skill_gap": {{"skill_name": gap_score, ...}}, // gap_score: 0-100 (0 means no gap, 100 means completely missing)
        "roadmap": {{
            "month_1": {{"goal": "...", "skills_to_learn": [...], "resources": [...]}},
            "month_2": {{"goal": "...", "skills_to_learn": [...], "resources": [...]}},
            "month_3": {{"goal": "...", "skills_to_learn": [...], "resources": []}}
        }},
        "career_readiness_score": 0-100
    }}

    Make sure the JSON is valid and nothing else.
    """

    try:
        # Call the Groq API
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model="llama3-8b-8192",  # or another model available on Groq
            temperature=0.7,
            max_tokens=2000,
            response_format={"type": "json_object"},  # Ensure JSON output
        )

        # Extract the response
        response_content = chat_completion.choices[0].message.content
        result = json.loads(response_content)

        # Validate the result has the expected keys
        expected_keys = ['recommended_career', 'skill_gap', 'roadmap', 'career_readiness_score']
        for key in expected_keys:
            if key not in result:
                raise ValueError(f"Missing key in AI response: {key}")

        return result

    except Exception as e:
        # Log the error (in production, use logging)
        print(f"Error in generate_career_recommendation: {str(e)}")
        # Re-raise or return a fallback? We'll re-raise for the view to handle.
        raise e