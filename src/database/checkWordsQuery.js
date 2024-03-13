module.exports = checkWords = (category, gameId, level) => {
    return [
        {
            $match: {
                category: category
            }
        },
        {
            $lookup: {
                from: "games",
                localField: "games",
                foreignField: "words",
                as: "games"
            }
        },
        {
            $unwind: {
                path: "$games"
            }
        },
        {
            $match: {
                "games._id": {
                    $eq: gameId
                }
            }
        },
        { $match: { level: { $eq: level } } },
        {
            $match: {
                $expr: {
                    $not: {
                        $in: ["$_id", "$games.repeatedWords"]
                    }
                }
            }
        }
    ];
};
