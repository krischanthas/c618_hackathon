$(document).ready(initializeApp);

function initializeApp(){
    createBoard();
}

var gameboard = [
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
  ];
  function createBoard(){
      debugger;
    for(var i = 0; i < gameboard.length; i++){
      for(var j = 0; j < gameboard[i].length; j++){
        var gameArea = $('.gameArea');
        if(parseInt(gameboard[i][j])== 0){
          gameArea.append('<div>', {
              class: 'white'
          });
        }
        else if(parseInt(gameboard[i][j])== 1){
          gameArea.append('<div>',{
              class: 'black'
          });
        }
      }
    }
  }