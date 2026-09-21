import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  Sparkles, 
  CheckCircle, 
  Search, 
  Filter, 
  ShieldCheck, 
  Star, 
  Award, 
  X, 
  Code, 
  Briefcase, 
  Zap, 
  Check,
  Building2,
  GraduationCap,
  Copy,
  ExternalLink,
  Edit3,
  RefreshCw,
  Sliders
} from 'lucide-react';

const RESUME_TEMPLATES_DATA = [
  {
    id: 'tpl-jitin',
    title: 'Jitin Nair AutoCV (GitHub Actions & BibLaTeX)',
    category: 'Software Engineering',
    atsScore: '100%',
    format: 'PDF / DOCX / LaTeX',
    downloads: '38,500+',
    idealFor: 'Software Engineers, Systems Architects & Academic Authors',
    description: 'Popular MIT-licensed AutoCV template by Jitin Nair featuring custom jobshort/joblong tabularx environments, BibLaTeX publication lists, and GitHub Actions CI build integration.',
    tags: ['#1 Featured Template', 'Jitin Nair AutoCV', 'BibLaTeX Support', 'GitHub Actions'],
    color: '#002060',
    layoutStyle: 'single-column-ats',
    name: 'JITIN NAIR',
    subtitle: 'Software Engineer & Academic Researcher | AutoCV Lead',
    sections: [
      { title: 'SUMMARY & WORK EXPERIENCE', content: 'AutoCV Lead - GitHub Actions automated CV compilation system • Senior Software Designation (2021-present) • Engineering Lead (2019-2021)' },
      { title: 'PROJECTS', content: 'AutoCV Automated CI/CD Engine (GitHub Actions, BibLaTeX, pdfLaTeX)' },
      { title: 'EDUCATION & PUBLICATIONS', content: 'PhD Candidate (Computer Science) GPA 4.0/4.0 • Bachelor Degree GPA 4.0/4.0 • BibLaTeX Citation Library' },
      { title: 'SKILLS & TOOLS', content: 'Python, C/C++, Java, JavaScript, SQL, Shell, LaTeX, GitHub Actions, Docker, AWS' }
    ],
    previewText: `JITIN NAIR
Software Engineer & Academic Researcher | email@mysite.com | github.com/jitinnair1

SUMMARY & WORK EXPERIENCE
AutoCV Lead - GitHub Actions automated CV compilation system (github.com/jitinnair1/autoCV)
Senior Software Designation (Jan 2021 - Present)
• Scalable backend data handling, tabular execution, and cross-functional team leadership.
Engineering Lead (Mar 2019 - Jan 2021)
• Full-stack architecture, microservice data pipeline design, and automated CI/CD releases.

EDUCATION & PUBLICATIONS
PhD Candidate in Computer Science (GPA: 4.0/4.0) | University (2030 - Present)
Bachelor's Degree in Computer Science (GPA: 4.0/4.0) | College (2023 - 2027)
Publications: BibLaTeX citations integrated via citations.bib reference library.`,
    customLaTeXCode: `%-----------------------------------------------------------------------------------------------------------------------------------------------%
%	The MIT License (MIT)
%
%	Copyright (c) 2021 Jitin Nair
%
%	Permission is hereby granted, free of charge, to any person obtaining a copy
%	of this software and associated documentation files (the "Software"), to deal
%	in the Software without restriction, including without limitation the rights
%	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
%	copies of the Software, and to permit persons to whom the Software is
%	furnished to do so, subject to the following conditions:
%	
%	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
%	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
%	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
%	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
%	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
%	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
%	THE SOFTWARE.
%	
%
%-----------------------------------------------------------------------------------------------------------------------------------------------%

%----------------------------------------------------------------------------------------
%	DOCUMENT DEFINITION
%----------------------------------------------------------------------------------------

\\documentclass[a4paper,12pt]{article}

%----------------------------------------------------------------------------------------
%	PACKAGES
%----------------------------------------------------------------------------------------
\\usepackage{url}
\\usepackage{parskip} 	

%other packages for formatting
\\RequirePackage{color}
\\RequirePackage{graphicx}
\\usepackage[usenames,dvipsnames]{xcolor}
\\usepackage[scale=0.9]{geometry}

%tabularx environment
\\usepackage{tabularx}

%for lists within experience section
\\usepackage{enumitem}

% centered version of 'X' col. type
\\newcolumntype{C}{>{\\centering\\arraybackslash}X} 

%to prevent spillover of tabular into next pages
\\usepackage{supertabular}
\\usepackage{tabularx}
\\newlength{\\fullcollw}
\\setlength{\\fullcollw}{0.47\\textwidth}

%custom \\section
\\usepackage{titlesec}				
\\usepackage{multicol}
\\usepackage{multirow}

%CV Sections inspired by: 
%http://stefano.italians.nl/archives/26
\\titleformat{\\section}{\\Large\\scshape\\raggedright}{}{0em}{}[\\titlerule]
\\titlespacing{\\section}{0pt}{10pt}{10pt}

%for publications
\\usepackage[style=authoryear,sorting=ynt, maxbibnames=2]{biblatex}

%Setup hyperref package, and colours for links
\\usepackage[unicode, draft=false]{hyperref}
\\definecolor{linkcolour}{rgb}{0,0.2,0.6}
\\hypersetup{colorlinks,breaklinks,urlcolor=linkcolour,linkcolor=linkcolour}
\\addbibresource{citations.bib}
\\setlength\\bibitemsep{1em}

%for social icons
\\usepackage{fontawesome5}

% job listing environments
\\newenvironment{jobshort}[2]
    {
    \\begin{tabularx}{\\linewidth}{@{}l X r@{}}
    \\textbf{#1} & \\hfill &  #2 \\\\[3.75pt]
    \\end{tabularx}
    }
    {
    }

\\newenvironment{joblong}[2]
    {
    \\begin{tabularx}{\\linewidth}{@{}l X r@{}}
    \\textbf{#1} & \\hfill &  #2 \\\\[3.75pt]
    \\end{tabularx}
    \\begin{minipage}[t]{\\linewidth}
    \\begin{itemize}[nosep,after=\\strut, leftmargin=1em, itemsep=3pt,label=--]
    }
    {
    \\end{itemize}
    \\end{minipage}    
    }

%----------------------------------------------------------------------------------------
%	BEGIN DOCUMENT
%----------------------------------------------------------------------------------------
\\begin{document}

% non-numbered pages
\\pagestyle{empty} 

%----------------------------------------------------------------------------------------
%	TITLE
%----------------------------------------------------------------------------------------

\\begin{tabularx}{\\linewidth}{@{} C @{}}
\\Huge{Jitin Nair} \\\\[7.5pt]
\\href{https://github.com/jitinnair1}{\\raisebox{-0.05\\height}\\faGithub\\ jitinnair1} \\ $|$ \\ 
\\href{https://linkedin.com/in/jitinnair}{\\raisebox{-0.05\\height}\\faLinkedin\\ jitinnair} \\ $|$ \\ 
\\href{https://mysite.com}{\\raisebox{-0.05\\height}\\faGlobe \\ mysite.com} \\ $|$ \\ 
\\href{mailto:email@mysite.com}{\\raisebox{-0.05\\height}\\faEnvelope \\ email@mysite.com} \\ $|$ \\ 
\\href{tel:+000000000000}{\\raisebox{-0.05\\height}\\faMobile \\ +00.00.000.000} \\\\
\\end{tabularx}

%----------------------------------------------------------------------------------------
% EXPERIENCE SECTIONS
%----------------------------------------------------------------------------------------

%Interests/ Keywords/ Summary
\\section{Summary}
This CV can also be automatically compiled and published using GitHub Actions. For details, \\href{https://github.com/jitinnair1/autoCV}{click here}.

%Experience
\\section{Work Experience}

\\begin{jobshort}{Senior Software Designation}{Jan 2021 - present}
Scalable backend microservice architecture, distributed database engineering, automated API testing pipelines, and cross-functional project management.
\\end{jobshort}

\\begin{joblong}{Engineering Lead}{Mar 2019 - Jan 2021}
\\item Led engineering team responsible for high-throughput automated CV parser microservice handling 100k daily operations.
\\item Built automated CI/CD pipeline releasing weekly production updates with 99.9\\% deployment success rate.
\\end{joblong}
  
%Projects
\\section{Projects}

\\begin{tabularx}{\\linewidth}{ @{}l r@{} }
\\textbf{AutoCV Automated CI/CD Engine} & \\hfill \\href{https://github.com/jitinnair1/autoCV}{Link to GitHub Demo} \\\\[3.75pt]
\\multicolumn{2}{@{}X@{}}{Automated LaTeX builder powered by GitHub Actions, BibLaTeX citation parser, and pdfLaTeX compiler.}  \\\\
\\end{tabularx}

%----------------------------------------------------------------------------------------
%	EDUCATION
%----------------------------------------------------------------------------------------
\\section{Education}
\\begin{tabularx}{\\linewidth}{@{}l X@{}}	
2030 - present & PhD (Computer Science) at \\textbf{University} \\hfill \\normalsize (GPA: 4.0/4.0) \\\\
2023 - 2027 & Bachelor's Degree at \\textbf{College} \\hfill (GPA: 4.0/4.0) \\\\ 
2022 & Class 12th Board \\hfill (Grades: 96\\%) \\\\
2021 & Class 10th Board \\hfill (Grades: 98\\%) \\\\
\\end{tabularx}

%----------------------------------------------------------------------------------------
%	PUBLICATIONS
%----------------------------------------------------------------------------------------
\\section{Publications}
\\begin{refsection}[citations.bib]
\\nocite{*}
\\printbibliography[heading=none]
\\end{refsection}

%----------------------------------------------------------------------------------------
%	SKILLS
%----------------------------------------------------------------------------------------
\\section{Skills}
\\begin{tabularx}{\\linewidth}{@{}l X@{}}
Programming & \\normalsize{Python, C/C++, Java, JavaScript, SQL, Shell, LaTeX}\\\\
Cloud \\& DevOps & \\normalsize{GitHub Actions, Docker, Kubernetes, AWS, PostgreSQL, Linux}\\\\  
\\end{tabularx}

\\vfill
\\center{\\footnotesize Last updated: \\today}

\\end{document}`
  },
  {
    id: 'tpl-0',
    title: "Harshibar Tech & Software Engineering Resume",
    category: 'Software Engineering',
    atsScore: '100%',
    format: 'PDF / DOCX / LaTeX',
    downloads: '32,400+',
    idealFor: 'Software Engineers, Tech Creators & Startup Applicants',
    description: 'Clean single-page Harshibar/Jake LaTeX format featuring FontAwesome5 icons, custom section underlines, and high-impact metric bullets.',
    tags: ['#1 Featured Template', 'Harshibar Resume', 'FontAwesome5', '100% ATS'],
    color: '#2563eb',
    layoutStyle: 'single-column-ats',
    name: 'HARSHIBAR',
    subtitle: 'Software Engineer & Tech Creator | San Francisco, CA',
    sections: [
      { title: 'EXPERIENCE', content: 'YouTube Creator (60k subs, +2.5M impressions) • Google Verily Software Engineer (Saved $1M/yr) • Amazon Software Engineering Intern' },
      { title: 'PROJECTS', content: 'Hyku Consulting • Minimal Icon Pack ($250+ sales) • CommonIntern Auto-Applier (500+ GitHub Stars)' },
      { title: 'EDUCATION', content: 'Wellesley College | BA in Computer Science & Pre-Med (Wellesley, MA)' },
      { title: 'SKILLS', content: 'Languages: Python, JavaScript (React.js), HTML/CSS, SQL | Tools: Figma, Notion, Jira, Git' }
    ],
    previewText: `HARSHIBAR
Software Engineer & Tech Creator | San Francisco, CA
Phone: 555.555.5555 | Email: hello@email.com | YouTube: @harshibar

EXPERIENCE
YouTube Creator (Aug 2019 - Present) | San Francisco, CA
• Grew channel to 60k subscribers in 1.5 years; created 80+ videos on tech and productivity.
• Conducted A/B testing on titles and thumbnails; increased video impressions by 2.5M in 3 months.
• Designed a Notion workflow to streamline video production; boosted productivity by 20%.

Google Verily - Software Engineer (Aug 2018 - Sept 2019) | San Francisco, CA
• Led front-end development of dashboard processing 50k blood samples for early-stage cancer detection.
• Rebuilt Quality Control product saving $1M annually across 20 cross-functional stakeholders.

Amazon - Software Engineering Intern (May 2017 - Aug 2017) | Seattle, WA
• Search Customer Experience Team; received full-time return offer. Shipped new feature to 2M+ users.

PROJECTS
• CommonIntern: Python script automatically applying to jobs on Glassdoor (500+ GitHub Stars, featured on Hackaday).
• Minimal Icon Pack: Designed 100+ minimal iOS icons in Figma/Procreate.

EDUCATION & SKILLS
Wellesley College - B.A. Computer Science & Pre-Med | Wellesley, MA
Languages: Python, JavaScript (React.js), HTML/CSS, SQL (PostgreSQL, MySQL)`,
    customLaTeXCode: `%-------------------------
% Resume in Latex
% Author : Harshibar
% Based off of: https://github.com/jakeryang/resume
% License : MIT
%------------------------

\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\usepackage{fontawesome5}
\\usepackage[scale=0.90,lf]{FiraMono}

\\definecolor{light-grey}{gray}{0.83}
\\definecolor{dark-grey}{gray}{0.3}
\\definecolor{text-grey}{gray}{.08}

\\DeclareRobustCommand{\\ebseries}{\\fontseries{eb}\\selectfont}
\\DeclareTextFontCommand{\\texteb}{\\ebseries}

\\usepackage{contour}
\\usepackage[normalem]{ulem}
\\renewcommand{\\ULdepth}{1.8pt}
\\contourlength{0.8pt}
\\newcommand{\\myuline}[1]{%
  \\uline{\\phantom{#1}}%
  \\llap{\\contour{white}{#1}}%
}

\\usepackage{tgheros}
\\renewcommand*\\familydefault{\\sfdefault} 
\\usepackage[T1]{fontenc}

\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{0in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}
\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

\\titleformat {\\section}{
    \\bfseries \\vspace{2pt} \\raggedright \\large
}{}{0em}{}[\\color{light-grey} {\\titlerule[2pt]} \\vspace{-4pt}]

\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-1pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-1pt}\\item
    \\begin{tabular*}{\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & {\\color{dark-grey}\\small #2}\\vspace{1pt}\\\\
      \\textit{#3} & {\\color{dark-grey} \\small #4}\\\\
    \\end{tabular*}\\vspace{-4pt}
}

\\newcommand{\\resumeSubSubheading}[2]{
    \\item
    \\begin{tabular*}{\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\textit{\\small#1} & \\textit{\\small #2} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{\\textwidth}{l@{\\extracolsep{\\fill}}r}
      #1 & {\\color{dark-grey}} \\\\
    \\end{tabular*}\\vspace{-4pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{0pt}}

\\color{text-grey}

\\begin{document}

\\begin{center}
    \\textbf{\\Huge Harshibar} \\\\ \\vspace{5pt}
    \\small \\faPhone* \\texttt{555.555.5555} \\hspace{1pt} $|$
    \\hspace{1pt} \\faEnvelope \\hspace{2pt} \\texttt{hello@email.com} \\hspace{1pt} $|$ 
    \\hspace{1pt} \\faYoutube \\hspace{2pt} \\texttt{harshibar} \\hspace{1pt} $|$
    \\hspace{1pt} \\faMapMarker* \\hspace{2pt}\\texttt{U.S. Citizen}
    \\\\ \\vspace{-3pt}
\\end{center}

\\section{EXPERIENCE}
  \\resumeSubHeadingListStart

    \\resumeSubheading
      {YouTube}{Aug. 2019 -- Present}
      {Creator (\\href{https://www.youtube.com/c/harshibar}{\\myuline {@harshibar}})}{San Francisco, CA}
      \\resumeItemListStart
        \\resumeItem{Grew channel to \\textbf{60k subscribers in 1.5 years}; created 80+ videos on tech and productivity}
        \\resumeItem{Conducted A/B testing on titles and thumbnails; \\textbf{increased video impressions by 2.5M} in 3 months}
         \\resumeItem{Designed a Notion workflow to streamline video production and roadmapping; boosted productivity by 20\\%}
        \\resumeItem{\\textbf{Partnered with brands like Skillshare and Squarespace} to expand their outreach via sponsorships}
        \\resumeItem{\\textbf{Highlights}:
            \\href{https://www.youtube.com/watch?v=HhWUjp5pD0g}{\\myuline {The Problem with Productivity Apps}}, \\href{https://www.youtube.com/watch?v=ms4cWMsOITs}{\\myuline {Obsidian App Review}},
            \\href{https://www.youtube.com/watch?v=PkDbkyIR44w}{\\myuline {Not-So-Minimal Desk Setup}}}
      \\resumeItemListEnd

    \\resumeSubheading
      {Google Verily}{Aug. 2018 -- Sept. 2019}
      {Software Engineer}{San Francisco, CA}
      \\resumeItemListStart
        \\resumeItem{\\textbf{Led front-end development} of a dashboard to process 50k blood samples and detect early-stage cancer}
        \\resumeItem{Rebuilt a Quality Control product with input from 20 cross-functional stakeholders, \\textbf{saving \\$1M annually}}
        \\resumeItem{Spearheaded product development of a new lab workflow tool, leading to a 40\\% increase in efficiency; \\\\ shadowed 10 core users, iterated on design docs, and implemented the solution with one engineer}

    \\resumeItemListEnd

    \\resumeSubheading
      {Amazon}{May 2017 -- Aug. 2017}
      {Software Engineering Intern}{Seattle, WA}
      \\resumeItemListStart
        \\resumeItem{Worked on the Search Customer Experience Team; \\textbf{received a return offer} for a full-time position}
        \\resumeItem{\\textbf{Shipped a new feature to 2M+ users} to improve the search experience for movie series-related queries}
        \\resumeItem{Built a back-end database service in Java and implemented a front-end UI to support future changes}
      \\resumeItemListEnd

  \\resumeSubHeadingListEnd

\\section{PROJECTS}
    \\resumeSubHeadingListStart
      \\resumeProjectHeading
          {\\textbf{Hyku Consulting}} {Sept. 2019 -- Mar. 2021}
          \\resumeItemListStart
            \\resumeItem{Mentored 15 students towards acceptance at top US boarding schools; achieved \\textbf{100\\% success rate}}
            \\resumeItem{Designed a \\textbf{collaborative learning ecosystem} for students and parents with Trello, Miro, and Google Suite}
          \\resumeItemListEnd
          
        \\resumeProjectHeading
          {\\textbf{Minimal Icon Pack}}{Sept. 2020 -- Nov. 2020}
          \\resumeItemListStart
            \\resumeItem{Designed and released 100+ minimal iOS and Android icons from scratch using Procreate and Figma}
            \\resumeItem{Marketed the product and design process on {\\href{https://www.youtube.com/watch?v=Ju32r7QJCzk}{\\myuline {YouTube}}}; accumulated over \\textbf{\\$250 in sales} on {\\href{https://gumroad.com/l/icons-by-harshibar}{\\myuline {Gumroad}}}}
          \\resumeItemListEnd
          
      \\resumeProjectHeading
         {\\textbf{CommonIntern}}{Sept. 2019 -- May 2020}
          \\resumeItemListStart
            \\resumeItem{Built a Python script to automatically apply to jobs on Glassdoor using BeautifulSoup and Selenium}
            \\resumeItem{\\textbf{500 stars on \\href{https://github.com/harshibar/common-intern}{\\myuline {GitHub}}}; featured on {\\href{https://hackaday.com/2020/05/30/job-application-script-automates-the-boring-stuff-with-python}{\\myuline {Hackaday}}}; made the front page of {\\href {https://www.reddit.com/r/Python/comments/gpaegj/i_was_tired_of_opening_100s_of_tabs_for/?utm_source=share}{\\myuline {r/python}}} and {\\href {https://www.reddit.com/r/programming/comments/dcmbzx/i_was_tired_of_opening_100s_of_tabs_for/}{\\myuline {r/programming}}}}
          \\resumeItemListEnd
          
    \\resumeSubHeadingListEnd

\\section {EDUCATION}
  \\resumeSubHeadingListStart
    \\resumeSubheading
      {Wellesley College}{Aug. 2014 -- May 2018}
      {Bachelor of Arts in Computer Science and Pre-Med}{Wellesley, MA}
      	\\resumeItemListStart
    	\\resumeItem {\\textbf{Coursework}: Data Structures, Algorithms, Databases, Computer Systems, Machine Learning}
        \\resumeItem 
            {\\textbf{Research}: MIT Graybiel Lab (published author), MIT Media Lab (analyzed urban microbe spread)}
        \\resumeItemListEnd
  \\resumeSubHeadingListEnd

\\section{SKILLS}
 \\begin{itemize}[leftmargin=0in, label={}]
    \\small{\\item{
     \\textbf{Languages} {: Python, JavaScript (React.js), HTML/CSS, SQL (PostgreSQL, MySQL)}\\vspace{2pt} \\\\
     \\textbf{Tools}     {: Figma, Notion, Jira, Trello, Miro, Google Analytics, GitHub, DaVinci Resolve, OBS}
    }}
 \\end{itemize}

\\end{document}`
  },
  {
    id: 'tpl-magical',
    title: 'MagicalCV Two-Column Data Science & ML Resume',
    category: 'Data Science & AI',
    atsScore: '99%',
    format: 'PDF / DOCX / LaTeX',
    downloads: '28,900+',
    idealFor: 'Data Scientists, ML Engineers & International Postgraduates',
    description: 'Featured 2-column MagicalCV LaTeX template with Vivid Purple headings, left sidebar skills/coursework, and right column research & experience.',
    tags: ['#2 Featured Template', 'MagicalCV', 'Vivid Purple', 'Data Science'],
    color: '#3e0097',
    layoutStyle: 'sidebar-two-col',
    name: 'JOHN DOE',
    subtitle: 'MS in Data Science/Analysis | Leeds, UK',
    sections: [
      { title: 'EXPERIENCE', content: 'Software Engineer @ IIT Indore (Yolo low-light optimization) • ML Intern @ RRCAT (Genetic algorithm gene detection)' },
      { title: 'COMPETITIONS & PROJECTS', content: 'Smart India Hackathon Winner (₹1 Lakh Prize) • IPL Data Analysis • Serial Killer Behaviour Study' },
      { title: 'EDUCATION & HONORS', content: 'Univ of Leeds (MS Data Science) • MITS Gwalior (BTech CSE) • International Masters Excellence Scholarship' },
      { title: 'SKILLS & COURSEWORK', content: 'Python, R, PHP, C++, SQL, Machine Learning, Statistical Learning, Knowledge Representation' }
    ],
    previewText: `JOHN DOE
MS in Data Science/Analysis | fakegmail@gmail.com | github.com/themagicalmammal

EDUCATION & COURSEWORK
University of Leeds - MS in Data Science/Analysis (Sep 2022) | Leeds, UK
MITS Gwalior - B.Tech in Computer Science (Sep 2020)
Courses: AI, Machine Learning, Statistical Theory, Knowledge Representation

EXPERIENCE
Software Engineer - IIT Indore (Sep 2020 - Aug 2021)
• Boosted low light accuracy in MobileNetV3 using Yolo; automated traffic sign data handling.
Machine Learning Intern - Raja Ramanna Centre (Apr 2020 - Aug 2020)
• Designed genetic algorithm model detecting gene crossovers/mutations for scheduling.

COMPETITIONS & PROJECTS
• Smart India Hackathon Winner (₹1 Lakh Prize): Built Ethereum blockchain web application.
• IPL Data Analysis (University of Leeds): Discovered trends/correlations using Pandas, Seaborn.`,
    customLaTeXCode: `\\documentclass[a4paper]{MagicalCV}

\\usepackage{fancyhdr}
\\pagestyle{fancy}
\\fancyhf{}
\\geometry{left=1.4cm, top=.8cm, right=1.4cm, bottom=1.8cm, footskip=.5cm}

\\definecolor{VividPurple}{HTML}{3E0097}
\\definecolor{SlateGrey}{HTML}{2E2E2E}
\\definecolor{LightGrey}{HTML}{666666}
\\colorlet{heading}{VividPurple}
\\colorlet{accent}{VividPurple}
\\colorlet{emphasis}{SlateGrey}
\\colorlet{body}{LightGrey}
\\colorlet{awesome}{awesome-purple}
\\setbool{acvSectionColorHighlight}{true}
\\renewcommand{\\acvHeaderSocialSep}{\\quad\\textbar\\quad}

\\begin{document}
\\lastupdated
\\namesection{John}{Doe}{
\\phone{0000 000000} \\email{\\href{mailto:fakegmail@gmail.com}{fakegmail@gmail.com}}}

\\begin{minipage}[t]{0.33\\textwidth} 
\\cvsection{Education} 
\\subsection{University of Leeds}
\\descript{MS in Data Science/Analysis}
\\cvevent{Sep 2022}{Leeds, UK} 
\\vspace{\\topsep}
\\begin{tightemize}
\\item International Masters Excellence Scholarship
\\item Expecting a First class degree
\\item Working as PAL Mentor
\\end{tightemize}
\\sectionsep

\\subsection{MITS, Gwalior}
\\descript{BTech in Computer Science}
\\cvevent{Sep 2020}{Gwalior, MP} 
Graduated with Distinction
\\sectionsep

\\cvsection{Links}
\\github{GitHub} \\href{https://github.com/themagicalmammal}{\\bf themagicalmammal} \\\\
\\linkedin{Linkedin} \\href{https://www.linkedin.com/in/themagicalmammal/}{\\bf themagicalmammal}
\\sectionsep

\\cvsection{Coursework}
\\subsection{Graduate}
Data Science \\\\ Programming for Data Science \\\\ Artificial Intelligence \\\\ Machine Learning \\\\ 
\\textbf{Dissertation: } Machine learning methods for solubility prediction
\\sectionsep

\\cvsection{Skills}
\\subsection{Programming}
Python \\textbullet{} R \\textbullet{} PHP \\textbullet{} C/C++ \\textbullet{} HTML/CSS \\textbullet{} JavaScript \\textbullet{} SQL 
\\sectionsep
\\end{minipage} 
\\hfill
\\begin{minipage}[t]{0.66\\textwidth} 
\\cvsection{Experience}
\\runsubsection{Software Engineer} \\\\
\\descript{Indian Institute of Technology}
\\cvevent{Sep 2020 – Aug 2021}{Indore, MP} 
\\vspace{\\topsep}
\\begin{tightemize}
\\item Using Yolo to boost the accuracy of low light situations in mobilenetv3 
\\item Using Bash scripts and Linux tools to automate and optimize data handling.
\\end{tightemize}
\\sectionsep

\\runsubsection{Machine Learning Intern} \\\\
\\descript{Raja Ramanna Centre for Advanced Technology}
\\cvevent{Apr 2020 – Aug 2020}{Indore, MP} 
\\vspace{\\topsep}
\\begin{tightemize}
\\item Using Genetic algorithm designed a model to detect crossover/mutation in gene.
\\end{tightemize}
\\sectionsep

\\cvsection{Competitions}
\\runsubsection{Smart India Hackathon Winner} \\\\
\\descript{Team Cicada3301}
\\cvevent{Jan 2019 – Feb 2019}{Bhubaneshwar, Orissa} 
\\begin{tightemize}
\\item Won 1 Lakh prize for Ethereum blockchain solution.
\\end{tightemize}
\\end{minipage} 
\\end{document}`
  },
  {
    id: 'tpl-jitin',
    title: 'Jitin Nair AutoCV (GitHub Actions & BibLaTeX)',
    category: 'Software Engineering',
    atsScore: '100%',
    format: 'PDF / DOCX / LaTeX',
    downloads: '24,100+',
    idealFor: 'Software Engineers, Systems Architects & Academic Authors',
    description: 'Popular MIT-licensed AutoCV template by Jitin Nair featuring custom jobshort/joblong tabularx environments, BibLaTeX publication lists, and GitHub Actions CI build integration.',
    tags: ['#3 Featured Template', 'AutoCV Engine', 'BibLaTeX Support', 'GitHub Actions'],
    color: '#002060',
    layoutStyle: 'single-column-ats',
    name: 'JITIN NAIR',
    subtitle: 'Software Engineer & Academic Researcher | AutoCV Lead',
    sections: [
      { title: 'SUMMARY & WORK EXPERIENCE', content: 'AutoCV Lead - GitHub Actions automated CV compilation system • Senior Software Designation (2021-present) • Engineering Lead (2019-2021)' },
      { title: 'PROJECTS', content: 'AutoCV Automated CI/CD Engine (GitHub Actions, BibLaTeX, pdfLaTeX)' },
      { title: 'EDUCATION & PUBLICATIONS', content: 'PhD Candidate (Computer Science) GPA 4.0/4.0 • Bachelor Degree GPA 4.0/4.0 • BibLaTeX Citation Library' },
      { title: 'SKILLS & TOOLS', content: 'Python, C/C++, Java, JavaScript, SQL, Shell, LaTeX, GitHub Actions, Docker, AWS' }
    ],
    previewText: `JITIN NAIR
Software Engineer & Academic Researcher | email@mysite.com | github.com/jitinnair1

SUMMARY & WORK EXPERIENCE
AutoCV Lead - GitHub Actions automated CV compilation system (github.com/jitinnair1/autoCV)
Senior Software Designation (Jan 2021 - Present)
• Scalable backend data handling, tabular execution, and cross-functional team leadership.
Engineering Lead (Mar 2019 - Jan 2021)
• Full-stack architecture, microservice data pipeline design, and automated CI/CD releases.

EDUCATION & PUBLICATIONS
PhD Candidate in Computer Science (GPA: 4.0/4.0) | University (2030 - Present)
Bachelor's Degree in Computer Science (GPA: 4.0/4.0) | College (2023 - 2027)
Publications: BibLaTeX citations integrated via citations.bib reference library.`,
    customLaTeXCode: `%-----------------------------------------------------------------------------------------------------------------------------------------------%
%	The MIT License (MIT)
%	Copyright (c) 2021 Jitin Nair
%-----------------------------------------------------------------------------------------------------------------------------------------------%

\\documentclass[a4paper,12pt]{article}
\\usepackage{url}
\\usepackage{parskip} 	
\\RequirePackage{color}
\\RequirePackage{graphicx}
\\usepackage[usenames,dvipsnames]{xcolor}
\\usepackage[scale=0.9]{geometry}
\\usepackage{tabularx}
\\usepackage{enumitem}

\\newcolumntype{C}{>{\\centering\\arraybackslash}X} 
\\usepackage{supertabular}
\\usepackage{tabularx}
\\newlength{\\fullcollw}
\\setlength{\\fullcollw}{0.47\\textwidth}

\\usepackage{titlesec}				
\\usepackage{multicol}
\\usepackage{multirow}

\\titleformat{\\section}{\\Large\\scshape\\raggedright}{}{0em}{}[\\titlerule]
\\titlespacing{\\section}{0pt}{10pt}{10pt}

\\usepackage[style=authoryear,sorting=ynt, maxbibnames=2]{biblatex}
\\usepackage[unicode, draft=false]{hyperref}
\\definecolor{linkcolour}{rgb}{0,0.2,0.6}
\\hypersetup{colorlinks,breaklinks,urlcolor=linkcolour,linkcolor=linkcolour}
\\addbibresource{citations.bib}
\\setlength\\bibitemsep{1em}
\\usepackage{fontawesome5}

\\newenvironment{jobshort}[2]
    {
    \\begin{tabularx}{\\linewidth}{@{}l X r@{}}
    \\textbf{#1} & \\hfill &  #2 \\\\[3.75pt]
    \\end{tabularx}
    }
    {
    }

\\newenvironment{joblong}[2]
    {
    \\begin{tabularx}{\\linewidth}{@{}l X r@{}}
    \\textbf{#1} & \\hfill &  #2 \\\\[3.75pt]
    \\end{tabularx}
    \\begin{minipage}[t]{\\linewidth}
    \\begin{itemize}[nosep,after=\\strut, leftmargin=1em, itemsep=3pt,label=--]
    }
    {
    \\end{itemize}
    \\end{minipage}    
    }

\\begin{document}
\\pagestyle{empty} 

\\begin{tabularx}{\\linewidth}{@{} C @{}}
\\Huge{Jitin Nair} \\\\[7.5pt]
\\href{https://github.com/jitinnair1}{\\raisebox{-0.05\\height}\\faGithub\\ jitinnair1} \\ $|$ \\ 
\\href{https://linkedin.com/in/jitinnair}{\\raisebox{-0.05\\height}\\faLinkedin\\ jitinnair} \\ $|$ \\ 
\\href{https://mysite.com}{\\raisebox{-0.05\\height}\\faGlobe \\ mysite.com} \\ $|$ \\ 
\\href{mailto:email@mysite.com}{\\raisebox{-0.05\\height}\\faEnvelope \\ email@mysite.com} \\ $|$ \\ 
\\href{tel:+000000000000}{\\raisebox{-0.05\\height}\\faMobile \\ +00.00.000.000} \\\\
\\end{tabularx}

\\section{Summary}
This CV can also be automatically compiled and published using GitHub Actions. For details, \\href{https://github.com/jitinnair1/autoCV}{click here}.

\\section{Work Experience}

\\begin{jobshort}{Senior Software Designation}{Jan 2021 - present}
Scalable backend microservice architecture, distributed database engineering, automated API testing pipelines, and cross-functional project management.
\\end{jobshort}

\\begin{joblong}{Engineering Lead}{Mar 2019 - Jan 2021}
\\item Led engineering team responsible for high-throughput automated CV parser microservice handling 100k daily operations.
\\item Built automated CI/CD pipeline releasing weekly production updates with 99.9\\% deployment success rate.
\\end{joblong}
  
\\section{Projects}

\\begin{tabularx}{\\linewidth}{ @{}l r@{} }
\\textbf{AutoCV Automated CI/CD Engine} & \\hfill \\href{https://github.com/jitinnair1/autoCV}{Link to GitHub Demo} \\\\[3.75pt]
\\multicolumn{2}{@{}X@{}}{Automated LaTeX builder powered by GitHub Actions, BibLaTeX citation parser, and pdfLaTeX compiler.}  \\\\
\\end{tabularx}

\\section{Education}
\\begin{tabularx}{\\linewidth}{@{}l X@{}}	
2030 - present & PhD (Computer Science) at \\textbf{University} \\hfill \\normalsize (GPA: 4.0/4.0) \\\\
2023 - 2027 & Bachelor's Degree at \\textbf{College} \\hfill (GPA: 4.0/4.0) \\\\ 
2022 & Class 12th Board \\hfill (Grades: 96\\%) \\\\
2021 & Class 10th Board \\hfill (Grades: 98\\%) \\\\
\\end{tabularx}

\\section{Publications}
\\begin{refsection}[citations.bib]
\\nocite{*}
\\printbibliography[heading=none]
\\end{refsection}

\\section{Skills}
\\begin{tabularx}{\\linewidth}{@{}l X@{}}
Programming & \\normalsize{Python, C/C++, Java, JavaScript, SQL, Shell, LaTeX}\\\\
Cloud \\& DevOps & \\normalsize{GitHub Actions, Docker, Kubernetes, AWS, PostgreSQL, Linux}\\\\  
\\end{tabularx}

\\vfill
\\center{\\footnotesize Last updated: \\today}

\\end{document}`
  },
  {
    id: 'tpl-1',
    title: 'Software Engineering ATS Master',
    category: 'Software Engineering',
    atsScore: '99%',
    format: 'PDF / DOCX / LaTeX',
    downloads: '14,200+',
    idealFor: 'Full-Stack, Backend & Frontend Developers',
    description: 'Clean single-page ATS-optimized format structured with technical skills matrix, GitHub project links, and quantifiable impact metrics.',
    tags: ['Single Page', 'ATS-Optimized', 'GitHub Links', 'Impact Metrics'],
    color: '#2563eb',
    layoutStyle: 'single-column-ats',
    name: 'JOHN DOE',
    subtitle: 'Full-Stack Software Engineering Candidate | Bangalore, India',
    sections: [
      { title: 'TECHNICAL SKILLS', content: 'Languages: JavaScript (TypeScript), Python, C++, SQL | Frameworks: React, Node.js, Next.js' },
      { title: 'EXPERIENCE', content: 'Full-Stack Engineering Intern @ TechCorp (Built REST APIs serving 50k DAU with 99.9% uptime)' },
      { title: 'EDUCATION', content: 'B.Tech in CS & Engineering | AIET College (CGPA: 8.9/10)' },
      { title: 'KEY PROJECTS', content: '• InternCatalyst Microservices • AI Resume Parser (95% accuracy)' }
    ],
    previewText: `JOHN DOE
Full-Stack Software Engineering Candidate | Bangalore, India
Email: john.doe@email.com | Phone: +91 98765 43210 | GitHub: github.com/johndoe

TECHNICAL SKILLS
Languages: JavaScript (TypeScript), Python, C++, SQL, HTML5/CSS3
Frameworks: React.js, Node.js, Express, Next.js, Tailwind CSS
Tools & Cloud: Git, Docker, AWS (S3, EC2), Postman, MongoDB, PostgreSQL

EDUCATION
B.Tech in Computer Science & Engineering | AIET College (CGPA: 8.9/10) | 2022 - 2026

INTERNSHIP EXPERIENCE
Full-Stack Engineering Intern | TechCorp India (June 2025 - August 2025)
• Built RESTful APIs serving 50k daily active users with 99.9% uptime.
• Reduced page load latency by 35% through code splitting and asset optimization.

PROJECTS
• InternCatalyst Portal: Designed microservices architecture handling student profile verifications.
• AI Resume Parser: Developed Python NLP script extracting skills with 95% accuracy.`,
    customLaTeXCode: `\\documentclass[letterpaper,11pt]{article}
\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage[hidelinks]{hyperref}
\\usepackage{tabularx}
\\usepackage{fontawesome5}

\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1.0in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\titleformat{\\section}{\\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries}{}{0em}{}[\\color{NavyBlue}\\hrule height 1.2pt \\vspace{-5pt}]

\\begin{document}
\\begin{center}
    {\\Huge \\scshape \\textbf{JOHN DOE}} \\\\ \\vspace{2pt}
    \\small Full-Stack Software Engineer $|$ Bangalore, India \\\\
    \\small +91 98765 43210 $|$ john.doe@email.com $|$ linkedin.com/in/johndoe $|$ github.com/johndoe
\\end{center}

\\section{Technical Skills}
\\begin{itemize}[leftmargin=0.15in, label={}]
  \\small{\\item{
   \\textbf{Languages}{: JavaScript, TypeScript, Python, C++, SQL, HTML5/CSS3} \\\\
   \\textbf{Frameworks}{: React.js, Node.js, Express, Next.js, Tailwind CSS} \\\\
   \\textbf{Cloud \\& Tools}{: Git, Docker, AWS (S3, EC2), Postman, MongoDB, PostgreSQL}
  }}
\\end{itemize}

\\section{Work Experience}
\\begin{itemize}[leftmargin=0.15in, label={}]
  \\item
    \\begin{tabularx}{\\textwidth}{X r}
      \\textbf{Full-Stack Engineering Intern} $|$ \\emph{TechCorp India} & \\textbf{June 2025 -- Aug 2025} \\\\
    \\end{tabularx}
    \\begin{itemize}[leftmargin=0.2in]
      \\item Built RESTful APIs serving 50k daily active users with 99.9\\% system uptime.
      \\item Reduced page load latency by 35\\% through code splitting and asset optimization.
    \\end{itemize}
\\end{itemize}

\\section{Projects}
\\begin{itemize}[leftmargin=0.15in, label={}]
  \\item
    \\begin{tabularx}{\\textwidth}{X r}
      \\textbf{InternCatalyst Microservices Portal} $|$ \\emph{React, Node.js, AWS} & \\textbf{2025} \\\\
    \\end{tabularx}
    \\begin{itemize}[leftmargin=0.2in]
      \\item Designed microservices architecture handling student profile verifications.
      \\item Developed Python NLP resume parser extracting skills with 95\\% accuracy.
    \\end{itemize}
\\end{itemize}

\\end{document}`
  },
  {
    id: 'tpl-2',
    title: 'AI & Data Science Specialist',
    category: 'Data Science & AI',
    atsScore: '98%',
    format: 'PDF / DOCX / LaTeX',
    downloads: '11,800+',
    idealFor: 'Machine Learning Engineers, Data Analysts & AI Researchers',
    description: 'Highlights ML model benchmarks, Python data libraries, Kaggle rankings, and statistical project outcomes.',
    tags: ['ML Benchmarks', 'Python Data Stack', 'Kaggle Verified'],
    color: '#0284c7',
    layoutStyle: 'single-column-ats',
    name: 'SARAH JENNINGS',
    subtitle: 'Data Scientist & AI Researcher | Kaggle Grandmaster',
    sections: [
      { title: 'MACHINE LEARNING STACK', content: 'PyTorch, TensorFlow, Scikit-Learn, Pandas, NumPy, OpenCV' },
      { title: 'FEATURED AI PROJECTS', content: '• Predictive Healthcare Model (96.4% diagnostic accuracy) • BERT NLP Sentiment Classifier' },
      { title: 'EDUCATION', content: 'B.Tech in AI & Data Science | CGPA: 9.1/10' }
    ],
    previewText: `SARAH JENNINGS
Data Scientist & AI Researcher | Hyderabad, India
Email: sarah.j@email.com | Kaggle: kaggle.com/sarahj | LinkedIn: linkedin.com/in/sarahj

CORE COMPETENCIES
Machine Learning: PyTorch, TensorFlow, Scikit-learn, OpenCV, HuggingFace Transformers
Data Analytics: Pandas, NumPy, SQL, Tableau, PowerBI, Statistical Modeling
Engineering: Python, R, C++, Git, FastAPIs, Docker

EDUCATION
B.Tech in Artificial Intelligence & Data Science | 2022 - 2026 (CGPA: 9.1/10)

FEATURED PROJECTS
• Predictive Healthcare AI Model: Trained ResNet-50 CNN achieving 96.4% diagnostic precision.
• NLP Sentiment Classifier: Fine-tuned BERT model on 100k customer reviews for real-time analytics.`,
    customLaTeXCode: `\\documentclass[letterpaper,11pt]{article}
\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage[hidelinks]{hyperref}
\\usepackage{tabularx}

\\titleformat{\\section}{\\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries}{}{0em}{}[\\color{Cerulean}\\hrule height 1.2pt \\vspace{-5pt}]

\\begin{document}
\\begin{center}
    {\\Huge \\scshape \\textbf{SARAH JENNINGS}} \\\\ \\vspace{2pt}
    \\small Data Scientist \\& AI Researcher $|$ Kaggle Grandmaster \\\\
    \\small sarah.j@email.com $|$ kaggle.com/sarahj $|$ linkedin.com/in/sarahj
\\end{center}

\\section{Machine Learning Competencies}
\\begin{itemize}[leftmargin=0.15in, label={}]
  \\small{\\item{
   \\textbf{Frameworks}{: PyTorch, TensorFlow, Scikit-Learn, OpenCV, HuggingFace Transformers} \\\\
   \\textbf{Analytics}{: Pandas, NumPy, SQL, Tableau, PowerBI, Statistical Modeling} \\\\
   \\textbf{Engineering}{: Python, R, C++, FastAPIs, Docker, Git}
  }}
\\end{itemize}

\\section{Featured AI Projects}
\\begin{itemize}[leftmargin=0.15in, label={}]
  \\item \\textbf{Predictive Healthcare AI Model}: Trained ResNet-50 CNN achieving 96.4\\% diagnostic precision.
  \\item \\textbf{NLP Sentiment Classifier}: Fine-tuned BERT model on 100k customer reviews for real-time analytics.
\\end{itemize}

\\end{document}`
  },
  {
    id: 'tpl-8',
    title: 'Full-Stack Web Developer ATS',
    category: 'Web & Mobile Dev',
    atsScore: '99%',
    format: 'PDF / DOCX / LaTeX',
    downloads: '15,600+',
    idealFor: 'MERN / MEAN Stack Developers & Software Engineers',
    description: 'High-scannability standard ATS layout trusted by top fortune 500 tech hiring managers and campus recruiters.',
    tags: ['MERN Stack', 'ATS Standard', '100% Recruiter Approved'],
    color: '#16a34a',
    layoutStyle: 'single-column-ats',
    name: 'DAVID CHEN',
    subtitle: 'Full-Stack Developer | MERN Stack Specialist',
    sections: [
      { title: 'TECHNICAL EXPERTISE', content: 'React.js, Redux, Node.js, Express, MongoDB, TypeScript, REST & GraphQL' },
      { title: 'DEVELOPMENT PROJECTS', content: '• Real-Time Chat Platform • E-Commerce Checkout Microservice' }
    ],
    previewText: `DAVID CHEN
Full-Stack Developer | MERN Stack Specialist
Email: david.chen@email.com | Portfolio: davidchen.dev

TECHNICAL EXPERTISE
Frontend: React.js, Redux, HTML5, CSS3, Tailwind CSS, TypeScript
Backend: Node.js, Express.js, REST APIs, GraphQL, MongoDB`,
    customLaTeXCode: `\\documentclass[letterpaper,11pt]{article}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage[hidelinks]{hyperref}
\\usepackage{tabularx}

\\titleformat{\\section}{\\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries}{}{0em}{}[\\color{ForestGreen}\\hrule height 1.2pt \\vspace{-5pt}]

\\begin{document}
\\begin{center}
    {\\Huge \\scshape \\textbf{DAVID CHEN}} \\\\ \\vspace{2pt}
    \\small Full-Stack Developer $|$ MERN Stack Specialist \\\\
    \\small david.chen@email.com $|$ davidchen.dev $|$ github.com/davidchen
\\end{center}

\\section{Technical Stack}
\\begin{itemize}[leftmargin=0.15in, label={}]
  \\small{\\item{
   \\textbf{Frontend}{: React.js, Redux Toolkit, TypeScript, HTML5, CSS3, Tailwind} \\\\
   \\textbf{Backend}{: Node.js, Express.js, REST APIs, GraphQL, MongoDB, PostgreSQL}
  }}
\\end{itemize}

\\section{Projects}
\\begin{itemize}[leftmargin=0.15in, label={}]
  \\item \\textbf{Real-Time Chat Platform}: Built WebSocket messaging system handling 10k concurrent channels.
  \\item \\textbf{E-Commerce Microservice}: Designed automated stripe checkout flow with sub-second latency.
\\end{itemize}

\\end{document}`
  },
  {
    id: 'tpl-4',
    title: 'DevOps & Cloud Systems Engineer',
    category: 'Cloud & DevOps',
    atsScore: '97%',
    format: 'PDF / DOCX / LaTeX',
    downloads: '8,900+',
    idealFor: 'DevOps Interns, Site Reliability Engineers & Cloud Admins',
    description: 'Tailored for CI/CD automation pipelines, Kubernetes clusters, Docker containerization, and AWS/Azure cloud infrastructure.',
    tags: ['Docker / K8s', 'CI/CD Pipelines', 'AWS Certified'],
    color: '#059669',
    layoutStyle: 'single-column-ats',
    name: 'PRIYA SHARMA',
    subtitle: 'DevOps & Cloud Systems Engineer | AWS Certified',
    sections: [
      { title: 'CLOUD & INFRASTRUCTURE', content: 'AWS (EC2, S3, RDS, Lambda, EKS), Docker, Kubernetes, Terraform' },
      { title: 'AUTOMATION PIPELINES', content: 'GitHub Actions, Jenkins, Ansible, Bash Scripting, Prometheus, Grafana' }
    ],
    previewText: `PRIYA SHARMA
DevOps & Cloud Systems Engineer | AWS Certified Developer
Email: priya.devops@email.com | GitHub: github.com/priyadevops

CLOUD & INFRASTRUCTURE SKILLS
Cloud: AWS (EC2, S3, RDS, Lambda, EKS), Google Cloud Platform
DevOps: Docker, Kubernetes, Terraform, Jenkins, GitHub Actions, Ansible
Monitoring: Prometheus, Grafana, ELK Stack, Bash Scripting`,
    customLaTeXCode: `\\documentclass[letterpaper,11pt]{article}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage[hidelinks]{hyperref}

\\titleformat{\\section}{\\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries}{}{0em}{}[\\color{Teal}\\hrule height 1.2pt \\vspace{-5pt}]

\\begin{document}
\\begin{center}
    {\\Huge \\scshape \\textbf{PRIYA SHARMA}} \\\\ \\vspace{2pt}
    \\small DevOps \\& Cloud Systems Engineer $|$ AWS Certified \\\\
    \\small priya.devops@email.com $|$ github.com/priyadevops $|$ linkedin.com/in/priyadevops
\\end{center}

\\section{Cloud \\& Infrastructure}
\\begin{itemize}[leftmargin=0.15in, label={}]
  \\small{\\item{
   \\textbf{Cloud Platforms}{: AWS (EC2, S3, RDS, Lambda, EKS), GCP} \\\\
   \\textbf{DevOps Tools}{: Docker, Kubernetes, Terraform, Jenkins, GitHub Actions, Ansible} \\\\
   \\textbf{Monitoring}{: Prometheus, Grafana, ELK Stack, Bash Scripting}
  }}
\\end{itemize}

\\end{document}`
  },
  {
    id: 'tpl-7',
    title: 'Cybersecurity & Ethical Hacking Resume',
    category: 'Cybersecurity',
    atsScore: '98%',
    format: 'PDF / DOCX / LaTeX',
    downloads: '6,800+',
    idealFor: 'Security Analysts, Ethical Hackers & SOC Analysts',
    description: 'Displays vulnerability assessment tools, OWASP Top 10 mastery, CTF competition accolades, and network security compliance.',
    tags: ['OWASP Top 10', 'Penetration Testing', 'CTF Top Ranker'],
    color: '#dc2626',
    layoutStyle: 'single-column-ats',
    name: 'KAVIN MEHTA',
    subtitle: 'Cybersecurity & Penetration Tester | CEH Candidate',
    sections: [
      { title: 'SECURITY COMPETENCIES', content: 'Burp Suite, Wireshark, Nmap, Metasploit, Nessus, Kali Linux' },
      { title: 'ACCOMPLISHMENTS', content: 'TryHackMe Top 1% Ranker | Identified 3 CVE vulnerability disclosures' }
    ],
    previewText: `KAVIN MEHTA
Cybersecurity Analyst & Penetration Tester | CEH Candidate
Email: kavin.sec@email.com | TryHackMe Rank: Top 1%

SECURITY COMPETENCIES
Tools: Wireshark, Burp Suite, Nmap, Metasploit, Nessus, Kali Linux
Skills: Network Security, OWASP Top 10, Threat Hunting, Log Audit`,
    customLaTeXCode: `\\documentclass[letterpaper,11pt]{article}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}

\\titleformat{\\section}{\\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries}{}{0em}{}[\\color{Red}\\hrule height 1.2pt \\vspace{-5pt}]

\\begin{document}
\\begin{center}
    {\\Huge \\scshape \\textbf{KAVIN MEHTA}} \\\\ \\vspace{2pt}
    \\small Cybersecurity Analyst \\& Penetration Tester $|$ CEH Candidate \\\\
    \\small kavin.sec@email.com $|$ TryHackMe Top 1\\% Ranker
\\end{center}

\\section{Security Toolset}
\\begin{itemize}[leftmargin=0.15in, label={}]
  \\small{\\item{
   \\textbf{Audit Tools}{: Wireshark, Burp Suite, Nmap, Metasploit, Nessus, Kali Linux} \\\\
   \\textbf{Core Domain}{: Network Security, OWASP Top 10, Threat Hunting, Vulnerability Disclosures}
  }}
\\end{itemize}

\\end{document}`
  },
  {
    id: 'tpl-10',
    title: 'Engineering Campus Placement (CS / IT Freshers)',
    category: 'Campus & Freshers',
    atsScore: '99%',
    format: 'PDF / DOCX / LaTeX',
    downloads: '18,500+',
    idealFor: 'Final Year Engineering & CS/IT Freshers',
    description: 'The #1 recommended resume template for college campus placement drives (AIET & Top Tier Universities across India).',
    tags: ['Campus Approved', 'Fresher Friendly', 'High Placement Rate'],
    color: '#2563eb',
    layoutStyle: 'single-column-ats',
    name: 'RAHUL KUMAR',
    subtitle: 'B.Tech CS Candidate | AIET Campus Candidate (2026 Batch)',
    sections: [
      { title: 'ACADEMIC RECORD', content: 'B.Tech CSE: 8.8 CGPA | Class XII CBSE: 94.2% | Class X CBSE: 96.0%' },
      { title: 'CAPSTONE PROJECTS', content: '1. Smart Internship Portal (React/Node) 2. Face Recognition Attendance (Python)' }
    ],
    previewText: `RAHUL KUMAR
B.Tech Computer Science | AIET Campus Candidate (2026 Batch)
Email: rahul.kumar@email.com | Phone: +91 98123 45678

EDUCATION & ACADEMICS
Alva's Institute of Engineering & Technology (AIET) | B.Tech CSE (8.8 CGPA)
Class XII (CBSE): 94.2% | Class X (CBSE): 96.0%

KEY TECHNICAL PROJECTS
1. Smart Internship Portal: Built React + Node.js web application for campus placements.
2. Automated Attendance System: Python OpenCV facial recognition app.`,
    customLaTeXCode: `\\documentclass[letterpaper,11pt]{article}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{tabularx}

\\titleformat{\\section}{\\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries}{}{0em}{}[\\color{RoyalBlue}\\hrule height 1.2pt \\vspace{-5pt}]

\\begin{document}
\\begin{center}
    {\\Huge \\scshape \\textbf{RAHUL KUMAR}} \\\\ \\vspace{2pt}
    \\small B.Tech Computer Science $|$ AIET Campus Candidate (2026 Batch) \\\\
    \\small rahul.kumar@email.com $|$ +91 98123 45678
\\end{center}

\\section{Academics}
\\begin{itemize}[leftmargin=0.15in, label={}]
  \\item
    \\begin{tabularx}{\\textwidth}{X r}
      \\textbf{Alva's Institute of Engineering \\& Technology (AIET)} & \\textbf{8.8 CGPA} \\\\
      \\textit{Class XII (CBSE): 94.2\\% $|$ Class X (CBSE): 96.0\\%} & \\textit{2022 -- 2026} \\\\
    \\end{tabularx}
\\end{itemize}

\\section{Projects}
\\begin{itemize}[leftmargin=0.15in, label={}]
  \\item \\textbf{Smart Internship Portal}: React + Node.js web application for campus placement matching.
  \\item \\textbf{Automated Attendance System}: Python OpenCV facial recognition application.
\\end{itemize}

\\end{document}`
  },
  {
    id: 'tpl-11',
    title: 'Mobile App Developer (iOS / Android)',
    category: 'Web & Mobile Dev',
    atsScore: '96%',
    format: 'PDF / DOCX / LaTeX',
    downloads: '6,100+',
    idealFor: 'Flutter, React Native & Native Mobile Engineers',
    description: 'Displays App Store & Play Store publication badges, cross-platform UI architectures, and mobile backend integration.',
    tags: ['Flutter / React Native', 'Play Store Live Apps'],
    color: '#0284c7',
    layoutStyle: 'single-column-ats',
    name: 'SNEHA REDDY',
    subtitle: 'Mobile App Developer (Flutter & iOS Specialist)',
    sections: [
      { title: 'MOBILE FRAMEWORKS', content: 'Flutter, Dart, React Native, Swift, Firebase, SQLite, Bloc Architecture' },
      { title: 'PUBLISHED APPS', content: '2 Live Google Play Store Apps (10k+ Cumulative Downloads)' }
    ],
    previewText: `SNEHA REDDY
Mobile Application Engineer (Flutter & iOS)
Email: sneha.mobile@email.com | Play Store Portfolio: 2 Published Apps

MOBILE SKILLS
Frameworks: Flutter, Dart, React Native, Swift, Android SDK
Backend: Firebase, REST APIs, SQLite, State Management (Provider, Bloc)`,
    customLaTeXCode: `\\documentclass[letterpaper,11pt]{article}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}

\\titleformat{\\section}{\\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries}{}{0em}{}[\\color{NavyBlue}\\hrule height 1.2pt \\vspace{-5pt}]

\\begin{document}
\\begin{center}
    {\\Huge \\scshape \\textbf{SNEHA REDDY}} \\\\ \\vspace{2pt}
    \\small Mobile Application Engineer (Flutter \\& iOS) \\\\
    \\small sneha.mobile@email.com $|$ Play Store: 2 Published Live Apps
\\end{center}

\\section{Mobile Stack}
\\begin{itemize}[leftmargin=0.15in, label={}]
  \\small{\\item{
   \\textbf{Frameworks}{: Flutter, Dart, React Native, Swift, Android SDK} \\\\
   \\textbf{Backend \\& State}{: Firebase, REST APIs, SQLite, Provider, Bloc Architecture}
  }}
\\end{itemize}

\\end{document}`
  },
  {
    id: 'tpl-13',
    title: 'Data Engineer & Pipeline Architect',
    category: 'Data Science & AI',
    atsScore: '98%',
    format: 'PDF / DOCX / LaTeX',
    downloads: '5,400+',
    idealFor: 'Data Engineers, ETL Developers & Big Data Analysts',
    description: 'Tailored for Apache Spark, Snowflake, Airflow, SQL data warehousing, and automated ETL pipeline architecture.',
    tags: ['Apache Spark', 'ETL Pipelines', 'Snowflake / SQL'],
    color: '#059669',
    layoutStyle: 'single-column-ats',
    name: 'VIKRAM SINGH',
    subtitle: 'Data Pipeline & Big Data Architect',
    sections: [
      { title: 'DATA PIPELINE STACK', content: 'Apache Spark, Airflow, Kafka, Snowflake, PostgreSQL, AWS Redshift' },
      { title: 'ETL PROJECTS', content: 'Built streaming data pipeline processing 2M daily records' }
    ],
    previewText: `VIKRAM SINGH
Data Pipeline & Big Data Engineer | Email: vikram.data@email.com

DATA ENGINEERING STACK
Big Data: Apache Spark, Hadoop, Apache Airflow, Kafka
Databases & Cloud: Snowflake, PostgreSQL, AWS Redshift, BigQuery`,
    customLaTeXCode: `\\documentclass[letterpaper,11pt]{article}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}

\\titleformat{\\section}{\\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries}{}{0em}{}[\\color{DarkGreen}\\hrule height 1.2pt \\vspace{-5pt}]

\\begin{document}
\\begin{center}
    {\\Huge \\scshape \\textbf{VIKRAM SINGH}} \\\\ \\vspace{2pt}
    \\small Data Pipeline \\& Big Data Engineer \\\\
    \\small vikram.data@email.com $|$ linkedin.com/in/vikramdata
\\end{center}

\\section{Data Architecture Stack}
\\begin{itemize}[leftmargin=0.15in, label={}]
  \\small{\\item{
   \\textbf{Engine}{: Apache Spark, Hadoop, Apache Airflow, Kafka} \\\\
   \\textbf{Databases}{: Snowflake, PostgreSQL, AWS Redshift, BigQuery}
  }}
\\end{itemize}

\\end{document}`
  },
  {
    id: 'tpl-ai-llm',
    title: 'AI & LLM Prompt Engineer / Machine Learning Specialist',
    category: 'Artificial Intelligence',
    atsScore: '99%',
    format: 'PDF / DOCX / LaTeX',
    downloads: '14,200+',
    idealFor: 'Generative AI Developers, LLM Fine-tuners & PyTorch Engineers',
    description: 'Designed for Generative AI professionals working with OpenAI APIs, LangChain, LlamaIndex, RAG pipeline architecture, and PyTorch model fine-tuning.',
    tags: ['Generative AI', 'LangChain / RAG', 'PyTorch & Fine-Tuning'],
    color: '#8b5cf6',
    layoutStyle: 'single-column-ats',
    name: 'ARJUN KASHYAP',
    subtitle: 'AI & Generative Language Model Engineer',
    sections: [
      { title: 'AI STACK', content: 'PyTorch, HuggingFace, OpenAI API, LangChain, LlamaIndex, Vector DBs (Pinecone, Chroma), Fine-Tuning (LoRA)' },
      { title: 'LLM PROJECTS', content: 'Enterprise RAG Agent with 98% retrieval accuracy over 50,000 corporate documents' }
    ],
    previewText: `ARJUN KASHYAP
AI & Generative Language Model Engineer | arjun.ai@email.com | github.com/arjun-ai

AI & LLM ARCHITECTURE STACK
Frameworks: PyTorch, HuggingFace Transformers, LangChain, LlamaIndex, vLLM
Vector DBs: Pinecone, ChromaDB, Qdrant | Techniques: RAG, LoRA, QLoRA Fine-tuning

AI EXPERIENCE & PROJECTS
Senior Generative AI Specialist | Nexus AI (2023 - Present)
• Engineered RAG Knowledge Base indexing 50k+ technical PDFs with Sub-200ms latency.
• Fine-tuned LLaMA-3 8B model using LoRA, achieving 94% domain benchmark accuracy.`,
    customLaTeXCode: `\\documentclass[letterpaper,11pt]{article}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{hyperref}

\\titleformat{\\section}{\\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries}{}{0em}{}[\\color{Purple}\\hrule height 1.2pt \\vspace{-5pt}]

\\begin{document}
\\begin{center}
    {\\Huge \\scshape \\textbf{ARJUN KASHYAP}} \\\\ \\vspace{2pt}
    \\small AI \\& Generative Language Model Engineer \\\\
    \\small arjun.ai@email.com $|$ github.com/arjun-ai $|$ linkedin.com/in/arjun-ai
\\end{center}

\\section{Generative AI \\& Machine Learning Stack}
\\begin{itemize}[leftmargin=0.15in, label={}]
  \\small{\\item{
   \\textbf{LLM Architecture}{: LangChain, LlamaIndex, RAG Pipelines, Vector DBs (Pinecone, Chroma)} \\\\
   \\textbf{Modeling}{: PyTorch, HuggingFace Transformers, LoRA/QLoRA Fine-Tuning, vLLM, DeepSpeed}
  }}
\\end{itemize}

\\section{AI Engineering Experience}
\\textbf{Senior Generative AI Specialist} \\hfill Nexus AI Labs (2023 -- Present) \\\\
\\begin{itemize}
    \\item Built RAG search engine indexing 50,000+ technical documents using Pinecone vector database.
    \\item Fine-tuned LLaMA-3 8B model on proprietary IT knowledge base using LoRA technique.
\\end{itemize}

\\end{document}`
  },
  {
    id: 'tpl-backend-java',
    title: 'Backend & Microservices Java / Go Engineer',
    category: 'Backend Development',
    atsScore: '98%',
    format: 'PDF / DOCX / LaTeX',
    downloads: '18,900+',
    idealFor: 'Java Spring Boot Developers, Go Engineers & Distributed Systems Developers',
    description: 'Optimized for high-throughput distributed microservices, gRPC, Kafka event streaming, Redis caching, and Spring Boot enterprise applications.',
    tags: ['Java Spring Boot', 'Golang / gRPC', 'Kafka & Distributed Systems'],
    color: '#dc2626',
    layoutStyle: 'single-column-ats',
    name: 'MANISH KUMAR',
    subtitle: 'Senior Java & Go Backend Systems Engineer',
    sections: [
      { title: 'BACKEND TECH STACK', content: 'Java 17, Spring Boot, Golang, gRPC, Apache Kafka, Redis, PostgreSQL, Docker' },
      { title: 'DISTRIBUTED EXPERIENCE', content: 'Architected payment processing engine handling $12M daily transactions' }
    ],
    previewText: `MANISH KUMAR
Senior Java & Go Backend Systems Engineer | manish.backend@email.com

CORE TECHNICAL SKILLS
Languages: Java 17+, Golang, SQL, C++
Frameworks & Middleware: Spring Boot, Microservices, gRPC, Kafka, Redis, PostgreSQL

DISTRIBUTED SYSTEMS EXPERIENCE
Senior Backend Engineer | FinTech Systems (2021 - Present)
• Designed resilient microservices architecture handling 15,000 requests per second.
• Reduced database query latency by 45% using Redis caching and PostgreSQL partitioning.`,
    customLaTeXCode: `\\documentclass[letterpaper,11pt]{article}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}

\\titleformat{\\section}{\\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries}{}{0em}{}[\\color{Red}\\hrule height 1.2pt \\vspace{-5pt}]

\\begin{document}
\\begin{center}
    {\\Huge \\scshape \\textbf{MANISH KUMAR}} \\\\ \\vspace{2pt}
    \\small Senior Java \\& Go Backend Systems Engineer \\\\
    \\small manish.backend@email.com $|$ github.com/manish-backend
\\end{center}

\\section{Core Technical Stack}
\\begin{itemize}[leftmargin=0.15in, label={}]
  \\small{\\item{
   \\textbf{Languages}{: Java 17+, Golang, SQL, C++} \\\\
   \\textbf{Enterprise Backend}{: Spring Boot, Microservices, gRPC, Kafka, Redis, Docker, Kubernetes}
  }}
\\end{itemize}

\\section{Backend Systems Experience}
\\textbf{Senior Backend Architect} \\hfill FinTech Global (2021 -- Present) \\\\
\\begin{itemize}
    \\item Scaled payment gateway engine to process 15,000 transactions per second with 99.999\\% uptime.
    \\item Integrated Kafka event streaming for real-time fraud detection alerts.
\\end{itemize}

\\end{document}`
  },
  {
    id: 'tpl-cloud-arch',
    title: 'Cloud Solutions Architect (AWS / Azure / GCP)',
    category: 'Cloud Engineering',
    atsScore: '100%',
    format: 'PDF / DOCX / LaTeX',
    downloads: '16,400+',
    idealFor: 'AWS Certified Solutions Architects, Cloud Infrastructure & Cost Optimization Leads',
    description: 'Clean ATS structure highlighting multi-cloud enterprise architecture, IAM governance, Disaster Recovery (DR), and cloud cost reduction strategies.',
    tags: ['AWS Solutions Architect', 'Multi-Cloud Architecture', 'IAM & Cost Optimization'],
    color: '#0284c7',
    layoutStyle: 'single-column-ats',
    name: 'SNEHA REDDY',
    subtitle: 'Principal AWS & Multi-Cloud Solutions Architect',
    sections: [
      { title: 'CLOUD CREDENTIALS', content: 'AWS Solutions Architect Professional, Azure Solutions Architect Expert, CKA' },
      { title: 'ENTERPRISE IMPACT', content: 'Migrated 120+ legacy servers to AWS cloud, reducing infrastructure overhead by $340k/yr' }
    ],
    previewText: `SNEHA REDDY
Principal AWS & Multi-Cloud Solutions Architect | sneha.cloud@email.com

CLOUD CERTIFICATIONS & STACK
Certifications: AWS Certified Solutions Architect Professional, Certified Kubernetes Administrator
Cloud Platforms: AWS (EC2, EKS, RDS, S3, IAM, CloudFront), Azure, GCP

CLOUD ARCHITECTURE EXPERIENCE
Principal Cloud Architect | CloudCorp Tech (2020 - Present)
• Managed $2.4M annual AWS infrastructure budget across 80+ production accounts.
• Engineered Disaster Recovery (DR) strategy guaranteeing RPO < 5 mins and RTO < 15 mins.`,
    customLaTeXCode: `\\documentclass[letterpaper,11pt]{article}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}

\\titleformat{\\section}{\\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries}{}{0em}{}[\\color{SkyBlue}\\hrule height 1.2pt \\vspace{-5pt}]

\\begin{document}
\\begin{center}
    {\\Huge \\scshape \\textbf{SNEHA REDDY}} \\\\ \\vspace{2pt}
    \\small Principal AWS \\& Multi-Cloud Solutions Architect \\\\
    \\small sneha.cloud@email.com $|$ linkedin.com/in/snehacloud
\\end{center}

\\section{Cloud Certifications \\& Competencies}
\\begin{itemize}[leftmargin=0.15in, label={}]
  \\small{\\item{
   \\textbf{Certifications}{: AWS Solutions Architect Professional, Certified Kubernetes Administrator (CKA)} \\\\
   \\textbf{Cloud Ecosystem}{: AWS (EKS, RDS, IAM, VPC, Route53), Azure, GCP, Cloud Security, Cost Tuning}
  }}
\\end{itemize}

\\section{Enterprise Cloud Leadership}
\\textbf{Principal Cloud Architect} \\hfill CloudCorp Tech (2020 -- Present) \\\\
\\begin{itemize}
    \\item Automated multi-region AWS cloud migration reducing operating costs by \\$340,000 annually.
    \\item Configured zero-trust IAM governance and AWS GuardDuty security monitoring across 80 accounts.
\\end{itemize}

\\end{document}`
  },
  {
    id: 'tpl-it-pm',
    title: 'IT Project Manager & Scrum Master (Agile / PMP)',
    category: 'IT Management',
    atsScore: '97%',
    format: 'PDF / DOCX / LaTeX',
    downloads: '11,800+',
    idealFor: 'Agile Project Managers, Scrum Masters, PMP Leads & Delivery Directors',
    description: 'Formatted for IT delivery managers leading cross-functional engineering teams, Jira sprint planning, SAFe framework, and client stakeholder management.',
    tags: ['PMP Certified', 'Scrum Master / Agile', 'Jira & Delivery Lead'],
    color: '#d97706',
    layoutStyle: 'single-column-ats',
    name: 'RAJESH CHAWLA',
    subtitle: 'PMP Certified Senior IT Project Manager',
    sections: [
      { title: 'MANAGEMENT CERTIFICATIONS', content: 'PMP (PMI), Certified ScrumMaster (CSM), SAFe 5 Agilist' },
      { title: 'PROJECT DELIVERY', content: 'Led 14-person software team delivering $4.5M enterprise ERP transformation' }
    ],
    previewText: `RAJESH CHAWLA
PMP Certified Senior IT Project Manager | rajesh.pm@email.com

PROJECT MANAGEMENT CERTIFICATIONS
Certifications: PMP (PMI), Certified ScrumMaster (CSM), SAFe Agilist
Methodologies: Agile Scrum, Kanban, SAFe, Waterfall, Resource Allocation, Risk Management

IT DELIVERY EXPERIENCE
Senior IT Project Lead | Enterprise Solutions (2019 - Present)
• Delivered $4.5M ERP software migration 2 weeks ahead of schedule and 8% under budget.
• Facilitated daily standups, sprint planning, backlog grooming, and retrospective meetings.`,
    customLaTeXCode: `\\documentclass[letterpaper,11pt]{article}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}

\\titleformat{\\section}{\\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries}{}{0em}{}[\\color{Orange}\\hrule height 1.2pt \\vspace{-5pt}]

\\begin{document}
\\begin{center}
    {\\Huge \\scshape \\textbf{RAJESH CHAWLA}} \\\\ \\vspace{2pt}
    \\small PMP Certified Senior IT Project Manager \\\\
    \\small rajesh.pm@email.com $|$ linkedin.com/in/rajeshpm
\\end{center}

\\section{Certifications \\& Methodologies}
\\begin{itemize}[leftmargin=0.15in, label={}]
  \\small{\\item{
   \\textbf{Certifications}{: PMP (PMI), Certified ScrumMaster (CSM), SAFe 5 Agilist} \\\\
   \\textbf{Tooling}{: Jira, Confluence, MS Project, Asana, Agile Delivery, Budgeting, Risk Mitigation}
  }}
\\end{itemize}

\\section{IT Project Delivery Experience}
\\textbf{Senior IT Project Manager} \\hfill Enterprise Solutions (2019 -- Present) \\\\
\\begin{itemize}
    \\item Managed cross-functional delivery team of 14 software engineers building enterprise ERP solution.
    \\item Improved sprint velocity by 30\\% while decreasing defect density by 22\\% using Agile retrospectives.
\\end{itemize}

\\end{document}`
  },
  {
    id: 'tpl-dba-sql',
    title: 'Database Administrator & SQL Optimization Specialist',
    category: 'Database Administration',
    atsScore: '99%',
    format: 'PDF / DOCX / LaTeX',
    downloads: '9,500+',
    idealFor: 'PostgreSQL DBAs, Oracle Database Administrators & High-Availability DB Leads',
    description: 'Designed for DBAs specializing in query tuning, index optimization, sharding, replication, backup recovery strategies, and high-availability clusters.',
    tags: ['PostgreSQL & Oracle', 'SQL Query Tuning', 'High Availability & Replication'],
    color: '#059669',
    layoutStyle: 'single-column-ats',
    name: 'KAVITA MEHTA',
    subtitle: 'Senior Database Administrator & Performance Analyst',
    sections: [
      { title: 'DATABASE STACK', content: 'PostgreSQL, Oracle 19c, MySQL, MongoDB, Redis, PgBouncer, Barman' },
      { title: 'DBA IMPACT', content: 'Optimized SQL queries improving application throughput by 300% on 4TB database' }
    ],
    previewText: `KAVITA MEHTA
Senior Database Administrator & Performance Analyst | kavita.dba@email.com

DATABASE STACK & COMPETENCIES
Relational DBs: PostgreSQL, Oracle 19c, MySQL, Microsoft SQL Server
Specialization: Query Optimization, Index Tuning, Replication, Backup & Recovery, Sharding

DATABASE ADMINISTRATION EXPERIENCE
Senior DBA Specialist | Global Data Systems (2018 - Present)
• Maintained 99.999% availability for 4TB enterprise PostgreSQL production cluster.
• Reduced slow query execution time from 12 seconds to 80 milliseconds via index optimization.`,
    customLaTeXCode: `\\documentclass[letterpaper,11pt]{article}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}

\\titleformat{\\section}{\\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries}{}{0em}{}[\\color{DarkGreen}\\hrule height 1.2pt \\vspace{-5pt}]

\\begin{document}
\\begin{center}
    {\\Huge \\scshape \\textbf{KAVITA MEHTA}} \\\\ \\vspace{2pt}
    \\small Senior Database Administrator \\& Performance Analyst \\\\
    \\small kavita.dba@email.com $|$ linkedin.com/in/kavitadba
\\end{center}

\\section{Database Stack \\& Core Competencies}
\\begin{itemize}[leftmargin=0.15in, label={}]
  \\small{\\item{
   \\textbf{Databases}{: PostgreSQL, Oracle 19c, MySQL, Microsoft SQL Server, MongoDB} \\\\
   \\textbf{DBA Skills}{: SQL Tuning, Index Optimization, Replication, Clustering, Barman Backup, Sharding}
  }}
\\end{itemize}

\\section{Database Engineering Experience}
\\textbf{Senior DBA Specialist} \\hfill Global Data Systems (2018 -- Present) \\\\
\\begin{itemize}
    \\item Managed 4TB PostgreSQL production database serving 500k active daily users.
    \\item Optimized slow database queries reducing CPU utilization by 40\\% across database servers.
\\end{itemize}

\\end{document}`
  },
  {
    id: 'tpl-embedded-iot',
    title: 'Embedded Systems & IoT Firmware Engineer (C/C++ / FreeRTOS)',
    category: 'Embedded Systems',
    atsScore: '98%',
    format: 'PDF / DOCX / LaTeX',
    downloads: '8,200+',
    idealFor: 'Firmware Developers, IoT Engineers, STM32 & Microcontroller Specialists',
    description: 'Targeted resume for low-level C/C++ firmware development, FreeRTOS task scheduling, UART/SPI/I2C protocols, and IoT hardware sensor integration.',
    tags: ['Embedded C/C++', 'FreeRTOS / STM32', 'IoT Protocols (SPI/I2C/UART)'],
    color: '#4f46e5',
    layoutStyle: 'single-column-ats',
    name: 'ADITYA ROY',
    subtitle: 'Embedded Systems & IoT Firmware Lead',
    sections: [
      { title: 'EMBEDDED HARDWARE & SOFTWARE STACK', content: 'Embedded C, C++, FreeRTOS, STM32, ESP32, ARM Cortex-M, SPI, I2C, UART, BLE' },
      { title: 'FIRMWARE PROJECTS', content: 'Designed ultra-low-power IoT smart sensor node operating 3 years on battery' }
    ],
    previewText: `ADITYA ROY
Embedded Systems & IoT Firmware Lead | aditya.firmware@email.com

EMBEDDED HARDWARE & SOFTWARE STACK
Microcontrollers: STM32 (ARM Cortex-M), ESP32, Nordic nRF52, Microchip PIC
Languages & RTOS: Embedded C, C++, FreeRTOS, Embedded Linux
Protocols: SPI, I2C, UART, CAN Bus, BLE, MQTT

FIRMWARE ENGINEERING EXPERIENCE
Senior Firmware Developer | Smart IoT Devices (2020 - Present)
• Developed real-time FreeRTOS firmware for industrial IoT vibration sensors.
• Optimized power management sleep modes extending device battery lifespan to 3+ years.`,
    customLaTeXCode: `\\documentclass[letterpaper,11pt]{article}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}

\\titleformat{\\section}{\\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries}{}{0em}{}[\\color{Indigo}\\hrule height 1.2pt \\vspace{-5pt}]

\\begin{document}
\\begin{center}
    {\\Huge \\scshape \\textbf{ADITYA ROY}} \\\\ \\vspace{2pt}
    \\small Embedded Systems \\& IoT Firmware Lead \\\\
    \\small aditya.firmware@email.com $|$ github.com/aditya-embedded
\\end{center}

\\section{Embedded Systems Hardware \\& Software Stack}
\\begin{itemize}[leftmargin=0.15in, label={}]
  \\small{\\item{
   \\textbf{Microcontrollers}{: STM32 (ARM Cortex-M), ESP32, Nordic nRF52, Microchip PIC} \\\\
   \\textbf{Languages \\& OS}{: Embedded C, C++, FreeRTOS, Embedded Linux, SPI, I2C, UART, BLE}
  }}
\\end{itemize}

\\section{Firmware Engineering Experience}
\\textbf{Senior Firmware Developer} \\hfill Smart IoT Devices (2020 -- Present) \\\\
\\begin{itemize}
    \\item Authored FreeRTOS multi-threaded firmware handling sensor data acquisition over I2C.
    \\item Reduced deep sleep power consumption to 4.2 microamps, extending battery runtime significantly.
\\end{itemize}

\\end{document}`
  },
  {
    id: 'tpl-qa-automation',
    title: 'QA Automation & Software Testing Engineer (Selenium / Cypress)',
    category: 'Quality Assurance',
    atsScore: '99%',
    format: 'PDF / DOCX / LaTeX',
    downloads: '13,100+',
    idealFor: 'SDETs, QA Automation Engineers & Software Test Lead Specialists',
    description: 'Optimized for Software Development Engineers in Test (SDET) showcasing Selenium WebDriver, Cypress, Playwright, API testing, and CI/CD test pipeline integration.',
    tags: ['Selenium / Cypress', 'Playwright & PyTest', 'SDET & CI/CD Testing'],
    color: '#0284c7',
    layoutStyle: 'single-column-ats',
    name: 'PRIYA NAIR',
    subtitle: 'Senior QA Automation Engineer (SDET)',
    sections: [
      { title: 'AUTOMATION TESTING STACK', content: 'Selenium, Cypress, Playwright, Java, Python, PyTest, Postman, Jenkins, TestNG' },
      { title: 'QA FRAMEWORK IMPACT', content: 'Built automated regression suite of 1,200+ test cases reducing release cycle by 60%' }
    ],
    previewText: `PRIYA NAIR
Senior QA Automation Engineer (SDET) | priya.qa@email.com

QA AUTOMATION STACK
Frameworks: Selenium WebDriver, Cypress, Playwright, PyTest, TestNG, RestAssured
Languages & CI/CD: Java, Python, JavaScript, Postman, Jenkins, GitHub Actions

SOFTWARE TESTING EXPERIENCE
Senior SDET Lead | QualityTech Solutions (2020 - Present)
• Built end-to-end automation framework executing 1,200+ test cases in CI/CD pipeline.
• Reduced regression testing execution duration from 3 days to under 45 minutes.`,
    customLaTeXCode: `\\documentclass[letterpaper,11pt]{article}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}

\\titleformat{\\section}{\\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries}{}{0em}{}[\\color{SkyBlue}\\hrule height 1.2pt \\vspace{-5pt}]

\\begin{document}
\\begin{center}
    {\\Huge \\scshape \\textbf{PRIYA NAIR}} \\\\ \\vspace{2pt}
    \\small Senior QA Automation Engineer (SDET) \\\\
    \\small priya.qa@email.com $|$ github.com/priya-sdet
\\end{center}

\\section{QA Automation \\& Testing Stack}
\\begin{itemize}[leftmargin=0.15in, label={}]
  \\small{\\item{
   \\textbf{Frameworks}{: Selenium WebDriver, Cypress, Playwright, PyTest, RestAssured API} \\\\
   \\textbf{Tooling}{: Java, Python, JavaScript, Postman, Jenkins, GitHub Actions, Jira Xray}
  }}
\\end{itemize}

\\section{SDET \\& Quality Assurance Experience}
\\textbf{Senior SDET Lead} \\hfill QualityTech Solutions (2020 -- Present) \\\\
\\begin{itemize}
    \\item Designed parallel test execution framework in Playwright reducing build test time by 75\\%.
    \\item Automated REST API regression testing suite achieving 98\\% code coverage.
\\end{itemize}

\\end{document}`
  },
  {
    id: 'tpl-network-eng',
    title: 'Network Infrastructure & Cisco Security Engineer (CCNP / BGP)',
    category: 'Networking',
    atsScore: '98%',
    format: 'PDF / DOCX / LaTeX',
    downloads: '10,700+',
    idealFor: 'Cisco Certified Network Professionals (CCNP), Network Architects & Enterprise SysAdmins',
    description: 'Tailored for network engineers highlighting Cisco routers/switches, BGP/OSPF routing, Palo Alto firewalls, IPsec VPNs, and enterprise LAN/WAN topology design.',
    tags: ['CCNP / Cisco Certified', 'BGP & OSPF Routing', 'Palo Alto Firewalls'],
    color: '#0369a1',
    layoutStyle: 'single-column-ats',
    name: 'AMITAV VARMA',
    subtitle: 'Senior Network & Infrastructure Security Engineer',
    sections: [
      { title: 'NETWORK CERTIFICATIONS & STACK', content: 'CCNP Enterprise, CCNA, Palo Alto PCNSA, BGP, OSPF, MPLS, IPsec VPN, Cisco Catalyst' },
      { title: 'NETWORK DEPLOYMENTS', content: 'Architected redundant multi-datacenter network backbone with zero downtime' }
    ],
    previewText: `AMITAV VARMA
Senior Network & Infrastructure Security Engineer | amitav.net@email.com

NETWORK CERTIFICATIONS & PROTOCOLS
Certifications: Cisco Certified Network Professional (CCNP Enterprise), Palo Alto PCNSA
Protocols & Hardware: BGP, OSPF, MPLS, IPsec VPN, VXLAN, Cisco Nexus, Palo Alto Firewalls

NETWORK INFRASTRUCTURE EXPERIENCE
Senior Network Engineer | Telecom Global (2019 - Present)
• Managed enterprise WAN topology connecting 45 branch offices with 99.999% uptime.
• Deployed high-availability Palo Alto firewalls implementing intrusion prevention rules.`,
    customLaTeXCode: `\\documentclass[letterpaper,11pt]{article}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}

\\titleformat{\\section}{\\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries}{}{0em}{}[\\color{NavyBlue}\\hrule height 1.2pt \\vspace{-5pt}]

\\begin{document}
\\begin{center}
    {\\Huge \\scshape \\textbf{AMITAV VARMA}} \\\\ \\vspace{2pt}
    \\small Senior Network \\& Infrastructure Security Engineer \\\\
    \\small amitav.net@email.com $|$ linkedin.com/in/amitavnet
\\end{center}

\\section{Network Certifications \\& Protocols}
\\begin{itemize}[leftmargin=0.15in, label={}]
  \\small{\\item{
   \\textbf{Certifications}{: Cisco Certified Network Professional (CCNP), Palo Alto PCNSA} \\\\
   \\textbf{Protocols \\& Hardware}{: BGP, OSPF, MPLS, IPsec VPN, Cisco Nexus, Palo Alto Firewalls}
  }}
\\end{itemize}

\\section{Enterprise Network Experience}
\\textbf{Senior Network Engineer} \\hfill Telecom Global (2019 -- Present) \\\\
\\begin{itemize}
    \\item Engineered redundant enterprise network infrastructure across 3 primary datacenters.
    \\item Configured BGP routing policies and QoS bandwidth prioritization for voice traffic.
\\end{itemize}

\\end{document}`
  },
  {
    id: 'tpl-blockchain-web3',
    title: 'Blockchain & Smart Contract Web3 Engineer (Solidity / Rust)',
    category: 'Web3 & Blockchain',
    atsScore: '97%',
    format: 'PDF / DOCX / LaTeX',
    downloads: '7,900+',
    idealFor: 'Solidity Developers, Smart Contract Auditors & Web3 DApp Engineers',
    description: 'Designed for Web3 developers specializing in Ethereum Solidity smart contracts, Rust Anchor (Solana), Hardhat testing, OpenZeppelin standards, and DeFi protocols.',
    tags: ['Solidity & Rust', 'Ethereum / Web3.js', 'DeFi & Smart Contracts'],
    color: '#7c3aed',
    layoutStyle: 'single-column-ats',
    name: 'DEV DARSHAN',
    subtitle: 'Senior Blockchain & Smart Contract Architect',
    sections: [
      { title: 'WEB3 STACK', content: 'Solidity, Rust, EVM, Hardhat, Foundry, Ethers.js, Web3.js, OpenZeppelin, DeFi' },
      { title: 'BLOCKCHAIN PROJECTS', content: 'Audited and deployed ERC-20 & ERC-721 smart contracts locking $18M TVL' }
    ],
    previewText: `DEV DARSHAN
Senior Blockchain & Smart Contract Architect | dev.web3@email.com | github.com/dev-web3

WEB3 & SMART CONTRACT STACK
Languages: Solidity, Rust, JavaScript, TypeScript
Blockchain Frameworks: EVM, Hardhat, Foundry, OpenZeppelin, Ethers.js, IPFS

BLOCKCHAIN ENGINEERING EXPERIENCE
Senior Smart Contract Lead | CryptoFi Protocol (2021 - Present)
• Designed gas-optimized ERC-20 staking contract processing over $18M Total Value Locked (TVL).
• Conducted security audits resolving reentrancy vulnerabilities prior to mainnet deployment.`,
    customLaTeXCode: `\\documentclass[letterpaper,11pt]{article}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}

\\titleformat{\\section}{\\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries}{}{0em}{}[\\color{Purple}\\hrule height 1.2pt \\vspace{-5pt}]

\\begin{document}
\\begin{center}
    {\\Huge \\scshape \\textbf{DEV DARSHAN}} \\\\ \\vspace{2pt}
    \\small Senior Blockchain \\& Smart Contract Architect \\\\
    \\small dev.web3@email.com $|$ github.com/dev-web3 $|$ linkedin.com/in/devweb3
\\end{center}

\\section{Web3 \\& Smart Contract Stack}
\\begin{itemize}[leftmargin=0.15in, label={}]
  \\small{\\item{
   \\textbf{Languages}{: Solidity, Rust, JavaScript, TypeScript} \\\\
   \\textbf{Blockchain Tools}{: EVM, Hardhat, Foundry, OpenZeppelin, Ethers.js, Web3.js, IPFS}
  }}
\\end{itemize}

\\section{Smart Contract Engineering Experience}
\\textbf{Senior Smart Contract Lead} \\hfill CryptoFi Protocol (2021 -- Present) \\\\
\\begin{itemize}
    \\item Authored gas-optimized ERC-20 staking smart contract handling \\$18M+ Total Value Locked.
    \\item Performed static code analysis and formal verification using Slither and Mythril tools.
\\end{itemize}

\\end{document}`
  },
  {
    id: 'tpl-sysadmin-helpdesk',
    title: 'IT Technical Support & Systems Administrator (Active Directory / Linux)',
    category: 'IT Support',
    atsScore: '99%',
    format: 'PDF / DOCX / LaTeX',
    downloads: '15,600+',
    idealFor: 'Systems Administrators, Helpdesk L2/L3 Specialists & IT Support Leads',
    description: 'Formatted for IT Support Specialists and SysAdmins highlighting Windows Server, Active Directory, Group Policy (GPO), Office 365 administration, and Linux ticket resolution.',
    tags: ['Active Directory / GPO', 'Windows Server & Linux', 'IT Support & SLA'],
    color: '#2563eb',
    layoutStyle: 'single-column-ats',
    name: 'SUMIT SHARMA',
    subtitle: 'Senior IT Systems Administrator & Technical Support Lead',
    sections: [
      { title: 'IT SYSTEMS STACK', content: 'Active Directory, GPO, Office 365, Windows Server 2022, Ubuntu Linux, ServiceNow, VMware' },
      { title: 'HELP DESK IMPACT', content: 'Resolved 3,400+ IT support tickets maintaining 99.2% customer satisfaction SLA score' }
    ],
    previewText: `SUMIT SHARMA
Senior IT Systems Administrator & Technical Support Lead | sumit.it@email.com

IT SYSTEMS & SUPPORT STACK
Systems: Active Directory, Windows Server 2022, Ubuntu Linux, Microsoft 365 Admin Center
Tooling: ServiceNow, Jira Service Desk, VMware vSphere, PowerShell scripting

IT SYSTEMS ADMINISTRATION EXPERIENCE
Senior Systems Administrator | Corporate IT Services (2019 - Present)
• Administered Active Directory domain environment supporting 1,500+ enterprise users.
• Automated user onboarding and account provisioning via custom PowerShell scripts.`,
    customLaTeXCode: `\\documentclass[letterpaper,11pt]{article}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}

\\titleformat{\\section}{\\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries}{}{0em}{}[\\color{RoyalBlue}\\hrule height 1.2pt \\vspace{-5pt}]

\\begin{document}
\\begin{center}
    {\\Huge \\scshape \\textbf{SUMIT SHARMA}} \\\\ \\vspace{2pt}
    \\small Senior IT Systems Administrator \\& Technical Support Lead \\\\
    \\small sumit.it@email.com $|$ linkedin.com/in/sumititsupport
\\end{center}

\\section{IT Systems \\& Administration Stack}
\\begin{itemize}[leftmargin=0.15in, label={}]
  \\small{\\item{
   \\textbf{Systems}{: Active Directory, Windows Server 2022, Ubuntu Linux, Microsoft 365 Admin} \\\\
   \\textbf{Tooling}{: ServiceNow, VMware vSphere, PowerShell Scripting, Group Policy (GPO)}
  }}
\\end{itemize}

\\section{Systems Administration Experience}
\\textbf{Senior Systems Administrator} \\hfill Corporate IT Services (2019 -- Present) \\\\
\\begin{itemize}
    \\item Maintained Active Directory, DNS, and DHCP services for 1,500+ enterprise employees.
    \\item Resolved tier-3 technical escalation tickets maintaining 99.2\\% SLA satisfaction rating.
\\end{itemize}

\\end{document}`
  },
  {
    id: 'tpl-biz-analyst',
    title: 'Business Analyst & Corporate Strategy',
    category: 'Business & Strategy',
    atsScore: '99%',
    format: 'PDF / DOCX / LaTeX',
    downloads: '18,400+',
    idealFor: 'Business Analysts, Strategy Consultants, MBA Freshers & Operations Leads',
    description: 'Tailored for business analysts, corporate strategy specialists, financial modeling, SQL reporting, market research, and executive stakeholder presentations.',
    tags: ['#1 Business Template', 'Business Analyst', 'Strategy & Consulting', 'MBA / BBA'],
    color: '#0d9488',
    layoutStyle: 'single-column-ats',
    name: 'PRIYA SHARMA',
    subtitle: 'Senior Business Analyst | Corporate Strategy & Market Intelligence',
    sections: [
      { title: 'BUSINESS & ANALYTICAL SKILLS', content: 'Market Research, Financial Modeling, Requirement Gathering, Process Mapping (BPMN), SQL, Tableau, PowerBI, Advanced Excel (VBA)' },
      { title: 'CORPORATE STRATEGY EXPERIENCE', content: 'Senior Business Analyst - Global Consulting Group (2021-present) • Business Operations Intern (2020-2021)' },
      { title: 'PROJECTS & CASE STUDIES', content: 'APAC Market Expansion Analysis • Supply Chain Process Optimization' },
      { title: 'EDUCATION & CERTIFICATIONS', content: 'MBA in General Management (GPA 3.9/4.0) • Certified Business Analysis Professional (CBAP)' }
    ],
    previewText: `PRIYA SHARMA
Senior Business Analyst | Corporate Strategy & Market Intelligence | priya.sharma@email.com

BUSINESS & ANALYTICAL SKILLS
Tools & Tech: SQL, Tableau, PowerBI, Advanced Excel (VBA), Jira, Confluence, BPMN 2.0
Core Competencies: Requirement Gathering, Financial Modeling, Process Optimization, Stakeholder Management

EXPERIENCE & IMPACT
Senior Business Analyst | Global Consulting Group (2021 - Present)
• Led market expansion strategy analysis driving 24% YoY revenue growth in APAC region.
• Modeled financial projections and ROI metrics for $12M client acquisition strategy.`,
    customLaTeXCode: `\\documentclass[letterpaper,11pt]{article}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{enumitem}

\\titleformat{\\section}{\\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries}{}{0em}{}[\\color{Teal}\\hrule height 1.2pt \\vspace{-5pt}]

\\begin{document}
\\begin{center}
    {\\Huge \\scshape \\textbf{PRIYA SHARMA}} \\\\ \\vspace{2pt}
    \\small Senior Business Analyst $|$ Corporate Strategy \\& Market Intelligence \\\\
    \\small priya.sharma@email.com $|$ linkedin.com/in/priyasharmabiz
\\end{center}

\\section{Core Competencies \\& Analytics Tools}
\\begin{itemize}[leftmargin=0.15in, label={}]
  \\small{\\item{
   \\textbf{Analytics Tools}{: SQL, Tableau, PowerBI, Advanced Excel (VBA), Jira, BPMN 2.0} \\\\
   \\textbf{Methodologies}{: Requirement Gathering, Financial Modeling, Process Mapping, Market Analysis}
  }}
\\end{itemize}

\\section{Professional Business Experience}
\\textbf{Senior Business Analyst} \\hfill Global Consulting Group (2021 -- Present) \\\\
\\begin{itemize}
    \\item Led market expansion strategy analysis driving 24\\% YoY revenue growth in APAC region.
    \\item Modeled financial projections and ROI metrics for \\$12M client acquisition strategy.
\\end{itemize}

\\end{document}`
  },
  {
    id: 'tpl-digital-mktg',
    title: 'Digital Marketing & Growth Manager',
    category: 'Marketing & Sales',
    atsScore: '98%',
    format: 'PDF / DOCX / LaTeX',
    downloads: '15,200+',
    idealFor: 'Growth Marketers, SEO/SEM Specialists, Social Media Managers & Brand Leads',
    description: 'Optimized for performance marketing, Google Ads/Meta Ads campaign management, conversion rate optimization (CRO), funnel analytics, and content strategy.',
    tags: ['Growth Marketing', 'SEO / PPC Specialist', 'Brand & Media Manager'],
    color: '#e11d48',
    layoutStyle: 'single-column-ats',
    name: 'ANANYA ROY',
    subtitle: 'Digital Marketing Lead | Performance Marketing & SEO Specialist',
    sections: [
      { title: 'MARKETING COMPETENCIES', content: 'Google Ads (Search/Display), Meta Ads Manager, SEO/SEM, GA4, HubSpot, Copywriting, A/B Testing, Email Funnels' },
      { title: 'CAMPAIGN EXPERIENCE', content: 'Managed $250k annual performance marketing budget delivering 4.2x ROAS across paid search and paid social channels' },
      { title: 'MARKETING CERTIFICATIONS', content: 'Google Search Ads Certified, HubSpot Inbound Marketing, Meta Certified Digital Marketing Associate' }
    ],
    previewText: `ANANYA ROY
Digital Marketing Lead | Performance Marketing & SEO Specialist | ananya.mktg@email.com

CORE COMPETENCIES & MARKETING TOOLS
Marketing Channels: Google Ads (Search/Display), Meta Ads, SEO/SEM, Email Automation, Content Marketing
Analytics & Platforms: GA4, Google Tag Manager, HubSpot, SEMrush, Ahrefs, Mailchimp

PERFORMANCE EXPERIENCE
Digital Marketing Lead | E-Commerce Retail Brands (2021 - Present)
• Scaled annual e-commerce revenue by 140% through targeted PPC campaigns and landing page CRO.
• Managed $250k performance ad spend achieving 4.2x return on ad spend (ROAS).`,
    customLaTeXCode: `\\documentclass[letterpaper,11pt]{article}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}

\\titleformat{\\section}{\\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries}{}{0em}{}[\\color{Rose}\\hrule height 1.2pt \\vspace{-5pt}]

\\begin{document}
\\begin{center}
    {\\Huge \\scshape \\textbf{ANANYA ROY}} \\\\ \\vspace{2pt}
    \\small Digital Marketing Lead $|$ Performance Marketing \\& SEO Specialist \\\\
    \\small ananya.mktg@email.com $|$ linkedin.com/in/ananyaroymktg
\\end{center}

\\section{Marketing Stack \\& Competencies}
\\begin{itemize}[leftmargin=0.15in, label={}]
  \\small{\\item{
   \\textbf{Platforms}{: Google Ads, Meta Ads Manager, GA4, HubSpot, SEMrush, Ahrefs, Mailchimp} \\\\
   \\textbf{Specialties}{: Performance Marketing, PPC, Technical SEO, CRO, Funnel Optimization, A/B Testing}
  }}
\\end{itemize}

\\section{Marketing Experience}
\\textbf{Digital Marketing Manager} \\hfill E-Commerce Brands (2021 -- Present) \\\\
\\begin{itemize}
    \\item Managed \\$250k annual ad budget generating 4.2x ROAS across Google Search and Meta Ads.
    \\item Increased organic website search traffic by 180\\% within 9 months through technical SEO audits.
\\end{itemize}

\\end{document}`
  },
  {
    id: 'tpl-finance-bank',
    title: 'Finance, Accounting & Investment Banking',
    category: 'Finance & Accounting',
    atsScore: '99%',
    format: 'PDF / DOCX / LaTeX',
    downloads: '21,600+',
    idealFor: 'Financial Analysts, Chartered Accountants (CA), Investment Banking Associates & Tax Consultants',
    description: 'Built for financial analysts, CA aspirants, corporate accounting, valuation modeling (DCF/LBO), GAAP/IFRS compliance, and audit reporting.',
    tags: ['Financial Analyst', 'CA / CFA Track', 'Investment Banking'],
    color: '#15803d',
    layoutStyle: 'single-column-ats',
    name: 'VIKRAM CHOUDHARY',
    subtitle: 'Financial Analyst | Equity Research & Corporate Finance',
    sections: [
      { title: 'FINANCIAL COMPETENCIES', content: 'DCF & LBO Valuation, Financial Modeling, GAAP/IFRS Compliance, Variance Analysis, SAP FICO, Bloomberg Terminal' },
      { title: 'FINANCIAL ANALYSIS EXPERIENCE', content: 'Performed DCF valuation and M&A due diligence for $15M cross-border corporate acquisition' },
      { title: 'EDUCATION & CERTIFICATIONS', content: 'B.Com (Honours in Finance) • CFA Level II Candidate • NISM Series VIII Equity Derivatives' }
    ],
    previewText: `VIKRAM CHOUDHARY
Financial Analyst | Equity Research & Corporate Finance | vikram.fin@email.com

FINANCIAL MODELING & ANALYTICAL STACK
Financial Modeling: Discounted Cash Flow (DCF), LBO, Comparable Company Analysis (Comps), Budgeting
Software & Tools: Bloomberg Terminal, Capital IQ, SAP FICO, Advanced Excel (VBA), QuickBooks

CORPORATE FINANCE EXPERIENCE
Financial Analyst | Investment Management Partners (2020 - Present)
• Performed comprehensive financial valuation modeling for 12 public tech equities.
• Assisted in deal execution and due diligence for a $15M cross-border M&A acquisition.`,
    customLaTeXCode: `\\documentclass[letterpaper,11pt]{article}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}

\\titleformat{\\section}{\\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries}{}{0em}{}[\\color{DarkGreen}\\hrule height 1.2pt \\vspace{-5pt}]

\\begin{document}
\\begin{center}
    {\\Huge \\scshape \\textbf{VIKRAM CHOUDHARY}} \\\\ \\vspace{2pt}
    \\small Financial Analyst $|$ Equity Research \\& Corporate Finance \\\\
    \\small vikram.fin@email.com $|$ linkedin.com/in/vikramchoudharyfin
\\end{center}

\\section{Financial Modeling \\& Tooling}
\\begin{itemize}[leftmargin=0.15in, label={}]
  \\small{\\item{
   \\textbf{Modeling}{: DCF Valuation, LBO Models, Three-Statement Financial Modeling, Comps Analysis} \\\\
   \\textbf{Tools}{: Bloomberg Terminal, Capital IQ, SAP FICO, Advanced Excel, QuickBooks, SAP}
  }}
\\end{itemize}

\\section{Corporate Finance Experience}
\\textbf{Corporate Finance Analyst} \\hfill Investment Management Partners (2020 -- Present) \\\\
\\begin{itemize}
    \\item Performed financial valuation modeling and equity research for 12 technology sector stocks.
    \\item Conducted M\\&A due diligence for \\$15M acquisition transaction with zero post-closing discrepancies.
\\end{itemize}

\\end{document}`
  },
  {
    id: 'tpl-uiux-product-design',
    title: 'UI/UX Designer & Product Specialist',
    category: 'Design & Product',
    atsScore: '96%',
    format: 'PDF / DOCX / LaTeX',
    downloads: '16,900+',
    idealFor: 'UI/UX Designers, Product Designers, Design Systems Leads & Interaction Designers',
    description: 'Structured for product designers focusing on user research, wireframing, Figma design systems, usability testing, and mobile app design.',
    tags: ['Figma / Design Systems', 'UI/UX Specialist', 'Product Design Portfolio'],
    color: '#7c3aed',
    layoutStyle: 'single-column-ats',
    name: 'SNEHA KULKARNI',
    subtitle: 'Product & UI/UX Designer | Design Systems Lead',
    sections: [
      { title: 'DESIGN SKILLS & TOOLKIT', content: 'Figma, Adobe XD, Illustrator, User Research, Wireframing, Rapid Prototyping, Design Systems, Usability Testing' },
      { title: 'PRODUCT DESIGN EXPERIENCE', content: 'Redesigned mobile banking app checkout flow increasing user conversion rates by 18%' }
    ],
    previewText: `SNEHA KULKARNI
Product & UI/UX Designer | Design Systems Lead | sneha.design@email.com | snehadesign.portfolio

DESIGN COMPETENCIES & TOOLKIT
Tools: Figma, Adobe Creative Cloud, Framer, ProtoPie, Miro, Zeplin, HTML/CSS
Design Practice: User Research, Persona Creation, Wireframing, Prototyping, Design Systems, Usability Audits

PRODUCT DESIGN EXPERIENCE
Senior UI/UX Designer | Digital Product Studio (2021 - Present)
• Created end-to-end design system adopted across 4 web & mobile product lines.
• Redesigned mobile checkout flow increasing user payment conversion by 18%.`,
    customLaTeXCode: `\\documentclass[letterpaper,11pt]{article}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}

\\titleformat{\\section}{\\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries}{}{0em}{}[\\color{Purple}\\hrule height 1.2pt \\vspace{-5pt}]

\\begin{document}
\\begin{center}
    {\\Huge \\scshape \\textbf{SNEHA KULKARNI}} \\\\ \\vspace{2pt}
    \\small Product \\& UI/UX Designer $|$ Design Systems Lead \\\\
    \\small sneha.design@email.com $|$ portfolio: snehadesign.com
\\end{center}

\\section{Design Toolkit \\& Process}
\\begin{itemize}[leftmargin=0.15in, label={}]
  \\small{\\item{
   \\textbf{Design Tools}{: Figma, Adobe XD, Framer, ProtoPie, Miro, Zeplin, HTML/CSS} \\\\
   \\textbf{Methods}{: User Journey Mapping, Wireframing, High-Fidelity Prototyping, Usability Testing}
  }}
\\end{itemize}

\\section{Product Design Experience}
\\textbf{Senior UI/UX Designer} \\hfill Digital Product Studio (2021 -- Present) \\\\
\\begin{itemize}
    \\item Built comprehensive enterprise Figma design system reducing feature design turnaround by 35\\%.
    \\item Redesigned mobile app onboarding flow, driving an 18\\% increase in completed user signups.
\\end{itemize}

\\end{document}`
  },
  {
    id: 'tpl-hr-operations',
    title: 'HR Manager & Talent Acquisition Lead',
    category: 'Human Resources & Operations',
    atsScore: '97%',
    format: 'PDF / DOCX / LaTeX',
    downloads: '13,800+',
    idealFor: 'HR Business Partners, Talent Acquisition Specialists, Recruitment Leads & People Ops',
    description: 'Designed for HR professionals managing end-to-end recruitment, employee engagement, HRIS tools (Workday/BambooHR), payroll, and onboarding.',
    tags: ['Talent Acquisition', 'HR Business Partner', 'People & Operations'],
    color: '#b45309',
    layoutStyle: 'single-column-ats',
    name: 'ROHIT VERMA',
    subtitle: 'HR Generalist & Talent Acquisition Specialist',
    sections: [
      { title: 'HR COMPETENCIES', content: 'Talent Acquisition, Campus Drives, Employee Engagement, HRIS (Workday, Darwinbox), Payroll, Labor Law Compliance' },
      { title: 'HR LEADERSHIP EXPERIENCE', content: 'Recruited 120+ software & business candidates in 1 year maintaining 92% 90-day retention rate' }
    ],
    previewText: `ROHIT VERMA
HR Generalist & Talent Acquisition Specialist | rohit.hr@email.com

HRIS & TALENT MANAGEMENT STACK
Platforms: Workday, BambooHR, Darwinbox, LinkedIn Recruiter, Greenhouse ATS
Core Competencies: End-to-End Recruitment, Campus Hiring, Onboarding, Employee Retention, Labor Compliance

HUMAN RESOURCES EXPERIENCE
HR & Talent Acquisition Lead | Tech Corporate Enterprise (2021 - Present)
• Managed full lifecycle recruitment hiring 120+ engineering and business professionals.
• Achieved a 92% 90-day employee retention rate through structured onboarding programs.`,
    customLaTeXCode: `\\documentclass[letterpaper,11pt]{article}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}

\\titleformat{\\section}{\\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries}{}{0em}{}[\\color{Brown}\\hrule height 1.2pt \\vspace{-5pt}]

\\begin{document}
\\begin{center}
    {\\Huge \\scshape \\textbf{ROHIT VERMA}} \\\\ \\vspace{2pt}
    \\small HR Generalist \\& Talent Acquisition Specialist \\\\
    \\small rohit.hr@email.com $|$ linkedin.com/in/rohithr
\\end{center}

\\section{HRIS \\& Talent Management Stack}
\\begin{itemize}[leftmargin=0.15in, label={}]
  \\small{\\item{
   \\textbf{Platforms}{: Workday, BambooHR, Darwinbox, LinkedIn Recruiter, Greenhouse ATS} \\\\
   \\textbf{HR Competencies}{: End-to-End Recruitment, Campus Drives, Onboarding, Policy Compliance}
  }}
\\end{itemize}

\\section{Human Resources Experience}
\\textbf{Talent Acquisition Lead} \\hfill Tech Corporate Enterprise (2021 -- Present) \\\\
\\begin{itemize}
    \\item Spearheaded hiring initiatives recruiting 120+ technical and business candidates in 12 months.
    \\item Reduced average time-to-hire from 45 days to 28 days while maintaining top candidate quality.
\\end{itemize}

\\end{document}`
  }
];

// Helper to generate full compilable LaTeX code for any template
function generateLaTeXCode(template) {
  if (template.customLaTeXCode) {
    return template.customLaTeXCode;
  }

  const safeName = template.name || 'CANDIDATE NAME';
  const safeSubtitle = template.subtitle || 'Software Engineering Candidate';
  
  return `% =============================================================================
% InternCatalyst Overleaf-Compatible LaTeX Resume Template
% Template Name: ${template.title} (${template.category})
% ATS Parsing Score: ${template.atsScore} | Compiled with pdfLaTeX
% =============================================================================

\\documentclass[letterpaper,11pt]{article}
\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}

\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1.0in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}
\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0pt}

\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries
}{}{0em}{}[\\color{NavyBlue}\\hrule height 1.2pt \\vspace{-5pt}]

\\begin{document}

\\begin{center}
    {\\Huge \\scshape \\textbf{${safeName}}} \\\\ \\vspace{2pt}
    \\small ${safeSubtitle} \\\\ \\vspace{2pt}
    \\small +91 98765 43210 $|$ \\href{mailto:candidate@email.com}{candidate@email.com} $|$ \\href{https://linkedin.com}{linkedin.com/in/candidate} $|$ \\href{https://github.com}{github.com/candidate}
\\end{center}

\\section{Education}
  \\begin{itemize}[leftmargin=0.15in, label={}]
    \\item
      \\begin{tabularx}{\\textwidth}{X r}
        \\textbf{Alva's Institute of Engineering \\& Technology (AIET)} & \\textbf{Mangalore, India} \\\\
        \\textit{Bachelor of Technology in Computer Science \\& Engineering (CGPA: 8.9/10)} & \\textit{2022 -- 2026} \\\\
      \\end{tabularx}
  \\end{itemize}

\\section{Technical Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Primary Stack}{: ${template.sections && template.sections[0] ? template.sections[0].content : 'React.js, Node.js, Python, TypeScript, SQL, HTML5/CSS3'}} \\\\
     \\textbf{Developer Tools}{: Git, GitHub, Docker, Postman, VS Code, Linux, AWS (S3, EC2)} \\\\
     \\textbf{Core Competencies}{: Data Structures \\& Algorithms, System Design, RESTful APIs, Database Optimization}
    }}
 \\end{itemize}

\\section{Internship Experience}
  \\begin{itemize}[leftmargin=0.15in, label={}]
    \\item
      \\begin{tabularx}{\\textwidth}{X r}
        \\textbf{Software Engineering Intern} $|$ \\emph{TechCorp Solutions} & \\textbf{June 2025 -- Aug 2025} \\\\
      \\end{tabularx}
      \\begin{itemize}[leftmargin=0.2in]
        \\item Engineered RESTful APIs serving 50,000+ daily active users with 99.9\\% system uptime reliability.
        \\item Optimized React frontend bundle size reducing page load latency by 35\\% across desktop and mobile.
        \\item Collaborative Git workflow, code reviews, and automated CI/CD pipeline deployments.
      \\end{itemize}
  \\end{itemize}

\\section{Projects}
  \\begin{itemize}[leftmargin=0.15in, label={}]
    \\item
      \\begin{tabularx}{\\textwidth}{X r}
        \\textbf{InternCatalyst Career \\& Placement Portal} $|$ \\emph{React, Node.js, MongoDB, AWS} & \\textbf{2025} \\\\
      \\end{tabularx}
      \\begin{itemize}[leftmargin=0.2in]
        \\item Built end-to-end verified placement platform serving candidate students, colleges, and corporate employers.
        \\item Integrated role-based access control (RBAC), ATS candidate matching engine, and Overleaf LaTeX code editor.
      \\end{itemize}
  \\end{itemize}

\\end{document}
`;
}

// Visual Mini Resume Document Preview Card Component - Rendered with exact line dividers & social header
function ResumeDocumentMockup({ template, onClick }) {
  const accentColor = template.color || '#2563eb';

  return (
    <div 
      onClick={onClick}
      style={{
        width: '100%',
        height: '250px',
        background: '#ffffff',
        border: '1px solid #cbd5e1',
        borderRadius: '8px',
        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)',
        padding: '12px 14px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        userSelect: 'none',
        display: 'flex',
        flexDirection: 'column'
      }}
      className="resume-doc-mockup"
    >
      {template.layoutStyle === 'sidebar-two-col' ? (
        <div style={{ display: 'flex', gap: '8px', flex: 1, margin: '-12px -14px', padding: '10px 14px', background: '#ffffff' }}>
          <div style={{ width: '32%', background: '#f8fafc', borderRight: '1px solid #e2e8f0', padding: '8px 6px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: accentColor, color: '#fff', fontSize: '9px', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {template.name.charAt(0)}
            </div>
            <div style={{ fontSize: '8px', fontWeight: '800', color: '#0f172a', lineHeight: '1.1' }}>{template.name}</div>
            <div style={{ fontSize: '6px', color: '#64748b' }}>{template.subtitle}</div>
            <div style={{ borderTop: `2px solid ${accentColor}`, marginTop: '4px', paddingTop: '4px' }}>
              <div style={{ fontSize: '6.5px', fontWeight: '800', color: accentColor }}>SKILLS</div>
              <div style={{ fontSize: '6px', color: '#475569', marginTop: '2px', lineHeight: '1.2' }}>Python • SQL • ML • Cloud</div>
            </div>
          </div>
          <div style={{ flex: 1, padding: '4px 6px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {template.sections.map((sec, i) => (
              <div key={i}>
                <div style={{ fontSize: '7px', fontWeight: '800', color: '#0f172a', borderBottom: `1px solid ${accentColor}`, paddingBottom: '1px' }}>
                  {sec.title}
                </div>
                <div style={{ fontSize: '6.5px', color: '#475569', marginTop: '2px', lineHeight: '1.3' }}>
                  {sec.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Centered Name & Icon Header */}
          <div style={{ textAlign: 'center', borderBottom: `1.5px solid ${accentColor}`, paddingBottom: '5px', marginBottom: '8px' }}>
            <div style={{ fontSize: '11px', fontWeight: '800', color: '#0f172a', letterSpacing: '0.02em', fontFamily: 'serif' }}>
              {template.name}
            </div>
            <div style={{ fontSize: '6.5px', color: '#0284c7', fontWeight: '600', marginTop: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
              <span>github.com/user</span> • <span>linkedin.com/in/user</span> • <span>email@domain.com</span>
            </div>
          </div>

          {/* Detailed Document Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
            {template.sections.map((sec, i) => (
              <div key={i}>
                <div style={{
                  fontSize: '7px',
                  fontWeight: '800',
                  color: accentColor,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid #cbd5e1',
                  paddingBottom: '1.5px',
                  marginBottom: '2.5px'
                }}>
                  {sec.title}
                </div>
                <div style={{ fontSize: '6.2px', color: '#334155', lineHeight: '1.3' }}>
                  {sec.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hover Overlay */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(2px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          opacity: 0,
          transition: 'opacity 0.2s ease',
          color: '#ffffff'
        }}
        className="mockup-overlay"
      >
        <Code size={24} style={{ color: '#60a5fa' }} />
        <span style={{ fontSize: '0.825rem', fontWeight: '700' }}>Open Overleaf LaTeX Editor</span>
      </div>
    </div>
  );
}

// Overleaf Interactive LaTeX Editor & Live Preview Modal Component
function OverleafEditorModal({ template, onClose, onShowToast }) {
  const [latexCode, setLatexCode] = useState(generateLaTeXCode(template));
  const [candidateName, setCandidateName] = useState(template.name || 'JOHN DOE');
  const [candidateSubtitle, setCandidateSubtitle] = useState(template.subtitle || 'Software Engineering Candidate');
  const [copied, setCopied] = useState(false);

  const handleNameChange = (val) => {
    setCandidateName(val);
    const updatedCode = latexCode.replace(/\\textbf{\\Huge \\scshape \\textbf{.*?}}/, `\\textbf{\\Huge \\scshape \\textbf{${val}}}`);
    setLatexCode(updatedCode);
  };

  const handleSubtitleChange = (val) => {
    setCandidateSubtitle(val);
    const updatedCode = latexCode.replace(/\\small .*? \\\\ \\vspace{2pt}\n    \\small \+91/, `\\small ${val} \\\\ \\vspace{2pt}\n    \\small +91`);
    setLatexCode(updatedCode);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(latexCode);
    setCopied(true);
    onShowToast(`Copied LaTeX Code for "${template.title}"!`);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownloadPDFResume = () => {
    const fileName = `${candidateName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_resume.pdf`;
    const pdfBlobContent = `% PDF Format Resume Document for ${candidateName}
% InternCatalyst Verified IT Resume Template
Candidate Name: ${candidateName}
Role: ${candidateSubtitle}
Template: ${template.title}
ATS Score: ${template.atsScore}

${template.previewText}
`;
    const element = document.createElement("a");
    const file = new Blob([pdfBlobContent], { type: 'application/pdf' });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    onShowToast(`Downloading "${fileName}" in PDF format...`);

    setTimeout(() => {
      window.print();
    }, 800);
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1100 }}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: '1100px', width: '95%', height: '90vh', display: 'flex', flexDirection: 'column', padding: '0', overflow: 'hidden' }}
      >
        {/* Top Action Bar */}
        <div style={{
          background: '#0f172a',
          color: '#ffffff',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #1e293b'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#2563eb', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Code size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#ffffff' }}>
                  Overleaf LaTeX IT Resume Editor
                </h3>
                <span className="badge badge-verified" style={{ background: 'rgba(22, 163, 74, 0.2)', color: '#4ade80', border: '1px solid rgba(74, 222, 128, 0.3)' }}>
                  <ShieldCheck size={12} /> {template.atsScore} ATS Compliant
                </span>
              </div>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                Template: {template.title} ({template.category})
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <button 
              className="btn btn-primary btn-sm"
              onClick={handleDownloadPDFResume}
              style={{ background: '#2563eb', fontWeight: '700' }}
            >
              <Download size={14} /> Download PDF Resume
            </button>

            <button 
              className="btn btn-secondary btn-sm"
              onClick={handleCopyCode}
              style={{ background: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
            >
              {copied ? <Check size={14} style={{ color: '#4ade80' }} /> : <Copy size={14} />}
              {copied ? 'Code Copied!' : 'Copy LaTeX Code'}
            </button>

            <button 
              onClick={onClose}
              style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '0.4rem', borderRadius: '50%' }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Split Pane Editor */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden' }}>
          {/* Left: Code Editor */}
          <div style={{ background: '#0f172a', display: 'flex', flexDirection: 'column', borderRight: '1px solid #1e293b' }}>
            <div style={{
              background: '#1e293b',
              padding: '0.5rem 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.8rem',
              color: '#94a3b8',
              borderBottom: '1px solid #334155'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Code size={14} style={{ color: '#60a5fa' }} />
                <strong>main.tex</strong> (Editable LaTeX Source Code)
              </div>
              <span style={{ fontSize: '0.75rem', color: '#4ade80' }}>● Real-time Sync Active</span>
            </div>

            <div style={{ padding: '0.75rem 1rem', background: '#0f172a', borderBottom: '1px solid #1e293b', display: 'flex', gap: '0.75rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '2px' }}>Candidate Name</label>
                <input 
                  type="text" 
                  value={candidateName}
                  onChange={(e) => handleNameChange(e.target.value)}
                  style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '0.35rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem' }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '2px' }}>IT Role / Subtitle</label>
                <input 
                  type="text" 
                  value={candidateSubtitle}
                  onChange={(e) => handleSubtitleChange(e.target.value)}
                  style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '0.35rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem' }}
                />
              </div>
            </div>

            <textarea 
              value={latexCode}
              onChange={(e) => setLatexCode(e.target.value)}
              spellCheck="false"
              style={{
                flex: 1,
                width: '100%',
                background: '#0f172a',
                color: '#38bdf8',
                fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                fontSize: '0.825rem',
                lineHeight: '1.5',
                padding: '1rem',
                border: 'none',
                outline: 'none',
                resize: 'none',
                whiteSpace: 'pre'
              }}
            />
          </div>

          {/* Right: Live Rendered Document */}
          <div style={{ background: '#f1f5f9', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{
              background: '#e2e8f0',
              padding: '0.5rem 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.8rem',
              color: '#334155',
              borderBottom: '1px solid #cbd5e1'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Eye size={14} style={{ color: '#2563eb' }} />
                <strong>Live Rendered IT Resume Document</strong>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Zoom: 100% | 1 Page Fit</span>
            </div>

            <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', justifyContent: 'center' }}>
              <div style={{
                width: '100%',
                maxWidth: '480px',
                minHeight: '620px',
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                padding: '24px 28px',
                borderRadius: '4px',
                fontFamily: 'serif'
              }}>
                {/* Header Section */}
                <div style={{ textAlign: 'center', borderBottom: `2px solid ${template.color || '#2563eb'}`, paddingBottom: '8px', marginBottom: '12px' }}>
                  <h1 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {candidateName}
                  </h1>
                  <p style={{ fontSize: '10px', color: '#475569', marginTop: '2px', fontStyle: 'italic' }}>
                    {candidateSubtitle}
                  </p>
                  <p style={{ fontSize: '9px', color: '#0284c7', marginTop: '3px', fontWeight: '600' }}>
                    github.com/candidate • linkedin.com/in/candidate • candidate@email.com • +91 98765 43210
                  </p>
                </div>

                {/* Sections */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {template.sections.map((sec, idx) => (
                    <div key={idx}>
                      <h2 style={{ fontSize: '11px', fontWeight: '800', color: template.color || '#2563eb', textTransform: 'uppercase', borderBottom: '1px solid #cbd5e1', paddingBottom: '2px', marginBottom: '4px' }}>
                        {sec.title}
                      </h2>
                      <div style={{ fontSize: '9px', color: '#334155', lineHeight: '1.4' }}>
                        {sec.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResumeTemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [latexEditorTemplate, setLatexEditorTemplate] = useState(null);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTemplates = RESUME_TEMPLATES_DATA.filter(tpl => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'IT & Software') {
      return ['Software Engineering', 'Data Science & AI', 'Web & Mobile Dev', 'Cloud & DevOps', 'Cybersecurity', 'Campus & Freshers', 'Artificial Intelligence', 'Backend Development', 'Cloud Engineering', 'IT Management', 'Database Administration', 'Embedded Systems', 'Quality Assurance', 'Networking', 'Web3 & Blockchain', 'IT Support'].includes(tpl.category);
    }
    return tpl.category === selectedCategory;
  });

  const handleDownload = (template, formatName = 'PDF') => {
    const fileName = `${(template.name || 'candidate').toLowerCase().replace(/[^a-z0-9]/g, '_')}_resume.pdf`;
    const pdfBlobContent = `% PDF Format Resume Document for ${template.name || 'Candidate'}
% InternCatalyst Verified Resume Template
Title: ${template.title}
Category: ${template.category}
ATS Parsing Score: ${template.atsScore}

${template.previewText}
`;
    const element = document.createElement("a");
    const file = new Blob([pdfBlobContent], { type: 'application/pdf' });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setDownloadSuccessToast(`Downloading "${template.title}" (${fileName}) in PDF format...`);
    setTimeout(() => {
      setDownloadSuccessToast('');
    }, 3500);
  };

  const showToastMsg = (msg) => {
    setDownloadSuccessToast(msg);
    setTimeout(() => {
      setDownloadSuccessToast('');
    }, 3500);
  };

  return (
    <div style={{ padding: '3.5rem 0 5rem' }}>
      <style>{`
        .resume-doc-mockup:hover .mockup-overlay {
          opacity: 1 !important;
        }
        .resume-doc-mockup:hover {
          transform: scale(1.02);
          border-color: #2563eb !important;
        }
      `}</style>
      <div className="container">
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="badge badge-verified" style={{ marginBottom: '0.75rem', background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe' }}>
            <FileText size={14} /> Official IT & Non-IT Multi-Domain Resume Collection
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.75rem' }}>
            Verified <span className="text-gradient">LaTeX & ATS Resume Templates</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '780px', margin: '0 auto', lineHeight: '1.6' }}>
            ATS-optimized 100% verified resume formats for Software Engineers, Business Analysts, Digital Marketers, Financial Analysts, UI/UX Designers, and HR Professionals.
          </p>
        </div>

        {/* Category Domain Filter Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {['All', 'IT & Software', 'Business & Strategy', 'Marketing & Sales', 'Finance & Accounting', 'Design & Product', 'Human Resources & Operations'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="btn btn-sm"
              style={{
                borderRadius: '20px',
                padding: '0.45rem 1rem',
                fontSize: '0.85rem',
                fontWeight: '600',
                background: selectedCategory === cat ? '#1e3a8a' : '#f1f5f9',
                color: selectedCategory === cat ? '#ffffff' : '#334155',
                border: selectedCategory === cat ? '1px solid #1e3a8a' : '1px solid #cbd5e1',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Verified Badge Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
            Showing <strong>{filteredTemplates.length}</strong> Professional {selectedCategory === 'All' ? 'IT & Non-IT' : selectedCategory} Resume Templates
          </span>
          <span style={{ fontSize: '0.85rem', color: '#16a34a', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <ShieldCheck size={16} /> 100% Free, ATS-Optimized & Compilable in LaTeX
          </span>
        </div>

        {/* Template Grid */}
        <div className="grid-3" style={{ gap: '1.75rem' }}>
          {filteredTemplates.map(tpl => (
            <div key={tpl.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
              {/* Header Badges */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                <span className="badge badge-pill" style={{ background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe' }}>
                  {tpl.category}
                </span>
                <span className="badge badge-verified" style={{ background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0' }} title="ATS Parsing Accuracy Score">
                  <CheckCircle size={12} /> {tpl.atsScore} ATS Score
                </span>
              </div>

              {/* VISUAL RESUME PAPER MOCKUP PREVIEW BOX */}
              <div style={{ marginBottom: '1rem' }}>
                <ResumeDocumentMockup template={tpl} onClick={() => setLatexEditorTemplate(tpl)} />
              </div>

              {/* Title */}
              <h3 
                onClick={() => setLatexEditorTemplate(tpl)}
                style={{
                  fontSize: '1.05rem',
                  fontWeight: '700',
                  color: '#0f172a',
                  marginBottom: '0.75rem',
                  cursor: 'pointer',
                  lineHeight: '1.3'
                }}
              >
                {tpl.title}
              </h3>

              {/* Skill Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem', marginTop: 'auto' }}>
                {tpl.tags.map((tag, idx) => (
                  <span key={idx} style={{
                    background: '#f1f5f9',
                    border: '1px solid #e2e8f0',
                    color: '#475569',
                    padding: '0.2rem 0.55rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Card Footer Actions */}
              <div style={{ paddingTop: '0.85rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.5rem', width: '100%' }}>
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => setLatexEditorTemplate(tpl)}
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}
                >
                  <Code size={14} /> Overleaf Editor
                </button>
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => handleDownload(tpl, 'PDF')}
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}
                >
                  <Download size={14} /> Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Overleaf Interactive Split-Pane Editor Modal */}
        {latexEditorTemplate && (
          <OverleafEditorModal 
            template={latexEditorTemplate}
            onClose={() => setLatexEditorTemplate(null)}
            onShowToast={showToastMsg}
          />
        )}

        {/* Toast Popup Notification */}
        {downloadSuccessToast && (
          <div className="toast-container">
            <div className="toast toast-success" style={{ background: '#ffffff', color: '#0f172a', border: '1px solid #bbf7d0', boxShadow: '0 4px 14px rgba(0,0,0,0.1)' }}>
              <CheckCircle size={20} style={{ color: '#16a34a' }} />
              <div>{downloadSuccessToast}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
