document.getElementById("playBox").style.display="none";
document.getElementById("scoreOne").style.display="none";
document.getElementById("instructionsOne").style.display="none";
document.getElementById("scoreTwo").style.display="none";
document.getElementById("instructionsTwo").style.display="none";
document.getElementById("retry").style.display="none";
document.getElementById("board").style.display="none";

function playGame(url){
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  head.appendChild(script);

  console.log(url)

  if(url=="game.js"){
    gameForOne()
  }
  else if(url="gameTwo.js"){
    gameForTwo()
  }
}

function gameForOne(){
  document.getElementById("startBox").style.display="none";
  document.getElementById("playBox").style.removeProperty('display');
  document.getElementById("scoreOne").style.removeProperty('display');
  document.getElementById("instructionsOne").style.removeProperty('display');
  document.getElementById("retry").style.removeProperty('display');
  document.getElementById("board").style.removeProperty('display');
}

function gameForTwo(){
  document.getElementById("startBox").style.display="none";
  document.getElementById("playBox").style.removeProperty('display');
  document.getElementById("scoreOne").style.removeProperty('display');
  document.getElementById("instructionsOne").style.removeProperty('display');
  document.getElementById("scoreTwo").style.removeProperty('display');
  document.getElementById("instructionsTwo").style.removeProperty('display');
  document.getElementById("retry").style.removeProperty('display');
  document.getElementById("board").style.removeProperty('display');
}