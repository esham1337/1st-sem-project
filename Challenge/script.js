const target = document.getElementById("target");
const score_text = document.getElementById("score");
const timer_text = document.getElementById("timer");
const start_button = document.getElementById("start");
const cross_1 = document.getElementById("cross_1");
const cross_2 = document.getElementById("cross_2");
const cross_3 = document.getElementById("cross_3");
const cross_4 = document.getElementById("cross_4");
const screen_field = document.getElementById("screen");
const fps_text = document.getElementById("fps");
const max_X = 80;
const max_Y = 45;
let score = 0;
let time = 59;
let interval = null;
let start_restart = true;
let lastFrameTime = 0;
let frameCount = 0;
let fps = 0;

target.style.transform = `translate(${Math.random() * max_X}vh,${Math.random() * max_Y}vh)`;

cross_1.addEventListener("click", function() {
    screen_field.style.cursor = `url("cross_1.png") 15 15, auto`;
});
cross_2.addEventListener("click", function() {
    screen_field.style.cursor = `url("cross_2.png") 15 15, auto`;
});
cross_3.addEventListener("click", function() {
    screen_field.style.cursor = `url("cross_3.png") 5 5, auto`;
});
cross_4.addEventListener("click", function() {
    screen_field.style.cursor = `url("cross_4.png") 5 5, auto`;
});

start_button.addEventListener("click", function() {
    if (start_restart) {
        time = 59;
        score = 0;

        score_text.textContent = `Score : ${score}`;
        timer_text.textContent = `Timer : ${time}`;

        start_button.style.transition = "0s";
        start_button.style.visibility = "hidden";

        target.style.transform = `translate(${Math.random() * max_X}vh,${Math.random() * max_Y}vh)`;
        target.style.visibility = "visible";
        target.style.transition = "0.5s";
        start_restart = false;
    } else {
        time = 59;
        score = 0;

        score_text.textContent = `Score : ${score}`;
        timer_text.textContent = `Timer : ${time}`;

        start_button.style.transition = "0s";
        start_button.style.visibility = "hidden";

        target.style.transform = `translate(${Math.random() * max_X}vh,${Math.random() * max_Y}vh)`;
        target.style.visibility = "visible";
        target.style.transition = "0.5s";
        start_restart = true;
    }
    interval = setInterval(updateTimer, 1000);
    requestAnimationFrame(gameLoop);
});

target.addEventListener("mousedown", function() {
    score++;
    target.style.transform = `translate(${Math.random() * max_X}vh,${Math.random() * max_Y}vh)`;
    score_text.textContent = `Score : ${score}`;
});

function updateTimer() {
    time--;
    if (time <= 9) {
        timer_text.textContent = `Timer : 0${time}`;
    } else {
        timer_text.textContent = `Timer : ${time}`;
    }
    if (time <= 0) {
        clearInterval(interval);
        restartGame();
    }
}

function restartGame() {
    start_button.style.transition = "0.5s";
    start_button.style.visibility = "visible";
    start_button.textContent = "Restart";

    target.style.transition = "0s";
    target.style.visibility = "hidden";
}

function gameLoop(timestamp) {
    if (lastFrameTime) {
        frameCount++;
        const delta = (timestamp - lastFrameTime) / 1000;
        if (delta >= 1) {
            fps = frameCount / delta;
            fps_text.textContent = `FPS: ${Math.round(fps)}`;
            frameCount = 0;
            lastFrameTime = timestamp;
        }
    } else {
        lastFrameTime = timestamp;
    }
    if (time > 0) {
        requestAnimationFrame(gameLoop);
    }
}
