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
var score = 0;
var time = 9;
var interval = null;
var start_restart = true;
var on_mouse_target = null;
var score_interval = null;
var move_amount = 5;
var current_pos_x = max_X / 2;
var current_pos_y = max_Y / 2;
let lastFrameTime = 0;
let frameCount = 0;
let fps = 0;
let score_time = null;



target.style.transform = `translate(${max_X / 2}vh,${max_Y / 2}vh)`;

// Crosshair selection logic
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

// Start button logic
start_button.addEventListener("click", function() {
    time = 59;
    score = 0;
    current_pos_x = max_X / 2;
    current_pos_y = max_Y / 2;
    target.style.transform = `translate(${max_X / 2}vh,${max_Y / 2}vh)`;
    score_text.textContent = `Score : ${score}`;
    timer_text.textContent = `Timer : ${time}`;

    start_button.style.transition = "0s";
    start_button.style.visibility = "hidden";

    target.style.visibility = "visible";
    target.style.transition = "0.5s";
    interval = setInterval(updateTimer, 1000);
    score_time = setInterval(Score_Time, 25);
    clearInterval(score_interval);

    requestAnimationFrame(gameLoop);
});

// Target hover logic
target.addEventListener("mouseover", function() {
    clearInterval(score_interval);
    on_mouse_target = true;
    score_interval = setInterval(MoveTime, 150);
});
target.addEventListener("mouseout", function() {
    clearInterval(score_interval);
    on_mouse_target = false;
    score_interval = setInterval(MoveTime, 150);
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
        clearInterval(score_interval);
        clearInterval(score_time);
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

function MoveOffset() {
    if (Math.random() > 0.5) {
        current_pos_x += Math.random() * move_amount;
    } else {
        current_pos_x -= Math.random() * move_amount;
    }

    if (Math.random() > 0.5) {
        current_pos_y += Math.random() * move_amount;
    } else {
        current_pos_y -= Math.random() * move_amount;
    }

    // Ensure the target stays within screen boundaries
    if (current_pos_x < 0) {
        current_pos_x = 0;
    } else if (current_pos_x > max_X) {
        current_pos_x = max_X;
    }

    if (current_pos_y < 0) {
        current_pos_y = 0;
    } else if (current_pos_y > max_Y) {
        current_pos_y = max_Y;
    }
}

function MoveTime() {
    MoveOffset();
}

function Score_Time() {
    score_text.textContent = `Score : ${score}`;
    target.style.transform = `translate(${current_pos_x}vh,${current_pos_y}vh)`;
    if (on_mouse_target && time > 0) {
        score += 3;
    } else if (!on_mouse_target && time > 0) {
        if (score > 0) {
            score--;
        }
    }
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
