import { getScrollBarWidth } from "./utils/getScrollBarWidth";

const burger = document.querySelector('.burger');
const sideMenu = document.querySelector('.side-menu');
const headerWrapper = document.querySelector('.header__wrapper');
const headerBlackout = document.querySelector('.header__blackout');

// Константы
const sideMenuZIndex = '101';
const sideMenuAnimationDuration = 400;
const sideMenuPaddingLeft = () => {
  if (document.documentElement.clientWidth <= 576) {
    return 40;
  } else {
    return 80;
  }
};
const burgerWidth = 40;

// Изначальное положение при загрузке
let burgerStartPositionTop = `${burger.getBoundingClientRect().top}px`;
let burgerStartPositionLeft = `${headerWrapper.getBoundingClientRect().right - burgerWidth}px`;
burger.style.position = 'fixed';
burger.style.top = burgerStartPositionTop;
burger.style.left = burgerStartPositionLeft;
burger.style.zIndex = sideMenuZIndex;

// Обработчий клика по бургеру
burger.addEventListener('click', () => {
  // Запретить скролл на сайте и паддинг для скроллбаров, чтобы контент не прыгал
  document.querySelector('body').classList.add('lock');
  document.querySelector('body').style.paddingRight = `${getScrollBarWidth()}px`;

  sideMenu.classList.toggle('side-menu--opened');

  burger.classList.toggle('burger--active');
  burger.style.pointerEvents = 'none';

  if (burger.classList.contains('burger--active')) {
    setTimeout(() => {
      burger.style.left = `${sideMenu.getBoundingClientRect().left + sideMenuPaddingLeft()}px`;
      burger.style.pointerEvents = 'auto';

      headerBlackout.classList.add('header__blackout--active')
    }, sideMenuAnimationDuration)
  } else {
    setTimeout(() => {
      document.querySelector('body').classList.remove('lock');
      document.querySelector('body').style.paddingRight = '0px';

      burger.style.left = burgerStartPositionLeft;
      burger.style.pointerEvents = 'auto';

      headerBlackout.classList.remove('header__blackout--active')
    }, sideMenuAnimationDuration / 6)
  }
})

// Обработка резайза страницы
window.addEventListener('resize', () => {
  if (burger.classList.contains('burger--active')) {
    burger.style.left = `${sideMenu.getBoundingClientRect().left + sideMenuPaddingLeft()}px`;
    burgerStartPositionLeft = `${headerWrapper.getBoundingClientRect().right - burgerWidth}px`;
  } else {
    burgerStartPositionLeft = `${headerWrapper.getBoundingClientRect().right - burgerWidth}px`;
    burger.style.left = burgerStartPositionLeft;
  }
})
