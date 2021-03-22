module.exports = (req, res, next) => {
    const error = new Error(`Your Route is in another castle - ${req.originalUrl}`);
    res.status(404);
    next(error);
};
