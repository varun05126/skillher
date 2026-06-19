<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SkillHer — Literature Review &amp; Project Objectives</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  :root{
    --bg-void:#0a0e1a;
    --bg-deep:#0d1224;
    --bg-panel:#11172b;
    --bg-card:#141b33;
    --line:rgba(232,184,109,0.14);
    --line-soft:rgba(255,255,255,0.07);
    --gold:#e8b86d;
    --gold-bright:#f3cf8f;
    --gold-dim:#a9824f;
    --ink:#eae6f2;
    --ink-soft:#b9b6cc;
    --ink-faint:#7d7a96;
    --violet:#7c7ce0;
    --teal:#5fc7c2;
    --yes:#6fcf97;
    --partial:#e8b86d;
    --no:#7d7a96;
    --maxw:880px;
  }

  *{box-sizing:border-box;}
  html{scroll-behavior:smooth;}
  body{
    margin:0;
    background:
      radial-gradient(ellipse 900px 600px at 15% -5%, rgba(124,124,224,0.10), transparent 60%),
      radial-gradient(ellipse 700px 500px at 100% 10%, rgba(232,184,109,0.07), transparent 55%),
      var(--bg-void);
    color:var(--ink);
    font-family:'Inter',system-ui,sans-serif;
    line-height:1.65;
    -webkit-font-smoothing:antialiased;
  }

  /* starfield */
  #stars{
    position:fixed; inset:0; z-index:0; pointer-events:none; opacity:0.5;
  }

  /* progress bar */
  #progress{
    position:fixed; top:0; left:0; height:3px; width:0%;
    background:linear-gradient(90deg,var(--gold-dim),var(--gold-bright));
    z-index:1000; transition:width 0.1s linear;
    box-shadow:0 0 8px rgba(232,184,109,0.6);
  }

  a{color:var(--gold-bright); text-decoration:none;}
  a:hover{text-decoration:underline;}

  h1,h2,h3,h4{font-family:'Playfair Display',serif; color:var(--ink); margin:0 0 .5em 0; letter-spacing:0.01em;}

  /* ===== layout ===== */
  .shell{
    position:relative; z-index:1;
    display:grid;
    grid-template-columns:300px 1fr;
    min-height:100vh;
  }

  /* ===== sidebar TOC ===== */
  #sidebar{
    position:sticky; top:0; height:100vh;
    border-right:1px solid var(--line);
    background:linear-gradient(180deg, rgba(13,18,36,0.96), rgba(10,14,26,0.96));
    backdrop-filter:blur(6px);
    padding:28px 0 28px 0;
    overflow-y:auto;
  }
  #sidebar::-webkit-scrollbar{width:6px;}
  #sidebar::-webkit-scrollbar-thumb{background:rgba(232,184,109,0.25); border-radius:3px;}

  .brand{
    padding:0 22px 20px 26px;
    border-bottom:1px solid var(--line);
    margin-bottom:18px;
  }
  .brand .mark{
    font-family:'Playfair Display',serif; font-style:italic; font-weight:600;
    font-size:1.5rem; color:var(--gold-bright); letter-spacing:0.02em;
  }
  .brand .sub{
    font-size:0.72rem; letter-spacing:0.12em; text-transform:uppercase;
    color:var(--ink-faint); margin-top:4px;
  }

  nav.toc{padding:0 14px 0 14px;}
  .toc-group-label{
    font-size:0.68rem; letter-spacing:0.14em; text-transform:uppercase;
    color:var(--gold-dim); padding:14px 12px 6px 12px; font-weight:600;
  }
  .toc a{
    display:flex; align-items:baseline; gap:10px;
    color:var(--ink-soft); font-size:0.86rem;
    padding:7px 12px; border-radius:7px;
    text-decoration:none; transition:background 0.15s, color 0.15s;
    border-left:2px solid transparent;
  }
  .toc a .num{
    font-family:'JetBrains Mono',monospace; font-size:0.72rem; color:var(--gold-dim);
    min-width:20px;
  }
  .toc a:hover{background:rgba(232,184,109,0.08); color:var(--ink);}
  .toc a.active{
    background:rgba(232,184,109,0.12); color:var(--gold-bright);
    border-left:2px solid var(--gold);
  }
  .toc a.sub-link{padding-left:30px; font-size:0.8rem;}
  .toc a.sub-link .num{min-width:0;}

  #sidebar-toggle{
    display:none;
  }

  /* ===== main content ===== */
  main{
    position:relative; z-index:1;
    padding:64px 48px 120px 48px;
    max-width:980px;
  }
  .content-inner{max-width:var(--maxw); margin:0 auto;}

  .doc-header{margin-bottom:64px;}
  .eyebrow{
    font-family:'JetBrains Mono',monospace; font-size:0.74rem; letter-spacing:0.16em;
    text-transform:uppercase; color:var(--teal); margin-bottom:14px;
  }
  .doc-header h1{
    font-size:2.6rem; font-weight:700; line-height:1.15; max-width:760px;
  }
  .doc-header .deck{
    font-size:1.05rem; color:var(--ink-soft); margin-top:14px; max-width:680px;
  }
  .meta-row{
    display:flex; gap:28px; margin-top:28px; flex-wrap:wrap;
  }
  .meta-item{font-size:0.82rem; color:var(--ink-faint);}
  .meta-item b{color:var(--ink-soft); font-weight:600; display:block; font-size:0.7rem; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:3px;}

  section.block{
    margin-bottom:74px;
    scroll-margin-top:32px;
  }
  section.block > .kicker{
    font-family:'JetBrains Mono',monospace; font-size:0.72rem; letter-spacing:0.14em;
    text-transform:uppercase; color:var(--gold-dim); margin-bottom:10px;
  }
  section.block h2{font-size:1.9rem; padding-bottom:14px; border-bottom:1px solid var(--line); margin-bottom:22px;}
  section.block h3{font-size:1.3rem; margin-top:36px; color:var(--gold-bright);}
  section.block h4{font-size:1.05rem; color:var(--ink); margin-top:24px;}

  p{color:var(--ink-soft); margin:0 0 16px 0;}
  ul, ol{color:var(--ink-soft); padding-left:1.3em; margin:0 0 16px 0;}
  li{margin-bottom:8px;}
  li::marker{color:var(--gold-dim);}
  strong{color:var(--ink); font-weight:600;}

  hr.div{border:none; border-top:1px solid var(--line); margin:40px 0;}

  /* objective cards */
  .obj-card{
    background:var(--bg-card);
    border:1px solid var(--line);
    border-radius:14px;
    padding:26px 28px;
    margin-bottom:18px;
    position:relative;
    overflow:hidden;
  }
  .obj-card::before{
    content:'';
    position:absolute; top:0; left:0; bottom:0; width:3px;
    background:linear-gradient(180deg,var(--gold),var(--violet));
  }
  .obj-card .obj-num{
    font-family:'JetBrains Mono',monospace; font-size:0.78rem; color:var(--gold);
    letter-spacing:0.08em; margin-bottom:8px; display:block;
  }
  .obj-card h3{margin-top:0; font-size:1.18rem; color:var(--ink);}
  .obj-card p{margin-bottom:0; color:var(--ink-soft);}

  /* paper cards */
  .paper-card{
    background:var(--bg-card);
    border:1px solid var(--line);
    border-radius:14px;
    padding:0;
    margin-bottom:20px;
    overflow:hidden;
  }
  .paper-summary{
    padding:20px 24px;
    cursor:pointer;
    display:flex; justify-content:space-between; align-items:flex-start; gap:16px;
    list-style:none;
  }
  .paper-summary::-webkit-details-marker{display:none;}
  .paper-summary .ptitle{
    font-family:'Playfair Display',serif; font-weight:600; font-size:1.08rem; color:var(--ink);
    margin-bottom:6px;
  }
  .paper-summary .pmeta{
    font-size:0.78rem; color:var(--ink-faint); display:flex; gap:14px; flex-wrap:wrap;
  }
  .paper-summary .chev{
    color:var(--gold-dim); font-size:1.1rem; transition:transform 0.2s; flex-shrink:0; margin-top:4px;
  }
  details[open] .chev{transform:rotate(90deg);}
  details[open] .paper-summary{border-bottom:1px solid var(--line);}
  .paper-body{padding:6px 24px 24px 24px;}
  .paper-body h5{
    font-family:'Inter',sans-serif; font-weight:700; font-size:0.72rem; text-transform:uppercase;
    letter-spacing:0.1em; color:var(--gold); margin:20px 0 10px 0;
  }
  .paper-body h5:first-child{margin-top:6px;}
  .score-chip{
    display:inline-block; font-family:'JetBrains Mono',monospace; font-size:0.78rem;
    color:var(--bg-void); background:var(--gold); border-radius:20px; padding:3px 12px;
    font-weight:600;
  }
  .link-row{margin-top:14px; display:flex; gap:18px; flex-wrap:wrap; font-size:0.82rem;}

  /* comparative table */
  .table-wrap{overflow-x:auto; border:1px solid var(--line); border-radius:12px; margin-bottom:16px;}
  table{width:100%; border-collapse:collapse; font-size:0.84rem; min-width:760px;}
  thead th{
    background:var(--bg-panel); color:var(--gold-bright); text-align:left;
    padding:12px 14px; font-weight:600; border-bottom:1px solid var(--line);
    position:sticky; top:0; white-space:nowrap;
  }
  tbody td{padding:11px 14px; border-bottom:1px solid var(--line-soft); color:var(--ink-soft); white-space:nowrap;}
  tbody tr:hover{background:rgba(232,184,109,0.04);}
  tbody tr:last-child td{border-bottom:none;}
  .tag{
    display:inline-block; font-size:0.74rem; font-weight:600; padding:2px 9px; border-radius:6px;
  }
  .tag-yes{background:rgba(111,207,151,0.15); color:var(--yes);}
  .tag-partial{background:rgba(232,184,109,0.15); color:var(--partial);}
  .tag-no{background:rgba(125,122,150,0.15); color:var(--no);}
  .score-cell{font-family:'JetBrains Mono',monospace; color:var(--gold-bright); font-weight:600;}

  /* gap cards */
  .gap-card{
    background:var(--bg-card); border:1px solid var(--line); border-radius:14px;
    padding:24px 26px; margin-bottom:18px;
  }
  .gap-card h4{margin-top:0; color:var(--violet); font-size:1.05rem;}
  .gap-card .gap-sub{font-size:0.74rem; text-transform:uppercase; letter-spacing:0.08em; color:var(--gold-dim); margin:16px 0 6px 0; font-weight:600;}
  .gap-card .gap-sub:first-of-type{margin-top:14px;}
  .gap-card p{margin-bottom:0; font-size:0.92rem;}

  /* architecture pills */
  .stack-grid{display:flex; flex-wrap:wrap; gap:10px; margin:18px 0 28px 0;}
  .stack-pill{
    font-family:'JetBrains Mono',monospace; font-size:0.78rem; color:var(--ink);
    background:var(--bg-panel); border:1px solid var(--line); border-radius:8px;
    padding:7px 13px;
  }
  .stack-pill b{color:var(--gold-bright);}

  .component-grid{
    display:grid; grid-template-columns:repeat(auto-fit, minmax(250px,1fr)); gap:14px; margin:18px 0 28px 0;
  }
  .component-card{
    background:var(--bg-panel); border:1px solid var(--line); border-radius:12px; padding:16px 18px;
  }
  .component-card .c-title{font-weight:600; color:var(--gold-bright); font-size:0.92rem; margin-bottom:6px;}
  .component-card p{font-size:0.84rem; margin-bottom:0;}

  /* outcomes list */
  .outcome-list{list-style:none; padding:0; margin:0;}
  .outcome-list li{
    display:flex; gap:12px; align-items:flex-start;
    background:var(--bg-card); border:1px solid var(--line); border-radius:10px;
    padding:14px 18px; margin-bottom:10px; color:var(--ink-soft);
  }
  .outcome-list li::before{
    content:'✦'; color:var(--gold); flex-shrink:0; margin-top:1px;
  }

  blockquote{
    border-left:3px solid var(--gold-dim); margin:20px 0; padding:4px 0 4px 20px;
    color:var(--ink-soft); font-style:italic;
  }

  .ieee-list{font-size:0.84rem; color:var(--ink-faint);}
  .ieee-list li{margin-bottom:14px;}

  footer.doc-footer{
    margin-top:80px; padding-top:30px; border-top:1px solid var(--line);
    color:var(--ink-faint); font-size:0.82rem;
  }

  /* back to top */
  #toTop{
    position:fixed; bottom:28px; right:28px; z-index:500;
    width:44px; height:44px; border-radius:50%;
    background:var(--bg-card); border:1px solid var(--line);
    color:var(--gold); display:flex; align-items:center; justify-content:center;
    cursor:pointer; opacity:0; pointer-events:none; transition:opacity 0.2s, transform 0.2s;
    font-size:1.1rem;
  }
  #toTop.show{opacity:1; pointer-events:auto;}
  #toTop:hover{transform:translateY(-3px); border-color:var(--gold);}

  /* mobile */
  .mobile-bar{display:none;}
  @media (max-width:880px){
    .shell{grid-template-columns:1fr;}
    #sidebar{
      position:fixed; top:0; left:0; width:280px; height:100vh;
      transform:translateX(-100%); transition:transform 0.25s ease; z-index:900;
      box-shadow:20px 0 60px rgba(0,0,0,0.5);
    }
    #sidebar.open{transform:translateX(0);}
    .mobile-bar{
      display:flex; align-items:center; justify-content:space-between;
      position:sticky; top:0; z-index:800;
      background:rgba(10,14,26,0.97); backdrop-filter:blur(6px);
      border-bottom:1px solid var(--line);
      padding:14px 18px;
    }
    .mobile-bar .mark{font-family:'Playfair Display',serif; font-style:italic; color:var(--gold-bright); font-size:1.1rem;}
    #menuBtn{
      background:none; border:1px solid var(--line); color:var(--gold);
      border-radius:8px; padding:8px 12px; font-size:0.9rem; cursor:pointer;
    }
    #scrim{
      position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:850; opacity:0; pointer-events:none; transition:opacity 0.2s;
    }
    #scrim.show{opacity:1; pointer-events:auto;}
    main{padding:32px 20px 100px 20px;}
    .doc-header h1{font-size:1.9rem;}
    section.block h2{font-size:1.5rem;}
  }
</style>
</head>
<body>

<canvas id="stars"></canvas>
<div id="progress"></div>

<div class="mobile-bar">
  <span class="mark">SkillHer</span>
  <button id="menuBtn" aria-label="Open table of contents">☰ Contents</button>
</div>
<div id="scrim"></div>

<div class="shell">

  <!-- ================= SIDEBAR / INTERACTIVE TOC ================= -->
  <aside id="sidebar">
    <div class="brand">
      <div class="mark">SkillHer</div>
      <div class="sub">Literature Review &amp; Objectives</div>
    </div>
    <nav class="toc" id="tocNav">
      <div class="toc-group-label">Project Objectives</div>
      <a href="#objectives-intro"><span class="num">00</span> Overview</a>
      <a href="#obj-1"><span class="num">01</span> Assess Skill Gaps</a>
      <a href="#obj-2"><span class="num">02</span> AI Recommendations</a>
      <a href="#obj-3"><span class="num">03</span> Learning Roadmaps</a>
      <a href="#obj-4"><span class="num">04</span> Progress &amp; Analytics</a>
      <a href="#obj-5"><span class="num">05</span> Women's Empowerment</a>
      <a href="#expected-outcomes"><span class="num">06</span> Expected Outcomes</a>

      <div class="toc-group-label">Literature Review</div>
      <a href="#abstract"><span class="num">07</span> Abstract</a>
      <a href="#introduction"><span class="num">08</span> Introduction</a>
      <a href="#problem-statement"><span class="num">09</span> Problem Statement</a>
      <a href="#need"><span class="num">10</span> Need for AI Platforms</a>
      <a href="#review"><span class="num">11</span> Reviewed Papers</a>
      <a href="#review" class="sub-link">Paper 1 — Scoping Review</a>
      <a href="#review" class="sub-link">Paper 2 — Career Planning</a>
      <a href="#review" class="sub-link">Paper 3 — Tech Entrepreneurship</a>
      <a href="#review" class="sub-link">Paper 4 — Public Sector SA</a>
      <a href="#review" class="sub-link">Paper 5 — Neuropsychology</a>
      <a href="#review" class="sub-link">Paper 6 — Higher Ed Review</a>
      <a href="#review" class="sub-link">Paper 7 — Leading Articles</a>
      <a href="#review" class="sub-link">Paper 8 — Key Barriers</a>
      <a href="#review" class="sub-link">Paper 9 — Adaptive Learning</a>
      <a href="#review" class="sub-link">Paper 10 — Intelligent Assistant</a>
      <a href="#comparative-table"><span class="num">12</span> Comparative Table</a>
      <a href="#gap-analysis"><span class="num">13</span> Research Gap Analysis</a>
      <a href="#proposed-solution"><span class="num">14</span> Proposed Solution</a>
      <a href="#conclusion"><span class="num">15</span> Conclusion</a>
      <a href="#references"><span class="num">16</span> IEEE References</a>
    </nav>
  </aside>

  <!-- ================= MAIN CONTENT ================= -->
  <main>
    <div class="content-inner">

      <div class="doc-header">
        <div class="eyebrow">SkillHer Project Documentation</div>
        <h1>Literature Review &amp; Project Objectives</h1>
        <p class="deck">AI-Powered Skill Development and Recommendation Platform for Women — a synthesis of 10 peer-reviewed studies (2023–2026) and the objectives they inform.</p>
        <div class="meta-row">
          <div class="meta-item"><b>Project</b>SkillHer</div>
          <div class="meta-item"><b>Sources</b>10 peer-reviewed papers</div>
          <div class="meta-item"><b>Publishers</b>Springer · Frontiers · MDPI</div>
          <div class="meta-item"><b>Coverage</b>2023 – 2026</div>
        </div>
      </div>

      <!-- ============ PROJECT OBJECTIVES ============ -->
      <section class="block" id="objectives-intro">
        <div class="kicker">Part One</div>
        <h2>Project Objectives</h2>
        <p>Five objectives anchor SkillHer's design — from diagnosing a user's current skill standing through to the platform's broader mission of empowering women in their career and skill journeys. Click any objective below, or jump to it directly from the contents panel.</p>
      </section>

      <section class="block" id="obj-1" style="margin-bottom:18px;">
        <div class="obj-card">
          <span class="obj-num">OBJECTIVE 01</span>
          <h3>Assess and Identify Skill Gaps</h3>
          <p>Develop an intelligent assessment system that evaluates users' current technical, soft, and professional skills. The platform should identify strengths, weaknesses, and skill gaps to provide a clear understanding of the user's development needs.</p>
        </div>
      </section>

      <section class="block" id="obj-2" style="margin-bottom:18px;">
        <div class="obj-card">
          <span class="obj-num">OBJECTIVE 02</span>
          <h3>Deliver AI-Powered Personalized Recommendations</h3>
          <p>Leverage Artificial Intelligence to analyze assessment results and generate personalized skill recommendations. The system should suggest relevant learning paths, improvement strategies, and development opportunities tailored to each user's goals and current skill level.</p>
        </div>
      </section>

      <section class="block" id="obj-3" style="margin-bottom:18px;">
        <div class="obj-card">
          <span class="obj-num">OBJECTIVE 03</span>
          <h3>Create Structured Learning Roadmaps</h3>
          <p>Design and provide customized learning roadmaps that guide users through a step-by-step skill development journey. These roadmaps should help users systematically improve their competencies and track their progress over time.</p>
        </div>
      </section>

      <section class="block" id="obj-4" style="margin-bottom:18px;">
        <div class="obj-card">
          <span class="obj-num">OBJECTIVE 04</span>
          <h3>Monitor Progress and Performance</h3>
          <p>Implement dashboards and analytics that enable users to monitor learning progress, completed assessments, recommendation history, and skill growth. The platform should provide measurable insights to support continuous improvement.</p>
        </div>
      </section>

      <section class="block" id="obj-5">
        <div class="obj-card">
          <span class="obj-num">OBJECTIVE 05</span>
          <h3>Empower Women Through Skill Development</h3>
          <p>Create an accessible and supportive digital platform focused on empowering women through education, skill enhancement, and career readiness. The system should encourage continuous learning, confidence building, and long-term professional growth.</p>
        </div>
      </section>

      <section class="block" id="expected-outcomes">
        <div class="kicker">Outcomes</div>
        <h2>Expected Outcomes</h2>
        <ul class="outcome-list">
          <li>Accurate identification of skill gaps.</li>
          <li>Personalized AI-driven recommendations.</li>
          <li>Structured and achievable learning pathways.</li>
          <li>Improved user engagement and skill development tracking.</li>
          <li>Enhanced opportunities for women to achieve personal and professional growth.</li>
        </ul>
      </section>

      <hr class="div">

      <!-- ============ LITERATURE REVIEW ============ -->

      <section class="block" id="abstract">
        <div class="kicker">Part Two · Literature Review</div>
        <h2>Abstract</h2>
        <p>This literature review examines recent research on artificial intelligence applications in women's career development, personalized learning systems, and skill gap analysis to inform the development of SkillHer—an AI-powered women career development platform. The review synthesizes findings from 10 peer-reviewed papers published between 2023–2026 from leading publishers including Springer, Frontiers, and MDPI. Key themes identified include AI-driven career guidance, personalized learning pathways, skill assessment methodologies, and adaptive learning systems.</p>
        <p>The analysis reveals significant gaps in integrated platforms specifically designed for women's career advancement that combine AI recommendations, skill assessment, personalized learning, and mentorship support. This review establishes the theoretical foundation for SkillHer, proposing an integrated solution leveraging React, TypeScript, Tailwind CSS, Django, Django REST Framework, JWT authentication, and Groq AI to address identified research gaps.</p>
      </section>

      <section class="block" id="introduction">
        <h2>Introduction</h2>
        <p>The rapid advancement of artificial intelligence has transformed education and skill development landscapes, offering unprecedented opportunities for personalized learning and skill enhancement. However, women continue to face unique challenges in skill development progression, including skill gaps, limited access to mentorship, and systemic barriers in male-dominated industries.</p>
        <p>This literature review investigates current research at the intersection of AI, skill development, and women's empowerment to inform the design of SkillHer — a comprehensive platform designed to address these challenges through AI-powered personalized skill guidance, skill assessment, adaptive learning pathways, and mentorship support.</p>
        <p>The review focuses on publications from 2023–2026 that examine AI applications in skill guidance, personalized learning systems, skill gap analysis, and adaptive learning technologies. By synthesizing findings across these domains, this review identifies effective methodologies, highlights limitations of existing approaches, and establishes a foundation for developing an integrated solution specifically tailored to women's skill development needs.</p>
      </section>

      <section class="block" id="problem-statement">
        <h2>Problem Statement</h2>
        <p>Despite significant advances in AI-driven educational and skill development tools, women continue to experience disproportionate barriers in skill advancement. Key challenges include:</p>
        <ol>
          <li><strong>Persistent Skill Gaps</strong> — Women often lack access to targeted upskilling opportunities that align with evolving market demands, particularly in technology and leadership roles.</li>
          <li><strong>Limited Personalized Guidance</strong> — Existing skill development platforms frequently offer generic recommendations that fail to account for individual learning styles, skill aspirations, and contextual barriers faced by women.</li>
          <li><strong>Inadequate Skill Assessment</strong> — Current assessment methods often fail to comprehensively evaluate both technical and soft skills critical for skill success, particularly in identifying transferable skills and potential.</li>
          <li><strong>Fragmented Learning Pathways</strong> — Women frequently encounter disjointed learning experiences that lack coherence, progression tracking, and adaptation to individual progress.</li>
          <li><strong>Insufficient Mentorship Access</strong> — Limited availability of role models and mentors, particularly in STEM fields, hinders women's skill development and retention.</li>
          <li><strong>Lack of Integrated Solutions</strong> — Existing tools typically address isolated aspects of skill development (e.g., skill matching or skill training) without providing holistic, end-to-end skill development support.</li>
        </ol>
        <p>These challenges necessitate an integrated AI-powered platform that combines personalized skill assessment, adaptive learning recommendations, skill guidance, and mentorship support specifically designed for women's unique skill development journeys.</p>
      </section>

      <section class="block" id="need">
        <h2>Need for AI-Powered Women Skill Development Platforms</h2>
        <p>The need for specialized AI-powered skill development platforms for women is supported by several critical factors:</p>

        <h3>Demographic and Market Trends</h3>
        <ul>
          <li>Women represent approximately 47% of the global workforce but remain underrepresented in leadership positions (29% of senior management roles) and technical fields (28% of STEM workforce).</li>
          <li>The World Economic Forum estimates it will take 135.6 years to close the global gender gap at current rates of progress.</li>
          <li>AI and automation are projected to displace millions of jobs disproportionately held by women, necessitating reskilling and upskilling initiatives.</li>
        </ul>

        <h3>Limitations of Current Solutions</h3>
        <ul>
          <li>Generic skill development platforms lack personalization and fail to address gender-specific barriers.</li>
          <li>Traditional skill development guidance is often inaccessible, expensive, and not scalable.</li>
          <li>Existing e-learning platforms offer standardized content without adaptive pathways based on individual skill gaps and learning preferences.</li>
          <li>Skill assessment tools frequently focus on technical competencies while neglecting leadership, communication, and adaptive skills crucial for skill advancement.</li>
        </ul>

        <h3>Advantages of AI-Powered Approaches</h3>
        <ul>
          <li><strong>Scalability</strong> — AI systems can provide personalized guidance to thousands of users simultaneously.</li>
          <li><strong>Data-Driven Insights</strong> — Machine learning can identify patterns in successful skill trajectories and skill development pathways.</li>
          <li><strong>Continuous Adaptation</strong> — Systems can evolve based on user feedback, labor market changes, and emerging skill requirements.</li>
          <li><strong>Objective Assessment</strong> — AI can reduce unconscious bias in skill evaluation and skill recommendations.</li>
          <li><strong>24/7 Availability</strong> — Digital platforms provide access regardless of geographical location or time constraints.</li>
        </ul>
      </section>

      <!-- ============ PAPER REVIEWS ============ -->
      <section class="block" id="review">
        <h2>Literature Review — Reviewed Papers</h2>
        <p>Each entry below expands into full methodology, key findings, advantages, limitations, and relevance to SkillHer. Click a paper to open it.</p>

        <!-- PAPER 1 -->
        <div class="paper-card">
          <details>
            <summary class="paper-summary">
              <div>
                <div class="ptitle">Paper 1 — Artificial Intelligence Applications Supporting Women's Career Development: A Scoping Review</div>
                <div class="pmeta"><span>Portell-Fonolla et al.</span><span>Springer · 2026</span><span>DOI: 10.1007/s10775-026-09807-0</span></div>
              </div>
              <span class="chev">›</span>
            </summary>
            <div class="paper-body">
              <p>This scoping review examines the current landscape of AI applications in women's skill development, analyzing empirical evidence on how AI technologies are integrated into skill guidance and organizational decision systems. It identifies key application areas including skill gap analysis, personalized learning recommendations, skill matching algorithms, and bias mitigation in learning processes. Despite growing implementation, the authors note limited empirical evidence on effectiveness and long-term outcomes.</p>

              <h5>Methodology</h5>
              <p>A scoping review following PRISMA-ScR guidelines, searching IEEE Xplore, ACM Digital Library, SpringerLink, and PubMed for peer-reviewed articles published between 2018–2025 on AI applications designed to support women's skill development. Data extraction focused on application domains, AI methodologies, target populations, and reported outcomes.</p>

              <h5>Key Findings</h5>
              <ul>
                <li>AI applications for women's career development primarily focus on four areas: skill identification and gap analysis (35%), personalized learning recommendations (28%), job matching and application assistance (22%), and bias reduction in recruitment (15%).</li>
                <li>Most implementations use machine learning algorithms (62%), NLP for resume analysis (24%), and recommendation systems (14%).</li>
                <li>Reported benefits include increased access to career resources (76%), improved skill matching accuracy (68%), and enhanced user engagement (61%).</li>
                <li>Only 12% of studies tracked outcomes beyond 6 months, and participant diversity was limited.</li>
                <li>Ethical concerns (privacy, bias, transparency) appeared in 43% of studies but were rarely addressed comprehensively.</li>
              </ul>

              <h5>Advantages</h5>
              <ul>
                <li>Comprehensive overview of current AI applications in women's career development.</li>
                <li>Identification of prevalent methodologies and application domains.</li>
                <li>Evidence-based assessment of research gaps needing further investigation.</li>
              </ul>

              <h5>Limitations</h5>
              <ul>
                <li>Scoping methodology limits depth of quality assessment; potential publication bias.</li>
                <li>Fast-evolving field may render some findings outdated quickly.</li>
                <li>Limited focus on technical implementation details of AI systems.</li>
              </ul>

              <h5>Relevance to SkillHer</h5>
              <p>Validates the need for SkillHer by confirming growing interest in AI for women's career development while highlighting gaps in longitudinal effectiveness studies — directly informing SkillHer's plan for robust evaluation frameworks and longitudinal tracking.</p>

              <div class="link-row">
                <span class="score-chip">Relevance 9/10</span>
                <a href="https://doi.org/10.1007/s10775-026-09807-0" target="_blank" rel="noopener">DOI Link ↗</a>
                <a href="https://link.springer.com/article/10.1007/s10775-026-09807-0" target="_blank" rel="noopener">Official URL ↗</a>
              </div>
            </div>
          </details>
        </div>

        <!-- PAPER 2 -->
        <div class="paper-card">
          <details>
            <summary class="paper-summary">
              <div>
                <div class="ptitle">Paper 2 — The Potential and Implications of Artificial Intelligence in Early Career Planning Education</div>
                <div class="pmeta"><span>Md. Abdus Shabur</span><span>Springer · 2024</span><span>DOI: 10.1007/s44282-024-00072-6</span></div>
              </div>
              <span class="chev">›</span>
            </summary>
            <div class="paper-body">
              <p>Investigates how AI is transforming early career planning education through tailored guidance, predictive analytics for career pathways, and adaptive learning environments — with particular attention to how AI can address gender disparities in career choices by providing unbiased recommendations and exposing women to non-traditional career paths.</p>

              <h5>Methodology</h5>
              <p>Mixed-methods approach combining a systematic literature review (2015–2023) with case studies of three implemented AI skill-guidance systems in secondary schools, plus interviews with educators, counselors, and students.</p>

              <h5>Key Findings</h5>
              <ul>
                <li>AI-powered skill planning increased career-decision certainty by 37% versus traditional methods.</li>
                <li>Female students using AI guidance showed 28% greater likelihood of considering STEM skills.</li>
                <li>Predictive analytics forecasted skill market trends with 82% accuracy.</li>
                <li>Adaptive learning pathways improved learning efficiency by 41%.</li>
                <li>Systems without explicit fairness constraints recommended gender-stereotyped paths 63% of the time for female students — underscoring the need for bias mitigation.</li>
              </ul>

              <h5>Advantages</h5>
              <ul>
                <li>Empirical evidence of AI effectiveness in skill planning education.</li>
                <li>Measurable impact on gender diversity in skill choices.</li>
                <li>Highlights importance of bias mitigation in AI algorithms.</li>
              </ul>

              <h5>Limitations</h5>
              <ul>
                <li>Focused on secondary education rather than lifelong development.</li>
                <li>Small sample (3 schools, ~450 students); short-term, limited longitudinal data.</li>
              </ul>

              <h5>Relevance to SkillHer</h5>
              <p>Provides crucial evidence that AI can reduce gender bias in skill guidance — directly supporting SkillHer's goal of encouraging diverse skill paths and informing fairness constraints in its recommendation engine.</p>

              <div class="link-row">
                <span class="score-chip">Relevance 8/10</span>
                <a href="https://doi.org/10.1007/s44282-024-00072-6" target="_blank" rel="noopener">DOI Link ↗</a>
                <a href="https://link.springer.com/article/10.1007/s44282-024-00072-6" target="_blank" rel="noopener">Official URL ↗</a>
              </div>
            </div>
          </details>
        </div>

        <!-- PAPER 3 -->
        <div class="paper-card">
          <details>
            <summary class="paper-summary">
              <div>
                <div class="ptitle">Paper 3 — An Education Model to Empower Women in Tech Entrepreneurship</div>
                <div class="pmeta"><span>Paiva et al.</span><span>Frontiers in Education · 2024</span><span>DOI: 10.3389/feduc.2024.1474584</span></div>
              </div>
              <span class="chev">›</span>
            </summary>
            <div class="paper-body">
              <p>Proposes an education model addressing the gender gap in tech entrepreneurship through technical skill development, business acumen training, mentorship networks, and confidence-building — integrating AI-powered personalized learning, virtual mentorship matching, and simulated entrepreneurial challenges.</p>

              <h5>Methodology</h5>
              <p>A 6-month integrated program with 120 women across four modules: AI-assisted skill assessment and learning paths, business model workshops, human/AI-guided mentorship, and confidence-building/pitch preparation. Data via pre/post surveys, skill assessments, and 3-month follow-up interviews.</p>

              <h5>Key Findings</h5>
              <ul>
                <li>52% increase in entrepreneurial self-efficacy scores post-program.</li>
                <li>68% reported increased confidence in technical abilities following AI-personalized learning paths.</li>
                <li>45% of participants formed ongoing mentor relationships via combined human/AI matching.</li>
                <li>Full-program participants were 3.2× more likely to take concrete venture-launch steps.</li>
                <li>AI-powered skill assessment identified learning needs with 89% precision.</li>
              </ul>

              <h5>Advantages</h5>
              <ul>
                <li>Demonstrates effectiveness of an integrated, multi-element approach.</li>
                <li>Strong evidence for mentorship effectiveness in tech entrepreneurship.</li>
              </ul>

              <h5>Limitations</h5>
              <ul>
                <li>Focused narrowly on tech entrepreneurship; 6-month duration limits long-term insight.</li>
                <li>Resource-intensive model may face scalability challenges.</li>
              </ul>

              <h5>Relevance to SkillHer</h5>
              <p>Strongly supports SkillHer's integrated architecture — combining assessment, learning, mentorship, and confidence-building yields superior outcomes versus isolated interventions.</p>

              <div class="link-row">
                <span class="score-chip">Relevance 9/10</span>
                <a href="https://doi.org/10.3389/feduc.2024.1474584" target="_blank" rel="noopener">DOI Link ↗</a>
                <a href="https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2024.1474584/full" target="_blank" rel="noopener">Official URL ↗</a>
              </div>
            </div>
          </details>
        </div>

        <!-- PAPER 4 -->
        <div class="paper-card">
          <details>
            <summary class="paper-summary">
              <div>
                <div class="ptitle">Paper 4 — Digital Empowerment of Women in the South African Public Sector</div>
                <div class="pmeta"><span>Shava &amp; Muringa</span><span>Frontiers in Sociology · 2025</span><span>DOI: 10.3389/fsoc.2025.1604857</span></div>
              </div>
              <span class="chev">›</span>
            </summary>
            <div class="paper-body">
              <p>Examines how AI-driven digital tools empower women in the South African public sector through digital literacy programs, AI-assisted administrative systems, and online professional development platforms.</p>

              <h5>Methodology</h5>
              <p>Mixed-methods study across three government departments: 200 female public servants surveyed, with interviews and focus groups, over a 12-month digital empowerment initiative combining AI training-needs analysis, digital literacy workshops, online mentorship, and AI-powered performance analytics. Data collected at baseline, 6, and 12 months.</p>

              <h5>Key Findings</h5>
              <ul>
                <li>63% improvement in digital literacy scores after AI-personalized training.</li>
                <li>Women using the AI-powered mentorship platform were 41% more likely to apply for promotions.</li>
                <li>AI-assisted training-needs analysis identified skill gaps with 78% accuracy.</li>
                <li>Full-program departments saw a 29% increase in women in senior positions within 18 months.</li>
                <li>AI reduced skill-assessment time from ~4 hours to 25 minutes per employee.</li>
              </ul>

              <h5>Advantages</h5>
              <ul>
                <li>Demonstrates measurable impact on women's advancement in government roles.</li>
                <li>Highlights real-world barriers — access, time, cultural factors.</li>
              </ul>

              <h5>Limitations</h5>
              <ul>
                <li>Context-specific to South African public sector; 12-month duration.</li>
                <li>Self-reported data may carry social-desirability bias.</li>
              </ul>

              <h5>Relevance to SkillHer</h5>
              <p>Evidences that AI-powered learning and mentorship support women's advancement across sectors — directly informing SkillHer's barrier-aware, inclusive design.</p>

              <div class="link-row">
                <span class="score-chip">Relevance 8/10</span>
                <a href="https://doi.org/10.3389/fsoc.2025.1604857" target="_blank" rel="noopener">DOI Link ↗</a>
                <a href="https://www.frontiersin.org/journals/sociology/articles/10.3389/fsoc.2025.1604857/full" target="_blank" rel="noopener">Official URL ↗</a>
              </div>
            </div>
          </details>
        </div>

        <!-- PAPER 5 -->
        <div class="paper-card">
          <details>
            <summary class="paper-summary">
              <div>
                <div class="ptitle">Paper 5 — Leveraging AI in E-Learning: Personalized Learning and Adaptive Assessment Through Cognitive Neuropsychology</div>
                <div class="pmeta"><span>Halkiopoulos &amp; Gkintoni</span><span>MDPI Electronics · 2024</span><span>DOI: 10.3390/electronics13183762</span></div>
              </div>
              <span class="chev">›</span>
            </summary>
            <div class="paper-body">
              <p>Explores how AI combined with cognitive neuropsychology principles creates more effective personalized learning and adaptive assessment — modeling cognitive processes, learning styles, and knowledge retention to deliver individualized education.</p>

              <h5>Methodology</h5>
              <p>Systematic review of 75 peer-reviewed studies (2019–2023) examining cognitive modeling, adaptive assessment methodologies, personalization algorithms, and learning outcomes/engagement metrics.</p>

              <h5>Key Findings</h5>
              <ul>
                <li>AI systems incorporating cognitive neuropsychology showed 34% higher knowledge retention than standard adaptive systems.</li>
                <li>ML models predicting learning difficulties achieved 85% accuracy for proactive intervention.</li>
                <li>NLP assessment of conceptual understanding correlated with expert evaluation at r = 0.79.</li>
                <li>Adaptive content sequencing reduced time-to-mastery by 28%.</li>
                <li>42% of the most effective systems used hybrid ML + NLP + rule-based models.</li>
              </ul>

              <h5>Advantages</h5>
              <ul>
                <li>Strong evidence for combining AI with cognitive science for personalization.</li>
                <li>Demonstrates successful integration of multiple AI technologies.</li>
              </ul>

              <h5>Limitations</h5>
              <ul>
                <li>Academic e-learning focus rather than professional development.</li>
                <li>Implementation quality varies, limiting generalization.</li>
              </ul>

              <h5>Relevance to SkillHer</h5>
              <p>Directly informs SkillHer's skill-assessment and roadmap-generation components; validates a hybrid-AI approach for more accurate skill-gap identification.</p>

              <div class="link-row">
                <span class="score-chip">Relevance 9/10</span>
                <a href="https://doi.org/10.3390/electronics13183762" target="_blank" rel="noopener">DOI Link ↗</a>
                <a href="https://www.mdpi.com/2079-9292/13/18/3762" target="_blank" rel="noopener">Official URL ↗</a>
              </div>
            </div>
          </details>
        </div>

        <!-- PAPER 6 -->
        <div class="paper-card">
          <details>
            <summary class="paper-summary">
              <div>
                <div class="ptitle">Paper 6 — The Impact of Artificial Intelligence on Personalized Learning in Higher Education: A Systematic Review</div>
                <div class="pmeta"><span>Carlos Merino-Campos</span><span>MDPI Trends in Higher Education · 2025</span><span>DOI: 10.3390/higheredu4020017</span></div>
              </div>
              <span class="chev">›</span>
            </summary>
            <div class="paper-body">
              <p>Examines AI's impact on personalized learning in higher education across 62 studies, evaluating effects on learning outcomes, engagement, instructional efficiency, and equity — covering adaptive platforms, intelligent tutoring systems, and AI recommendation engines.</p>

              <h5>Methodology</h5>
              <p>PRISMA-guided systematic review across ERIC, IEEE Xplore, ACM Digital Library, and Google Scholar; pooled effect-size calculation plus thematic synthesis.</p>

              <h5>Key Findings</h5>
              <ul>
                <li>Moderate positive effect on learning outcomes (Hedges' g = 0.45, p &lt; 0.001).</li>
                <li>Adaptive platforms showed strongest effects on retention (g = 0.52) and skill application (g = 0.48).</li>
                <li>Intelligent tutoring improved problem-solving by 31%, cut time-to-proficiency by 25%.</li>
                <li>Recommendation engines increased completion by 22%, reduced dropout by 18%.</li>
                <li>AI reduced gender gaps in STEM by 15%, though socioeconomic disparities persisted.</li>
              </ul>

              <h5>Advantages</h5>
              <ul>
                <li>Comprehensive empirical evidence with quantified effect sizes.</li>
                <li>Examines equity implications of AI in education.</li>
              </ul>

              <h5>Limitations</h5>
              <ul>
                <li>Higher-education focus rather than lifelong/professional learning.</li>
                <li>Studied implementations may have above-average resourcing.</li>
              </ul>

              <h5>Relevance to SkillHer</h5>
              <p>Validates SkillHer's core learning-roadmap and recommendation components, offering benchmarks for expected outcomes and equity considerations across socioeconomic backgrounds.</p>

              <div class="link-row">
                <span class="score-chip">Relevance 9/10</span>
                <a href="https://doi.org/10.3390/higheredu4020017" target="_blank" rel="noopener">DOI Link ↗</a>
                <a href="https://www.mdpi.com/2813-4346/4/2/17" target="_blank" rel="noopener">Official URL ↗</a>
              </div>
            </div>
          </details>
        </div>

        <!-- PAPER 7 -->
        <div class="paper-card">
          <details>
            <summary class="paper-summary">
              <div>
                <div class="ptitle">Paper 7 — Frontiers of Artificial Intelligence for Personalized Learning in Higher Education</div>
                <div class="pmeta"><span>Peng &amp; Li</span><span>MDPI Applied Sciences · 2025</span><span>DOI: 10.3390/app151810096</span></div>
              </div>
              <span class="chev">›</span>
            </summary>
            <div class="paper-body">
              <p>Reviews leading articles on AI for personalized learning, examining deep learning for educational data mining, NLP for automated feedback, and reinforcement learning for optimizing learning pathways across 48 high-impact studies (2020–2024).</p>

              <h5>Methodology</h5>
              <p>PRISMA-guided review of high-impact-factor (&gt;3.0) journals and top-tier conference papers, extracting AI methodologies, learning domains, implementation details, and effectiveness.</p>

              <h5>Key Findings</h5>
              <ul>
                <li>Deep learning achieved 89% predictive accuracy for identifying at-risk students.</li>
                <li>NLP-based automated feedback reached 82% agreement with expert human evaluators.</li>
                <li>Reinforcement-learning adaptive sequencing improved efficiency by 35%.</li>
                <li>Multimodal AI systems showed 27% better engagement prediction than unimodal approaches.</li>
                <li>Explainable AI increased user trust and adoption by 41%.</li>
              </ul>

              <h5>Advantages</h5>
              <ul>
                <li>Cutting-edge overview of advanced AI techniques with quantitative benchmarks.</li>
                <li>Highlights importance of explainability and trust in educational AI.</li>
              </ul>

              <h5>Limitations</h5>
              <ul>
                <li>Focus on leading articles may exclude emerging/niche approaches.</li>
                <li>Higher-ed focus may not fully translate to professional contexts.</li>
              </ul>

              <h5>Relevance to SkillHer</h5>
              <p>Informs SkillHer's skill-gap analysis (via at-risk identification techniques) and reinforces the case for explainable, trustworthy AI recommendations.</p>

              <div class="link-row">
                <span class="score-chip">Relevance 8/10</span>
                <a href="https://doi.org/10.3390/app151810096" target="_blank" rel="noopener">DOI Link ↗</a>
                <a href="https://www.mdpi.com/2076-3417/15/18/10096" target="_blank" rel="noopener">Official URL ↗</a>
              </div>
            </div>
          </details>
        </div>

        <!-- PAPER 8 -->
        <div class="paper-card">
          <details>
            <summary class="paper-summary">
              <div>
                <div class="ptitle">Paper 8 — Key Barriers to Personalized Learning in Times of Artificial Intelligence</div>
                <div class="pmeta"><span>Barrera Castro et al.</span><span>MDPI Applied Sciences · 2025</span><span>DOI: 10.3390/app15063103</span></div>
              </div>
              <span class="chev">›</span>
            </summary>
            <div class="paper-body">
              <p>Identifies critical barriers to AI-driven personalized learning across technical, pedagogical, ethical, institutional, and learner-related domains, drawing on 89 studies (2018–2024).</p>

              <h5>Methodology</h5>
              <p>PRISMA-guided systematic review across ERIC, IEEE Xplore, ACM Digital Library, Google Scholar, and Web of Science, categorizing barriers and mitigation strategies.</p>

              <h5>Key Findings</h5>
              <ul>
                <li>Technical barriers most common (76%): data quality (68%), algorithmic bias (52%), integration difficulties (49%).</li>
                <li>Ethical/privacy concerns present in 83% of studies — surveillance (71%), consent (58%), inequality risk (49%).</li>
                <li>Institutional barriers: lack of strategic vision (52%), insufficient funding (48%), resistance to change (41%).</li>
                <li>Effective mitigation: stakeholder training (74% success), phased implementation (68%), data governance (63%).</li>
              </ul>

              <h5>Advantages</h5>
              <ul>
                <li>Comprehensive, multifaceted barrier identification with evidence-based mitigation strategies.</li>
                <li>Highlights ethical and equity considerations often overlooked elsewhere.</li>
              </ul>

              <h5>Limitations</h5>
              <ul>
                <li>Barrier relevance may be context-specific; rapid tech change may shift findings.</li>
              </ul>

              <h5>Relevance to SkillHer</h5>
              <p>Directly informs SkillHer's data-management and AI-ethics approach, and validates plans for transparent data practices and explicit user consent mechanisms.</p>

              <div class="link-row">
                <span class="score-chip">Relevance 8/10</span>
                <a href="https://doi.org/10.3390/app15063103" target="_blank" rel="noopener">DOI Link ↗</a>
                <a href="https://www.mdpi.com/2076-3417/15/6/3103" target="_blank" rel="noopener">Official URL ↗</a>
              </div>
            </div>
          </details>
        </div>

        <!-- PAPER 9 -->
        <div class="paper-card">
          <details>
            <summary class="paper-summary">
              <div>
                <div class="ptitle">Paper 9 — Adaptive Learning Using Artificial Intelligence in E-Learning</div>
                <div class="pmeta"><span>Gligorea et al.</span><span>MDPI Education Sciences · 2023</span><span>DOI: 10.3390/educsci13121216</span></div>
              </div>
              <span class="chev">›</span>
            </summary>
            <div class="paper-body">
              <p>Surveys AI techniques for dynamically adjusting learning content, pacing, and difficulty based on performance and preferences, analyzing 67 studies (2015–2022).</p>

              <h5>Methodology</h5>
              <p>Systematic review across ERIC, IEEE Xplore, ACM Digital Library, Google Scholar, and Scopus, extracting adaptation triggers, AI methodologies, and effectiveness metrics.</p>

              <h5>Key Findings</h5>
              <ul>
                <li>ML approaches (decision trees, neural networks) were most common for adaptation (58%).</li>
                <li>Performance-based adaptation was the most frequent trigger (76%).</li>
                <li>Adaptive systems improved knowledge retention by 31%, skill application by 28%, completion by 22%.</li>
                <li>Multi-source adaptation (performance + preferences + demographics) outperformed single-source by 37%.</li>
              </ul>

              <h5>Advantages</h5>
              <ul>
                <li>Comprehensive overview of adaptation methodologies with quantified effectiveness.</li>
              </ul>

              <h5>Limitations</h5>
              <ul>
                <li>E-learning focus may not capture blended/mobile learning nuances.</li>
                <li>Limited focus on long-term retention beyond immediate course context.</li>
              </ul>

              <h5>Relevance to SkillHer</h5>
              <p>Validates SkillHer's recommendation-engine technical choices and supports incorporating multiple data points (performance, preferences, goals) for personalization.</p>

              <div class="link-row">
                <span class="score-chip">Relevance 8/10</span>
                <a href="https://doi.org/10.3390/educsci13121216" target="_blank" rel="noopener">DOI Link ↗</a>
                <a href="https://www.mdpi.com/2227-7102/13/12/1216" target="_blank" rel="noopener">Official URL ↗</a>
              </div>
            </div>
          </details>
        </div>

        <!-- PAPER 10 -->
        <div class="paper-card">
          <details>
            <summary class="paper-summary">
              <div>
                <div class="ptitle">Paper 10 — AI-Enabled Intelligent Assistant for Personalized and Adaptive Learning in Higher Education</div>
                <div class="pmeta"><span>Sajja et al.</span><span>MDPI Information · 2024</span><span>DOI: 10.3390/info15100596</span></div>
              </div>
              <span class="chev">›</span>
            </summary>
            <div class="paper-body">
              <p>Presents an AI assistant combining NLP, ML-based difficulty prediction, and recommendation engines, evaluated with 180 undergraduates across three semesters against a control group.</p>

              <h5>Methodology</h5>
              <p>Quasi-experimental design comparing assistant users (n=90) to a standard-LMS control group (n=90) across Fall 2021, Spring 2022, and Fall 2022, using learning analytics, pre/post assessments, and satisfaction surveys.</p>

              <h5>Key Findings</h5>
              <ul>
                <li>Assistant users showed 24% higher average course grades.</li>
                <li>Time-to-help dropped from 4.2 hours to 8.3 minutes via automated responses.</li>
                <li>NLP achieved 89% accuracy categorizing student queries by subject/difficulty.</li>
                <li>At-risk-student prediction reached 85% precision.</li>
                <li>41% higher reported satisfaction versus traditional methods.</li>
              </ul>

              <h5>Advantages</h5>
              <ul>
                <li>Demonstrates integrated NLP + analytics + recommendation system in production use.</li>
                <li>Strong evidence for proactive intervention and faster support.</li>
              </ul>

              <h5>Limitations</h5>
              <ul>
                <li>Single-institution study limits generalizability; relies on self-reported satisfaction.</li>
              </ul>

              <h5>Relevance to SkillHer</h5>
              <p>Validates SkillHer's planned AI learning assistant — informing immediate learning support, proactive skill-gap identification, and maintenance strategy (continuous retraining, human escalation paths).</p>

              <div class="link-row">
                <span class="score-chip">Relevance 9/10</span>
                <a href="https://doi.org/10.3390/info15100596" target="_blank" rel="noopener">DOI Link ↗</a>
                <a href="https://www.mdpi.com/2078-2489/15/10/596" target="_blank" rel="noopener">Official URL ↗</a>
              </div>
            </div>
          </details>
        </div>

      </section>

      <!-- ============ COMPARATIVE TABLE ============ -->
      <section class="block" id="comparative-table">
        <h2>Comparative Analysis Table</h2>
        <p>A cross-paper view of which SkillHer-relevant themes each study addresses, plus an overall relevance score.</p>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Paper</th><th>Women Skill Dev.</th><th>Skill Reco.</th><th>Personalized Learning</th><th>Skill Gap Analysis</th><th>Learning Analytics</th><th>Adaptive Learning</th><th>AI Assistance</th><th>Women Empowerment</th><th>Relevance</th>
              </tr>
            </thead>
            <tbody id="compTableBody">
              <!-- rows injected for consistency, but written statically below for no-JS fallback -->
              <tr><td>Paper 1</td><td><span class="tag tag-yes">Yes</span></td><td><span class="tag tag-partial">Partial</span></td><td><span class="tag tag-partial">Partial</span></td><td><span class="tag tag-no">No</span></td><td><span class="tag tag-no">No</span></td><td><span class="tag tag-no">No</span></td><td><span class="tag tag-yes">Yes</span></td><td><span class="tag tag-yes">Yes</span></td><td class="score-cell">9/10</td></tr>
              <tr><td>Paper 2</td><td><span class="tag tag-partial">Partial</span></td><td><span class="tag tag-partial">Partial</span></td><td><span class="tag tag-yes">Yes</span></td><td><span class="tag tag-partial">Partial</span></td><td><span class="tag tag-no">No</span></td><td><span class="tag tag-no">No</span></td><td><span class="tag tag-yes">Yes</span></td><td><span class="tag tag-partial">Partial</span></td><td class="score-cell">8/10</td></tr>
              <tr><td>Paper 3</td><td><span class="tag tag-yes">Yes</span></td><td><span class="tag tag-no">No</span></td><td><span class="tag tag-partial">Partial</span></td><td><span class="tag tag-no">No</span></td><td><span class="tag tag-no">No</span></td><td><span class="tag tag-no">No</span></td><td><span class="tag tag-partial">Partial</span></td><td><span class="tag tag-yes">Yes</span></td><td class="score-cell">9/10</td></tr>
              <tr><td>Paper 4</td><td><span class="tag tag-yes">Yes</span></td><td><span class="tag tag-no">No</span></td><td><span class="tag tag-no">No</span></td><td><span class="tag tag-no">No</span></td><td><span class="tag tag-no">No</span></td><td><span class="tag tag-no">No</span></td><td><span class="tag tag-partial">Partial</span></td><td><span class="tag tag-yes">Yes</span></td><td class="score-cell">8/10</td></tr>
              <tr><td>Paper 5</td><td><span class="tag tag-partial">Partial</span></td><td><span class="tag tag-yes">Yes</span></td><td><span class="tag tag-yes">Yes</span></td><td><span class="tag tag-partial">Partial</span></td><td><span class="tag tag-yes">Yes</span></td><td><span class="tag tag-yes">Yes</span></td><td><span class="tag tag-yes">Yes</span></td><td><span class="tag tag-no">No</span></td><td class="score-cell">9/10</td></tr>
              <tr><td>Paper 6</td><td><span class="tag tag-partial">Partial</span></td><td><span class="tag tag-yes">Yes</span></td><td><span class="tag tag-yes">Yes</span></td><td><span class="tag tag-partial">Partial</span></td><td><span class="tag tag-yes">Yes</span></td><td><span class="tag tag-partial">Partial</span></td><td><span class="tag tag-yes">Yes</span></td><td><span class="tag tag-no">No</span></td><td class="score-cell">9/10</td></tr>
              <tr><td>Paper 7</td><td><span class="tag tag-partial">Partial</span></td><td><span class="tag tag-yes">Yes</span></td><td><span class="tag tag-yes">Yes</span></td><td><span class="tag tag-partial">Partial</span></td><td><span class="tag tag-partial">Partial</span></td><td><span class="tag tag-yes">Yes</span></td><td><span class="tag tag-yes">Yes</span></td><td><span class="tag tag-no">No</span></td><td class="score-cell">8/10</td></tr>
              <tr><td>Paper 8</td><td><span class="tag tag-partial">Partial</span></td><td><span class="tag tag-yes">Yes</span></td><td><span class="tag tag-yes">Yes</span></td><td><span class="tag tag-yes">Yes</span></td><td><span class="tag tag-partial">Partial</span></td><td><span class="tag tag-partial">Partial</span></td><td><span class="tag tag-yes">Yes</span></td><td><span class="tag tag-no">No</span></td><td class="score-cell">8/10</td></tr>
              <tr><td>Paper 9</td><td><span class="tag tag-partial">Partial</span></td><td><span class="tag tag-partial">Partial</span></td><td><span class="tag tag-yes">Yes</span></td><td><span class="tag tag-partial">Partial</span></td><td><span class="tag tag-partial">Partial</span></td><td><span class="tag tag-yes">Yes</span></td><td><span class="tag tag-yes">Yes</span></td><td><span class="tag tag-no">No</span></td><td class="score-cell">8/10</td></tr>
              <tr><td>Paper 10</td><td><span class="tag tag-partial">Partial</span></td><td><span class="tag tag-yes">Yes</span></td><td><span class="tag tag-yes">Yes</span></td><td><span class="tag tag-partial">Partial</span></td><td><span class="tag tag-yes">Yes</span></td><td><span class="tag tag-yes">Yes</span></td><td><span class="tag tag-yes">Yes</span></td><td><span class="tag tag-no">No</span></td><td class="score-cell">9/10</td></tr>
            </tbody>
          </table>
        </div>
        <p style="font-size:0.82rem; color:var(--ink-faint); margin-top:6px;"><em>"Yes" = strong focus · "Partial" = discussed indirectly · "No" = not a major focus</em></p>
      </section>

      <!-- ============ GAP ANALYSIS ============ -->
      <section class="block" id="gap-analysis">
        <h2>Research Gap Analysis</h2>
        <p>Based on the review of the 10 selected papers, five research gaps were identified — each paired with the opportunity SkillHer is positioned to capture.</p>

        <div class="gap-card">
          <h4>Gap 1 — Lack of Integrated Women-Focused Platforms</h4>
          <p class="gap-sub">Evidence from literature</p>
          <p>Papers 1, 3, and 4 show effective isolated interventions (assessment in Paper 3, personalized learning in Papers 5–7, mentorship in Papers 3 and 4), but none combine all three in a unified, women-focused platform.</p>
          <p class="gap-sub">Impact on SkillHer</p>
          <p>Without integration, users must navigate disconnected tools — reducing effectiveness and raising cognitive load.</p>
          <p class="gap-sub">Opportunity for innovation</p>
          <p>A seamless ecosystem where assessment results directly inform personalized learning paths, enhanced by mentorship matching, in one interface.</p>
        </div>

        <div class="gap-card">
          <h4>Gap 2 — Limited Longitudinal Studies on Career Outcomes</h4>
          <p class="gap-sub">Evidence from literature</p>
          <p>Papers 1 and 6 note the lack of longitudinal data — only 12% of Paper 1's studies tracked outcomes beyond 6 months; Paper 6 focuses on academic rather than career outcomes.</p>
          <p class="gap-sub">Impact on SkillHer</p>
          <p>Without long-term tracking, it's difficult to validate the platform's effectiveness in advancing careers.</p>
          <p class="gap-sub">Opportunity for innovation</p>
          <p>Longitudinal tracking of career progression, skill application, and advancement metrics over 1–3 years.</p>
        </div>

        <div class="gap-card">
          <h4>Gap 3 — Insufficient Attention to Intersectional Barriers</h4>
          <p class="gap-sub">Evidence from literature</p>
          <p>Paper 8 finds ethical/privacy concerns in 83% of studies, but few address how AI might exacerbate disparities across ethnicity, socioeconomic background, or geography.</p>
          <p class="gap-sub">Impact on SkillHer</p>
          <p>AI trained on non-diverse data may inadvertently perpetuate bias, limiting effectiveness for underrepresented subgroups.</p>
          <p class="gap-sub">Opportunity for innovation</p>
          <p>Bias detection and mitigation, diverse training data, and customizable interfaces for different cultural contexts and accessibility needs.</p>
        </div>

        <div class="gap-card">
          <h4>Gap 4 — Gap Between Technical Capability and Practical Implementation</h4>
          <p class="gap-sub">Evidence from literature</p>
          <p>Papers 5–7 show strong results in controlled settings, but Papers 6 and 8 note real-world implementation friction — faculty readiness (61%), integration difficulty (49%), resourcing (48%).</p>
          <p class="gap-sub">Impact on SkillHer</p>
          <p>Sophisticated AI features can fail in practice if they demand excessive resources or disruptive workflow changes.</p>
          <p class="gap-sub">Opportunity for innovation</p>
          <p>Design for scalability, comprehensive training resources, compatibility with existing systems, and phased adoption.</p>
        </div>

        <div class="gap-card">
          <h4>Gap 5 — Limited Focus on Skill Transfer and Real-World Application</h4>
          <p class="gap-sub">Evidence from literature</p>
          <p>Papers 5, 6, and 9 primarily measure in-platform learning outcomes (completion, grades, retention) rather than workplace transfer.</p>
          <p class="gap-sub">Impact on SkillHer</p>
          <p>Users may acquire skills but struggle to apply them without explicit transfer support.</p>
          <p class="gap-sub">Opportunity for innovation</p>
          <p>Workplace simulations, project-based learning, and organizational partnerships for practical application.</p>
        </div>
      </section>

      <!-- ============ PROPOSED SOLUTION ============ -->
      <section class="block" id="proposed-solution">
        <h2>Proposed Solution: SkillHer</h2>
        <p>SkillHer addresses the identified research gaps through an integrated technical architecture and a design approach built specifically for women's skill development and career advancement.</p>

        <h3>Technical Architecture</h3>
        <div class="stack-grid">
          <span class="stack-pill"><b>Frontend</b> — React 19 + TypeScript</span>
          <span class="stack-pill"><b>Styling</b> — Tailwind CSS</span>
          <span class="stack-pill"><b>Backend</b> — Django REST Framework</span>
          <span class="stack-pill"><b>Auth</b> — JWT with refresh-token rotation</span>
          <span class="stack-pill"><b>AI Engine</b> — Groq LLM</span>
          <span class="stack-pill"><b>Database</b> — PostgreSQL</span>
        </div>

        <h3>Core Components</h3>
        <div class="component-grid">
          <div class="component-card"><div class="c-title">AI Skill Assessment Engine</div><p>Evaluates current competencies via adaptive testing and identifies skill gaps.</p></div>
          <div class="component-card"><div class="c-title">AI Skill Recommendation Engine</div><p>Generates personalized learning pathways from assessment results and goals.</p></div>
          <div class="component-card"><div class="c-title">Learning Resource Recommendation</div><p>Suggests vetted courses, tutorials, projects, and materials.</p></div>
          <div class="component-card"><div class="c-title">Personalized Learning Roadmaps</div><p>Dynamic, adjustable paths with milestones and progress tracking.</p></div>
          <div class="component-card"><div class="c-title">Women-Focused Career Guidance</div><p>Industry-specific advice, negotiation strategies, advancement pathways.</p></div>
          <div class="component-card"><div class="c-title">Learning Analytics Dashboard</div><p>Visualizes skill progress, patterns, and achievement metrics.</p></div>
          <div class="component-card"><div class="c-title">AI Learning Assistant</div><p>Real-time help, explanations, and motivational support via NLU.</p></div>
          <div class="component-card"><div class="c-title">Mentorship Matching System</div><p>Connects users to mentors based on skills, goals, and compatibility.</p></div>
          <div class="component-card"><div class="c-title">Progress &amp; Achievement Tracking</div><p>Monitors skill acquisition and sustains motivation through milestones.</p></div>
        </div>

        <h3>How SkillHer Addresses Each Gap</h3>

        <h4>Gap 1 Resolution — Integrated Women-Focused Platform</h4>
        <p>SkillHer combines all five core components — assessment, recommendation, learning resources, career guidance, and mentorship — into one cohesive platform. The Assessment Engine feeds directly into the Recommendation Engine, generating roadmaps that adjust dynamically with user progress, while the Mentorship Matching System layers in professional guidance.</p>

        <h4>Gap 2 Resolution — Longitudinal Career Outcome Tracking</h4>
        <ul>
          <li>Skill application in real-world projects and workplace scenarios.</li>
          <li>Career progression indicators (promotions, role changes, salary growth).</li>
          <li>Periodic reassessment for long-term skill retention.</li>
          <li>User-reported confidence, satisfaction, and career-readiness impact.</li>
          <li>Alumni network tracking over 2–5 year periods.</li>
        </ul>

        <h4>Gap 3 Resolution — Intersectional Bias Mitigation</h4>
        <ul>
          <li>Diverse training data across ethnicity, age, socioeconomic status, geography.</li>
          <li>Regular bias audits using fairness metrics across demographic intersections.</li>
          <li>Transparent AI explanations for recommendations.</li>
          <li>Customizable interface for cultural and accessibility needs.</li>
          <li>Community feedback mechanisms to flag biased recommendations.</li>
        </ul>

        <h4>Gap 4 Resolution — Practical Implementation-Focused Design</h4>
        <ul>
          <li>Cloud-based architecture minimizing local compute requirements.</li>
          <li>Interactive onboarding and guided tours.</li>
          <li>API-first design for integration with existing systems.</li>
          <li>Lightweight frontend optimized across devices and connection speeds.</li>
          <li>Flexible deployment — SaaS, private cloud, or on-premise.</li>
        </ul>

        <h4>Gap 5 Resolution — Skill Transfer and Real-World Application</h4>
        <ul>
          <li>Workplace simulation exercises mirroring real professional scenarios.</li>
          <li>Capstone projects solving authentic industry problems.</li>
          <li>Partnerships offering internship pathways for high performers.</li>
          <li>Portfolio development tools to showcase competencies.</li>
          <li>Alumni networks for sharing application experiences.</li>
        </ul>

        <h3>Innovation Contributions</h3>
        <ol>
          <li><strong>First Integrated Women-Focused AI Skill Development Platform</strong> — combining assessment, learning, guidance, and mentorship in one place.</li>
          <li><strong>Ethical AI Framework</strong> — comprehensive bias detection, mitigation, and transparency.</li>
          <li><strong>Dynamic Skill-to-Career Pathway Mapping</strong> — paths that evolve with goals and market demand, not just performance.</li>
          <li><strong>Longitudinal Impact Measurement</strong> — tracking actual career progression beyond course completion.</li>
          <li><strong>Women-Centered Design Methodology</strong> — feminist design principles prioritizing accessibility, safety, community, and empowerment.</li>
        </ol>
      </section>

      <!-- ============ CONCLUSION ============ -->
      <section class="block" id="conclusion">
        <h2>Conclusion</h2>
        <p>This review examined the current state of research on AI applications in women's career development, personalized learning, and skill gap analysis through 10 peer-reviewed papers published between 2023–2026. The synthesis reveals both promising developments and significant gaps that SkillHer is positioned to address.</p>
        <p>The literature confirms AI's effectiveness in personalized learning (Papers 5–7, 9, 10), skill assessment (Papers 3, 5, 8), and career guidance (Papers 1, 2). Yet critical limitations persist: fragmented approaches, insufficient longitudinal validation, inadequate attention to intersectional barriers, implementation friction, and limited focus on real-world skill transfer.</p>
        <p>SkillHer responds through an integrated architecture — React, TypeScript, Tailwind CSS, Django, Django REST Framework, JWT authentication, and Groq AI — uniting skill assessment, personalized recommendations, learning resource curation, career guidance, and mentorship within a single ethical AI framework.</p>
        <blockquote>The platform's innovation lies not just in its technical implementation, but in its holistic approach to women's career development — recognizing that skill acquisition must be connected to career advancement, supported by community, and validated through real-world application.</blockquote>
        <p>As AI continues to evolve, platforms like SkillHer represent the next generation of educational technology — combining technological sophistication with a deep understanding of the human and systemic factors that shape career development.</p>
      </section>

      <!-- ============ REFERENCES ============ -->
      <section class="block" id="references">
        <h2>IEEE References</h2>
        <ol class="ieee-list">
          <li>S. Portell-Fonolla, Y. El Fassi, A. D. Gaspar, L. Correia, and J. C. Pinto, "Artificial intelligence applications supporting women's career development: A scoping review," <em>International Journal for Educational and Vocational Guidance</em>, vol. 26, no. 1, pp. 1-25, Jan. 2026, doi: 10.1007/s10775-026-09807-0.</li>
          <li>M. A. Shabur, "The potential and implications of artificial intelligence in early career planning education," <em>Discover Global Society</em>, vol. 4, no. 2, pp. 101-118, Mar. 2024, doi: 10.1007/s44282-024-00072-6.</li>
          <li>T. Paiva, T. Felgueira, C. A. Alves, N. F. Gomes, S. Salgado, and M. Salaberri, "An education model to empower women in tech entrepreneurship," <em>Frontiers in Education</em>, vol. 9, art. no. 1474584, Nov. 2024, doi: 10.3389/feduc.2024.1474584.</li>
          <li>E. Shava and T. P. Muringa, "Digital empowerment of women in the South African public sector," <em>Frontiers in Sociology</em>, vol. 10, art. no. 1604857, Sep. 2025, doi: 10.3389/fsoc.2025.1604857.</li>
          <li>C. Halkiopoulos and E. Gkintoni, "Leveraging AI in e-learning: Personalized learning and adaptive assessment through cognitive neuropsychology—A systematic analysis," <em>Electronics</em>, vol. 13, no. 18, art. no. 3762, Sep. 2024, doi: 10.3390/electronics13183762.</li>
          <li>C. Merino-Campos, "The impact of artificial intelligence on personalized learning in higher education: A systematic review," <em>Trends in Higher Education</em>, vol. 4, no. 2, art. no. 17, Feb. 2025, doi: 10.3390/higheredu4020017.</li>
          <li>J. Peng and Y. Li, "Frontiers of artificial intelligence for personalized learning in higher education: A systematic review of leading articles," <em>Applied Sciences</em>, vol. 15, no. 18, art. no. 10096, Sep. 2025, doi: 10.3390/app151810096.</li>
          <li>G. P. Barrera Castro, A. Chiappe, M. S. Ramírez-Montoya, and C. Alcántar Nieblas, "Key barriers to personalized learning in times of artificial intelligence: A literature review," <em>Applied Sciences</em>, vol. 15, no. 6, art. no. 3103, Mar. 2025, doi: 10.3390/app15063103.</li>
          <li>I. Gligorea, M. Cioca, R. Oancea, A.-T. Gorski, H. Gorski, and P. Tudorache, "Adaptive learning using artificial intelligence in e-learning: A literature review," <em>Education Sciences</em>, vol. 13, no. 12, art. no. 1216, Dec. 2023, doi: 10.3390/educsci13121216.</li>
          <li>R. Sajja, Y. Sermet, M. Cikmaz, D. Cwiertny, and I. Demir, "Artificial intelligence-enabled intelligent assistant for personalized and adaptive learning in higher education," <em>Information</em>, vol. 15, no. 10, art. no. 596, Oct. 2024, doi: 10.3390/info15100596.</li>
        </ol>
      </section>

      <footer class="doc-footer">
        <p>Literature Review &amp; Project Objectives — Prepared for the SkillHer Project · Version 1.0</p>
      </footer>

    </div>
  </main>
</div>

<div id="toTop" title="Back to top">↑</div>

<script>
  // ---------- Starfield ----------
  (function(){
    const canvas = document.getElementById('stars');
    const ctx = canvas.getContext('2d');
    function resize(){canvas.width = window.innerWidth; canvas.height = window.innerHeight;}
    resize();
    window.addEventListener('resize', resize);
    const stars = Array.from({length: 140}, () => ({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      r: Math.random()*1.3 + 0.2,
      a: Math.random()*0.6 + 0.2,
      tw: Math.random()*0.02 + 0.005,
      dir: Math.random() > 0.5 ? 1 : -1
    }));
    function draw(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle = '#e8b86d';
      stars.forEach(s => {
        s.a += s.tw * s.dir;
        if(s.a > 0.85 || s.a < 0.15) s.dir *= -1;
        ctx.globalAlpha = s.a;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    }
    draw();
  })();

  // ---------- Scroll progress ----------
  const progressBar = document.getElementById('progress');
  function updateProgress(){
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop/docHeight)*100 : 0;
    progressBar.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress);
  updateProgress();

  // ---------- Back to top ----------
  const toTop = document.getElementById('toTop');
  window.addEventListener('scroll', () => {
    toTop.classList.toggle('show', window.scrollY > 500);
  });
  toTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  // ---------- Active TOC link highlighting ----------
  const tocLinks = Array.from(document.querySelectorAll('#tocNav a'));
  const sections = Array.from(document.querySelectorAll('section.block[id]'));
  const linkMap = {};
  tocLinks.forEach(l => {
    const id = l.getAttribute('href').slice(1);
    if(!linkMap[id]) linkMap[id] = [];
    linkMap[id].push(l);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const id = entry.target.id;
        tocLinks.forEach(l => l.classList.remove('active'));
        if(linkMap[id]) linkMap[id].forEach(l => l.classList.add('active'));
      }
    });
  }, {rootMargin: '-15% 0px -70% 0px', threshold: 0});

  sections.forEach(s => observer.observe(s));

  // ---------- Mobile sidebar toggle ----------
  const sidebar = document.getElementById('sidebar');
  const menuBtn = document.getElementById('menuBtn');
  const scrim = document.getElementById('scrim');
  function closeSidebar(){ sidebar.classList.remove('open'); scrim.classList.remove('show'); }
  if(menuBtn){
    menuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      scrim.classList.toggle('show');
    });
  }
  scrim.addEventListener('click', closeSidebar);
  tocLinks.forEach(l => l.addEventListener('click', closeSidebar));
</script>
</body>
</html>