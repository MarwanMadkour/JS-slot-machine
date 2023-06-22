//Deposit some money
//Determine number of lines to bet
//Collect bet amount
//Spin slot machine
//check if user won
//give user winnings
//play again

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const SYMBOLS_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter a deposit amount: ");
    const numberDepositAmount = parseFloat(depositAmount);

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log("Invalid amount, try again...");
    } else {
      return numberDepositAmount;
    }
  }
};

const getNumberOfLines = () => {
  while (true) {
    const Lines = prompt("Enter number of lines to bet on (1-3): ");
    const NumberOfLines = parseFloat(Lines);

    if (isNaN(NumberOfLines) || NumberOfLines <= 0 || NumberOfLines > 3) {
      console.log("Invalid number of lines, try again...");
    } else {
      return NumberOfLines;
    }
  }
};

const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt("Enter the bet per line: ");
    const numberBet = parseFloat(bet);

    if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
      console.log("Invalid bet, try again...");
    } else {
      return numberBet;
    }
  }
};

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }
  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const symbolReel = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      randomIndex = Math.floor(Math.random() * symbolReel.length);
      const selectedSymbol = symbolReel[randomIndex];
      reels[i].push(selectedSymbol);
      symbolReel.splice(randomIndex, 1);
    }
  }
  return reels;
};

const transpose = (reels) => {
  const rows = [];
  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};

const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

const getWinnings = (rows, bet, lines) => {
  let winnings = 0;
  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;
    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }
    if (allSame) {
      winnings += bet * SYMBOLS_VALUES[symbols[0]];
    }
  }
  return winnings;
};

const game = () => {
  let balance = deposit();
  while (true) {
    console.log("Your balance is $" + balance);
    const NumberOfLines = getNumberOfLines();
    const bet = getBet(balance, NumberOfLines);
    balance -= bet * NumberOfLines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows, bet, NumberOfLines);
    balance += winnings;
    console.log("you won $" + winnings);
    if (balance <= 0) {
      console.log("you ran out of money");
      break;
    }

    const playAgain = prompt("Play again (y/n)?");
    if (playAgain != "y") {
      break;
    }
  }
};
game();
