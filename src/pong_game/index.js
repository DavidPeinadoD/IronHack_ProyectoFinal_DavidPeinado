// Canvas
const canvas = document.getElementById("myGame");
const context = canvas.getContext("2d");

let gameStart = new Audio();
gameStart.src = "/pong_game/res/musica_pong.mp3";


// Dibujar un rectangulo
function drawRect(x, y, w, h, color) {
    context.fillStyle = color
    context.fillRect(x, y, w, h)
}

// Pala de CPU
let com = {
    x: canvas.width / 2 - 50 / 2, y: 10, width: 50, height: 10, color: "white", score: 0
}

// Pala de Jugador 1
let user = {
    x: canvas.width / 2 - 50 / 2, y: canvas.height - 10 - 10, width: 50, height: 10, color: "white", score: 0
}
// Pala de Jugador 2
let user2 = {
    x: canvas.width / 2 - 50 / 2, y: 10, width: 50, height: 10, color: "white", score: 0
}

// Centrar
function centerLine() {
    context.beginPath()
    context.setLineDash([10])
    context.moveTo(0, canvas.height / 2)
    context.lineTo(canvas.width, canvas.height / 2)
    context.strokeStyle = "white"
    context.stroke()
}

// Dibujar un circulo
function drawCircle(x, y, r, color) {
    context.fillStyle = color
    context.beginPath()
    context.arc(x, y, r, 0, Math.PI * 2, false)
    context.closePath()
    context.fill()
}

// Crear pelota
const ball = {
    x: canvas.width / 2, y: canvas.height / 2, radius: 10, speed: 1, velocityX: 5, velocityY: 5, color: "white"
}

// puntuacion
function drawText(text, x, y, color) {
    context.fillStyle = color
    context.font = "32px josefin sans"
    context.fillText(text, x, y)
}

function render() {
    // Make canvas
    drawRect(0, 0, 400, 600, "black");


    if (isSinglePlayer) {

        // Pala de CPU
        drawRect(com.x, com.y, com.width, com.height, com.color)

        // Pala de Jugador 1
        drawRect(user.x, user.y, user.width, user.height, user.color)


    } else {

        // Pala de Jugador 1
        drawRect(user.x, user.y, user.width, user.height, user.color)
        // Pala de Jugador 2
        drawRect(user2.x, user2.y, user2.width, user2.height, user2.color)

    }

    // Centrar
    centerLine();

    //create a ball
    drawCircle(ball.x, ball.y, ball.radius, ball.color)

    // scores of com and user
    drawText(com.score, 20, canvas.height / 2 - 30)
    drawText(user.score, 20, canvas.height / 2 + 50)

}

// Pala dirigida por raton
canvas.addEventListener("mousemove", movePaddle);


let keysPressed = new Set(); // Conjunto para almacenar las teclas presionadas
const moveSpeed = 5; // Ajusta la velocidad de movimiento según sea necesario

document.addEventListener("keydown", function (event) {
    if (!isSinglePlayer) {
        keysPressed.add(event.key); // Agrega la tecla presionada al conjunto
    }
});

document.addEventListener("keyup", function (event) {
    keysPressed.delete(event.key); // Elimina la tecla soltada del conjunto
});

function smoothMove() {
    if (keysPressed.has("a") || keysPressed.has("A")) {
        user2.x -= moveSpeed; // Mueve la paleta del jugador 2 hacia la izquierda
    }
    if (keysPressed.has("d") || keysPressed.has("D")) {
        user2.x += moveSpeed; // Mueve la paleta del jugador 2 hacia la derecha
    }

    // Limita el movimiento de la paleta dentro de los límites del canvas
    if (user2.x < 0) {
        user2.x = 0;
    } else if (user2.x + user2.width > canvas.width) {
        user2.x = canvas.width - user2.width;
    }

    requestAnimationFrame(smoothMove); // Continúa llamando a la función para un movimiento suave
}


function movePaddle(e) {
    let rect = canvas.getBoundingClientRect();
    if (!isSinglePlayer) {
        // Mueve la paleta del jugador 2
        user.x = e.clientX - rect.left - user.width / 2;
    } else {
        user.x = e.clientX - rect.left - user.width / 2;
    }
}

// colisiones
function collision(b, p) { //b-ball , p -player
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    return p.right > b.left && p.left < b.right && b.bottom > p.top && b.top < p.bottom;
}

// reset de pelota
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;

    ball.speed = 1;
    ball.velocityY = -ball.velocityY;
}

// Mostrar game over
function showGameOver() {
    // Hide canvas
    canvas.style.display = "none";
    const can = document.getElementById("can");
    can.style.display = "none";
    // container
    const result = document.getElementById("result");
    result.style.display = "block";
}

// update
function update() {
    ball.x += ball.velocityX * ball.speed;
    ball.y += ball.velocityY * ball.speed;

    if (!isSinglePlayer) {
        updatePlayer2Paddle();
    } else {
        updateComputerPaddle();
    }

    // Colisiones al muro
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.velocityX = -ball.velocityX;
    }

    // Colisiones
    if (!isSinglePlayer) {
        if (collision(ball, user2)) {
            ball.velocityY = -ball.velocityY;
            ball.speed += 0.1;
        } else {
            if (collision(ball, user)) {
                ball.velocityY = -ball.velocityY;
                ball.speed += 0.1;
            }
        }
    } else {
        if (collision(ball, user)) {
            ball.velocityY = -ball.velocityY;
            ball.speed += 0.1;
        }else{
            if (collision(ball,com)) {
                ball.velocityY = -ball.velocityY;
                ball.speed += 0.1;            }
        }

    }

    // Puntuacion
    if (ball.y - ball.radius < 0) {
        user.score++
        resetBall()
    } else if (ball.y + ball.radius > canvas.height) {
        com.score++;
        resetBall()
    }

    // Game over
    if (user.score > 4 || com.score > 4) {
        clearInterval(loop);
        showGameOver();

    }
}

function updateComputerPaddle() {
    // La pala de la computadora seguira a la pelota
    let targetX = ball.x - com.width / 2;

    //  Moviemiento smooth
    let delta = targetX - com.x;
    com.x += delta * 0.5; // Adjust smoothing factor as needed

//La pala no se podra salir del canvas
    if (com.x < 0) {
        com.x = 0;
    } else if (com.x + com.width > canvas.width) {
        com.x = canvas.width - com.width;
    }
}

function updatePlayerPaddle() {
    // Limit paddle movement to stay within the screen boundaries
    if (user.x < 0) {
        user.x = 0;
    } else if (user.x + user.width > canvas.width) {
        user.x = canvas.width - user.width;
    }
}

function updatePlayer2Paddle() {
    // Limit paddle movement to stay within the screen boundaries
    if (user2.x < 0) {
        user2.x = 0;
    } else if (user2.x + user2.width > canvas.width) {
        user2.x = canvas.width - user2.width;
    }
}


let isSinglePlayer = true;
let gameStarted = false;

// Añadir eventos para los dos tipos de partida
document.getElementById("onePlayerBtn").addEventListener("click", function () {
    console.log("1 Jugador seleccionado");
    if (!gameStarted) {
        isSinglePlayer = true;
        gameStarted = true;
        hideButtons();
        startGame();
    }
});

document.getElementById("twoPlayersBtn").addEventListener("click", function () {
    console.log("2 Jugadores seleccionado");
    if (!gameStarted) {
        isSinglePlayer = false;
        gameStarted = true;
        smoothMove();
        hideButtons();
        startGame();
    }
});

document.getElementById("instructionsBtn").addEventListener("click", function () {
    alert("Game Instructions:\n- Controla la pala con el raton (1Jugador) o con A y D (2 jugadores).\n- Gana el primero que llegue a 5 puntos.\n- ¡Diviértete!");
});

function hideButtons() {
    document.getElementById("onePlayerBtn").style.display = "none";
    document.getElementById("twoPlayersBtn").style.display = "none";
    document.getElementById("instructionsBtn").style.display = "none";
}

// Empezar partida
let loop;

function startGame() {
    const loop = setInterval(function () {
        if (gameStarted) {
            update();
            render();
            gameStart.play();

        }
    }, 1000 / 60);
}

