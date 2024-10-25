import "./global-styles.css";
import ImgText from './plugins/img-text';
import Header from './plugins/header';
import Divider from './plugins/divider';
import Note from './plugins/note';
import BulletList from './plugins/bullet-list';
import NumberedList from './plugins/numbered-list';

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
    imgText: {
      class: ImgText,
      config: {
        mediaLibToggleFunc
      }
    },
  };
  return customTools;
};

export default customToolsHandler;
