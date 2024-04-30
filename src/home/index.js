// Función para cambiar la imagen a un GIF al pasar el ratón sobre el juego
function cambiarAGif(event) {
    const game = event.currentTarget; // Obtener el contenedor del juego sobre el que se pasó el ratón
    const img = game.querySelector('img'); // Obtener la imagen dentro del contenedor
    const alt = img.getAttribute('alt'); // Obtener el texto alternativo de la imagen
    let gifSrc = ''; // Inicializar la fuente del GIF

    // Determinar la fuente del GIF según el juego
    if (alt === 'Juego 1') {
        gifSrc = 'res/pong.gif'; // Ruta al GIF del juego de ping pong
    } else if (alt === 'Juego 2') {
        gifSrc = 'res/car.gif'; // Ruta al GIF del juego de Mario Bros
    }

    // Reemplazar la imagen por el GIF
    img.src = gifSrc;
}

// Función para cambiar el GIF de vuelta a la imagen original al quitar el ratón del juego
function cambiarAImagenOriginal(event) {
    const game = event.currentTarget; // Obtener el contenedor del juego sobre el que se quitó el ratón
    const img = game.querySelector('img'); // Obtener la imagen dentro del contenedor
    const alt = img.getAttribute('alt'); // Obtener el texto alternativo de la imagen
    let jpgSrc = ''; // Inicializar la fuente de la imagen

    // Determinar la fuente de la imagen original según el juego
    if (alt === 'Juego 1') {
        jpgSrc = 'res/pong.jpg'; // Ruta a la imagen original del juego de ping pong
    } else if (alt === 'Juego 2') {
        jpgSrc = 'res/car.jpg'; // Ruta a la imagen original del juego de Mario Bros
    }

    // Reemplazar el GIF por la imagen original
    img.src = jpgSrc;
}

// Seleccionar todos los contenedores de juego
const games = document.querySelectorAll('.game');

// Agregar un event listener para el evento 'mouseover' a cada contenedor de juego
games.forEach(game => {
    game.addEventListener('mouseover', cambiarAGif);
});

// Agregar un event listener para el evento 'mouseout' a cada contenedor de juego
games.forEach(game => {
    game.addEventListener('mouseout', cambiarAImagenOriginal);
});
