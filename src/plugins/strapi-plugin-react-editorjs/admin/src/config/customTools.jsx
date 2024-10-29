import "./global-styles.css";
import Header from './plugins/header';
import Divider from './plugins/divider';
import Note from './plugins/note';
import BulletList from './plugins/bullet-list';
import NumberedList from './plugins/numbered-list';
import FAQ from './plugins/faq';
import Gallery from './plugins/gallery';

const customToolsHandler = (mediaLibToggleFunc) => {

  const customTools = {
    header: {
      class: Header
    },
    divider: {
      class: Divider
    },
    note: {
      class: Note
    },
    bulletList: {
      class: BulletList,
      inlineToolbar: true
    },
    numberedList: {
      class: NumberedList,
      inlineToolbar: true
    },
    gallery: {
      class: Gallery,
      inlineToolbar: false,
      config: {
        mediaLibToggleFunc
      }
    },
    faq: {
      class: FAQ,
      inlineToolbar: true
    }
  };
  return customTools;
};

export default customToolsHandler;
