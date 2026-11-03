// Portfolio interactions for Amaechina Ikechukwu (Ikay)

document.addEventListener('DOMContentLoaded', () => {
    initBlueprintCorners();
    initContactForm();
});

// Registration-mark corners on every .blueprint frame
function initBlueprintCorners() {
    document.querySelectorAll('.blueprint').forEach(el => {
        ['tl', 'tr', 'bl', 'br'].forEach(pos => {
            const i = document.createElement('i');
            i.className = 'corner ' + pos;
            i.setAttribute('aria-hidden', 'true');
            el.appendChild(i);
        });
    });
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const sent = document.getElementById('form-sent');
    const error = form.querySelector('.form-error');
    const needInput = form.querySelector('input[name="need"]');
    const needButtons = form.querySelectorAll('.need');

    needButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            needButtons.forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
            needInput.value = btn.textContent.trim();
        });
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = form.elements.name.value.trim();
        const email = form.elements.email.value.trim();
        if (!name) return (error.textContent = 'Add your name.');
        if (!/^\S+@\S+\.\S+$/.test(email)) return (error.textContent = 'Add a valid email address.');
        error.textContent = '';

        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });
            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                error.textContent = data.errors
                    ? data.errors.map(err => err.message).join(', ')
                    : 'Something went wrong. Please email me directly instead.';
                return;
            }
            sent.querySelector('[data-sent-name]').textContent = name;
            sent.querySelector('[data-sent-email]').textContent = email;
            form.hidden = true;
            sent.hidden = false;
        } catch (err) {
            error.textContent = 'Network error. Please try again or email me directly.';
        } finally {
            submitBtn.disabled = false;
        }
    });

    sent.querySelector('[data-reset]').addEventListener('click', () => {
        form.elements.message.value = '';
        sent.hidden = true;
        form.hidden = false;
    });
}
