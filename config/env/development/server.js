module.exports = ({ env }) => ({
  host: '127.0.0.1',
  port: '1337',
  app: {
    keys: env.array('APP_KEYS'),
  },
  url: env('DEV_URL'),
admin: { watchIgnoreFiles : [ '**/info.log', '**/error.log', '**/db', '**/db/**', './db', './db/**', '**/pg_wall', '**/private/**'], autoOpen: false, },
});
