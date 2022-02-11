status = "";
objects = [];

function setup(){
    canvas = createCanvas(570, 260);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(640, 330);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
        
    }

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

function draw(){
    r =random(255);
    g =random(255);
    b =random(255);
    image(video, 0,0,570,260);
    if(status =! ""){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected ";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected:"+ objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
