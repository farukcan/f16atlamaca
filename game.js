/**
 * Created by can on 25.07.2016.
 */
var game = new Phaser.Game(800, 800, Phaser.AUTO, '', { preload: preload, create: create, update: update,render: render });

function preload() {

    game.load.image('f16', 'img/f16.png');
    game.load.spritesheet('dude', 'img/dude.png', 32, 48);

}
var facing = 'left';
var f16lar = [];
var zip = false;
function create() {
    text = game.add.text(0, 0, " f16ya atlamaca", { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" });


    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#000000';


    game.physics.arcade.gravity.y = 120;

    player = game.add.sprite(32, 32, 'dude');
    game.physics.enable(player, Phaser.Physics.ARCADE);

    //player.body.bounce.y = 0.2;
    player.body.collideWorldBounds = true;
    player.body.setSize(20, 32, 5, 16);

    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('turn', [4], 20, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    game.camera.follow(player);

    player.body.onCollide = new Phaser.Signal();
    player.body.onCollide.add(col, this);


    for(var i=0;i<7;i++){
        var f16 = game.add.sprite(i*100+Math.random()*300, 0, 'f16');
        game.physics.enable(f16, Phaser.Physics.ARCADE);
        f16.body.collideWorldBounds = true;
        //f16.body.bounce.set(0.8);
        f16.body.allowRotation = true;
        f16lar.push(f16);
    }





    start = game.time.now;

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


}


function col(sprite1, sprite2){
    zip = true;
}

function update() {
    skor = Math.floor((game.time.now-start)/10);
    text.setText(" f16ya atlamaca -- skorunuz : "+ skor);

    f16lar.forEach(function(f16,i){

        f16.body.y = 650-i*120+Math.random()*3;
        f16.body.velocity.x = 200+Math.random()*100;

        if(f16.body.x > 699)
            f16.body.x = 0;

    });
    if(player.body.onFloor()){
        player.body.y = 32;
        start = game.time.now;
    }


    game.physics.arcade.collide(f16lar, player);
    if (cursors.left.isDown)
    {
        player.body.velocity.x = -200;

        if (facing != 'left')
        {
            player.animations.play('left');
            facing = 'left';
        }
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 200;

        if (facing != 'right')
        {
            player.animations.play('right');
            facing = 'right';
        }
    }
    else
    {
        if (facing != 'idle')
        {
            player.animations.stop();

            if (facing == 'left')
            {
                player.frame = 0;
            }
            else
            {
                player.frame = 5;
            }

            facing = 'idle';
        }
    }

    if (jumpButton.isDown && zip)
    {
        player.body.velocity.y = -250;
    }
    zip = false;
}

function render() {

}