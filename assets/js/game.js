'use strict';
var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');

//Carregar imagens
var fish = new Image();
var bg = new Image();
var fg = new Image();
var obstacleNorth = new Image();
var obstacleSouth = new Image();

fish.src = './img/peixee.png';
bg.src = './img/fundoo.png';
// fg.src = './'
obstacleNorth.src = './img/agua-viva.png';
obstacleSouth.src = './img/pilastra.png';

//Algumas variáveis
var gap = 85;
var constant;
var bX = 10;
var bY = 150;
var gravity = 1.5;
var score = 0;

//Arquivos de áudio
var swim = new Audio;
var scor = new Audio;
// swim.src = '';
// scor.src = '';

//Movimentos
document.addEventListener('keydown', moveUp);
function moveUp(){
    bY -= 25;
    // swim.play();
}

//Coordenadas dos obstáculos
var obstacle = [];
obstacle[0] = {
    x: cvs.width,
    y: 0,
}

//Aparecer imagens
function draw(){
    ctx.drawImage(bg, 0, 0);
    for (var i = 0; i < obstacle.length; i++){
        constant = obstacleNorth.height = gap;
        ctx.drawImage(obstacleNorth, obstacle[i].x, obstacle[i].y);
        ctx.drawImage(obstacleSouth, obstacle[i].x, obstacle[i].y + constant);
        obstacle[i].x--;
        if(obstacle[i].x == 125){
            obstacle.push({
                x: cvs.width,
                y: Math.floor(Math.random() * obstacleNorth.height) - obstacleNorth.height, 
            });
        }

        //Detectar colisão
        if(
            (bX + fish.width >= obstacle[i].x && bX <= obstacle[i].x + obstacleNorth.width && (bY <= obstacle[i].y + obstacleNorth.height || bY + fish.height >= obstacle[i].y + constant)) || bY + fish.height >= cvs.height - fg.height
        ){
            location.reload(); //Recarregar a página
        }

        if(obstacle[i].x == 5){
            score++;
            // scor.play()/
        }
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(fish, bX, bY);
    bY += gravity;
    ctx.fillStyle = '#000';
    ctx.font = '20px Verdana';
    ctx.fillText('Score: ' + score, 10, cvs.height - 20);
    requestAnimationFrame(draw);
}
draw();