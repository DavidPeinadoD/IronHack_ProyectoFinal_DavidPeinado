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
//Pala de CPU 2
let com2 = {
    x: canvas.width / 2 - 50 / 2, y: canvas.height - 10 - 10, width: 50, height: 10, color: "white", score: 0
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
    if(isComVsCom){

        drawRect(com.x, com.y, com.width, com.height, com.color)

        drawRect(com2.x, com2.y, com2.width, com2.height, com2.color);

    }

    else if(isSinglePlayer) {

        // Pala de CPU
        drawRect(com.x, com.y, com.width, com.height, com.color)

        // Pala de Jugador 1
        drawRect(user.x, user.y, user.width, user.height, user.color)


    } else if(isTwoPlayer) {

        // Pala de Jugador 1
        drawRect(user.x, user.y, user.width, user.height, user.color)
        // Pala de Jugador 2
        drawRect(user2.x, user2.y, user2.width, user2.height, user2.color)

    }

    // Centrar
    centerLine();

    //create a ball
    drawCircle(ball.x, ball.y, ball.radius, ball.color)

    // scores de la com y user
    drawText(com.score, 20, canvas.height / 2 - 30)
    drawText(user.score, 20, canvas.height / 2 + 50)

}

// Pala dirigida por raton
canvas.addEventListener("mousemove", movePaddle);


let keysPressed = new Set(); // Conjunto para almacenar las teclas presionadas
const moveSpeed = 5; // Ajusta la velocidad de movimiento según sea necesario

document.addEventListener("keydown", function (event) {
    if (isTwoPlayer) {
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

    // Llama a la función para un movimiento suave
    requestAnimationFrame(smoothMove);
}

function movePaddle(e) {
    let rect = canvas.getBoundingClientRect();
    if (isTwoPlayer) {
        // Mueve la paleta del jugador 1 en el modo de 2 jugadores
        user.x = e.clientX - rect.left - user.width / 2;
    } else if (isSinglePlayer) {
        // Mueve la paleta del jugador 1 con el ratón en el modo de un jugador
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


    if (isTwoPlayer) {
        updatePlayer2Paddle();
    } else if(isSinglePlayer) {
        updateComputerPaddle();
    }else if(isComVsCom){
        updateComputerPaddle()
        updateComputerPaddle2()
    }


    // Colisiones al muro
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.velocityX = -ball.velocityX;
    }

    // Colisiones
    if (isTwoPlayer) {
        if (collision(ball, user2)) {
            ball.velocityY = -ball.velocityY;
            ball.speed += 0.1;
        } else {
            if (collision(ball, user)) {
                ball.velocityY = -ball.velocityY;
                ball.speed += 0.1;
            }
        }
    } else if (isSinglePlayer){
        if (collision(ball, user)) {
            ball.velocityY = -ball.velocityY;
            ball.speed += 0.1;
        } else {
            if (collision(ball, com)) {
                ball.velocityY = -ball.velocityY;
                ball.speed += 0.1;
            }
        }

    }else if(isComVsCom) {
        if (collision(ball, com)) {
            ball.velocityY = -ball.velocityY;
            ball.speed += 0.1;
        } else {
            if (collision(ball, com2)) {
                ball.velocityY = -ball.velocityY;
                ball.speed += 0.1;
            }
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
    // La pala de la computadora seguirá a la pelota
    let targetX = ball.x - com.width / 2;

    // Movimiento smooth con mayor velocidad de reacción
    let delta = targetX - com.x;
    com.x += delta * 1.1;

//La pala no se podra salir del canvas
    if (com.x < 0) {
        com.x = 0;
    } else if (com.x + com.width > canvas.width) {
        com.x = canvas.width - com.width;
    }
}
function updateComputerPaddle2() {
    // La pala de la computadora seguira a la pelota
    let targetX = ball.x - com2.width / 2;

    // Movimiento smooth con menor velocidad de reacción
    let delta2 = targetX - com2.x;
    com2.x += delta2 * 1.1; // Ajusta el factor de suavizado según sea necesario para menor velocidad


//La pala no se podra salir del canvas
    if (com2.x < 0) {
        com2.x = 0;
    } else if (com2.x + com2.width > canvas.width) {
        com2.x = canvas.width - com2.width;
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
let isTwoPlayer = false; // Variable para determinar si el juego es de dos jugadores
let isComVsCom = false; // Variable para determinar si el juego es CPU vs CPU
let gameStarted = false;

// Añadir eventos para los dos tipos de partida
document.getElementById("onePlayerBtn").addEventListener("click", function () {
    console.log("1 Jugador seleccionado");
    if (!gameStarted) {
        isSinglePlayer = true;
        isTwoPlayer=false;
        isComVsCom = false;
        gameStarted = true;
        hideButtons();
        startGame();
    }
});

document.getElementById("twoPlayersBtn").addEventListener("click", function () {
    console.log("2 Jugadores seleccionado");
    if (!gameStarted) {
        isSinglePlayer = false; // Asegúrate de cambiar isSinglePlayer a false
        isComVsCom = false; // Asegúrate de cambiar isComVsCom a false
        isTwoPlayer = true; // Debería ser isTwoPlayer = true;
        gameStarted = true;
        smoothMove();
        hideButtons();
        startGame();
    }
});

document.getElementById("comVsComBtn").addEventListener("click", function () {
    console.log("CPU vs CPU seleccionado");
    if (!gameStarted) {
        isSinglePlayer=false;
        isTwoPlayer=false;
        isComVsCom = true;
        gameStarted = true;
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
    document.getElementById("comVsComBtn").style.display = "none";
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

