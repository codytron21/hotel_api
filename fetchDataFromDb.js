const Room = require('./models/Room');

const fetchAllRooms = async () => {
    const rooms = await Room.findAll();
    rooms.map((room) => {
        console.log(room.dataValues);
    })
}
fetchAllRooms();