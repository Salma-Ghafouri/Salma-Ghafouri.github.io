// ============================================
// POPULATE PAGE WITH DATA
// ============================================
// This file reads data from content.js and populates the HTML

/** Max items shown inline before "View all" opens the scrollable modal */
const RESUME_LIST_INLINE_MAX = 3;

const expandListRegistry = Object.create(null);
let expandListSeq = 0;

function registerExpandListHtml(html) {
    const id = `expand-${++expandListSeq}`;
    expandListRegistry[id] = html;
    return id;
}

function escapeHtmlAttr(s) {
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;');
}

function renderEducationItem(item) {
    return `
                    <div class="timeline-item">
                        <div class="timeline-date">${item.date}</div>
                        <div class="timeline-content">
                            <h4>${item.degree}</h4>
                            <p class="company">${item.institution}</p>
                            <p>${item.description}</p>
                        </div>
                    </div>`;
}

function renderResearchItem(item) {
    return `
                    <div class="timeline-item">
                        <div class="timeline-date">${item.date}</div>
                        <div class="timeline-content">
                            <h4>${item.title}</h4>
                            <p class="company">${item.organization}</p>
                            <p>${item.description}</p>
                        </div>
                    </div>`;
}

function renderWorkItem(item) {
    return `
                    <div class="timeline-item">
                        <div class="timeline-date">${item.date}</div>
                        <div class="timeline-content">
                            <h4>${item.title}</h4>
                            <p class="company">${item.company}</p>
                            <p>${item.description}</p>
                        </div>
                    </div>`;
}

function renderProjectItem(project) {
    return `
                    <div class="certificate-item">
                        <h4>${project.title}</h4>
                        <p>${project.description}</p>
                    </div>`;
}

function renderExpertiseItem(item) {
    return `
                    <div class="certificate-item">
                        <h4>${item.title}</h4>
                        <p>${item.description}</p>
                    </div>`;
}

/** Posters / patents: same data shape as timeline rows, shown as right-column cards */
function renderPosterPatentCard(item) {
    return `
                    <div class="certificate-item certificate-item--resume-extra">
                        <h4>${item.title}</h4>
                        <p class="certificate-item__meta">${item.date} · ${item.organization}</p>
                        <p>${item.description}</p>
                    </div>`;
}

function mountExpandableTimeline(container, items, sectionTitle, renderItem) {
    if (!container || !Array.isArray(items) || items.length === 0) return;
    const fullHtml = items.map(renderItem).join('');
    if (items.length <= RESUME_LIST_INLINE_MAX) {
        container.innerHTML = fullHtml;
        return;
    }
    const previewHtml = items.slice(0, RESUME_LIST_INLINE_MAX).map(renderItem).join('');
    const regId = registerExpandListHtml(
        `<div class="timeline content-modal-inner-list">${fullHtml}</div>`
    );
    container.innerHTML = `${previewHtml}
                    <div class="list-expand-action">
                        <button type="button" class="btn btn-secondary btn-expand-list" data-expand-id="${regId}" data-modal-title="${escapeHtmlAttr(sectionTitle)}" aria-haspopup="dialog">
                            View all (${items.length})
                        </button>
                    </div>`;
}

function mountExpandableCertificates(container, items, sectionTitle, renderItem) {
    if (!container || !Array.isArray(items) || items.length === 0) return;
    const fullHtml = items.map(renderItem).join('');
    if (items.length <= RESUME_LIST_INLINE_MAX) {
        container.innerHTML = fullHtml;
        return;
    }
    const previewHtml = items.slice(0, RESUME_LIST_INLINE_MAX).map(renderItem).join('');
    const regId = registerExpandListHtml(
        `<div class="certificates content-modal-inner-list">${fullHtml}</div>`
    );
    container.innerHTML = `${previewHtml}
                    <div class="list-expand-action">
                        <button type="button" class="btn btn-secondary btn-expand-list" data-expand-id="${regId}" data-modal-title="${escapeHtmlAttr(sectionTitle)}" aria-haspopup="dialog">
                            View all (${items.length})
                        </button>
                    </div>`;
}

function initResumeExpandModal() {
    const modal = document.getElementById('contentExpandModal');
    if (!modal) return;

    const titleEl = modal.querySelector('.content-expand-modal__title');
    const bodyEl = modal.querySelector('.content-expand-modal__body');
    const closeTriggers = modal.querySelectorAll('[data-close-expand-modal]');

    let lastFocus = null;

    function openModal(title, html) {
        lastFocus = document.activeElement;
        if (titleEl) titleEl.textContent = title;
        if (bodyEl) bodyEl.innerHTML = html;
        modal.removeAttribute('hidden');
        requestAnimationFrame(() => {
            modal.classList.add('is-open');
            document.body.classList.add('resume-modal-open');
        });
        const closeBtn = modal.querySelector('.content-expand-modal__close');
        if (closeBtn) closeBtn.focus();
    }

    function closeModal() {
        modal.classList.remove('is-open');
        document.body.classList.remove('resume-modal-open');
        if (bodyEl) bodyEl.innerHTML = '';
        modal.setAttribute('hidden', '');
        if (lastFocus && typeof lastFocus.focus === 'function') {
            lastFocus.focus();
        }
        lastFocus = null;
    }

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-expand-list');
        if (btn) {
            e.preventDefault();
            const id = btn.getAttribute('data-expand-id');
            const title = btn.getAttribute('data-modal-title') || 'Details';
            const html = id ? expandListRegistry[id] : '';
            if (html) openModal(title, html);
            return;
        }

        if (!modal.classList.contains('is-open')) return;

        if (e.target.closest('[data-close-expand-modal]')) {
            e.preventDefault();
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        if (!modal.classList.contains('is-open')) return;
        closeModal();
    });
}

document.addEventListener('DOMContentLoaded', () => {
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
    initResumeExpandModal();
});

function populateHero() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle1 = document.querySelector('.hero-subtitle1');
    const heroSubtitle2 = document.querySelector('.hero-subtitle2');
    const heroSubtitle3 = document.querySelector('.hero-subtitle3');
    const heroAvatar = document.querySelector('.hero-avatar');
    const primaryBtn = document.querySelector('.btn-primary');
    const secondaryBtn = document.querySelector('.btn-secondary');

    if (heroTitle && resumeData.personal) {
        heroTitle.innerHTML = `Hello! I'm <span class="highlight">${resumeData.personal.name}</span>`;
    }

    if (heroSubtitle1 && resumeData.personal.title1) {
        heroSubtitle1.textContent = resumeData.personal.title1;
    }

    if (heroSubtitle2 && resumeData.personal.title2) {
        heroSubtitle2.textContent = resumeData.personal.title2;
    }

    if (heroSubtitle3 && resumeData.personal.title3) {
        heroSubtitle3.textContent = resumeData.personal.title3;
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

function populateBio() {
    const bioText = document.querySelector('.bio-text');

    if (bioText && resumeData.bio && resumeData.bio.paragraphs) {
        const paragraphsHTML = resumeData.bio.paragraphs
            .map(text => `<p>${text}</p>`)
            .join('');

        const skillsSection = bioText.querySelector('.skills');
        const skillsHTML = skillsSection ? skillsSection.outerHTML : '';

        bioText.innerHTML = paragraphsHTML + skillsHTML;
    }
}

function normalizeSkillGroups(rawGroups, legacy) {
    const normalizedGroups = [];
    for (const g of rawGroups) {
        const title = (typeof g?.title === 'string') ? g.title.trim() : '';
        const items = Array.isArray(g?.items) ? g.items.map(s => (typeof s === 'string' ? s.trim() : '')).filter(Boolean) : [];
        if (title || items.length > 0) normalizedGroups.push({ title, items });
    }
    if (normalizedGroups.length === 0 && legacy) {
        const title = (typeof legacy?.title === 'string') ? legacy.title.trim() : '';
        const items = Array.isArray(legacy?.items) ? legacy.items.map(s => (typeof s === 'string' ? s.trim() : '')).filter(Boolean) : [];
        if (title || items.length > 0) normalizedGroups.push({ title, items });
    }
    return normalizedGroups;
}

function buildSkillsCategoriesModalHtml(groups) {
    return groups.map((group) => {
        const groupTitle = group.title || 'Skills';
        const items = group.items || [];
        if (items.length === 0) return '';
        const tags = items.map((skill) => `<span class="skill-tag">${skill}</span>`).join('');
        return `
            <div class="skills-group skills-group--modal-block">
                <h3 class="skills-modal-category-title">${groupTitle}</h3>
                <div class="skills-tags skills-tags--modal">${tags}</div>
            </div>`;
    }).filter(Boolean).join('');
}

function populateSkills() {
    const skillsSection = document.querySelector('.skills');
    if (!skillsSection) return;

    const rawGroups = Array.isArray(resumeData?.skillsGroups) ? resumeData.skillsGroups : [];
    const legacy = resumeData?.skills;
    const normalizedGroups = normalizeSkillGroups(rawGroups, legacy);

    const featuredRaw = resumeData?.skillsFeatured;
    let featuredItems = [];
    let featuredTitle = 'Core skills';
    if (Array.isArray(featuredRaw)) {
        featuredItems = featuredRaw.map(s => (typeof s === 'string' ? s.trim() : '')).filter(Boolean);
    } else if (featuredRaw && Array.isArray(featuredRaw.items)) {
        featuredItems = featuredRaw.items.map(s => (typeof s === 'string' ? s.trim() : '')).filter(Boolean);
        if (typeof featuredRaw.title === 'string' && featuredRaw.title.trim()) {
            featuredTitle = featuredRaw.title.trim();
        }
    }

    const hasGroups = normalizedGroups.length > 0 && !normalizedGroups.every(g => (g.items || []).length === 0);
    const hasFeatured = featuredItems.length > 0;

    if (!hasGroups && !hasFeatured) {
        skillsSection.remove();
        return;
    }

    const tag = (skill) => `<span class="skill-tag">${skill}</span>`;

    // Featured row + all categories only inside "View all"
    if (hasFeatured && hasGroups) {
        const modalInner = buildSkillsCategoriesModalHtml(normalizedGroups);
        const regId = registerExpandListHtml(`<div class="skills-modal-all">${modalInner}</div>`);
        const expandBlock = `
                <div class="list-expand-action list-expand-action--skills">
                    <button type="button" class="btn btn-secondary btn-expand-list" data-expand-id="${regId}" data-modal-title="${escapeHtmlAttr('All skill categories')}" aria-haspopup="dialog">
                        View all skills
                    </button>
                </div>`;
        skillsSection.innerHTML = `
            <div class="skills-group skills-group--featured">
                <h3>${featuredTitle}</h3>
                <div class="skills-tags">${featuredItems.map(tag).join('')}</div>${expandBlock}
            </div>`;
        return;
    }

    if (hasFeatured && !hasGroups) {
        skillsSection.innerHTML = `
            <div class="skills-group skills-group--featured">
                <h3>${featuredTitle}</h3>
                <div class="skills-tags">${featuredItems.map(tag).join('')}</div>
            </div>`;
        return;
    }

    // No featured list: keep previous behavior (each group inline, per-group View all when needed)
    if (!hasGroups) {
        skillsSection.remove();
        return;
    }

    skillsSection.innerHTML = normalizedGroups.map((group) => {
        const groupTitle = group.title || 'Skills';
        const items = group.items || [];
        if (items.length === 0) return '';

        if (items.length <= RESUME_LIST_INLINE_MAX) {
            return `
            <div class="skills-group">
                <h3>${groupTitle}</h3>
                <div class="skills-tags">${items.map(tag).join('')}</div>
            </div>`;
        }

        const visible = items.slice(0, RESUME_LIST_INLINE_MAX).map(tag).join('');
        const allTags = items.map(tag).join('');
        const regId = registerExpandListHtml(`<div class="skills-tags skills-tags--modal">${allTags}</div>`);
        const modalTitle = `${groupTitle} (all items)`;

        return `
            <div class="skills-group">
                <h3>${groupTitle}</h3>
                <div class="skills-tags">${visible}</div>
                <div class="list-expand-action list-expand-action--skills">
                    <button type="button" class="btn btn-secondary btn-expand-list" data-expand-id="${regId}" data-modal-title="${escapeHtmlAttr(modalTitle)}" aria-haspopup="dialog">
                        View all (${items.length})
                    </button>
                </div>
            </div>`;
    }).filter(Boolean).join('');
}

function populateResume() {
    const resumeSections = document.querySelectorAll('.resume-section');

    resumeSections.forEach(section => {
        const title = section.querySelector('.resume-section-title');
        if (!title) return;

        const titleText = title.textContent.trim();

        if (titleText === 'Education') {
            const timeline = section.querySelector('.timeline');
            if (timeline && resumeData.education) {
                mountExpandableTimeline(timeline, resumeData.education, titleText, renderEducationItem);
            }
        }

        if (titleText === 'Publications') {
            const timeline = section.querySelector('.timeline');
            const items = resumeData.publications || resumeData.research;
            if (timeline && items) {
                mountExpandableTimeline(timeline, items, titleText, renderResearchItem);
            }
        }

        if (titleText === 'Posters & presentations') {
            const certificates = section.querySelector('.certificates');
            if (certificates && resumeData.posterPresentations) {
                mountExpandableCertificates(certificates, resumeData.posterPresentations, titleText, renderPosterPatentCard);
            }
        }

        if (titleText === 'Patents') {
            const certificates = section.querySelector('.certificates');
            if (certificates && resumeData.patents) {
                mountExpandableCertificates(certificates, resumeData.patents, titleText, renderPosterPatentCard);
            }
        }

        if (titleText === 'Research & academic activity') {
            const timeline = section.querySelector('.timeline');
            if (timeline && resumeData.researchActivity) {
                mountExpandableTimeline(timeline, resumeData.researchActivity, titleText, renderResearchItem);
            }
        }

        if (titleText === 'Work Experience') {
            const timeline = section.querySelector('.timeline');
            if (timeline && resumeData.workExperience) {
                mountExpandableTimeline(timeline, resumeData.workExperience, titleText, renderWorkItem);
            }
        }

        // Key Projects section temporarily disabled (see index.html)
        // if (titleText === 'Key Projects') {
        //     const certificates = section.querySelector('.certificates');
        //     if (certificates && resumeData.projects) {
        //         mountExpandableCertificates(certificates, resumeData.projects, titleText, renderProjectItem);
        //     }
        // }

        if (titleText === 'Honors & Awards') {
            const certificates = section.querySelector('.certificates');
            if (certificates && resumeData.honors) {
                mountExpandableCertificates(certificates, resumeData.honors, titleText, renderExpertiseItem);
            }
        }

        if (titleText === 'Areas of Expertise') {
            const certificates = section.querySelector('.certificates');
            if (certificates && resumeData.expertise) {
                mountExpandableCertificates(certificates, resumeData.expertise, titleText, renderExpertiseItem);
            }
        }
    });
}

function populateContact() {
    const emailCard = document.querySelector('.contact-card-link');
    const emailText = document.querySelector('.contact-email');

    if (emailCard && resumeData.contact.email) {
        emailCard.href = `mailto:${resumeData.contact.email}`;
    }

    if (emailText && resumeData.contact.email) {
        emailText.textContent = resumeData.contact.email;
    }

    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        const socialType = link.getAttribute('data-social');
        if (!socialType) return;

        const rawHref = resumeData?.socialLinks?.[socialType];
        const href = (typeof rawHref === 'string') ? rawHref.trim() : '';

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

        const normalizedHref = /^https?:\/\//i.test(href) ? href : `https://${href}`;
        link.href = normalizedHref;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
    });
}

function populateQuote() {
    const quoteText = document.querySelector('.quote');

    if (quoteText && resumeData.quote) {
        quoteText.innerHTML = `"${resumeData.quote.text}"<cite>${resumeData.quote.author}</cite>`;
    }
}

function populateFooter() {
    const footerLocation = document.querySelector('.footer-location span');

    if (footerLocation && resumeData.contact.location) {
        footerLocation.textContent = resumeData.contact.location;
    }
}
