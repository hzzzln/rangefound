var currentLevel;
var actualDist;
var pictureDirectory = "pictures/";
var guesses;
function startGame() {
    data = shuffleArray(gamedata);
    loadNextPicture();
    guesses = [];
}

currentButtonAction = startGame;

function shuffleArray(a){
    var tmp = [];
    for (k = a.length; k; k--){
      tmp[k-1] = a[k-1];
    }
    var x = [];
    while(tmp.length > 0){
      var i = Math.floor(Math.random()*tmp.length)
      x[x.length] = tmp.splice(i,1)[0];
    }
    return x;
}

function calculateColor(percent){
  var rpercent = percent - 50;
  if(rpercent < 0 ) rpercent = 0;
  var gpercent = percent + 50;
  if(gpercent > 100) gpercent = 100;
  var r, g, b;
  b = 0;
  r = (100 - rpercent)*2;
  g = gpercent*2.5;
  return "rgb("+r+","+g+","+b+")";
}

function newButton(newButtonAction, newButtonText){
    var button = document.getElementById("button");
    button.onclick = newButtonAction;
    button.innerHTML = newButtonText;
    currentButtonAction = newButtonAction;
}

function estimationButtonClicked() {
    var inputDist = document.getElementById("input").value;
    var resultDiv = document.getElementById("resultDiv");
    var estimationPercent = calculateEstimationPercent(inputDist, actualDist);

    guesses.push(estimationPercent);
    var sum = 0;
    for(var i = 0; i<guesses.length; i++){
      sum = sum + parseInt(guesses[i]);
    }
    var average = sum/guesses.length;

    clearResult("You guessed " +inputDist+ " meters, which is <span style='color:"+calculateColor(estimationPercent)+"'>" +estimationPercent+"%</span> accurate, the actual distance is "+ currentLevel.distance +" meters. You're average is <span style='color:"+calculateColor(average)+"'>"+average+"%</span>");

    changePic(currentLevel.reference);
    newButton(loadNextPicture, "Next Picture");

}

function calculateEstimationPercent(inputDist, actualDist){
    var delta = Math.abs(actualDist-inputDist);
    var deltaP = delta/actualDist;
    if (deltaP > 1) deltaP = 1;
    var estimationPercent = 100 * (1-deltaP);
    return (estimationPercent).toFixed(1);
}

function clearResult(newText){
    if(!newText) newText = "";
    var resultDiv = document.getElementById("resultDiv");
    resultDiv.innerHTML = newText;

}

function loadNextPicture(){

    currentLevel = data.pop();
    if(!currentLevel){
      alert("hi")
      location.reload();
    }


    document.getElementById("input").value = "";

    changePic(currentLevel.picture)
    clearResult();

    actualDist = currentLevel.distance;
    newButton(estimationButtonClicked, "Estimate")

}

function changePic(newPic){
  document.getElementById("img").src=""+pictureDirectory+newPic;

}
