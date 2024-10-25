import './index.css';
import { sanitizerConfig } from '../helpers';

export default class BulletList {
  constructor({api, data, config, block}) {
    this.data = data.data || [
      'Passport, valid for at least 3 months after the expiration date of the requested visa. With at least two blank pages.',
      'Passport, valid for at least 3 months after the expiration date of the requested visa. With at least two blank pages.'
    ];
    this.api = api;
    this.wrapper = undefined;
    this.blockAPI = block;
  }

  static get toolbox() {
    return {
      icon: `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 17L19 17" stroke="black" stroke-width="2" stroke-linecap="round"/>
        <path d="M10 13L19 13" stroke="black" stroke-width="2" stroke-linecap="round"/>
        <path d="M10 9L19 9" stroke="black" stroke-width="2" stroke-linecap="round"/>
        <circle cx="7" cy="13" r="1" fill="black"/>
        <circle cx="7" cy="9" r="1" fill="black"/>
        <circle cx="7" cy="17" r="1" fill="black"/>
        </svg>`,
      title: "Bullet list",
    };
  }

  render() {
    this.wrapper = document.createElement('ul');
    this.wrapper.classList.add('bullet-list-container');
    this.wrapper.contentEditable = "false";
    for (let i in this.data) {
      let li = document.createElement('li');
      li.classList.add('bullet-list-item');
      li.contentEditable = true;
      li.innerHTML = this.data[i];
      this.wrapper.appendChild(li);
    }

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
        icon: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="12" fill="#E9E7FD"/>
                    <path d="M25.8333 12.5H14.1667C13.2462 12.5 12.5 13.2462 12.5 14.1667V25.8333C12.5 26.7538 13.2462 27.5 14.1667 27.5H25.8333C26.7538 27.5 27.5 26.7538 27.5 25.8333V14.1667C27.5 13.2462 26.7538 12.5 25.8333 12.5Z" stroke="#040019" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12.5 20H27.5" stroke="#040019" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    `,
        label: "Add new line",
        onActivate: () => {
          let li = document.createElement('li');
          li.classList.add('bullet-list-item');
          li.contentEditable = true;
          li.innerHTML = 'Passport, valid for at least 3 months after the expiration date of the requested visa. With at least two blank pages.';
          this.wrapper.appendChild(li);
        },
        closeOnActivate: true,
        isDisabled: false
      },
      {
        icon: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="12" fill="#E9E7FD"/>
                    <path d="M25.8333 12.5H14.1667C13.2462 12.5 12.5 13.2462 12.5 14.1667V25.8333C12.5 26.7538 13.2462 27.5 14.1667 27.5H25.8333C26.7538 27.5 27.5 26.7538 27.5 25.8333V14.1667C27.5 13.2462 26.7538 12.5 25.8333 12.5Z" stroke="#040019" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12.5 20H27.5" stroke="#040019" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    `,
        label: "Delete last line",
        onActivate: () => {
          let items = this.wrapper.childNodes;
          this.wrapper.removeChild(items[items.length - 1]);
        },
        closeOnActivate: true,
        isDisabled: false
      },
    ];
  }

  async save() {
    try {
      const records = this.wrapper.querySelectorAll('li')
      let items = [];
      for (let i in records) {
        if (records[i].innerHTML) {
          items.push(records[i].innerHTML);
        }
      }

      return {
        'data': items,
      };
    } catch (reason) {
      console.log(`Editor.js initialization failed because of ${reason}`)
    }
  }
}
