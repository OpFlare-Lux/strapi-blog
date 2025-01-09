module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/sitemap-articles',
     handler: 'sitemap.getArticles',
     config: {
       policies: [],
     },
    },
  ],
};
