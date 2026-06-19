# SkillHer

AI-Powered Women Skill Development & Learning Recommendation Platform.

## Overview

SkillHer is a platform designed to support women in identifying skill gaps, tracking learning progress, receiving personalized recommendations, and following structured learning pathways. It combines skill assessments with AI-driven insights to create customized learning roadmaps.

## Problem Statement

Many women face challenges in accessing personalized learning guidance, identifying skill gaps, and tracking skill development progress. Existing platforms often focus on generic learning experiences without structured pathways tailored to upskilling needs. SkillHer addresses these challenges through assessments, AI-powered recommendations, and progress tracking.

## Key Features

- **Skill Assessment**: Evaluate current skills and identify strengths and improvement areas.
- **Skill Gap Analysis**: Compare current capabilities with target competencies.
- **AI-Powered Recommendations**: Receive relevant skill suggestions based on assessments and progress.
- **Learning Roadmaps**: Follow structured learning pathways for continuous development.
- **Learning Resources**: Access curated learning materials and resources.
- **Progress Tracking**: Monitor learning progress and completed milestones.
- **Analytics Dashboard**: Visualize performance, growth, and engagement through data insights.

## Technology Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- React Router
- Axios

### Backend
- Django
- Django REST Framework
- JWT Authentication

### Database
- SQLite (Development)
- PostgreSQL (Production)

### AI Integration
- Groq API

## Architecture

The platform follows a client-server architecture with a Django backend providing RESTful APIs and a React frontend consuming these APIs. Authentication is handled via JWT. The AI integration uses the Groq API for generating personalized recommendations. For detailed architecture, see [ARCHITECTURE.md](ARCHITECTURE.md).

## Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) - Technical architecture details
- [PROJECT_OBJECTIVES.md](PROJECT_OBJECTIVES.md) - Project goals and objectives
- [LITERATURE_REVIEW_SKILLHER.md](LITERATURE_REVIEW_SKILLHER.md) - Literature review and research foundation

## Installation

### Backend Setup
1. Clone the repository
2. Create a virtual environment: `python -m venv venv`
3. Activate the virtual environment:
   - Linux/Mac: `source venv/bin/activate`
   - Windows: `venv\Scripts\activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Apply migrations: `python manage.py migrate`
6. Create a superuser (optional): `python manage.py createsuperuser`
7. Start the development server: `python manage.py runserver`

### Frontend Setup
1. Navigate to frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Environment Variables

### Backend
- `SECRET_KEY`: Django secret key
- `DEBUG`: Enable/disable debug mode (True/False)
- `DATABASE_URL`: Database connection string
- `ALLOWED_HOSTS`: Allowed hosts for the application
- `GROQ_API_KEY`: API key for Groq AI service
- `CORS_ALLOWED_ORIGINS`: Allowed origins for CORS

### Frontend
- `VITE_API_URL`: Base URL for the backend API

## Screenshots

Add screenshots here

## Future Scope

- Mentorship Support
- Community Features
- Advanced Analytics
- Enhanced AI Recommendations

## License

This project is licensed for educational and research purposes only.