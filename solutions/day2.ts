type Solution = number | string;

const enum CommandType {
	FORWARD = "forward",
	UP = "up",
	DOWN = "down",
}

export function solution(input: string): {
	result1: Solution;
	result2: Solution;
} {
	return { result1: part1(input), result2: part2(input) };
}

function part1(input: string): number {
	const parsedInput = input.split("\n");

	let depth = 0;
	let horizontalPosition = 0;

	for (const command of parsedInput) {
		const commandArr = command.split(" ");
		const commandType = commandArr[0] as CommandType;
		const commandMovement = parseInt(commandArr[1], 10);

		switch (commandType) {
			case CommandType.FORWARD:
				horizontalPosition += commandMovement;
				break;

			case CommandType.DOWN:
				depth += commandMovement;
				break;

			case CommandType.UP:
				depth -= commandMovement;
				break;
		}
	}

	return depth * horizontalPosition;
}

function part2(input: string): number {
	const parsedInput = input.split("\n");

	let depth = 0;
	let horizontalPosition = 0;
	let aim = 0;

	for (const command of parsedInput) {
		const commandArr = command.split(" ");
		const commandType = commandArr[0] as CommandType;
		const commandMovement = parseInt(commandArr[1], 10);

		switch (commandType) {
			case CommandType.FORWARD:
				horizontalPosition += commandMovement;
				depth += aim * commandMovement;
				break;

			case CommandType.DOWN:
				aim += commandMovement;
				break;

			case CommandType.UP:
				aim -= commandMovement;
				break;
		}
	}

	return depth * horizontalPosition;
}
