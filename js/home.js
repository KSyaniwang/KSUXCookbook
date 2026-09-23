const practiceNavButtons = [...document.querySelectorAll('.cookbook-subnav button')];
const practicePanels = [...document.querySelectorAll('[data-practice-panel]')];

function activatePractice(tabId, updateHash = true) {
    const selectedButton = practiceNavButtons.find(button => button.dataset.practiceTab === tabId);
    if (!selectedButton) return;

    practiceNavButtons.forEach(item => {
        const isActive = item === selectedButton;
        item.classList.toggle('is-active', isActive);

        if (isActive) {
            item.setAttribute('aria-current', 'page');
        } else {
            item.removeAttribute('aria-current');
        }
    });

    practicePanels.forEach(panel => {
        panel.hidden = panel.dataset.practicePanel !== tabId;
    });

    if (updateHash) {
        history.replaceState(null, '', `${location.pathname}${location.search}#${tabId}`);
    }
}

practiceNavButtons.forEach(button => {
    button.addEventListener('click', () => activatePractice(button.dataset.practiceTab));
});

const requestedPractice = location.hash.slice(1);
activatePractice(
    practiceNavButtons.some(button => button.dataset.practiceTab === requestedPractice)
        ? requestedPractice
        : 'ux-operations',
    false
);

window.addEventListener('hashchange', () => activatePractice(location.hash.slice(1), false));

const designTimelineSteps = {
    kickoff: {
        title: 'Kickoff',
        parties: 'Product Owner · Marketing · Customer Service · Dev team',
        tools: 'Notion · FigJam',
        output: 'Aligned design brief · scope · owners · milestones'
    },
    research: {
        title: 'Research',
        parties: 'End users · Marketing · Customer Service · Product Owner',
        tools: 'GA4 · Microsoft Clarity · FigJam · Notion',
        output: 'Evidence summary · problem definition · opportunities'
    },
    'first-review': {
        title: 'First Review',
        parties: 'Product Owner · Marketing · Creative · Dev team',
        tools: 'Figma · FigJam · Notion',
        output: 'Selected direction · feasibility notes · feedback log'
    },
    prototype: {
        title: 'Prototype Ready',
        parties: 'Product Owner · Creative · Dev team',
        tools: 'Cursor · Codex · Figma MCP · Figma',
        output: 'Clickable prototype · interaction states · test plan'
    },
    testing: {
        title: 'Usability Testing',
        parties: 'Target users · Product Owner · UX Research',
        tools: 'Figma prototype · FigJam · Notion',
        output: 'Test findings · priority fixes · design updates'
    },
    approval: {
        title: 'Final Approval',
        parties: 'Product Owner · Marketing · Creative · Dev team',
        tools: 'Figma · Notion',
        output: 'Approved high-fidelity flow · final content · decision log'
    },
    handoff: {
        title: 'Dev Handoff',
        parties: 'Dev team · Product Owner',
        tools: 'Figma · Tokens Studio · Notion · GitHub',
        output: 'User flow · documentation · component library · design-token JSON'
    },
    'ab-testing': {
        title: 'A/B Testing',
        parties: 'Product Owner · Marketing · Dev team',
        tools: 'Shopify · VWO · GA4',
        output: 'Test variants · experiment results · rollout decision'
    },
    'follow-up': {
        title: 'Follow-up',
        parties: 'Product Owner · Dev team · Marketing',
        tools: 'Figma · Notion · GA4 · Microsoft Clarity',
        output: 'Implementation review · post-release issues · next actions'
    }
};

const timelineToolIcons = {
    'Notion': 'https://api.iconify.design/logos:notion-icon.svg',
    'FigJam': 'https://api.iconify.design/logos:figma.svg',
    'GA4': 'https://api.iconify.design/logos:google-analytics.svg',
    'Microsoft Clarity': 'https://api.iconify.design/arcticons:microsoft-clarity.svg',
    'Figma': 'https://api.iconify.design/logos:figma.svg',
    'Cursor': 'https://api.iconify.design/simple-icons:cursor.svg',
    'Codex': 'https://api.iconify.design/simple-icons:openai.svg',
    'Figma MCP': 'https://api.iconify.design/logos:figma.svg',
    'Figma prototype': 'https://api.iconify.design/logos:figma.svg',
    'Tokens Studio': 'https://api.iconify.design/simple-icons:tokenstudio.svg',
    'GitHub': 'https://api.iconify.design/logos:github-icon.svg',
    'Shopify': 'https://api.iconify.design/logos:shopify.svg',
    'VWO': 'https://api.iconify.design/simple-icons:vwo.svg'
};

function timelineInitials(label) {
    return label
        .split(/\s+/)
        .map(word => word[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
}

function renderTimelineItems(container, values, type) {
    container.replaceChildren();

    values.split(' · ').forEach(value => {
        const label = value.charAt(0).toUpperCase() + value.slice(1);
        const item = document.createElement('span');
        item.className = `timeline-detail-chip timeline-detail-chip--${type}`;

        if (type === 'parties') {
            const avatar = document.createElement('span');
            avatar.className = 'timeline-detail-chip__avatar';
            avatar.textContent = timelineInitials(label);
            item.append(avatar);
        }

        if (type === 'tools' && timelineToolIcons[label]) {
            const logo = document.createElement('img');
            logo.src = timelineToolIcons[label];
            logo.alt = '';
            logo.setAttribute('aria-hidden', 'true');
            logo.addEventListener('error', () => logo.remove(), { once: true });
            item.append(logo);
        }

        if (type === 'output') {
            const check = document.createElement('span');
            check.className = 'material-symbols-outlined';
            check.setAttribute('aria-hidden', 'true');
            check.textContent = 'check';
            item.append(check);
        }

        item.append(document.createTextNode(label));
        container.append(item);
    });
}

document.querySelectorAll('[data-design-timeline]').forEach(timeline => {
    const detail = timeline.parentElement.querySelector('[data-timeline-detail]');
    const buttons = [...timeline.querySelectorAll('[data-timeline-step]')];

    function showTimelineStep(button) {
        const step = designTimelineSteps[button.dataset.timelineStep];
        if (!step) return;

        buttons.forEach(item => {
            const isActive = item === button;
            item.classList.toggle('is-active', isActive);
            item.setAttribute('aria-pressed', String(isActive));
        });

        detail.querySelector('[data-timeline-title]').textContent = step.title;
        renderTimelineItems(detail.querySelector('[data-timeline-parties]'), step.parties, 'parties');
        renderTimelineItems(detail.querySelector('[data-timeline-tools]'), step.tools, 'tools');
        renderTimelineItems(detail.querySelector('[data-timeline-output]'), step.output, 'output');
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => showTimelineStep(button));
    });

    showTimelineStep(buttons.find(button => button.classList.contains('is-active')) || buttons[0]);
});

document.querySelectorAll('[data-brief-carousel]').forEach(carousel => {
    const track = carousel.querySelector('[data-brief-track]');
    const cards = [...track.children];
    const dots = [...carousel.querySelectorAll('[data-brief-dot]')];
    const previousButton = carousel.querySelector('[data-brief-previous]');
    const nextButton = carousel.querySelector('[data-brief-next]');
    let activeIndex = 0;
    let scrollFrame;

    function updateControls(index) {
        activeIndex = Math.max(0, Math.min(index, cards.length - 1));

        dots.forEach((dot, dotIndex) => {
            const isActive = dotIndex === activeIndex;
            dot.classList.toggle('is-active', isActive);

            if (isActive) {
                dot.setAttribute('aria-current', 'true');
            } else {
                dot.removeAttribute('aria-current');
            }
        });

        previousButton.disabled = activeIndex === 0;
        nextButton.disabled = activeIndex === cards.length - 1;
    }

    function showCard(index) {
        const nextIndex = Math.max(0, Math.min(index, cards.length - 1));
        track.scrollTo({
            left: cards[nextIndex].offsetLeft - track.offsetLeft,
            behavior: 'smooth'
        });
        updateControls(nextIndex);
    }

    previousButton.addEventListener('click', () => showCard(activeIndex - 1));
    nextButton.addEventListener('click', () => showCard(activeIndex + 1));

    dots.forEach(dot => {
        dot.addEventListener('click', () => showCard(Number(dot.dataset.briefDot)));
    });

    track.addEventListener('scroll', () => {
        cancelAnimationFrame(scrollFrame);
        scrollFrame = requestAnimationFrame(() => {
            const nearestIndex = cards.reduce((nearest, card, index) => {
                const currentDistance = Math.abs(card.offsetLeft - track.offsetLeft - track.scrollLeft);
                const nearestDistance = Math.abs(cards[nearest].offsetLeft - track.offsetLeft - track.scrollLeft);
                return currentDistance < nearestDistance ? index : nearest;
            }, 0);
            updateControls(nearestIndex);
        });
    }, { passive: true });

    updateControls(0);
});

document.querySelectorAll('.decision-tree-scroll').forEach(wrapper => {
    const canvas = wrapper.querySelector('.decision-tree-canvas');
    const canvasWidth = 1180;
    const canvasHeight = 640;

    function fitDecisionTree() {
        const scale = Math.min(1, wrapper.clientWidth / canvasWidth);
        canvas.style.transform = `scale(${scale})`;
        canvas.style.marginLeft = `${Math.max(0, (wrapper.clientWidth - canvasWidth) / 2)}px`;
        wrapper.style.height = `${canvasHeight * scale}px`;
    }

    new ResizeObserver(fitDecisionTree).observe(wrapper);
    fitDecisionTree();
});
