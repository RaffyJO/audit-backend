function createResponse(message, data = null) {
    return {
        message,
        data
    };
}

module.exports = { createResponse };
