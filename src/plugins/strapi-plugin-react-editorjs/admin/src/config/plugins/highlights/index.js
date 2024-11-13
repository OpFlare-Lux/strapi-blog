import './index.css';
import { sanitizerConfig } from "../helpers.tsx";

export default class CardCTA {
    constructor({ api, data, config }) {
        this.data = data;
        this.config = config || {};
        this.api = api;
        this.wrapper = undefined;
        this.header = data.header || '';
        this.headerPlaceholder = 'Add header';
        this.description = data.description || '';
        this.descriptionPlaceholder = 'Add description';
        this.type = {
          'main': 'highlight_header-icon_main',
          'info': 'highlight_header-icon_info',
          'tips': 'highlight_header-icon_tips',
          'warning': 'highlight_header-icon_warning',
        };
        this.layoutColor = {
            'main': 'highlight_layout-main',
            'info': 'highlight_layout-info',
            'tips': 'highlight_layout-tips',
            'warning': 'highlight_layout-warning',
        };

        this.iconType = data.iconType || 'main';
    }

    static get toolbox() {
        return {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 2H9C8.44772 2 8 2.44772 8 3V5C8 5.55228 8.44772 6 9 6H15C15.5523 6 16 5.55228 16 5V3C16 2.44772 15.5523 2 15 2Z" stroke="#666668" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8" stroke="#666668" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 11H16" stroke="#666668" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 16H16" stroke="#666668" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8 11H8.01" stroke="#666668" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8 16H8.01" stroke="#666668" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`,
            title: "Highlight",
        };
    }

    auto_grow(element) {
        element.style.minHeight = "32px";
        element.style.minHeight = (element.scrollHeight) + "px";
    }

    render() {
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('highlight_layout');
        this.wrapper.classList.add(this.layoutColor[this.iconType]);
        this.wrapper.contentEditable = "false";

        let content = document.createElement('div');
        content.classList.add('highlight_content');
        content.contentEditable = "false";
        this.wrapper.appendChild(content);

        let header = document.createElement('div');
        header.classList.add('highlight_header');
        header.contentEditable = "false";
        content.appendChild(header);
        let headerIcon = document.createElement('div');
        headerIcon.id = 'headerIcon';
        headerIcon.classList.add(this.type[this.iconType]);
        headerIcon.contentEditable = "false";
        header.appendChild(headerIcon);
        let headerText = document.createElement('input');
        headerText.classList.add('highlight_header-text');
        headerText.value = this.header;
        headerText.placeholder = this.headerPlaceholder;
        header.appendChild(headerText);

        let description = document.createElement('textarea');
        description.classList.add('highlight_description');
        description.value = this.description;
        description.placeholder = this.descriptionPlaceholder;
        description.rows = '1';
        description.style.minHeight = "32px";
        let splitAlert = this.description.split('\n');
        description.style.minHeight = 32 * splitAlert.length + 'px';
        description.addEventListener('change', (e) => {
            this.auto_grow(e.target);
        });
        content.appendChild(description);

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

    renderSettings() {
        return [
            {
                icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="4" fill="#E9E7FD"/>
                    </svg>
                    `,
                label: "Main",
                onActivate: () => {
                    this.wrapper.classList.remove(this.layoutColor[this.iconType]);
                    this.iconType = 'main';
                    this.wrapper.querySelector('#headerIcon').classList.remove(...this.wrapper.querySelector('#headerIcon').classList);
                    this.wrapper.querySelector('#headerIcon').classList.add(this.type[this.iconType]);
                    this.wrapper.classList.add(this.layoutColor[this.iconType]);
                },
                closeOnActivate: true,
                isDisabled: false
            },
            {
                icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="4" fill="#F3F3F7"/>
                    </svg>
                    `,
                label: "Info",
                onActivate: () => {
                    this.wrapper.classList.remove(this.layoutColor[this.iconType]);
                    this.iconType = 'info';
                    this.wrapper.querySelector('#headerIcon').classList.remove(...this.wrapper.querySelector('#headerIcon').classList);
                    this.wrapper.querySelector('#headerIcon').classList.add(this.type[this.iconType]);
                    this.wrapper.classList.add(this.layoutColor[this.iconType]);
                },
                closeOnActivate: true,
                isDisabled: false
            },
            {
                icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="4" fill="#FCF9C5"/>
                    </svg>
                    `,
                label: "Tips",
                onActivate: () => {
                    this.wrapper.classList.remove(this.layoutColor[this.iconType]);
                    this.iconType = 'tips';
                    this.wrapper.querySelector('#headerIcon').classList.remove(...this.wrapper.querySelector('#headerIcon').classList);
                    this.wrapper.querySelector('#headerIcon').classList.add(this.type[this.iconType]);
                    this.wrapper.classList.add(this.layoutColor[this.iconType]);
                },
                closeOnActivate: true,
                isDisabled: false
            },
            {
                icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="4" fill="#FFCCCC"/>
                    </svg>
                    `,
                label: "Warning",
                onActivate: () => {
                    this.wrapper.classList.remove(this.layoutColor[this.iconType]);
                    this.iconType = 'warning';
                    this.wrapper.querySelector('#headerIcon').classList.remove(...this.wrapper.querySelector('#headerIcon').classList);
                    this.wrapper.querySelector('#headerIcon').classList.add(this.type[this.iconType]);
                    this.wrapper.classList.add(this.layoutColor[this.iconType]);
                },
                closeOnActivate: true,
                isDisabled: false
            },
        ];
    }

    async save() {
        return {
            'header': this.wrapper.querySelector('.highlight_header-text').value,
            'description': this.wrapper.querySelector('.highlight_description').value,
            'iconType': this.iconType,
        }
    }

    static get sanitize() {
        return {
            a: {
                href: true
            },
            b: true,
            i: true,
            li: true,
            ol: true,
            div: true
        };
    }
}