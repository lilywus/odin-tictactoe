// store players in objects
function Player(name, symbol, playernum) {
    this.name = name;
    this.symbol = symbol;
    this.playernum = playernum;
}

// gameboard object containing array (3x3)
function Gameboard() {
    let board = []
    for (let i = 0; i < 9; i++) {
        board.push(0);
    }
    this.board = board;
}

// play game!
function playGame(player1, player2) {
    let game = new Gameboard();
    drawBoard();
    let currentPlayer = player1;
    let warning = document.querySelector("#warning");
    let turnMessage = document.querySelector("#turn");
    turnMessage.textContent = "It's " + currentPlayer.name + "'s turn!";

    let boxes = document.querySelectorAll(".box");
    let position = 0;

    boxes.forEach(box => {
        box.addEventListener("click", function() {
            if (checkWin(game) == false) {
                if (box.id != -1) {
                    warning.textContent = "";
                    turnMessage.textContent = "It's " + currentPlayer.name + "'s turn!";
                    if (currentPlayer.symbol == "X") playerCritter = "toad";
                    else playerCritter = "frog";

                    box.classList.add(playerCritter);
                    game.board[box.id - 1] = currentPlayer.symbol;

                    if (checkWin(game) == true) {
                        turnMessage.textContent = currentPlayer.name + " wins!!";
                        warning.textContent = "";
                    }
                    else {
                        if (checkTie(game) == true) {
                            turnMessage.textContent = "It's a tie!";
                            warning.textContent = "";
                        }
                    }

                    box.id = -1;
                    if (currentPlayer == player1) currentPlayer = player2;
                    else currentPlayer = player1;
                }
                else {
                    warning.textContent = "Please select a new square!";
                }
            }
        });
    });
}

// draw board squares
function drawBoard() {
    let container = document.querySelector("#container");

    for (let i = 0; i < 3; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        container.appendChild(row);

        for (let j = 1; j < 4; j++) {
            const gridBox = document.createElement("div");
            gridBox.classList.add("box");
            gridBox.setAttribute("id", ((i * 3) + j));
            gridBox.style.width = (300 / 3) + "px";
            gridBox.style.height = (300 / 3) + "px";
            row.appendChild(gridBox);
        }
    }
}

// check for a win
function checkWin(game) {
    let board = game.board;

    // check rows
    for (let i = 0; i < 3; i++) {
        let start = i * 3;

        if (board[start] != 0) {
            if (board[start] == board[start + 1] && board[start + 1] == board[start + 2]) return true;   
        }
    }

    // check columns
    for (let i = 0; i < 3; i++) {
        if (board[i] != 0) {
            if (board[i] == board[i + 3] && board[i + 3] == board[i + 6]) return true;
        }
    }

    // check diagonals
    if (board[2] != 0) {
        if (board[2] == board[4] && board[4] == board[6]) return true;
    }
    if (board[0] != 0) {
        if (board[0] == board[4] && board[4] == board[8]) return true;
    }

    return false;
}

// if no win, check for a tie
function checkTie(game) {
    let board = game.board;
    let tie = true;

    for (let i = 0; i < board.length; i++) {
        if (board[i] == 0) tie = false;
    }

    return tie;
}

// take two player's names and start the game!
function playerForm() {
    let dialog = document.querySelector("#dialog");
    dialog.showModal();

    let closeButton = document.querySelector("#close");
    let formp1 = document.querySelector("#player1");
    let formp2 = document.querySelector("#player2");

    closeButton.addEventListener("click", () => {
        let player1 = new Player(formp1.value, "X", 1);
        let player2 = new Player(formp2.value, "O", 2);

        let reset = document.querySelector("#reset");
        reset.addEventListener("click", () => {
            let container = document.querySelector("#container");
            container.innerHTML = "";
            playGame(player1, player2);
        });

        playGame(player1, player2);
    });
}

playerForm();