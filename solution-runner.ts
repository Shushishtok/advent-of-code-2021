import * as fs from "fs";

// Example usage:
// node solution-runner.js <day> <path-to-input>

const day = parseInt(process.argv[2]);
if (isNaN(day)) {
	console.error(`${day} is not a number`);
	process.exit(1);
}

const inputFile = process.argv[3] || `./data/day${day}.txt`;
let input = fs.readFileSync(inputFile).toString();
input = input.replace(/\r/g, "").trim();

const solutionFile = await import(`./solutions/day${day}.js`);
const result = solutionFile.solution(input);

console.log("Part 1: \x1b[32m%s\x1b[0m", result.result1);
console.log("Part 2: \x1b[32m%s\x1b[0m", result.result2);
