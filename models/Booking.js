const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelizeConn');
const Room = require('./Room');
const Customer = require('./Customer');

const Booking = sequelize.define('bookings', {
    id: {
        type: DataTypes.STRING(20),
        primaryKey: true
    },
    checkIn: {
        type: DataTypes.DATE
    },
    checkOut: {
        type: DataTypes.DATE
    },
    cancelled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    paymentId: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
})
Booking.belongsTo(Room, {
    foreignKey: "roomId",
    targetKey: "roomId"
});
Booking.belongsTo(Customer, {
    foreignKey: "bookedBy",
    targetKey: "customerId"
});
// Booking.drop();
// Booking.sync({ alter: true });
module.exports = Booking;