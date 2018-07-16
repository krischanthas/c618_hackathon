$(document).ready(initializeApp);

function initializeApp(){
    createBoard();
    applyHandlers();
}

function applyHandlers(){
    
    $('.square').on('click', selectPiece); 
    //turn off click handler on right pieces
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

var jumpRightOccurred = false;
var jumpLeftOccurred = false;
var jumpRow = null;
var jumpLeft = null;
var jumpRight = null;
var jumpIsValid = false;
var specialJump = false;

var player1Score = 0;
var player2Score = 0;

var currentRow = null;
var currentColumn = null; 
var moveRow = null;
var moveColumn = null;
var moveLeft = null;
var moveRight = null;

var currentPlayer = 0;
var friendlyChecker = null;
var friendlyKing = null;
var enemyChecker = null;
var enemyKing = null;
var nearBoardEdge = false;

var moveToRow = null;
var moveToColumn = null;

var rowKing = null;
var moveLeftKing = null;
var moveRightKing = null; 

var jumpRowKing = null;
var jumpLeftKing = null;
var jumpRightKing = null;

var reverseRowKing= null;
var reverseMoveLeftKing = null;
var reverseMoveRightKing = null;

var reverseJumpRowKing = null;
var reverseJumpLeftKing = null;
var reverseJumpRightKing = null;
var reverseSpecialJump = false;

var reverseJumpLeftOccurred = false;
var reverseJumpRightOccurred = false;


var gameBoard = [
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [0,0,0,0,0,0,0,0],
    [0,0,0,1,0,0,0,0],
    [2,0,2,0,2,0,2,0],
    [0,1,0,2,0,0,0,2],
    [2,0,2,0,2,0,2,0],
  ];

 function checkForWinner() {
    if (player1Score === 12) {
        $('h1').text('Player 1 Wins').addClass('rainbowText');
    } else if (player2Score === 12) {
        $('h1').text('Player 2 Wins').addClass('rainbowText');
    }
 }


function switchPlayer () {
    // if current player is true, make current player a false value, change the text in the header to message
    if(currentPlayer) {
        currentPlayer = 1 - currentPlayer;
        $("h1").text("Player 2 Turn");
    } else {
        currentPlayer = 1 - currentPlayer;
        $("h1").text("Player 1 Turn");
    }
    checkForWinner();
}

// create a function that turns off the ability to click on the opponent's checkers
function deselectOpponentCheckers(){
    if (currentPlayer) {
        $('.player2').off();
    } else {
        $('.player1').off();
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
        $('#checkerBoard').append(row);
        // alternate the value of alternateColor to make the next row start with opposite color div
        alternateColor = 1 - alternateColor;
    } 
}

function releaseTheKing( player ) {
    if (player === 1) {
        moveRow = currentRow - 1;
        moveLeft = currentColumn - 1;
        moveRight = currentColumn + 1; 
        jumpRow = currentRow - 2;
        jumpLeft = currentColumn - 2;
        jumpRight = currentColumn + 2;

        friendlyChecker = 1;
        friendlyKing = 3;
        enemyChecker = 2;
        enemyKing = 4;
        return;
    } else if( player === 0) {
        moveRow = currentRow + 1;
        moveLeft = currentColumn - 1;
        moveRight = currentColumn + 1; 
        jumpRow = currentRow + 2;
        jumpLeft = currentColumn - 2;
        jumpRight = currentColumn + 2;

        friendlyChecker = 2;
        friendlyKing = 4;
        enemyChecker = 1;
        enemyKing = 3;
    }   
// for future reference this should be a function containing the contionals for a king    
normalMovements();
}

function directionOfPlayerMovements( player , checkerType ) {
    if (player === 1 && checkerType === 1) {
        // current player is Player 1 who controls the white checkers
        moveRow = currentRow + 1;
        moveLeft = currentColumn - 1;
        moveRight = currentColumn + 1; 
        jumpRow = currentRow + 2;
        jumpLeft = currentColumn - 2;
        jumpRight = currentColumn + 2;
        friendlyChecker = 1;
        friendlyKing = 3;
        enemyChecker = 2;
        enemyKing = 4;
        return;
    } else if (player === 1 && checkerType === 3) {
        moveRow = currentRow + 1;
        moveLeft = currentColumn - 1;
        moveRight = currentColumn + 1; 
        jumpRow = currentRow + 2;
        jumpLeft = currentColumn - 2;
        jumpRight = currentColumn + 2;
        reverseRowKing= currentRow - 1;
        reverseMoveLeftKing = currentColumn -1;
        reverseMoveRightKing = currentColumn + 1; 
        reverseJumpRowKing = currentRow - 2;
        reverseJumpLeftKing = currentColumn - 2;
        reverseJumpRightKing = currentColumn + 2;
        friendlyChecker = 1;
        friendlyKing = 3;
        enemyChecker = 2;
        enemyKing = 4;
        return;

    } else if(player === 0 && checkerType === 2) {
        moveRow = currentRow - 1;
        moveLeft = currentColumn -1;
        moveRight = currentColumn + 1; 
        jumpRow = currentRow - 2;
        jumpLeft = currentColumn - 2;
        jumpRight = currentColumn + 2;
        friendlyChecker = 2;
        friendlyKing = 4;
        enemyChecker = 1;
        enemyKing = 4;
    } else if(player === 0 && checkerType === 4) {
        moveRow = currentRow - 1;
        moveLeft = currentColumn + 1;
        moveRight = currentColumn - 1; 
        jumpRow = currentRow - 2;
        jumpLeft = currentColumn + 2;
        jumpRight = currentColumn - 2;
        reverseRowKing= currentRow +1;
        reverseMoveLeftKing = currentColumn +1;
        reverseMoveRightKing = currentColumn - 1; 
        reverseJumpRowKing = currentRow + 2;
        reverseJumpLeftKing = currentColumn + 2;
        reverseJumpRightKing = currentColumn - 2;
        friendlyChecker = 2;
        friendlyKing = 4;
        enemyChecker = 1;
        enemyKing = 3;
    }
}

function checkBoardEdge() {
    //if the possible move left is empty and right is off the board
    if ( gameBoard[moveRow][moveLeft] === 0 && gameBoard[moveRight] === undefined) {
        $(`div[row = ${moveRow}][col = ${moveLeft}]`).addClass("highLight");   
        return;
    }
    // if the possible move left is an opponent and right is off the table and the jump left is not open
    if ( gameBoard[moveRow][moveLeft] === enemyChecker && gameBoard[moveRight] === undefined && gameBoard[jumpRow][jumpLeft] !== 0) {
        selectedChecker = null;
        return;
    }
    // if the possible move left is an opponent and right is off the table
    if ( gameBoard[moveRow][moveLeft] === enemyChecker && gameBoard[moveRight] === undefined) {
        $(`div[row = ${jumpRow}][col = ${jumpLeft}]`).addClass("highLight");
        jumpLeftOccurred = true;
        return;
    }
    // if the possible move left is off the table and right is open
    if ( gameBoard[moveLeft] === undefined && gameBoard[moveRow][moveRight] === 0) {
        $(`div[row = ${moveRow}][col = ${moveRight}]`).addClass("highLight"); 
        return;  
    } 
    // if the possible move left is off the table and right is an enemy checker and the jump is not open
    if ( gameBoard[moveLeft] === undefined && gameBoard[moveRow][moveRight] === enemyChecker && gameBoard[jumpRow][jumpRight] !== 0) {
        selectedChecker = null;
        return;
    }
    //if move left is off the board edge and move jump right is an open
    if(gameBoard[moveLeft] === undefined && gameBoard[jumpRow][jumpRight] === 0) {
        $(`div[row = ${jumpRow}][col = ${jumpRight}]`).addClass("highLight");
        jumpRightOccurred = true;
        return;
    }
    //if the move is off the board edge and move jump left is an enemychecker
    if(gameBoard[jumpRow][jumpLeft] === enemyChecker && gameBoard[jumpRow][jumpRight] === undefined) {
        selectedChecker = null;
        return;
    }
}

function checkIfJumpIsValid(){
    debugger;
    // if the possible jump left is an opponent's piece and the move right is open
    if(gameBoard[jumpRow][jumpLeft] === enemyChecker && gameBoard[moveRow][moveRight] === 0) {
        $(`div[row = ${moveRow}][col = ${moveRight}]`).addClass("highLight");   
    } else {
        jumpIsValid = true;
    }
    // if the possible jump right is an opponent's piece ad the move left is open
    if(gameBoard[moveRow][moveLeft] === 0 && gameBoard[moveRow][moveRight] === enemyChecker) {
        $(`div[row = ${moveRow}][col = ${moveRight}]`).addClass("highLight");   
    } else {
        jumpIsValid = true;
    }
    // if the possible jump left is off the table edge and the move right is open
    if(gameBoard[jumpRow][jumpLeft] === undefined && gameBoard[moveRow][moveRight] === 0) {
        $(`div[row = ${moveRow}][col = ${moveRight}]`).addClass("highLight");   
    } 
    // if the possibel jump right is off the table edge and the move left is open
    if(gameBoard[jumpRow][moveLeft] === undefined && gameBoard[moveRow][moveRight] === 0) {
        $(`div[row = ${moveRow}][col = ${moveRight}]`).addClass("highLight");   
    }
    //if the possible jump left and jump right are occupied
    if(gameBoard[jumpRow][jumpLeft] === enemyChecker && gameBoard[jumpRow][jumpRight] === enemyChecker) {
    }
}

function incrementScore () {
    debugger;
    if(currentPlayer) {
        if (specialJump) {
            whichJumpOccurred(gameBoard[moveToRow][moveToColumn]);
        } 
        if (jumpLeftOccurred) {
            gameBoard[moveRow][moveLeft]= 0;
            player1Score++;
        } 
        if(jumpRightOccurred) {
            gameBoard[moveRow][moveRight]= 0;
            player1Score++;
        }
} else {
    if (specialJump) {
        whichJumpOccurred(gameBoard[moveToRow][moveToColumn]);
    } 
    if (jumpLeftOccurred) {
        gameBoard[moveRow][moveLeft]= 0;
        player2Score++;
    } else if(jumpRightOccurred) {
        gameBoard[moveRow][moveRight]= 0;
        player2Score++;
    }
}
}

function whichJumpOccurred( squareChosen ){
    debugger;
    if (squareChosen === gameBoard[jumpRow][jumpLeft]){
        jumpLeftOccurred=true;
    } else if( squareChosen === gameBoard[jumpRow][jumpRight]){
        jumpRightOccurred=true;
    }
}



function normalMovements() {
    debugger;
      //if both available moves are do not contain an opponents piece then add the class of highlight to both divs
    if ( gameBoard[moveRow][moveLeft] === 0 && gameBoard[moveRow][moveRight] === 0  ) {
        $(`div[row = ${moveRow}][col = ${moveLeft}]`).addClass("highLight");
        $(`div[row= ${moveRow}][col = ${moveRight}]`).addClass("highLight");
        return;
    } 
    // if the move left is open and the jump right is off the board
    if (gameBoard[moveRow][moveLeft] === 0 && gameBoard[jumpRow] === undefined) {
        $(`div[row = ${moveRow}][col = ${moveLeft}]`).addClass("highLight");  
        return; 
    }
    // if the jump is off the board and the move right is open
    if (gameBoard[jumpRow] === undefined && gameBoard[moveRow][moveRight] === 0) {
        $(`div[row = ${moveRow}][col = ${moveRight}]`).addClass("highLight");  
        return; 
    }
       // if the jumpleft is off the board and the jump is off the board
       if (gameBoard[moveRow][moveLeft] === 0 && gameBoard[jumpRow] === undefined) {
        $(`div[row = ${moveRow}][col = ${moveLeft}]`).addClass("highLight");  
        return; 
    }
    // if 2 enemies adjacent and the jump left is open and jump right is blocked
    if(gameBoard[moveRow][moveLeft] === enemyChecker && gameBoard[moveRow][moveRight]=== enemyChecker && gameBoard[jumpRow][jumpLeft]=== 0 && gameBoard[jumpRow][jumpRight] !==0) {
        $(`div[row = ${jumpRow}][col = ${jumpLeft}]`).addClass("highLight");
        jumpLeftOccurred = true;
        return;
    }


    // if 2 enemys block adajcent squares and both jumps are open
    if( gameBoard[moveRow][moveLeft] === enemyChecker && gameBoard[moveRow][moveRight] === enemyChecker && gameBoard[jumpRow][jumpLeft] === 0 && gameBoard[jumpRow][jumpRight] === 0) {
        $(`div[row = ${jumpRow}][col = ${jumpLeft}]`).addClass("highLight"); 
        $(`div[row = ${jumpRow}][col = ${jumpRight}]`).addClass("highLight");
        specialJump = true;
        return;
    }
    // if the move left is occupied by and enemy and the move right is an enemy checker 
    if (gameBoard[moveRow][moveLeft] === enemyChecker && gameBoard[moveRow][moveRight] === enemyChecker && gameBoard[jumpRow][jumpLeft] !== 0 && gameBoard[jumpRow][jumpRight]=== 0) {
        $(`div[row = ${jumpRow}][col = ${jumpRight}]`).addClass("highLight");
        jumpRightOccurred = true;
        return;
    }
    //if the possible move left is occupied by a friendly piece and the right is an enemy piece
    if ( gameBoard[moveRow][moveLeft] === friendlyChecker && gameBoard[moveRow][moveRight] === enemyChecker && gameBoard[jumpRow][jumpRight] === 0) {
        $(`div[row = ${jumpRow}][col = ${jumpRight}]`).addClass("highLight");
        jumpRightOccurred = true;
        return;
    }
    if ( gameBoard[moveRow][moveLeft] === enemyChecker && gameBoard[moveRow][moveRight] === friendlyChecker && gameBoard[jumpRow][jumpLeft] !== 0) {
          selectedChecker = null;
          return;
      }  
    // if the move right is an friendy and move left is a enemy
    if ( gameBoard[moveRow][moveLeft] === enemyChecker && gameBoard[moveRow][moveRight] === friendlyChecker) {
        $(`div[row = ${jumpRow}][col = ${jumpLeft}]`).addClass("highLight");
        jumpLeftOccurred = true;
        return;
    }
    // if the move right is an enemy and move left is a friendly
    if ( gameBoard[moveRow][moveLeft] === enemyChecker && gameBoard[moveRow][moveRight] === friendlyChecker) {
        checkIfJumpIsValid();
        if(jumpIsValid){
            $(`div[row = ${jumpRow}][col = ${jumpLeft}]`).addClass("highLight");
            jumpLeftOccurred = true;
        }
    }
    // if the move left is open and the move right is a friendly piece
    if ( gameBoard[moveRow][moveLeft] === 0 && gameBoard[moveRow][moveRight] === friendlyChecker) {
        $(`div[row = ${moveRow}][col = ${moveLeft}]`).addClass("highLight");    
    }
    // if the move left is a friendly piece and the move right is open
    if ( gameBoard[moveRow][moveLeft] === friendlyChecker && gameBoard[moveRow][moveRight] === 0){
        $(`div[row = ${moveRow}][col = ${moveRight}]`).addClass("highLight");
    }
    // if there is an open move left and the move right and jump right are enemy checkers
    if ( gameBoard[moveRow][moveLeft] === 0 && gameBoard[moveRow][moveRight]=== enemyChecker && gameBoard[jumpRow][jumpRight] !== 0) {
        $(`div[row = ${moveRow}][col = ${moveLeft}]`).addClass("highLight");  
        return;
    }
    // if there is an open move left and the move right is an enemy checker and the jump right is off the table

    if( gameBoard[moveRow][moveLeft] === 0 && gameBoard[moveRow][moveRight] === enemyChecker && gameBoard[jumpRow][jumpRight] === undefined) {
        $(`div[row = ${moveRow}][col = ${moveLeft}]`).addClass("highLight");  
        return;
    }
    // if there is an enemy piece in an adjacent square
    if ( gameBoard[moveRow][moveLeft] === 0 && gameBoard[moveRow][moveRight] === enemyChecker) {
        // highlight the square of the div to the left and the div 2 rows down and 2 columns to the right
        $(`div[row = ${jumpRow}][col = ${jumpRight}]`).addClass("highLight");
        //raise a flag that a jump to the right occurred
        jumpRightOccurred = true;
    }
    // if the move left is an enemy checker and the jump is occupied and the move right is open
    if ( gameBoard[moveRow][moveLeft] === enemyChecker && gameBoard[moveRow][moveRight] === 0 && gameBoard[jumpRow][jumpLeft] !== 0 ) {
        $(`div[row = ${moveRow}][col = ${moveRight}]`).addClass("highLight");
        return;
    }
    // if the move left is an enemy checker and the move right is open
    if ( gameBoard[moveRow][moveLeft] === enemyChecker &&  gameBoard[moveRow][moveRight] === 0) {
        // highlight the square of the div to the right and the div 2 rows down and 2 columns to the left
        $(`div[row = ${jumpRow}][col = ${jumpLeft}]`).addClass("highLight");
        //raise a flag that a jump to the left occurred
        jumpLeftOccurred = true;
    }
}

function repopulateChecker(){
        // loop through the gameBoard array
        for(var i = 0; i < gameBoard.length; i++){
            //loop though easch number in the inner array
            for(var j =0; j < gameBoard.length; j++){
                // if the gameBoard value at the outerloop index and innerloop index is a 1 the append a checker with the class of player1
                switch(gameBoard[i][j]) {
                    case 1:
                        var checker = $('<div>').addClass('checker player1');
                        $(`div[row = ${i}][col= ${j}]`).append(checker);
                    break;
                    case 2:
                        var checker = $('<div>').addClass('checker player2');
                        $(`div[row = ${i}][col= ${j}]`).append(checker);
                    break;
                    case 3:
                        var king = $('<div>').addClass('checker player1 king1');
                        $(`div[row = ${i}][col= ${j}]`).append(king);
                    break;
                    case 4:
                        var king = $('<div>').addClass('checker player2 king2');
                        $(`div[row = ${i}][col= ${j}]`).append(king);
                    break;
                }
            } 
        }
switchPlayer();
deselectOpponentCheckers();
}

function whichCheckerToPopulate( player) {
    if(player === 1) {
        if( moveRow === 7 && selectedChecker === 1) {
            gameBoard[moveToRow][moveToColumn] = 3;
            return;
        } else if (selectedChecker === 3){
            gameBoard[moveToRow][moveToColumn] = 3;
            return;
        } else {
            gameBoard[moveToRow][moveToColumn] = 1;
        }
    } else {
        if( moveRow === 0 && selectedChecker === 2) {
            gameBoard[moveToRow][moveToColumn] = 4;
            return;
        } else if (selectedChecker === 4){
            gameBoard[moveToRow][moveToColumn] = 4;
            return;
        } else {
            gameBoard[moveToRow][moveToColumn] = 2;
        } 
    }
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
    player1Score = 0;
    player2Score = 0;
    // remove all the children div's (checkers) from the divs with the class of square
    $('.square').empty();
    // clear any existing highlights before checkers are repopulated
    removeHighlights();
    // reloop through array an assign checkers to original position
    repopulateChecker();
}





function selectPiece(){
    // has a div has not been clicked
    if(!selectedChecker){
        var currentChecker = this;
        //get the numeric value of the div's row attribute that was clicked
        currentRow = parseInt($(currentChecker).attr('row'));
        //get the numeric value of the div's col attribute that was clicked
        currentColumn = parseInt($(currentChecker).attr('col'));
        selectedChecker = gameBoard[currentRow][currentColumn];
        // check who the current player is, and what possible moves they will have
        // directionOfPlayerMovements( currentPlayer , selectedChecker );
        if (selectedChecker === 3 || selectedChecker === 4) {
            if (currentRow === 7 || currentRow === 0) {
                releaseTheKing( currentPlayer);
                if(currentColumn === 0 || currentColumn === 7) {
                checkBoardEdge();
                } else{
                normalMovements();
            }
            } else {
                directionOfPlayerMovements( currentPlayer , selectedChecker );
                normalMovements();
            }
        }
        if( selectedChecker === 1 || selectedChecker === 2) {
            if (currentColumn === 0 || currentColumn === 7){
                directionOfPlayerMovements( currentPlayer , selectedChecker );
                checkBoardEdge();
            }   else {
                directionOfPlayerMovements( currentPlayer , selectedChecker );
                normalMovements();
            }

        }   
      
    } else {
        //if the next square clicked has the class of highlight
        if($(this).hasClass('highLight')){
            //jQuery target the div with the row and col value equal to the current checkers possible moves and remove the class highLight
            removeHighlights();
            //find the numeric value of row attribute the highlighted div clicked
            moveToRow = parseInt($(this).attr('row'));
            //find the numeric value of col attribute the highlighted div clicked
            moveToColumn = parseInt($(this).attr('col'));
            whichCheckerToPopulate( currentPlayer);

            //if a jump occured remove what the possible move would have been
            incrementScore();
            //remove the checker that is currently selected 
            gameBoard[currentRow][currentColumn]= 0;
            //remove all children divs from the divs with the class of square
            $('.square').empty();
            removeHighlights();
            selectedChecker = null;
            specialJump = false;
            jumpRightOccurred = false;
            jumpLeftOccurred = false;
            jumpIsValid = false;
            moveToRow = null;
            moveColumn = null;
            //reloop through the array and create cheakers at the new array values
            repopulateChecker();
        } else {
            //if the div clicked does not have the class of highLight, remove the highLight class and reset the original checker clicked, then exit function
            $(`div[row = ${moveRow}][col = ${moveLeft}]`).removeClass("highLight");
            $(`div[row= ${moveRow}][col = ${moveRight}]`).removeClass("highLight");
            selectedChecker =null;
            return;
        }
    }
}

function removeHighlights(){
        $(".square").removeClass("highLight");
}

function displayModal() {
    $(".blackScreen").addClass("show");
}

function removeModal() {
    $(".blackscreen.show").removeClass("show");
}