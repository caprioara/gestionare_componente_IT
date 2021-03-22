module.exports = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        success: false,
        msg: error.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack
    });
};
