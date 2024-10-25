import './index.css';
import { sanitizerConfig } from '../helpers';

export default class Header {
  constructor({api, data, config, block}) {
    this.data = data.title || 'Title';
    this.type = data.type || 'h1';
    this.api = api;
    this.wrapper = undefined;
    this.blockAPI = block;
    this.input = undefined;
    this.classMapping = {
      'h1': 'header_h1',
      'h2': 'header_h2',
      'h3': 'header_h3',
    };
  }

  static get toolbox() {
    return {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 12H18" stroke="#666668" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M6 20V4" stroke="#666668" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M18 20V4" stroke="#666668" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,
      title: "Header",
    };
  }

  render() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('header-container');
    this.wrapper.contentEditable = "false";
    this.input = document.createElement('div');
    this.input.id = 'input-text';
    this.input.contentEditable = "true";
    this.input.classList.add(this.classMapping[this.type]);
    this.input.innerText = this.data;
    this.wrapper.appendChild(this.input);

    this.wrapper.addEventListener('paste', (e) => {
      e.stopPropagation();
      e.preventDefault();
      let paste = (e.clipboardData || window.clipboardData).getData("text/html");
      if (paste.length === 0) {
        paste = (e.clipboardData || window.clipboardData).getData("text/plain");
      }
      paste = this.api.sanitizer.clean(paste || '', sanitizerConfig);
      document.execCommand("insertHTML", false, paste.trim());
      this.blockAPI.dispatchChange();
    });
    return this.wrapper;
  }

  renderSettings() {
    return [
      {
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 12H12" stroke="#666668" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M4 18V6" stroke="#666668" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 18V6" stroke="#666668" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M17 12L20 10V18" stroke="#666668" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`,
        label: 'H1',
        onActivate: () => {
          this.type = 'h1';
          this.input.classList = '';
          this.input.classList.add(this.classMapping['h1']);
        },
        closeOnActivate: true,
        isDisabled: false,
      },
      {
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 12H12" stroke="#666668" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M4 18V6" stroke="#666668" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 18V6" stroke="#666668" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M21 18H17C17 14 21 15 21 12C21 10.5 19 9.50001 17 11" stroke="#666668" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`,
        label: 'H2',
        onActivate: () => {
          this.type = 'h2';
          this.input.classList = '';
          this.input.classList.add(this.classMapping['h2']);
        },
        closeOnActivate: true,
        isDisabled: false,
      },
      {
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 12H12" stroke="#666668" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M4 18V6" stroke="#666668" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 18V6" stroke="#666668" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M17.5 10.5C19.2 9.5 21 10.5 21 12C21 12.5304 20.7893 13.0391 20.4142 13.4142C20.0391 13.7893 19.5304 14 19 14" stroke="#666668" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M17 17.5C19 19 21 17.8 21 16C21 15.4696 20.7893 14.9609 20.4142 14.5858C20.0391 14.2107 19.5304 14 19 14" stroke="#666668" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`,
        label: 'H3',
        onActivate: () => {
          this.type = 'h3';
          this.input.classList = '';
          this.input.classList.add(this.classMapping['h3']);
        },
        closeOnActivate: true,
        isDisabled: false,
      },
    ];
  }

  async save() {
    try {
      return {
        'type': this.type,
        'title': this.wrapper.querySelector('#input-text')?.innerText || 'title'
      };
    } catch (reason) {
      console.log(`Editor.js initialization failed because of ${reason}`)
    }
  }
}
