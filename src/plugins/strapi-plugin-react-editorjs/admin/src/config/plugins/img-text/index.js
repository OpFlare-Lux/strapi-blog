import './index.css';
// import {getRandomId, sanitizerConfig} from '../../../utils/helpers'

export default class ImgText {
  constructor({ api, data, block, config }) {
    this.data = data;
    this.config = config || {};
    this.api = api;
    this.wrapper = undefined;
    this.header = data.header || 'Header';
    this.body = data.body || 'Body content';
    this.image = data.image;
    this.imageAlt = data.imageAlt || '';
    this.imageCaption = data.imageCaption || '';
    this.isHeaderVisible = data.isHeaderVisible;
    this.blockAPI = block;
  }

  static get toolbox() {
    return {
      icon: `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 9.1875C3 8.63522 3.44772 8.1875 4 8.1875H7C7.55228 8.1875 8 8.63522 8 9.1875C8 9.73978 7.55228 10.1875 7 10.1875H4C3.44772 10.1875 3 9.73978 3 9.1875Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 12.1875C3 11.6352 3.44772 11.1875 4 11.1875H7C7.55228 11.1875 8 11.6352 8 12.1875C8 12.7398 7.55228 13.1875 7 13.1875H4C3.44772 13.1875 3 12.7398 3 12.1875Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 15.1875C3 14.6352 3.44772 14.1875 4 14.1875H7C7.55228 14.1875 8 14.6352 8 15.1875C8 15.7398 7.55228 16.1875 7 16.1875H4C3.44772 16.1875 3 15.7398 3 15.1875Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 18.1875C3 17.6352 3.44772 17.1875 4 17.1875H7C7.55228 17.1875 8 17.6352 8 18.1875C8 18.7398 7.55228 19.1875 7 19.1875H4C3.44772 19.1875 3 18.7398 3 18.1875Z" fill="black"/>
<path d="M20.6354 6H11.1771C10.55 6 9.94852 6.24913 9.50507 6.69257C9.06163 7.13602 8.8125 7.73746 8.8125 8.36458V17.8229C8.8125 18.45 9.06163 19.0515 9.50507 19.4949C9.94852 19.9384 10.55 20.1875 11.1771 20.1875H20.6354C21.2625 20.1875 21.864 19.9384 22.3074 19.4949C22.7509 19.0515 23 18.45 23 17.8229V8.36458C23 7.73746 22.7509 7.13602 22.3074 6.69257C21.864 6.24913 21.2625 6 20.6354 6ZM11.1771 7.57639H20.6354C20.8445 7.57639 21.0449 7.65943 21.1928 7.80725C21.3406 7.95506 21.4236 8.15554 21.4236 8.36458V14.9539L18.9014 12.8021C18.5106 12.4806 18.0202 12.3048 17.5142 12.3048C17.0081 12.3048 16.5177 12.4806 16.1269 12.8021L10.3889 17.5865V8.36458C10.3889 8.15554 10.4719 7.95506 10.6197 7.80725C10.7676 7.65943 10.968 7.57639 11.1771 7.57639ZM20.6354 18.6111H11.6185L17.1358 14.0081C17.2418 13.9294 17.3703 13.8869 17.5023 13.8869C17.6344 13.8869 17.7629 13.9294 17.8689 14.0081L21.4236 17.0347V17.8229C21.4236 18.032 21.3406 18.2324 21.1928 18.3803C21.0449 18.5281 20.8445 18.6111 20.6354 18.6111Z" fill="black"/>
<path d="M12.7535 11.5174C13.4064 11.5174 13.9358 10.988 13.9358 10.3351C13.9358 9.68211 13.4064 9.15278 12.7535 9.15278C12.1005 9.15278 11.5712 9.68211 11.5712 10.3351C11.5712 10.988 12.1005 11.5174 12.7535 11.5174Z" fill="black"/>
</svg>
`,
      title: "Image with text",
    };
  }

  render() {
    console.log(this.config.mediaLibToggleFunc,"CONFIG");
    const currentIndex = this.api.blocks.getCurrentBlockIndex();
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('img-text_layout');

    let textBlock = document.createElement('div');
    textBlock.classList.add('img-text_text-block');
    this.wrapper.appendChild(textBlock);
    let header = document.createElement('div');
    header.classList.add('img-text_header');
    header.contentEditable = "true";
    header.innerText = this.header;
    if (this.isHeaderVisible === 'false') {
      header.style.cssText = 'display: none';
      header.setAttribute('is-visible', false);
    }
    textBlock.appendChild(header);
    let body = document.createElement('div');
    body.classList.add('img-text_body');
    body.contentEditable = "true";
    body.innerHTML = this.body;
    textBlock.appendChild(body);

    let imageBlock = document.createElement('div');
    imageBlock.classList.add('img-text_image');
    this.wrapper.appendChild(imageBlock);

    let imageBody = document.createElement('div');
    imageBody.classList.add('img-text_image-body');
    imageBody.innerText = this.imageCaption;
    let imageSrc = document.createElement('img');
    imageSrc.classList.add('img-text_image-src');
    imageSrc.src = this.image;
    imageSrc.alt = this.imageAlt;
    imageSrc.addEventListener('click', async (e) => {
      if (this.config.mediaLibToggleFunc) {
        this.config.mediaLibToggleFunc(currentIndex,imageSrc,this.blockAPI, 'src', imageBody);
      }
    });
    imageBlock.appendChild(imageSrc);
    imageBlock.appendChild(imageBody);

    this.wrapper.addEventListener('paste', (e) => {
      e.stopImmediatePropagation();
      e.preventDefault();
      let paste = (e.clipboardData || window.clipboardData).getData("text/html");
      if (paste.length === 0) {
        paste = (e.clipboardData || window.clipboardData).getData("text/plain");
      }
      // paste = this.api.sanitizer.clean(paste || '', sanitizerConfig);
      document.execCommand("insertHTML", false, paste.trim());
      this.blockAPI.dispatchChange();
    });

    return this.wrapper;
  }

  renderSettings() {
    const settingsWrapper = document.createElement("div");

    const buttonAdd = document.createElement("div");
    buttonAdd.innerText = 'h on';
    buttonAdd.classList.add(this.api.styles.settingsButton);
    buttonAdd.classList.add("color-btn");
    settingsWrapper.appendChild(buttonAdd);

    const buttonDelete = document.createElement("div");

    buttonDelete.innerText = 'h off';
    buttonDelete.classList.add(this.api.styles.settingsButton);
    buttonDelete.classList.add("color-btn");

    settingsWrapper.appendChild(buttonDelete);

    buttonAdd.addEventListener("click", () => {
      this.wrapper.querySelector('.img-text_header').style.cssText = 'display: flex';
      this.wrapper.querySelector('.img-text_header').setAttribute('is-visible', true);
    });

    buttonDelete.addEventListener("click", () => {
      this.wrapper.querySelector('.img-text_header').style.cssText = 'display: none';
      this.wrapper.querySelector('.img-text_header').setAttribute('is-visible', false);
    });

    return settingsWrapper;
  }

  async save() {
    try {
      let img = this.wrapper.querySelector('.img-text_image-src').src;

      return {
        'header': this.wrapper.querySelector('.img-text_header')?.innerText,
        'body': this.wrapper.querySelector('.img-text_body').innerHTML,
        'image': img,
        'imageAlt': this.wrapper.querySelector('.img-text_image-src').alt,
        'imageCaption': this.wrapper.querySelector('.img-text_image-body').innerHTML,
        'isHeaderVisible': this.wrapper.querySelector('.img-text_header').getAttribute('is-visible')
      };
    } catch (reason) {
      console.log(`Editor.js initialization failed because of ${reason}`)
    }
  }
}