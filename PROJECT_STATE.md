# SkillHer Project State

## Project Overview

SkillHer is an AI-powered women skill development and recommendation platform built using:

* Django 5+
* Django REST Framework
* JWT Authentication
* React 19
* TypeScript
* Tailwind CSS
* Groq AI (OpenAI Compatible API)
* PostgreSQL (Production)
* SQLite (Development)
* Render Deployment

### Vision

Empower women through AI-powered skill development, skill assessment, personalized learning roadmaps, skill recommendations, and learning analytics.

---

## Completed Features

### Backend

* Django Backend Foundation
* REST API Setup
* JWT Authentication
* User Registration
* User Login
* Token Refresh
* Token Verification
* Profile Management
* Permissions System
* Notification Model
* AI Recommendation Module
* Skill Assessment API
* Recommendation History API
* Groq AI Integration

### Frontend

* React + TypeScript Setup
* Tailwind CSS Setup
* Routing System
* Authentication Flow
* Protected Routes
* Public Routes
* Glassmorphism Design System
* Navbar
* Hero Section
* Login Page
* Registration Page
* Profile Setup Page
* Skill Assessment Page
* AI Dashboard
* Recommendation History Page

---

## Backend Structure

Apps:

* accounts
* ai
* learning
* resources
* analytics
* career

### Accounts

Models:

* User
* Profile
* Notification

Features:

* Registration
* Login
* JWT Authentication
* Profile Management

### AI

Models:

* Skill
* SkillAssessment
* CareerPath
* AIRecommendation

Features:

* Skill Assessment
* AI Skill Recommendations
* Recommendation History
* Skill Development Guidance

Note: The CareerPath model stores structured progression pathways and recommendation data used for skill development and learning guidance. The AIRecommendation model generates personalized skill recommendations based on assessment results and learning goals.

### Learning

Features:

* Learning Goals
* Roadmaps
* Course Tracking

### Resources

Features:

* Resource Library

### Analytics

Features:

* Progress Tracking
* Learning Analytics

### Skill Advancement

Features:

* Skill Progress Tracking
* Learning Pathway Management

---

## Frontend Structure

### Pages

* LandingPage
* LoginPage
* RegisterPage
* ProfileSetupPage
* SkillAssessmentPage
* AIDashboard
* RecommendationHistoryPage

### Components

* GlassCard
* Navbar
* Hero
* FeatureCard
* LoadingSpinner

### Hooks

* useAuth

### Routes

* AppRoutes
* PrivateRoute
* PublicRoute

### Services

* Authentication Service
* AI Service
* API Client

---

## API Endpoints

### Authentication

POST /api/accounts/register/

POST /api/accounts/login/

POST /api/accounts/token/refresh/

POST /api/accounts/token/verify/

POST /api/accounts/logout/

### User

GET /api/accounts/user/

PUT /api/accounts/user/

### Profile

GET /api/accounts/profile/

PUT /api/accounts/profile/

### AI

GET /api/ai/skills/

POST /api/ai/assessment/

POST /api/ai/recommendations/generate/

GET /api/ai/recommendations/

---

## Environment Variables

Backend

SECRET_KEY=

DEBUG=

DATABASE_URL=

ALLOWED_HOSTS=

GROQ_API_KEY=

CORS_ALLOWED_ORIGINS=

Frontend

VITE_API_URL=

---

## Database Models

### Accounts

User

Profile

Notification

### AI

Skill

SkillAssessment

CareerPath

AIRecommendation

Note: The CareerPath model stores structured progression pathways and recommendation data used for skill development and learning guidance. The AIRecommendation model generates personalized skill recommendations based on assessment results and learning goals.

### Learning

LearningGoal

Roadmap

CourseProgress

### Resources

Resource

---

## Current Issues

### Backend

* Verify migration consistency
* Verify PostgreSQL configuration
* Verify production settings

### Frontend

* API integration testing pending

### General

* End-to-end testing pending
* Production deployment pending

---

## Deployment Status

Render Readiness: 80%

Completed:

* render.yaml
* build.sh
* requirements.txt
* environment configuration

Pending:

* PostgreSQL connection
* Static files verification
* Production build testing
* Final deployment

---

## Next Phase

1. Build Learning Roadmap
2. Build Resource Library
3. Build Analytics Dashboard
4. Glassmorphism UI Polish
5. Deploy to Render

---

## Project Completion

Backend: 95%

Authentication: 98%

AI Module: 85%

Frontend Foundation: 95%

Deployment: 30%

Overall Completion: 80%

Last Updated: 2026-06-18