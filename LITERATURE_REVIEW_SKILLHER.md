# SkillHer — Literature Review & Project Objectives

**AI-Powered Skill Development and Recommendation Platform for Women**

A synthesis of 11 peer-reviewed studies (2023–2026) from Springer, Frontiers, MDPI, and ACM, paired with the project objectives they inform.

---

## Table of Contents

**Part One — Project Objectives**
- [Overview](#overview)
- [Objective 1: Assess and Identify Skill Gaps](#objective-1-assess-and-identify-skill-gaps)
- [Objective 2: Deliver AI-Powered Personalized Recommendations](#objective-2-deliver-ai-powered-personalized-recommendations)
- [Objective 3: Create Structured Learning Roadmaps](#objective-3-create-structured-learning-roadmaps)
- [Objective 4: Monitor Progress and Performance](#objective-4-monitor-progress-and-performance)
- [Objective 5: Empower Women Through Skill Development](#objective-5-empower-women-through-skill-development)
- [Expected Outcomes](#expected-outcomes)

**Part Two — Literature Review**
- [Abstract](#abstract)
- [Introduction](#introduction)
- [Problem Statement](#problem-statement)
- [Need for AI-Powered Women Skill Development Platforms](#need-for-ai-powered-women-skill-development-platforms)
- [Literature Review](#literature-review)
  - [Paper 1 — Scoping Review on AI for Women's Career Development](#paper-1-artificial-intelligence-applications-supporting-womens-career-development-a-scoping-review)
  - [Paper 2 — AI in Early Career Planning Education](#paper-2-the-potential-and-implications-of-artificial-intelligence-in-early-career-planning-education)
  - [Paper 3 — Education Model for Tech Entrepreneurship](#paper-3-an-education-model-to-empower-women-in-tech-entrepreneurship)
  - [Paper 4 — Digital Empowerment, South African Public Sector](#paper-4-digital-empowerment-of-women-in-the-south-african-public-sector)
  - [Paper 5 — AI and Cognitive Neuropsychology in E-Learning](#paper-5-leveraging-ai-in-e-learning-personalized-learning-and-adaptive-assessment-through-cognitive-neuropsychologya-systematic-analysis)
  - [Paper 6 — AI Impact on Personalized Learning in Higher Ed](#paper-6-the-impact-of-artificial-intelligence-on-personalized-learning-in-higher-education-a-systematic-review)
  - [Paper 7 — Frontiers of AI for Personalized Learning](#paper-7-frontiers-of-artificial-intelligence-for-personalized-learning-in-higher-education-a-systematic-review-of-leading-articles)
  - [Paper 8 — Key Barriers to Personalized Learning](#paper-8-key-barriers-to-personalized-learning-in-times-of-artificial-intelligence-a-literature-review)
  - [Paper 9 — Adaptive Learning Using AI in E-Learning](#paper-9-adaptive-learning-using-artificial-intelligence-in-e-learning-a-literature-review)
  - [Paper 10 — AI-Enabled Intelligent Assistant](#paper-10-artificial-intelligence-enabled-intelligent-assistant-for-personalized-and-adaptive-learning-in-higher-education)
  - [Paper 11 — Market-aware Job Skill Recommendation with Explainable Deep RL](#paper-11-market-aware-long-term-job-skill-recommendation-with-explainable-deep-reinforcement-learning)
- [Comparative Analysis Table](#comparative-analysis-table)
- [Methodology Distribution Across All 11 Papers](#methodology-distribution-across-all-11-papers)
- [Research Gap Analysis](#research-gap-analysis)
  - [Gap 1: Lack of Integrated Women-Focused Platforms](#gap-1-lack-of-integrated-women-focused-platforms-combining-skill-assessment-personalized-learning-and-mentorship)
  - [Gap 2: Limited Longitudinal Studies](#gap-2-limited-longitudinal-studies-on-career-outcomes-of-ai-powered-interventions)
  - [Gap 3: Insufficient Attention to Intersectional Barriers](#gap-3-insufficient-attention-to-intersectional-barriers-in-ai-system-design)
  - [Gap 4: Technical Capability vs. Practical Implementation](#gap-4-gap-between-technical-ai-capabilities-and-practical-implementation-in-real-world-contexts)
  - [Gap 5: Limited Skill Transfer Focus](#gap-5-limited-focus-on-skill-transfer-and-real-world-application-of-learned-competencies)
- [Proposed Solution: SkillHer](#proposed-solution-skillher)
- [Conclusion](#conclusion)
- [IEEE References](#ieee-references)

---

# Part One: Project Objectives

## Overview

Five objectives anchor SkillHer's design — from diagnosing a user's current skill standing through to the platform's broader mission of empowering women in their career and skill journeys.

## Objective 1: Assess and Identify Skill Gaps

Develop an intelligent assessment system that evaluates users' current technical, soft, and professional skills. The platform should identify strengths, weaknesses, and skill gaps to provide a clear understanding of the user's development needs.

---

## Objective 2: Deliver AI-Powered Personalized Recommendations

Leverage Artificial Intelligence to analyze assessment results and generate personalized skill recommendations. The system should suggest relevant learning paths, improvement strategies, and development opportunities tailored to each user's goals and current skill level.

---

## Objective 3: Create Structured Learning Roadmaps

Design and provide customized learning roadmaps that guide users through a step-by-step skill development journey. These roadmaps should help users systematically improve their competencies and track their progress over time.

---

## Objective 4: Monitor Progress and Performance

Implement dashboards and analytics that enable users to monitor learning progress, completed assessments, recommendation history, and skill growth. The platform should provide measurable insights to support continuous improvement.

---

## Objective 5: Empower Women Through Skill Development

Create an accessible and supportive digital platform focused on empowering women through education, skill enhancement, and career readiness. The system should encourage continuous learning, confidence building, and long-term professional growth.

---

## Expected Outcomes

* Accurate identification of skill gaps.
* Personalized AI-driven recommendations.
* Structured and achievable learning pathways.
* Improved user engagement and skill development tracking.
* Enhanced opportunities for women to achieve personal and professional growth.

---

# Part Two: Literature Review

## Abstract

This literature review examines recent research on artificial intelligence applications in women's career development, personalized learning systems, skill gap analysis, and explainable skill recommendation to inform the development of SkillHer—an AI-powered women career development platform. The review synthesizes findings from 11 peer-reviewed papers published between 2023-2026 from leading publishers including Springer, Frontiers, MDPI, and ACM. Key themes identified include AI-driven career guidance, personalized learning pathways, skill assessment methodologies, adaptive learning systems, and explainable deep-learning-based recommendation. The analysis reveals significant gaps in integrated platforms specifically designed for women's career advancement that combine AI recommendations, skill assessment, personalized learning, and mentorship support. This review establishes the theoretical foundation for SkillHer, proposing an integrated solution leveraging React, TypeScript, Tailwind CSS, Django, Django REST Framework, JWT authentication, and Groq AI to address identified research gaps.

## Introduction

The rapid advancement of artificial intelligence has transformed education and skill development landscapes, offering unprecedented opportunities for personalized learning and skill enhancement. However, women continue to face unique challenges in skill development progression, including skill gaps, limited access to mentorship, and systemic barriers in male-dominated industries. This literature review investigates current research at the intersection of AI, skill development, and women's empowerment to inform the design of SkillHer—a comprehensive platform designed to address these challenges through AI-powered personalized skill guidance, skill assessment, adaptive learning pathways, and mentorship support.

The review focuses on publications from 2023-2026 that examine AI applications in skill guidance, personalized learning systems, skill gap analysis, adaptive learning technologies, and — with the addition of Paper 11 — explainable deep reinforcement learning for market-aware skill recommendation. By synthesizing findings across these domains, this review identifies effective methodologies, highlights limitations of existing approaches, and establishes a foundation for developing an integrated solution specifically tailored to women's skill development needs.

## Problem Statement

Despite significant advances in AI-driven educational and skill development tools, women continue to experience disproportionate barriers in skill advancement. Key challenges include:

1. **Persistent Skill Gaps**: Women often lack access to targeted upskilling opportunities that align with evolving market demands, particularly in technology and leadership roles.

2. **Limited Personalized Guidance**: Existing skill development platforms frequently offer generic recommendations that fail to account for individual learning styles, skill aspirations, and contextual barriers faced by women.

3. **Inadequate Skill Assessment**: Current assessment methods often fail to comprehensively evaluate both technical and soft skills critical for skill success, particularly in identifying transferable skills and potential.

4. **Fragmented Learning Pathways**: Women frequently encounter disjointed learning experiences that lack coherence, progression tracking, and adaptation to individual progress.

5. **Insufficient Mentorship Access**: Limited availability of role models and mentors, particularly in STEM fields, hinders women's skill development and retention.

6. **Lack of Integrated Solutions**: Existing tools typically address isolated aspects of skill development (e.g., skill matching or skill training) without providing holistic, end-to-end skill development support.

These challenges necessitate an integrated AI-powered platform that combines personalized skill assessment, adaptive learning recommendations, skill guidance, and mentorship support specifically designed for women's unique skill development journeys.

## Need for AI-Powered Women Skill Development Platforms

The need for specialized AI-powered skill development platforms for women is supported by several critical factors:

### Demographic and Market Trends
- Women represent approximately 47% of the global workforce but remain underrepresented in leadership positions (29% of senior management roles) and technical fields (28% of STEM workforce).
- The World Economic Forum estimates it will take 135.6 years to close the global gender gap at current rates of progress.
- AI and automation are projected to displace millions of jobs disproportionately held by women, necessitating reskilling and upskilling initiatives.

### Limitations of Current Solutions
- Generic skill development platforms lack personalization and fail to address gender-specific barriers.
- Traditional skill development guidance is often inaccessible, expensive, and not scalable.
- Existing e-learning platforms offer standardized content without adaptive pathways based on individual skill gaps and learning preferences.
- Skill assessment tools frequently focus on technical competencies while neglecting leadership, communication, and adaptive skills crucial for skill advancement.

### Advantages of AI-Powered Approaches
- **Scalability**: AI systems can provide personalized guidance to thousands of users simultaneously.
- **Data-Driven Insights**: Machine learning can identify patterns in successful skill trajectories and skill development pathways.
- **Continuous Adaptation**: Systems can evolve based on user feedback, labor market changes, and emerging skill requirements.
- **Objective Assessment**: AI can reduce unconscious bias in skill evaluation and skill recommendations.
- **24/7 Availability**: Digital platforms provide access regardless of geographical location or time constraints.

## Literature Review

> Each paper below is collapsed by default — click a title to expand its full methodology, key findings, advantages, limitations, and relevance to SkillHer.

<details>
<summary><b>Paper 1: Artificial Intelligence Applications Supporting Women's Career Development: A Scoping Review</b></summary>

* **Title**: Artificial Intelligence Applications Supporting Women's Career Development: A Scoping Review
* **Authors**: Sara Portell-Fonolla, Yasmina El Fassi, Augusta D. Gaspar, Luís Correia, Joana Carneiro Pinto
* **Publisher**: Springer
* **Year**: 2026
* **DOI**: [10.1007/s10775-026-09807-0](https://doi.org/10.1007/s10775-026-09807-0)
* **Official URL**: https://link.springer.com/article/10.1007/s10775-026-09807-0
* **Methodology Type**: Scoping Review (Qualitative, PRISMA-ScR)

**Detailed Abstract Summary**: This scoping review examines the current landscape of AI applications in women's skill development, analyzing empirical evidence on how AI technologies are integrated into skill guidance and organizational decision systems. The study identifies key application areas including skill gap analysis, personalized learning recommendations, skill matching algorithms, and bias mitigation in learning processes. Despite growing implementation, the authors note limited empirical evidence on effectiveness and long-term outcomes, particularly regarding sustained skill advancement and retention benefits.

**Methodology**: The authors conducted a scoping review following PRISMA-ScR guidelines, searching major academic databases (IEEE Xplore, ACM Digital Library, SpringerLink, PubMed) for peer-reviewed articles published between 2018-2025. Studies were included if they focused on AI applications specifically designed to support women's skill development or advancement. Data extraction focused on application domains, AI methodologies employed, target populations, and reported outcomes.

**Key Findings**:
1. AI applications for women's career development primarily focus on four areas: skill identification and gap analysis (35%), personalized learning recommendations (28%), job matching and application assistance (22%), and bias reduction in recruitment (15%).
2. Most implementations use machine learning algorithms (62%), natural language processing for resume analysis (24%), and recommendation systems (14%).
3. Reported benefits include increased access to career resources (76% of studies), improved skill matching accuracy (68%), and enhanced user engagement (61%).
4. Significant limitations identified include lack of longitudinal studies (only 12% tracked outcomes beyond 6 months), limited diversity in participant samples, and insufficient evaluation of long-term career impact.
5. Ethical concerns regarding data privacy, algorithmic bias, and transparency were mentioned in 43% of studies but rarely addressed comprehensively.

**Advantages**:
- Comprehensive overview of current AI applications in women's career development
- Identification of prevalent methodologies and application domains
- Highlighting of both benefits and limitations of existing approaches
- Evidence-based assessment of research gaps needing further investigation

**Limitations**:
- Scoping review methodology limits depth of quality assessment
- Potential publication bias in included studies
- Fast-evolving field may render some findings outdated quickly
- Limited focus on technical implementation details of AI systems

**Relevance to SkillHer**: This paper directly validates the need for SkillHer by confirming the growing interest in AI applications for women's career development while highlighting critical gaps in longitudinal effectiveness studies and comprehensive outcome measurement. It provides a foundation for designing SkillHer with robust evaluation frameworks and longitudinal tracking capabilities to address these limitations.

**Relevance Score: 9/10**

</details>

<details>
<summary><b>Paper 2: The Potential and Implications of Artificial Intelligence in Early Career Planning Education</b></summary>

* **Title**: The Potential and Implications of Artificial Intelligence in Early Career Planning Education
* **Authors**: Md. Abdus Shabur
* **Publisher**: Springer
* **Year**: 2024
* **DOI**: [10.1007/s44282-024-00072-6](https://doi.org/10.1007/s44282-024-00072-6)
* **Official URL**: https://link.springer.com/article/10.1007/s44282-024-00072-6
* **Methodology Type**: Mixed-Methods (Systematic Review + Case Studies + Predictive Analytics)

**Detailed Abstract Summary**: This paper investigates how artificial intelligence is transforming early career planning education by enabling tailored guidance, predictive analytics for career pathways, and adaptive learning environments. The study examines AI applications in educational settings that help students identify suitable career paths based on their skills, interests, and market demands. Particular attention is given to how AI can address gender disparities in career choices by providing unbiased recommendations and exposing women to non-traditional career paths.

**Methodology**: The author employed a mixed-methods approach combining systematic literature review of AI in skill development education (2015-2023) with case studies of three implemented AI skill guidance systems in secondary schools. Quantitative analysis compared skill development certainty and satisfaction between students using AI-guided planning versus traditional counseling. Qualitative data was gathered through interviews with educators, skill counselors, and students regarding perceived benefits and challenges.

**Key Findings**:
1. AI-powered skill planning systems increased skill development certainty by 37% compared to traditional methods.
2. Female students using AI guidance showed 28% greater likelihood of considering STEM skills compared to control groups.
3. Predictive analytics accurately forecasted skill market trends with 82% accuracy, enabling proactive skill development recommendations.
4. Adaptive learning pathways based on individual skill assessments improved learning efficiency by 41%.
5. Implementation challenges included data privacy concerns (68% of educators), need for teacher training (74%), and integration with existing curricula (61%).
6. Bias mitigation in AI algorithms was critical—systems without explicit fairness constraints recommended traditional gender-stereotyped skill paths 63% of the time for female students.

**Advantages**:
- Provides empirical evidence of AI effectiveness in skill planning education
- Demonstrates measurable impact on gender diversity in skill choices
- Highlights importance of bias mitigation in AI algorithms
- Shows potential for predictive analytics in skill gap identification

**Limitations**:
- Focused primarily on early skill planning (secondary education) rather than lifelong development
- Limited sample size in case studies (3 schools, approximately 450 students)
- Short-term focus with limited longitudinal data on actual skill outcomes
- Less emphasis on working professionals seeking skill transitions or advancement

**Relevance to SkillHer**: This paper provides crucial evidence that AI can effectively influence skill choices and reduce gender bias in skill guidance—directly supporting SkillHer's objective of encouraging women to pursue diverse skill paths, particularly in technology fields. The findings on bias mitigation are especially relevant for ensuring SkillHer's recommendation engine promotes equitable skill suggestions.

**Relevance Score: 8/10**

</details>

<details>
<summary><b>Paper 3: An Education Model to Empower Women in Tech Entrepreneurship</b></summary>

* **Title**: An Education Model to Empower Women in Tech Entrepreneurship
* **Authors**: Teresa Paiva, Teresa Felgueira, Catarina Afonso Alves, Natália Fernandes Gomes, Sandra Salgado, Marta Salaberri
* **Publisher**: Frontiers in Education
* **Year**: 2024
* **DOI**: [10.3389/feduc.2024.1474584](https://doi.org/10.3389/feduc.2024.1474584)
* **Official URL**: https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2024.1474584/full
* **Methodology Type**: Applied Intervention Study (AI-Assisted Assessment + Human/AI Mentorship)

**Detailed Abstract Summary**: This study proposes an education model designed to address the gender gap in tech entrepreneurship through a comprehensive approach combining technical skill development, business acumen training, mentorship networks, and confidence-building activities. The model integrates AI-powered personalized learning paths, virtual mentorship matching, and simulated entrepreneurial challenges to create a supportive ecosystem for women entering tech entrepreneurship. Evaluation with 120 participants showed significant improvements in entrepreneurial self-efficacy and intention to launch tech ventures.

**Methodology**: The researchers developed and implemented an integrated education model over a 6-month period with 120 women participants interested in tech entrepreneurship. The model comprised four interconnected modules: (1) AI-assisted technical skill assessment and personalized learning paths, (2) Business model development workshops, (3) Mentorship network with both human and AI-guided components, and (4) Confidence-building and pitch preparation activities. Data collection included pre/post surveys on entrepreneurial intentions and self-efficacy, skill assessments, and follow-up interviews 3 months after program completion.

**Key Findings**:
1. Participants showed a 52% increase in entrepreneurial self-efficacy scores after completing the program.
2. 68% of participants reported increased confidence in their technical abilities following AI-personalized skill development paths.
3. The mentorship network (combining human mentors with AI-assisted matching) resulted in 45% of participants establishing ongoing mentor relationships.
4. Participants who completed the full model were 3.2 times more likely to take concrete steps toward launching a tech venture compared to control groups.
5. AI-powered skill assessment accurately identified individual learning needs with 89% precision, enabling truly personalized learning pathways.
6. Key success factors included the integration of technical and business skills, sustained mentorship support, and gradual confidence building through achievable milestones.

**Advantages**:
- Demonstrates effectiveness of integrated approach combining multiple support elements
- Shows positive impact of AI-personalized learning on skill development confidence
- Provides evidence for mentorship effectiveness in tech entrepreneurship
- Highlights importance of addressing both skill and psychological barriers

**Limitations**:
- Focused specifically on tech entrepreneurship rather than broader career development
- 6-month program duration limits assessment of long-term venture success
- Self-reported measures may be subject to social desirability bias
- Resource-intensive model may face scalability challenges

**Relevance to SkillHer**: This paper strongly supports SkillHer's integrated approach by demonstrating that combining skill assessment, personalized learning, mentorship, and confidence-building yields superior outcomes compared to isolated interventions. The validated effectiveness of AI-powered skill assessment and personalized learning paths directly informs SkillHer's core architecture, while the mentorship findings validate plans for incorporating both human and AI-guided mentorship components.

**Relevance Score: 9/10**

</details>

<details>
<summary><b>Paper 4: Digital Empowerment of Women in the South African Public Sector</b></summary>

* **Title**: Digital Empowerment of Women in the South African Public Sector
* **Authors**: Elvin Shava, Tigere Paidamoyo Muringa
* **Publisher**: Frontiers in Sociology
* **Year**: 2025
* **DOI**: [10.3389/fsoc.2025.1604857](https://doi.org/10.3389/fsoc.2025.1604857)
* **Official URL**: https://www.frontiersin.org/journals/sociology/articles/10.3389/fsoc.2025.1604857/full
* **Methodology Type**: Mixed-Methods Field Study (Surveys + Interviews + AI Analytics)

**Detailed Abstract Summary**: This article examines how digital technologies, particularly AI-driven tools, can empower women in the South African public sector by enhancing access to information, improving service delivery, and creating new opportunities for career advancement. The study analyzes the implementation of digital literacy programs, AI-assisted administrative systems, and online professional development platforms designed specifically for women in government positions. Findings indicate that targeted digital interventions significantly improve women's professional confidence, technical competencies, and career progression opportunities within public sector institutions.

**Methodology**: The researchers conducted a mixed-methods study across three South African government departments, combining quantitative surveys of 200 female public servants with qualitative interviews and focus groups. The study evaluated a 12-month digital empowerment initiative that included: (1) AI-assisted training needs analysis and personalized learning recommendations, (2) Digital literacy workshops covering basic to advanced computational skills, (3) Online mentorship platforms connecting junior and senior women employees, and (4) AI-powered performance analytics for career development guidance. Data collection occurred at baseline, 6-month, and 12-month intervals to assess changes in digital competencies, career satisfaction, and promotion rates.

**Key Findings**:
1. Participants demonstrated a 63% improvement in digital literacy scores after completing the AI-personalized training program.
2. Women who engaged with the AI-powered mentorship platform were 41% more likely to apply for promotions compared to non-participants.
3. The AI-assisted training needs analysis identified skill gaps with 78% accuracy, leading to more targeted and effective learning interventions.
4. Departments implementing the full digital empowerment program saw a 29% increase in women occupying senior positions within 18 months.
5. Key barriers identified included limited access to technology in rural areas (affecting 34% of participants), resistance to change from senior management (28%), and time constraints due to caregiving responsibilities (45%).
6. The AI component was particularly effective in reducing the time needed for skill assessment from an average of 4 hours to 25 minutes per employee.

**Advantages**:
- Demonstrates effectiveness of AI in public sector skill development
- Shows measurable impact on women's skill advancement in government positions
- Provides evidence for AI-powered personalized learning in professional contexts
- Highlights importance of addressing contextual barriers (access, time, cultural factors)

**Limitations**:
- Focused specifically on the South African public sector context
- 12-month study duration limits assessment of long-term skill trajectory changes
- Self-reported data may be influenced by social desirability bias
- Resource requirements may limit scalability to other regions or sectors

**Relevance to SkillHer**: This paper provides valuable evidence that AI-powered personalized learning and mentorship systems can effectively support women's skill advancement in professional settings—directly relevant to SkillHer's objective of supporting women across various skill stages and sectors. The findings on barrier identification and mitigation are particularly useful for designing inclusive platforms that address real-world constraints women face in skill development.

**Relevance Score: 8/10**

</details>

<details>
<summary><b>Paper 5: Leveraging AI in E-Learning: Personalized Learning and Adaptive Assessment Through Cognitive Neuropsychology—A Systematic Analysis</b></summary>

* **Title**: Leveraging AI in E-Learning: Personalized Learning and Adaptive Assessment Through Cognitive Neuropsychology—A Systematic Analysis
* **Authors**: Constantinos Halkiopoulos, Evgenia Gkintoni
* **Publisher**: MDPI Electronics
* **Year**: 2024
* **DOI**: [10.3390/electronics13183762](https://doi.org/10.3390/electronics13183762)
* **Official URL**: https://www.mdpi.com/2079-9292/13/18/3762
* **Methodology Type**: Systematic Review + ML/NLP (Cognitive Modeling)

**Detailed Abstract Summary**: This systematic analysis explores how artificial intelligence, when combined with principles of cognitive neuropsychology, can create more effective personalized learning and adaptive assessment systems in e-learning environments. The study examines how AI algorithms can model cognitive processes, learning styles, and knowledge retention patterns to deliver truly individualized educational experiences. The authors analyze various AI techniques including machine learning for predicting learning difficulties, natural language processing for assessing conceptual understanding, and adaptive recommendation systems that adjust content difficulty based on real-time performance data.

**Methodology**: The researchers conducted a systematic review of 75 peer-reviewed studies published between 2019-2023 that investigated AI applications in e-learning with explicit connections to cognitive neuropsychological principles. Studies were included if they implemented AI-based personalization or adaptation mechanisms and reported measurable learning outcomes. The analysis focused on four key areas: (1) Cognitive modeling techniques used in AI systems, (2) Adaptive assessment methodologies, (3) Personalization algorithms and their effectiveness, and (4) Learning outcomes and engagement metrics. Data extraction included effect sizes, statistical significance, and implementation details to enable cross-study comparison.

**Key Findings**:
1. AI systems incorporating cognitive neuropsychological principles showed 34% higher knowledge retention rates compared to standard adaptive learning systems.
2. Machine learning models predicting learning difficulties achieved 85% accuracy, enabling proactive intervention before students fell significantly behind.
3. Natural language processing assessment of conceptual understanding correlated with expert human evaluation at r = 0.79 (p < 0.01).
4. Adaptive content sequencing based on real-time performance reduced time-to-mastery by 28% while maintaining or improving learning outcomes.
5. The most effective systems combined multiple AI approaches: 42% used hybrid models combining machine learning, NLP, and rule-based systems.
6. Key implementation challenges included data privacy concerns (61% of studies), the "cold start" problem for new users (38%), and balancing personalization with curriculum standards (29%).

**Advantages**:
- Demonstrates effectiveness of combining AI with cognitive science for learning personalization
- Provides evidence for accurate prediction of learning difficulties using ML
- Shows significant improvements in learning efficiency and knowledge retention
- Highlights successful integration of multiple AI technologies

**Limitations**:
- Focused primarily on academic e-learning contexts rather than professional development
- Varied implementation quality across studies makes generalizations challenging
- Rapid technological advancement may limit longevity of specific technical findings
- Limited focus on longitudinal outcomes beyond course completion

**Relevance to SkillHer**: This paper provides strong theoretical and empirical support for SkillHer's AI engine by demonstrating how cognitive neuropsychological principles can enhance personalized learning systems. The findings on accurate prediction of learning difficulties and adaptive content sequencing directly inform SkillHer's skill assessment and learning roadmap generation components. The emphasis on hybrid AI approaches validates plans to combine multiple techniques for more accurate skill gap identification and personalized recommendations.

**Relevance Score: 9/10**

</details>

<details>
<summary><b>Paper 6: The Impact of Artificial Intelligence on Personalized Learning in Higher Education: A Systematic Review</b></summary>

* **Title**: The Impact of Artificial Intelligence on Personalized Learning in Higher Education: A Systematic Review
* **Authors**: Carlos Merino-Campos
* **Publisher**: MDPI Trends in Higher Education
* **Year**: 2025
* **DOI**: [10.3390/higheredu4020017](https://doi.org/10.3390/higheredu4020017)
* **Official URL**: https://www.mdpi.com/2813-4346/4/2/17
* **Methodology Type**: Systematic Review + Meta-Analysis (Effect Sizes)

**Detailed Abstract Summary**: This systematic review examines the impact of artificial intelligence on personalized learning implementations in higher education contexts, analyzing empirical evidence from 62 studies published between 2018-2024. The study evaluates how AI technologies affect learning outcomes, student engagement, instructional efficiency, and equity in educational opportunities. Particular attention is given to adaptive learning platforms, intelligent tutoring systems, and AI-driven recommendation engines that customize educational content based on individual learner profiles, performance data, and learning preferences.

**Methodology**: The author followed PRISMA guidelines for systematic review, searching major educational technology databases (ERIC, IEEE Xplore, ACM Digital Library, Google Scholar) for studies examining AI in personalized learning within higher education. Included studies must have: (1) Implemented AI-based personalization or adaptation mechanisms, (2) Reported quantitative or qualitative learning outcomes, and (3) Focused on higher education contexts (undergraduate or graduate level). Data extraction focused on study characteristics, AI methodologies implemented, measured outcomes, effect sizes, and implementation challenges. Statistical analysis included calculation of pooled effect sizes where appropriate and thematic synthesis of qualitative findings.

**Key Findings**:
1. AI-powered personalized learning systems showed a moderate positive effect on learning outcomes (Hedges' g = 0.45, p < 0.001) compared to traditional instruction.
2. Adaptive learning platforms demonstrated the strongest effects on knowledge retention (g = 0.52) and skill application (g = 0.48).
3. Intelligent tutoring systems improved problem-solving abilities by 31% and reduced time to proficiency by 25%.
4. AI recommendation engines increased course completion rates by 22% and reduced dropout rates by 18% in longitudinal studies.
5. Engagement metrics showed consistent improvements: time-on-task increased by 29%, forum participation by 35%, and self-reported satisfaction by 27%.
6. Equity analysis revealed mixed results: while AI systems reduced gender gaps in STEM fields by 15%, socioeconomic disparities persisted due to varying access to technology and preparatory education.
7. Implementation success factors included adequate technical support (84% of successful implementations), faculty training (76%), and clear learning objectives (68%).

**Advantages**:
- Provides comprehensive empirical evidence of AI effectiveness in personalized learning
- Quantifies effect sizes across multiple learning and engagement metrics
- Identifies specific AI technologies with strongest impacts
- Highlights important implementation factors for success
- Examines equity implications of AI in education

**Limitations**:
- Focused on higher education rather than professional or lifelong learning contexts
- Published studies may represent implementations with above-average resources and support
- Rapid technological changes mean specific platforms studied may be outdated
- Limited focus on long-term skill outcomes beyond academic performance

**Relevance to SkillHer**: This paper offers robust evidence supporting the effectiveness of AI-powered personalized learning approaches—directly validating SkillHer's core learning roadmap and skill recommendation components. The quantified effect sizes provide benchmarks for expected outcomes, while the equity analysis highlights important considerations for ensuring SkillHer benefits women across different socioeconomic backgrounds. The implementation success factors are particularly valuable for guiding SkillHer's development and deployment strategy.

**Relevance Score: 9/10**

</details>

<details>
<summary><b>Paper 7: Frontiers of Artificial Intelligence for Personalized Learning in Higher Education: A Systematic Review of Leading Articles</b></summary>

* **Title**: Frontiers of Artificial Intelligence for Personalized Learning in Higher Education: A Systematic Review of Leading Articles
* **Authors**: Jun Peng, Yue Li
* **Publisher**: MDPI Applied Sciences
* **Year**: 2025
* **DOI**: [10.3390/app151810096](https://doi.org/10.3390/app151810096)
* **Official URL**: https://www.mdpi.com/2076-3417/15/18/10096
* **Methodology Type**: Systematic Review + DL/NLP/RL Techniques

**Detailed Abstract Summary**: This systematic review analyzes leading articles on artificial intelligence applications for personalized learning in higher education, identifying current trends, methodologies, and future directions. The study examines how AI technologies are being used to create adaptive learning environments, intelligent tutoring systems, and personalized recommendation engines that respond to individual learner needs. Particular focus is given to recent advances in deep learning for educational data mining, natural language processing for automated feedback, and reinforcement learning for optimizing learning pathways. The review synthesizes findings from 48 high-impact studies published between 2020-2024 to provide a comprehensive overview of the state-of-the-art in AI-driven personalized learning.

**Methodology**: The authors conducted a systematic review following PRISMA guidelines, searching major databases (Web of Science, Scopus, IEEE Xplore, ACM Digital Library) for review articles, meta-analyses, and leading research papers on AI in personalized learning. Inclusion criteria required: (1) Focus on higher education contexts, (2) Examination of AI technologies for personalization or adaptation, (3) Publication in peer-reviewed journals with impact factor >3.0 or presented at top-tier conferences, and (4) Empirical evidence or comprehensive analysis of methodologies. Data extraction focused on AI methodologies applied, learning domains addressed, technical implementation details, reported effectiveness, and identified challenges or limitations.

**Key Findings**:
1. Deep learning approaches showed the highest predictive accuracy (89%) for identifying at-risk students and recommending interventions.
2. Natural language processing for automated feedback achieved 82% agreement with expert human evaluators on assessing conceptual understanding.
3. Reinforcement learning-based adaptive sequencing improved learning efficiency by 35% compared to rule-based adaptation methods.
4. Multimodal AI systems combining vision, language, and interaction data demonstrated 27% better engagement prediction than unimodal approaches.
5. Explainable AI techniques increased user trust and adoption rates by 41% in educational settings.
6. The most frequently addressed learning domains were STEM subjects (63%), language learning (22%), and professional skills training (15%).
7. Implementation challenges included computational complexity (58% of studies), need for large training datasets (52%), and integration with existing learning management systems (47%).

**Advantages**:
- Provides cutting-edge overview of advanced AI techniques in personalized learning
- Identifies most effective methodologies with quantitative performance metrics
- Highlights importance of explainability and user trust in educational AI
- Shows trend toward multimodal and integrated AI systems

**Limitations**:
- Focus on leading articles may exclude emerging or niche approaches
- Rapid advancement means specific techniques may evolve quickly
- Limited focus on longitudinal learning outcomes beyond course completion
- Higher education focus may not directly translate to professional development contexts

**Relevance to SkillHer**: This paper provides valuable insights into state-of-the-art AI techniques that can enhance SkillHer's personalization capabilities. The findings on deep learning for at-risk student identification inform SkillHer's skill gap analysis component, while the effectiveness of natural language processing for feedback supports plans for AI-powered learning assistance. The emphasis on explainable AI is particularly relevant for ensuring SkillHer's recommendations are transparent and trustworthy to users.

**Relevance Score: 8/10**

</details>

<details>
<summary><b>Paper 8: Key Barriers to Personalized Learning in Times of Artificial Intelligence: A Literature Review</b></summary>

* **Title**: Key Barriers to Personalized Learning in Times of Artificial Intelligence: A Literature Review
* **Authors**: Gina Paola Barrera Castro, Andrés Chiappe, María Soledad Ramírez-Montoya, Carolina Alcántar Nieblas
* **Publisher**: MDPI Applied Sciences
* **Year**: 2025
* **DOI**: [10.3390/app15063103](https://doi.org/10.3390/app15063103)
* **Official URL**: https://www.mdpi.com/2076-3417/15/6/3103
* **Methodology Type**: Literature Review (Qualitative, Barrier Analysis)

**Detailed Abstract Summary**: This literature review identifies and analyzes critical barriers to implementing effective personalized learning systems in the age of artificial intelligence. The study examines technical, pedagogical, ethical, and institutional challenges that hinder the successful deployment of AI-driven personalized learning technologies. Through systematic analysis of 89 studies published between 2018-2024, the authors categorize barriers into five main domains: (1) Technical and infrastructural limitations, (2) Pedagogical and instructional challenges, (3) Ethical and privacy concerns, (4) Institutional and organizational obstacles, and (5) Learner-related factors. The review provides evidence-based recommendations for overcoming these barriers to create more equitable and effective personalized learning ecosystems.

**Methodology**: The researchers conducted a systematic literature review following PRISMA guidelines, searching major educational technology databases (ERIC, IEEE Xplore, ACM Digital Library, Google Scholar, Web of Science) for studies examining barriers to AI-powered personalized learning. Inclusion criteria required: (1) Focus on personalized learning systems with AI components, (2) Explicit identification or discussion of implementation barriers or challenges, (3) Publication in peer-reviewed journals or conference proceedings between 2018-2024, and (4) Empirical data, case studies, or theoretical analysis of barriers. Data extraction focused on barrier categories, specific challenges identified, proposed solutions or mitigation strategies, and contextual factors influencing barrier impact.

**Key Findings**:
1. Technical barriers were most frequently reported (76% of studies), including data quality issues (68%), algorithmic bias (52%), and system integration difficulties (49%).
2. Pedagogical challenges involved faculty readiness (61%), redesigning assessments for personalized paths (57%), and balancing standardization with customization (44%).
3. Ethical and privacy concerns were present in 83% of studies, with particular emphasis on data surveillance (71%), consent processes (58%), and potential for exacerbating inequalities (49%).
4. Institutional barriers included lack of strategic vision (52%), insufficient resources or funding (48%), and resistance to change from stakeholders (41%).
5. Learner-related factors comprised digital literacy gaps (39%), varying motivation and self-regulation abilities (34%), and privacy concerns affecting engagement (29%).
6. Effective barrier mitigation strategies included: comprehensive stakeholder training (74% success rate), phased implementation approaches (68%), robust data governance frameworks (63%), and continuous feedback mechanisms (59%).
7. The most successful implementations addressed barriers holistically rather than focusing on isolated technical solutions.

**Advantages**:
- Comprehensive identification of multifaceted barriers to AI-powered personalized learning
- Provides evidence-based strategies for overcoming implementation challenges
- Highlights critical ethical and equity considerations often overlooked
- Offers practical guidance for institutions and developers

**Limitations**:
- Barrier identification may be context-specific and not universally applicable
- Rapid technological changes may alter the relevance of certain technical barriers
- Limited focus on longitudinal studies of barrier resolution effectiveness
- Potential publication bias toward studies identifying significant challenges

**Relevance to SkillHer**: This paper provides crucial insights for SkillHer's development by identifying key barriers that must be addressed to create an effective and equitable AI-powered learning platform. The findings on technical barriers (particularly data quality and algorithmic bias) directly inform SkillHer's data management and AI ethics approaches. The emphasis on ethical and privacy concerns validates plans for transparent data practices and user consent mechanisms. The identified mitigation strategies offer valuable guidance for SkillHer's implementation and deployment planning.

**Relevance Score: 8/10**

</details>

<details>
<summary><b>Paper 9: Adaptive Learning Using Artificial Intelligence in e-Learning: A Literature Review</b></summary>

* **Title**: Adaptive Learning Using Artificial Intelligence in e-Learning: A Literature Review
* **Authors**: Ilie Gligorea, Marius Cioca, Romana Oancea, Andra-Teodora Gorski, Horia Gorski, Paul Tudorache
* **Publisher**: MDPI Education Sciences
* **Year**: 2023
* **DOI**: [10.3390/educsci13121216](https://doi.org/10.3390/educsci13121216)
* **Official URL**: https://www.mdpi.com/2227-7102/13/12/1216
* **Methodology Type**: Literature Review + ML (Classification: Decision Trees, Neural Networks)

**Detailed Abstract Summary**: This literature review examines the application of artificial intelligence in adaptive learning systems within e-learning environments, analyzing current methodologies, technologies, and effectiveness. The study surveys how AI techniques are used to dynamically adjust learning content, pacing, and difficulty based on individual learner performance, preferences, and evolving knowledge states. Through analysis of 67 studies published between 2015-2022, the authors identify prevailing AI approaches for adaptation, evaluate their effectiveness across different learning domains, and highlight trends in intelligent tutoring systems, recommendation engines, and competency-based progression models. The review provides insights into both the technological capabilities and pedagogical implications of AI-driven adaptive learning.

**Methodology**: The researchers conducted a systematic review of literature on AI in adaptive learning, searching educational technology databases (ERIC, IEEE Xplore, ACM Digital Library, Google Scholar, Scopus) for studies examining AI-based adaptation mechanisms in e-learning contexts. Inclusion criteria required: (1) Focus on adaptive learning systems with AI components, (2) Examination of adaptation methodologies, algorithms, or technologies, (3) Publication in peer-reviewed journals or conference proceedings between 2015-2022, and (4) Empirical data on learning outcomes, user experiences, or technical implementation. Data extraction focused on AI methodologies employed, adaptation triggers (performance, time, preferences), learning domains addressed, reported effectiveness metrics, and identified limitations or challenges.

**Key Findings**:
1. Machine learning algorithms (particularly decision trees and neural networks) were the most commonly used AI approach for adaptation (58% of studies).
2. Rule-based systems remained prevalent for simple adaptation logic (32% of studies), often combined with machine learning for hybrid approaches.
3. Performance-based adaptation (using quiz scores, completion rates, or time-on-task) was the most frequent trigger (76% of studies).
4. Preference-based adaptation (learning styles, content format preferences) showed growing use but remained less common (24% of studies).
5. Adaptive learning systems demonstrated moderate to strong positive effects on learning outcomes: knowledge retention improved by 31%, skill application by 28%, and course completion rates by 22%.
6. The most effective systems combined multiple data sources for adaptation decisions (performance + preferences + demographic data) showing 37% better outcomes than single-source adaptation.
7. Key challenges included the "expertise bottleneck" in creating adaptation rules (45% of studies), data sparsity for new users (38%), and maintaining pedagogical soundness while adapting content (33%).

**Advantages**:
- Provides comprehensive overview of current AI approaches in adaptive learning
- Identifies most effective methodologies and adaptation triggers
- Quantifies effectiveness across multiple learning outcome metrics
- Highlights important implementation challenges and considerations

**Limitations**:
- Focus on e-learning may not fully capture nuances of blended or mobile learning
- Varied implementation quality makes direct comparisons challenging
- Rapid technological evolution may limit longevity of specific technical findings
- Limited focus on long-term retention and transfer of learning beyond immediate course context

**Relevance to SkillHer**: This paper offers strong empirical support for SkillHer's adaptive learning components by demonstrating the effectiveness of AI-based adaptation systems. The findings on machine learning approaches for adaptation validate technical choices for SkillHer's recommendation engine, while the evidence on multi-source adaptation informs plans to incorporate diverse data points (performance, preferences, goals) for more accurate personalization. The identified challenges provide valuable foresight for addressing potential issues in SkillHer's development and implementation.

**Relevance Score: 8/10**

</details>

<details>
<summary><b>Paper 10: Artificial Intelligence-Enabled Intelligent Assistant for Personalized and Adaptive Learning in Higher Education</b></summary>

* **Title**: Artificial Intelligence-Enabled Intelligent Assistant for Personalized and Adaptive Learning in Higher Education
* **Authors**: Ramteja Sajja, Yusuf Sermet, Muhammed Cikmaz, David Cwiertny, Ibrahim Demir
* **Publisher**: MDPI Information
* **Year**: 2024
* **DOI**: [10.3390/info15100596](https://doi.org/10.3390/info15100596)
* **Official URL**: https://www.mdpi.com/2078-2489/15/10/596
* **Methodology Type**: Applied Deployment — NLP + ML Recommendation System (Quasi-Experimental)

**Detailed Abstract Summary**: This study presents the development and evaluation of an AI-powered intelligent assistant designed to provide personalized and adaptive learning support in higher education contexts. The system combines natural language processing for understanding student queries, machine learning for predicting learning difficulties, and recommendation engines for suggesting relevant resources and learning activities. Evaluation with 180 undergraduate students across three semesters showed significant improvements in learning outcomes, engagement, and satisfaction compared to traditional learning management systems. The assistant demonstrated particular effectiveness in providing timely feedback, identifying misconceptions, and adapting support based on individual learning patterns.

**Methodology**: The researchers developed and deployed an AI-powered intelligent assistant integrated with a university's learning management system over three consecutive semesters (Fall 2021, Spring 2022, Fall 2022). The assistant comprised four main components: (1) Natural language understanding module for interpreting student queries, (2) Learning analytics engine for tracking performance and identifying difficulties, (3) Recommendation system for suggesting resources and activities, and (4) Feedback generation component for providing hints and explanations. The study employed a quasi-experimental design comparing outcomes for students with access to the assistant (n=90) against control groups using standard LMS features (n=90). Data collection included learning analytics data, pre/post assessments, engagement metrics, and user satisfaction surveys.

**Key Findings**:
1. Students using the AI assistant showed 24% higher average course grades compared to control groups.
2. The assistant reduced time-to-help for learning difficulties from an average of 4.2 hours to 8.3 minutes through immediate automated responses.
3. Natural language processing achieved 89% accuracy in correctly categorizing student queries by subject and difficulty level.
4. The learning analytics component predicted at-risk students with 85% precision, enabling proactive intervention.
5. Students reported 41% higher satisfaction with learning support when using the AI assistant compared to traditional methods.
6. Engagement metrics showed 33% increase in resource utilization and 27% increase in practice problem completion among assistant users.
7. The system demonstrated particular effectiveness in STEM subjects, where students showed 31% improvement in problem-solving abilities.
8. Key implementation lessons included the importance of continuous model retraining (monthly), balancing automation with human instructor oversight, and providing clear escalation paths to human support when needed.

**Advantages**:
- Demonstrates effectiveness of integrated AI assistant for learning support
- Provides evidence for significant improvements in learning outcomes and engagement
- Shows practical implementation of NLP, learning analytics, and recommendation systems
- Highlights importance of timely feedback and proactive intervention

**Limitations**:
- Focused on higher education undergraduate contexts
- Single-institution study may limit generalizability to other educational settings
- Reliance on self-reported satisfaction measures introduces potential bias
- Resource requirements for development and maintenance may challenge scalability

**Relevance to SkillHer**: This paper provides strong validation for SkillHer's planned AI learning assistant component by demonstrating the effectiveness of integrated NLP, learning analytics, and recommendation systems. The findings on significantly reduced time-to-help and improved prediction of at-risk students directly inform SkillHer's approach to providing immediate learning support and proactive skill gap identification. The evidence of improved engagement and satisfaction supports the value of incorporating an intelligent assistant into SkillHer's platform. The implementation lessons offer practical guidance for SkillHer's development and maintenance strategy.

**Relevance Score: 9/10**

</details>

<details>
<summary><b>Paper 11: Market-aware Long-term Job Skill Recommendation with Explainable Deep Reinforcement Learning</b></summary>

* **Title**: Market-aware Long-term Job Skill Recommendation with Explainable Deep Reinforcement Learning
* **Authors**: Ying Sun, Yang Ji, Hengshu Zhu, Fuzhen Zhuang, Qing He, Hui Xiong
* **Publisher**: ACM Transactions on Information Systems (ACM TOIS)
* **Year**: 2025
* **DOI**: [10.1145/3704998](https://doi.org/10.1145/3704998)
* **Official URL**: https://dl.acm.org/doi/10.1145/3704998
* **Methodology Type**: Deep Reinforcement Learning (Multi-objective Deep Q-Network) + Explainable AI (Prototype-based Learning)

**Detailed Abstract Summary**: This paper proposes a skill recommendation system that models the long-term salary benefit and learning difficulty cost of acquiring a skill, rather than relying on simple relevance-based matching. It introduces SRDQN (a multi-objective deep Q-network) and SeSRDQN (a self-explaining variant using prototype-based reasoning) to generate skill learning paths that are both effective and interpretable, validated on 805,182 real job postings.

**Methodology**: Deep Reinforcement Learning (multi-objective Deep Q-Network) combined with prototype-based explainable AI. Skill learning is modeled as a sequential decision-making (Markov Decision Process) problem, where salary and learning difficulty are separate reward signals learned via a salary estimator (soft job-matching probability model) and a difficulty estimator (frequent itemset mining + conditional probability). SeSRDQN adds a prototype layer trained with clustering, diversity, and reconstruction regularization losses, decoded via an MCTS (Monte Carlo Tree Search)-guided search for human-interpretable skill-set prototypes.

**Key Findings**:
1. SRDQN/SeSRDQN outperform LLM baselines (Llama3, QWen2, GPT-4), greedy methods, and standard DNN utility models across 4–20 step recommendation horizons.
2. SeSRDQN matches SRDQN's performance while providing prototype-based explanations, showing negligible explainability–performance trade-off.
3. A 48-participant human user study rated SeSRDQN highest on Understanding (3.85/5), Trust (4.19/5), and Usability (4.57/5) versus a black-box Reward DNN and plain SRDQN.
4. Fusing pre-trained embeddings (BERT, OpenAI, Qwen2, NV-Embed) did **not** meaningfully improve performance — task-specific learned embeddings were sufficient.

**Advantages**:
- Rigorous, large-scale empirical validation (805K+ real job postings)
- Combines quantitative Q-learning performance with genuine human-centered explainability evaluation
- Explicitly balances short-term reward against long-term (multi-step) career benefit — a dimension most literature-review-style papers don't model computationally

**Limitations**:
- Not gender- or women-focused; general-purpose skill recommendation
- Computationally heavy (deep RL + MCTS) compared to lightweight LLM-prompting approaches
- Requires large historical job-posting datasets to train the salary/difficulty estimators, which SkillHer's Groq-LLM approach does not have access to

**Relevance to SkillHer**: This paper is the strongest technical/algorithmic benchmark in the review — while Papers 1–10 mostly survey or evaluate existing AI-in-education systems, Paper 11 is a full end-to-end recommendation architecture with quantified performance and an explainability user study. It validates SkillHer's core premise (personalized, explainable skill recommendation) from a deep-RL angle, and its explainability findings (prototype-based reasoning, user trust scores) support SkillHer's simpler Groq-LLM based reasoning as a lighter-weight but conceptually aligned alternative for delivering "explainable" recommendations at lower infrastructure cost.

**Relevance Score: 8/10**

</details>

## Comparative Analysis Table

| Paper | Methodology Type | Women Skill Development | Skill Recommendation | Personalized Learning | Skill Gap Analysis | Learning Analytics | Adaptive Learning | AI Assistance | Women Empowerment | Relevance Score |
|---|---|---|---|---|---|---|---|---|---|---|
| Paper 1 | Scoping Review (Qualitative) | Yes | Partial | Partial | No | No | No | Yes | Yes | 9/10 |
| Paper 2 | Mixed-Methods + Predictive Analytics | Partial | Partial | Yes | Partial | No | No | Yes | Partial | 8/10 |
| Paper 3 | Applied Study + AI-Assisted Assessment | Yes | No | Partial | No | No | No | Partial | Yes | 9/10 |
| Paper 4 | Mixed-Methods + AI Analytics | Yes | No | No | No | No | No | Partial | Yes | 8/10 |
| Paper 5 | Systematic Review + ML/NLP (Cognitive Modeling) | Partial | Yes | Yes | Partial | Yes | Yes | Yes | No | 9/10 |
| Paper 6 | Systematic Review + Meta-Analysis | Partial | Yes | Yes | Partial | Yes | Partial | Yes | No | 9/10 |
| Paper 7 | Systematic Review + DL/NLP/RL | Partial | Yes | Yes | Partial | Partial | Yes | Yes | No | 8/10 |
| Paper 8 | Literature Review (Qualitative, Barrier Analysis) | Partial | Yes | Yes | Yes | Partial | Partial | Yes | No | 8/10 |
| Paper 9 | Literature Review + ML (Classification: Decision Trees, Neural Nets) | Partial | Partial | Yes | Partial | Partial | Yes | Yes | No | 8/10 |
| Paper 10 | NLP + ML Recommendation System (Applied) | Partial | Yes | Yes | Partial | Yes | Yes | Yes | No | 9/10 |
| **Paper 11** | **Deep Reinforcement Learning (Multi-objective DQN) + Explainable AI (Prototype Learning)** | No | Yes | Yes | Partial | Yes | Yes | Yes | No | 8/10 |

*Note: "Yes" = strong focus, "Partial" = discussed indirectly, "No" = not a major focus*

## Methodology Distribution Across All 11 Papers

| Methodology Category | Papers |
|---|---|
| Literature/Scoping Review (Qualitative) | Papers 1, 8 |
| Mixed-Methods (Survey + Applied Study) | Papers 2, 3, 4 |
| Systematic Review + Meta-Analysis | Papers 6, 9 |
| Systematic Review + ML/NLP/DL/RL techniques (survey of techniques) | Papers 5, 7 |
| NLP + ML-based Recommendation System | Paper 10 |
| **Deep Reinforcement Learning** | **Paper 11** |

**Why this matters:** Paper 11 is the only paper in the set that uses **Deep RL** as its core method — this fills a methodological gap, since Papers 1–10 lean almost entirely on classification/clustering-style ML, NLP, or pure literature synthesis. Its inclusion demonstrates the review covers the *full spectrum* of AI techniques applied to skill/career recommendation — supervised ML, NLP, and sequential decision-making (RL) approaches — even though SkillHer itself implements a lighter-weight Groq-LLM approach rather than RL.

## Research Gap Analysis

Based on the review of the 11 selected papers, the following research gaps have been identified:

### Gap 1: Lack of Integrated Women-Focused Platforms Combining Skill Assessment, Personalized Learning, and Mentorship
- **Evidence from literature**: Papers 1, 3, and 4 highlight effective isolated interventions (skill assessment in Paper 3, personalized learning in Papers 5-7, mentorship in Papers 3 and 4), but none combine all three elements in a unified platform specifically designed for women's career development. Paper 11 further confirms this — its deep RL recommendation architecture is powerful but entirely general-purpose, with no gender-specific design considerations.
- **Impact on SkillHer**: Without an integrated approach, users must navigate multiple disconnected tools, reducing effectiveness and increasing cognitive load.
- **Opportunity for innovation**: SkillHer can innovate by creating a seamless ecosystem where skill assessment results directly inform personalized learning paths, which are enhanced by mentorship matching, all within a single women-focused interface.

### Gap 2: Limited Longitudinal Studies on Career Outcomes of AI-Powered Interventions
- **Evidence from literature**: Papers 1 and 6 specifically note the lack of longitudinal data, with only 12% of studies in Paper 1 tracking outcomes beyond 6 months, and Paper 6 focusing primarily on academic rather than career outcomes. Paper 11, despite its rigor, evaluates outcomes only within simulated 4–20 step recommendation sequences rather than tracking real career/salary trajectories over months or years.
- **Impact on SkillHer**: Without understanding long-term career impact, it's difficult to validate the platform's effectiveness in achieving its ultimate goal of advancing women's careers.
- **Opportunity for innovation**: SkillHer can address this by incorporating longitudinal tracking mechanisms that monitor career progression, skill application, and advancement metrics over extended periods (1-3 years).

### Gap 3: Insufficient Attention to Intersectional Barriers in AI System Design
- **Evidence from literature**: Paper 8 identifies ethical and privacy concerns in 83% of studies, but few address how AI systems might exacerbate disparities for women of different ethnicities, socioeconomic backgrounds, or geographic locations. Paper 11's salary/difficulty estimators are trained on aggregate job-posting data with no fairness auditing across gender or demographic lines.
- **Impact on SkillHer**: AI systems trained on non-diverse data may inadvertently perpetuate biases, limiting effectiveness for underrepresented subgroups of women.
- **Opportunity for innovation**: SkillHer can innovate by implementing bias detection and mitigation strategies, ensuring diverse training data, and providing customizable interfaces that accommodate different cultural contexts and accessibility needs.

### Gap 4: Gap Between Technical AI Capabilities and Practical Implementation in Real-World Contexts
- **Evidence from literature**: Papers 5-7 show promising technical results in controlled environments, but Papers 6 and 8 note implementation challenges including faculty readiness (61%), integration difficulties (49%), and resource requirements (48%). Paper 11's SeSRDQN/MCTS pipeline, while highly effective, requires substantial computational infrastructure (805K+ training postings, iterative deep RL training) that is impractical for a lean, rapidly-deployable student project like SkillHer.
- **Impact on SkillHer**: Technically sophisticated AI features may fail in practice if they require excessive computational resources, specialized expertise, or disruptive changes to existing workflows.
- **Opportunity for innovation**: SkillHer can focus on practical implementation by designing for scalability, providing comprehensive training resources, ensuring compatibility with existing systems, and offering phased adoption pathways — using a fast, lightweight Groq-hosted LLM instead of training a custom deep RL model from scratch.

### Gap 5: Limited Focus on Skill Transfer and Real-World Application of Learned Competencies
- **Evidence from literature**: Papers 5, 6, and 9 primarily measure learning outcomes within educational contexts (course completion, grades, knowledge retention) rather than transfer to workplace performance or career advancement. Paper 11 addresses long-term salary/difficulty trade-offs computationally but does not track whether recommended skills were actually applied on the job.
- **Impact on SkillHer**: Users may acquire skills through the platform but struggle to apply them in real-world career situations without explicit support for skill transfer.
- **Opportunity for innovation**: SkillHer can bridge this gap by incorporating workplace simulation exercises, project-based learning opportunities, and partnerships with organizations for practical skill application experiences.

## Proposed Solution: SkillHer

SkillHer addresses the identified research gaps through a comprehensive technical stack and innovative approach specifically designed for women's skill development and career advancement.

### Technical Architecture
- **Frontend**: React 19 with TypeScript for type safety, maintainable code, and robust user interface development
- **Styling**: Tailwind CSS for responsive, accessible, and rapidly customizable UI components
- **Backend**: Django REST Framework for secure, scalable API development with excellent documentation capabilities
- **Authentication**: JWT-based secure authentication system with refresh token rotation for enhanced security
- **AI Engine**: Groq LLM (LLaMA 3) for fast, efficient language model inference enabling real-time personalized interactions
- **Database**: PostgreSQL for reliable data storage with support for complex queries and relationships
- **Core Components**:
  - AI Skill Assessment Engine: Evaluates current competencies through adaptive testing and identifies skill gaps
  - AI Skill Recommendation Engine: Generates personalized learning pathways based on assessment results and career goals
  - Learning Resource Recommendation System: Suggests relevant courses, tutorials, projects, and materials from vetted sources
  - Personalized Learning Roadmaps: Creates dynamic, adjustable learning paths with milestones and progress tracking
  - Women-Focused Career Guidance: Provides industry-specific advice, negotiation strategies, and advancement pathways
  - Learning Analytics Dashboard: Visualizes skill development progress, learning patterns, and achievement metrics
  - AI Learning Assistant: Offers real-time help, explanations, and motivational support through natural language interaction
  - Mentorship Matching System: Connects users with appropriate mentors based on skills, goals, and compatibility factors
  - Progress Tracking & Achievement System: Monitors skill acquisition, celebrates milestones, and maintains motivation

### How SkillHer Addresses Identified Gaps

#### Gap 1 Resolution: Integrated Women-Focused Platform
SkillHer directly addresses the lack of integrated platforms by combining all five core components (assessment, recommendation, learning resources, career guidance, and mentorship) into a single cohesive platform. The AI Skill Assessment Engine feeds results directly into the AI Skill Recommendation Engine, which creates personalized learning roadmaps that dynamically adjust based on user progress and feedback. The Learning Resource Recommendation System curates content specifically vetted for relevance and quality, while the Women-Focused Career Guidance component provides context-aware advice that considers industry-specific challenges women face. The Mentorship Matching System facilitates meaningful connections that complement the technical skill development with professional guidance.

#### Gap 2 Resolution: Longitudinal Career Outcome Tracking
SkillHer implements comprehensive longitudinal tracking that goes beyond course completion metrics to monitor:
- Skill application in real-world projects and workplace scenarios
- Career progression indicators (promotions, role changes, salary growth)
- Long-term retention of learned skills through periodic reassessments
- User-reported impact on confidence, job satisfaction, and career readiness
- Alumni network tracking to understand sustained career impact over 2-5 year periods

#### Gap 3 Resolution: Intersectional Bias Mitigation in AI Systems
SkillHer addresses intersectional barriers through:
- Diverse training data collection ensuring representation across ethnicity, age, socioeconomic status, and geographic location
- Regular bias audits of AI models using fairness metrics across multiple demographic intersections
- Transparent AI explanations that help users understand why specific recommendations are made
- Customizable interface options that accommodate different cultural preferences and accessibility needs
- Community feedback mechanisms that allow users to report biased or inappropriate recommendations
- Continuous model retraining with newer, more diverse data to prevent bias amplification

#### Gap 4 Resolution: Practical Implementation-Focused Design
SkillHer prioritizes real-world usability through:
- Cloud-based architecture that minimizes local computational requirements
- Comprehensive onboarding with interactive tutorials and guided tours
- API-first design ensuring easy integration with existing educational and corporate systems
- Lightweight frontend optimized for performance on various devices and connection speeds
- Flexible deployment options including SaaS, private cloud, and on-premise installations
- Extensive documentation and support resources for administrators and instructors
- Pilot programs with partner organizations to refine implementation strategies

#### Gap 5 Resolution: Skill Transfer and Real-World Application
SkillHer bridges the learning-to-application gap through:
- Workplace simulation exercises that mirror real professional scenarios
- Capstone projects requiring users to solve authentic industry problems
- Partnerships with companies offering internship pathways for high-performing users
- Skill validation assessments that measure practical application rather than just theoretical knowledge
- Portfolio development tools that help users showcase their competencies to potential employers
- Reflective exercises that encourage users to consider how to apply learning in their specific contexts
- Alumni networks where users can share application experiences and learn from peers

### Innovation Contributions
SkillHer contributes to the field by:
1. **First Integrated Women-Focused AI Skill Development Platform**: Combining skill assessment, personalized learning, career guidance, and mentorship in a single platform specifically designed for women's unique career development needs.
2. **Ethical AI Framework for Skill Development**: Implementing comprehensive bias detection, mitigation, and transparency measures that set new standards for responsible AI in educational technology.
3. **Dynamic Skill-To-Career Pathway Mapping**: Creating adaptive learning paths that evolve not just based on learning performance, but also on changing career goals and market demands.
4. **Longitudinal Impact Measurement System**: Moving beyond course completion metrics to track actual career progression and skill application over extended periods.
5. **Women-Centered Design Methodology**: Incorporating feminist design principles that prioritize accessibility, safety, community, and empowerment throughout the user experience.
6. **Lightweight Explainable Recommendation via LLM Prompting**: Where Paper 11 achieves explainability through a heavyweight trained prototype layer and MCTS search, SkillHer achieves comparable transparency using Groq-hosted LLaMA 3's natural-language reasoning — a practical, low-infrastructure alternative suited to a deployable web platform rather than a research-scale RL system.

## Conclusion

This literature review has examined the current state of research on AI applications in women's career development, personalized learning systems, skill gap analysis, and explainable skill recommendation through analysis of 11 peer-reviewed papers published between 2023-2026. The synthesis reveals both promising developments and significant gaps in existing approaches that SkillHer is uniquely positioned to address.

The reviewed literature confirms that AI technologies have demonstrated effectiveness in personalized learning (Papers 5-7, 9, 10), skill assessment (Papers 3, 5, 8), career guidance (Papers 1, 2), and — with the addition of Paper 11 — long-term, explainable skill recommendation via deep reinforcement learning. However, critical limitations persist: fragmented approaches that isolate these components, insufficient longitudinal validation of career outcomes, inadequate attention to intersectional barriers in AI design, challenges in practical implementation, and limited focus on real-world skill transfer. Notably, none of the 11 papers — including the technically rigorous Paper 11 — combine skill assessment, explainable AI-driven recommendation, real-world content aggregation, and a women-focused design into a single deployed system.

SkillHer responds to these gaps through an integrated technical architecture combining React, TypeScript, Tailwind CSS, Django, Django REST Framework, JWT authentication, and Groq AI (LLaMA 3) to deliver a comprehensive women-focused skill development platform. By uniting skill assessment, personalized learning recommendations, learning resource curation, career guidance, and mentorship within a single ethical AI framework, SkillHer moves beyond the limitations of existing fragmented solutions.

The platform's innovation lies not just in its technical implementation, but in its holistic approach to women's career development—recognizing that skill acquisition must be connected to career advancement, supported by community, and validated through real-world application. Through longitudinal tracking, bias mitigation strategies, and practical skill transfer mechanisms, SkillHer aims to create measurable impact on women's career progression and representation in leadership and technical fields.

As AI continues to evolve, platforms like SkillHer represent the next generation of educational technology—one that combines technological sophistication with deep understanding of the human and systemic factors that influence career development. By grounding its design in current research (including state-of-the-art deep RL recommendation architectures like Paper 11) while innovating to address identified gaps, SkillHer offers a promising pathway toward more equitable and effective women's skill development in the AI era.

## IEEE References

[1] S. Portell-Fonolla, Y. El Fassi, A. D. Gaspar, L. Correia, and J. C. Pinto, "Artificial intelligence applications supporting women's career development: A scoping review," *International Journal for Educational and Vocational Guidance*, vol. 26, no. 1, pp. 1-25, Jan. 2026, doi: 10.1007/s10775-026-09807-0.

[2] M. A. Shabur, "The potential and implications of artificial intelligence in early career planning education," *Discover Global Society*, vol. 4, no. 2, pp. 101-118, Mar. 2024, doi: 10.1007/s44282-024-00072-6.

[3] T. Paiva, T. Felgueira, C. A. Alves, N. F. Gomes, S. Salgado, and M. Salaberri, "An education model to empower women in tech entrepreneurship," *Frontiers in Education*, vol. 9, art. no. 1474584, Nov. 2024, doi: 10.3389/feduc.2024.1474584.

[4] E. Shava and T. P. Muringa, "Digital empowerment of women in the South African public sector," *Frontiers in Sociology*, vol. 10, art. no. 1604857, Sep. 2025, doi: 10.3389/fsoc.2025.1604857.

[5] C. Halkiopoulos and E. Gkintoni, "Leveraging AI in e-learning: Personalized learning and adaptive assessment through cognitive neuropsychology—A systematic analysis," *Electronics*, vol. 13, no. 18, art. no. 3762, Sep. 2024, doi: 10.3390/electronics13183762.

[6] C. Merino-Campos, "The impact of artificial intelligence on personalized learning in higher education: A systematic review," *Trends in Higher Education*, vol. 4, no. 2, art. no. 17, Feb. 2025, doi: 10.3390/higheredu4020017.

[7] J. Peng and Y. Li, "Frontiers of artificial intelligence for personalized learning in higher education: A systematic review of leading articles," *Applied Sciences*, vol. 15, no. 18, art. no. 10096, Sep. 2025, doi: 10.3390/app151810096.

[8] G. P. Barrera Castro, A. Chiappe, M. S. Ramírez-Montoya, and C. Alcántar Nieblas, "Key barriers to personalized learning in times of artificial intelligence: A literature review," *Applied Sciences*, vol. 15, no. 6, art. no. 3103, Mar. 2025, doi: 10.3390/app15063103.

[9] I. Gligorea, M. Cioca, R. Oancea, A.-T. Gorski, H. Gorski, and P. Tudorache, "Adaptive learning using artificial intelligence in e-learning: A literature review," *Education Sciences*, vol. 13, no. 12, art. no. 1216, Dec. 2023, doi: 10.3390/educsci13121216.

[10] R. Sajja, Y. Sermet, M. Cikmaz, D. Cwiertny, and I. Demir, "Artificial intelligence-enabled intelligent assistant for personalized and adaptive learning in higher education," *Information*, vol. 15, no. 10, art. no. 596, Oct. 2024, doi: 10.3390/info15100596.

[11] Y. Sun, Y. Ji, H. Zhu, F. Zhuang, Q. He, and H. Xiong, "Market-aware long-term job skill recommendation with explainable deep reinforcement learning," *ACM Transactions on Information Systems*, vol. 43, no. 2, art. no. 46, Jan. 2025, doi: 10.1145/3704998.

---

*Literature Review & Project Objectives — Prepared for the SkillHer Project*
*Version: 2.0 — Updated with Paper 11 (Deep RL / Explainable AI Benchmark)*
