ig.module(
    'game.entities.zombie'
)
    .requires(
    'impact.entity'
    )
    .defines(function () {

        EntityZombie = ig.Entity.extend({

            size: { x: 64, y: 64 },
            maxVel: { x: 10000, y: 10000 },

            animSheet: new ig.AnimationSheet('media/spritesheet.png', 64, 77),
            
            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.PASSIVE,

            lastDirection: {x: null, y: null},

            init: function (x, y, settings) {
                this.parent(x, y, settings);

                this.anims.running = new ig.Animation(this.animSheet, 0.05, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
                this.currentAnim = this.anims.running;

                this.vel.x = 80;
                this.lastDirection.x = 'right';
                this.lastDirection.y = 'down';
            },

            update: function () {
                this.parent();


            },

            handleMovementTrace: function (res) {
                if (res.collision.x) {
                    this.vel.y = Math.random() >= 0.5 ? 80 : -80;
                    this.vel.x = 0;
                }

                if (res.collision.y) {
                    this.vel.x = Math.random() >= 0.5 ? 80 : -80;
                    this.vel.y = 0;
                }

                this.parent(res);
            }
        });
    });