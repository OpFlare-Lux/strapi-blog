import "./global-styles.css";
import Header from './plugins/header';
import Divider from './plugins/divider';
import Note from './plugins/note';
import BulletList from './plugins/bullet-list';
import NumberedList from './plugins/numbered-list';
import FAQ from './plugins/faq';
import Gallery from './plugins/gallery';
import CTA from './plugins/cta';
import Table from './plugins/table';
import Highlight from './plugins/highlights';

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
    },
    cta: {
      class: CTA,
      inlineToolbar: false,
      config: {
        mediaLibToggleFunc
      }
    },
    table: {
      class: Table,
      inlineToolbar: true
    },
    highlight: {
      class: Highlight,
      inlineToolbar: true,
    },
  };
  return customTools;
};

export default customToolsHandler;
