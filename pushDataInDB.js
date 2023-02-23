const Room = require('./models/Room');
const Customer = require('./models/Customer')
const { roomsData, customersData } = require('./dummyData')

const insertRooms = (roomInfo) => {
    const newRoom = Room.bulkCreate(
        roomInfo
    )
    // console.log("new room created!", newRoom);
}
insertRooms(roomsData);

const insertCustomers = (customerInfo) => {
    const newCustomers = Customer.bulkCreate(
        customerInfo
    )
    // console.log("new room created!", newRoom);
}
insertCustomers(customersData);

