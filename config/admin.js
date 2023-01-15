const noIsProduction = process.env.NODE_ENV !== 'production' ? true : false;
module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  watchIgnoreFiles: ['**/db/**'],
  // url: '/painel', // Note: The administration will be accessible from the root of the domain (ex: http://yourfrontend.com/)
  //serveAdminPanel: false, // http://yourbackend.com will not serve any static admin files
  serveAdminPanel: env.bool('SHOW_ADMIN_DASHBOARD_PRODUCTION'), // http://yourbackend.com will not serve any static admin files
});

