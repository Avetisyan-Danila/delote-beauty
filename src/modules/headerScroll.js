const header = document.querySelector('.header');
const headerWrapper = document.querySelector('.header__wrapper');
const headerBottomLine = document.querySelector('.header__bottom-line');

headerBottomLine.style.width = `${headerWrapper.offsetWidth}px`
headerBottomLine.style.left = `${headerWrapper.getBoundingClientRect().left}px`;

window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    header.classList.add('header--scroll');
    headerBottomLine.style.width = `${header.offsetWidth}px`;
    headerBottomLine.style.left = 0;
  } else {
    header.classList.remove('header--scroll')
    headerBottomLine.style.width = `${headerWrapper.offsetWidth}px`;
    headerBottomLine.style.left = `${headerWrapper.getBoundingClientRect().left}px`;
  }
})

window.addEventListener('resize', () => {
  headerBottomLine.style.width = `${headerWrapper.offsetWidth}px`
  headerBottomLine.style.left = `${headerWrapper.getBoundingClientRect().left}px`;
})
