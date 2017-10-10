const fs = require("fs");

var args = process.argv;

if(args.length<6) {
  console.log("Usage: nodejs helper.js firstimage secondimage 100mdist actualdist")
  return;
}
var firstimagepath = args[2];
var secondimagepath = args[3];
var hundredm = args[4];
var actualdist = args[5];

var distance = Math.round((actualdist*100)/hundredm);

var firstimagename = ""+randomname()+".jpg";
var secondimagename = ""+randomname()+".jpg";

fs.renameSync(firstimagepath, firstimagename);
fs.renameSync(secondimagepath, secondimagename);

var newentry = '{\n    picture: "'+firstimagename+'",\n    reference: "'+secondimagename+'",\n    distance: '+distance+'\n},'
console.log(newentry);

fs.appendFileSync("_data", newentry);

function randomname(){
  var name = "";
  var digit;
  for (var i = 0; i < 10; i++) {
    digit = Math.floor(Math.random()*10);
    name = name + digit;
  }
  return name;
}
