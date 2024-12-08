import { containerElement, gameBoardElement, ctx, backgroundImage, platformImage, ballImage, Platform } from "./data.js";
const gamePad = new Platform({ img: platformImage, position: 500 });

window.onload = () =>{
    drawGame();
}

const drawGame = () =>{
    ctx.drawImage(backgroundImage, 0,0, gameBoardElement.clientWidth, gameBoardElement.clientHeight);
    ctx.drawImage(platformImage, gamePad.position, 750, 200, 50);
    ctx.drawImage(ballImage, 300, 600, 40, 40);
}



window.addEventListener("keydown", (e) =>{
    let key = e.key;
    switch(key){
        case 'ArrowRight':
            gamePad.position += 38;
            break;
        case 'ArrowLeft':
            gamePad.position -= 38;
            break;
    }
})


const animate = () =>{
    ctx.clearRect(0, 0, gameBoardElement.clientWidth, gameBoardElement.height);
    drawGame();


    //console.log(gamePad.position);

    requestAnimationFrame(animate);
}

animate();

