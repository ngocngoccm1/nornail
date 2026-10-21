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

const arrow = '<svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg>';
const grid = document.querySelector('#product-grid');
const productDialog = document.querySelector('#product-dialog');
const categoryDialog = document.querySelector('#category-dialog');
const searchDialog = document.querySelector('#search-dialog');
const searchInput = document.querySelector('#product-search');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
let returnFocus = null;

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

function mailLink(subject, body) {
  return 'mailto:Nornails2026@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
}

function renderProducts(filter = 'all') {
  const visible = products.filter(product => filter === 'all' || product.group === filter);
  grid.innerHTML = visible.map(product => `
    <article class="product-card">
      <button class="product-card-button" data-product="${product.id}" aria-label="Se ${product.brand} ${product.name}, ${product.unit}">
        <div class="product-image"><img src="assets/images/${product.id}.webp" alt="${product.brand} ${product.name}" width="700" height="700" loading="lazy"><span class="product-quickview" aria-hidden="true"><svg class="icon"><use href="#i-search"/></svg></span></div>
        <div class="product-info"><h3>${product.brand === 'NOVICIDE' ? '' : product.brand + ' '}${product.name}</h3><p class="product-description">${product.unit}</p><p class="product-price">Pris på forespørsel</p></div>
      </button>
    </article>`).join('');
  grid.scrollLeft = 0;
  requestAnimationFrame(updateRailButtons);
  document.querySelector('#product-count').textContent = visible.length + ' produkter';
}

function setMenu(open) {
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Lukk meny' : 'Åpne meny');
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

function openProduct(id) {
  const product = products.find(item => item.id === id);
  if (!product) return;
  const inquiry = mailLink('Produktforespørsel: ' + product.brand + ' ' + product.name + ' · ' + product.unit, `Hei Nornails!\n\nJeg ønsker pris og tilgjengelighet på:\n${product.brand} ${product.name} — ${product.unit}\n\nØnsket antall: \n\nNavn / salong: \nTelefon: \n\nTakk!`);
  document.querySelector('#product-dialog-content').innerHTML = `<div class="product-dialog-layout"><div class="dialog-product-image"><img src="assets/images/${product.id}.webp" alt="${product.brand} ${product.name}" width="700" height="700"></div><div class="dialog-product-info"><span class="eyebrow">${product.brand} / ${product.tag}</span><h2 id="dialog-title">${product.name}</h2><span class="product-unit">${product.unit}</span><p>${product.description}</p><dl class="product-specs">${product.specs.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join('')}</dl><a class="button button-dark" href="${escapeHtml(inquiry)}">Spør om produktet ${arrow}</a><p class="dialog-disclaimer">Åpner en e-post til Nornails. Vi bekrefter pris og tilgjengelighet.${product.safety ? ' Les alltid etiketten og produktinformasjonen før bruk.' : ''}</p></div></div>`;
  openDialog(productDialog);
}

function openCategory(id) {
  const category = categories[id];
  if (!category) return;
  const related = products.filter(product => category.ids.includes(product.id));
  const inquiry = mailLink('Forespørsel: ' + category.subject, `Hei Nornails!\n\nJeg er interessert i ${category.subject.toLowerCase()}.\n\nJeg ser etter: \nØnsket antall: \n\nNavn / salong: \nTelefon: \n\nTakk!`);
  document.querySelector('#category-dialog-content').innerHTML = `<span class="eyebrow">SORTIMENT / ${category.number}</span><h2 id="category-dialog-title">${category.title}</h2><p class="category-intro">${category.intro}</p>${related.length ? `<div class="category-product-list">${related.map(product => `<button class="category-product-button" data-product="${product.id}"><img src="assets/images/${product.id}.webp" alt="" width="70" height="70"><span>${product.brand} ${product.name}<br><small>${product.unit}</small></span>${arrow}</button>`).join('')}</div>` : ''}<a class="button button-dark" href="${escapeHtml(inquiry)}">Spør oss om ${category.title.toLowerCase()} ${arrow}</a><p class="category-note">Kontakt oss for oppdatert utvalg, priser og tilgjengelighet.<br>Du kan også ringe <a href="tel:+4746125141">+47 4612 5141</a>.</p>`;
  openDialog(categoryDialog);
}

function normalize(text) {
  return text.toLocaleLowerCase('nb').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replaceAll('ø', 'o').replaceAll('æ', 'ae');
}

function renderSearch() {
  const query = normalize(searchInput.value.trim());
  const found = products.filter(product => normalize([product.name, product.brand, product.tag, product.unit, product.short, product.description].join(' ')).includes(query));
  document.querySelector('#search-count').textContent = query ? `${found.length} ${found.length === 1 ? 'treff' : 'treff'} for «${searchInput.value.trim()}»` : 'Utforsk våre 8 produkter';
  const list = document.querySelector('#search-results');
  if (!found.length) {
    list.innerHTML = '<p class="search-empty">Ingen produkter funnet. Prøv et annet søk, eller <a href="mailto:Nornails2026@gmail.com">spør oss om produktet du ser etter</a>.</p>';
    return;
  }
  list.innerHTML = found.map(product => `<button class="search-result" data-product="${product.id}"><img src="assets/images/${product.id}.webp" alt="" width="57" height="63"><span>${product.brand} ${product.name}<small>${product.unit} · ${product.short}</small></span>${arrow}</button>`).join('');
}

document.addEventListener('click', event => {
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

document.querySelector('.search-open').addEventListener('click', () => {
  searchInput.value = '';
  renderSearch();
  openDialog(searchDialog);
  searchInput.focus();
});
searchInput.addEventListener('input', renderSearch);
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

document.querySelector('#view-all-products').addEventListener('click', event => {
  const expanded = grid.classList.toggle('expanded');
  event.currentTarget.setAttribute('aria-expanded', String(expanded));
  event.currentTarget.innerHTML = expanded ? 'Vis færre produkter <span aria-hidden="true">↑</span>' : 'Vis alle produkter <span aria-hidden="true">→</span>';
  grid.scrollLeft = 0;
  updateRailButtons();
});
window.addEventListener('resize', updateRailButtons, { passive: true });

const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 40), { passive: true });
renderProducts();
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
