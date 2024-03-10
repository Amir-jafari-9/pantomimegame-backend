const test = async (req, res) => {
    res.status(200).json({
        data: {
            category: "example",
            level: "2",
            word: "گرگ"
        }
    });
};
module.exports = test;
