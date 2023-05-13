const userModel = require('../model/user.model');
const response = require('../common/response');

module.exports.getAllUsers = async (req, res) => {
    try {
        let users = await userModel.searchAll();

        if (users.length === 0) {
            return response.successResponse(false, users, res);
        }

        for (let a = 0; a < users.length; a++) {
            let userData = users[a];
            delete userData.password;
        }

        response.successResponse(true, users, res);
    } catch (error) {
        response.serverFailureResponse(error.message, res);
        throw new Error(error);
    }
};

module.exports.getUserById = async (req, res) => {
    try {
        let id = req.params.id;

        let user = await userModel.searchOne(id);

        if (user.length === 0) {
            return response.badRequestResponse(
                'User with the given id does not exist',
                res
            );
        }

        response.successResponse(true, user, res);
    } catch (error) {
        response.serverFailureResponse(error.message, res);
        throw new Error(error);
    }
};

module.exports.addUser = async (req, res) => {
    try {
        let user = await userModel.add(req);

        if (user.affectedRows === 0 || !user.affectedRows) {
            return response.badRequestResponse(
                    'User did not insert',
                    // user, 
                    res
                );
        }

        response.createdResponse(res);
    } catch (error) {
        response.serverFailureResponse(error.message, res);
        throw new Error(error);
    }
};

module.exports.updateUser = async (req, res) => {
    try {
        let user = await userModel.update(req);

        if (user.affectedRows == 0 || !user.affectedRows) {
            return response.badRequestResponse(
                'User with given id does not exist',
                // user,
                res
            );
        }

        response.successResponse(true, user, res);
    } catch (error) {
        response.serverFailureResponse(error.message, res);
        throw new Error(error);
    }
};

module.exports.deleteUser = async (req, res) => {
    try {
        let user = await userModel.delete(req);

        // console.log(user.affectedRows);

        if (user.affectedRows == 0 || !user.affectedRows) {
            return response.badRequestResponse(
                'User with given id does not exist',
                res
            );
        }

        response.successResponse(true, user, res);
    } catch (error) {
        response.serverFailureResponse(error.message, res);
        throw new Error(error);
    }
};