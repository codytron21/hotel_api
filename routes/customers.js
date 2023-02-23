const router = require("express").Router();
const Customer = require('../models/Customer');

router.get('/', async (req, res) => {
    try {
        const customers = await Customer.findAll();
        const result = []
        customers.map((customer) => {
            result.push(customer.dataValues);
        })
        res.status(200).send(result);
    } catch (err) {
        res.send = {
            status: 500,
            body: "Error: " + err
        };
    }
})

router.post('/', async (req, res) => {
    if (!req.body || !req.body.customerId) {
        return res.status(400).json({
            success: false,
            message: "Bad Request"
        })
    }
    try {
        const newCustomer = await Customer.create({
            customerId: req.body.customerId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            mobileNo: req.body.mobileNo
        })
        return res.status(201).json(newCustomer);

    }
    catch (err) {
        res.status(422).json({ message: "Invalid data!" })
    }
})

module.exports = router