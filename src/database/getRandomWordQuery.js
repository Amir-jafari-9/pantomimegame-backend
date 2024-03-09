module.exports = getRandomWordQuery = (category, game, level) => {
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
                "games.title": { $eq: game }
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
        },
        {
            $sample: {
                size: 1
            }
        }
    ];
};
