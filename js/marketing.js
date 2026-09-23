const tabs = [...document.querySelectorAll('[data-tab]')];
const panels = [...document.querySelectorAll('[data-panel]')];

function activateTab(tabName, { updateHash = true } = {}) {
    const nextTab = tabs.find(tab => tab.dataset.tab === tabName);
    const nextPanel = panels.find(panel => panel.dataset.panel === tabName);

    if (!nextTab || !nextPanel) return;

    tabs.forEach(tab => {
        const isActive = tab === nextTab;
        tab.classList.toggle('is-active', isActive);
        tab.setAttribute('aria-selected', String(isActive));
        tab.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach(panel => {
        panel.hidden = panel !== nextPanel;
    });

    if (updateHash) {
        history.replaceState(null, '', `#${tabName}`);
    }
}

tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(tab.dataset.tab));
    tab.addEventListener('keydown', event => {
        if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;

        event.preventDefault();
        const direction = event.key === 'ArrowRight' ? 1 : -1;
        const nextIndex = (index + direction + tabs.length) % tabs.length;
        tabs[nextIndex].focus();
        activateTab(tabs[nextIndex].dataset.tab);
    });
});

document.querySelectorAll('[data-open-tab]').forEach(button => {
    button.addEventListener('click', () => {
        activateTab(button.dataset.openTab);
        document.querySelector('.playbook-tabs')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

const initialTab = window.location.hash.slice(1);
activateTab(tabs.some(tab => tab.dataset.tab === initialTab) ? initialTab : 'overview', {
    updateHash: false
});
