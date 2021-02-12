//--init 
var canPlayOne = true;
var canPlayTwo = true;
var gameSpeed = 100;

//starting position

var colOne = 49;
var rowOne = 3;
var snakeOnePos = [{col:49,row:3},{col:49,row:2}];
var colTwo = 2;
var rowTwo = 48;
var snakeTwoPos = [{col:2,row:48},{col:2,row:49}];

//create both snakes
for(i=0; i<snakeOnePos.length; i++){
  let div = document.createElement("div");
  let divTwo = document.createElement("div");
  div.classList.add("snakeOne");
  div.style.gridColumn = `${snakeOnePos[i].col}`;
  div.style.gridRow = `${snakeOnePos[i].row}`;
  document.getElementById("playBox").appendChild(div);
  divTwo.classList.add("snakeTwo");
  divTwo.style.gridColumn = `${snakeTwoPos[i].col}`;
  divTwo.style.gridRow = `${snakeTwoPos[i].row}`;
  document.getElementById("playBox").appendChild(divTwo);
}
snakeOne = document.getElementsByClassName("snakeOne");
snakeTwo = document.getElementsByClassName("snakeTwo");

var snakeOneLength = snakeOnePos.length;
var snakeTwoLength = snakeTwoPos.length;


var foodCreate = document.createElement("div");
foodCreate.id = "food";

// //create board
for (let i = 1; i < 51; i++) {
  if(i%2==0){
    for (let n = 1; n < 51; n+=2){
      var div = document.createElement("div");
      div.classList.add("darker");
      div.style.gridColumn = n;
      div.style.gridRow = i;
      document.getElementById("board").appendChild(div);
    }
  }else{
    for (let n = 2; n < 51; n+=2) {
      var div = document.createElement("div");
      div.classList.add("darker");
      div.style.gridColumn = n;
      div.style.gridRow = i;
      document.getElementById("board").appendChild(div);
    }
  }
}


//starts after 2 seconds
setTimeout(function(){
  document.getElementById("playBox").appendChild(foodCreate);
  createFood();
    
  //movement init

  var moveOne = 2;
  var moveTwo = 1;

  var keyPressedOne = false;
  var keyPressedTwo = false;

  document.onkeydown = checkKey;


  function checkKey(e) {

      e = e || window.event;

      //player one
      //up
      if(keyPressedOne == false){
        if (e.keyCode == '38' && moveOne != 2) {
        keyPressedOne = true;
        moveOne = 1;
        }
      }
      //down
      if(keyPressedOne == false){
        if (e.keyCode == '40' && moveOne != 1) {
        keyPressedOne = true;
        moveOne = 2;
        }
      }
      //left
      if(keyPressedOne == false){
        if (e.keyCode == '37' && moveOne != 4) {
        keyPressedOne = true;
        moveOne = 3;
        }
      }
      //right
      if(keyPressedOne == false){
        if (e.keyCode == '39' && moveOne != 3) {
        keyPressedOne = true;
        moveOne = 4;
        }
      }
      //player two
      //w
      if(keyPressedTwo == false){
        if (e.keyCode == '87' && moveTwo != 2) {
          keyPressedTwo = true;
          moveTwo = 1;
        }
      }
      //s
      if(keyPressedTwo == false){
        if (e.keyCode == '83' && moveTwo != 1) {
          keyPressedTwo = true;
          moveTwo = 2;
        }
      }
      //a
      if(keyPressedTwo == false){
        if (e.keyCode == '65' && moveTwo != 4) {
          keyPressedTwo = true;
          moveTwo = 3;
        }
      }
      //d
      if(keyPressedTwo == false){
        if (e.keyCode == '68' && moveTwo != 3) {
          keyPressedTwo = true;
          moveTwo = 4;
        }
      }
  }

  function game(){
    
    //movement by key

    //player one
    switch (moveOne){
      case 1:
        rowOne-=1;
        keyPressedOne = false;
        break;
      case 2:
        rowOne+=1;
        keyPressedOne = false;
        break
      case 3:
        colOne-=1;
        keyPressedOne = false;
        break
      case 4:
        colOne+=1;
        keyPressedOne = false;
        break
      case 5:
        colOne+=0;
        rowOne+=0;
        break
    }
    //moveing through walls
    if(colOne==51){
      colOne=1;
    }
    if(rowOne==51){
      rowOne=1;
    }
    if(colOne==0){
      colOne=50;
    }
    if(rowOne==0){
      rowOne=50;
    }
      
    //player two
    switch (moveTwo){
      case 1:
        rowTwo-=1;
        keyPressedTwo = false;
        break;
      case 2:
        rowTwo+=1;
        keyPressedTwo = false;
        break
      case 3:
        colTwo-=1;
        keyPressedTwo = false;
        break
      case 4:
        colTwo+=1;
        keyPressedTwo = false;
        break
      case 5:
        colTwo+=0;
        rowTwo+=0;
        break
    }
    //moving through walls
    if(colTwo==51){
      colTwo=1;
    }
    if(rowTwo==51){
      rowTwo=1;
    }
    if(colTwo==0){
      colTwo=50;
    }
    if(rowTwo==0){
      rowTwo=50;
    }

    //if food picked, increase length of snake and create new food
    if(colOne == foodcol && rowOne == foodrow){

      snakeOneLength+=1;
      createFood();
      var div = document.createElement("div");
      div.className = "snakeOne";
      document.getElementById("playBox").appendChild(div);
      document.getElementById("scoreOne").innerHTML=`Score: ${snakeOneLength-2}`;
    }

    if(colTwo == foodcol && rowTwo == foodrow){
      snakeTwoLength+=1;
      createFood();
      var divTwo = document.createElement("div");
      divTwo.className = "snakeTwo";
      document.getElementById("playBox").appendChild(divTwo);
      document.getElementById("scoreTwo").innerHTML=`Score: ${snakeTwoLength-2}`;
    }

  movement();

  }

  play = setInterval(game, gameSpeed);

  //creating food at random position
  function createFood(){
    var food = document.getElementById("food");
    foodcol = Math.floor(Math.random() * 50)+1;  
    foodrow = Math.floor(Math.random() * 50)+1;  
    food.style.gridColumn = `${foodcol}`;
    food.style.gridRow = `${foodrow}`;
  }
  //changing position of both snakes and checking collision
  function movement(){

    let allSnakeLength = snakeOneLength+snakeTwoLength;
    snakeOnePos.unshift({col:colOne,row:rowOne});

    if(snakeOnePos.length>snakeOneLength){
      snakeOnePos.pop();
    }
    snakeTwoPos.unshift({col:colTwo,row:rowTwo});

    if(snakeTwoPos.length>snakeTwoLength){
      snakeTwoPos.pop();
    }
    
    var wholeSnakeOne = document.querySelectorAll('.snakeOne');
    var wholeSnakeTwo = document.querySelectorAll('.snakeTwo');
    var  snakeOneHead = JSON.stringify(snakeOnePos[0]);
    var  snakeTwoHead = JSON.stringify(snakeTwoPos[0]);

    for(let i=0; i<allSnakeLength;i++){ 
      var snakeOneBody = JSON.stringify(snakeOnePos[i+1]);
      var snakeTwoBody = JSON.stringify(snakeTwoPos[i+1]);

      if(snakeOneHead == snakeTwoHead && i<1){
        lose();
        loseTwo();
      }
      if(snakeOneHead == snakeOneBody || snakeOneHead == snakeTwoBody){  
        moveOne=5;
        lose();
      }

      if(snakeTwoHead == snakeTwoBody || snakeTwoHead == snakeOneBody ){
        moveTwo=5;
        loseTwo();
      }

      if(canPlayOne == true){
        changePosOne(i);
      }
      if(canPlayTwo == true){
        changePosTwo(i);
      }
    }
    function changePosOne(i){
      if(wholeSnakeOne.length>0 && i<snakeOneLength ){
        snakeOne[i].style.gridColumn = `${snakeOnePos[i].col}`;
        snakeOne[i].style.gridRow = `${snakeOnePos[i].row}`;
    }
  }
    function changePosTwo(i){
      if(wholeSnakeTwo.length>0 && i<snakeTwoLength ){
        snakeTwo[i].style.gridColumn = `${snakeTwoPos[i].col}`;
        snakeTwo[i].style.gridRow = `${snakeTwoPos[i].row}`;
      }
    }
  }

},2000);

//lose green player
function lose(){
  canPlayOne = false;
  snakeOnePos = [];
  let wholeSnakeOne = document.querySelectorAll('.snakeOne');
  document.getElementById("instructionsOne").style.backgroundColor="red";
  document.getElementById("scoreOne").style.backgroundColor="red";

  for(let i=0; i<wholeSnakeOne.length;i++){
    wholeSnakeOne[i].remove();
  }

  if(canPlayTwo == false){
    ending();
    }
}

//lose blue player
function loseTwo(){
  canPlayTwo = false;
  snakeTwoPos = [];
  let wholeSnakeTwo = document.querySelectorAll('.snakeTwo');
  document.getElementById("instructionsTwo").style.backgroundColor="red";
  document.getElementById("scoreTwo").style.backgroundColor="red";

  for(let i=0; i<wholeSnakeTwo.length;i++){
    wholeSnakeTwo[i].remove();
  }

  if(canPlayOne == false){
    ending();
  }
}
//ending screen
function ending(){
  clearInterval(play);
  let divInfo = document.createElement("div");
  let divText = document.createElement("div");
  divInfo.classList.add("info") ;
  document.getElementById("content").appendChild(divInfo)
  document.getElementById("food").style.display = "none"

  if(snakeOneLength==snakeTwoLength){
    divText.innerHTML = "Draw";
    document.getElementsByClassName("info")[0].appendChild(divText);
  }
  if(snakeOneLength>snakeTwoLength){
    divText.innerHTML = "Green wins";
    document.getElementsByClassName("info")[0].appendChild(divText);
  }

  if(snakeTwoLength>snakeOneLength){
    divText.innerHTML = "Blue wins";
    document.getElementsByClassName("info")[0].appendChild(divText);
  }
}

function retry(){
  location.reload();
}
