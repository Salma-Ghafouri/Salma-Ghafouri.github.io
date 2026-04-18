// ============================================
// RESUME CONTENT DATA
// ============================================
// Edit this file to update your resume content
// All content on the website is loaded from this file
// Sourced from assets/Cv.pdf

const resumeData = {
    personal: {
        name: "Salma Ghafouri-Varzaneh",
        title1: "Ph.D. Student (ECE, VCU)",
        title2: "Digital Twin & Smart Cities",
        title3: "Cyber-Physical Systems & Autonomous Robotics",
        //subtitle: "Digital twin & smart cities • CPS & autonomous robotics",
        avatar: "assets/avatar.jpg"
    },

    heroButtons: {
        primary: {
            text: "View Resume",
            link: "#resume"
        },
        secondary: {
            text: "Contact Me",
            link: "#contact"
        }
    },

    bio: {
        paragraphs: [
            "I am a Ph.D. student in Electrical and Computer Engineering at Virginia Commonwealth University (VCU), specializing in Digital Twins and Smart Cities. My research focuses on AI-enabled Smart city systems, intelligent transportation systems, wearable devices, and autonomous robotics.",
            "I serve on several program committees as a reviewer, mentor high school students, and contribute as a peer reviewer. My work has been published in IEEE and other peer-reviewed venues. Recently, I was awarded two grants from the Department of Electrical and Computer Engineering at VCU and the College of Engineering (Engineering Graduate Student Award). I am also an inventor on a medical sensing device for diabetes monitoring, with a patent application filed in Iran.",
            "Previously, I earned my B.Sc. in Electrical Engineering and gained experience in science communication and teaching.",
            "I am actively engaged in technologies such as ROS, embedded systems, and 3D printing. Outside the lab, I volunteer in the community and enjoy activities such as rowing, swimming, scuba diving, astronomy, and photography."
        ]
    },

    // Top skills shown on the page (one tag each, no combined phrases). Full lists: "View all skills"
    skillsFeatured: {
        title: "Core skills",
        items: [
            "Python",
            "ROS",
            "MATLAB",
            "Smart Cities",
            "Intelligent transportation",
            "Cyber-Physical Systems",
            "Digital Twin",
            "Autonomous Robotics",
            "Docker",
            "Git",
            "Linux",
            "Jetson",
            "ArcGIS",
            "Research",
            "Transformation",
            "Astronomy"
        ]
    },

    skillsGroups: [
        {
            title: "Programming",
            items: [
                "Python",
                "MATLAB",
                "Simulink",
                "C",
                "C++",
                "HTML",
                "CSS",
                "Verilog"
            ]
        },
        {
            title: "Software and platforms",
            items: [
                "ArcGIS",
                "ROS (Robot Operating System)",
                "Docker",
                "Git",
                "Linux",
                "LabVIEW",
                "CATIA",
                "SOLIDWORKS",
                "Altium Designer",
                "Proteus",
                "PSpice",
                "LaTeX",
                "WordPress",
                "Photoshop",
                "Premiere",
                "Audition"
            ]
        },
        {
            title: "Hardware and embedded",
            items: [
                "Arduino",
                "AVR",
                "STM32",
                "FPGA",
                "ESP32",
                "Raspberry Pi",
                "Jetson Nano"
            ]
        },
        {
            title: "Soft skills",
            items: [
                "Scientific writing",
                "Research communication",
                "Teaching",
                "Knowledge transfer",
                "Technical presentation",
                "Teamwork in multicultural environments",
                "Critical thinking",
                "Problem solving",
                "Time management",
                "Science communication"
            ]
        },
        {
            title: "Languages",
            items: [
                "Persian: Native",
                "English: Advanced (GRE 323: V153, Q170, AWA 4.0, TOEFL iBT 105, 2022)",
                "Arabic: Upper intermediate",
                "German: Basic"
            ]
        }
    ],

    education: [
        {
            date: "2024–Present",
            degree: "Doctor of Philosophy (Ph.D.) in Electrical and Computer Engineering",
            institution: "Virginia Commonwealth University (VCU), Richmond, VA, USA",
            description: "Research with OpenCyberCity Lab: Smart Cities, Digital Twin, CPS, AI, Autonomous Robotics (UAVs and Vehicles)."
        },
        {
            date: "2023–2024",
            degree: "Master of Science (M.Sc.) in Mechatronics Engineering",
            institution: "University of Tehran, Tehran, Iran",
            description: "Graduate coursework and research in mechatronics engineering."
        },
        {
            date: "2016–2020",
            degree: "Bachelor of Science (B.Sc.) in Electrical Engineering",
            institution: "Islamic Azad University, Tehran, Iran",
            description: "Ranked 4th among 144 EE students, scholarship recipient (2017–2020). Selected courses: Systems Modeling (A), Introduction to Machine Learning (A), Intelligent Linear Systems (A)."
        }
    ],

    // Peer-reviewed papers, proceedings, and book chapter (one row per publication)
    publications: [
        {
            date: "2026",
            title: "A Review of AI-based Optimization and Monitoring Using Wearable Data in Smart Buildings",
            organization: "13th IEEE Conference on Technologies for Sustainability (SusTech 2026)",
            description: "S. Ghafouri-Varzaneh, M. Zaman, N. Zohrabi, S. Abdelwahed. Accepted for presentation."
        },
        {
            date: "2025",
            title: "Integrative ITS Platform for Enhanced Urban Mobility in Smart Cities",
            organization: "IEEE International Conference on Ubiquitous Intelligence and Computing (UIC 2025), Calgary, AB, Canada",
            description: "M. Zaman, A. Malik, D. Gubay, A. DeWitt, S. Ghafouri-Varzaneh, N. Zohrabi, S. Abdelwahed."
        },
        {
            date: "2025",
            title: "Smart Electric Power Systems: Data-Driven Approaches for Enhanced Energy Management",
            organization: "In <em>Innovations in Electrical Engineering: Integrative Approaches to Energy, Communication, Computing, and Intelligent Systems</em> (Chapter 1), Nobel Sciences",
            description: "S. Ghafouri-Varzaneh, A. Bolhassani, P. Parsi."
        },
        {
            date: "2024",
            title: "Enhancing medication adherence in elderly patients with iron deficiency anemia: A non-invasive device approach",
            organization: "61st Annual Conference of the British Institute of Non-Destructive Testing (BINDT)",
            description: "N. Karimian, S. Ghafouri-Varzaneh, S. Karimian."
        },
        {
            date: "2019",
            title: "A brief review of applications of ANN for NDT defect detection within the aeroplane industry",
            organization: "BINDT Annual Conference (NDT 2019)",
            description: "N. Karimian, S. Ghafouri-Varzaneh."
        },
        {
            date: "2019",
            title: "Non-destructive detection of discontinuity of circuit board using image processing techniques",
            organization: "BINDT Annual Conference (NDT 2019)",
            description: "N. Karimian, S. Ghafouri-Varzaneh."
        },
        {
            date: "2018",
            title: "Design of non-invasive sensor for the detection of glucose levels in diabetic patients",
            organization: "BINDT Annual Conference (NDT 2018)",
            description: "N. Karimian, S. Ghafouri-Varzaneh."
        },
        {
            date: "2018",
            title: "Fast detection of crack initiation in bone using acoustic NDT medical sensor",
            organization: "BINDT Annual Conference (NDT 2018), Nottingham, UK",
            description: "N. Karimian, S. Ghafouri-Varzaneh."
        },
        {
            date: "2015",
            title: "Vitaly Quality and Productivity of the Enterprise, Creativity and Originality of the Future by Training Components: Six Thinking Hats (Edward de Bono)",
            organization: "1st International Conference on Modern Research in Management, Economics and Accounting, Istanbul, Turkey",
            description: "M. Abedian Esfahani, H. Karamalian, S. Ghafouri-Varzaneh."
        }
    ],

    // Conference posters and selected talks (see also Publications)
    posterPresentations: [
        {
            date: "Apr 2026",
            title: "OpenCyberCity",
            organization: "Commonwealth Cyber Initiative (CCI), CCI Symposium 2026, Richmond, VA, USA",
            description: "A Modular Cyber-Physical Smart City Testbed for End-to-End Sensing, Analytics, and Edge Intelligence."
        },
        {
            date: "Nov 2025",
            title: "OpenCyberCity",
            organization: "Virginia Robotics Symposium, Link Lab, Charlottesville, VA, USA",
            description: "Poster presentation on the OpenCyberCity Robotics and Smart-City testbed."
        },
        {
            date: "Apr 2025",
            title: "OpenCyberCity",
            organization: "Commonwealth Cyber Initiative (CCI) Symposium, Richmond, VA, USA",
            description: "Poster presentation on OpenCyberCity research and demonstration activities."
        },
        {
            date: "Jul 2015",
            title: "Six Thinking Hats enterprise training (oral)",
            organization: "Istanbul, Turkey",
            description: "Oral presentation on creativity and productivity in enterprise training (Edward de Bono methodology)."
        }
    ],

    patents: [
        {
            date: "2021",
            title: "Patent application: medical glucose monitoring (Iran)",
            organization: "IPC: A61B 5/00",
            description:
                "Monitoring and reactive device for glucose control in diabetic patients. Iranian Patent Application No. 1399501400003009174, filed January 2021."
        }
    ],

    // Academic service, training (manuscripts in preparation are not listed on the site)
    researchActivity: [
        {
            date: "Oct 2025",
            title: "Academic service",
            organization: "22nd International Conference on Informatics in Control, Automation and Robotics (ICINCO 2025), Marbella, Spain",
            description:
                "Program Committee Member & Reviewer, evaluated peer-reviewed submissions in control, automation, and robotics."
        },
        {
            date: "2024–Present",
            title: "Peer review",
            organization: "Academic conferences and journals",
            description:
                "Independent peer review of technical submissions in areas aligned with Smart Cities, intelligent Systems, and Robotics."
        },
        {
            date: "2023–Present",
            title: "School mentoring & STEM outreach",
            organization: "K–12 and community programs",
            description:
                "Mentoring students and supporting science and technology activities in school settings."
        },
        {
            date: "Training",
            title: "Workshops & professional development",
            organization: "2017–2025 (representative sample)",
            description:
                "Including 12-hour ROS, 6-hour 3D printing, 15-hour STM32 (ARM), 76-hour swimming coaching (Grade 3), advanced electronics, robotics (Python, SOLIDWORKS), Network+, solar and CCTV, image processing with LabVIEW, Altium Designer, optics, astronomy series, and additional technical programs."
        }
    ],

    honors: [
        {
            title: "Graduate travel grants, IEEE SusTech 2026",
            description: "ECE Graduate Student Travel Grant, Virginia Commonwealth University, March 2026, to present first-author work at SusTech 2026."
        },
        {
            title: "Graduate travel grants, IEEE SusTech 2026",
            description: "College of Engineering Travel & Conference Grant, Virginia Commonwealth University, March 2026, to present first-author work at SusTech 2026."
        },
        {
            title: "Undergraduate distinction, IAUCTB",
            description: "Ranked 4th among 144 Electrical Engineering students (2020), scholarship recipient, Islamic Azad University, Tehran (2017–2020)."
        },
    ],

    workExperience: [
        {
            date: "Summer 2025–Present",
            title: "Graduate Research Assistant",
            company: "Virginia Commonwealth University (VCU), OpenCyberCity Lab",
            description:
                "Funded research in Smart Cities, Digital Twin, Cyber-Physical Systems, AI, and Autonomous Robotics (Drones and Vehicles). First- and co-authored publications, AI course materials, mentorship of a Master’s student on research design, analysis, implementation, and writing."
        },
        {
            date: "Spring 2025",
            title: "Graduate Teaching Assistant",
            company: "Virginia Commonwealth University (VCU)",
            description:
                "Supported instruction for undergraduate C Programming and Electrical Circuits Lab: delivery, grading, and student mentoring."
        },
        {
            date: "2017–2024",
            title: "Influencer & YouTuber",
            company: "Tehran, Iran",
            description:
                "Electronics-focused content creation, Instagram (2017–2024) and YouTube (2020–2024), approximately 34k followers combined."
        },
        {
            date: "2020",
            title: "Electronics Engineer & Assembler",
            company: "Sarvin Company, Golgoon Industrial Park, Tehran, Iran",
            description: "Industrial-scale electronics production line."
        },
        {
            date: "2017–2018",
            title: "Data Analyst & Researcher",
            company: "IR. Asteroid Team & IASC (UH, Hardin-Simmons University)",
            description: "NEO and main-belt asteroid image analysis using Pan-STARRS data."
        },
        {
            date: "Aug 2025",
            title: "Volunteer, Rise Against Hunger",
            company: "Richmond, VA, USA",
            description: "Meal packaging event supporting global hunger relief."
        },
        {
            date: "2017–2018",
            title: "Volunteer, Astronomy Day outreach",
            company: "Tehran, Iran",
            description: "Supported astronomy activities for teenagers during public Astronomy Day events."
        }
    ],

    // Key Projects section temporarily disabled — uncomment when re-enabling in index.html + populate.js
    // projects: [
    //     {
    //         title: "Crazyflie UAV & Vicon motion capture",
    //         description: "UAV flight experiments and motion-capture-based data analysis (in progress)."
    //     },
    //     {
    //         title: "DuckieBot autonomous vehicle",
    //         description: "Autonomous driving experiments with perception–control integration (in progress)."
    //     },
    //     {
    //         title: "Autonomous vehicle, Jetson platform",
    //         description: "Embedded lane-detection for 1/12-scale Cyber-City environments on NVIDIA Jetson Orin Nano, GPU-accelerated, real-time (in progress)."
    //     },
    //     {
    //         title: "Theremin circuit design",
    //         description: "Analog/mixed-signal design project (2025)."
    //     },
    //     {
    //         title: "Line-tracking robot & CATIA robotics",
    //         description: "Early robotics and CAD/simulation projects including line follower (2011) and robot design in CATIA (2017)."
    //     }
    // ],

    expertise: [
        {
            title: "AI-enabled Smart Cities & ITS",
            description: "Optimization, monitoring, and integrative platforms for urban mobility and sustainability."
        },
        {
            title: "Digital Twin & Cyber-Physical Systems",
            description: "Modeling and experimentation for Smart City and Robotics testbeds."
        },
        {
            title: "Autonomous Robotics",
            description: "UAVs (e.g., Crazyflie), ground vehicles (DuckieBot), and embedded perception on Jetson-class hardware."
        },
        {
            title: "NDT & medical sensing",
            description: "Nondestructive testing, acoustic and image-based methods, and glucose-monitoring device R&D."
        },
        {
            title: "Professional affiliations",
            description: "IEEE Graduate Student Member (Richmond Section), IEEE Young Professionals, Society of Women Engineers (SWE), Ava Star Astronomy Center, FIAP Photographers Association, Talented Member of the National Library of Iran."
        }
    ],

    contact: {
        email: "ghafourivas@vcu.edu",
        location: "United States of America"
    },

    socialLinks: {
        linkedin: "https://www.linkedin.com/in/salma-ghafouri-varzaneh/",
        github: "https://github.com/Salma-Ghafouri",
        instagram: "https://www.instagram.com/salma_ghafouri/",
        researchgate: "https://www.researchgate.net/profile/Salma-Ghafouri-Varzaneh",
        orcid: "https://orcid.org/0009-0004-2306-5648",
        googlescholar: "https://scholar.google.com/citations?hl=en&user=x7wJsMIAAAAJ",
        youtube: "https://www.youtube.com/channel/UCxUIZvEJhnBcLBk61QT1azQ#",
        sciprofiles: "https://sciprofiles.com/profile/SalmaGhafouriVarzaneh",
        occtestbed: "https://www.occtestbed.com/our-team"
    },

    quote: {
        text: "If you want something you've never had, you must be willing to do something you've never done",
        author: "Thomas Jefferson"
    }
};
