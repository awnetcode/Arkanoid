export const containerElement = document.getElementById('container');

export const gameBoardElement = document.querySelector("#game-board");
export const ctx = gameBoardElement.getContext('2d');

export const backgroundImage = new Image();
backgroundImage.src = '/assets/cosmic.webp';

export const platformImage = new Image();
platformImage.src = '/assets/arkanoid-pad.png';

export const ballImage = new Image();
ballImage.src = '/assets/green-shiny.png';

export class Platform {
    constructor({img, position}){
        this.img = img;
        this.position = position;
        this.state = 'idle';
    }

    draw(){
        ctx.drawImage(this.img, this.position, 750, 200, 50);
    }

    move(){
        
    }
}


