console.log('\x1b[36m%s\x1b[0m', '////////////////////////////////////////////////////////////////////////');
console.log('\x1b[31m%s\x1b[0m', ' MODO:', 'PRODUCAO - ******* DB REAL *******');
console.log('\x1b[36m%s\x1b[0m', '///////////////////////////////////////////////////////////////////////');

module.exports = ({ env }) => ({
  host: env('HOST'),
  port: env('PORT'),
  app: {
    keys: env.array('APP_KEYS'),
  },
  url: env('DOMAIN'),
admin: { watchIgnoreFiles : [ '**/info.log', '**/error.log', '**/db', '**/db/**', './db', './db/**', '**/pg_wall', '**/private/**'], autoOpen: false, },
});
