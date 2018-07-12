$(document).ready(initializeApp);

function initializeApp(){
    createBoard();
    applyHandlers();
}


function applyHandlers(){
    
    $('.square').on('click', selectPiece); 
    $('.square.light').off();
    $('.startGame').on('click',  function(){
        if(hasClicked === true){
            return;
        } else{
            repopulateChecker();
            hasClicked = true;
        }
    });
    $('.resetButton').on('click', function(){
        hasClicked = false ;
        resetGame();    
            
    });       
    
}
var hasClicked = false;
var gameStarted = false;
var selectedChecker = null;
var jumpRight = false;
var jumpLeft = false;

var possibleJumpRow = null;
var possibleJumpLeft = null;
var possibleJumpRight = null;

var possibleRowKing = null;
var possibleMoveLeftKing = null;
var possibleMoveRightKing = null; 

var possibleJumpRowKing = null;
var possibleJumpLeftKing = null;
var possibleJumpRightKing = null;

var possibleReverseRowKing= null;
var possibleReverseMoveLeftKing = null;
var possibleReverseMoveRightKing = null;

var possibleReverseJumpRowKing = null;
var possibleReverseJumpLeftKing = null;
var possibleReverseJumpRightKing = null;




var currentRow = null;
var currentColumn = null; 
var possibleRow = null;
var possibleColumn = null;
var currentPlayer = 0;
var gameBoard = [
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [2,0,2,0,2,0,2,0],
    [0,2,0,2,0,2,0,2],
    [2,0,2,0,2,0,2,0],
  ];

function switchPlayer () {

    // if current player is true, make current player a false value, change the text in the header to message

    if(currentPlayer) {
        currentPlayer = 1 - currentPlayer;
        $("h1").text("Player 2 Turn");
    } else {
        currentPlayer = 1 - currentPlayer;
        $("h1").text("Player 1 Turn");
    }
}

function createBoard(){

    //assign the alternateColor a false value

    var alternateColor = 0;

    //loop the number of rows needed, dynamically create a div with the class of row

    for ( var i = 0; i < gameBoard.length; i++) {
       var row = $('<div>').addClass('row');

       //loop the number of game squares needed per row, 

        for( var j = 0; j < gameBoard.length; j++) {

            // if alternateColor is a truthy value, create a div with the class of square and dark with a row attribute equal to the first loop index

            if(alternateColor) {
              var square = $('<div>').addClass('square dark').attr('row' , i).attr("col", j) ;

              // switch alternateColor to falsey value

              alternateColor = 1 - alternateColor;

              // append the square to the current row

              row.append(square);
            } else {

            // if falsey, create a div with the class of square and light with a row attribute equal to the first loop index

            var square = $('<div>').addClass('square light').attr('row' , i).attr("col", j) ;
            alternateColor = 1 - alternateColor;
            row.append(square);
            }
        }

        //target the class of gameArea to append the row

        $('#gameArea').append(row);

        // alternate the value of alternateColor to make the next row start with opposite color div

        alternateColor = 1 - alternateColor;
    } 
  
}

function repopulateChecker(){

        // loop through the gameBoard array
        
        for(var i = 0; i < gameBoard.length; i++){

            //loop though easch number in the inner array

            for(var j =0; j < gameBoard.length; j++){

                // if the gameBoard value at the outerloop index and innerloop index is a 1 the append a checker with the class of player1

                if(gameBoard[i][j]=== 1){
                    var checker = $('<div>').addClass('checker player1');

                    //jQuery target the div with the row attribute of the outer loop index and col attribute of inner loop index and append the checker


                $(`div[row = ${i}][col= ${j}]`).append(checker);
            } else if(gameBoard[i][j]=== 2){
            // if the gameBoard value at the outerloop index and innerloop index is a 2 the append a checker with the class of player2

                var checker = $('<div>').addClass('checker player2');
                $(`div[row = ${i}][col= ${j}]`).append(checker);
            } else if(gameBoard[i][j]=== 3){

                var king = $('<div>').addClass('checker player1 king');
                $(`div[row = ${i}][col= ${j}]`).append(king);

            } else if(gameBoard[i][j]=== 4){
                var king = $('<div>').addClass('checker player2 king');
                $(`div[row = ${i}][col= ${j}]`).append(king);

            }
            console.log(gameBoard);
        }
        // switchPlayer();
      
}
switchPlayer();
}
function resetGame() {

    // set the gameBoard to the original status

    gameBoard = [
        [0,1,0,1,0,1,0,1],
        [1,0,1,0,1,0,1,0],
        [0,1,0,1,0,1,0,1],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [2,0,2,0,2,0,2,0],
        [0,2,0,2,0,2,0,2],
        [2,0,2,0,2,0,2,0],
    ];

    // remove all the children div's (checkers) from the divs with the class of square

    $('.square').empty();

    // clear any existing highlights before checkers are repopulated
    removeHighlights();
    
    // reloop through array an assign checkers to original position

    repopulateChecker();
  
}
function getValueAtCoord(y,x){
    if(gameBoard[y]===undefined || gameBoard[y][x]===undefined){
        return false;
    } 
    return gameBoard[y][x];
    
}

function selectPiece(){
    debugger;
    // has a div has not been clicked
    //if nothing has been picked, <-----------ask for clarity
    if(!selectedChecker){
        var currentChecker = this;
        //get the numeric value of the div's row attribute that was clicked

        currentRow = parseInt($(currentChecker).attr('row'));

        //get the numeric value of the div's col attribute that was clicked

        currentColumn = parseInt($(currentChecker).attr('col'));

        //check who the current player is
             // current player is Player 1 who controls the white checkers
        if (!currentPlayer) {
            //If the selected checker is a King, enable forward and backward movement
           
            if(gameBoard[currentRow][currentColumn] === 3) {
                possibleRowKing = currentRow + 1;
                possibleMoveLeftKing = currentColumn - 1;
                possibleMoveRightKing = currentColumn + 1;  

                possibleJumpRowKing = currentRow + 2;
                possibleJumpLeftKing = currentColumn - 2;
                possibleJumpRightKing = currentColumn + 2;

                possibleReverseRowKing= currentRow - 1;
                possibleReverseMoveLeftKing = currentColumn -1;
                possibleReverseMoveRightKing = currentColumn + 1; 

                possibleReverseJumpRowKing = currentRow - 2;
                possibleReverseJumpLeftKing = currentColumn - 2;
                possibleReverseJumpRightKing = currentColumn + 2;
                        
                if ( getValueAtCoord(possibleRowKing, possibleMoveLeftKing) === 0 &&  getValueAtCoord(possibleRowKing,possibleMoveRightKing) === 2) {
                    //gameBoard[possibleRowKing][possibleMoveLeftKing] === 0
                    //gameBoard[possibleRowKing][possibleMoveRightKing] === 2

                    // highlight the square of the div to the left and the div 2 rows down and 2 columns to the right
    
                    $(`div[row = ${possibleRowKing}][col = ${possibleMoveLeftKing}]`).addClass("highLight");
                    $(`div[row = ${possibleJumpRowKing}][col = ${possibleJumpRightKing}]`).addClass("highLight");
    
                    //raise a flag that a jump to the right occurred
    
                    jumpRight = true; // <-------------------change to king jump
                }

                if ( getValueAtCoord(possibleReverseRowKing,possibleRverseMoveLeftKing) === 0 && getValueAtCoord(possibleReverseRowKing,possibleReverseMoveRightKing) === 2) {
                    $(`div[row = ${possibleReverseRowKing}][col = ${possibleReverseMoveLeftKing}]`).addClass("highLight");
                    $(`div[row = ${possibleReverseJumpRowKing}][col = ${possibleReverseJumpRightKing}]`).addClass("highLight");
                    jumpRight = true;
                }

                if ( getValueAtCoord(possibleReverseRowKing,possibleReverseMoveRightKing) === 0 && getValueAtCoord(possibleReverseRowKing,possiblReverseeMoveLeftKing) === 2) {
                    $(`div[row = ${possibleReverseRowKing}][col = ${possibleReverseMoveRightKing}]`).addClass("highLight");
                    $(`div[row = ${possibleReverseJumpRowKing}][col = ${possibleReverseJumpLeftKing}]`).addClass("highLight");
                    jumpLeft = true;
                }
    
              
                if ( getValueAtCoord(possibleRowKing,possibleMoveRightKing) === 0 && getValueAtCoord(possibleRowKing,possibleMoveLeftKing) === 2) {
                
                    // highlight the square of the div to the right and the div 2 rows down and 2 columns to the left
  
                  $(`div[row = ${possibleRowKing}][col = ${possibleMoveRightKing}]`).addClass("highLight");
                  $(`div[row = ${possibleJumpRowKing}][col = ${possibleJumpLeftKing}]`).addClass("highLight");
  
                  //raise a flag that a jump to the left occurred
  
                  jumpLeft = true;
                }

                if ( getValueAtCoord(possibleReverseRowKing,possibleReverseMoveLeftKing) === 0 && getValueAtCoord(possibleReverseRowKing,possibleReverseMoveRightKing) === 0  ) {
                    $(`div[row = ${possibleReverseRowKing}][col = ${possibleRverseMoveLeftKing}]`).addClass("highLight");
                    $(`div[row= ${possiblerverseRowKing}][col = ${possiblerverseMoveRightKing}]`).addClass("highLight");
                } 
              
      
                if  (getValueAtCoord(possibleRowKing,possibleMoveLeftKing) === 0 && getValueAtCoord(possibleRowKing,possibleMoveRightKing) === 0  ) {
                    $(`div[row = ${possibleRowKing}][col = ${possibleMoveLeftKing}]`).addClass("highLight");
                    $(`div[row= ${possibleRowKing}][col = ${possibleMoveRightKing}]`).addClass("highLight");
                } 
                
            // if the piece is not a king    
            } else {
            // current player is Player 1 who controls the white checkers

            possibleRow = currentRow + 1;
            possibleMoveLeft = currentColumn - 1;
            possibleMoveRight = currentColumn + 1; 
            possibleJumpRow = currentRow + 2;
            possibleJumpLeft = currentColumn - 2;
            possibleJumpRight = currentColumn + 2;

            // if the gameBoard array numeric value of the div on the left is 0 (empty) and the value of the div on the right is 2 (opponents piece) 

            if(gameBoard[possibleRow][possibleMoveLeft] === undefined){
                $(`div[row= ${possibleRow}][col = ${possibleMoveRight}]`).addClass("highLight");
            } else if( gameBoard[possibleRow][possibleMoveRight] === undefined){
                $(`div[row= ${possibleRow}][col = ${possibleMoveLeft}]`).addClass("highLight");
            }
            
            if ( gameBoard[possibleRow][possibleMoveLeft] === 0 && gameBoard[possibleRow][possibleMoveRight] === 2 ||gameBoard[possibleRow][possibleMoveRight] === 4) {
                //the available move is off the board
              

                // highlight the square of the div to the left and the div 2 rows down and 2 columns to the right

                $(`div[row = ${possibleRow}][col = ${possibleMoveLeft}]`).addClass("highLight");
                $(`div[row = ${possibleJumpRow}][col = ${possibleJumpRight}]`).addClass("highLight");
                //raise a flag that a jump to the right occurred

                jumpRight = true;
            }
            // if the gameBoard array numeric value of the div on the right is 0 (empty) and the value of the div on the left is 2 (opponents piece) 

            if ( gameBoard[possibleRow][possibleMoveRight] === 0 && gameBoard[possibleRow][possibleMoveLeft] === 2 || gameBoard[possibleRow][possibleMoveLeft] === 4) {
                
                  // highlight the square of the div to the right and the div 2 rows down and 2 columns to the left

                $(`div[row = ${possibleRow}][col = ${possibleMoveRight}]`).addClass("highLight");
                $(`div[row = ${possibleJumpRow}][col = ${possibleJumpLeft}]`).addClass("highLight");

                //raise a flag that a jump to the left occurred

                jumpLeft = true;
                }

           
            //if both available moves are do not contain an opponents piece then add the class of highlight to both divs
            else if ( gameBoard[possibleRow][possibleMoveLeft] === 0 && gameBoard[possibleRow][possibleMoveRight] === 0  ) {
                $(`div[row = ${possibleRow}][col = ${possibleMoveLeft}]`).addClass("highLight");
                $(`div[row= ${possibleRow}][col = ${possibleMoveRight}]`).addClass("highLight");
            } 
        }
    } else {

            // check the possible movements of the pieces from player 2's perspective (red checkers)

            possibleRow = currentRow - 1;
            possibleMoveLeft = currentColumn -1;
            possibleMoveRight = currentColumn + 1; 
            possibleJumpRow = currentRow - 2;
            possibleJumpLeft = currentColumn - 2;
            possibleJumpRight = currentColumn + 2;

            // if the gameBoard array numeric value of the div on the left is 0 (empty) and the value of the div on the right is 2 (opponents piece) 

            if ( gameBoard[possibleRow][possibleMoveLeft] === 0 && gameBoard[possibleRow][possibleMoveRight] === 1) {
                $(`div[row = ${possibleRow}][col = ${possibleMoveLeft}]`).addClass("highLight");
                $(`div[row = ${possibleJumpRow}][col = ${possibleJumpRight}]`).addClass("highLight");
                jumpRight = true;
            }

            // highlight the square of the div to the right and the div 2 rows down and 2 columns to the left    

            if ( gameBoard[possibleRow][possibleMoveRight] === 0 && gameBoard[possibleRow][possibleMoveLeft] === 1) {
                    $(`div[row = ${possibleRow}][col = ${possibleMoveRight}]`).addClass("highLight");
                    $(`div[row = ${possibleJumpRow}][col = ${possibleJumpLeft}]`).addClass("highLight");
                    jumpLeft = true;
            }
            if ( gameBoard[possibleRow][possibleMoveLeft] === 0 && gameBoard[possibleRow][possibleMoveRight] === 0  ) {
                    $(`div[row = ${possibleRow}][col = ${possibleMoveLeft}]`).addClass("highLight");
                    $(`div[row= ${possibleRow}][col = ${possibleMoveRight}]`).addClass("highLight");

            } 

        }
     
        selectedChecker = gameBoard[currentRow][currentColumn];
    } else {

        //if the next square clicked has the class of highlight

        if($(this).hasClass('highLight')){
            

            //reset the checker so another checker may be selected

            selectedChecker = null;

            //jQuery target the div with the row and col value equal to the current checkers possible moves and remove the class highLight

            removeHighlights();

            //find the numeric value of row attribute the highlighted div clicked

            var moveToRow = parseInt($(this).attr('row'));

            //find the numeric value of col attribute the highlighted div clicked

            var moveToColumn = parseInt($(this).attr('col'));

            //check which player is doing the action to determine which color checker to change the array value to repopulate the correct color

            if(!currentPlayer) {
                if( possibleRow === 7 || possibleJumpRow === 7) {
                    gameBoard[moveToRow][moveToColumn] = 3;
                    //if player 2 and the row moved to is the opponent's side then create a king
                } else {
                gameBoard[moveToRow][moveToColumn] = 1;
                }
            } else {
                if( possibleRow === 0 || possibleJumpRow === 0) {
                    gameBoard[moveToRow][moveToColumn] = 4;
                } else {
                    gameBoard[moveToRow][moveToColumn] = 2;
                }

              
            }

            
            //if a jump occured remove what the possible move would have been
            
            if (jumpLeft) {
                gameBoard[possibleRow][possibleMoveLeft]= 0;
            }  
            if(jumpRight) {
                gameBoard[possibleRow][possibleMoveRight]= 0;
            }

            //remove the checker that is currently selected 

            gameBoard[currentRow][currentColumn]= 0;

            //remove all children divs from the divs with the class of square

            $('.square').empty();
            jumpRight = false;
            jumpLeft = false;

            //reloop through the array and create cheakers at the new array values

            repopulateChecker();
        } else {

            //if the div clicked does not have the class of highLight, remove the highLight class and reset the original checker clicked, then exit function

            $(`div[row = ${possibleRow}][col = ${possibleMoveLeft}]`).removeClass("highLight");
            $(`div[row= ${possibleRow}][col = ${possibleMoveRight}]`).removeClass("highLight");
            selectedChecker =null;
            return;
        }
    }
}

function removeHighlights(){
             $(`div[row = ${possibleRow}][col = ${possibleMoveLeft}]`).removeClass("highLight");
            $(`div[row= ${possibleRow}][col = ${possibleMoveRight}]`).removeClass("highLight");
            $(`div[row = ${possibleJumpRow}][col = ${possibleJumpLeft}]`).removeClass("highLight");
            $(`div[row = ${possibleJumpRow}][col = ${possibleJumpRight}]`).removeClass("highLight");
}


