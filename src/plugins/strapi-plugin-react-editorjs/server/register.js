'use strict';

const register = ( { strapi } ) => {
  strapi.customFields.register( {
    name: 'EditorJS',
    plugin: 'editorjs-editor',
    type: 'richtext'
  } )
};

module.exports = register;