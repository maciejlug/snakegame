//init 
var gameSpeed = 100;

//starting position

var colOne = 26
var rowOne = 25
var snakeOnePos = [{col:26,row:25},{col:25,row:25}]


//create both snakes
for(i=0; i<snakeOnePos.length; i++){
  let div = document.createElement("div");
  div.classList.add("snakeOne");
  document.getElementById("playBox").appendChild(div);
  div.style.gridColumn = `${snakeOnePos[i].col}`;
  div.style.gridRow = `${snakeOnePos[i].row}`;
}
var snakeOne = document.getElementsByClassName("snakeOne");
var snakeOneLength = snakeOnePos.length;

var foodCreate = document.createElement("div");
foodCreate.id = "food";

//create board
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

  var moveOne = 4;

  var keyPressedOne = false;

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

    //if food picked, increase length of snake and create new food
    if(colOne == foodcol && rowOne == foodrow){

      snakeOneLength+=1;
      createFood();
      var div = document.createElement("div");
      div.className = "snakeOne";
      document.getElementById("playBox").appendChild(div);
      document.getElementById("scoreOne").innerHTML=`Score: ${snakeOneLength-2}`;
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
 
    snakeOnePos.splice(0,0,{col:colOne,row:rowOne});

    if(snakeOnePos.length>snakeOneLength){
      snakeOnePos.splice(-1,1);
    }
    console.log(snakeOnePos.length)
    console.log(snakeOneLength)
    var wholeSnakeOne = document.querySelectorAll('.snakeOne');
    var snakeOneHead = JSON.stringify(snakeOnePos[0]);

    for(let i=0; i<snakeOneLength;i++){ 
      var snakeOneBody = JSON.stringify(snakeOnePos[i+1]);
    
      if(snakeOneHead == snakeOneBody){  

        moveOne=5;
        ending();
      }


      changePosOne(i);
      
    }
    function changePosOne(i){
      if(wholeSnakeOne.length>0 && i<snakeOneLength ){
        snakeOne[i].style.gridColumn = `${snakeOnePos[i].col}`;
        snakeOne[i].style.gridRow = `${snakeOnePos[i].row}`;
    }
  }
}

},2000);


//ending screen
function ending(){
  clearInterval(play);
  let wholeSnakeOne = document.querySelectorAll('.snakeOne');
  let state = 1

  let divInfo = document.createElement("div");
  let divText = document.createElement("div");
  let divScore = document.createElement("div");

  //ending screen
  divInfo.classList.add("info") 
  document.getElementById("content").appendChild(divInfo)
  divText.innerHTML = "You lose"
  document.getElementsByClassName("info")[0].appendChild(divText)
  divScore.innerHTML = `Score: ${snakeOneLength-2}`
  divScore.style.fontSize = "5vh"
  document.getElementsByClassName("info")[0].appendChild(divScore)
  
  //ending snake fading animation
  setInterval(function(){
    if(state%2==0){
      for(let i=0; i<wholeSnakeOne.length;i++){
        wholeSnakeOne[i].style.removeProperty('display');
        state+=1;
      }
    }else{
      for(let i=0; i<wholeSnakeOne.length;i++){
        wholeSnakeOne[i].style.display = "none"
        state+=1
      }
    }
  }, 750);


}

function retry(){
  location.reload();
}