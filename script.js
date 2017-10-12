var currentLevel;
var actualDist;
var pictureDirectory = "pictures/";
var guesses;
var average;
var helpstring;

function startGame(){
  var helpp = document.getElementById('helpp')
  helpp.innerHTML = "Press here for help";
  helpstring = document.getElementById("content").innerHTML;
  document.getElementById("content").innerHTML
  showPicture();
  newSet();
}

function newSet(){
  data = shuffleForNewSet(10);
  guesses = [];
  loadNextPicture();
}

function showHelp(){
  var helpp = document.getElementById('helpp')
  helpp.innerHTML = "Press again to return";
  helpp.onclick = showPicture;
  var contentdiv = document.getElementById("content");
  contentdiv.innerHTML = helpstring;
}

function showPicture(){
  var helpp = document.getElementById('helpp')
  helpp.innerHTML = "Press here for help";
  helpp.onclick = showHelp;
  var contentdiv = document.getElementById("content");
  contentdiv.innerHTML = '<img id="img" src="pictures/help.png">'
  if(currentLevel) document.getElementById("img").src=""+pictureDirectory+currentLevel.picture;
}

currentButtonAction = startGame;

function shuffleForNewSet(imageCount){
  x = [];
  if(imageCount > gamedata.length){
    alert("You reached the end! Reload the page to start over.");
    location.reload();
  }
  while(x.length < imageCount){
    var i = Math.floor(Math.random()*gamedata.length)
    x[x.length] = gamedata.splice(i,1)[0];
  }
  return x;
}

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
    if(guesses.length > 10) guesses.splice(0,1);
    var sum = 0;
    for(var i = 0; i<guesses.length; i++){
      sum = sum + parseInt(guesses[i]);
    }
    average = sum/guesses.length;
    average = average.toFixed(1);

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
      alert("Finished a set! Your Score: "+average);
      newSet();
      loadNextPicture();
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
