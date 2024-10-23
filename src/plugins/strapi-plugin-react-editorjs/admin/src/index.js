export default {
  register(app) {
    // executes as soon as the plugin is loaded
    app.customFields.register({
      name: 'EditorJS',
      type: 'richtext',
      pluginId: 'editorjs-editor',
      // icon: pluginPkg.strapi.icon,
      intlLabel: {
        id: 'ckeditor.label',
        defaultMessage: 'CKEditor'
      },
      intlDescription: {
        id:  'ckeditor.description',
        defaultMessage: 'The rich text editor for every use case'
      },
      components: {
        Input: async () => import('./components/editorjs'),
      },

    });
  },
};
