const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const bookingRoute = require('./routes/bookings');
const customerRoute = require('./routes/customers');
const roomRoute = require('./routes/rooms');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.use('/api/bookings', bookingRoute);
app.use('/api/customers', customerRoute);
app.use('/api/rooms', roomRoute);

var date2 = Date.parse("2023/2/22");
console.log(new Date(date2));

app.listen(process.env.PORT || 3000, () => {
    console.log("listening on Port 3000....");
});