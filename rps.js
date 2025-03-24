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

function getHumanChoice() {
    // ask user for input, convert it to lowercase
    let userInput = prompt('Enter your choice (rock, paper, scissors): ', 'rock').toLowerCase();

    // if input equal to 'rock', 'paper', or 'scissors'
    if (userInput === 'rock' || userInput === 'paper' || userInput === 'scissors') {
        return userInput;
    }

    return null;
}

function playRound(humanChoice, computerChoice) {
    // if human played rock, check for computer choice
    if (humanChoice === 'rock') {
        switch (computerChoice) {
            case 'rock':
                console.log("Draw! Rock ties with Rock");
                return 0;
            case 'paper':
                console.log("You lose! Paper beats Rock");
                return -1;
            default:
                console.log("You win! Scissors loses to Rock");
                return 1;
        }
    }

    // if human played paper, check for computer choice
    else if (humanChoice === 'paper') {
        switch (computerChoice) {
            case 'rock':
                console.log("You win! Rock loses to Paper");
                return 1;
            case 'paper':
                console.log("Draw! Paper ties with Paper");
                return 0;
            default:
                console.log("You lose! Scissors beats Paper");
                return -1;
        }
    }

    // if human played scissors, check for computer choice
    else {
        switch (computerChoice) {
            case 'rock':
                console.log("You lose! Rock beats Scissors");
                return -1;
            case 'paper':
                console.log("You win! Paper loses to Scissors");
                return 1;
            default:
                console.log("Draw! Scissors ties with Scissors");
                return 0;
        }
    }
}

function playGame() {
    let humanScore = 0;
    let computerScore = 0;


    for (let i = 0; i < 5; i++) {
        const humanSelection = getHumanChoice() ?? 'rock';      // invalid choice defaults to rock
        const computerSelection = getComputerChoice();
        
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


playGame();