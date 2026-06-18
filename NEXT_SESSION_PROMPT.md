# Next Session Prompt

## Instructions for Resuming Work

When starting a new Claude session, follow these steps:

### 1. Read Documentation
- Read `PROJECT_STATE.md` to understand the current project state and completion percentages.
- Read `TODO.md` to see completed, in-progress, pending, and blocker items.
- Read `SESSION_HANDOFF.md` for session-specific context and verified statuses.

### 2. Verify Project Health
Run the following checks to ensure the project is in a working state:

#### Backend
```bash
source venv/bin/activate
python manage.py check
python manage.py showmigrations
```

#### Frontend
```bash
cd frontend
npm install
npm run build
```

### 3. Fix Issues Automatically
If any issues are found during verification:
- Fix backend migration issues by creating/applying migrations as needed.
- Resolve frontend TypeScript errors by checking `tsc --noEmit` and correcting type issues.
- Ensure all API endpoints are reachable and return expected data.

### 4. Continue Development
After verification, begin work on the next pending phase:

**Phase 5: Learning Roadmap**
- Create Learning Goal models and API endpoints in the `learning` app.
- Create Learning Roadmap models and API endpoints.
- Build frontend components for creating, viewing, and tracking learning roadmaps.
- Integrate with AI Skill Recommendations to generate personalized learning paths based on skill gaps.
- Add progress tracking functionality (completion percentages, milestones).

### 5. Update Documentation
After completing major features:
- Update `PROJECT_STATE.md` with new completed features and adjusted completion percentages.
- Update `TODO.md` to move completed items from In Progress/Pending to Completed.
- Create a new `SESSION_HANDOFF.md` at the end of the session.

### 6. Important Notes
- Never regenerate completed features unless explicitly requested.
- Always run backend checks and frontend build before starting work.
- Keep environment variables secure and never commit `.env` with real secrets.
- Follow the existing code style and patterns in the codebase.
- Write tests for new functionality (backend unit tests, frontend component tests).

## Ready to Begin
You are now ready to start working on the Learning Roadmap Module.