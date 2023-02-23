const { DataTypes, Model } = require('sequelize');
const sequelize = require('../utils/sequelizeConn');
const Customer = sequelize.define('customers', {
    customerId: {
        type: DataTypes.STRING(20),
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING(30)
    },
    lastName: {
        type: DataTypes.STRING(30)
    },
    address: {
        type: DataTypes.STRING
    },
    mobileNo: {
        type: DataTypes.STRING(13)
    }
}, {
    freezeTableName: true
})
// Customer.sync({ alter: true });
// Customer.drop();
module.exports = Customer;