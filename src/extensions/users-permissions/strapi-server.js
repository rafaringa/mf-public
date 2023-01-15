const utils = require('@strapi/utils');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { getService } = require('../users-permissions/utils');
const { sanitize } = utils;

const sanitizeUser = (user, ctx) => {
  const { auth } = ctx.state;
  const userSchema = strapi.getModel('plugin::users-permissions.user');

  return sanitize.contentAPI.output(user, userSchema, { auth });
};

const issueJWT = (payload, jwtOptions = {}) => {
  _.defaults(jwtOptions, strapi.config.get('plugin.users-permissions.jwt'));
  return jwt.sign(
      _.clone(payload.toJSON ? payload.toJSON() : payload),
      strapi.config.get('plugin.users-permissions.jwtSecret'),
      jwtOptions
  );
}

module.exports = (plugin) => {



  plugin.controllers.user.allNecessaryPlanoInfo = async (ctx) => {

    async function userInfo(ctx) {
      const provider = ctx.params.provider || 'local';
      const params = ctx.request.body;
      const { identifier } = params;

      if(!identifier){
        ctx.response.status = 401;
        ctx.send('401');
        return;
      }

      const user = await strapi.query('plugin::users-permissions.user').findOne({
        where: {
            provider,
            $or: [{ email: identifier.toLowerCase() }, { username: identifier }],
        },
    });
    if (!user) {
      ctx.response.status = 401;
      ctx.send('401');
      return;
      // throw new ValidationError('Invalid identifier or password');
    }
    if (!user.password) {
    ctx.response.status = 401;
    ctx.send('401');
    return;
    // throw new ValidationError('Invalid identifier or password');
    }

    const validPassword = await getService('user').validatePassword(
    params.password,
    user.password
    );

    if (!validPassword) {
    ctx.response.status = 401;
    ctx.send('401');
     return;
     //throw new ValidationError('Invalid identifier or password');
    }
    return { jwt: issueJWT({ id: user.id }), user: await sanitizeUser(user, ctx)};
    }
    async function planosDefault() {
      const planos = await strapi.db.query('api::planos-de-estudo.planos-de-estudo').findMany({
        select: ['*'],
        orderBy: { id: 'ASC' },
      });
      return planos;
    }
    async function planosUser() {
      const planos = await strapi.db.query('api::planos-de-estudo.planos-de-estudo').findMany({
        select: ['*'],
        orderBy: { id: 'ASC' },
      });
      return planos;
    }

    const test = await planosDefault();
    console.log(test)
    const uInfo = await userInfo(ctx);

    if(!uInfo){
      ctx.response.status = 401;
      ctx.send('401');
      return;
    }

    return ctx.send({
      jwt: uInfo.jwt,
      user: uInfo.user,
  });

    // await strapi.query('plugin::users-permissions.user').update({
    //   where: {id: ctx.state.user.id},
    //   data: {
    //     notaprivativa: ctx.request.body.notaprivativa
    //   }
    // }).then((res) => {
    //     ctx.send(res.notaprivativa);
    //   ctx.response.status = 200;
    // }).catch((err) => {
    //     ctx.send('error');
    //     ctx.response.status = 400;
    //     });
  }

  plugin.routes['content-api'].routes.push({
    method: 'POST',
    path: '/start',
    handler: 'user.allNecessaryPlanoInfo',
    config: {
      policies: [],
      prefix: '',
      middlewares: [],
    },
});

  return plugin;
};
