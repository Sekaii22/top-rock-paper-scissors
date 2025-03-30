function getComputerChoice() {
    // generate a random number from 0 to 2
    let randNum = Math.random() * 3;
    // floor the random number
    randNum = Math.floor(randNum);

    // if random number equal to 0, return rock
    // if random number equal to 1, return paper
    // if random number equal to 2, return scissors
    if (randNum === 0) {
        return 'rock';
    }
    else if (randNum === 1) {
        return 'paper';
    }
    else {
        return 'scissors';
    }
}

/*
function getHumanChoice() {
    // ask user for input, convert it to lowercase
    let userInput = prompt('Enter your choice (rock, paper, scissors): ', 'rock').toLowerCase();

    // if input equal to 'rock', 'paper', or 'scissors'
    if (userInput === 'rock' || userInput === 'paper' || userInput === 'scissors') {
        return userInput;
    }

    return null;
}
*/

function playRound(humanChoice, computerChoice, eleRef) {
    // if human played rock, check for computer choice
    if (humanChoice === 'rock') {
        switch (computerChoice) {
            case 'rock':
                eleRef.textContent = "Draw! Rock ties with Rock";
                return 0;
            case 'paper':
                eleRef.textContent = "You lose! Rock loses to Paper";
                return -1;
            default:
                eleRef.textContent = "You win! Rock beats Scissors";
                return 1;
        }
    }

    // if human played paper, check for computer choice
    else if (humanChoice === 'paper') {
        switch (computerChoice) {
            case 'rock':
                eleRef.textContent = "You win! Paper beats Rock";
                return 1;
            case 'paper':
                eleRef.textContent = "Draw! Paper ties with Paper";
                return 0;
            default:
                eleRef.textContent = "You lose! Paper loses to Scissors";
                return -1;
        }
    }

    // if human played scissors, check for computer choice
    else {
        switch (computerChoice) {
            case 'rock':
                eleRef.textContent = "You lose! Scissors loses to Rock";
                return -1;
            case 'paper':
                eleRef.textContent = "You win! Scissors beats Paper";
                return 1;
            default:
                eleRef.textContent = "Draw! Scissors ties with Scissors";
                return 0;
        }
    }
}

/*
function playGame() {
    let humanScore = 0;
    let computerScore = 0;

    const humanSelection = getHumanChoice() ?? 'rock';      // invalid choice defaults to rock
    const computerSelection = getComputerChoice();

    for (let i = 0; i < 5; i++) {
        const result = playRound(humanSelection, computerSelection);
        if (result === 1)
            humanScore++;
        else if (result === -1)
            computerScore++;
    }
    console.log("Final score");
    if (humanScore > computerScore)
        console.log(`${humanScore}:${computerScore}, You Win!!`);
    else if (humanScore < computerScore)
        console.log(`${humanScore}:${computerScore}, You Lose!!`);
    else
        console.log(`${humanScore}:${computerScore}, Draw!!`);
}
*/

const choicesDiv = document.querySelector('#choices');
const resultDiv = document.querySelector('#result')
const scoreDiv = document.querySelector('#score')
let humanScore = 0;
let computerScore = 0;

choicesDiv.addEventListener('click', (e) => {
    const target = e.target
    const computerSelection = getComputerChoice();
    let result;

    // play out round
    if (target.id === 'rock') {
        result = playRound('rock', computerSelection, resultDiv);
    }
    else if (target.id === 'paper') {
        result = playRound('paper', computerSelection, resultDiv);
    }
    else {
        result = playRound('scissors', computerSelection, resultDiv);
    }

    // record score
    if (result === 1)
        humanScore++;
    else if (result === -1)
        computerScore++;
    else {
        humanScore++;
        computerScore++;
    }

    scoreDiv.textContent = `${humanScore}:${computerScore}`;

    // end game if either side's score reaches 5
    if (humanScore === 5 || computerScore === 5) {
        // fire custom game end event
        let gameEndEvent = new CustomEvent('gameend');
        choicesDiv.dispatchEvent(gameEndEvent);
    }
});

choicesDiv.addEventListener('gameend', (e) => {
    if (humanScore > computerScore)
        resultDiv.textContent = `${humanScore}:${computerScore}, You Win!!`;
    else if (humanScore < computerScore)
        resultDiv.textContent = `${humanScore}:${computerScore}, You Lose!!`;
    else
        resultDiv.textContent = `${humanScore}:${computerScore}, Draw!!`;

    // reset scores
    humanScore = 0;
    computerScore = 0;
});