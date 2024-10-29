import './index.css';
import { sanitizerConfig } from '../helpers';

export default class CTA {
  constructor({ api, data, block, config }) {
    this.data = data;
    this.config = config || {};
    this.api = api;
    this.wrapper = undefined;
    this.header = data.header || 'Add header';
    this.body = data.body || 'Text about something';
    this.buttonName = data.buttonName || 'Add button name';
    this.link = data.link || 'https://easybiz.lu';
    this.image = data.image || null;
    this.alt = data.alt || null;
    this.caption = data.caption || null;
    this.blockAPI = block;
  }

  static get toolbox() {
    return {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="#666668" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 11C10.1046 11 11 10.1046 11 9C11 7.89543 10.1046 7 9 7C7.89543 7 7 7.89543 7 9C7 10.1046 7.89543 11 9 11Z" stroke="#666668" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M21 15L17.914 11.914C17.5389 11.5391 17.0303 11.3284 16.5 11.3284C15.9697 11.3284 15.4611 11.5391 15.086 11.914L6 21" stroke="#666668" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `,
      title: "CTA",
    };
  }

  render() {
    const currentIndex = this.api.blocks.getCurrentBlockIndex();
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('cta_layout');
    this.wrapper.contentEditable = "false";
    const emptyImage = document.createElement('img');
    emptyImage.classList.add('cta_image');
    emptyImage.src = this.image || null;
    emptyImage.alt = this.alt || null;
    emptyImage.caption = this.caption || null;
    emptyImage.addEventListener('click', async (e) => {
      if (this.config.mediaLibToggleFunc) {
        this.config.mediaLibToggleFunc( currentIndex, emptyImage, this.blockAPI );
      }
    });
    this.wrapper.appendChild(emptyImage);
    let content = document.createElement('div');
    content.classList.add('cta_content');
    content.contentEditable = "false";
    this.wrapper.appendChild(content);
    let contentBody = document.createElement('div');
    contentBody.classList.add('cta_content-body');
    contentBody.contentEditable = "false";
    content.appendChild(contentBody);

    let header = document.createElement('div');
    header.classList.add('cta_header');
    header.contentEditable = 'true';
    header.innerText = this.header;
    contentBody.appendChild(header);

    let bodyText = document.createElement('div');
    bodyText.classList.add('cta_description');
    bodyText.contentEditable = 'true';
    bodyText.innerHTML = this.body;
    contentBody.appendChild(bodyText);

    let button = document.createElement('div');
    button.contentEditable = 'true';
    button.classList.add('cta_button');
    button.innerText = this.buttonName;
    content.appendChild(button);

    let link = document.createElement('div');
    link.contentEditable = 'true';
    link.classList.add('cta_link');
    link.innerText = this.link;
    content.appendChild(link);

    this.wrapper.addEventListener('keydown', (e) => {
      e.stopPropagation();
    });

    this.wrapper.addEventListener('paste', (e) => {
      e.stopPropagation();
      e.preventDefault();

      let paste = (e.clipboardData || window.clipboardData).getData("text/html");
      if (paste.length === 0) {
        paste = (e.clipboardData || window.clipboardData).getData("text/plain");
      }
      paste = this.api.sanitizer.clean(paste || '', sanitizerConfig);

      document.execCommand("insertHTML", false, paste.trim());
    });

    return this.wrapper;
  }

  async save() {
    return {
      'header': this.wrapper.querySelector('.cta_header').innerText,
      'body': this.wrapper.querySelector('.cta_description').innerHTML,
      'buttonName': this.wrapper.querySelector('.cta_button').innerText,
      'image': this.wrapper.querySelector('.cta_image').src,
      'alt': this.wrapper.querySelector('.cta_image').getAttribute('alt'),
      'caption': this.wrapper.querySelector('.cta_image').getAttribute('caption'),
      'link': this.wrapper.querySelector('.cta_link').innerText,
    }
  }
}