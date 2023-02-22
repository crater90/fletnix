require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser');
const userRouter = require('./routers/userRouter');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//connecting to mongodb
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Successfully connected to database");
    })
    .catch((error) => {
        console.log("database connection failed. exiting now...");
        console.error(error);
    });

app.get('/', (req, res) => {
    res.json({
        name: 'kamran',
        age: '23'
    });
})

app.listen(5000, () => {
    console.log('server listening on port', 5000);
})

app.use('/api', userRouter);