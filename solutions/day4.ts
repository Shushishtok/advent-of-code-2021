type Solution = number | string;

const boardSize = 5;

// BOARD PROPERTIES
type Board = BoardLine[];
type BoardLine = BoardNumber[];

interface BoardNumber {
    number: number;
    marked: boolean;
}

const boardMap: Map<Board, boolean> = new Map();

enum WinningBoard {
    FIRST,
    LAST,
}

export function solution(input: string): {
    result1: Solution;
    result2: Solution;
} {
    return { result1: part1(input), result2: part2(input) };
}

function part1(input: string): number {
    let parsedInput = input.split("\n");
    parsedInput = removeEmptyLines(parsedInput);

    const generatedNumbers = transformToNumbers(parsedInput.shift()?.split(",")!);
    const boards: Board[] = generateBoards(parsedInput);

    let winningBoard;
    let winningNumber;
    for (const generatedNumber of generatedNumbers) {
        winningBoard = markNumber(generatedNumber, boards, WinningBoard.FIRST);
        if (winningBoard) {
            winningNumber = generatedNumber;
            break;
        }
    }

    if (!winningBoard || !winningNumber) throw Error(`No board won or winning number is missing, check again!`);

    const score = calculateScore(winningBoard, winningNumber);
    return score;
}

function part2(input: string): number {
    let parsedInput = input.split("\n");
    parsedInput = removeEmptyLines(parsedInput);

    const generatedNumbers = transformToNumbers(parsedInput.shift()?.split(",")!);
    const boards: Board[] = generateBoards(parsedInput);

    let winningBoard;
    let winningNumber;
    for (const generatedNumber of generatedNumbers) {
        const newWinningBoard = markNumber(generatedNumber, boards, WinningBoard.LAST);
        if (newWinningBoard) {
            winningBoard = newWinningBoard;
            winningNumber = generatedNumber;
        }
    }

    if (!winningBoard || !winningNumber) throw Error(`No board won or winning number is missing, check again!`);

    const score = calculateScore(winningBoard, winningNumber);
    return score;
}

//////////////////////
// HELPER FUNCTIONS //
//////////////////////

function removeEmptyLines(input: string[]) {
    return input.filter((line) => line.trim() !== "");
}

function transformToNumbers(numbers: string[]) {
    const cleanedNumbers = numbers.filter((number) => number !== "");
    return cleanedNumbers.map((number) => parseInt(number));
}

function generateBoards(parsedInput: string[]) {
    const boards = [];

    while (parsedInput.length > 0) {
        let board: Board = [];
        for (let index = 0; index < boardSize; index++) {
            const line = parsedInput.shift()?.split(" ");
            if (!line) throw new Error("There was an empty line being parsed! Check your code or input");

            const numberedLine = transformToNumbers(line);
            const boardLine: BoardLine = [];
            for (let index = 0; index < numberedLine.length; index++) {
                const number = numberedLine[index];
                boardLine.push({ number, marked: false });
            }

            board.push(boardLine);
        }

        boards.push(board);
        boardMap.set(board, false);
    }

    return boards;
}

function markNumber(numberToMark: number, boards: Board[], winningBoardType: WinningBoard): Board | undefined {
    let lastWinningBoard;
    for (const board of boards) {
        const winningBoard = boardMap.get(board);
        if (winningBoard === true) {
            continue;
        }

        let boardMarked = false;
        for (const boardLine of board) {
            for (const boardNumber of boardLine) {
                if (boardNumber.number === numberToMark) {
                    boardNumber.marked = true;
                    boardMarked = true;
                }
            }
        }

        if (boardMarked) {
            if (checkWinningBoard(board)) {
                if (winningBoardType === WinningBoard.FIRST) {
                    return board;
                } else {
                    lastWinningBoard = board;
                    boardMap.set(board, true);
                }
            }
        }
    }

    return lastWinningBoard;
}

// Not really needed for solution, but nice to have for debugging
function printBoards(boards: Board[]) {
    for (const board of boards) {
        for (const boardLine of board) {
            for (const boardNumber of boardLine) {
                console.log(boardNumber);
            }
        }
    }
}

function checkWinningBoard(board: Board): boolean {
    // Check lines
    for (const boardLine of board) {
        if (checkWinningLine(boardLine)) return true;
    }

    // Check columns
    for (let index = 0; index < boardSize; index++) {
        if (checkWinningColumn(index, board)) return true;
    }

    return false;
}

function checkWinningLine(boardLine: BoardLine) {
    let winningLine = true;
    for (const boardNumber of boardLine) {
        if (!boardNumber.marked) winningLine = false;
    }

    return winningLine;
}

function checkWinningColumn(index: number, board: Board) {
    let winningColumn = true;
    for (const boardLine of board) {
        if (!boardLine[index].marked) winningColumn = false;
    }

    return winningColumn;
}

function calculateScore(board: Board, winningNumber: number) {
    let sumOfUnmarkedNumbers = 0;
    for (const boardLine of board) {
        for (const boardNumber of boardLine) {
            if (!boardNumber.marked) {
                sumOfUnmarkedNumbers += boardNumber.number;
            }
        }
    }

    return sumOfUnmarkedNumbers * winningNumber;
}
