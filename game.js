import { containerElement, gameBoardElement, ctx, backgroundImage, platformImage, ballImage, keys, Platform, Ball } from "./data.js";
const gamePad = new Platform({ img: platformImage, position: 500 });
const gameBall = new Ball ({ img: ballImage, position: {x:gamePad.position + 75, y: 710}, started: false})

window.onload = () =>{
    drawGame();
}

const drawGame = () =>{
    ctx.drawImage(backgroundImage, 0,0, gameBoardElement.clientWidth, gameBoardElement.clientHeight);
    gamePad.draw(); 
    gameBall.move();
}

const bounce = () =>{
    if (gameBall.position.y + 50 >= 765 && 
        gameBall.position.x + 50 >= gamePad.position && 
        gameBall.position.x <= gamePad.position + 200 
    ) {
        gameBall.velocity.y *= -1; 

    // Zmiana kierunku w osi X w zależności od miejsca uderzenia
    const hitPoint = gameBall.position.x - (gamePad.position + 100); // Środek platformy
    gameBall.velocity.x += hitPoint * 0.05;
    }
} 



const animate = () =>{
    ctx.clearRect(0, 0, gameBoardElement.clientWidth, gameBoardElement.height);
    drawGame();
    bounce();
    requestAnimationFrame(animate);
}

animate();

