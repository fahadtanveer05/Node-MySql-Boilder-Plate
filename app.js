const express = require('express');
const dbfunc = require('./config/db-function');

const app = express();

const userRoute = require('./routes/user.route');

dbfunc.connectionCheck
.then((data) => {
    console.log(data);
})
.catch((err) => {
    console.log(err);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/user', userRoute);

module.exports = app;