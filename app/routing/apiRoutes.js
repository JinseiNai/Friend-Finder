let users = require("../data/friends.js");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(users);
    });

    app.post("/api/friends", function (req, res) {
        let newUser = req.body;

        let newUserScore = newUser.scores;

        // Set variables for friend match
        let friendName;
        let friendImage;
        // Set to high score difference to make comparison
        let totalDifference = 100;

        // Sort through the list of users array
        for (let i = 0; i < users.length; i++) {
            // Set variable for score differential
            let difference = 0;

            for (let k = 0; k < newUserScore.length; k++) {
                difference += Math.abs(parseInt(users[i].scores[k]) - parseInt(newUserScore[k]));
            }
            if (difference < totalDifference) {
                totalDifference = difference;
                friendName = users[i].name;
                friendImage = users[i].photo;
            }
        }

        // If match difference is less than totalDifference, set match
        console.log("Your match is " + friendName + " " + friendImage);

        users.push(newUser);

        res.json({status: 'Ok', friendName: friendName, friendImage: friendImage});
    })
}