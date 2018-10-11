(function(win, $){

    function RedCircle() {
        
    }
    RedCircle.prototype.create = function () {
        this.item = $('<div class="circle"></div>');
        return this;
    }

    function BlueCircle() {

    }
    BlueCircle.prototype.create = function () {
        this.item = $('<div class="circle" style="background: cornflowerblue;"></div>');
        return this;
    };

    var CircleFactory = function () {

        // store for types
        this.types = {};
        this.create = function (type) {
            return new this.types[type]().create();
        };

        this.register = function (type, classPrototype) {
            // Some kind of interface - checking if this object is what we expecting
            if (classPrototype.prototype.create) {
                this.types[type] = classPrototype;
            } else {
                throw new Error('classPrototype of ' + classPrototype + ' does not have create method');
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
            // Register items in the factory
            _cf.register('red', RedCircle);
            _cf.register('cornflowerblue', BlueCircle);

			function _position(circle, left, top) {
                circle.css('left', left);
                circle.css('top', top);
            }
			
			function create(left, top, type) {
			    // Ask Factory to create a circle
                var circle = _cf.create(type).item;
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