const UsergetAllResponse = {
    success: (message, data) => {
        return {
            status: 'true',
            message: message,
            data:{
            users: data
            }
        };
    },

    error: (message, error = null) => {
        return {
            status: 'error',
            message: message,
            error: error
        };
    }
};
const UserPostResponse = {
    success: (id, message) => {
        return {
            status: true,
            data: {
                id: id,
                message: message
            }
        };
    },

    error: (message, error = null) => {
        return {
            status: 'error',
            message: message,
            error: error
        };
    }
};

module.exports = UsergetAllResponse,UserPostResponse;
