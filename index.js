const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json({ message: "I'm active" })
})

app.listen(process.env.PORT || 3000, () => {
    console.log("listening....");
});