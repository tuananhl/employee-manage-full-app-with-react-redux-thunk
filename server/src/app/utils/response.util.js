const responseData = (res, status, message, data = null) => {
    const responseResult = {
        status: status,
        message: message
    };
    if(data && data !== null) {
        Object.assign(responseResult, { data });
    }
    return res.status(status).send(responseResult);
}

module.exports = { responseData };