module.exports = ({ env }) => ({
  host: env('HOST'),
  port: env('PORT'),
  app: {
    keys: env.array('APP_KEYS'),
  },
  url: env('DOMAIN'),
admin: { watchIgnoreFiles : [ '**/info.log', '**/error.log', '**/db', '**/db/**', './db', './db/**', '**/pg_wall', '**/private/**'], autoOpen: false, },
});
