export default {
  register(app) {
    // executes as soon as the plugin is loaded
    app.customFields.register({
      name: 'og-image',
      type: 'string',
      pluginId: 'og-image',
      intlLabel: {
        id: 'ogImageGenerator.label',
        defaultMessage: 'Og Image Generator'
      },
      intlDescription: {
        id:  'ogImageGenerator.description',
        defaultMessage: 'Plugin for Strapi Headless CMS, adding an og image generator'
      },
      components: {
        Input: async () =>
          import(
            /* webpackChunkName: "input-component" */ "./components/Generator"
          ),
      },
    });
  },
};
