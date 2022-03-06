//game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;
    winCount = localStorage.getItem('winCount') || 0;
    lossCount = localStorage.getItem('lossCount') || 0;
    winPerc = localStorage.getItem('winPerc') || 0;
    lossPerc = localStorage.getItem('lossPerc') || 0;
    numPlays = localStorage.getItem('numPlays') || 0;
   
// UI elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message'),
    win = document.querySelector('#greenwin'),
    image = document.querySelector('#placeimg'),
    winbar = document.querySelector('#winbar'),
    lossbar = document.querySelector('#lossbar');

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'btn btn-info play-again') {
        window.location.reload();


    }
});

//listen for guess
guessBtn.addEventListener('click', function(){

    let guess = parseInt(guessInput.value);

    //validate
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
        guessInput.value = '';

    }

    //check if won
    else if(guess === winningNum) {
    //game over - won
    gameOver(true, `${winningNum} is correct, YOU GOT IT! We have no special prize for you at this time, but here is a picture of a corgi:`);
    numPlays++;
    winCount++;
    winPerc = winCount*100/numPlays;
    JSON.stringify(winCount);
    JSON.stringify(winPerc);
    localStorage.setItem('winCount', winCount);
    localStorage.setItem('winPerc', winPerc);
    localStorage.setItem('numPlays', numPlays);
    winbar.style.width=`${winPerc}%`;

    } else {
    //wrong number
    guessesLeft -= 1;
    if(guessesLeft === 0){
    gameOver(false, `GAME OVER, you lost. The correct number was ${winningNum}`);
    numPlays++;
    lossCount++;
    lossPerc = lossCount*100/numPlays;
    JSON.stringify(lossCount);
    JSON.stringify(lossPerc);
    localStorage.setItem('lossCount', lossCount);
    localStorage.setItem('lossPerc', lossPerc);
    localStorage.setItem('numPlays', numPlays);
    lossbar.style.width=`${lossPerc}%`;    

    } else {
        //game continues - answer wrong
        //change border color
        guessInput.style.borderColor = 'red';

        //clear input
        guessInput.value = '';

        //tell user its the wrong number
        setMessage(`${guess} is not correct, you have ${guessesLeft} guesses left`, 'red');
    }   
}
});

//display percentage
winPerc = winCount*100/numPlays;
lossPerc = lossCount*100/numPlays;
localStorage.setItem('winPerc', winPerc);
localStorage.setItem('lossPerc', lossPerc);

winbar.style.width=`${winPerc}%`;
lossbar.style.width=`${lossPerc}%`;
 

//game over
function gameOver(won, msg) {
    let color;
   if (won === true) {
    color = 'green';
    win.className += "alert alert-success mx-5";
    image.innerHTML= '<img width ="330" height ="450" src ="images/corgi.jpg">';
   } else {
        color = 'red';
   }
    //disable input
    guessInput.disabled = true;
    //change border color
    guessInput.style.borderColor = color;
    //set text color
    message.style.color = color;
    //set message
    setMessage(msg);

    //play again
    guessBtn.value = 'Play Again';
    guessBtn.className = 'btn btn-info play-again';
    guessInput.value = '';
}

//get winning number
function getRandomNum(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
//set message
function setMessage(msg, color) {
   
    message.style.color = color;
    message.textContent = msg;
}