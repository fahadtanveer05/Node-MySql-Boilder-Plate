module.exports.successResponse = (status, result = [], res) => {
    if (status !== false) {
        res.status(200).json({
            status: true,
            statusCode: 200,
            message: 'Success!',
            payload: result,
        });
    } else {
        res.status(200).json({
            status: false,
            statusCode: 200,
            message: 'Success!',
            payload: 'No Data Found!',
        });
    }
};

module.exports.createdResponse = (res) => {
    return res.status(201).json({
        status: true,
        statusCode: 201,
        message: 'CREATED!',
    });
}

module.exports.badRequestResponse = (result, res) => {
    return res.status(400).json({
        status: false,
        statusCode: 400,
        message: 'Bad Request!',
        error: result,
    });
};

module.exports.serverFailureResponse = (result, res) => {
    res.status(500).json({
        status: false,
        statusCode: 500,
        message: 'Internal Server Error!',
        error: result,
    });
};