const burger = document.querySelector('.burger');
const sideMenu = document.querySelector('.side-menu');
const headerWrapper = document.querySelector('.header__wrapper');
const headerBlackout = document.querySelector('.header__blackout');

// Константы
const sideMenuZIndex = '101';
const sideMenuAnimationDuration = 400;
const sideMenuPaddingLeft = 80;
const burgerWidth = 40;

// Изначальное положение при загрузке
let burgerStartPositionTop = `${burger.getBoundingClientRect().top}px`;
let burgerStartPositionLeft = `${headerWrapper.getBoundingClientRect().right - burgerWidth}px`;
burger.style.position = 'fixed';
burger.style.top = burgerStartPositionTop;
burger.style.left = burgerStartPositionLeft;
burger.style.zIndex = sideMenuZIndex;

burger.addEventListener('click', () => {
  document.querySelector('body').classList.add('lock');

  sideMenu.classList.toggle('side-menu--opened');

  burger.classList.toggle('burger--active');
  burger.style.pointerEvents = 'none';

  if (burger.classList.contains('burger--active')) {
    setTimeout(() => {
      burger.style.left = `${sideMenu.getBoundingClientRect().left + sideMenuPaddingLeft}px`;
      burger.style.pointerEvents = 'auto';

      headerBlackout.classList.add('header__blackout--active')
    }, sideMenuAnimationDuration)
  } else {
    setTimeout(() => {
      document.querySelector('body').classList.remove('lock');

      burger.style.left = burgerStartPositionLeft;
      burger.style.pointerEvents = 'auto';

      headerBlackout.classList.remove('header__blackout--active')
    }, sideMenuAnimationDuration / 6)
  }
})

window.addEventListener('resize', () => {
  if (burger.classList.contains('burger--active')) {
    burger.style.left = `${sideMenu.getBoundingClientRect().left + sideMenuPaddingLeft}px`;
    burgerStartPositionLeft = `${headerWrapper.getBoundingClientRect().right - burgerWidth}px`;
  } else {
    burgerStartPositionLeft = `${headerWrapper.getBoundingClientRect().right - burgerWidth}px`;
    burger.style.left = burgerStartPositionLeft;
  }
})
