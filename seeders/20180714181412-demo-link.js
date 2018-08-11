'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Links', [{
        original: 'https://marylicanin.com/',
        short: 'mary',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        original: 'https://goranlicanin.com/',
        short: 'goran',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      }
      ], {});
  },
  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Links', null, {});
  }
};
