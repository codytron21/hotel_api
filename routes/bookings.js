const router = require("express").Router();
const Booking = require("../models/Booking");
const Customer = require("../models/Customer");
const Room = require("../models/Room");


// all booking done by a customer:
router.get("/:id", async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({
            success: false,
            message: 'Invalid request please mention customer id'
        })
    }
    try {
        const isCustomer = await Customer.findByPk(req.params.id);
        await isCustomer.save();
        if (!isCustomer) return res.status(422).json({ message: `No customer found! with id ${req.params.id}` });

        const bookings = await Booking.findAll({ where: { 'bookedBy': req.params.id } });
        if (!bookings) return res.status(404).json({ message: `No booking found for ${req.params.id}` })
        res.status(200).json(bookings);
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//make a booking
router.post("/", async (req, res) => {
    if (!req.body || !req.body.roomId) {
        return res.status(400).json({
            success: false,
            error: 'No booking info sent. Please send Booking details',
        });
    }
    try {
        const isRoom = await Room.findByPk(req.body.roomId);
        const isCustomer = await Customer.findByPk(req.body.bookedBy);
        let newBooking;
        const checkIn = new Date(Date.parse(req.body.checkIn));
        const checkOut = new Date(Date.parse(req.body.checkOut));
        if (isRoom && isCustomer && isRoom.available) {
            newBooking = await Booking.create({
                id: req.body.id,
                checkIn,
                checkOut,
                bookedBy: req.body.bookedBy,
                roomId: req.body.roomId
            });
            isRoom.available = false;
            isRoom.save();
            res.status(201).json({
                success: true,
                ...newBooking.dataValues
            })
        }
        else {
            res.status(422).json({
                success: false,
                message: "Invalid Data!"
            })
        }

    }
    catch (err) {
        res.send = {
            status: 500,
            body: "Error " + err
        }
    }
})

// cancel a booking
router.patch("/cancel", async (req, res) => {
    if (!req.body || !req.body.id) {
        return res.status(400).json({
            success: false,
            message: 'Invalid request !'
        })
    }
    try {
        const cancelBooking = await Booking.findByPk(req.body.id);
        const room = await Room.findByPk(cancelBooking.roomId);
        room.available = true;
        await room.save()
        cancelBooking.cancelled = true;
        await cancelBooking.save();

        res.status(200).json({ message: 'Your booking has been cancelled' });
    }
    catch (err) {
        res.status(404)
    }
})

//reschedule booking
router.patch("/reschedule", async (req, res) => {
    if (!req.body || !req.body.id) {
        return res.status(400).json({
            success: false,
            message: 'Invalid request !'
        })
    }
    try {
        const rescheduleBooking = await Booking.findByPk(req.body.id);
        if (!rescheduleBooking.cancelled) {
            rescheduleBooking.date = new Date(req.body.date);
            rescheduleBooking.save();
            res.status(200).json({ message: "Your booking is rescheduled!" });
        }
        return res.status(404).json({ message: "Can't reschedule a cancelled booking." })
    }
    catch (err) {
        res.status(404)
    }
})

module.exports = router;