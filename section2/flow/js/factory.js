(function(win, $){

	var RedCircle = function () {
        this.item = $('<div class="circle"></div>');
    };

    var BlueCircle = function () {
        this.item = $('<div class="circle" style="background: cornflowerblue;"></div>');
    };

    var CircleFactory = function () {

        this.create = function (color) {
            if(color == 'cornflowerblue') {
                return new BlueCircle();
            }else {
                return new RedCircle();
            }
        }
    };
	
	var CircleGeneratorSingleton = (function () {

		var instance;

		function init() {
			var _aCircle = [],
                _stage = $('.advert');
			// Reference to the Factory
            var _cf = new CircleFactory();

			function _position(circle, left, top) {
                circle.css('left', left);
                circle.css('top', top);
            }
			
			function create(left, top, color) {
			    // Ask Factory to create a circle
                var circle = _cf.create(color).item;
                _position(circle, left, top);
                return circle;
            }

            function add(circle) {
				_stage.append(circle);
				_aCircle.push(circle);
            }
            
            function index() {
				return _aCircle.length;
            }

			return {
                create: create,
				add: add,
				index: index,
			};
        }
        
        return {
			getInstance: function () {
				if (!instance) {
					instance = init();
				}
				return instance;
            }
		}

    })();

	$(win.document).ready(function(){
		$('.advert').click(function(e){
			var cg = CircleGeneratorSingleton.getInstance();
			var circle = cg.create(e.pageX-25, e.pageY-25, "red");
			cg.add(circle);
		});

        $(document).keypress(function(e){
            if(e.key=='a'){
                var cg = CircleGeneratorSingleton.getInstance();
                var circle = cg.create(
                	Math.floor(Math.random()*600),
                    Math.floor(Math.random()*600),
                    "cornflowerblue"
				);

                cg.add(circle);
            }
        });

	});

})(window, jQuery);