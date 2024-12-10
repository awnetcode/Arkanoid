
export const gameBoardElement = document.querySelector("#game-board");
export const ctx = gameBoardElement.getContext('2d');

export const backgroundImage = new Image();
backgroundImage.src = '/assets/cosmic.webp';

export const platformImage = new Image();
platformImage.src = '/assets/arkanoid-pad.png';

export const ballImage = new Image();
ballImage.src = '/assets/green-shiny.png';

export const brickImage = new Image();
brickImage.src = '/assets/brick.png';

export const keys = {
    ArrowLeft:{pressed: false},
    ArrowRight:{pressed: false}, 
    Space:{pressed: false}
}

window.addEventListener("keydown", (e) =>{
    let key = e.key;
    switch(key){
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            break;
        case ' ':
            keys.Space.pressed = true;
            break;

    }
   // console.log(key);
})

window.addEventListener("keyup", (e) =>{
    let key = e.key;
    switch(key){
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
    }
})

export class Platform {
    constructor({img, position}){
        this.img = img;
        this.position = position;
        this.state = 'idle';
    }

    draw(){
        ctx.drawImage(this.img, this.position, 750, 200, 50);

        if(keys.ArrowLeft.pressed){
            this.position -= 24;
            if (this.position <= 0) this.position = 0;
        }

        else if(keys.ArrowRight.pressed){
            this.position += 24;
            if (this.position >= 1004) this.position = 1004;
        }
    }

}

export class Ball {
    constructor({img, position, started}){
        this.img = img;
        this.position = position;
        this.started = started;
        this.velocity = { x: 5, y: -5 };
        this.angle = 0;
    }

    draw(){
        ctx.save();
         
        ctx.translate(this.position.x + 25, this.position.y + 25);
        ctx.rotate(this.angle);

        ctx.drawImage(this.img, -25, -25, 50, 50); 
        ctx.restore();
    }

    move(){
        if (keys.Space.pressed && !this.started) {
            this.started = true;
            keys.Space.pressed = false; // Resetowanie klawisza po starcie
        }
    
        if (this.started) {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;

            this.angle += 0.2; // Dodaj stały obrót na klatkę
            if (this.angle > Math.PI * 2) {
                this.angle -= Math.PI * 2; // Utrzymuj kąt w granicach [0, 2π]
            }
    
            // Odbicia od ścian
            if (this.position.x <= 0 || this.position.x >= 1200 - 50) {
                this.velocity.x *= -1;
             //   this.velocity.y *= -1; 
            };

            if (this.position.y <= 0) {
                this.velocity.y *= -1;
            }
        }
        this.draw();
    }
}

export class Block {
    constructor({img, position}){
        this.img = img;
        this.position = position;
        this.isBroken = false;
    }

    draw(){
        if (!this.isBroken) {
            ctx.drawImage(this.img, this.position.x, this.position.y, 150, 150);
        }
    }
}


