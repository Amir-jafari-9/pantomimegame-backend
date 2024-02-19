const notFound = (req, res) => {
    res.status(404).json({
        message: ":( 404 page not found!",
        data: null
    });
};

module.exports = notFound;
