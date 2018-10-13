(function(win, $){

    function Circle() {
        this.item = $('<div class="circle"></div>');
    }

    Circle.prototype.move = function(left, top) {
        this.item.css('left', left);
        this.item.css('top', top);
    };
    Circle.prototype.color = function (color) {
        this.item.css("background", color);
    }
    Circle.prototype.get = function () {
        return this.item;
    }


    // Builder
    function RedCircleBuilder() {
        // creation
        this.item = new Circle();
        this.init();
    }
    RedCircleBuilder.prototype.init = function () {
        // NOTHING
    }
    RedCircleBuilder.prototype.get = function () {
        return this.item;
    }

    function BlueCircleBuilder() {
        this.item = new Circle();
        this.init();
    }
    BlueCircleBuilder.prototype.init = function () {
        this.item.color("cornflowerblue");
    };
    BlueCircleBuilder.prototype.get = function () {
        return this.item;
    }

    var CircleFactory = function () {

        // store for types
        this.types = {};
        this.create = function (type) {
            return new this.types[type]();
        };

        // Register builders
        this.register = function (type, constructorName) {
            // Some kind of interface - checking if this object is what we expecting
            if (constructorName.prototype.init && constructorName.prototype.get) {
                this.types[type] = constructorName;
            } else {
                throw new Error('classPrototype of ' + constructorName + ' does not have create method');
            }
            console.log('this.register this.types: ', this.types);
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
            _cf.register('red', RedCircleBuilder);
            _cf.register('cornflowerblue', BlueCircleBuilder);

            function _position(circle, left, top) {
                circle.move(left, top);
            }

            function create(left, top, type) {
                // Ask Factory to create a circle
                var circle = _cf.create(type).get();
                _position(circle, left, top);
                return circle;
            }

            function add(circle) {
                _stage.append(circle.get());
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