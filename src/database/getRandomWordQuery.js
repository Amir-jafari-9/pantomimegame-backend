module.exports = getRandomWordQuery = (category, game, level) => {
    return [
        {
            $match: {
                title: category
            }
        },
        {
            $lookup: {
                from: "games",
                localField: "games",
                foreignField: "category",
                as: "games"
            }
        },
        {
            $unwind: {
                path: "$games"
            }
        },
        {
            $unwind: {
                path: "$games.repeatedWords"
            }
        },
        {
            $match: {
                "games.name": { $eq: game }
            }
        },
        {
            $match: {
                "games.repeatedWords.title": category
            }
        },
        {
            $unwind: {
                path: "$words"
            }
        },
        { $match: { "words.level": { $eq: level } } },
        {
            $match: {
                $expr: {
                    $not: {
                        $in: ["$words._id", "$games.repeatedWords.words"]
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
