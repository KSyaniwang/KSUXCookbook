// Scroll progress bar
const progressBar = document.getElementById('scroll-progress-bar');
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = `${progress}%`;
});

// Scroll to top
const scrollTopBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
    scrollTopBtn?.classList.toggle('visible', window.scrollY > 300);
});
scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Fade-in on scroll
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// Journey map. interactive key issues (7 steps)
const journeyStepData = {
    1: {
        title: 'Homepage',
        sublabel: 'Promo led entry',
        severity: 'high',
        thumb: 'assets/journey/01-homepage.png',
        detailImage: 'assets/journey-audit/01-homepage.png'
    },
    2: {
        title: 'Collections',
        sublabel: 'Category browse',
        severity: 'high',
        thumb: 'assets/journey/02-collections.png',
        detailImage: 'assets/journey-audit/02-collections.png'
    },
    3: {
        title: 'Skin Concerns',
        sublabel: 'Sub category browse',
        severity: 'high',
        thumb: 'assets/journey/03-skin-concerns.png',
        detailImage: 'assets/journey-audit/03-skin-concerns.png'
    },
    4: {
        title: 'Search',
        sublabel: 'Keyword lookup',
        severity: 'low',
        thumb: 'assets/journey/03-search.png',
        detailImage: 'assets/journey-audit/04-search.png'
    },
    5: {
        title: 'Product listing',
        sublabel: 'Compare & filter',
        severity: 'low',
        thumb: 'assets/journey/04-product-listing.png',
        detailImage: 'assets/journey-audit/05-product-listing.png'
    },
    6: {
        title: 'Product detail',
        sublabel: 'Evaluate & add',
        severity: 'medium',
        thumb: 'assets/journey/05-product-detail.png',
        detailImage: 'assets/journey-audit/06-product-detail.png'
    }
};

function buildJourneyAuditContent(data) {
    const imageSrc = typeof assetUrl === 'function' ? assetUrl(data.detailImage) : data.detailImage;

    return `
        <div class="journey-detail">
            <div class="journey-detail__visual">
                <img src="${imageSrc}" alt="${data.title} annotated audit" class="journey-detail__image"/>
            </div>
        </div>`;
}

function showJourneyStep(stepId) {
    document.querySelectorAll('.journey-screen').forEach(screen => {
        const isActive = parseInt(screen.dataset.step, 10) === stepId;
        screen.classList.toggle('active-journey-screen', isActive);
        screen.setAttribute('aria-pressed', String(isActive));
    });

    const data = journeyStepData[stepId];
    const contentEl = document.getElementById('detail-content');
    const container = document.getElementById('details-container');

    if (contentEl) contentEl.innerHTML = buildJourneyAuditContent(data);

    if (container) {
        container.style.opacity = '0.5';
        container.style.transform = 'translateY(4px)';
        setTimeout(() => {
            container.style.opacity = '1';
            container.style.transform = 'translateY(0)';
        }, 50);
    }
}

document.querySelectorAll('.journey-screen').forEach(screen => {
    screen.addEventListener('click', () => {
        const stepId = parseInt(screen.dataset.step, 10);
        showJourneyStep(stepId);
    });
});

showJourneyStep(1);

// Issue audit grid
const issueAuditData = [
    {
        id: 1,
        screenTitle: 'Homepage',
        image: 'assets/journey/01-homepage.png',
        layout: 'flow',
        markers: [
            {
                id: 1, top: 28, left: 50,
                severity: 'medium',
                text: 'Too many discovery paths compete on the same screen. The skin quiz, promotions, Shop For categories, free gifts, new arrivals, and brand/social cards all have value, but they are not clearly prioritized. The promotional banners are visually dominant, but the destination is not always predictable. When I tap a promotion, I expect to see relevant campaign products or product details. If it leads into a broader category path, the interaction feels slightly mismatched.'
            },
            {
                id: 2, top: 65, left: 50,
                severity: 'medium',
                text: 'The “Shop For” section gives useful category shortcuts, but users only see part of the category set at first. This can make discovery feel limited, especially if the user does not already know they can scroll.'
            },
            {
                id: 3, top: 11, left: 50,
                severity: 'medium',
                text: 'For users who already know what they want, the search bar works well. But for users who are browsing or trying to understand their skin needs, the homepage could make the guidance stronger.'
            }
        ],
        analysis: [
            'The homepage already offers many ways to discover products. This is useful because different users may enter with different intentions and the homepage needs to expose many selling points at once.'
        ],
        improve: [
            'I would keep the richness of the homepage, but organize it more clearly around user intent.',
            'I would add a lightweight category navigation bar near the top of the homepage, below the search bar or hero banner. This keeps the commercial homepage structure, but makes the discovery logic easier to understand.'
        ]
    },
    {
        id: 2,
        screenTitle: 'Collections',
        image: 'assets/journey/02-collections.png',
        layout: 'flow',
        markers: [
            {
                id: 1, top: 26, left: 50,
                severity: 'high',
                text: 'We can have the user flow as looking for after sun. Since it is more of a skin concern, I would naturally go into Skin Concerns. But once I do not find anything directly related to after sun, I want to search from there. The problem is that search is not available inside this category context, so I need to go back to the homepage and use the main search bar.'
            },
            {
                id: 2, top: 55, left: 50,
                severity: 'high',
                text: 'The category cards are clear, but the structure is quite static. Once users enter Collections, they cannot easily refine their intent through search.'
            }
        ],
        analysis: [
            'When the user enters Collections, they see many categories, this is useful because skincare users often browse by category instead of knowing an exact product name.'
        ],
        improve: [
            'I would add a contextual search bar inside Collections. This would make Collections feel more flexible and would help users recover when the category label does not match their own wording.'
        ]
    },
    {
        id: 3,
        screenTitle: 'Search',
        image: 'assets/journey/03-search.png',
        layout: 'flow',
        markers: [],
        analysis: [
            'After going back to the homepage and searching “after sun,” the app shows preview results. This is a good part of the experience because users can quickly scan whether the results are relevant before entering a full product listing. If the user wants to see more, they can tap “show more” and move into the product listing page.'
        ],
        improve: [
            'I would keep the search preview because it is useful, but make search accessible from more places, especially Collections and product listing pages.',
            'I would also add related suggestions when the query is broad or unclear, such as: Products, Related categories, Related concerns, etc. (all of the things should be added based on the ux research). This would make search more supportive for skincare users who may not know the exact product term.'
        ]
    },
    {
        id: 4,
        screenTitle: 'Product listing',
        image: 'assets/journey/04-product-listing.png',
        layout: 'flow',
        markers: [
            {
                id: 1, top: 42, left: 50,
                severity: 'high',
                text: 'The main issue is product card consistency. Some product cards communicate ingredients, some communicate usage, and some communicate product type or target area, such as eyes. The information is useful, but because it changes from card to card, comparison becomes harder.'
            }
        ],
        analysis: [
            'The product listing page is one of the stronger parts of the flow. Product images are large and clear, which makes browsing feel visually pleasant. The product listing follows a standard ecommerce pattern: show a broad catalog first, then let users sort and filter. This makes sense for a skincare retailer with many SKUs and brands.'
        ],
        improve: [
            'I would standardize product cards so every card shows the same core decision information.',
            'the things will be based on the ux research to decide which one should go upfront.',
            'This would make the listing page easier to scan and compare.'
        ]
    },
    {
        id: 5,
        screenTitle: 'Product detail',
        image: 'assets/journey/05-product-detail.png',
        layout: 'flow',
        markers: [
            {
                id: 1, top: 60, left: 58,
                severity: 'medium',
                text: 'There are some visual inconsistencies. Left and right padding does not always align, typography sizes vary, and there are many different combinations of font size, color, bold text, and regular text on the same page.'
            },
            {
                id: 2, top: 90, left: 50,
                severity: 'medium',
                text: 'Some text sections also feel plain and not designed enough, especially on information heavy pages.'
            }
        ],
        analysis: [
            'After selecting a product, the product detail page gives users the key purchase information and add to cart. The add to cart action is clear, and the page also has recent reviews, and the swipe interaction is consistent with other carousel style sections in the app.'
        ],
        improve: [
            'I would create a cleaner product detail structure with consistent spacing, simplified typography, and scannable sections like Key benefits, Ingredients, How to use, and Reviews.'
        ]
    }
];

if (typeof assetUrl === 'function') {
    issueAuditData.forEach(item => {
        if (item.image) item.image = assetUrl(item.image);
    });
}

function severityLabel(severity) {
    if (severity === 'high') return 'High severity';
    if (severity === 'low') return 'Low severity';
    return 'Medium severity';
}

function renderFlowPanelFull(audit) {
    const analysisHtml = audit.analysis.map(p => `<p class="issue-audit__text">${p}</p>`).join('');
    const hasMarkers = audit.markers?.length > 0;
    const markerCalloutHtml = hasMarkers
        ? `<div class="issue-audit__callout" data-callout>
                <p class="issue-audit__text issue-audit__callout-hint">Click a numbered marker on the screen to see more detail.</p>
           </div>`
        : '';

    return `
        <div class="issue-audit__block">
            <h4 class="issue-audit__label">What I have changed</h4>
            ${analysisHtml}
            ${markerCalloutHtml}
        </div>`;
}

function renderSeverityTag(severity) {
    if (severity !== 'high') return '';
    return '<span class="issue-audit__severity-tag">High severity</span>';
}

function renderFlowCallout(marker) {
    if (!marker) {
        return '<p class="issue-audit__text issue-audit__callout-hint">Click a numbered marker on the screen to see more detail.</p>';
    }
    return `
        ${renderSeverityTag(marker.severity)}
        <p class="issue-audit__text issue-audit__callout-text">${marker.text}</p>`;
}

function showFlowMarker(auditEl, markerId) {
    const auditId = parseInt(auditEl.dataset.audit, 10);
    const audit = issueAuditData.find(a => a.id === auditId);
    const marker = audit?.markers?.find(m => m.id === markerId);
    if (!marker) return;

    auditEl.querySelectorAll('.issue-marker--clickable').forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.marker, 10) === markerId);
    });

    const callout = auditEl.querySelector('[data-callout]');
    if (callout) callout.innerHTML = renderFlowCallout(marker);
}

function renderIssuePanel(hotspot) {
    return `
        <div class="issue-audit__severity issue-audit__severity--${hotspot.severity}">
            <span class="issue-audit__severity-dot"></span>
            ${severityLabel(hotspot.severity)}
        </div>
        <h3 class="issue-audit__issue-title">${hotspot.title}</h3>
        <div class="issue-audit__section">
            <h4 class="issue-audit__label">What I have changed</h4>
            <p class="issue-audit__text">${hotspot.problem}</p>
        </div>`;
}

function showIssueHotspot(auditEl, hotspotId) {
    const data = issueAuditData.find(a => a.id === parseInt(auditEl.dataset.audit, 10));
    const hotspot = data?.hotspots.find(h => h.id === hotspotId);
    if (!hotspot) return;

    auditEl.querySelectorAll('.issue-hotspot').forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.hotspot, 10) === hotspotId);
    });

    const panel = auditEl.querySelector('.issue-audit__panel');
    if (panel) panel.innerHTML = renderIssuePanel(hotspot);
}

function buildIssueAudit(audit) {
    const isFlow = audit.layout === 'flow';

    const markersHtml = isFlow
        ? (audit.markers || []).map(m => `
            <button type="button" class="issue-marker issue-marker--clickable" data-marker="${m.id}" style="top:${m.top}%;left:${m.left}%;" aria-label="Annotation ${m.id}">${m.id}</button>
        `).join('')
        : (() => {
            const first = audit.hotspots[0];
            return audit.hotspots.map(h => `
                <button type="button" class="issue-hotspot${h.id === first.id ? ' active' : ''}" data-hotspot="${h.id}" style="top:${h.top}%;left:${h.left}%;" aria-label="Issue ${h.id}: ${h.title}">${h.id}</button>
            `).join('');
        })();

    const panelHtml = isFlow
        ? renderFlowPanelFull(audit)
        : renderIssuePanel(audit.hotspots[0]);

    const screenContent = isFlow
        ? `<div class="issue-audit__device">
                <img src="${audit.image}" alt="${audit.screenTitle} audit screen" class="issue-audit__image"/>
                ${markersHtml}
           </div>`
        : `<img src="${audit.image}" alt="${audit.screenTitle} audit screen" class="issue-audit__image issue-audit__image--full"/>
           ${markersHtml}`;

    return `
        <article class="issue-audit${isFlow ? ' issue-audit--flow' : ''} fade-in" data-audit="${audit.id}">
            <div class="issue-audit__inner">
                <div class="issue-audit__screen${isFlow ? '' : ' issue-audit__screen--legacy'}">
                    ${screenContent}
                    <span class="issue-audit__screen-title">${audit.screenTitle}</span>
                </div>
                <div class="issue-audit__panel">
                    ${panelHtml}
                </div>
            </div>
        </article>`;
}

function initIssueAudits() {
    const grid = document.getElementById('issue-audits-grid');
    if (!grid) return;

    grid.innerHTML = issueAuditData.map(buildIssueAudit).join('');

    grid.querySelectorAll('.issue-audit').forEach(auditEl => {
        const auditId = parseInt(auditEl.dataset.audit, 10);
        const audit = issueAuditData.find(a => a.id === auditId);

        if (audit?.layout === 'flow') {
            auditEl.querySelectorAll('.issue-marker--clickable').forEach(btn => {
                btn.addEventListener('click', () => {
                    showFlowMarker(auditEl, parseInt(btn.dataset.marker, 10));
                });
            });
            return;
        }

        auditEl.querySelectorAll('.issue-hotspot').forEach(btn => {
            btn.addEventListener('click', () => {
                showIssueHotspot(auditEl, parseInt(btn.dataset.hotspot, 10));
            });
        });
    });

    grid.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));
}

initIssueAudits();

// Prototype modal
const protoModal = document.getElementById('prototype-modal');
const protoClose = document.getElementById('prototype-close');

protoClose?.addEventListener('click', () => protoModal?.classList.remove('open'));
protoModal?.addEventListener('click', (e) => {
    if (e.target === protoModal) protoModal.classList.remove('open');
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') protoModal?.classList.remove('open');
});

// Roadmap phase interactivity
const roadmapPhases = document.querySelectorAll('.roadmap-phase');

roadmapPhases.forEach((phase, index) => {
    phase.addEventListener('click', () => {
        roadmapPhases.forEach(p => p.classList.remove('active'));
        phase.classList.add('active');
    });
    if (index === 0) phase.classList.add('active');
});

// Sub-nav within UX Review — toggle Context vs Target Users & Competitive Benchmarks
const subNavLinks = document.querySelectorAll('.sub-nav-link[data-review-tab]');
const reviewPanels = document.querySelectorAll('[data-review-panel]');

function showReviewPanel(tabId) {
    reviewPanels.forEach(panel => {
        const isActive = panel.dataset.reviewPanel === tabId;
        panel.hidden = !isActive;
        if (isActive) panel.classList.add('visible');
    });

    subNavLinks.forEach(link => {
        const isActive = link.dataset.reviewTab === tabId;
        link.classList.toggle('text-primary', isActive);
        link.classList.toggle('font-bold', isActive);
        link.classList.toggle('text-on-surface-variant', !isActive);
        link.setAttribute('aria-selected', String(isActive));
    });
}

subNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        showReviewPanel(link.dataset.reviewTab);
    });
});

if (subNavLinks.length) {
    showReviewPanel('context');
}

// Persona accordions (interactive only, skip static personas)
document.querySelectorAll('.persona-accordion:not(.persona-accordion--secondary)').forEach(accordion => {
    const trigger = accordion.querySelector('.persona-trigger');
    trigger?.addEventListener('click', () => {
        const isOpen = accordion.classList.contains('open');
        accordion.classList.toggle('open', !isOpen);
        trigger.setAttribute('aria-expanded', String(!isOpen));
    });
});

// Metric accordions
function syncMetricsGrid(grid) {
    const openAccordion = grid.querySelector('.metric-accordion.open');
    if (!openAccordion) return;

    const content = openAccordion.querySelector('.metric-content');
    if (content) content.style.maxHeight = `${content.scrollHeight}px`;
}

function collapseMetricAccordion(accordion) {
    const trigger = accordion.querySelector('.metric-trigger');
    const content = accordion.querySelector('.metric-content');
    accordion.classList.remove('open');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
    if (content) content.style.maxHeight = '0px';
}

document.querySelectorAll('.metrics-grid').forEach(grid => {
    grid.querySelectorAll('.metric-accordion').forEach(accordion => {
        const trigger = accordion.querySelector('.metric-trigger');
        const content = accordion.querySelector('.metric-content');
        if (!trigger || !content) return;

        const measureContentHeight = () => {
            content.style.maxHeight = 'none';
            const height = content.scrollHeight;
            content.style.maxHeight = accordion.classList.contains('open') ? `${height}px` : '0px';
            return height;
        };

        const setExpanded = (expanded) => {
            accordion.classList.toggle('open', expanded);
            trigger.setAttribute('aria-expanded', String(expanded));

            if (expanded) {
                const height = measureContentHeight();
                content.style.maxHeight = '0px';
                requestAnimationFrame(() => {
                    content.style.maxHeight = `${height}px`;
                });
            } else {
                content.style.maxHeight = '0px';
            }
        };

        trigger.addEventListener('click', () => {
            const willExpand = !accordion.classList.contains('open');

            grid.querySelectorAll('.metric-accordion.open').forEach(other => {
                if (other !== accordion) collapseMetricAccordion(other);
            });

            setExpanded(willExpand);
        });
    });

    window.addEventListener('resize', () => syncMetricsGrid(grid));
});

// Design system card detail panel
function dsSpecFigure(image, alt) {
    const src = typeof assetUrl === 'function' ? assetUrl(image) : image;
    return `
        <figure class="ds-spec-figure">
            <img src="${src}" alt="${alt}" class="ds-spec-figure__img" loading="lazy" decoding="async"/>
        </figure>`;
}

function dsTokenProps(props) {
    return props.map(([key, tokenName, cssVar, note]) => {
        const noteHtml = note ? `<code>${note}</code>` : '';
        const varHtml = cssVar ? `<code>${cssVar}</code>` : '';
        return `
            <div class="ds-token-prop">
                <span class="ds-token-prop__key">${key}</span>
                <div class="ds-spec-type__meta">
                    <strong>${tokenName}</strong>
                    ${varHtml}
                    ${noteHtml}
                </div>
            </div>`;
    }).join('');
}

function dsBtnComp({ token, label, btnClass, btnText, hint, specImage, specAlt, props }) {
    const propsHtml = dsTokenProps(props);
    const stageContent = specImage
        ? dsSpecFigure(specImage, specAlt || label)
        : `
                <button type="button" class="ds-spec-btn ${btnClass}">${btnText}</button>
                ${hint ? `<p class="ds-btn-comp__hint">${hint}</p>` : ''}`;
    const stageClass = specImage ? 'ds-btn-comp__stage ds-btn-comp__stage--figure' : 'ds-btn-comp__stage';

    return `
        <div class="ds-btn-comp">
            <div class="ds-btn-comp__head">
                <code>${token}</code>
                <span>${label}</span>
            </div>
            <div class="${stageClass}">
                ${stageContent}
            </div>
            <div class="ds-token-props">${propsHtml}</div>
        </div>`;
}

function dsCompSpec({ token, label, context, specImage, specAlt, stageClass = '', props }) {
    const propsHtml = dsTokenProps(props);
    return `
        <div class="ds-comp-spec">
            <div class="ds-comp-spec__head">
                <code>${token}</code>
                <span>${context}</span>
            </div>
            <div class="ds-comp-spec__stage ds-comp-spec__stage--figure${stageClass ? ` ${stageClass}` : ''}">
                ${dsSpecFigure(specImage, specAlt || label)}
            </div>
            <div class="ds-token-props">${propsHtml}</div>
        </div>`;
}

const designSystemPanels = {
    typography: {
        title: 'Typography & spacing',
        html: `
            <div class="ds-spec">
                <div class="ds-spec__block">
                    <div class="ds-spec__block-head">
                        <p class="ds-spec__block-title">Type scale</p>
                        <p class="ds-spec__block-note">Plus Jakarta Sans · prototype screens</p>
                    </div>
                    <div class="ds-spec__block-body">
                        <div class="ds-spec-type">
                            <span class="ds-spec-type__sample" style="font-size:20px;line-height:28px;font-weight:700;">Skin Concerns</span>
                            <div class="ds-spec-type__meta"><strong>title-lg</strong><code>20px / 28px / 700</code></div>
                        </div>
                        <div class="ds-spec-type">
                            <span class="ds-spec-type__sample" style="font-size:16px;line-height:24px;font-weight:700;">Final Price €18.55</span>
                            <div class="ds-spec-type__meta"><strong>title-md</strong><code>16px / 24px / 700</code></div>
                        </div>
                        <div class="ds-spec-type">
                            <span class="ds-spec-type__sample" style="font-size:15px;line-height:20px;font-weight:500;">Purchase the products you saved during the session.</span>
                            <div class="ds-spec-type__meta"><strong>body-lg</strong><code>15px / 20px / 500</code></div>
                        </div>
                        <div class="ds-spec-type">
                            <span class="ds-spec-type__sample" style="font-size:14px;line-height:20px;font-weight:600;">Madagascar Centella Light Cleansing Oil</span>
                            <div class="ds-spec-type__meta"><strong>body-md-semibold</strong><code>14px / 20px / 600</code></div>
                        </div>
                        <div class="ds-spec-type">
                            <span class="ds-spec-type__sample ds-spec-type__sample--muted" style="font-size:14px;line-height:20px;font-weight:500;">Cart Total</span>
                            <div class="ds-spec-type__meta"><strong>body-md</strong><code>14px / 20px / 500</code><code>color #6b7280</code></div>
                        </div>
                        <div class="ds-spec-type">
                            <span class="ds-spec-type__sample ds-spec-type__sample--brand" style="font-size:14px;line-height:20px;font-weight:500;">€6.35</span>
                            <div class="ds-spec-type__meta"><strong>body-md-accent</strong><code>14px / 20px / 500</code><code>color #8f4570</code></div>
                        </div>
                        <div class="ds-spec-type">
                            <span class="ds-spec-type__sample ds-spec-type__sample--strike" style="font-size:14px;line-height:20px;font-weight:400;">€24.90</span>
                            <div class="ds-spec-type__meta"><strong>body-md-muted</strong><code>14px / 20px / 400</code><code>color #9ca3af</code></div>
                        </div>
                        <div class="ds-spec-type">
                            <span class="ds-spec-type__sample" style="font-size:12px;line-height:16px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;">Sort</span>
                            <div class="ds-spec-type__meta"><strong>label-sm</strong><code>12px / 16px / 700</code><code>uppercase +1.2px</code></div>
                        </div>
                        <div class="ds-spec-type">
                            <span class="ds-spec-type__sample" style="font-size:10px;line-height:15px;font-weight:500;color:#111827;">Cart</span>
                            <div class="ds-spec-type__meta"><strong>label-xs</strong><code>10px / 15px / 500</code><code>inactive #a5abb0</code></div>
                        </div>
                    </div>
                </div>

                <div class="ds-spec__block">
                    <div class="ds-spec__block-head">
                        <p class="ds-spec__block-title">Spacing &amp; radius tokens</p>
                        <p class="ds-spec__block-note">8px base unit</p>
                    </div>
                    <div class="ds-spec__block-body ds-layout-tokens">
                        <div class="ds-layout-tokens__group">
                            <p class="ds-layout-tokens__label">Spacing</p>
                            <div class="ds-token-inline-list">
                                <div class="ds-token-inline">
                                    <span class="ds-token-inline__value">8px</span>
                                    <div class="ds-spec-type__meta ds-spec-type__meta--inline"><strong>spacing-xs</strong><code>--token-spacing-xs</code></div>
                                </div>
                                <div class="ds-token-inline">
                                    <span class="ds-token-inline__value">12px</span>
                                    <div class="ds-spec-type__meta ds-spec-type__meta--inline"><strong>spacing-sm</strong><code>--token-spacing-sm</code></div>
                                </div>
                                <div class="ds-token-inline">
                                    <span class="ds-token-inline__value">16px</span>
                                    <div class="ds-spec-type__meta ds-spec-type__meta--inline"><strong>spacing-md</strong><code>--token-spacing-md</code></div>
                                </div>
                                <div class="ds-token-inline">
                                    <span class="ds-token-inline__value">24px</span>
                                    <div class="ds-spec-type__meta ds-spec-type__meta--inline"><strong>spacing-lg</strong><code>--token-spacing-lg</code></div>
                                </div>
                                <div class="ds-token-inline">
                                    <span class="ds-token-inline__value">25px</span>
                                    <div class="ds-spec-type__meta ds-spec-type__meta--inline"><strong>spacing-xl</strong><code>--token-spacing-xl</code></div>
                                </div>
                            </div>
                        </div>
                        <div class="ds-layout-tokens__group">
                            <p class="ds-layout-tokens__label">Radius</p>
                            <div class="ds-spec-radius ds-spec-radius--compact">
                                <div class="ds-spec-radius__item">
                                    <span class="ds-spec-radius__shape ds-spec-radius__shape--r8"></span>
                                    <div class="ds-spec-type__meta ds-spec-type__meta--center">
                                        <strong>radius-icon</strong>
                                        <code>--token-radius-icon</code>
                                        <code>8px</code>
                                    </div>
                                </div>
                                <div class="ds-spec-radius__item">
                                    <span class="ds-spec-radius__shape ds-spec-radius__shape--r12"></span>
                                    <div class="ds-spec-type__meta ds-spec-type__meta--center">
                                        <strong>radius-card</strong>
                                        <code>--token-radius-card</code>
                                        <code>12px</code>
                                    </div>
                                </div>
                                <div class="ds-spec-radius__item">
                                    <span class="ds-spec-radius__shape ds-spec-radius__shape--pill"></span>
                                    <div class="ds-spec-type__meta ds-spec-type__meta--center">
                                        <strong>radius-pill</strong>
                                        <code>--token-radius-pill</code>
                                        <code>9999px</code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    cta: {
        title: 'CTA hierarchy',
        html: `
            <div class="ds-spec">
                <p class="ds-spec-rule"><strong>Rule:</strong> One filled primary button per screen. Secondary actions stay outlined or low contrast so users always know what to tap next.</p>
                <div class="ds-spec__grid ds-spec__grid--2 ds-spec__grid--btn-comps">
                    ${dsBtnComp({
                        token: 'btn-secondary',
                        label: 'Go to cart',
                        specImage: './assets/design-specs/btn-secondary.png',
                        specAlt: 'Go to cart button spec with 16px vertical padding and full width',
                        props: [
                            ['type', 'btn-type-outline', null, 'outline'],
                            ['width', 'width-fill', null, 'fill'],
                            ['pad', 'spacing-md', '--token-spacing-md', '16px vertical'],
                            ['radius', 'radius-card', '--token-radius-card', '12px'],
                            ['border', 'action-secondary-border', '--token-action-secondary-border', null],
                            ['text', 'action-secondary-text', '--token-action-secondary-text', null]
                        ]
                    })}
                    ${dsBtnComp({
                        token: 'btn-primary',
                        label: 'Add to cart',
                        specImage: './assets/design-specs/btn-primary-pdp.png',
                        specAlt: 'Add to cart button spec with 16px vertical padding and full width',
                        props: [
                            ['type', 'btn-type-filled', null, 'filled'],
                            ['width', 'width-fill', null, 'fill'],
                            ['pad', 'spacing-md', '--token-spacing-md', '16px vertical'],
                            ['fill', 'action-primary', '--token-action-primary', null],
                            ['text', 'on-action-primary', '--token-on-action-primary', null]
                        ]
                    })}
                </div>
            </div>
        `
    },
    components: {
        title: 'Components & icons',
        html: `
            <div class="ds-spec">
                <div class="ds-spec__grid ds-spec__grid--3 ds-spec__grid--comp-specs">
                ${dsCompSpec({
                    token: 'nav-tab-bar',
                    label: 'Tab bar',
                    context: 'Every screen',
                    specImage: './assets/design-specs/nav-tab-bar.png',
                    specAlt: 'Tab bar spec with 24px vertical padding, 36px side padding, and full width',
                    props: [
                        ['width', 'width-fill', null, 'fill'],
                        ['pad', 'spacing-nav', null, '24×36'],
                        ['gap', 'spacing-xs', '--token-spacing-xs', '4px icon-label'],
                        ['label', 'label-xs', null, '10px / 15px / 500'],
                        ['badge', 'badge-pink', '--token-badge-pink', null]
                    ]
                })}

                ${dsCompSpec({
                    token: 'chip-category',
                    label: 'Category chips',
                    context: 'Homepage sub nav',
                    specImage: './assets/design-specs/chip-category.png',
                    specAlt: 'Category chip spec with 12px vertical padding and 8px gap between pills',
                    props: [
                        ['pad', 'spacing-sm', '--token-spacing-sm', '12px vertical'],
                        ['pill pad', 'spacing-pill', null, '6×12'],
                        ['gap', 'spacing-xs', '--token-spacing-xs', '8px'],
                        ['radius', 'radius-pill', '--token-radius-pill', null],
                        ['text', 'text-chip', null, '12px / 500']
                    ]
                })}

                ${dsCompSpec({
                    token: 'card-cart-row',
                    label: 'Cart cards',
                    context: 'Session banner + wishlist',
                    specImage: './assets/design-specs/card-cart-row.png',
                    specAlt: 'Cart banner and wishlist row spec with 36px and 16px inset spacing',
                    props: [
                        ['banner inset', 'spacing-banner', null, '36px'],
                        ['icon gap', 'spacing-sm', '--token-spacing-sm', '12px'],
                        ['stack gap', 'spacing-stack', null, '36px'],
                        ['row pad', 'spacing-md', '--token-spacing-md', '16px'],
                        ['radius', 'radius-card', '--token-radius-card', '12px']
                    ]
                })}
                </div>
            </div>
        `
    },
    colors: {
        title: 'Color system',
        html: `
            <div class="ds-spec">
                <div class="ds-spec__grid ds-spec__grid--2">
                    <div class="ds-color-spec">
                        <div class="ds-color-spec__head">
                            <p class="ds-color-spec__title">Brand</p>
                            <p class="ds-color-spec__note">Accent + highlights</p>
                        </div>
                        <div class="ds-color-spec__body">
                            <div class="ds-color-swatch">
                                <span class="ds-color-swatch__chip" style="background:var(--token-primary);"></span>
                                <div class="ds-color-swatch__meta">
                                    <strong>primary</strong>
                                    <code>--token-primary</code>
                                    <span>Discount, heart icon, guide labels</span>
                                </div>
                            </div>
                            <div class="ds-color-swatch">
                                <span class="ds-color-swatch__chip" style="background:var(--token-primary-container);"></span>
                                <div class="ds-color-swatch__meta">
                                    <strong>primary-container</strong>
                                    <code>--token-primary-container</code>
                                    <span>Card icon backgrounds</span>
                                </div>
                            </div>
                            <div class="ds-color-swatch">
                                <span class="ds-color-swatch__chip" style="background:var(--token-secondary-container);"></span>
                                <div class="ds-color-swatch__meta">
                                    <strong>secondary-container</strong>
                                    <code>--token-secondary-container</code>
                                    <span>Spec panel accents</span>
                                </div>
                            </div>
                            <div class="ds-color-swatch">
                                <span class="ds-color-swatch__chip" style="background:var(--token-badge-pink);"></span>
                                <div class="ds-color-swatch__meta">
                                    <strong>badge-pink</strong>
                                    <code>--token-badge-pink</code>
                                    <span>Cart tab badge</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="ds-color-spec">
                        <div class="ds-color-spec__head">
                            <p class="ds-color-spec__title">Surface</p>
                            <p class="ds-color-spec__note">Backgrounds + cards</p>
                        </div>
                        <div class="ds-color-spec__body">
                            <div class="ds-color-swatch">
                                <span class="ds-color-swatch__chip ds-color-swatch__chip--border" style="background:var(--token-surface-card);"></span>
                                <div class="ds-color-swatch__meta">
                                    <strong>surface-card</strong>
                                    <code>--token-surface-card</code>
                                    <span>Cards, tab bar, inputs</span>
                                </div>
                            </div>
                            <div class="ds-color-swatch">
                                <span class="ds-color-swatch__chip ds-color-swatch__chip--border" style="background:var(--token-surface);"></span>
                                <div class="ds-color-swatch__meta">
                                    <strong>surface</strong>
                                    <code>--token-surface</code>
                                    <span>Case study + app base</span>
                                </div>
                            </div>
                            <div class="ds-color-swatch">
                                <span class="ds-color-swatch__chip ds-color-swatch__chip--border" style="background:var(--token-surface-low);"></span>
                                <div class="ds-color-swatch__meta">
                                    <strong>surface-low</strong>
                                    <code>--token-surface-low</code>
                                    <span>Guide card, wishlist circle</span>
                                </div>
                            </div>
                            <div class="ds-color-swatch">
                                <span class="ds-color-swatch__chip" style="background:var(--token-surface-muted);"></span>
                                <div class="ds-color-swatch__meta">
                                    <strong>surface-muted</strong>
                                    <code>--token-surface-muted</code>
                                    <span>Muted screen backgrounds</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="ds-spec__grid ds-spec__grid--2">
                    <div class="ds-color-spec">
                        <div class="ds-color-spec__head">
                            <p class="ds-color-spec__title">Text</p>
                            <p class="ds-color-spec__note">Type hierarchy</p>
                        </div>
                        <div class="ds-color-spec__body">
                            <div class="ds-color-swatch">
                                <span class="ds-color-swatch__chip" style="background:var(--token-text-ui-primary);"></span>
                                <div class="ds-color-swatch__meta">
                                    <strong>text-primary</strong>
                                    <code>--token-text-ui-primary</code>
                                    <span>Titles, prices, active nav</span>
                                </div>
                            </div>
                            <div class="ds-color-swatch">
                                <span class="ds-color-swatch__chip" style="background:var(--token-text-ui-secondary);"></span>
                                <div class="ds-color-swatch__meta">
                                    <strong>text-secondary</strong>
                                    <code>--token-text-ui-secondary</code>
                                    <span>Summary labels, hints</span>
                                </div>
                            </div>
                            <div class="ds-color-swatch">
                                <span class="ds-color-swatch__chip" style="background:#9ca3af;"></span>
                                <div class="ds-color-swatch__meta">
                                    <strong>text-muted</strong>
                                    <code>#9ca3af</code>
                                    <span>Size, struck through price</span>
                                </div>
                            </div>
                            <div class="ds-color-swatch">
                                <span class="ds-color-swatch__chip" style="background:var(--token-text-inactive);"></span>
                                <div class="ds-color-swatch__meta">
                                    <strong>text-inactive</strong>
                                    <code>--token-text-inactive</code>
                                    <span>Inactive tab labels</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="ds-color-spec">
                        <div class="ds-color-spec__head">
                            <p class="ds-color-spec__title">Action + UI</p>
                            <p class="ds-color-spec__note">CTAs + chrome</p>
                        </div>
                        <div class="ds-color-spec__body">
                            <div class="ds-color-swatch">
                                <span class="ds-color-swatch__chip" style="background:var(--token-action-primary);"></span>
                                <div class="ds-color-swatch__meta">
                                    <strong>action-primary</strong>
                                    <code>--token-action-primary</code>
                                    <span>Checkout, Add to cart, headers</span>
                                </div>
                            </div>
                            <div class="ds-color-swatch">
                                <span class="ds-color-swatch__chip ds-color-swatch__chip--border" style="background:var(--token-surface-card); border-color:var(--token-action-secondary-border);"></span>
                                <div class="ds-color-swatch__meta">
                                    <strong>action-secondary</strong>
                                    <code>--token-action-secondary-border</code>
                                    <span>Go to cart outline</span>
                                </div>
                            </div>
                            <div class="ds-color-swatch">
                                <span class="ds-color-swatch__chip ds-color-swatch__chip--border" style="background:var(--token-surface-card); border-color:var(--token-border-subtle);"></span>
                                <div class="ds-color-swatch__meta">
                                    <strong>border-subtle</strong>
                                    <code>--token-border-subtle</code>
                                    <span>Card edges, tab bar top</span>
                                </div>
                            </div>
                            <div class="ds-color-swatch">
                                <span class="ds-color-swatch__chip ds-color-swatch__chip--border" style="background:var(--token-icon-surface);"></span>
                                <div class="ds-color-swatch__meta">
                                    <strong>icon-surface</strong>
                                    <code>--token-icon-surface</code>
                                    <span>Session banner icon box</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="ds-spec__grid ds-spec__grid--2">
                    <div class="ds-color-spec">
                        <div class="ds-color-spec__head">
                            <p class="ds-color-spec__title">Annotation</p>
                            <p class="ds-color-spec__note">Purple markers + callouts</p>
                        </div>
                        <div class="ds-color-spec__body">
                            <div class="ds-color-swatch">
                                <span class="ds-color-swatch__chip" style="background:var(--token-annotation);"></span>
                                <div class="ds-color-swatch__meta">
                                    <strong>annotation</strong>
                                    <code>--token-annotation</code>
                                    <span>Numbered markers, labels, left accent</span>
                                </div>
                            </div>
                            <div class="ds-color-swatch">
                                <span class="ds-color-swatch__chip" style="background:var(--token-annotation-soft);"></span>
                                <div class="ds-color-swatch__meta">
                                    <strong>annotation-soft</strong>
                                    <code>--token-annotation-soft</code>
                                    <span>Active marker, secondary legend dot</span>
                                </div>
                            </div>
                            <div class="ds-color-swatch">
                                <span class="ds-color-swatch__chip ds-color-swatch__chip--border" style="background:var(--token-annotation-surface);"></span>
                                <div class="ds-color-swatch__meta">
                                    <strong>annotation-surface</strong>
                                    <code>--token-annotation-surface</code>
                                    <span>What I have changed panels</span>
                                </div>
                            </div>
                            <div class="ds-color-swatch">
                                <span class="ds-color-swatch__chip ds-color-swatch__chip--border" style="background:var(--token-surface-card); border-color:var(--token-annotation-border);"></span>
                                <div class="ds-color-swatch__meta">
                                    <strong>annotation-border</strong>
                                    <code>--token-annotation-border</code>
                                    <span>Audit panel borders and dividers</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="ds-color-usage">
                    <p class="ds-color-usage__label">Token usage</p>
                    <div class="ds-color-usage__row">
                        <span class="ds-color-usage__chip" style="background:var(--token-annotation);">annotation</span>
                        <span class="ds-color-usage__arrow" aria-hidden="true">→</span>
                        <span class="ds-color-usage__text">Purple numbered markers, audit labels, and change callouts</span>
                    </div>
                    <div class="ds-color-usage__row">
                        <span class="ds-color-usage__chip ds-color-usage__chip--dark">action-primary</span>
                        <span class="ds-color-usage__arrow" aria-hidden="true">→</span>
                        <span class="ds-color-usage__text">One filled CTA per screen + screen headers</span>
                    </div>
                    <div class="ds-color-usage__row">
                        <span class="ds-color-usage__chip ds-color-usage__chip--light">annotation-surface</span>
                        <span class="ds-color-usage__arrow" aria-hidden="true">→</span>
                        <span class="ds-color-usage__text">Soft purple surfaces behind guide and change content</span>
                    </div>
                </div>
            </div>
        `
    }
};

function renderDesignSystemDetail(topicId) {
    const panel = designSystemPanels[topicId];
    const titleEl = document.getElementById('design-system-detail-title');
    const contentEl = document.getElementById('design-system-detail-content');
    if (!panel || !titleEl || !contentEl) return;

    titleEl.textContent = panel.title;
    contentEl.innerHTML = panel.html;
}

const designSystemCards = document.querySelectorAll('.design-system-card');

designSystemCards.forEach(card => {
    card.addEventListener('click', () => {
        const topicId = card.dataset.designTopic;
        designSystemCards.forEach(c => {
            c.classList.remove('design-system-card--active');
            c.setAttribute('aria-pressed', 'false');
        });
        card.classList.add('design-system-card--active');
        card.setAttribute('aria-pressed', 'true');
        renderDesignSystemDetail(topicId);
    });
});

if (designSystemCards.length) {
    renderDesignSystemDetail('typography');
}
