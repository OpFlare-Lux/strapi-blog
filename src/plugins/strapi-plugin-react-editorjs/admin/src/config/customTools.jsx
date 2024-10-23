import "./global-styles.css";
import ImgText from './plugins/img-text';

const customToolsHandler = (mediaLibToggleFunc) => {

  const customTools = {
    imgText: {
      class: ImgText,
      // inlineToolbar: true,
      config: {
        mediaLibToggleFunc
      }
    },
  };
  return customTools;
};

export default customToolsHandler;
