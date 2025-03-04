import { gameBoardElement, ctx, backgroundImage, platformImage, ballImage, brickImage, Platform, Ball, Block } from "./data.js";
const gamePad = new Platform({ img: platformImage, position: 500 });
const gameBall = new Ball ({ img: ballImage, position: {x:gamePad.position + 75, y: 710}, started: false});

const bricks = [];

const createBlocks = () => {
    bricks.length = 0;  //powoduje odbijanie piłki od cegieł w pierwszym rozdaniu.
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 7; col++) {
            bricks.push(new Block({ img: brickImage, position: { x: col * 140 + 100, y: row * 50 + 30 } }));
        }
    }
};

const drawBlocks = () => {
    bricks.forEach(block => block.draw());
};

const drawGame = () =>{
    ctx.drawImage(backgroundImage, 0,0, gameBoardElement.clientWidth, gameBoardElement.clientHeight);
    gamePad.draw(); 
    gameBall.move();
    checkCollisions();
    checkWin();
    checkLose();
    drawBlocks();
}

const bounce = () =>{
    if (gameBall.position.y + 50 >= 765 && 
        gameBall.position.x + 50 >= gamePad.position && 
        gameBall.position.x <= gamePad.position + 200 
    ) {
        gameBall.velocity.y *= -1; 

    // Zmiana kierunku w osi X w zależności od miejsca uderzenia
    //const hitPoint = gameBall.position.x - (gamePad.position + 100); // Środek platformy
    //gameBall.velocity.x += hitPoint * 0.05;
    }
} 

let score = 0;

const checkCollisions = () => {
    bricks.forEach(block => {
        if (!block.isBroken &&
            gameBall.position.x + 50 >= block.position.x &&
            gameBall.position.x <= block.position.x + 150 &&
            gameBall.position.y + 50 >= block.position.y &&
            gameBall.position.y <= block.position.y + 75) {
                score += 10;
            block.isBroken = true; // Cegiełka "zniszczona"
            gameBall.velocity.y *= -1; // Zmiana kierunku piłki 
        }
    });
};

const checkWin = () =>{
    const allBricsBroken = bricks.every(block => block.isBroken);
    if (allBricsBroken) {

        cancelAnimationFrame(animate);

        gameBall.position.x = gamePad.position + 75;
        gameBall.position.y = 710;
        gameBall.started = false;
        createBlocks(); 
        drawGame();
    }
}

const checkLose = () =>{
    if (gameBall.position.y >= 800){
        gameBall.started = false;
        score = 0;
        
        ctx.font = "50px Kode Mono";
        ctx.fillStyle = '#fefefe';
        ctx.fillText("You Lose!", 500, 370);
        isRuning = false;
    }
}

let isRuning = true;

const scoreCount = () =>{

ctx.font = "20px Kode Mono";
ctx.fillStyle = '#fefefe';
ctx.fillText("SCORE: "+score, 1000, 30);
}


let animationId; // Globalna zmienna na ID animacji

const animate = () =>{
    if (isRuning){
        ctx.clearRect(0, 0, gameBoardElement.clientWidth, gameBoardElement.height);
        drawGame();
        bounce();
        scoreCount();
        animationId = requestAnimationFrame(animate); // Zapisujemy ID animacji
    }else{
        cancelAnimationFrame(animationId); // Przerywamy tylko jeśli ID jest ustawione
    }
}

//uruchamianie gry dopiero po załadowaniu obrazów:

const images = [backgroundImage, platformImage, ballImage, brickImage];
let loadedImages = 0;

images.forEach(img => {
    img.onload = () => {
        loadedImages++;
        if (loadedImages === images.length) {
            console.log("Wszystkie obrazy załadowane, start gry");
            animate();  // Dopiero teraz startujemy animację!
        }
    };

    img.onerror = () => console.error("Błąd ładowania obrazu", img.src);
});
