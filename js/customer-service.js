import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const supabaseUrl = 'https://lsellfzlxkgwsojgjjfi.supabase.co';
const supabasePublishableKey = 'sb_publishable_J6Q14wsnNfSjKWbCF-bYng_Oem-Vg86';
const evidenceBucket = 'cs-evidence';
const supabase = createClient(supabaseUrl, supabasePublishableKey);

const form = document.querySelector('[data-cs-form]');

if (form) {
    const fileInput = form.elements.files;
    const fileSelection = document.querySelector('[data-file-selection]');
    const fileDrop = document.querySelector('[data-file-drop]');
    const formStatus = document.querySelector('[data-form-status]');
    const historyList = document.querySelector('[data-history-list]');
    const historyEmpty = document.querySelector('[data-history-empty]');
    const exportButton = document.querySelector('[data-export-history]');
    const handoffTabs = [...document.querySelectorAll('[data-handoff-tab]')];
    const handoffPanels = [...document.querySelectorAll('[data-handoff-panel]')];
    const authForm = document.querySelector('[data-auth-form]');
    const authStatus = document.querySelector('[data-auth-status]');
    const signedOut = document.querySelector('[data-auth-signed-out]');
    const signedIn = document.querySelector('[data-auth-signed-in]');
    const authEmail = document.querySelector('[data-auth-email]');
    const signOutButton = document.querySelector('[data-auth-sign-out]');
    const historyGate = document.querySelector('[data-history-gate]');
    const submitButton = form.querySelector('button[type="submit"]');
    let entries = [];
    let currentUser = null;

    function isAnonymousUser(user) {
        return Boolean(user?.is_anonymous || user?.app_metadata?.provider === 'anonymous');
    }

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

    function createElement(tag, className, text) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (text !== undefined) element.textContent = text;
        return element;
    }

    function downloadBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.append(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    async function downloadEvidence(file) {
        const { data, error } = await supabase.storage
            .from(evidenceBucket)
            .createSignedUrl(file.path, 60, { download: file.name });

        if (error) {
            formStatus.textContent = `Could not download ${file.name}.`;
            return;
        }

        const link = document.createElement('a');
        link.href = data.signedUrl;
        link.download = file.name;
        link.rel = 'noopener';
        document.body.append(link);
        link.click();
        link.remove();
    }

    function renderHistory() {
        historyList.querySelectorAll('.history-entry').forEach(entry => entry.remove());
        historyEmpty.hidden = entries.length > 0;
        exportButton.disabled = entries.length === 0;

        entries.forEach(entry => {
            const article = createElement('article', 'history-entry');
            const top = createElement('div', 'history-entry__top');
            const title = createElement('h4', '', entry.issue);
            const time = createElement(
                'time',
                '',
                new Intl.DateTimeFormat('en-GB', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                }).format(new Date(entry.created_at))
            );
            time.dateTime = entry.created_at;
            top.append(title, time);

            const detail = createElement('div', 'history-entry__detail');
            detail.append(createElement('p', '', `Suggested resolution: ${entry.severity_reason}`));
            if (entry.quotation) {
                detail.append(createElement('p', '', `Evidence / context: ${entry.quotation}`));
            }

            article.append(top, detail);

            if (entry.files?.length) {
                const files = createElement('div', 'history-entry__files');
                entry.files.forEach(file => {
                    const button = createElement('button', 'history-download', `Download ${file.name}`);
                    button.type = 'button';
                    button.addEventListener('click', () => downloadEvidence(file));
                    files.append(button);
                });
                article.append(files);
            }

            const deleteButton = createElement('button', 'history-delete', 'Delete entry');
            deleteButton.type = 'button';
            deleteButton.addEventListener('click', async () => {
                if (!window.confirm(`Delete "${entry.issue}" and its files?`)) return;

                const paths = (entry.files || []).map(file => file.path);
                if (paths.length) {
                    const { error: storageError } = await supabase.storage
                        .from(evidenceBucket)
                        .remove(paths);
                    if (storageError) {
                        formStatus.textContent = 'The files could not be deleted.';
                        return;
                    }
                }

                const { error } = await supabase
                    .from('cs_insights')
                    .delete()
                    .eq('id', entry.id);

                if (error) {
                    formStatus.textContent = 'The history entry could not be deleted.';
                    return;
                }

                entries = entries.filter(item => item.id !== entry.id);
                renderHistory();
            });
            article.append(deleteButton);
            historyList.append(article);
        });
    }

    async function loadHistory() {
        const { data, error } = await supabase
            .from('cs_insights')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            authStatus.textContent = error.code === 'PGRST205'
                ? 'Supabase setup is not finished. Run supabase/setup.sql first.'
                : 'The shared history could not be loaded.';
            return;
        }

        entries = data;
        renderHistory();
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

    form.addEventListener('submit', async event => {
        event.preventDefault();
        formStatus.textContent = '';
        const data = new FormData(form);

        if (data.get('website')) {
            form.reset();
            formStatus.textContent = 'Insight added to shared history.';
            return;
        }

        let uploadUser = currentUser;
        if (!uploadUser) {
            formStatus.textContent = 'Creating a secure upload session…';
            const { data: authData, error: authError } = await supabase.auth.signInAnonymously();

            if (authError) {
                formStatus.textContent = 'Anonymous uploads are not enabled in Supabase yet.';
                return;
            }

            uploadUser = authData.user;
            currentUser = uploadUser;
        }

        const selectedFiles = [...fileInput.files];
        if (selectedFiles.length > 8) {
            formStatus.textContent = 'Upload no more than 8 files.';
            return;
        }
        if (selectedFiles.some(file => file.size > 25 * 1024 * 1024)) {
            formStatus.textContent = 'Each file must be smaller than 25 MB.';
            return;
        }

        submitButton.disabled = true;
        formStatus.textContent = 'Uploading securely…';
        const insightId = crypto.randomUUID();
        const uploadedFiles = [];

        for (const file of selectedFiles) {
            const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
            const path = `${uploadUser.id}/${insightId}/${crypto.randomUUID()}-${safeName}`;
            const { error } = await supabase.storage
                .from(evidenceBucket)
                .upload(path, file, {
                    cacheControl: '3600',
                    contentType: file.type || undefined,
                    upsert: false
                });

            if (error) {
                if (uploadedFiles.length) {
                    await supabase.storage
                        .from(evidenceBucket)
                        .remove(uploadedFiles.map(upload => upload.path));
                }
                formStatus.textContent = `Could not upload ${file.name}.`;
                submitButton.disabled = false;
                return;
            }

            uploadedFiles.push({
                name: file.name,
                path,
                type: file.type,
                size: file.size
            });
        }

        const entry = {
            id: insightId,
            created_by: uploadUser.id,
            issue: data.get('issue').trim(),
            business_goal: 'Not captured',
            frequency: 'Not captured',
            severity: 'Not captured',
            severity_reason: data.get('suggestion').trim() || 'No suggestion provided',
            quotation: data.get('evidenceContext').trim(),
            user_goal: '',
            files: uploadedFiles
        };
        const { error } = await supabase
            .from('cs_insights')
            .insert(entry);

        if (error) {
            if (uploadedFiles.length) {
                await supabase.storage
                    .from(evidenceBucket)
                    .remove(uploadedFiles.map(upload => upload.path));
            }
            formStatus.textContent = 'The insight could not be saved.';
            submitButton.disabled = false;
            return;
        }

        form.reset();
        updateFileSelection();
        formStatus.textContent = 'Insight added to shared history.';
        submitButton.disabled = false;

        if (!isAnonymousUser(uploadUser)) {
            await loadHistory();
        }
    });

    exportButton.addEventListener('click', () => {
        const columns = [
            'Date',
            'Complaint or issue',
            'Suggested resolution',
            'Evidence / context',
            'Files'
        ];
        const escapeCell = value => `"${String(value ?? '').replaceAll('"', '""')}"`;
        const rows = entries.map(entry => [
            entry.created_at,
            entry.issue,
            entry.severity_reason,
            entry.quotation,
            (entry.files || []).map(file => file.name).join('; ')
        ]);
        const csv = [columns, ...rows]
            .map(row => row.map(escapeCell).join(','))
            .join('\n');
        downloadBlob(new Blob([csv], { type: 'text/csv;charset=utf-8' }), 'cs-insight-history.csv');
    });

    async function applySession(session) {
        currentUser = session?.user || null;
        const hasOwnerSession = Boolean(currentUser && !isAnonymousUser(currentUser));
        signedOut.hidden = hasOwnerSession;
        signedIn.hidden = !hasOwnerSession;
        historyGate.hidden = true;
        entries = [];
        renderHistory();

        if (!hasOwnerSession) {
            authEmail.textContent = '';
            authStatus.textContent = 'Sign in to open the private history.';
            return;
        }

        authEmail.textContent = currentUser.email;
        authStatus.textContent = 'Checking team access…';
        const { data: isMember, error } = await supabase.rpc('is_cs_team_member');

        if (error) {
            authStatus.textContent = error.code === 'PGRST202'
                ? 'Supabase setup is not finished. Run supabase/setup.sql first.'
                : 'Team access could not be checked.';
            return;
        }

        if (!isMember) {
            authStatus.textContent = 'This email is signed in but is not on the approved team list.';
            return;
        }

        authStatus.textContent = 'Connected to shared CS history.';
        historyGate.hidden = false;
        await loadHistory();
    }

    authForm.addEventListener('submit', async event => {
        event.preventDefault();
        const email = new FormData(authForm).get('email').trim();
        authStatus.textContent = 'Sending secure sign-in link…';

        if (currentUser && isAnonymousUser(currentUser)) {
            await supabase.auth.signOut();
            currentUser = null;
        }

        const redirectUrl = new URL('./', window.location.href).href;
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: redirectUrl,
                shouldCreateUser: true
            }
        });

        authStatus.textContent = error
            ? error.message
            : `Sign-in link sent to ${email}.`;
    });

    signOutButton.addEventListener('click', async () => {
        await supabase.auth.signOut();
    });

    supabase.auth.onAuthStateChange((_event, session) => {
        setTimeout(() => applySession(session), 0);
    });

    const { data: { session } } = await supabase.auth.getSession();
    await applySession(session);
}
