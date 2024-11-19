'use strict';

const register = ( { strapi } ) => {
  strapi.customFields.register( {
    name: 'og-image',
    plugin: 'og-image',
    type: 'string'
  } )
};

module.exports = register;