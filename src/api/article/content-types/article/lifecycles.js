module.exports = {
  async afterUpdate(event) {
    const { result } = event;
    const { ForbiddenError } = require("@strapi/utils").errors;
    try {
      // if (result.image?.url && result.seo && !result.seo.image && !result.publishedAt) {
      //   await strapi
      //     .service('api::generate-social-image.generate-social-image')
      //     .getSocialImage(result, 'ogImage', 'api::article.article');
      // }
    } catch (e) {
      console.log(e,'e');
      throw new ForbiddenError(e);
    }
  },
};