class Board {
    // CURRENTLY ONLY A 3 X 3
    constructor({ p1, p2 }) {
        this.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ];

        this.player1 = new Player({ name: p1.name, token: p1.token });
        this.player2 = new Player({ name: p2.name, token: p2.token });

        this.player1_goes = p1.starts;
        this.WINNING_NUMBER = 3;
        this.COLUMNS_NUM = 3;
    }

    play(x, y) {
        const currentPlayer = this.player1_goes ? this.player1 : this.player2;

        if (x < 0 || x > 2 || y < 0 || y > 2 || this.board[y][x] != null)
            return 'Invalid Move';

        this.board[y][x] = currentPlayer.Token;
        if (this.checkIfWinner()) {
            return `WE HAVE A WINNER: ${currentPlayer.Name}`;
        } else {
            this.player1_goes = !this.player1_goes;
        }
    }

    checkIfWinner() {
        // check rows
        for (var rowIndex = 0; rowIndex < this.board.length; rowIndex++) {
            var streak = 0;
            for (
                var valIndex = 1;
                valIndex < this.board[rowIndex].length;
                valIndex++
            ) {
                if (
                    this.board[rowIndex][valIndex] &&
                    this.board[rowIndex][valIndex] ==
                        this.board[rowIndex][valIndex - 1]
                )
                    streak += 1;
                else streak = 0;
            }
            if (streak == this.WINNING_NUMBER - 1) return true;
        }

        // check columns
        for (var column = 0; column < this.COLUMNS_NUM; column++) {
            var streak = 0;
            for (var rowIndex = 1; rowIndex < this.board.length; rowIndex++) {
                if (
                    this.board[rowIndex][column] &&
                    this.board[rowIndex][column] ==
                        this.board[rowIndex - 1][column]
                )
                    streak += 1;
                else streak = 0;
            }
            if (streak == this.WINNING_NUMBER - 1) return true;
        }

        // check diagonals
        // top to bottom, lef to right
        // need 3 bottom / 3 top
        let max = this.board.length - this.WINNING_NUMBER;

        for (var rowIndex = 0; rowIndex <= max; rowIndex++) {
            for (
                var colIndex = 0;
                colIndex < this.board[rowIndex].length;
                colIndex++
            ) {
                if (
                    this.board[rowIndex + colIndex][colIndex] &&
                    rowIndex + colIndex + 1 < this.COLUMNS_NUM &&
                    this.board[rowIndex + colIndex][colIndex] ==
                        this.board[rowIndex + colIndex + 1][colIndex + 1]
                )
                    streak += 1;
                else streak = 0;

                if (streak == this.WINNING_NUMBER - 1) return true;
            }
        }

        // check diagonals
        // bottom to top, left to right
        // need 3 bottom / 3 top
        let min =
            this.COLUMNS_NUM - 1 - (this.COLUMNS_NUM - this.WINNING_NUMBER);

        for (var rowIndex = this.COLUMNS_NUM - 1; rowIndex >= min; rowIndex--) {
            for (
                var colIndex = this.COLUMNS_NUM - 1;
                colIndex >= 0;
                colIndex--
            ) {
                if (
                    this.board[rowIndex - (rowIndex - colIndex)][
                        rowIndex - colIndex
                    ] &&
                    this.board[rowIndex - (rowIndex - colIndex)][
                        rowIndex - colIndex
                    ] ==
                        this.board[rowIndex - (rowIndex - colIndex) - 1][
                            rowIndex - colIndex + 1
                        ]
                )
                    streak += 1;
                else streak = 0;

                if (streak == this.WINNING_NUMBER - 1) return true;
            }
        }
    }
}

class Player {
    constructor({ name, token }) {
        this.Name = name;
        this.Token = token;
    }
}

var game = new Board({
    p1: { name: 'Nicolas', token: 'X', starts: true },
    p2: { name: 'Paige', token: 'O' },
});
