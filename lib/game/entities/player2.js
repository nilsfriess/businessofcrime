ig.module(
    'game.entities.player2'
)
    .requires(
    'impact.entity',
    'game.entities.projectile'
    )
    .defines(function () {

        EntityPlayer2 = ig.Entity.extend({

            size: { x: 41, y: 36 },
            maxVel: { x: 10000, y: 10000 },

            animSheet: new ig.AnimationSheet('media/MainGuySpriteSheet.png', 41, 36),

            lastDirection: 'right',
            moving: false,

            init: function (x, y, settings) {
                this.parent(x, y, settings);
                
                this.addAnim( 'idleRight', 1, [3] );
                this.addAnim( 'runningRight', 0.1, [3,4,5] );
                this.addAnim( 'idleUp', 0.1, [6] );
                this.addAnim( 'runningUp', 1, [6,7,8] );
                this.addAnim( 'idleDown', 1, [0] );
                this.addAnim( 'runningDown', 0.1, [0,1,2] );
                
                this.currentAnim = this.anims.idleRight;
            },

            update: function () {
                this.parent();

                this.moving = false;

                if (ig.input.state('right')) {
                    this.currentAnim = this.anims.runningRight;
                    this.currentAnim.flip.x = false;
                    this.lastDirection = 'right';
                    this.vel.x = 120;
                    this.moving = true;
                } else if (ig.input.state('left')) {
                    this.currentAnim = this.anims.runningRight;
                    this.currentAnim.flip.x = true;
                    this.lastDirection = 'left';
                    this.vel.x = -120;
                    this.moving = true;
                } else {
                    this.vel.x = 0;
                }

                if (ig.input.state('up')) {
                    this.currentAnim = this.anims.runningUp;
                    this.lastDirection = 'up';
                    this.vel.y = -120;
                    this.moving = true;
                } else if (ig.input.state('down')) {
                    this.currentAnim = this.anims.runningDown;
                    this.lastDirection = 'down';
                    this.vel.y = 120;
                    this.moving = true;
                } else {
                    this.vel.y = 0;
                }

                if (!this.moving) {
                    this.vel.x = 0;
                    this.vel.y = 0;

                    switch (this.lastDirection) {
                        case 'right':
                            this.currentAnim = this.anims.idleRight;
                            this.currentAnim.flip.x = false;
                            break;
                        case 'left':
                            this.currentAnim = this.anims.idleRight;
                            this.currentAnim.flip.x = true;
                            break;
                        case 'up':
                            this.currentAnim = this.anims.idleUp;
                            break;
                        case 'down':
                            this.currentAnim = this.anims.idleDown;
                            break;
                        default:
                            this.currentAnim = this.anims.idleRight;
                            break;
                    }
                }
            }
        });
    });