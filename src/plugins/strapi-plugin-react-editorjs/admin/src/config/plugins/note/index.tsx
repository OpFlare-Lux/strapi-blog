import './index.css';
import { sanitizerConfig } from '../helpers';

export default class Note {
  constructor({api, data, config, block}) {
    this.title = data.title || 'NOTE:';
    this.text = data.text || 'Test';
    this.api = api;
    this.wrapper = undefined;
    this.blockAPI = block;
  }

  static get toolbox() {
    return {
      icon: null,
      title: "Note",
    };
  }

  render() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('note-container');
    this.wrapper.contentEditable = "false";
    const title = document.createElement('div');
    title.classList.add('note-title');
    title.contentEditable = "false";
    title.innerText = this.title;
    this.wrapper.appendChild(title);

    const text = document.createElement('div');
    text.classList.add('note-text');
    text.contentEditable = "true";
    text.innerText = this.text;
    text.id = 'input-text';
    this.wrapper.appendChild(text);

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

  async save() {
    try {
      return {
        'title': this.title,
        'text': this.wrapper.querySelector('#input-text')?.innerText || 'test'
      };
    } catch (reason) {
      console.log(`Editor.js initialization failed because of ${reason}`)
    }
  }
}
