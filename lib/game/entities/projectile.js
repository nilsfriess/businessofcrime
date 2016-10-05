ig.module(
    'game.entities.projectile'
)
    .requires(
    'impact.entity'
    )
    .defines(function () {

        EntityProjectile = ig.Entity.extend({

            size: { x: 8, y: 8 },
            maxVel: { x: 500, y: 500 },
            
            type: ig.Entity.TYPE.A,
            checkAgainst: ig.Entity.TYPE.B,
            collides: ig.Entity.COLLIDES.ACTIVE,
            
            
            animSheet: new ig.AnimationSheet('media/projectile.png', 8, 8),

            init: function (x, y, settings) {
                this.parent(x, y, settings);

                this.addAnim('idle', 1, [0]);

                var sound = new ig.Sound( 'media/gunshot.*' );
                sound.play();
            },

            update: function () {
                this.parent();
            },

            handleMovementTrace: function (res) {
                if (res.collision.y || res.collision.x)
                    this.kill();
                
                this.parent(res);
            },
            
            check: function( other ) {
                other.kill();
                this.kill();
            }
        });
    });