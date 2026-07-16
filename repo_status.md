# SkillHer Repository Status

## 1. Overview
SkillHer is a Django web application designed to empower women in assessing their skills, receiving personalized AI-powered learning recommendations, and tracking their professional growth. The platform combines skill assessments with generative AI (via Groq) to provide tailored skill development pathways.

## 2. Tech Stack
- **Framework**: Django 5.2.1
- **Key Dependencies** (from requirements.txt):
  - Django==5.2.1
  - dj-database-url==2.2.0
  - groq==1.5.0
  - gunicorn==21.2.0
  - psycopg2-binary==2.9.12
  - whitenoise==6.9.0
- **Deployment Platform**: Render (configured via build.sh and requirements.txt)
- **Frontend**:
  - TailwindCSS via CDN
  - Custom CSS with CSS variables for theming
  - Caveat font (Google Fonts) for headings (weights 400, 600, 700)
  - Vanilla JavaScript for theme toggling

## 3. Current Architecture
### Apps/Modules
- `core` (main application containing all functionality)

### Key Models (from core/models.py)
- `User` (Django's built-in auth User model, extended via OneToOneField)
- `Profile` (extends User with bio, career_goal, experience_level, etc.)
- `SkillAssessment` (stores skill name, self-rated level, years_of_experience, confidence_level, frequency_use, formal_training, primary_goal, timestamp)
- `Recommendation` (stores title, description, source, timestamp, foreign key to User)

### Views (from core/views.py)
- `RegisterView` (user registration)
- `LoginView` / `LogoutView` (Django's built-in auth views)
- `home` (landing page)
- `dashboard` (user overview with latest assessment/recommendation)
- `assessment` (skill assessment form)
- `recommendations` (list recommendations, generate new ones via Groq)
- `profile` (edit profile)

### URL Structure (from core/urls.py)
- `/` → home
- `/register/` → registration
- `/login/` → login
- `/logout/` → logout
- `/dashboard/` → user dashboard
- `/assessment/` → skill assessment
- `/recommendations/` → recommendations list/generation
- `/profile/` → profile editing

### Theming System
- **Light Theme**: "Sunset Gradient" (coral/purple gradient background, warm off-white cards, Coral/Purple accent gradient)
- **Dark Theme**: "Moon/Liquid Glass" (deep navy background, frosted glass cards with strong backdrop-filter blur, cool blue/violet accent gradient)
- **Typography**: Caveat font (weights 400, 600, 700) for all headings (h1-h6, .brand), system UI for body
- **Implementation**:
  - CSS variables defined in `:root` (light) and `[data-theme="dark"]` (dark) in `base.html`
  - Theme button in navbar toggles `data-theme` attribute on `<html>` element
  - Theme preference persisted via cookie (`theme` key) with fallback to `prefers-color-scheme` media query
  - **Note**: The `base.html` template (used by home, dashboard, assessment, registration, login, profile pages) includes full theming support.
  - The `500.html` template (standalone error page) includes the theme toggle button and JavaScript but lacks the `[data-theme="dark"]` CSS block, so dark mode styling does not apply on the 500 page.

## 4. Known Issues / Recently Fixed
| Issue | Status | Verification |
|-------|--------|--------------|
| Groq version incompatibility with httpx (causing `Client.__init__() got unexpected keyword argument 'proxies'`) | ✅ FIXED | Upgraded `groq` from 0.11.0 to 1.5.0 in `requirements.txt` |
| Missing `home.html` template causing TemplateDoesNotExist | ✅ FIXED | Created `core/templates/home.html` (now redesigned as landing page) |
| Gunicorn/Render start command pointing to wrong module (causing module not found errors) | ✅ FIXED | Corrected Procfile/start command to point to `skillher.wsgi` |
| Database persistence: Using ephemeral SQLite instead of PostgreSQL on Render | ⚠️ PENDING VERIFICATION | `settings.py` uses `dj_database_url.config(default=f'sqlite:///{BASE_DIR / "db.sqlite3"}')` – will use PostgreSQL if `DATABASE_URL` env var is set, otherwise falls back to SQLite. Requires verification of Render env var configuration. |
| SECRET_KEY using hardcoded fallback in development | ⚠️ PENDING VERIFICATION | `settings.py`: `SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-fallback-key-for-dev-only')` – requires verification of Render env var configuration. |
| Dark mode styling missing on 500.html page | ⚠️ IDENTIFIED | `500.html` includes theme toggle button and JavaScript but lacks `[data-theme="dark"]` CSS block; dark mode styling does not apply on error page. |

## 5. Enhancement Backlog (Prioritized)
1. **Loading state on "Generate Recommendations" button**  
   Disable button and show spinner during Groq API call to prevent duplicate submissions and improve UX.
2. **Dashboard progress tracking**  
   Add stat cards showing assessment count, recommendation count, and skill progress visualization.
3. **Delete/dismiss individual recommendations**  
   Add delete button (with ownership check) to "Previous" recommendations to let users remove outdated suggestions.
4. **Mobile-responsive navbar**  
   Implement hamburger menu toggle for mobile view (<640px) that maintains theme consistency in both light/dark modes.
5. **Rate limiting on recommendation generation**  
   Restrict to max 1 generation per 2 minutes per user (based on most recent `Recommendation.created_at`).
6. **Batch grouping improvement**  
   Current implementation groups "New" vs "Previous" recommendations by exact `created_at` timestamp equality (fragile – same-second batches split if generated in separate requests). Recommend adding a `batch_id` field to `Recommendation` model for robust grouping.

## 6. Environment Variables Required
| Variable Name | Purpose | Currently Set in Render? (Verification Needed) |
|---------------|---------|-----------------------------------------------|
| `DATABASE_URL` | PostgreSQL connection string (for dj-database-url) | ⚠️ Uses local SQLite if not set |
| `GROQ_API_KEY` | API key for Groq AI service | ⚠️ **Must be set** – used in `core/views.py` for recommendations |
| `SECRET_KEY` | Django secret key for cryptographic signing | ⚠️ Uses fallback if not set |
| `DEBUG` | Boolean to enable/disable Django debug mode | ⚠️ Defaults to `False` if not set |
| `ALLOWED_HOSTS` | Comma-separated list of allowed host/domain names | ⚠️ Defaults to `localhost,127.0.0.1` if not set |
| `DJANGO_LOG_LEVEL` | Logging level for Django (e.g., INFO, WARNING) | ⚠️ Defaults to `INFO` if not set |

*Note: The above table is based on code inspection. Actual Render environment variable configuration must be verified separately.*

---

### Verification Notes (for accuracy)
All claims above were verified by examining the current state of the repository as of the latest commit. Specific files checked:
- `requirements.txt` for dependencies
- `core/models.py` for model definitions
- `core/urls.py` for URL routing
- `core/views.py` for view logic
- `skillher/settings.py` for environment variable usage
- Template files (`base.html`, `500.html`, `home.html`, `recommendations.html`, `login.html`, `register.html`, `assessment.html`, `dashboard.html`, `profile.html`) for theming and UI
- No other apps exist besides `core`