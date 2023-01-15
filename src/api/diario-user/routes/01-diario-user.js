'use strict';

module.exports = {
  routes: [
    { // Path defined with an URL parameter
      method: 'POST',
      path: '/diario-mes',
      handler: 'diario-user.findOne',
      config: {
        find: {
          auth: true
        },
        policies: []
      }
    },
  ]
}
