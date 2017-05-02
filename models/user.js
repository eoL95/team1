'use strict';

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        vkId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        fbId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        login: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });

    return User;
};