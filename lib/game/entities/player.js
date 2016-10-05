ig.module(
    'game.entities.player'
)
    .requires(
    'impact.entity',
    'game.entities.projectile'
    )
    .defines(function () {

        EntityPlayer = ig.Entity.extend({

            size: { x: 64, y: 64 },
            maxVel: { x: 10000, y: 10000 },

            animSheetNormal: new ig.AnimationSheet('media/player.png', 64, 64),
            animSheetUp: new ig.AnimationSheet('media/playerUp.png', 64, 64),
            animSheetDown: new ig.AnimationSheet('media/playerDown.png', 32, 32),
            
            cnt: 0,

            lastDirection: 'right',
            moving: false,

            init: function (x, y, settings) {
                this.parent(x, y, settings);

                this.anims.idleRight = new ig.Animation(this.animSheetNormal, 1, [0]);
                this.anims.runningRight = new ig.Animation(this.animSheetNormal, 0.1, [0, 1, 2, 3, 4, 5, 6, 7]);

                this.anims.idleUp = new ig.Animation(this.animSheetUp, 1, [0]);
                this.anims.runningUp = new ig.Animation(this.animSheetUp, 0.05, [0, 1, 2, 3, 4, 5, 6, 7]);

                this.anims.idleDown = new ig.Animation(this.animSheetDown, 1, [0]);
                this.anims.runningDown = new ig.Animation(this.animSheetDown, 0.1, [0, 1, 2, 3, 4, 5, 6, 7]);
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

                if (ig.input.state('shoot') && this.lastDirection == 'right' && ++this.cnt == 8) {
                    var projectile = ig.game.spawnEntity(EntityProjectile, this.pos.x + 60 - this.offset.x, this.pos.y + 36);
                    projectile.vel.x = 250;
                    projectile.vel.y = this.vel.y > 0 ? -250 :  this.vel.y < 0 ? 250 : 0;
                    this.cnt = 0;
                }

                if (ig.input.state('shoot') && this.lastDirection == 'left' && ++this.cnt == 8) {
                    var projectile = ig.game.spawnEntity(EntityProjectile, this.pos.x, this.pos.y + 36);
                    projectile.vel.x = -250;
                    projectile.vel.y = this.vel.y > 0 ? 250 : 0;
                    this.cnt = 0;
                }

                if (ig.input.state('shoot') && this.lastDirection == 'up' && ++this.cnt == 8) {
                    var projectile = ig.game.spawnEntity(EntityProjectile, this.pos.x + 40, this.pos.y + 20);
                    projectile.vel.y = -250;
                    this.cnt = 0;
                }

                if (ig.input.state('shoot') && this.lastDirection == 'down' && ++this.cnt == 8) {
                    var projectile = ig.game.spawnEntity(EntityProjectile, this.pos.x + 16, this.pos.y + 55);
                    projectile.vel.y = 250;
                    this.cnt = 0;
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