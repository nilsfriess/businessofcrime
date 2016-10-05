ig.module(
	'game.main'
)
	.requires(
	'impact.game',
	'impact.font',
	'game.levels.level1',
	'impact.debug.debug'
	)
	.defines(function () {

		MyGame = ig.Game.extend({

			// Load a font
			font: new ig.Font('media/04b03.font.png'),

			init: function () {
				ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
				ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
				ig.input.bind(ig.KEY.UP_ARROW, 'up');
				ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
				ig.input.bind(ig.KEY.SPACE, 'shoot');

				this.loadLevel(LevelLevel1);

			},

			update: function () {
				// Update all entities and backgroundMaps
				this.parent();

				var player = ig.game.getEntityByName('player');

				this.screen.x = player.pos.x - ig.system.width / 2 + player.size.x / 2;
				this.screen.y = player.pos.y - ig.system.height / 2 + player.size.y / 2;


				if (this.screen.x < 0) {
					this.screen.x = 0;
                }
				if (this.screen.x > 1280 - 480) {
					this.screen.x = 1280 - 480;
                }
				if (this.screen.y < 0) {
					this.screen.y = 0;
                }
				if (this.screen.y > 800 - 320) {
					this.screen.y = 800- 320;
                }

			},

			draw: function () {
				// Draw all entities and backgroundMaps
				this.parent();
			}
		});


		// Start the Game with 60fps, a resolution of 320x240, scaled
		// up by a factor of 2
		ig.main('#canvas', MyGame, 30, 480, 320, 2);

	});
