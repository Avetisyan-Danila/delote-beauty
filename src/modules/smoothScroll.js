import {forEach, set} from 'lodash';

class SmoothScroll {
  constructor(elem) {
    this.block = elem;
    this.init();
  }

  init() {
    this.block.addEventListener('click', (e) => {
      e.preventDefault();

      const href = this.block.getAttribute('href').substring(1);
      const scrollTarget = document.getElementById(href);
      const topOffset = document.querySelector('.header').offsetHeight;
        const elementPosition = scrollTarget.getBoundingClientRect().top;
      const offsetPosition = elementPosition - topOffset;

      window.scrollBy({
        top: offsetPosition,
        behavior: 'smooth'
      });
    })
  }

  static getAllBlocks() {
    return Array.from(document.querySelectorAll('a[href^="#"]:not(.tab-link)'));
  }

  static initAllBlocks() {
    let Blocks = SmoothScroll.getAllBlocks();
    forEach(Blocks, (block) => {
      if (block.ins) return;
      block.ins = new SmoothScroll(block);
    });
  }
}

// Инициализация;
window.addEventListener('load', () => {
  SmoothScroll.initAllBlocks();
})

// Экспорт;
set(window, ['Block', 'SmoothScroll'], SmoothScroll);
export default SmoothScroll;

