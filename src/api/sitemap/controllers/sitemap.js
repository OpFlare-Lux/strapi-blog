'use strict';

/**
 * A set of functions called "actions" for `sitemap`
 */

module.exports = {

  getArticles: async (ctx, next) => {
    try {
      const articles = await getPreparedArticles( "api::article.article" );
      const formattedArticles = getFormattedArticles(articles);
      ctx.body = { data: formattedArticles, length: formattedArticles.length };
    } catch (err) {
      ctx.body = err;
    }
  },
};

function getFormattedArticles( articles ) {
  let formatted = [];
  for (let i in articles) {
    let article = {
      'loc': `https://easybiz.lu/${articles[i].locale}/blog/${articles[i].slug}`,
      'lastmod': articles[i].updatedAt,
    };
    formatted.push(article);
  }
  return formatted;
}

async function getPreparedArticles( uid, categoryFieldName ) {
  const locales = ['en','fr'];
  let populateFilter = {};

  if (categoryFieldName) {
    populateFilter[categoryFieldName] = {
      fields: ['slug']
    };
  }

  let allArticles = [];
  for (let i in locales) {
    try {
      const entries = await strapi.documents(uid).findMany(
        {
          populate: populateFilter,
		      sort: { id: 'desc' },
          status: 'published',
          locale: locales[i],
          fields: ['locale', 'slug', 'updatedAt'],
        },
      );
      allArticles = allArticles.concat(entries);
    } catch (e) {
      console.log(e);
    }
  }
  return allArticles;
}
