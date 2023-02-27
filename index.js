
var player = document.getElementById('player');
var gameField = document.getElementById('game');
var scoreField = document.getElementById('score');
var highScoreField = document.getElementById('highscore');
var enemyHolder = document.getElementById('enemy-holder');

var score = 0;
var currVelocity = 1;
var running = true;
var highScore = 0;
var currSpeed = 1;

// var enemy = document.getElementById('enemy');

var Enemies = [];

var enemyIndex = 0;
var frameCount = 0;

var playerAttrs = {
    v: {
        x:0,
        y:0
    },
    a: {
        x:0,
        y:0
    },
    x: window.innerWidth/2,
    y: -window.innerHeight/2
}

document.addEventListener('keydown', (e) => {
    if (e.key == "a" || e.key == "ArrowLeft"){
        playerAttrs.v.x = -1;
    }
    else if (e.key == "d" || e.key == "ArrowRight"){
        playerAttrs.v.x = 1;
    }
    
    if (e.key == "w" || e.key == "ArrowUp"){
        playerAttrs.v.y = 1;
    
    } else if (e.key == "s" || e.key == "ArrowDown"){
        playerAttrs.v.y = -1;
    }
    
    if (e.key == " "){
        /*playerAttrs.v.y = 0;
        playerAttrs.v.x = 0;
        playerAttrs.x = window.innerWidth/2;
        playerAttrs.y = -window.innerHeight/2;
        Enemies = [];
        currVelocity = 1;
        score = 0;
        looping();*/
        //location.reload();
        restart();
    }

});


function collide(enemy, player){
    //in relation to enemy
    
    let collideLeft = false;
    let collideRight = false;
    let collideTop = false;
    let collideBot = false;

    if(enemy.x+40 >=  player.x && enemy.x < player.x){
        collideRight = true;
    }
    if(enemy.x <= player.x+20 && enemy.x+40 > player.x+20){
        collideLeft = true;
    }
    if(enemy.y-20 <= player.y+20 && enemy.y > player.y){
        collideBot = true;
    }
    if(enemy.y+20 >= player.y && enemy.y+20 < player.y+10){
        collideTop = true;       
    }
    
    return (collideTop || collideBot) && (collideLeft || collideRight);
}

function restart(){
    enemyHolder.innerHTML = "";
    playerAttrs = {
        v: {
            x:0,
            y:0
        },
        a: {
            x:0,
            y:0
        },
        x: window.innerWidth/2,
        y: -window.innerHeight/2
    }
    score = 0;
    currVelocity = 1;
    currSpeed = 1;
    
    Enemies = [];

    enemyIndex = 0;
    frameCount = 0;
    if (!running){
        window.requestAnimationFrame(looping);
    }
}

function createEnemy(){
    let enemy = document.createElement('div');
    enemy.id = `enemy-${enemyIndex++}`;
    enemy.classList.add('enemy-shown');
    let enemyObj = {
        elem:enemy,
        v:{
            x:1,
            y:1
        },
        x: Math.floor(Math.random() * (window.innerWidth-10)),
        y: -20
    }
    Enemies.push(enemyObj);
    enemyHolder.appendChild(enemy);
}

function looping(){
    running = true;
    if(playerAttrs.x <= 0 || playerAttrs.x >= window.innerWidth){
       playerAttrs.v.x = -(playerAttrs.v.x*1.05);
    } else if(playerAttrs.y >= 0 || playerAttrs.y <= -(window.innerHeight)){
       playerAttrs.v.y = -(playerAttrs.v.y*1.05);
    }
    
    if(frameCount % 60 == 0){
        score += 1;
        scoreField.innerHTML = `${score}`;
    }
    
    if(frameCount % 180 == 0){
        createEnemy();
        if(currVelocity <= 5){
            currVelocity+=0.25;
    
        }
    }
    if(frameCount % 360 == 0){
        frameCount = 0;
        if(currSpeed <= 5){
            currSpeed += 0.5;
        
        }
    }
    
    playerAttrs.x += playerAttrs.v.x*currSpeed;
    playerAttrs.y += playerAttrs.v.y*currSpeed;
    //playerAttrs.v.x += playerAttrs.a.x;
    //playerAttrs.v.y += playerAttrs.a.y;
    
    player.style.left = `${playerAttrs.x}px`;
    player.style.top = `${-playerAttrs.y}px`;
    
    for(const enemy of Enemies){
        
        if(collide(enemy, playerAttrs)){
            running = false;
            if (score > highScore){
                highScore = score;
                highScoreField.innerHTML = `Highscore: ${highScore}`;
            }
            
            break;
        }
        
        if(enemy.x <= 0 || enemy.x >= window.innerWidth){
            enemy.v.x = -(enemy.v.x);
        } else if(enemy.y >= 0 || enemy.y <= -(window.innerHeight)){
            enemy.v.y = -(enemy.v.y);
        }
        enemy.x += enemy.v.x * currVelocity;
        enemy.y += enemy.v.y * currVelocity;
        
        enemy.elem.style.left = `${enemy.x}px`;
        enemy.elem.style.top = `${-enemy.y}px`;
    }
    
    if (running){
        frameCount++;
        window.requestAnimationFrame(looping);
    }
}


window.requestAnimationFrame(looping);

