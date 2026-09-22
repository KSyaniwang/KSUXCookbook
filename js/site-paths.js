(function () {
    function getSiteBasePath() {
        const { pathname } = window.location;

        if (pathname.endsWith('/')) {
            return pathname;
        }

        const lastSegment = pathname.split('/').pop() || '';

        if (/\.[a-z0-9]+$/i.test(lastSegment)) {
            return pathname.slice(0, pathname.lastIndexOf('/') + 1);
        }

        return `${pathname}/`;
    }

    const baseEl = document.querySelector('base[data-site-base]');
    if (baseEl) {
        baseEl.href = getSiteBasePath();
    }

    window.assetUrl = function assetUrl(path) {
        const normalized = String(path).replace(/^\.\//, '');
        return new URL(normalized, document.baseURI).href;
    };

    window.isAssetPath = function isAssetPath(path) {
        return typeof path === 'string' && /^(?:\.\/)?assets\//.test(path);
    };

    window.prefixAssetPaths = function prefixAssetPaths(obj) {
        return Object.fromEntries(
            Object.entries(obj).map(([key, value]) => [
                key,
                window.isAssetPath(value) ? window.assetUrl(value) : value
            ])
        );
    };
})();
