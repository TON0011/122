x = 0;
y = 0;

draw_apple = "";
apple = "";
speak_data = "";
to_number = 0;
screen_height = 0;
screen_width = 0;

let SpeechRecognition = window.webkitSpeechRecognition;
  
let recognition = new SpeechRecognition();

function preload() {
  apple = loadImage("apple.png");
}

function start() {
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 
 
recognition.onresult = function(event) {
  console.log(event); 

  let content = event.results[0][0].transcript;
  document.getElementById("status").innerHTML = "The speech has been recognized: " + content; 
  to_number = Number(content);
  
  if (Number.isInteger(to_number)) {
    document.getElementById("status").innerHTML = "Started drawing apple " + content;
    draw_apple = "set";
  } else {
    document.getElementById("status").innerHTML = "The speech has not recognized a number: " + content;
  }
};

function setup() {
  screen_width = window.innerWidth;
  screen_height = window.innerHeight;
  let canvas = createCanvas(screen_width - 150, screen_height - 150);
  canvas.position(0, 150);
}

function draw() {
  if (draw_apple == "set") {
    for (let i = 0; i < to_number; i++) {
      x = Math.floor(Math.random() * (screen_width - 150));
      y = Math.floor(Math.random() * (screen_height - 150));
      image(apple, x, y, 50, 50);
    }
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    draw_apple = "";
    speak_data = to_number + " Apples drawn";
    speak();
  }
}

function speak() {
  let synth = window.speechSynthesis;
  let utterThis = new SpeechSynthesisUtterance(speak_data);
  synth.speak(utterThis);
  speak_data = "";
}

