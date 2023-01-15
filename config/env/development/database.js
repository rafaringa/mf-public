const verifyProduction = false;
const prefix = !verifyProduction ? 'DEV_' : '';

console.log('\x1b[36m%s\x1b[0m', '////////////////////////////////////////////////////////////////////////');
console.log('\x1b[31m%s\x1b[0m', ' DB MODO:', !verifyProduction ? 'DESENVOLVIMENTO' : 'PRODUÇÃO - ******* DB REAL *******');
console.log('\x1b[36m%s\x1b[0m', '///////////////////////////////////////////////////////////////////////');

module.exports = ({ env }) => ({
  connection: {
    client: 'mysql',
    connection: {
      host: env(`${prefix}DATABASE_HOST`),
      port: env.int(`${prefix}DATABASE_PORT`),
      database: env(`${prefix}DATABASE_NAME`),
      user: env(`${prefix}DATABASE_USERNAME`),
      password: env(`${prefix}DATABASE_PASSWORD`),
      ssl: env.bool(`${prefix}DATABASE_SSL`),
    },
    pool: {
      min: 1,
      max: 100,
    },
  },
});
