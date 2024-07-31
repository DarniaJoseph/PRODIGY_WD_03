let currentPlayer = 'X'; // Player starts first
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');

// Function to handle player click
function handlePlayerClick(cellIndex) {
    if (!gameActive || gameState[cellIndex] !== '') return;

    // Player's move
    gameState[cellIndex] = currentPlayer;
    cells[cellIndex].textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
        endGame(`${currentPlayer} wins!`);
    } else if (checkDraw()) {
        endGame('It\'s a draw!');
    } else {
        currentPlayer = 'O'; // Switch to computer's turn
        setTimeout(handleComputerMove, 500); // Delay computer move for better UX
    }
}

// Function to handle computer's move
function handleComputerMove() {
    if (!gameActive) return;

    // Simple AI: Randomly choose an empty cell
    let emptyCells = gameState.reduce((acc, currentValue, index) => {
        if (currentValue === '') {
            acc.push(index);
        }
        return acc;
    }, []);

    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    let computerMove = emptyCells[randomIndex];

    // Computer's move
    gameState[computerMove] = 'O';
    cells[computerMove].textContent = 'O';

    if (checkWin('O')) {
        endGame('Computer wins!');
    } else if (checkDraw()) {
        endGame('It\'s a draw!');
    } else {
        currentPlayer = 'X'; // Switch back to player's turn
    }
}

// Function to check for a win
function checkWin(player) {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return gameState[a] === player && gameState[b] === player && gameState[c] === player;
    });
}

// Function to check for a draw
function checkDraw() {
    return gameState.every(cell => cell !== '');
}

// Function to end the game
function endGame(message) {
    gameActive = false;
    document.getElementById('gameMessage').textContent = message;
}

// Function to reset the game
function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    document.getElementById('gameMessage').textContent = '';
    cells.forEach(cell => cell.textContent = '');
}

// Add event listeners to each cell for player clicks
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        handlePlayerClick(index);
    });
});

// Initialize game: Display current player
document.getElementById('currentPlayer').textContent = `Current player: ${currentPlayer}`;
