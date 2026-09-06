// Portfolio Interactive Logic for Amaechina Ikechukwu (Ikay)

document.addEventListener('DOMContentLoaded', () => {
    initScrollObserver();
    initProjectModal();
    initProjectFilters();
    initContactForm();
    initNavbarScroll();
});

// Projects Data from about.md
const projectsData = {
    'vigilmed': {
        title: 'Vigil Med',
        category: 'Mobile App • Health Tracking',
        image: 'assets/images/vigil/image.png',
        subtitle: 'Medication Reminder & Comprehensive Health Tracking App',
        description: 'Vigil Med helps people stay on top of their medications and health routines. It combines full-screen dose alarms, flexible prescription schedules, and drug and food interaction checks (sourced from NIH DailyMed, MedlinePlus, and NCCIH) with adherence tracking, vitals logging, and doctor-shareable health summaries. All data stays on-device by default.',
        tags: ['React Native', 'Expo', 'Mobile Dev', 'HealthTech', 'Local Storage'],
        metrics: [
            { label: 'Platform', value: 'iOS & Android' },
            { label: 'Data Storage', value: 'On-Device' },
            { label: 'Interaction Checks', value: 'NIH Medline' }
        ],
        liveUrl: 'https://vigilmed.health/',
        githubUrl: '#'
    },
    'churchset': {
        title: 'Churchset',
        category: 'SaaS Platform • Church Management',
        image: 'assets/images/project-saas.jpg',
        subtitle: 'Complete Administrative & Membership Platform for Churches',
        description: 'Churchset is a platform built to help churches manage their operations: membership records, giving, events, and the day-to-day administrative work that keeps a congregation running smoothly. Leading core frontend and platform development.',
        tags: ['React', 'JavaScript', 'Bun / Express', 'PostgreSQL', 'Drizzle ORM'],
        metrics: [
            { label: 'Platform Type', value: 'SaaS Cloud' },
            { label: 'Role', value: 'Lead Dev' },
            { label: 'Modules', value: 'Giving & Members' }
        ],
        liveUrl: 'https://app.churchset.com/',
        githubUrl: '#'
    },
    'shorelands': {
        title: 'Shorelands British Academy',
        category: 'Client Website • WordPress',
        image: 'assets/images/project-3d.jpg',
        subtitle: 'Official Web Platform for British/Nigerian Curriculum School',
        description: 'A full website build for Shorelands British Academy, a British/Nigerian curriculum school in Aba. The site covers admissions, academic programs across all age groups, campus life, and parent testimonials, giving the school a professional online presence.',
        tags: ['WordPress', 'PHP', 'Custom Styling', 'UI/UX', 'SEO'],
        metrics: [
            { label: 'Location', value: 'Aba, Nigeria' },
            { label: 'Curriculum', value: 'British / NG' },
            { label: 'Features', value: 'Admissions & Portal' }
        ],
        liveUrl: 'http://shorelandsbritishacademy.com',
        githubUrl: '#'
    },
    'nduk': {
        title: 'Nigerian Doctors in the UK (NDUK)',
        category: 'Client Platform • Wix / Velo',
        image: 'assets/images/project-fintech.jpg',
        subtitle: 'Membership Platform & Automated PDF Workflow System',
        description: 'Ongoing development work for NDUK\'s membership platform, including custom features built on top of Wix using Velo: membership registration flows, automated PDF generation for member documents, CMS and automation fixes, and platform maintenance.',
        tags: ['Wix / Velo', 'JavaScript', 'PDF Generation', 'CMS', 'Automations'],
        metrics: [
            { label: 'Client', value: 'NDUK (UK)' },
            { label: 'Features', value: 'Auto-PDF & CMS' },
            { label: 'Flows', value: 'Member Registration' }
        ],
        liveUrl: 'https://nduk.org',
        githubUrl: '#'
    },
    'oruphcenter': {
        title: 'ORU Port Harcourt Study Center',
        category: 'Client Website • Education Platform',
        image: 'assets/images/oruphcenter.png',
        subtitle: 'Official Academic Platform & Admissions System',
        description: 'The official web platform for Oral Roberts University (ORU) Port Harcourt Study Center in partnership with Peaceland University Enugu. Features academic degree program offerings across undergraduate, postgraduate, and diploma degrees, online application flows, flexible weekend/hybrid modules, and student portal access.',
        tags: ['React', 'Vite', 'Tailwind CSS', 'EducationTech', 'Web Architecture'],
        metrics: [
            { label: 'Location', value: 'Port Harcourt' },
            { label: 'Partnership', value: 'ORU / Peaceland' },
            { label: 'Features', value: 'Admissions & Portal' }
        ],
        liveUrl: 'https://www.oruphcenter.org/',
        githubUrl: '#'
    }
};

function initScrollObserver() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    revealElements.forEach(el => observer.observe(el));
}

function initProjectModal() {
    const modal = document.getElementById('project-modal');
    const closeBtn = document.getElementById('close-modal-btn');
    const modalBackdrop = document.getElementById('modal-backdrop');
    if (!modal) return;

    document.addEventListener('click', (e) => {
        const targetBtn = e.target.closest('[data-open-modal]');
        if (targetBtn) {
            const projectId = targetBtn.getAttribute('data-open-modal');
            openModal(projectId);
        }
    });

    function openModal(id) {
        const data = projectsData[id];
        if (!data) return;

        document.getElementById('modal-img').src = data.image;
        document.getElementById('modal-title').textContent = data.title;
        document.getElementById('modal-category').textContent = data.category;
        document.getElementById('modal-subtitle').textContent = data.subtitle;
        document.getElementById('modal-desc').textContent = data.description;

        const liveBtn = document.getElementById('modal-live-link');
        if (liveBtn) liveBtn.href = data.liveUrl;

        const tagsContainer = document.getElementById('modal-tags');
        tagsContainer.innerHTML = data.tags.map(tag => 
            `<span class="px-3 py-1 text-xs font-medium rounded-full bg-peach-100/80 text-peach-900 border border-peach-200/50">${tag}</span>`
        ).join('');

        const metricsContainer = document.getElementById('modal-metrics');
        metricsContainer.innerHTML = data.metrics.map(m => `
            <div class="p-3 bg-neutral-50 rounded-xl border border-neutral-100 text-center">
                <div class="text-base font-bold text-neutral-900">${m.value}</div>
                <div class="text-xs text-neutral-500 font-medium">${m.label}</div>
            </div>
        `).join('');

        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
        setTimeout(() => modal.classList.add('modal-open'), 10);
    }

    function closeModal() {
        modal.classList.remove('modal-open');
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }, 300);
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
}

function initProjectFilters() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-filter');
            filterButtons.forEach(b => {
                b.classList.remove('bg-neutral-900', 'text-white', 'shadow-md');
                b.classList.add('bg-white/80', 'text-neutral-600', 'hover:bg-neutral-100');
            });
            btn.classList.remove('bg-white/80', 'text-neutral-600', 'hover:bg-neutral-100');
            btn.classList.add('bg-neutral-900', 'text-white', 'shadow-md');

            projectCards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                if (category === 'all' || cardCat.includes(category)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => card.style.display = 'none', 250);
                }
            });
        });
    });
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    const toast = document.getElementById('toast-notification');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Sending...</span>`;

        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                form.reset();
                if (toast) {
                    toast.classList.remove('translate-y-20', 'opacity-0');
                    toast.classList.add('translate-y-0', 'opacity-100');
                    setTimeout(() => {
                        toast.classList.remove('translate-y-0', 'opacity-100');
                        toast.classList.add('translate-y-20', 'opacity-0');
                    }, 4000);
                }
            } else {
                const data = await response.json();
                alert(data.errors ? data.errors.map(err => err.message).join(', ') : 'Failed to submit form. Please check details or email directly.');
            }
        } catch (err) {
            alert('Network error. Please try sending again or contact via direct email.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            if (window.lucide) lucide.createIcons();
        }
    });
}

function initNavbarScroll() {
    const navbar = document.getElementById('main-navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('py-2', 'shadow-lg', 'bg-white/90');
            navbar.classList.remove('py-2.5', 'bg-white/85');
        } else {
            navbar.classList.add('py-2.5', 'bg-white/85');
            navbar.classList.remove('py-2', 'shadow-lg', 'bg-white/90');
        }
    });
}
