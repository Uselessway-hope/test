
const burger = document.getElementById('burgerBtn');
const nav    = document.getElementById('headerNav');

burger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('header__nav--open');
  burger.classList.toggle('header__burger--active', isOpen);
  burger.setAttribute('aria-expanded', isOpen);


  document.body.style.overflow = isOpen ? 'hidden' : '';
});


const solutionsLink = document.querySelector('.header__nav-item-link--dropdown');
const solutionsItem = solutionsLink.closest('.header__nav-item--dropdown');

solutionsLink.addEventListener('click', (e) => {
  if (window.getComputedStyle(burger).display === 'none') return;
  e.preventDefault();
  solutionsItem.classList.toggle('dropdown--open');
});


const track = document.getElementById('heroTrack');
const dots   = document.querySelectorAll('.hero__dot');
const total  = dots.length;
let current    = 0;
let isAnimating = false;

function goTo(index) {
  if (isAnimating) return;
  isAnimating = true;
  current = (index + total) % total;
  track.style.transform = `translateX(-${current * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle('hero__dot--active', i === current));
  setTimeout(() => { isAnimating = false; }, 500);
}

document.getElementById('heroNext').addEventListener('click', () => goTo(current + 1));
document.getElementById('heroPrev').addEventListener('click', () => goTo(current - 1));
dots.forEach(dot => dot.addEventListener('click', () => goTo(+dot.dataset.index)));
setInterval(() => goTo(current + 1), 5000);


const searchBtn   = document.querySelector('.header__actions-button[aria-label="Поиск"]');
const searchModal = document.getElementById('searchModal');
const searchClose = document.getElementById('searchModalClose');
const searchInput = document.getElementById('searchModalInput');

function openSearch() {
  searchModal.classList.add('search-modal--open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => searchInput.focus(), 100);
}

function closeSearch() {
  searchModal.classList.remove('search-modal--open');
  /* восстанавливаем скролл только если бургер тоже закрыт */
  if (!nav.classList.contains('header__nav--open')) {
    document.body.style.overflow = '';
  }
}

searchBtn.addEventListener('click', openSearch);
searchClose.addEventListener('click', closeSearch);


searchModal.addEventListener('click', (e) => {
  if (e.target === searchModal) closeSearch();
});


document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && searchModal.classList.contains('search-modal--open')) {
    closeSearch();
  }
});


document.querySelectorAll('.search-offer__tag').forEach(tag => {
  tag.addEventListener('click', () => {
    const input = document.getElementById('searchInput');
    if (input) {
      input.value = tag.textContent.trim();
      input.focus();
    }
  });
});
