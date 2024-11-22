'use strict';

module.exports = ({ strapi }) => ({
  async getAddress(ctx) {
    console.log(process.env, "process.env");
    console.log(process.env.TEST, "TEST");
    console.log(process.env.STRAPI_ADMIN_UPLOAD_TOKEN, "STRAPI_ADMIN_UPLOAD_TOKEN");
    ctx.body = 'ok';
  },
});