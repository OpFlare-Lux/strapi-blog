import './index.css';
import { sanitizerConfig } from '../helpers';

export default class NumberedList {
  constructor({api, data, config, block}) {
    this.data = data.data || [
      {
        'title': 'Test title',
        'description': 'Passport, valid for at least 3 months after the expiration date of the requested visa. With at least two blank pages.',
      },
      {
        'title': 'Test title',
        'description': 'Passport, valid for at least 3 months after the expiration date of the requested visa. With at least two blank pages.',
      }
    ];
    this.api = api;
    this.wrapper = undefined;
    this.blockAPI = block;
  }

  static get toolbox() {
    return {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 6H21" stroke="#666668" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10 12H21" stroke="#666668" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10 18H21" stroke="#666668" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4 6H5V10" stroke="#666668" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4 10H6" stroke="#666668" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M6 18H4C4 17 6 16 6 15C6 14 5 13.5 4 14" stroke="#666668" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,
      title: "Numbered list",
    };
  }

  render() {
    this.wrapper = document.createElement('ol');
    this.wrapper.classList.add('numbered-list-container');
    this.wrapper.contentEditable = "false";
    for (let i in this.data) {
      let li = document.createElement('li');
      li.classList.add('numbered-list-item');
      li.contentEditable = false;
      this.wrapper.appendChild(li);
      const title = document.createElement('div');
      title.classList.add('numbered-list-item_title');
      title.innerText = this.data[i].title;
      title.contentEditable = true;
      li.appendChild(title);
      const description = document.createElement('div');
      description.classList.add('numbered-list-item_description');
      description.innerHTML = this.data[i].description;
      description.contentEditable = true;
      li.appendChild(description);
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
          li.classList.add('numbered-list-item');
          li.contentEditable = false;
          this.wrapper.appendChild(li);
          const title = document.createElement('div');
          title.classList.add('numbered-list-item_title');
          title.innerText = 'Test title';
          title.contentEditable = true;
          li.appendChild(title);
          const description = document.createElement('div');
          description.classList.add('numbered-list-item_description');
          description.innerHTML = 'Passport, valid for at least 3 months after the expiration date of the requested visa. With at least two blank pages.';
          description.contentEditable = true;
          li.appendChild(description);
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
        if (records[i] instanceof HTMLElement) {
          const title = records[i].querySelector('.numbered-list-item_title')?.innerText || null;
          const description = records[i].querySelector('.numbered-list-item_description')?.innerHTML || null;
          if (title && description) {
            items.push({ title, description });
          }
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
