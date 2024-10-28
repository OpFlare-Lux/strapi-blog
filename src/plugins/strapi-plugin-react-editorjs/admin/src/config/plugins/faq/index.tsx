import './index.css';
import { sanitizerConfig } from '../helpers';

export default class FAQ {
  constructor({api, data, block}) {
    this.api = api;
    this.wrapper = undefined;
    this.items = data.items || [
      {
        'header': 'Header 2 lines max',
        'description': 'Description text in line, 6 lines maximum',
      },
      {
        'header': 'Header 2 lines max',
        'description': 'Description text in line, 6 lines maximum',
      }
    ];
    this.blockAPI = block;
  }

  static get toolbox() {
    return {
      icon: `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 4.2C8.13989 4.2 4.2 8.13989 4.2 13C4.2 17.8601 8.13989 21.8 13 21.8C17.8601 21.8 21.8 17.8601 21.8 13C21.8 8.13989 17.8601 4.2 13 4.2ZM2 13C2 6.92487 6.92487 2 13 2C19.0751 2 24 6.92487 24 13C24 19.0751 19.0751 24 13 24C6.92487 24 2 19.0751 2 13Z" fill="#0D0D0D"/>
<path d="M13 15.2C12.3925 15.2 11.9 14.7075 11.9 14.1V13C11.9 12.3925 12.3925 11.9 13 11.9C13.6075 11.9 14.1 12.3925 14.1 13V14.1C14.1 14.7075 13.6075 15.2 13 15.2Z" fill="#0D0D0D"/>
<path d="M11.35 17.95C11.35 17.0387 12.0887 16.3 13 16.3C13.9113 16.3 14.65 17.0387 14.65 17.95C14.65 18.8613 13.9113 19.6 13 19.6C12.0887 19.6 11.35 18.8613 11.35 17.95Z" fill="#0D0D0D"/>
<path d="M13.4289 8.39251C12.3762 8.34238 11.4934 8.93044 11.335 9.88084C11.2352 10.4801 10.6684 10.8849 10.0692 10.785C9.46991 10.6852 9.06509 10.1184 9.16497 9.51917C9.55657 7.16957 11.6988 6.10763 13.5336 6.195C14.4734 6.23975 15.4393 6.57709 16.1831 7.27206C16.9453 7.9843 17.4 9.00454 17.4 10.25C17.4 11.6704 16.8411 12.7238 15.8789 13.3653C14.9955 13.9542 13.9125 14.1 13 14.1C12.3925 14.1 11.9 13.6075 11.9 13C11.9 12.3925 12.3925 11.9 13 11.9C13.7375 11.9 14.3045 11.7708 14.6586 11.5347C14.9339 11.3512 15.2 11.0296 15.2 10.25C15.2 9.57046 14.9672 9.14696 14.681 8.87951C14.3763 8.59479 13.9328 8.4165 13.4289 8.39251Z" fill="#0D0D0D"/>
</svg>
`,
      title: "FAQ",
    };
  }

  render() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('faq_layout');
    this.wrapper.contentEditable = "false";

    let header = document.createElement('div');
    header.classList.add('faq_header');
    header.contentEditable = "false";
    this.wrapper.appendChild(header);

    let headerText = document.createElement('div');
    headerText.classList.add('faq_header-header_text');
    headerText.contentEditable = "false";
    headerText.innerText = 'FAQ';
    header.appendChild(headerText);

    let body = document.createElement('div');
    body.classList.add('faq_body');
    body.contentEditable = "false";
    this.wrapper.appendChild(body);

    for (let i in this.items) {
      let item = document.createElement('div');
      item.classList.add('faq_body-item');
      item.contentEditable = "false";
      body.appendChild(item);

      let itemHeader = document.createElement('div');
      itemHeader.classList.add('faq_body-item-header');
      itemHeader.contentEditable = "false";
      item.appendChild(itemHeader);

      let itemHeaderText = document.createElement('div');
      itemHeaderText.classList.add('faq_body-item-header_text');
      itemHeaderText.contentEditable = "true";
      itemHeaderText.innerText = this.items[i]['header'];
      itemHeader.appendChild(itemHeaderText);

      let itemDescription = document.createElement('div');
      itemDescription.classList.add('faq_body-item-description');
      itemDescription.contentEditable = "false";
      item.appendChild(itemDescription);

      let itemDescriptionText = document.createElement('div');
      itemDescriptionText.classList.add('faq_body-item-description-text');
      itemDescriptionText.contentEditable = "true";
      itemDescriptionText.innerHTML = this.items[i]['description'];
      itemDescription.appendChild(itemDescriptionText);

      let itemSeparator = document.createElement('div');
      itemSeparator.classList.add('faq_body-item-separator');
      itemSeparator.contentEditable = "false";
      item.appendChild(itemSeparator);
      let itemSeparatorLine = document.createElement('div');
      itemSeparatorLine.classList.add('faq_body-item-separator-line');
      itemSeparatorLine.contentEditable = "false";
      itemSeparator.appendChild(itemSeparatorLine);
    }

    this.wrapper.addEventListener('keydown', (e) => {
      e.stopPropagation();
    })

    this.wrapper.addEventListener('paste', (e) => {
      e.stopPropagation();
      e.preventDefault();

      let paste = (e.clipboardData || window.clipboardData).getData("text/plain");
      paste = this.api.sanitizer.clean(paste || '', sanitizerConfig);
      document.execCommand("insertHTML", false, paste.trim());
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
          let item = document.createElement('div');
          item.classList.add('faq_body-item');
          item.contentEditable = "false";
          this.wrapper.querySelector('.faq_body').appendChild(item);

          let itemHeader = document.createElement('div');
          itemHeader.classList.add('faq_body-item-header');
          itemHeader.contentEditable = "false";
          item.appendChild(itemHeader);

          let itemHeaderText = document.createElement('div');
          itemHeaderText.classList.add('faq_body-item-header_text');
          itemHeaderText.contentEditable = "true";
          itemHeaderText.innerText = 'Header 2 lines max';
          itemHeader.appendChild(itemHeaderText);

          let itemDescription = document.createElement('div');
          itemDescription.classList.add('faq_body-item-description');
          itemDescription.contentEditable = "false";
          item.appendChild(itemDescription);

          let itemDescriptionText = document.createElement('div');
          itemDescriptionText.classList.add('faq_body-item-description-text');
          itemDescriptionText.contentEditable = "true";
          itemDescriptionText.innerHTML = 'Description text in line, 6 lines maximum';
          itemDescription.appendChild(itemDescriptionText);

          let itemSeparator = document.createElement('div');
          itemSeparator.classList.add('faq_body-item-separator');
          itemSeparator.contentEditable = "false";
          item.appendChild(itemSeparator);
          let itemSeparatorLine = document.createElement('div');
          itemSeparatorLine.classList.add('faq_body-item-separator-line');
          itemSeparatorLine.contentEditable = "false";
          itemSeparator.appendChild(itemSeparatorLine);
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
          let items = this.wrapper.querySelector('.faq_body').childNodes;
          this.wrapper.querySelector('.faq_body').removeChild(items[items.length - 1]);
        },
        closeOnActivate: true,
        isDisabled: false
      },

    ];
  }

  async save() {
    try {
      let blocks = this.wrapper.querySelector('.faq_body').childNodes;
      let content = [];
      for (let i=0;i<blocks.length;i++) {
        content.push({
          'header': blocks[i].querySelector('.faq_body-item-header_text').innerText,
          'description': blocks[i].querySelector('.faq_body-item-description-text').innerHTML,
        });
      }

      return {
        'items': content
      };
    } catch (reason) {
      console.error(`Editor.js initialization failed because of ${reason}`)
    }
  }

  static get sanitize() {
    return {
      a: {
        href: true
      },
      b: true,
      i: true,
      div: true,
      p: true
    };
  }
}