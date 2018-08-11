'use strict';
module.exports = (sequelize, DataTypes) => {
  var Link = sequelize.define('Link', {
    original: DataTypes.STRING,
    short: DataTypes.STRING
  }, {});
  Link.associate = function(models) {
    // associations can be defined here
  };
  return Link;
};