import {forEach, set} from 'lodash';

const ClassName = {
  BLOCK: 'tabs',
  TAB_LINKS: 'tab-link',
  TAB_ELEMENTS: 'tab-content',
  LINE: 'tab-line',
};

class Tabs {
  constructor(elem) {
    this.block = elem;
    this.links = this.block.querySelectorAll(`.${ClassName.TAB_LINKS}`);
    this.elements = this.block.querySelectorAll(`.${ClassName.TAB_ELEMENTS}`);
    this.line = this.block.querySelector(`.${ClassName.LINE}`);
    this.init();
  }

  init() {
    this.line.style.width = `${this.links[0].offsetWidth}px`;
    this.links.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();

        this.addActiveClass(this.links, link);
        this.line.style.width = `${link.offsetWidth}px`;
        this.line.style.left = `${link.offsetLeft}px`;

        this.elements.forEach((block) => {
          if (block.getAttribute('id') === link.getAttribute('href').substring(1)) {
            this.addActiveClass(this.elements, block);
          }
        })
      })
    })
  }

  addActiveClass(elements, link) {
    elements.forEach((link) => {
      link.classList.remove('active');
    });

    link.classList.add('active');
  }

  static getAllBlocks() {
    return Array.from(document.getElementsByClassName(ClassName.BLOCK));
  }

  static initAllBlocks() {
    let Blocks = Tabs.getAllBlocks();
    forEach(Blocks, (block) => {
      if (block.ins) return;
      block.ins = new Tabs(block);
    });
  }
}

// Инициализация;
window.addEventListener('load', () => {
  setTimeout(() => {
    Tabs.initAllBlocks();
  }, 500)
})

// Экспорт;
set(window, ['Block', 'Tabs'], Tabs);
export default Tabs;

