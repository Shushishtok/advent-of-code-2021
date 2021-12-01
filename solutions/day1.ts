type Solution = number | string;

export function solution(input: string): {
	result1: Solution;
	result2: Solution;
} {
	const parsedInput = input.split("\n").map((num) => parseInt(num, 10));

	// Part 1
	let currDepth;
	let result1Count = 0;
	for (const depth of parsedInput) {
		if (currDepth === undefined) {
			currDepth = depth;
			continue;
		}

		if (depth > currDepth) result1Count++;
		currDepth = depth;
	}

	// Part 2
	let currDepthSum;
	let result2Count = 0;
	for (let index = 0; index < parsedInput.length; index++) {
		// Ignore last measurements that cannot be summed
		if (index + 2 >= parsedInput.length) continue;

		const sum =
			parsedInput[index] +
			parsedInput[index + 1] +
			parsedInput[index + 2];
		if (currDepthSum === undefined) {
			currDepthSum = sum;
			continue;
		}

		if (sum > currDepthSum) result2Count++;
		currDepthSum = sum;
	}

	return { result1: result1Count, result2: result2Count };
}
