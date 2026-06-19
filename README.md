# SkillHer

Women Skill Development and Recommendation Platform

## Overview

SkillHer is a platform designed to support women in identifying skill gaps, tracking learning progress, receiving personalized recommendations, and following structured learning pathways.

The platform aims to help women continuously upskill and reskill through data-driven recommendations, skill assessments, and learning analytics.

The primary focus is:

* Skill Development
* Skill Assessment
* Skill Gap Analysis
* Personalized Learning
* Learning Roadmaps
* Learning Analytics
* Women Upskilling
* Women Reskilling
* Progress Tracking

Career growth should be described only as a long-term outcome of improved skills.

## Problem Statement

Many women face challenges in accessing personalized learning guidance, identifying skill gaps, and tracking skill development progress.

Existing platforms often focus on generic learning experiences and do not provide structured pathways tailored to women's upskilling needs.

SkillHer addresses these challenges through assessments, recommendations, and learning progress tracking.

## Key Features

### Skill Assessment Engine

Evaluate current skills and identify strengths and improvement areas.

### Skill Gap Analysis

Compare current capabilities with target competencies.

### Personalized Skill Recommendations

Recommend relevant skills based on assessments and progress.

### Learning Roadmaps

Provide structured learning pathways for continuous development.

### Learning Resource Recommendations

Suggest relevant learning materials and resources.

### Progress Tracking

Monitor learning progress and completed milestones.

### Learning Analytics Dashboard

Visualize performance, growth, and engagement.

## Technology Stack

### Frontend

* React
* TypeScript
* Tailwind CSS
* React Router
* Axios

### Backend

* Django
* Django REST Framework
* JWT Authentication
* SQLite (current)
* PostgreSQL (future deployment)

### AI

* Groq Integration

## Project Structure

SkillHer/
├── .claude/
├── .git/
├── backend/
│   ├── accounts/
│   ├── ai/
│   ├── analytics/
│   ├── learning/
│   ├── resources/
│   └── config/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── services/
├── manage.py
├── requirements.txt
├── package.json
├── package-lock.json
├── LITERATURE_REVIEW_SKILLHER.md
├── PROJECT_OBJECTIVES.md
└── README.md

## Local Development Setup

### Prerequisites

* Python 3.8+
* Node.js 16+
* npm or yarn
* Git

### Backend Setup

1. Clone the repository
2. Create a virtual environment: `python -m venv venv`
3. Activate the virtual environment: `source venv/bin/activate` (Linux/Mac) or `venv\Scripts\activate` (Windows)
4. Install dependencies: `pip install -r requirements.txt`
5. Apply migrations: `python manage.py migrate`
6. Create a superuser (optional): `python manage.py createsuperuser`
7. Start the development server: `python manage.py runserver`

### Frontend Setup

1. Navigate to frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

### Environment Variables

Create a `.env` file in the root directory with the following variables:

Backend:
* SECRET_KEY=
* DEBUG=
* DATABASE_URL=
* ALLOWED_HOSTS=
* GROQ_API_KEY=
* CORS_ALLOWED_ORIGINS=

Frontend:
* VITE_API_URL=

## Future Enhancements

* Advanced Skill Recommendations
* Enhanced Learning Analytics
* Mentorship Support
* Community Features
* Improved Learning Tracking

## Deployment Readiness Status

* Backend: 95% complete
* Frontend: 95% complete
* API Integration: 90% complete
* Testing: 70% complete
* Deployment Preparation: 30% complete
* Overall Project Completion: 80%

The platform is ready for final testing and deployment preparation. Remaining work includes PostgreSQL configuration, production build testing, and final deployment to Render.