// import Embed from '@editorjs/embed'
// import Table from '@editorjs/table'
// import List from '@editorjs/list'
// import Warning from '@editorjs/warning'
// import Code from '@editorjs/code'
// import LinkTool from '@editorjs/link'
// import Raw from '@editorjs/raw'
// import Header from '@editorjs/header'
// import Quote from '@editorjs/quote'
// import Marker from '@editorjs/marker'
// import CheckList from '@editorjs/checklist'
// import Delimiter from '@editorjs/delimiter'
// import InlineCode from '@editorjs/inline-code'

import ImgText from './plugins/img-text';

const customToolsHandler = (mediaLibToggleFunc) => {

  const customTools = {
    imgText: {
      class: ImgText,
      config: {
        mediaLibToggleFunc
      }
    }
  };
  return customTools;
};
// const customTools = {
//
//   embed: Embed,
//   table: {
//     class: Table,
//     inlineToolbar: true,
//   },
//   list: {
//     class: List,
//     inlineToolbar: true,
//   },
//   warning: {
//     class: Warning,
//     inlineToolbar: true,
//     config: {
//       titlePlaceholder: 'Title',
//       messagePlaceholder: 'Message',
//     },
//   },
//   code: Code,
//   raw: {
//     class: Raw,
//     inlineToolbar: true,
//   },
//   header: {
//     class: Header,
//     inlineToolbar: true,
//   },
//   quote: {
//     class: Quote,
//     inlineToolbar: true,
//     config: {
//       quotePlaceholder: 'Quote',
//       captionPlaceholder: 'Quote`s author',
//     },
//   },
//   marker: {
//     class: Marker,
//     inlineToolbar: true,
//   },
//   checklist: {
//     class: CheckList,
//     inlineToolbar: true,
//   },
//   delimiter: Delimiter,
//   inlineCode: InlineCode,
// }

export default customToolsHandler
