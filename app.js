'use strict';

const products = [
  { id: 'w1', name: 'Function Liquid W1', brand: 'maiwell', group: 'liquid', unit: '3,79 liter', tag: 'AKRYL LIQUID', description: 'Klar modelleringsvæske til akrylnegler. En salongstørrelse for det daglige arbeidet med akrylmodellering.', short: 'Klar akryl liquid', specs: [['Type', 'Akryl liquid'], ['Farge', 'Klar'], ['Volum', '3,79 l']] },
  { id: 'w2', name: 'Function Liquid W2', brand: 'maiwell', group: 'liquid', unit: '3,79 liter', tag: 'AKRYL LIQUID', description: 'Violett modelleringsvæske til akrylnegler. Function Liquid W2 er et alternativ for deg som jobber med akrylmodellering.', short: 'Violett akryl liquid', specs: [['Type', 'Akryl liquid'], ['Farge', 'Violett'], ['Volum', '3,79 l']] },
  { id: 'urawa', name: 'Super UP200', brand: 'URAWA', group: 'utstyr', unit: 'Negledrill med håndstykke', tag: 'ELEKTRISK UTSTYR', description: 'Elektrisk negledrill med trinnløs hastighetskontroll opptil 25 000 omdreininger per minutt. Med forover- og reversfunksjon til presist arbeid med naturlige og kunstige negler.', short: 'Presisjon til arbeidsbordet', specs: [['Type', 'Elektrisk negledrill'], ['Hastighet', 'Opptil 25 000 o/min'], ['Retning', 'Forover / revers']] },
  { id: 'novicide', name: 'Novicide konsentrat', brand: 'NOVICIDE', group: 'hygiene', unit: '2 000 ml', tag: 'DESINFEKSJON', description: 'Desinfeksjonskonsentrat til salongverktøy med ikke-porøse overflater. Følg alltid etiketten og produsentens anvisninger for blanding, kontakttid og materialer.', short: 'Desinfeksjon til salongverktøy', specs: [['Type', 'Desinfeksjonskonsentrat'], ['Volum', '2 000 ml'], ['Bruk', 'I henhold til etiketten']], safety: true },
  { id: 'acetone', name: 'Aceton', brand: 'maiwell', group: 'hygiene', unit: '5 liter', tag: 'RENS & FJERNING', description: 'Aceton i en praktisk 5-liters kanne til salongbruk. Les alltid etiketten og produktinformasjonen før bruk.', short: 'Salongstørrelse, 5 liter', specs: [['Type', 'Aceton'], ['Volum', '5 l'], ['Emballasje', 'Plastkanne']], safety: true },
  { id: 'alcohol', name: 'Isopropanol 80 %', brand: 'maiwell', group: 'hygiene', unit: '5 liter', tag: 'RENS & FORBEREDELSE', description: 'Klar isopropanol 80 % til forberedelse og rens i neglearbeidet. Følg produktets etikett og anvisninger før bruk.', short: 'Klar isopropanol', specs: [['Type', 'Isopropanol'], ['Konsentrasjon', '80 %'], ['Volum', '5 l']], safety: true },
  { id: 'buffer', name: 'Neglebuffer 100/180', brand: 'maiwell', group: 'utstyr', unit: 'Oransje / hvit', tag: 'MANIKYRUTSTYR', description: 'Tresidig neglebuffer med korning 100/180 og myk polstring. For utjevning og forberedelse av neglens overflate.', short: 'Form, jevn ut og forbered', specs: [['Type', 'Tresidig buffer'], ['Korning', '100 / 180'], ['Farge', 'Oransje / hvit']] },
  { id: 'novicide-small', name: 'Novicide konsentrat', brand: 'NOVICIDE', group: 'hygiene', unit: '500 ml', tag: 'DESINFEKSJON', description: 'Desinfeksjonskonsentrat til salongverktøy i en mindre flaske. Følg alltid etiketten og produsentens anvisninger for blanding, kontakttid og materialer.', short: 'En mindre størrelse til salongen', specs: [['Type', 'Desinfeksjonskonsentrat'], ['Volum', '500 ml'], ['Bruk', 'I henhold til etiketten']], safety: true }
];

const categories = {
  negler: { number: '01', title: 'Negler', intro: 'Det rette grunnlaget for neglemodelleringen. Se nærmere på våre utvalgte akryl liquids, eller spør oss om andre negleprodukter.', ids: ['w1', 'w2'], subject: 'Produkter til negler' },
  manikyr: { number: '02', title: 'Manikyrutstyr', intro: 'Små verktøy spiller en stor rolle. Oppdag neglebufferen i utvalget, og kontakt oss om pensler, filer og annet utstyr til manikyren.', ids: ['buffer'], subject: 'Manikyrutstyr' },
  pedikyr: { number: '03', title: 'Pedikyr', intro: 'Ser du etter produkter til fotpleie og pedikyr? Fortell oss hva du trenger til behandlingene dine, så svarer vi deg om utvalg, priser og tilgjengelighet.', ids: [], subject: 'Produkter til pedikyr' },
  bits: { number: '04', title: 'Drill bits', intro: 'Et godt resultat begynner med riktig verktøy. Fortell oss hvilken maskin du bruker, og hvilken type bit og grovhet du ser etter, så hjelper vi deg videre.', ids: [], subject: 'Drill bits' },
  elektrisk: { number: '05', title: 'Elektrisk utstyr', intro: 'Utstyr for arbeidsplassen din. Bli kjent med URAWA Super UP200, eller ta kontakt om annet elektrisk utstyr til salongen.', ids: ['urawa'], subject: 'Elektrisk utstyr' },
  hygiene: { number: '06', title: 'Sterilisering', intro: 'Spør oss om utstyr til sterilisering og produkter til salonghygiene. Her kan du se rens og desinfeksjon i utvalget. Desinfeksjon og sterilisering er ulike prosesser; bruk produktene etter produsentens anvisninger.', ids: ['novicide', 'novicide-small', 'alcohol', 'acetone'], subject: 'Sterilisering og salonghygiene' }
};

let currentLanguage = readLanguage();
let currentFilter = 'all';

function readLanguage() {
  const requested = new URLSearchParams(window.location.search).get('lang');
  if (requested === 'nb' || requested === 'en') return requested;
  try {
    const saved = localStorage.getItem('nornails.language');
    if (saved === 'nb' || saved === 'en') return saved;
  } catch { /* The site also works when browser storage is unavailable. */ }
  return 'nb';
}

function t(key, values = {}) {
  const message = nornailsTranslations.messages[currentLanguage][key] ?? nornailsTranslations.messages.nb[key] ?? key;
  return message.replace(/\{(\w+)\}/g, (_, name) => String(values[name] ?? ''));
}

function localProduct(product, language = currentLanguage) {
  return { ...product, ...nornailsTranslations.products[language]?.[product.id] };
}

function localCategory(id) {
  return { ...categories[id], ...nornailsTranslations.categories[currentLanguage]?.[id] };
}

const arrow = '<svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg>';
const grid = document.querySelector('#product-grid');
const productDialog = document.querySelector('#product-dialog');
const categoryDialog = document.querySelector('#category-dialog');
const searchDialog = document.querySelector('#search-dialog');
const searchInput = document.querySelector('#product-search');
const headerSearchInput = document.querySelector('#header-product-search');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
let returnFocus = null;

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

function mailLink(subject, body) {
  return 'mailto:Nornails26@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
}

function renderProducts(filter = currentFilter) {
  currentFilter = filter;
  const visible = products.filter(product => filter === 'all' || product.group === filter).map(product => localProduct(product));
  grid.innerHTML = visible.map(product => `
    <article class="product-card">
      <button class="product-card-button" data-product="${product.id}" aria-label="${escapeHtml(t('products.view', { name: product.brand + ' ' + product.name, unit: product.unit }))}">
        <div class="product-image"><img src="assets/images/${product.id}.webp" alt="${product.brand} ${product.name}" width="700" height="700" loading="lazy"><span class="product-quickview" aria-hidden="true"><svg class="icon"><use href="#i-search"/></svg></span></div>
        <div class="product-info"><h3>${product.brand === 'NOVICIDE' ? '' : product.brand + ' '}${product.name}</h3><p class="product-description">${product.unit}</p><p class="product-price">${t('products.price')}</p></div>
      </button>
    </article>`).join('');
  grid.scrollLeft = 0;
  requestAnimationFrame(updateRailButtons);
  document.querySelector('#product-count').textContent = t(visible.length === 1 ? 'products.countOne' : 'products.count', { count: visible.length });
}

function renderViewAll() {
  const expanded = grid.classList.contains('expanded');
  const button = document.querySelector('#view-all-products');
  button.setAttribute('aria-expanded', String(expanded));
  button.innerHTML = `${t(expanded ? 'products.less' : 'products.all')} <span aria-hidden="true">${expanded ? '↑' : '→'}</span>`;
}

function applyLanguage(language, { persist = true, updateUrl = true } = {}) {
  if (!['nb', 'en'].includes(language)) return;
  currentLanguage = language;
  document.documentElement.lang = language;
  document.querySelectorAll('[data-i18n]').forEach(element => { element.textContent = t(element.dataset.i18n); });
  // Only trusted, locally maintained heading copy can contain line-break markup.
  document.querySelectorAll('[data-i18n-html]').forEach(element => { element.innerHTML = t(element.dataset.i18nHtml); });
  ['aria-label', 'placeholder', 'alt', 'title'].forEach(attribute => {
    document.querySelectorAll(`[data-i18n-${attribute}]`).forEach(element => {
      element.setAttribute(attribute, t(element.getAttribute(`data-i18n-${attribute}`)));
    });
  });
  document.querySelectorAll('[data-language]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.language === language));
  });
  const meta = nornailsTranslations.meta[language];
  document.title = meta.title;
  document.querySelector('meta[name="description"]').content = meta.description;
  document.querySelector('meta[property="og:title"]').content = meta.ogTitle;
  document.querySelector('meta[property="og:description"]').content = meta.ogDescription;
  document.querySelector('meta[property="og:locale"]').content = meta.locale;
  const businessData = document.querySelector('#business-data');
  const business = JSON.parse(businessData.textContent);
  business.description = meta.businessDescription;
  businessData.textContent = JSON.stringify(business);
  menuToggle.setAttribute('aria-label', t(menuToggle.getAttribute('aria-expanded') === 'true' ? 'a11y.menu.close' : 'a11y.menu.open'));
  renderProducts();
  renderViewAll();
  renderSearch();
  if (productDialog.open) renderProductDetails(productDialog.dataset.productId);
  if (categoryDialog.open) renderCategoryDetails(categoryDialog.dataset.categoryId);
  if (persist) {
    try { localStorage.setItem('nornails.language', language); } catch { /* Optional preference storage. */ }
  }
  if (updateUrl) {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', language);
      window.history.replaceState(window.history.state, '', url);
    } catch { /* Local file previews may disallow history updates. */ }
  }
  requestAnimationFrame(updateRailButtons);
}

function setMenu(open) {
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', t(open ? 'a11y.menu.close' : 'a11y.menu.open'));
  mobileMenu.classList.toggle('open', open);
  mobileMenu.inert = !open;
  document.body.classList.toggle('menu-open', open);
}

function openDialog(dialog) {
  if (!document.querySelector('dialog[open]')) returnFocus = document.activeElement;
  document.querySelectorAll('dialog[open]').forEach(other => other.close());
  setMenu(false);
  dialog.showModal();
  document.body.classList.add('modal-open');
}

function renderProductDetails(id) {
  const source = products.find(item => item.id === id);
  if (!source) return;
  const product = localProduct(source);
  const values = { name: product.brand + ' ' + product.name, unit: product.unit };
  const inquiry = mailLink(t('mail.productSubject', values), t('mail.productBody', values));
  document.querySelector('#product-dialog-content').innerHTML = `<div class="product-dialog-layout"><div class="dialog-product-image"><img src="assets/images/${product.id}.webp" alt="${product.brand} ${product.name}" width="700" height="700"></div><div class="dialog-product-info"><span class="eyebrow">${product.brand} / ${product.tag}</span><h2 id="dialog-title">${product.name}</h2><span class="product-unit">${product.unit}</span><p>${product.description}</p><dl class="product-specs">${product.specs.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join('')}</dl><a class="button button-dark" href="${escapeHtml(inquiry)}">${t('product.ask')} ${arrow}</a><p class="dialog-disclaimer">${t('product.disclaimer')}${product.safety ? ' ' + t('product.safety') : ''}</p></div></div>`;
}

function openProduct(id) {
  if (!products.some(item => item.id === id)) return;
  productDialog.dataset.productId = id;
  renderProductDetails(id);
  openDialog(productDialog);
}

function renderCategoryDetails(id) {
  if (!categories[id]) return;
  const category = localCategory(id);
  const related = products.filter(product => category.ids.includes(product.id)).map(product => localProduct(product));
  const inquiry = mailLink(t('mail.categorySubject', { category: category.subject }), t('mail.categoryBody', { category: category.subject }));
  document.querySelector('#category-dialog-content').innerHTML = `<span class="eyebrow">${t('category.label')} / ${category.number}</span><h2 id="category-dialog-title">${category.title}</h2><p class="category-intro">${category.intro}</p>${related.length ? `<div class="category-product-list">${related.map(product => `<button class="category-product-button" data-product="${product.id}"><img src="assets/images/${product.id}.webp" alt="" width="70" height="70"><span>${product.brand} ${product.name}<br><small>${product.unit}</small></span>${arrow}</button>`).join('')}</div>` : ''}<a class="button button-dark" href="${escapeHtml(inquiry)}">${t('category.ask', { category: category.title.toLocaleLowerCase(currentLanguage) })} ${arrow}</a><p class="category-note">${t('category.note')}<br>${t('category.call')} <a href="tel:+4746125141">+47 4612 5141</a>.</p>`;
}

function openCategory(id) {
  if (!categories[id]) return;
  categoryDialog.dataset.categoryId = id;
  renderCategoryDetails(id);
  openDialog(categoryDialog);
}

function normalize(text) {
  return text.toLocaleLowerCase('nb').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replaceAll('ø', 'o').replaceAll('æ', 'ae').replace(/[^a-z0-9]+/g, ' ').trim();
}

const searchIndex = new Map(products.map(product => {
  const content = ['nb', 'en'].flatMap(language => {
    const item = localProduct(product, language);
    return [item.name, item.brand, item.tag, item.unit, item.short, item.description];
  });
  const aliases = { urawa: 'nail drill electric drill neglefres neglefraser utstyr equipment', alcohol: 'alcohol alkohol cleaner rens', acetone: 'remover fjerner', w1: 'monomer', w2: 'monomer', buffer: 'buffing nail file neglefil manicure', novicide: 'disinfectant desinfeksjon hygiene 2l', 'novicide-small': 'disinfectant desinfeksjon hygiene' };
  return [product.id, normalize([...content, aliases[product.id] ?? ''].join(' '))];
}));

function renderSearch() {
  const rawQuery = searchInput.value.trim();
  const tokens = normalize(rawQuery).split(/\s+/).filter(Boolean);
  const found = products.filter(product => tokens.every(token => searchIndex.get(product.id).includes(token))).map(product => localProduct(product));
  document.querySelector('#search-count').textContent = rawQuery ? t(found.length === 1 ? 'search.resultOne' : 'search.results', { count: found.length, query: rawQuery }) : t('search.explore', { count: products.length });
  const list = document.querySelector('#search-results');
  if (!found.length) {
    list.innerHTML = `<p class="search-empty">${t('search.empty')} <a href="mailto:Nornails26@gmail.com">${t('search.ask')}</a>.</p>`;
    return;
  }
  list.innerHTML = found.map(product => `<button class="search-result" data-product="${product.id}"><img src="assets/images/${product.id}.webp" alt="" width="57" height="63"><span>${product.brand} ${product.name}<small>${product.unit} · ${product.short}</small></span>${arrow}</button>`).join('');
}

function openSearch(query = '') {
  searchInput.value = query;
  renderSearch();
  openDialog(searchDialog);
  searchInput.focus();
}

document.addEventListener('click', event => {
  const languageButton = event.target.closest('[data-language]');
  if (languageButton) applyLanguage(languageButton.dataset.language);
  const productButton = event.target.closest('[data-product]');
  if (productButton) openProduct(productButton.dataset.product);
  const categoryButton = event.target.closest('[data-category]');
  if (categoryButton) openCategory(categoryButton.dataset.category);
  const filterButton = event.target.closest('[data-filter]');
  if (filterButton) {
    document.querySelectorAll('[data-filter]').forEach(button => {
      const active = button === filterButton;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    renderProducts(filterButton.dataset.filter);
  }
});

document.querySelector('.search-open').addEventListener('click', () => openSearch(headerSearchInput.value.trim()));
document.querySelector('#header-search-form').addEventListener('submit', event => {
  event.preventDefault();
  openSearch(headerSearchInput.value.trim());
});
searchInput.addEventListener('input', () => {
  headerSearchInput.value = searchInput.value;
  renderSearch();
});
searchInput.addEventListener('keydown', event => {
  if (event.key === 'ArrowDown') {
    const first = document.querySelector('.search-result');
    if (first) { event.preventDefault(); first.focus(); }
  }
});
menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  const activeDialog = document.querySelector('dialog[open]');
  if (event.key === 'Escape' && activeDialog) {
    event.preventDefault();
    activeDialog.close();
    return;
  }
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuToggle.focus();
  }
  if (event.key === 'Tab' && menuToggle.getAttribute('aria-expanded') === 'true') {
    const focusables = [menuToggle, ...mobileMenu.querySelectorAll('a')];
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});
window.matchMedia('(min-width: 701px)').addEventListener('change', event => { if (event.matches) setMenu(false); });

document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    if (document.querySelector('dialog[open]')) return;
    document.body.classList.remove('modal-open');
    if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
    returnFocus = null;
  });
});

const rails = { categories: document.querySelector('#category-rail'), products: grid };

function updateRailButtons() {
  document.querySelectorAll('[data-slide]').forEach(button => {
    const rail = rails[button.dataset.slide];
    const maximum = rail.scrollWidth - rail.clientWidth;
    button.disabled = rail.classList.contains('expanded') || (button.dataset.direction === '-1' ? rail.scrollLeft < 2 : rail.scrollLeft >= maximum - 2);
  });
}

Object.values(rails).forEach(rail => {
  rail.addEventListener('scroll', updateRailButtons, { passive: true });
  rail.addEventListener('keydown', event => {
    if (event.target !== rail || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const card = rail.firstElementChild;
    const distance = card ? card.getBoundingClientRect().width + parseFloat(getComputedStyle(rail).columnGap) : rail.clientWidth;
    rail.scrollBy({ left: distance * (event.key === 'ArrowRight' ? 1 : -1), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  });
});

document.querySelectorAll('[data-slide]').forEach(button => button.addEventListener('click', () => {
  const rail = rails[button.dataset.slide];
  rail.scrollBy({ left: rail.clientWidth * Number(button.dataset.direction), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
}));

document.querySelector('#view-all-products').addEventListener('click', () => {
  grid.classList.toggle('expanded');
  renderViewAll();
  grid.scrollLeft = 0;
  updateRailButtons();
});
window.addEventListener('resize', updateRailButtons, { passive: true });

const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 40), { passive: true });
applyLanguage(currentLanguage, { persist: false, updateUrl: false });
document.querySelector('#year').textContent = new Date().getFullYear();

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: .08 });
  document.querySelectorAll('.section-heading, .spotlight-copy, .about-copy, .contact-heading').forEach(element => {
    element.classList.add('reveal-ready');
    observer.observe(element);
  });
}
