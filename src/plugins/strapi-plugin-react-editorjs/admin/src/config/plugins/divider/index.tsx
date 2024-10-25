import './index.css';

export default class Divider {
  constructor({api, data, config}) {

  }

  static get toolbox() {
    return {
      icon: `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 3C2 2.44772 2.44772 2 3 2L23 2C23.5523 2 24 2.44772 24 3V10C24 10.5523 23.5523 11 23 11H3C2.44771 11 2 10.5523 2 10V3Z" fill="#D9D9D9"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 13C2 12.4477 2.44772 12 3 12H23.1562C23.7085 12 24.1562 12.4477 24.1562 13C24.1562 13.5523 23.7085 14 23.1562 14H3C2.44772 14 2 13.5523 2 13Z" fill="black"/>
<path d="M2 16C2 15.4477 2.44772 15 3 15H23C23.5523 15 24 15.4477 24 16V23C24 23.5523 23.5523 24 23 24H3C2.44771 24 2 23.5523 2 23V16Z" fill="#D9D9D9"/>
</svg>
`,
      title: "Divider",
    };
  }

  render() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('divider_layout');

    const startLine = document.createElement('div');
    startLine.classList.add('divider_line');
    this.wrapper.appendChild(startLine);

    const icon = document.createElement('div');
    icon.classList.add('divider_icon');
    this.wrapper.appendChild(icon);

    const endLine = document.createElement('div');
    endLine.classList.add('divider_line');
    this.wrapper.appendChild(endLine);
    return this.wrapper;
  }

  async save() {
    return {
      'data': null
    }
  }

  static get sanitize() {
    return {
      div: true
    };
  }

}