// ============================================
// POPULATE PAGE WITH DATA
// ============================================
// This file reads data from content.js and populates the HTML

document.addEventListener('DOMContentLoaded', () => {
    // Wait for content.js to load
    if (typeof resumeData === 'undefined') {
        console.error('resumeData is not defined. Make sure content.js is loaded before populate.js');
        return;
    }

    populateHero();
    populateBio();
    populateSkills();
    populateResume();
    populateContact();
    populateQuote();
    populateFooter();
});

// Populate Hero Section
function populateHero() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroAvatar = document.querySelector('.hero-avatar');
    const primaryBtn = document.querySelector('.btn-primary');
    const secondaryBtn = document.querySelector('.btn-secondary');

    if (heroTitle && resumeData.personal) {
        heroTitle.innerHTML = `Hello! I'm <span class="highlight">${resumeData.personal.name}</span>`;
    }

    if (heroSubtitle && resumeData.personal.title) {
        heroSubtitle.textContent = resumeData.personal.title;
    }

    if (heroAvatar && resumeData.personal.avatar) {
        heroAvatar.src = resumeData.personal.avatar;
        heroAvatar.alt = resumeData.personal.name;
    }

    if (primaryBtn && resumeData.heroButtons.primary) {
        primaryBtn.textContent = resumeData.heroButtons.primary.text;
        primaryBtn.href = resumeData.heroButtons.primary.link;
    }

    if (secondaryBtn && resumeData.heroButtons.secondary) {
        secondaryBtn.textContent = resumeData.heroButtons.secondary.text;
        secondaryBtn.href = resumeData.heroButtons.secondary.link;
    }
}

// Populate Bio Section
function populateBio() {
    const bioText = document.querySelector('.bio-text');
    
    if (bioText && resumeData.bio && resumeData.bio.paragraphs) {
        const paragraphsHTML = resumeData.bio.paragraphs
            .map(text => `<p>${text}</p>`)
            .join('');
        
        // Find skills section and preserve it
        const skillsSection = bioText.querySelector('.skills');
        const skillsHTML = skillsSection ? skillsSection.outerHTML : '';
        
        bioText.innerHTML = paragraphsHTML + skillsHTML;
    }
}

// Populate Skills Section
function populateSkills() {
    const skillsSection = document.querySelector('.skills');
    if (!skillsSection) return;

    // New flexible format:
    // resumeData.skillsGroups = [{ title: "Technical Skills", items: ["Python", ...] }, ...]
    // Backward compatible with:
    // resumeData.skills = { title: "Technical Skills", items: [...] }
    const rawGroups = Array.isArray(resumeData?.skillsGroups) ? resumeData.skillsGroups : [];
    const legacy = resumeData?.skills;

    const normalizedGroups = [];

    for (const g of rawGroups) {
        const title = (typeof g?.title === 'string') ? g.title.trim() : '';
        const items = Array.isArray(g?.items) ? g.items.map(s => (typeof s === 'string' ? s.trim() : '')).filter(Boolean) : [];
        if (title || items.length > 0) normalizedGroups.push({ title, items });
    }

    // If no groups provided, fall back to legacy `skills`
    if (normalizedGroups.length === 0 && legacy) {
        const title = (typeof legacy?.title === 'string') ? legacy.title.trim() : '';
        const items = Array.isArray(legacy?.items) ? legacy.items.map(s => (typeof s === 'string' ? s.trim() : '')).filter(Boolean) : [];
        if (title || items.length > 0) normalizedGroups.push({ title, items });
    }

    // If still empty, remove the whole section so no blank space remains
    if (normalizedGroups.length === 0 || normalizedGroups.every(g => g.items.length === 0)) {
        skillsSection.remove();
        return;
    }

    // Render groups
    skillsSection.innerHTML = normalizedGroups.map((group) => {
        const groupTitle = group.title || 'Skills';
        const tagsHtml = (group.items || []).map(skill => `<span class="skill-tag">${skill}</span>`).join('');
        return `
            <div class="skills-group">
                <h3>${groupTitle}</h3>
                <div class="skills-tags">${tagsHtml}</div>
            </div>
        `;
    }).join('');
}

// Populate Resume Section
function populateResume() {
    // Find sections by their titles
    const resumeSections = document.querySelectorAll('.resume-section');
    
    resumeSections.forEach(section => {
        const title = section.querySelector('.resume-section-title');
        if (!title) return;
        
        const titleText = title.textContent.trim();
        
        // Education
        if (titleText === 'Education') {
            const timeline = section.querySelector('.timeline');
            if (timeline && resumeData.education) {
                timeline.innerHTML = resumeData.education.map(item => `
                    <div class="timeline-item">
                        <div class="timeline-date">${item.date}</div>
                        <div class="timeline-content">
                            <h4>${item.degree}</h4>
                            <p class="company">${item.institution}</p>
                            <p>${item.description}</p>
                        </div>
                    </div>
                `).join('');
            }
        }
        
        // Research & Publications
        if (titleText === 'Research & Publications') {
            const timeline = section.querySelector('.timeline');
            if (timeline && resumeData.research) {
                timeline.innerHTML = resumeData.research.map(item => `
                    <div class="timeline-item">
                        <div class="timeline-date">${item.date}</div>
                        <div class="timeline-content">
                            <h4>${item.title}</h4>
                            <p class="company">${item.organization}</p>
                            <p>${item.description}</p>
                        </div>
                    </div>
                `).join('');
            }
        }
        
        // Work Experience
        if (titleText === 'Work Experience') {
            const timeline = section.querySelector('.timeline');
            if (timeline && resumeData.workExperience) {
                timeline.innerHTML = resumeData.workExperience.map(item => `
                    <div class="timeline-item">
                        <div class="timeline-date">${item.date}</div>
                        <div class="timeline-content">
                            <h4>${item.title}</h4>
                            <p class="company">${item.company}</p>
                            <p>${item.description}</p>
                        </div>
                    </div>
                `).join('');
            }
        }
        
        // Key Projects
        if (titleText === 'Key Projects') {
            const certificates = section.querySelector('.certificates');
            if (certificates && resumeData.projects) {
                certificates.innerHTML = resumeData.projects.map(project => `
                    <div class="certificate-item">
                        <h4>${project.title}</h4>
                        <p>${project.description}</p>
                    </div>
                `).join('');
            }
        }
        
        // Areas of Expertise
        if (titleText === 'Areas of Expertise') {
            const certificates = section.querySelector('.certificates');
            if (certificates && resumeData.expertise) {
                certificates.innerHTML = resumeData.expertise.map(item => `
                    <div class="certificate-item">
                        <h4>${item.title}</h4>
                        <p>${item.description}</p>
                    </div>
                `).join('');
            }
        }
    });

    // Resume PDF Link - simple & reliable (no fetch/blob; avoids wrong/cached downloads)
    const resumePDFLink = document.querySelector('.download-resume a');
    if (resumePDFLink) {
        const pdfPath = resumeData?.resumePDF;
        const fileName = resumeData?.resumePDFFileName || 'resume.pdf';
        const version = resumeData?.resumePDFVersion || Date.now(); // cache-bust by default

        if (pdfPath && pdfPath !== '#') {
            // Use a cache-busting query param so the browser fetches the latest file.
            // Keep the real file path intact for GitHub Pages / Live Server.
            const separator = pdfPath.includes('?') ? '&' : '?';
            resumePDFLink.href = `${pdfPath}${separator}v=${encodeURIComponent(version)}`;
            resumePDFLink.setAttribute('download', fileName);
            resumePDFLink.removeAttribute('target');
        } else {
            resumePDFLink.href = '#';
            resumePDFLink.removeAttribute('download');
            resumePDFLink.addEventListener('click', function (e) {
                e.preventDefault();
                alert('Resume PDF link is not set. Please update content.js file.');
            });
        }
    }
}

// Populate Contact Section
function populateContact() {
    // Email
    const emailCard = document.querySelector('.contact-card-link');
    const emailText = document.querySelector('.contact-email');
    
    if (emailCard && resumeData.contact.email) {
        emailCard.href = `mailto:${resumeData.contact.email}`;
    }
    
    if (emailText && resumeData.contact.email) {
        emailText.textContent = resumeData.contact.email;
    }

    // Social Links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        const socialType = link.getAttribute('data-social');
        if (!socialType) return;

        const rawHref = resumeData?.socialLinks?.[socialType];
        const href = (typeof rawHref === 'string') ? rawHref.trim() : '';

        // If it's not set (or left as "#"), keep it inert and show a helpful message
        if (!href || href === '#') {
            link.href = '#';
            link.removeAttribute('target');
            link.removeAttribute('rel');
            link.addEventListener('click', (e) => {
                e.preventDefault();
                alert(`Please set your ${socialType} URL in content.js (resumeData.socialLinks.${socialType}).`);
            });
            return;
        }

        // If user forgot the protocol, assume https://
        const normalizedHref = /^https?:\/\//i.test(href) ? href : `https://${href}`;
        link.href = normalizedHref;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
    });
}

// Populate Quote Section
function populateQuote() {
    const quoteText = document.querySelector('.quote');
    
    if (quoteText && resumeData.quote) {
        quoteText.innerHTML = `"${resumeData.quote.text}"<cite>${resumeData.quote.author}</cite>`;
    }
}

// Populate Footer
function populateFooter() {
    const footerLocation = document.querySelector('.footer-location span');
    
    if (footerLocation && resumeData.contact.location) {
        footerLocation.textContent = resumeData.contact.location;
    }
}

