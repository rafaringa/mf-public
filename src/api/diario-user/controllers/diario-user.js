'use strict';
const sub = require('date-fns/sub');
const lastDayOfMonth = require('date-fns/lastDayOfMonth');
const startOfMonth = require('date-fns/startOfMonth');
const isValid = require('date-fns/isValid');

/**
 * diario-user controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::diario-user.diario-user', ({ strapi }) =>  ({
  async find(ctx) {
    const userId = ctx.state.user.id;
    const mesAnterior = sub(new Date(), {
      months: 1,
    });

    if(userId){
    const entries = await strapi.db.query('api::diario-user.diario-user').findMany({
      select: ['*'],
      where: {
        $and: [
          {
             userId: userId,
          },
          {
            date: { $gte: startOfMonth(mesAnterior) },
          },
              ]
    },
      orderBy: { date: 'DESC' },
    });
    return entries;
  }
  return 403;

  },
  async findOne(ctx) {

    const userId = ctx.state.user.id;
    const { mes, ano } = ctx.request.query;

    const ultimoDiaMes = lastDayOfMonth(new Date(ano, mes-1, 15));

    const mesAnterior = sub(new Date(ano, mes-1, 15), {
      months: 1,
    });

    if(!isValid(ultimoDiaMes) || mes > 12 || mes < 1 || ano < 2022){
      ctx.status = 400;
      return 400;
    }

    const primeiroDiaMesAnterior = startOfMonth(mesAnterior);

    if(userId){
    const entries = await strapi.db.query('api::diario-user.diario-user').findMany({
      select: ['*'],
      where: {
        $and: [
          {
             userId: userId,
          },
          {
            date: { $between: [primeiroDiaMesAnterior, ultimoDiaMes], },
          },
              ]
    },
      orderBy: { date: 'DESC' },
    });
    ctx.status = 200;
    ctx.body = entries;
    return entries;
  }

  return 403;

  },

}));
