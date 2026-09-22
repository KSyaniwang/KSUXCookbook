const pa = typeof prefixAssetPaths === 'function' ? prefixAssetPaths : obj => obj;

const PROTOTYPE_HOME_ASSETS = pa({
    logo: 'assets/prototype/home/logo.png',
    main: 'assets/prototype/home/main-content.png',
    menu: 'assets/prototype/home/icon-menu.svg',
    heart: 'assets/prototype/home/icon-heart.svg',
    search: 'assets/prototype/home/icon-search.svg',
    navHome: 'assets/prototype/home/nav-home.svg',
    navHomeInactive: 'assets/prototype/home/nav-home-inactive.svg',
    navCollections: 'assets/prototype/home/nav-collections.svg',
    navCollectionsActive: 'assets/prototype/home/nav-collections-active.svg',
    navAccount: 'assets/prototype/home/nav-account.svg',
    navCart: 'assets/prototype/home/nav-cart.svg',
    navCartActive: 'assets/prototype/home/nav-cart-active.svg'
});

const PROTOTYPE_PDP_ASSETS = pa({
    back: 'assets/prototype/pdp/icon-back.svg',
    share: 'assets/prototype/pdp/icon-share.svg',
    cart: 'assets/prototype/pdp/icon-cart.svg',
    heart: 'assets/prototype/pdp/icon-heart.svg',
    star: 'assets/prototype/pdp/icon-star.svg',
    starHalf: 'assets/prototype/pdp/icon-star-half.svg',
    bag: 'assets/prototype/pdp/icon-bag.svg',
    chevron: 'assets/prototype/pdp/icon-chevron.svg',
    product: 'assets/prototype/pdp/product-cosrx.jpeg'
});

const PROTOTYPE_COLLECTIONS_ASSETS = pa({
    search: 'assets/prototype/collections/icon-search.svg',
    heart: 'assets/prototype/collections/icon-heart.svg',
    featured: 'assets/prototype/collections/thumb-featured.png',
    skinConcerns: 'assets/prototype/collections/thumb-skin-concerns.png',
    cleansers: 'assets/prototype/collections/thumb-cleansers.png',
    toners: 'assets/prototype/collections/thumb-toners.png',
    treatments: 'assets/prototype/collections/thumb-treatments.png'
});

const PROTOTYPE_SEARCH_ASSETS = pa({
    back: 'assets/prototype/search/icon-back.svg',
    search: 'assets/prototype/search/icon-search.svg',
    clear: 'assets/prototype/search/icon-clear.svg',
    skin1004: 'assets/prototype/search/product-skin1004.png',
    arencia: 'assets/prototype/search/product-arencia.png',
    cosrx: 'assets/prototype/search/product-cosrx.png',
    keyboard: 'assets/prototype/search/keyboard-fit.png',
    keyboard2x: 'assets/prototype/search/keyboard@2x.png'
});

const PROTOTYPE_LISTING_ASSETS = pa({
    back: 'assets/prototype/listing/icon-back.svg',
    search: 'assets/prototype/listing/icon-search.svg',
    cart: 'assets/prototype/listing/icon-cart.svg',
    sort: 'assets/prototype/listing/icon-sort.svg',
    filter: 'assets/prototype/listing/icon-filter.svg',
    add: 'assets/prototype/listing/icon-add.svg',
    skin1004: 'assets/prototype/listing/product-skin1004.png',
    arencia: 'assets/prototype/listing/product-arencia.png',
    cosrx: 'assets/prototype/listing/product-cosrx.png',
    etude: 'assets/prototype/listing/product-etude.png'
});

const LISTING_PRODUCTS = [
    {
        brand: 'SKIN1004',
        name: 'Madagascar Centella Light Cleansing Oil',
        image: PROTOTYPE_LISTING_ASSETS.skin1004,
        price: '€18.55',
        original: '€24.90',
        discount: '26% OFF',
        go: 'pdp'
    },
    {
        brand: 'ARENCIA',
        name: 'Vitamin C Booster Shot',
        image: PROTOTYPE_LISTING_ASSETS.arencia,
        price: '€17.95'
    },
    {
        brand: 'COSRX',
        name: 'BHA Blackhead Power Liquid',
        image: PROTOTYPE_LISTING_ASSETS.cosrx,
        price: '€16.73',
        original: '€22.95',
        discount: '27% OFF'
    },
    {
        brand: 'ETUDE',
        name: 'SoonJung 2x Barrier Intensive Cream',
        image: PROTOTYPE_LISTING_ASSETS.etude,
        price: '€15.95'
    }
];

const SEARCH_BACK_TARGETS = {
    'homepage-search': 'homepage',
    'collections-search': 'collections',
    'skin-concerns-search': 'skin-concerns'
};

// "Before" (current app) screenshots, mapped to each redesigned prototype screen
const PROTOTYPE_BEFORE_ASSETS = pa({
    homepage: 'assets/journey/01-homepage.png',
    'homepage-search': 'assets/journey/03-search.png',
    collections: 'assets/journey/02-collections.png',
    'collections-search': 'assets/journey/03-search.png',
    'skin-concerns': 'assets/journey/03-skin-concerns.png',
    'skin-concerns-search': 'assets/journey/03-search.png',
    listing: 'assets/journey/04-product-listing.png',
    pdp: 'assets/journey/05-product-detail.png'
});

function prototypeBeforeAsset(screenId) {
    return PROTOTYPE_BEFORE_ASSETS[screenId] || PROTOTYPE_BEFORE_ASSETS.homepage;
}

let listingBackScreen = 'skin-concerns';
let listingContextLabel = '';
let homeActiveCategory = null;
let pdpBackScreen = 'listing';

const COLLECTION_CATEGORIES = [
    { label: 'Featured', navLabel: 'Featured', id: 'featured' },
    { label: 'Skin Concerns', navLabel: 'Skin Concerns', id: 'skin-concerns' },
    { label: 'Cleansers', navLabel: 'Cleansers', id: 'cleansers' },
    { label: 'Toners', navLabel: 'Toners', id: 'toners' },
    { label: 'Treatments', navLabel: 'Treatments', id: 'treatments' }
];

const prototypeScreenMeta = {
    homepage: {
        title: 'Homepage',
        action: 'Lucy opens the app for the first time after a sunny holiday in Spain. She has mild sunburn and does not know a product name. She just wants after sun care.',
        changed: 'Added a category bar and search directly under the homepage header, also shorten the promotions. Users get clear starting points: browse by category or search by keyword, without scrolling too much.',
        impact: 'Faster discovery through higher search and category engagement with less homepage drop-off.'
    },
    'homepage-category': {
        title: 'Category sub nav',
        action: 'Lucy taps a category like Skin Concerns. A second row of concern shortcuts appears, as she looks for the closest match to after sun care.',
        changed: 'Users can refine by skin need in one tap, without opening Collections or guessing where after sun belongs.',
        impact: 'Fewer taps needed to reach relevant product groups, reducing navigation effort.'
    },
    'homepage-search': {
        title: 'Search',
        action: 'Lucy searches "aftersun" and scans the preview results, checking whether any products look relevant before tapping one or Show More.',
        changed: 'Search is now accessible everywhere during discovery. So when users cannot find the things they want in the categories, they do not need to go back to the home page.',
        impact: 'Faster discovery through higher search and category engagement with less homepage drop-off.'
    },
    collections: {
        title: 'Collections',
        action: 'Lucy browses Collections, hoping after sun care might live under Skin Concerns.',
        changed: 'Collections now includes its own search bar below the title. Users can search or browse in context instead of returning home when categories feel unclear.',
        impact: 'Higher in-context search success with less backtracking to the homepage.'
    },
    'collections-search': {
        title: 'Search, Collections',
        action: 'Lucy searches "aftersun" from Collections and reviews the preview results for after sun care options.',
        changed: 'Search is now accessible everywhere during discovery. So when users cannot find the things they want in the categories, they do not need to go back to the home page.',
        impact: 'Higher in-context search success with less backtracking to the homepage.'
    },
    'skin-concerns-search': {
        title: 'Search, Skin Concerns',
        action: 'Lucy searches "aftersun" from Skin Concerns and scans the results without leaving the category context.',
        changed: 'Search is now accessible everywhere during discovery. So when users cannot find the things they want in the categories, they do not need to go back to the home page.',
        impact: 'Faster matching between user needs and relevant products, reducing dead ends.'
    },
    'skin-concerns': {
        title: 'Skin Concerns',
        action: 'Lucy opens Skin Concerns and scans the sub nav shortcuts, looking for anything related to after sun or sunburn relief.',
        changed: 'Added a back button to return to Collections, plus concern shortcuts directly under the search bar. Users can pick a close match or search in one place.',
        impact: 'Faster matching between user needs and relevant products, reducing dead ends.'
    },
    listing: {
        title: 'Product listing',
        action: 'Lucy scans the product grid, comparing prices, discounts, and product names before tapping one to learn more.',
        changed: 'Added a Showing label at the top so users always know what they filtered for. Product info now has a clearer visual hierarchy, so scanning the grid feels consistent.',
        impact: 'Easier product comparison and stronger confidence when opening a product.'
    },
    pdp: {
        title: 'Product detail',
        action: 'Lucy reads the product details, checks the rating and price, sets quantity, and decides whether to add it to cart.',
        changed: 'Product details, ratings, quantity, and a sticky Add to cart sit in a clear visual hierarchy. The UI also follows EU accessibility requirements WCAG 2.2.',
        impact: 'Higher accessible task completion and add-to-cart conversion through clearer hierarchy and a sticky CTA.'
    }
};

const PROTOTYPE_SKIN_CONCERNS_ASSETS = pa({
    search: 'assets/prototype/collections/icon-search.svg',
    heart: 'assets/prototype/collections/icon-heart.svg',
    acne: 'assets/prototype/skin-concerns/thumb-acne.png',
    antiAging: 'assets/prototype/skin-concerns/thumb-anti-aging.png',
    dryness: 'assets/prototype/skin-concerns/thumb-dryness.png',
    fungalAcne: 'assets/prototype/skin-concerns/thumb-fungal-acne.png',
    hyperpigmentation: 'assets/prototype/skin-concerns/thumb-hyperpigmentation.png',
    redness: 'assets/prototype/skin-concerns/thumb-redness.png',
    sensitivity: 'assets/prototype/skin-concerns/thumb-sensitivity.png',
    oilControl: 'assets/prototype/skin-concerns/thumb-oil-control.png'
});

const SKIN_CONCERNS_CATEGORIES = [
    { title: 'Acne', navLabel: 'Acne', thumb: 'acne', ring: 'pink', go: 'listing', label: 'Acne', back: 'skin-concerns' },
    { title: 'Anti Aging', navLabel: 'Anti Aging', thumb: 'antiAging', ring: 'blue', go: 'listing', label: 'Anti Aging', back: 'skin-concerns' },
    { title: 'Dryness / Hydration', navLabel: 'Dryness', thumb: 'dryness', ring: 'blue', go: 'listing', label: 'Dryness / Hydration', back: 'skin-concerns' },
    { title: 'Fungal acne safe', navLabel: 'Fungal acne', thumb: 'fungalAcne', ring: 'pink', go: 'listing', label: 'Fungal acne safe', back: 'skin-concerns' },
    { title: 'Hyperpigmentation', navLabel: 'Hyperpigmentation', thumb: 'hyperpigmentation', ring: 'yellow', go: 'listing', label: 'Hyperpigmentation', back: 'skin-concerns' },
    { title: 'Redness', navLabel: 'Redness', thumb: 'redness', ring: 'pink', go: 'listing', label: 'Redness', back: 'skin-concerns' },
    { title: 'Sensitivity', navLabel: 'Sensitivity', thumb: 'sensitivity', ring: 'green', go: 'listing', label: 'Sensitivity', back: 'skin-concerns' },
    { title: 'Oil control & Pore care', navLabel: 'Oil control', thumb: 'oilControl', ring: 'yellow', go: 'listing', label: 'Oil control & Pore care', back: 'skin-concerns' }
];

function protoFigmaCategoryList(categories, assets) {
    return categories.map(item => protoFigmaCollectionCard({
        title: item.title,
        thumb: assets[item.thumb],
        ring: item.ring,
        go: item.go,
        label: item.label,
        back: item.back
    })).join('');
}

function protoFigmaCollectionCard({ title, titleLines, thumb, ring, go, label, back }) {
    const ringClass = `proto-figma-collection-card__ring--${ring}`;
    const titleHtml = titleLines
        ? titleLines.map(line => `<span>${line}</span>`).join('')
        : `<span>${title}</span>`;
    const goAttr = go ? ` data-proto-go="${go}"` : '';
    const labelAttr = label ? ` data-proto-label="${label}"` : '';
    const backAttr = back ? ` data-proto-back="${back}"` : '';

    return `
        <button type="button" class="proto-figma-collection-card"${goAttr}${labelAttr}${backAttr}>
            <span class="proto-figma-collection-card__ring ${ringClass}">
                <img src="${thumb}" alt="" class="proto-figma-collection-card__thumb"/>
            </span>
            <span class="proto-figma-collection-card__title">${titleHtml}</span>
            <span class="material-symbols-outlined proto-figma-collection-card__chevron" aria-hidden="true">chevron_right</span>
        </button>`;
}

function protoFigmaCartBadge() {
    return '<span class="proto-figma-cart-badge" aria-hidden="true">1</span>';
}

function protoFigmaSkinConcernsSubNav(backScreen = 'skin-concerns') {
    const pills = SKIN_CONCERNS_CATEGORIES.map(item => {
        const label = item.navLabel || item.title;
        return `<button type="button" class="proto-figma-concerns-subnav__pill" data-proto-go="listing" data-proto-label="${item.label}" data-proto-back="${backScreen}">${label}</button>`;
    }).join('');

    return `
        <nav class="proto-figma-concerns-subnav" aria-label="Skin concerns">
            <div class="proto-figma-concerns-subnav__scroll">
                ${pills}
            </div>
        </nav>`;
}

function protoFigmaHomeCategoryNav() {
    const pills = COLLECTION_CATEGORIES.map(item => {
        const isActive = homeActiveCategory === item.id;
        return `<button type="button" class="proto-figma-home-categories__pill${isActive ? ' proto-figma-home-categories__pill--active' : ''}" data-proto-expand="${item.id}">${item.navLabel}</button>`;
    }).join('');

    const subNav = homeActiveCategory ? protoFigmaSkinConcernsSubNav('homepage') : '';

    return `
        <div class="proto-figma-home-categories-wrap">
            <nav class="proto-figma-home-categories" aria-label="Quick categories">
                <div class="proto-figma-home-categories__scroll">
                    ${pills}
                </div>
                <button type="button" class="proto-figma-home-categories__filter" aria-label="Filter products">
                    <img src="${PROTOTYPE_LISTING_ASSETS.filter}" alt="" class="proto-figma-home-categories__filter-icon"/>
                </button>
            </nav>
            ${subNav}
        </div>`;
}

function protoFigmaTabBar(active) {
    const tabs = [
        {
            id: 'homepage',
            label: 'Home',
            iconActive: PROTOTYPE_HOME_ASSETS.navHome,
            iconInactive: PROTOTYPE_HOME_ASSETS.navHomeInactive
        },
        {
            id: 'collections',
            label: 'Collections',
            iconActive: PROTOTYPE_HOME_ASSETS.navCollectionsActive,
            iconInactive: PROTOTYPE_HOME_ASSETS.navCollections
        },
        {
            id: 'account',
            label: 'Account',
            iconActive: PROTOTYPE_HOME_ASSETS.navAccount,
            iconInactive: PROTOTYPE_HOME_ASSETS.navAccount
        },
        {
            id: 'cart',
            label: 'Cart',
            iconActive: PROTOTYPE_HOME_ASSETS.navCartActive,
            iconInactive: PROTOTYPE_HOME_ASSETS.navCart
        }
    ];

    return `
        <nav class="proto-figma-nav" aria-label="App navigation">
            ${tabs.map(tab => {
                const isActive = active === tab.id;
                const icon = isActive ? tab.iconActive : tab.iconInactive;
                const isStatic = tab.id === 'account' || tab.id === 'cart';
                return `
                <button type="button" class="proto-figma-nav__tab${isActive ? ' proto-figma-nav__tab--active' : ''}"${isStatic ? '' : ` data-proto-go="${tab.id}"`}>
                    <span class="proto-figma-nav__icon-wrap${tab.id === 'cart' ? ' proto-figma-nav__icon-wrap--cart' : ''}">
                        <img src="${icon}" alt="" class="proto-figma-nav__icon"/>
                        ${tab.id === 'cart' ? protoFigmaCartBadge() : ''}
                    </span>
                    <span class="proto-figma-nav__label">${tab.label}</span>
                </button>`;
            }).join('')}
        </nav>`;
}

function protoFigmaSearchProduct({ thumb, title, price, listingBack, listingLabel }) {
    const backAttr = listingBack ? ` data-proto-back="${listingBack}"` : '';
    const labelAttr = listingLabel ? ` data-proto-label="${listingLabel}"` : '';
    return `
        <button type="button" class="proto-figma-search-product" data-proto-go="listing"${backAttr}${labelAttr}>
            <span class="proto-figma-search-product__thumb">
                <img src="${thumb}" alt="" class="proto-figma-search-product__image"/>
            </span>
            <span class="proto-figma-search-product__info">
                <strong>${title}</strong>
                <em>${price}</em>
            </span>
        </button>`;
}

function protoListingNameDisplay(name, maxLen = 30) {
    const text = (name || '').trim();
    if (!text || text.length <= maxLen) return text;

    const words = text.split(/\s+/).filter(Boolean);
    if (words.length < 3) {
        const side = Math.max(1, Math.floor((maxLen - 1) / 2));
        return `${text.slice(0, side)}…${text.slice(-side)}`;
    }

    for (let visible = words.length - 1; visible >= 3; visible--) {
        for (let startWords = visible - 1; startWords >= 1; startWords--) {
            const endWords = visible - startWords;
            const candidate = `${words.slice(0, startWords).join(' ')}…${words.slice(-endWords).join(' ')}`;
            if (candidate.length <= maxLen) return candidate;
        }
    }

    const side = Math.max(1, Math.floor((maxLen - 1) / 2));
    return `${text.slice(0, side)}…${text.slice(-side)}`;
}

function protoFigmaListingProduct({ brand, name, image, price, original, discount, go, back, label }) {
    const priceHtml = original
        ? `<span class="proto-figma-listing-product__original">${original}</span><strong class="proto-figma-listing-product__price">${price}</strong><span class="proto-figma-listing-product__discount">${discount}</span>`
        : `<strong class="proto-figma-listing-product__price">${price}</strong>`;
    const goAttr = go ? ` data-proto-go="${go}"` : '';
    const backAttr = back ? ` data-proto-back="${back}"` : '';
    const labelAttr = label ? ` data-proto-label="${label}"` : '';
    const displayName = protoListingNameDisplay(name);
    const nameTitle = name !== displayName ? ` title="${name}"` : '';

    if (go) {
        return `
        <button type="button" class="proto-figma-listing-product"${goAttr}${backAttr}${labelAttr}>
            <div class="proto-figma-listing-product__image-wrap">
                <img src="${image}" alt="" class="proto-figma-listing-product__image"/>
            </div>
            <div class="proto-figma-listing-product__info">
                <strong class="proto-figma-listing-product__brand">${brand}</strong>
                <span class="proto-figma-listing-product__name"${nameTitle}>${displayName}</span>
                <div class="proto-figma-listing-product__pricing">${priceHtml}</div>
            </div>
            <span class="proto-figma-listing-product__add" aria-hidden="true">
                <img src="${PROTOTYPE_LISTING_ASSETS.add}" alt="" class="proto-figma-listing-product__add-icon"/>
            </span>
        </button>`;
    }

    return `
        <article class="proto-figma-listing-product">
            <div class="proto-figma-listing-product__image-wrap">
                <img src="${image}" alt="" class="proto-figma-listing-product__image"/>
            </div>
            <div class="proto-figma-listing-product__info">
                <strong class="proto-figma-listing-product__brand">${brand}</strong>
                <span class="proto-figma-listing-product__name"${nameTitle}>${displayName}</span>
                <div class="proto-figma-listing-product__pricing">${priceHtml}</div>
            </div>
            <span class="proto-figma-listing-product__add" aria-hidden="true">
                <img src="${PROTOTYPE_LISTING_ASSETS.add}" alt="" class="proto-figma-listing-product__add-icon"/>
            </span>
        </article>`;
}

function renderFigmaPdpScreen(backScreen) {
    return `
        <div class="proto-screen proto-screen--figma-pdp">
            <header class="proto-figma-pdp-header">
                <button type="button" class="proto-figma-pdp-header__back" data-proto-go="${backScreen}" aria-label="Back">
                    <img src="${PROTOTYPE_PDP_ASSETS.back}" alt="" class="proto-figma-pdp-header__icon"/>
                </button>
                <div class="proto-figma-pdp-header__actions">
                    <span class="proto-figma-pdp-header__action">
                        <img src="${PROTOTYPE_PDP_ASSETS.share}" alt="" class="proto-figma-pdp-header__icon"/>
                    </span>
                    <span class="proto-figma-pdp-header__cart" aria-label="Cart">
                        <img src="${PROTOTYPE_PDP_ASSETS.cart}" alt="" class="proto-figma-pdp-header__icon proto-figma-pdp-header__icon--cart"/>
                        ${protoFigmaCartBadge()}
                    </span>
                </div>
            </header>
            <main class="proto-figma-pdp-main">
                <section class="proto-figma-pdp-hero">
                    <div class="proto-figma-pdp-hero__image-wrap">
                        <img src="${PROTOTYPE_PDP_ASSETS.product}" alt="" class="proto-figma-pdp-hero__image"/>
                    </div>
                    <button type="button" class="proto-figma-pdp-wishlist" aria-label="Add to wishlist">
                        <img src="${PROTOTYPE_PDP_ASSETS.heart}" alt="" class="proto-figma-pdp-wishlist__icon"/>
                    </button>
                </section>
                <section class="proto-figma-pdp-details">
                    <h1 class="proto-figma-pdp-details__title">BHA Blackhead Power Liquid</h1>
                    <p class="proto-figma-pdp-details__brand">COSRX</p>
                    <p class="proto-figma-pdp-details__pricing">
                        <span class="proto-figma-pdp-details__original">€22.95</span>
                        <strong class="proto-figma-pdp-details__price">€16.73</strong>
                        <span class="proto-figma-pdp-details__discount">27% OFF</span>
                    </p>
                    <div class="proto-figma-pdp-reviews">
                        <div class="proto-figma-pdp-reviews__left">
                            <span class="proto-figma-pdp-reviews__stars" aria-hidden="true">
                                <img src="${PROTOTYPE_PDP_ASSETS.star}" alt="" class="proto-figma-pdp-reviews__star"/>
                                <img src="${PROTOTYPE_PDP_ASSETS.star}" alt="" class="proto-figma-pdp-reviews__star"/>
                                <img src="${PROTOTYPE_PDP_ASSETS.star}" alt="" class="proto-figma-pdp-reviews__star"/>
                                <img src="${PROTOTYPE_PDP_ASSETS.star}" alt="" class="proto-figma-pdp-reviews__star"/>
                                <img src="${PROTOTYPE_PDP_ASSETS.starHalf}" alt="" class="proto-figma-pdp-reviews__star"/>
                            </span>
                            <span class="proto-figma-pdp-reviews__count">(502 comments)</span>
                        </div>
                        <button type="button" class="proto-figma-pdp-reviews__write">Write a review</button>
                    </div>
                </section>
                <section class="proto-figma-pdp-quantity">
                    <div class="proto-figma-pdp-quantity__label">
                        <img src="${PROTOTYPE_PDP_ASSETS.bag}" alt="" class="proto-figma-pdp-quantity__icon"/>
                        <span>Quantity:</span>
                    </div>
                    <div class="proto-figma-pdp-quantity__select">
                        <span>1</span>
                        <img src="${PROTOTYPE_PDP_ASSETS.chevron}" alt="" class="proto-figma-pdp-quantity__chevron"/>
                    </div>
                </section>
            </main>
            <footer class="proto-figma-pdp-footer">
                <button type="button" class="proto-figma-pdp-add-cart">Add to cart</button>
            </footer>
        </div>`;
}

function renderFigmaListingScreen(backScreen) {
    return `
        <div class="proto-screen proto-screen--figma-listing">
            <header class="proto-figma-listing-header">
                <button type="button" class="proto-figma-listing-header__back" data-proto-go="${backScreen}" aria-label="Back">
                    <img src="${PROTOTYPE_LISTING_ASSETS.back}" alt="" class="proto-figma-listing-header__icon"/>
                </button>
                <div class="proto-figma-listing-header__actions">
                    <span class="proto-figma-listing-header__action">
                        <img src="${PROTOTYPE_LISTING_ASSETS.search}" alt="" class="proto-figma-listing-header__icon"/>
                    </span>
                    <span class="proto-figma-listing-header__cart" aria-label="Cart">
                        <img src="${PROTOTYPE_LISTING_ASSETS.cart}" alt="" class="proto-figma-listing-header__icon proto-figma-listing-header__icon--cart"/>
                        ${protoFigmaCartBadge()}
                    </span>
                </div>
            </header>
            ${listingContextLabel ? `<div class="proto-figma-listing-context">Showing <strong>${listingContextLabel}</strong></div>` : ''}
            <div class="proto-figma-listing-toolbar">
                <button type="button" class="proto-figma-listing-toolbar__btn">
                    <img src="${PROTOTYPE_LISTING_ASSETS.sort}" alt="" class="proto-figma-listing-toolbar__icon"/>
                    <span>Sort</span>
                </button>
                <button type="button" class="proto-figma-listing-toolbar__btn">
                    <img src="${PROTOTYPE_LISTING_ASSETS.filter}" alt="" class="proto-figma-listing-toolbar__icon"/>
                    <span>Filter</span>
                </button>
            </div>
            <main class="proto-figma-listing-main">
                <div class="proto-figma-listing-grid">
                    ${LISTING_PRODUCTS.map(product => protoFigmaListingProduct({
                        ...product,
                        go: 'pdp',
                        back: 'listing',
                        label: 'Product details'
                    })).join('')}
                </div>
            </main>
            ${protoFigmaTabBar('collections')}
        </div>`;
}

function renderFigmaSearchScreen(backScreen, searchScreenId) {
    return `
        <div class="proto-screen proto-screen--figma-search">
            <header class="proto-figma-search-header">
                <button type="button" class="proto-figma-search-header__back" data-proto-go="${backScreen}" aria-label="Back">
                    <img src="${PROTOTYPE_SEARCH_ASSETS.back}" alt="" class="proto-figma-search-header__back-icon"/>
                </button>
                <div class="proto-figma-search-active">
                    <img src="${PROTOTYPE_SEARCH_ASSETS.search}" alt="" class="proto-figma-search-active__icon"/>
                    <span class="proto-figma-search-active__query">aftersun</span>
                    <img src="${PROTOTYPE_SEARCH_ASSETS.clear}" alt="" class="proto-figma-search-active__clear"/>
                </div>
            </header>
            <section class="proto-figma-search-results-panel">
                <p class="proto-figma-search-results__label">Products</p>
                <div class="proto-figma-search-results">
                    ${protoFigmaSearchProduct({
                        thumb: PROTOTYPE_SEARCH_ASSETS.skin1004,
                        title: 'Madagascar Centella Light Cleansing Oil',
                        price: '€18.55',
                        listingBack: searchScreenId,
                        listingLabel: 'aftersun'
                    })}
                    ${protoFigmaSearchProduct({
                        thumb: PROTOTYPE_SEARCH_ASSETS.arencia,
                        title: 'Vitamin C Booster Shot',
                        price: '€17.95',
                        listingBack: searchScreenId,
                        listingLabel: 'aftersun'
                    })}
                    ${protoFigmaSearchProduct({
                        thumb: PROTOTYPE_SEARCH_ASSETS.cosrx,
                        title: 'BHA Blackhead Power Liquid',
                        price: '€16.73',
                        listingBack: searchScreenId,
                        listingLabel: 'aftersun'
                    })}
                </div>
                <div class="proto-figma-search-more-wrap">
                    <button type="button" class="proto-figma-search-more" data-proto-go="listing" data-proto-back="${searchScreenId}" data-proto-label="aftersun">Show More</button>
                </div>
            </section>
            <footer class="proto-figma-search-keyboard-wrap" aria-hidden="true">
                <img
                    src="${PROTOTYPE_SEARCH_ASSETS.keyboard}"
                    srcset="${PROTOTYPE_SEARCH_ASSETS.keyboard2x} 2x"
                    alt=""
                    class="proto-figma-search-keyboard"
                />
            </footer>
        </div>`;
}

function protoTabBar(active) {
    const tabs = [
        { id: 'homepage', icon: 'home', label: 'Home' },
        { id: 'collections', icon: 'view_agenda', label: 'Collections' },
        { id: 'account', icon: 'person', label: 'Account' },
        { id: 'cart', icon: 'shopping_cart', label: 'Cart' }
    ];

    return `
        <nav class="proto-tab-bar" aria-label="App navigation">
            ${tabs.map(tab => `
                <button type="button" class="proto-tab${active === tab.id ? ' proto-tab--active' : ''}"${tab.id === 'account' || tab.id === 'cart' ? '' : ` data-proto-go="${tab.id}"`}>
                    <span class="material-symbols-outlined">${tab.icon}</span>
                    <span>${tab.label}</span>
                </button>
            `).join('')}
        </nav>`;
}

function renderPrototypeScreen(screenId) {
    switch (screenId) {
        case 'homepage':
            return `
                <div class="proto-screen proto-screen--figma-home">
                    <header class="proto-figma-header">
                        <div class="proto-figma-header__row">
                            <button type="button" class="proto-figma-header__icon-btn" aria-label="Menu">
                                <img src="${PROTOTYPE_HOME_ASSETS.menu}" alt="" class="proto-figma-header__icon"/>
                            </button>
                            <img src="${PROTOTYPE_HOME_ASSETS.logo}" alt="korean skincare" class="proto-figma-header__logo"/>
                            <button type="button" class="proto-figma-header__icon-btn" aria-label="Wishlist">
                                <img src="${PROTOTYPE_HOME_ASSETS.heart}" alt="" class="proto-figma-header__icon"/>
                            </button>
                        </div>
                        <button type="button" class="proto-figma-search" data-proto-go="homepage-search" data-proto-label="Search">
                            <img src="${PROTOTYPE_HOME_ASSETS.search}" alt="" class="proto-figma-search__icon"/>
                            <span>What are you looking for?</span>
                        </button>
                        ${protoFigmaHomeCategoryNav()}
                    </header>
                    <main class="proto-figma-main">
                        <img src="${PROTOTYPE_HOME_ASSETS.main}" alt="Homepage promotions and shop categories" class="proto-figma-main__image"/>
                    </main>
                    ${protoFigmaTabBar('homepage')}
                </div>`;

        case 'homepage-search':
            return renderFigmaSearchScreen('homepage', 'homepage-search');

        case 'collections-search':
            return renderFigmaSearchScreen('collections', 'collections-search');

        case 'skin-concerns-search':
            return renderFigmaSearchScreen('skin-concerns', 'skin-concerns-search');

        case 'collections':
            return `
                <div class="proto-screen proto-screen--figma-collections">
                    <header class="proto-figma-collections-header">
                        <div class="proto-figma-collections-header__row">
                            <h1 class="proto-figma-collections-header__title">Collections</h1>
                            <button type="button" class="proto-figma-header__icon-btn" aria-label="Wishlist">
                                <img src="${PROTOTYPE_COLLECTIONS_ASSETS.heart}" alt="" class="proto-figma-header__icon"/>
                            </button>
                        </div>
                        <button type="button" class="proto-figma-search" data-proto-go="collections-search" data-proto-label="Search">
                            <img src="${PROTOTYPE_COLLECTIONS_ASSETS.search}" alt="" class="proto-figma-search__icon"/>
                            <span>What are you looking for?</span>
                        </button>
                    </header>
                    <main class="proto-figma-collections-main">
                        <div class="proto-figma-collections-list">
                            ${protoFigmaCollectionCard({
                                titleLines: ['Featured', 'Collections'],
                                thumb: PROTOTYPE_COLLECTIONS_ASSETS.featured,
                                ring: 'pink'
                            })}
                            ${protoFigmaCollectionCard({
                                title: 'Skin Concerns',
                                thumb: PROTOTYPE_COLLECTIONS_ASSETS.skinConcerns,
                                ring: 'pink',
                                go: 'skin-concerns',
                                label: 'Skin Concerns'
                            })}
                            ${protoFigmaCollectionCard({
                                title: 'Cleansers',
                                thumb: PROTOTYPE_COLLECTIONS_ASSETS.cleansers,
                                ring: 'yellow'
                            })}
                            ${protoFigmaCollectionCard({
                                title: 'Toners',
                                thumb: PROTOTYPE_COLLECTIONS_ASSETS.toners,
                                ring: 'blue'
                            })}
                            ${protoFigmaCollectionCard({
                                title: 'Treatments',
                                thumb: PROTOTYPE_COLLECTIONS_ASSETS.treatments,
                                ring: 'green'
                            })}
                        </div>
                    </main>
                    ${protoFigmaTabBar('collections')}
                </div>`;

        case 'skin-concerns':
            return `
                <div class="proto-screen proto-screen--figma-collections">
                    <header class="proto-figma-collections-header">
                        <div class="proto-figma-collections-header__row">
                            <button type="button" class="proto-figma-collections-header__back" data-proto-go="collections" aria-label="Back to Collections">
                                <img src="${PROTOTYPE_SEARCH_ASSETS.back}" alt="" class="proto-figma-collections-header__back-icon"/>
                            </button>
                            <h1 class="proto-figma-collections-header__title">Skin Concerns</h1>
                            <button type="button" class="proto-figma-header__icon-btn" aria-label="Wishlist">
                                <img src="${PROTOTYPE_SKIN_CONCERNS_ASSETS.heart}" alt="" class="proto-figma-header__icon"/>
                            </button>
                        </div>
                        <button type="button" class="proto-figma-search" data-proto-go="skin-concerns-search" data-proto-label="Search">
                            <img src="${PROTOTYPE_SKIN_CONCERNS_ASSETS.search}" alt="" class="proto-figma-search__icon"/>
                            <span>What are you looking for?</span>
                        </button>
                    </header>
                    <main class="proto-figma-collections-main">
                        <div class="proto-figma-collections-list">
                            ${protoFigmaCategoryList(SKIN_CONCERNS_CATEGORIES, PROTOTYPE_SKIN_CONCERNS_ASSETS)}
                        </div>
                    </main>
                    ${protoFigmaTabBar('collections')}
                </div>`;

        case 'listing':
            return renderFigmaListingScreen(listingBackScreen);

        case 'pdp':
            return renderFigmaPdpScreen(pdpBackScreen);

        default:
            return renderPrototypeScreen('homepage');
    }
}

function initSolutionPrototype(root) {
    if (!root) return null;

    const phone = root.querySelector('[data-proto-phone]');
    const titleEl = root.querySelector('[data-proto-title]');
    const actionEl = root.querySelector('[data-proto-action]');
    const changedEl = root.querySelector('[data-proto-changed]');
    const impactEl = root.querySelector('[data-proto-impact]');
    const pathEl = root.querySelector('[data-proto-path]');
    const resetBtn = root.querySelector('[data-proto-reset]');

    const baWrap = root.querySelector('[data-proto-ba]');
    const baImg = root.querySelector('[data-proto-ba-img]');
    const baHandle = root.querySelector('[data-proto-ba-handle]');

    let currentScreen = 'homepage';
    const path = ['Homepage'];

    function getGuideMeta() {
        if (currentScreen === 'homepage' && homeActiveCategory) {
            return prototypeScreenMeta['homepage-category'];
        }
        return prototypeScreenMeta[currentScreen];
    }

    function updateBefore() {
        if (!baImg) return;
        const screenId = currentScreen === 'homepage' ? 'homepage' : currentScreen;
        baImg.src = prototypeBeforeAsset(screenId);
        baImg.classList.toggle('proto-ba__before-img--homepage', screenId === 'homepage');
    }

    function updateGuide() {
        const meta = getGuideMeta();
        if (!meta) return;
        if (titleEl) titleEl.textContent = meta.title;
        if (actionEl) actionEl.textContent = meta.action;
        if (changedEl) changedEl.textContent = meta.changed;
        if (impactEl) impactEl.textContent = meta.impact || '';
        if (pathEl) pathEl.textContent = path.join(' → ');
        updateBefore();
    }

    function goTo(screenId, label, backScreen) {
        if (!prototypeScreenMeta[screenId] || screenId === currentScreen) return;
        if (screenId === 'listing') {
            if (backScreen) listingBackScreen = backScreen;
            listingContextLabel = label || '';
        }
        if (screenId === 'pdp' && backScreen) {
            pdpBackScreen = backScreen;
        }
        if (screenId !== 'homepage') {
            homeActiveCategory = null;
        }
        currentScreen = screenId;
        if (label) path.push(label);
        else path.push(prototypeScreenMeta[screenId].title);
        phone.innerHTML = renderPrototypeScreen(screenId);
        updateGuide();
        phone.scrollTop = 0;
    }

    function expandHomeCategory(categoryId) {
        const category = COLLECTION_CATEGORIES.find(item => item.id === categoryId);
        const wasActive = homeActiveCategory === categoryId;
        homeActiveCategory = wasActive ? null : categoryId;

        if (!wasActive && category) {
            if (path[path.length - 1] !== category.navLabel) {
                path.push(category.navLabel);
            }
        } else if (wasActive && category && path[path.length - 1] === category.navLabel) {
            path.pop();
        }

        phone.innerHTML = renderPrototypeScreen('homepage');
        updateGuide();
    }

    function reset() {
        currentScreen = 'homepage';
        listingBackScreen = 'skin-concerns';
        listingContextLabel = '';
        homeActiveCategory = null;
        pdpBackScreen = 'listing';
        path.length = 0;
        path.push('Homepage');
        phone.innerHTML = renderPrototypeScreen('homepage');
        updateGuide();
    }

    phone.addEventListener('click', (e) => {
        const expandBtn = e.target.closest('[data-proto-expand]');
        if (expandBtn) {
            e.preventDefault();
            expandHomeCategory(expandBtn.dataset.protoExpand);
            return;
        }

        const btn = e.target.closest('[data-proto-go]');
        if (!btn) return;
        e.preventDefault();
        const next = btn.dataset.protoGo;
        const label = btn.dataset.protoLabel
            || (next === 'pdp' ? 'Product details' : btn.textContent.trim());
        const back = btn.dataset.protoBack;
        goTo(next, label, back);
    });

    // Before / after comparison slider
    if (baWrap && baHandle) {
        let dragging = false;

        const setPos = (pct) => {
            const clamped = Math.max(0, Math.min(100, pct));
            baWrap.style.setProperty('--proto-ba-pos', `${clamped}%`);
            baHandle.setAttribute('aria-valuenow', String(Math.round(clamped)));
        };

        const posFromEvent = (clientX) => {
            const rect = baWrap.getBoundingClientRect();
            if (!rect.width) return;
            setPos(((clientX - rect.left) / rect.width) * 100);
        };

        const onMove = (e) => {
            if (!dragging) return;
            e.preventDefault();
            posFromEvent(e.clientX);
        };

        const stop = () => { dragging = false; };

        baHandle.addEventListener('pointerdown', (e) => {
            dragging = true;
            e.preventDefault();
            posFromEvent(e.clientX);
        });
        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', stop);
        window.addEventListener('pointercancel', stop);

        baHandle.addEventListener('keydown', (e) => {
            const current = parseFloat(baWrap.style.getPropertyValue('--proto-ba-pos')) || 50;
            if (e.key === 'ArrowLeft') { setPos(current - 5); e.preventDefault(); }
            if (e.key === 'ArrowRight') { setPos(current + 5); e.preventDefault(); }
        });
    }

    resetBtn?.addEventListener('click', reset);

    reset();
    return { reset, goTo };
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-solution-prototype]').forEach(root => {
        initSolutionPrototype(root);
    });
});
