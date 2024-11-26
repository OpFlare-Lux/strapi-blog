"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::article.article", ({ strapi }) => {
  return {
    async getRandom(ctx) {
      const { locale, articleId, categoryId } = ctx.request.query;
      
      let entries = await strapi.documents("api::article.article").findMany(
        {
          sort: { publishedAt: 'desc' },
          locale: locale,
          limit: 3,
          status: 'published',
          filters: {
            publishedAt: {
              $notNull: true
            },
            $and: [
                {
                    id: {
                        $not: articleId
                    },
                    category: {
                        $eq: categoryId
                    }
                }
            ]
        },
          populate: {"image": {fields: ['url']}, "category": {fields: ['name', 'slug', 'id']}},
          fields: ['title', 'slug', 'id', 'publishedAt', 'description'],
        },
      );
      if (entries.length < 3) {
        let currentIds = entries.map (el => el.id);
        currentIds.push(articleId);
        const additionalEntries = await strapi.documents("api::article.article").findMany(
            {
              sort: { publishedAt: 'desc' },
              locale: locale,
              limit: 3 - entries.length,
              status: 'published',
              filters: {
                publishedAt: {
                  $notNull: true
                },
                $and: [
                    {
                        id: {
                            $notIn: currentIds
                        },
                    }
                ]
            },
              populate: {"image": {fields: ['url']}, "category": {fields: ['name', 'slug', 'id']}},
              fields: ['title', 'slug', 'id', 'publishedAt', 'description'],
            },
        );
        entries = entries.concat(additionalEntries);
      }
    
      ctx.body = entries || [];
    },
  };
});
