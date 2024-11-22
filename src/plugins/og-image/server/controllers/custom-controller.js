'use strict';

module.exports = ({ strapi }) => ({
  async getAddress(ctx) {
    ctx.body = {'status': 'ok', 'token': process.env.STRAPI_ADMIN_UPLOAD_TOKEN};
  },
});