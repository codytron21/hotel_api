const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelizeConn');
const Room = sequelize.define('rooms', {
    roomId: {
        type: DataTypes.STRING(30),
        allowNull: false,
        primaryKey: true
    },
    type: {
        type: DataTypes.STRING(20)
    },
    available: {
        type: DataTypes.BOOLEAN
    }
}, {
    freezeTableName: true
})
// Room.sync({ alter: true });
// Room.drop();
module.exports = Room;