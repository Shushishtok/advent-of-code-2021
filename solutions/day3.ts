type Solution = number | string;

interface Frequency {
    [position: number]: {
        zeroCount: number;
        oneCount: number;
    };
}

enum Criteria {
    MOST_COMMON,
    LEAST_COMMON,
}

export function solution(input: string): {
    result1: Solution;
    result2: Solution;
} {
    return { result1: part1(input), result2: part2(input) };
}

function part1(input: string): number {
    const parsedInput = input.split("\n");
    const frequencies: Frequency = {};
    let binaryGamma = "";
    let binaryEpsilon = "";

    for (let positionIndex = 0; positionIndex < parsedInput[0].length; positionIndex++) {
        frequencies[positionIndex] = {
            zeroCount: 0,
            oneCount: 0,
        };

        for (const line of parsedInput) {
            const bit = line.charAt(positionIndex);

            if (bit === "0") {
                frequencies[positionIndex].zeroCount++;
            } else {
                frequencies[positionIndex].oneCount++;
            }
        }

        if (frequencies[positionIndex].zeroCount > frequencies[positionIndex].oneCount) {
            binaryGamma += "0";
            binaryEpsilon += "1";
        } else {
            binaryGamma += "1";
            binaryEpsilon += "0";
        }
    }

    const gamma = parseInt(binaryGamma, 2);
    const epsilon = parseInt(binaryEpsilon, 2);

    return gamma * epsilon;
}

function part2(input: string): number {
    const parsedInput = input.split("\n");

    const oxygenGeneratorRating = findRating(parsedInput, Criteria.MOST_COMMON);
    const co2ScrubberRating = findRating(parsedInput, Criteria.LEAST_COMMON);

    const lifeSupportRating = oxygenGeneratorRating * co2ScrubberRating;
    return lifeSupportRating;
}

function findRating(input: string[], criteria: Criteria): number {
    let binaryRating;

    let remainingRatings = [...input];
    for (let positionIndex = 0; positionIndex < input[0].length; positionIndex++) {
        remainingRatings = filterNumbers(remainingRatings, positionIndex, criteria);

        if (remainingRatings.length === 1) {
            binaryRating = remainingRatings[0];
            break;
        }
    }

    if (!binaryRating) throw new Error(`Could not find a binary rating!`);
    return parseInt(binaryRating, 2);
}

function filterNumbers(ratings: string[], position: number, criteria: Criteria): string[] {
    const frequencies = { zeroCount: 0, oneCount: 0 };

    for (const rating of ratings) {
        const bit = rating.charAt(position);
        bit === "0" ? frequencies.zeroCount++ : frequencies.oneCount++;
    }

    let criteriaBit: string;
    if (frequencies.zeroCount === frequencies.oneCount) {
        criteriaBit = criteria === Criteria.MOST_COMMON ? "1" : "0";
    } else if (frequencies.zeroCount > frequencies.oneCount) {
        criteriaBit = criteria === Criteria.MOST_COMMON ? "0" : "1";
    } else {
        criteriaBit = criteria === Criteria.MOST_COMMON ? "1" : "0";
    }

    ratings = ratings.filter((rating) => rating.charAt(position) === criteriaBit);
    return ratings;
}
