const router = require("express").Router();
const Room = require('../models/Room');


//get available rooms
router.get('/', async (req, res) => {
    try {
        const rooms = await Room.findAll();
        const result = [];
        rooms.map((room) => {
            if (room.dataValues.available)
                result.push(room.dataValues);
        })
        res.status(200).send(result);
    } catch (err) {
        res.send = {
            status: 500,
            body: "Error: " + err
        };
    }
});


module.exports = router