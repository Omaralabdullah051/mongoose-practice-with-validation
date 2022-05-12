const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const serviceHandler = require('./routeHandler/serviceHandler');
require('dotenv').config();
const port = process.env.PORT || 5000;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mhyej.mongodb.net/serviceManagement?retryWrites=true&w=majority`;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', serviceHandler);

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true },)
    .then(() => console.log('mongoose is connected'))
    .catch(err => console.log(err.message));

app.get('/', (req, res) => {
    res.send("Hello Users!");
});

//Default error handler
app.use((err, req, res, next) => {
    if (res.headerSent) {
        next(err);
    }
    else {
        res.status(500).json({ error: "There was a server side error" });
    }
})

app.listen(port, () => {
    console.log(`Listening to the port ${port}`);
})