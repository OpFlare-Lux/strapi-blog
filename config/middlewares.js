module.exports = [
  'strapi::logger',
  'strapi::errors',
  // 'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'cdn.jsdelivr.net', 'https://maps.googleapis.com'],
          'connect-src': ["'self'", 'https:', 'http:', 'data:'],
          'img-src': ["'self'", 'data:', 'blob:', 'http://localhost', 'https://maps.googleapis.com', 'https://maps.gstatic.com'],
          'media-src': ["'self'", 'data:', 'blob:', 'http://localhost', 'https://maps.googleapis.com'],
        },
      },
    },
  }
];
