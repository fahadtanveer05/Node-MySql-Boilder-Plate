const db = require('../config/database');
const dbFunc = require('../config/db-function');
const moment = require('moment');
const bcrypt = require('bcrypt');

module.exports.searchAll = async () => {
    try {
        dbFunc.connectionRelease;

        let [users] = await db.execute(
                'SELECT * FROM Users'
            );

        return users;
    } catch (error) {
        dbFunc.connectionRelease;
        return error.message;
    }
};

module.exports.searchOne = async (id) => {
    try {
        dbFunc.connectionRelease;

        let [user] = await db.execute(
            'SELECT name, email FROM Users WHERE id = ?',
            [id]
        );

        return user;
    } catch (error) {
        dbFunc.connectionRelease;
        return error.message;
    }
};

module.exports.add = async (data) => {
    try {
        dbFunc.connectionRelease;

        data.body.password = await bcrypt.hash(data.body.password, 8);

        let [user] = await db.execute(
            'INSERT INTO Users (name, email, password)' +
                'VALUES(?, ?, ?)',
            [
                data.body.name,
                data.body.email,
                data.body.password,
            ]
        );

        // console.log(data.body);

        return user;
    } catch (error) {
        dbFunc.connectionRelease;
        return error.message;
    }
};

module.exports.update = async (data) => {
    try {
        dbFunc.connectionRelease;

        data.body.password = await bcrypt.hash(data.body.password, 8);

        let updateDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

        let [user] = await db.execute(
            'UPDATE Users ' +
                'SET name = ?, email = ?, password = ?, updatedDate = ? ' +
                'WHERE id = ?',
            [
                data.body.name,
                data.body.email,
                data.body.password,
                updateDate,
                data.params.id,
            ]
        );

        return user;
    } catch (error) {
        dbFunc.connectionRelease;
        return error.message;
    }
};

module.exports.delete = async (data) => {
    try {
        dbFunc.connectionRelease;

        let [user] = await db.execute(
            'DELETE FROM Users ' +
                'WHERE id = ?',
            [data.params.id]
        );

        return user;
    } catch (error) {
        dbFunc.connectionRelease;
        return error.message;
    }
};