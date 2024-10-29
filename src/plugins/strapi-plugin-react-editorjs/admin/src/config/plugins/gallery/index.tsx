import './index.css';

export default class Gallery {
  constructor({api, data, block, config}) {
    this.data = data;
    this.config = config || {};
    this.api = api;
    this.wrapper = undefined;
    this.images = data.images;
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
      title: "Gallery",
    };
  }

  render() {
    const currentIndex = this.api.blocks.getCurrentBlockIndex();
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('gallery_layout');
    this.wrapper.contentEditable = "false";
    const gallery = document.createElement('div');
    gallery.contentEditable = "false";
    gallery.classList.add('gallery_container');
    this.wrapper.appendChild(gallery);
    for (let i in this.images) {
      const image = document.createElement('img');
      image.classList.add('gallery_image');
      image.src = this.images[i].src;
      image.caption = this.images[i].caption;
      image.alt = this.images[i].alt;
      gallery.appendChild(image);
    }
    const emptyImage = document.createElement('img');
    emptyImage.classList.add('gallery__empty_image');
    emptyImage.addEventListener('click', async (e) => {
      if (this.config.mediaLibToggleFunc) {
        this.config.mediaLibToggleFunc( currentIndex, emptyImage, this.blockAPI );
      }
    });
    gallery.appendChild(emptyImage);
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
        label: "Add image",
        onActivate: () => {
          const currentIndex = this.api.blocks.getCurrentBlockIndex();
          const emptyImage = document.createElement('img');
          emptyImage.classList.add('gallery__empty_image');
          emptyImage.addEventListener('click', async (e) => {
            console.log(e, 'click');
            console.log(this.config.mediaLibToggleFunc, 'this.config.mediaLibToggleFunc');
            if (this.config.mediaLibToggleFunc) {
              this.config.mediaLibToggleFunc( currentIndex, emptyImage, this.blockAPI );
            }
          });
          this.wrapper.querySelector('.gallery_container').appendChild(emptyImage);
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
        label: "Delete last image",
        onActivate: () => {
          let items = this.wrapper.querySelector('.gallery_container').childNodes;
          this.wrapper.querySelector('.gallery_container').removeChild(items[items.length - 1]);
        },
        closeOnActivate: true,
        isDisabled: false
      },
    ];
  }

  async save() {
    try {
      const result = [];
      const images = this.wrapper.querySelector('.gallery_container').childNodes.forEach (el => {
        result.push({
          'src': el.getAttribute('src'),
          'caption': el.getAttribute('caption'),
          'alt': el.getAttribute('alt'),
        })
      });
      return {
        'images': result
      };
    } catch (reason) {
      console.log(`Editor.js initialization failed because of ${reason}`)
    }
  }
}