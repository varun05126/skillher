# SkillHer Architecture

## Overview

SkillHer is a full-stack web application consisting of a Django backend and a React frontend, connected via REST APIs. The platform provides skill assessment, personalized recommendations, learning roadmaps, and progress tracking for women's skill development.

## Frontend

### Technology
* React 19 with TypeScript
* Tailwind CSS for styling
* Vite as build tool and development server
* React Router for client-side routing
* Axios for HTTP requests

### Structure
```
frontend/
├── src/
│   ├── components/   # Reusable UI components (GlassCard, Navbar, Hero, etc.)
│   ├── hooks/        # Custom React hooks (useAuth)
│   ├── pages/        # Page components (LandingPage, LoginPage, etc.)
│   ├── routes/       # Routing configuration (AppRoutes, PrivateRoute, PublicRoute)
│   ├── services/     # Service layers for API communication (authService, aiService, apiClient)
│   ├── App.tsx       # Root application component
│   └── main.tsx      # Entry point
```

### Key Features
* **Authentication**: JWT-based authentication with refresh token handling
* **Protected Routes**: Route guards that redirect unauthenticated users to login
* **Glassmorphism UI**: Consistent use of glassmorphism design via GlassCard component
* **Responsive Design**: Mobile-friendly layouts using Tailwind CSS

### Data Flow
1. User interacts with UI components
2. Components use services to make API calls to backend
3. Services handle request/response transformation and error handling
4. State managed through React hooks and context (where applicable)
5. UI updates based on API responses

## Backend

### Technology
* Django 5+
* Django REST Framework (DRF) for API development
* PostgreSQL (production) / SQLite (development)
* Python 3.8+

### Structure
```
backend/
├── accounts/         # User authentication and profiles
├── ai/               # Skill assessment and recommendation engine
├── learning/         # Learning goals and roadmaps (planned)
├── resources/        # Learning resource library (planned)
├── analytics/        # Progress tracking and analytics (planned)
├── career/           # Career pathways (planned)
└── config/           # Django project settings and URLs
```

### Key Components

#### Accounts App
* **Models**: User (extended Django User), Profile, Notification
* **Views**: Registration, login, token refresh, profile management
* **Serializers**: For converting model instances to/from JSON
* **Permissions**: Custom permission classes for API access control
* **URLs**: REST endpoints for authentication and user management

#### AI App
* **Models**: Skill, SkillAssessment, CareerPath, AIRecommendation
* **Views**: Skill listing, assessment submission, recommendation generation, history retrieval
* **Serializers**: For AI-related models
* **Services**: Business logic for assessment processing and recommendation generation
* **URLs**: REST endpoints for AI functionality

#### Other Apps (Learning, Resources, Analytics, Career)
* Currently contain placeholder models and migrations
* Planned for future implementation as per roadmap

### Authentication
* Uses JWT (JSON Web Tokens) for stateless authentication
* Access tokens for API authorization
* Refresh tokens for obtaining new access tokens
* Token verification endpoint to validate token validity
* Password hashing using Django's built-in security

### API Design
* RESTful API design principles
* Versioning not currently implemented (could be added via URL versioning)
* Standard HTTP status codes for responses
* JSON format for request/response bodies
* Error responses include descriptive messages and error codes

## Authentication Flow

1. **Registration**:
   * Frontend sends POST to `/api/accounts/register/` with user data
   * Backend validates, creates user, returns success response
   * Frontend stores user data and proceeds to login

2. **Login**:
   * Frontend sends POST to `/api/accounts/login/` with credentials
   * Backend validates credentials, generates access and refresh tokens
   * Frontend stores tokens (access token in memory, refresh token in httpOnly cookie or secure storage)
   * Frontend redirects to protected page

3. **Token Refresh**:
   * When access token expires, frontend sends POST to `/api/accounts/token/refresh/` with refresh token
   * Backend validates refresh token, issues new access token
   * Frontend updates stored access token

4. **Token Verification**:
   * Frontend can send POST to `/api/accounts/token/verify/` to check token validity
   * Used on app load to restore session

5. **Logout**:
   * Frontend sends POST to `/api/accounts/logout/` to blacklist refresh token
   * Frontend clears stored tokens

## Recommendation Flow

1. **Skill Assessment**:
   * User completes skill assessment form on SkillAssessmentPage
   * Frontend sends POST to `/api/ai/assessment/` with assessment data
   * Backend processes assessment, calculates skill levels, stores SkillAssessment record
   * Backend returns assessment results including skill proficiency scores

2. **Recommendation Generation**:
   * Frontend sends POST to `/api/ai/recommendations/generate/` with assessment results and goals
   * Backend AI service processes data, generates personalized skill recommendations
   * Backend stores AIRecommendation records and returns recommendations
   * Frontend displays recommendations on AIDashboard

3. **Recommendation History**:
   * Frontend sends GET to `/api/ai/recommendations/` to retrieve past recommendations
   * Backend returns paginated list of AIRecommendation records for the user
   * Frontend displays history on RecommendationHistoryPage

## Assessment Flow (Detailed)

1. User selects skills to assess and rates proficiency (1-5 scale)
2. Frontend validates form and sends assessment data to backend
3. Backend:
   * Validates incoming data
   * Creates or updates SkillAssessment record
   * Calculates skill proficiency scores based on responses
   * Stores assessment results
   * Returns detailed assessment report
4. Frontend displays results and provides option to generate recommendations

## Data Models

### Core Models (Implemented)
* **User**: Extended Django User with additional fields
* **Profile**: User profile information (bio, avatar, etc.)
* **Notification**: In-app notifications for users
* **Skill**: Definition of skills that can be assessed
* **SkillAssessment**: Record of a user's skill assessment attempt
* **CareerPath**: Structured learning pathways and progression data
* **AIRecommendation**: Generated skill recommendations for users

### Planned Models
* **LearningGoal**: User-defined learning objectives
* **Roadmap**: Structured learning path combining multiple resources
* **CourseProgress**: Tracking of individual resource completion
* **Resource**: Learning materials (articles, videos, courses)
* **Analytics**: Aggregated data for progress tracking

## Security Considerations

* **Authentication**: JWT tokens with short expiration times
* **Token Storage**: Access tokens stored in memory, refresh tokens in secure httpOnly cookies (recommended for production)
* **CORS**: Configured to allow frontend origins
* **Rate Limiting**: Not currently implemented (should be added for production)
* **Input Validation**: Django serializers provide validation for all API inputs
* **Password Security**: Django's built-in password hashing (PBKDF2)
* **Environment Secrets**: SECRET_KEY, DATABASE_URL, GROQ_API_KEY stored in environment variables

## Deployment Architecture

### Development
* Backend: Django development server (python manage.py runserver)
* Frontend: Vite development server (npm run dev)
* Database: SQLite file-based database

### Production (Render)
* Backend: Gunicorn WSGI server serving Django application
* Frontend: Static files served by backend or separate static hosting
* Database: PostgreSQL hosted on Render
* Environment Variables: Configured in Render dashboard
* Build Process: 
  * Backend: ./build.sh (installs deps, runs migrations, collects statics)
  * Frontend: npm run build (creates optimized static assets)

## Conclusion

This architecture provides a solid foundation for the SkillHer platform, with clear separation of concerns between frontend and backend, modular app structure, and extensible design for future features. The current implementation covers core authentication and AI-driven skill assessment/recommendation functionality, with clear paths forward for learning roadmap, resource library, and analytics modules.