// elf wants to know what games are possible if bag contained only
// only 12 red cubes, 13 green cubes, and 14 blue cubes

// so, the bag has to have been loaded with that configuration, otherwise, it would not have been possible
// figure out which games would be possible

// read the input file
// assign each game as a key, and value is an array of objects containing outcomes
// i.e. {game1 : [[{blue: 3}, {red: 4}], [{red: 1, green: 2, blue: 6}], [{green: 2}]}
// conditional check if outcome is possible
// if it passes for each, then add the game id
// return the total

// IMPORTS
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'input.txt');

// INIT CHECK
const cubesObject = { "red": 12, "green": 13, "blue": 14 };

fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) throw err;
    // console.log(data);
    const games = {};
    const lines = data.split('\n');
    lines.forEach((line, index) => {
        // split the input string into individual color-number pairs
        const gameString = line.split(':')[1].trim();

        // split each subset within game
        const colorNumberSets = gameString.split(';');
        // console.log(colorNumberSets);


        const resultArray = colorNumberSets.map(inputString => {
            const colorNumberPairs = inputString
                .split(',')
                .map(pair => pair.trim())
                .map(pair => {
                    const [numberStr, color] = pair.split(' ');
                    const number = Number(numberStr);
                    return { [color]: number };
                });


            return colorNumberPairs;
        });
        games[index + 1] = resultArray

        // console.log(resultArray);


    })

})

// Redo cleaner version
const maxCount = { "red": 12, "green": 13, "blue": 14 };
function partOne(file) {
    const lines = fs.readFileSync(file, "utf-8").trim().split('\n');
    const booleanArray = lines.map((line, index) => {
        // i.e. (line) Game 1: 12 blue; 2 green, 13 blue, 19 red; 13 red, 3 green, 14 blue
        // splitting after colon, then splitting each semicolon combo, 
        return line
            .split(': ')[1]
            .split('; ')
            .map((set) => {
                const pulls = set.split(', ');
                // return a boolean array indicating whether each set is a valid game
                return pulls.every((pull) => {
                    // console.log(pull);
                    const [count, color] = pull.split(' ');
                    return maxCount[color] >= count
                })
            }).every((p) => p);
    });
    console.log(booleanArray.length);

    // use the reduce method
    // ternary operator, if value is equal to true, add index + 1
    const sum = booleanArray.reduce((sum, value, index) => value === true ? sum + (index + 1) : sum, 0);
    console.log(sum);
    return sum
}

// console.log(partOne(filePath));

// Find the minimum number of cubes required for each game, multiply them together and sum from each game

// Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
function partTwo(file) {
    const lines = fs.readFileSync(file, "utf-8").trim().split('\n');
    return lines.map((line) => {
        // initialize object to keep track of max counts
        const maxCount = {
            red: 0,
            green: 0,
            blue: 0
        };
        // string parsing 
        line
            .split(': ')[1]
            .split('; ')
            .forEach((set) => {
                const pulls = set.split(', ');
                // update the object
                return pulls.forEach((pull) => {
                    // splitting on number and color within pull string
                    const [count, color] = pull.split(' ');
                    if (maxCount[color] < Number(count)) {
                        maxCount[color] = Number(count)
                    }
                });
            });
        // console.log(maxCount);
        const power = 1
        for (const color in maxCount) {
            power *= maxCount[color];
        }
        return power


    }).reduce((acc, currValue) => acc + currValue, 0)

}

console.log(partTwo(filePath));