let lastPaintTime = 0;
let speed = 5;
let currentDirection = {x:0,y:0};
let food = {x:10,y:10};
let snake = [
    {x:4,y:4}
];

let score = 0;
let a = 1;
let b = 19;

createSnake = (board) =>{
    snake.forEach((element, index) => {
        var htmlElement = document.createElement('div');
        htmlElement.style.gridRowStart = element.x;
        htmlElement.style.gridColumnStart= element.y;
        if(index === 0){
            htmlElement.classList.add('snakeHead');
        }
        else{
            htmlElement.classList.add('snakeBody');
        }
        board.appendChild(htmlElement);
    });
}

createFood =  (board) => {
    var htmlElement = document.createElement('div');
    htmlElement.style.gridRowStart = food.x;
    htmlElement.style.gridColumnStart= food.y;
    htmlElement.classList.add('foodBody');
    board.appendChild(htmlElement);
}

getBoard = () =>{
    let board = document.getElementById('gameboard');
    board.innerHTML="";
    return board;
}

updateSnakeBody = () => {
    for(var i = snake.length - 2 ; i >=0 ; i--){
        snake[i+1] = {...snake[i]};
    }
    snake[0].x += currentDirection.x;
    snake[0].y += currentDirection.y;
}

updateFoodLocation = () => {
    var snakeHead = snake[0];
    if(snakeHead.x == food.x && snakeHead.y == food.y){
        snake.unshift({x:snakeHead.x + currentDirection.x ,y:snakeHead.y + currentDirection.y});
        food = {x : Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random())};
        score++;
    }
}

hasCollisionHappened = () => {
     // If you bump into yourself 
     for (let i = 1; i < snake.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 20 || snake[0].x <=0 || snake[0].y >= 20 || snake[0].y <=0){
        return true;
    }
        
    return false;
}

refreshBoard = () => {
    if(hasCollisionHappened()){
        alert('Game Over! Your score is '+score+'.\nLet\'s Play again.');
        score = 0;
        currentDirection = {x:0,y:0};
        food = {x : Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random())};
        snake = [
            {x : Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random())}
        ];
    }
    // update food location
    updateFoodLocation();
    //else update snake
    updateSnakeBody();
    //clear board
    var board = getBoard();
    //place Snake
    createSnake(board);
    //place food
    createFood(board);
}

renderGame = (curentTime) =>{
    window.requestAnimationFrame(renderGame);
    if((curentTime - lastPaintTime) /1000 < (1 / speed)){
        return;
    }
    lastPaintTime = curentTime;
    refreshBoard();
}


window.requestAnimationFrame(renderGame);

window.addEventListener('keydown', e =>{
    switch (e.key) {
        case "ArrowUp":
            currentDirection.x = -1;
            currentDirection.y = 0;
            break;

        case "ArrowDown":
            currentDirection.x = 1;
            currentDirection.y = 0;
            break;

        case "ArrowLeft":
            currentDirection.x = 0;
            currentDirection.y = -1;
            break;

        case "ArrowRight":
            currentDirection.x = 0;
            currentDirection.y = 1;
            break;
        default:
            break;
    }

});

document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */ 
            currentDirection.x = 0;
            currentDirection.y = -1;
        } else {
            /* right swipe */
            currentDirection.x = 0;
            currentDirection.y = 1;
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */ 
            currentDirection.x = -1;
            currentDirection.y = 0;
        } else { 
            /* down swipe */
            currentDirection.x = 1;
            currentDirection.y = 0;
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};
