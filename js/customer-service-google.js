const appsScriptUrl = 'https://script.google.com/macros/s/AKfycbwCVbfvNELljHa87Z94ZIhjmtzxb6lPaHeSFsI8jFSJNR1LVbj-VEeD3WuIqKz3_PbCAQ/exec';
const historyFolderUrl = 'https://drive.google.com/drive/folders/1jyCLTlwlNyIueoNu12ODZA_azw9pQOKL';
const maxFiles = 5;
const maxFileSize = 8 * 1024 * 1024;
const maxTotalSize = 20 * 1024 * 1024;

const form = document.querySelector('[data-cs-form]');

if (form) {
    const fileInput = form.elements.files;
    const fileSelection = document.querySelector('[data-file-selection]');
    const fileDrop = document.querySelector('[data-file-drop]');
    const formStatus = document.querySelector('[data-form-status]');
    const submitButton = form.querySelector('button[type="submit"]');
    const historyLink = document.querySelector('[data-history-link]');
    const handoffTabs = [...document.querySelectorAll('[data-handoff-tab]')];
    const handoffPanels = [...document.querySelectorAll('[data-handoff-panel]')];
    const isConfigured = appsScriptUrl.startsWith('https://script.google.com/macros/s/');

    function activateHandoffTab(tabName) {
        handoffTabs.forEach(tab => {
            const isActive = tab.dataset.handoffTab === tabName;
            tab.classList.toggle('is-active', isActive);
            tab.setAttribute('aria-selected', String(isActive));
            tab.tabIndex = isActive ? 0 : -1;
        });

        handoffPanels.forEach(panel => {
            panel.hidden = panel.dataset.handoffPanel !== tabName;
        });
    }

    handoffTabs.forEach((tab, index) => {
        tab.addEventListener('click', () => activateHandoffTab(tab.dataset.handoffTab));
        tab.addEventListener('keydown', event => {
            if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
            event.preventDefault();
            const direction = event.key === 'ArrowRight' ? 1 : -1;
            const nextIndex = (index + direction + handoffTabs.length) % handoffTabs.length;
            handoffTabs[nextIndex].focus();
            activateHandoffTab(handoffTabs[nextIndex].dataset.handoffTab);
        });
    });

    if (historyLink && historyFolderUrl) {
        historyLink.href = historyFolderUrl;
        historyLink.removeAttribute('aria-disabled');
    } else if (historyLink) {
        historyLink.addEventListener('click', event => event.preventDefault());
    }

    function updateFileSelection() {
        const files = [...fileInput.files];
        fileSelection.textContent = files.length
            ? files.map(file => file.name).join(', ')
            : 'No files selected';
    }

    fileInput.addEventListener('change', updateFileSelection);

    ['dragenter', 'dragover'].forEach(eventName => {
        fileDrop.addEventListener(eventName, event => {
            event.preventDefault();
            fileDrop.classList.add('is-dragging');
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileDrop.addEventListener(eventName, event => {
            event.preventDefault();
            fileDrop.classList.remove('is-dragging');
        });
    });

    fileDrop.addEventListener('drop', event => {
        if (!event.dataTransfer.files.length) return;
        fileInput.files = event.dataTransfer.files;
        updateFileSelection();
    });

    function readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve({
                name: file.name,
                type: file.type,
                size: file.size,
                data: reader.result
            });
            reader.onerror = () => reject(new Error(`Could not read ${file.name}.`));
            reader.readAsDataURL(file);
        });
    }

    form.addEventListener('submit', async event => {
        event.preventDefault();
        formStatus.textContent = '';

        if (!isConfigured) {
            formStatus.textContent = 'Google Drive setup is not connected yet.';
            return;
        }

        const data = new FormData(form);
        if (data.get('website')) {
            form.reset();
            updateFileSelection();
            return;
        }

        const selectedFiles = [...fileInput.files];
        const totalSize = selectedFiles.reduce((total, file) => total + file.size, 0);

        if (selectedFiles.length > maxFiles) {
            formStatus.textContent = `Upload no more than ${maxFiles} files.`;
            return;
        }

        if (selectedFiles.some(file => file.size > maxFileSize)) {
            formStatus.textContent = 'Each file must be smaller than 8 MB.';
            return;
        }

        if (totalSize > maxTotalSize) {
            formStatus.textContent = 'Supporting files must be 20 MB or less in total.';
            return;
        }

        submitButton.disabled = true;
        formStatus.textContent = 'Creating the Google Doc…';

        try {
            const files = await Promise.all(selectedFiles.map(readFile));
            const response = await fetch(appsScriptUrl, {
                method: 'POST',
                redirect: 'follow',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8'
                },
                body: JSON.stringify({
                    website: data.get('website'),
                    issue: data.get('issue'),
                    suggestion: data.get('suggestion'),
                    evidenceContext: data.get('evidenceContext'),
                    submittedAt: new Date().toISOString(),
                    files
                })
            });

            const raw = await response.text();
            let result;
            try {
                result = JSON.parse(raw);
            } catch {
                throw new Error('Google Drive is connected, but this submission did not return a document. Try again in a minute.');
            }
            if (!result.ok) {
                throw new Error(result.error || 'The Google Doc could not be created.');
            }

            form.reset();
            updateFileSelection();
            formStatus.textContent = 'Google Doc created in Drive.';
        } catch (error) {
            formStatus.textContent = error.message || 'The Google Doc could not be created.';
        } finally {
            submitButton.disabled = false;
        }
    });
}
