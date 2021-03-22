exports.errorMessage = (customMessage) => {
    return {
        errors: [
            {
                success: false,
                msg: customMessage
            }
        ]
    };
};
