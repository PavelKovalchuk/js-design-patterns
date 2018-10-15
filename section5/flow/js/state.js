(function(win, $){
	function clone(src,out){
		for(var attr in src.prototype){
			out.prototype[attr] = src.prototype[attr];
		}
	}
	function Circle(){
		
		this.item = $('<div class="circle"></div>');

	}
	Circle.prototype.color = function(clr){
		this.item.css('background', clr);
	}
	
	Circle.prototype.move = function(left, top){
				this.item.css('left',left);
				this.item.css('top',top);
	};

	Circle.prototype.get = function(){
		return this.item;
	};

    Circle.prototype.getID = function(){
        return this.id;
    };

    Circle.prototype.setID = function(id){
        this.id = id;
    };
    
    Circle.prototype.next = function (shp) {
		if (shp) {
			this.nextShape = shp;
		}
		return this.nextShape;
    }
    
    Circle.prototype.chainDo = function (action, args, count) {
		this[action].apply(this, args);

		if(count && this.nextShape) {
			setTimeout(binderProxy(this, function () {
                this.nextShape.chainDo(action, args, --count);
            }), 100);
		}
    }

	function Rect(){
		this.item = $('<div class="rect"></div>');
	}
	clone(Circle, Rect);
	
	function binderProxy(scope, fun) {
		return function () {
			// arguments are the parameters of returned function
			return fun.apply(scope, arguments);
        }
    }
	
	function shapeFacade(shp) {
		return {
			color: binderProxy(shp, shp.color),
			move: binderProxy(shp, shp.move),
			// shp is a scope
            getID: binderProxy(shp, shp.getID),
		};
    }

	function selfDestructDecorator(obj){
		obj.item.click(function(){
			obj.kill();
		});
		obj.kill = function(){
			obj.item.remove();
		};
	}

	function eventDispatcherDecorator(obj) {

		var list = {};
		obj.addEvent = function (type, listener) {
			if (!list[type]) {
                list[type] = [];
			}
			if (list[type].indexOf(listener) === -1) {
                list[type].push(listener);
			}
        };
		obj.removeEvent = function (type, listener) {
			var listArr = list[type];
			if (listArr) {
				var index = listArr.indexOf(listener);
				if (index > -1) {
					listArr.splice(index, 1);
				}
			}
        };
		obj.dispatchEvent = function (event) {
			console.log('dispatchEvent list', list);
			var aList = list[event.type];
			if (aList) {
				if (!event.target) {
					event.target = this;
				}
				for (var index in aList) {
					aList[index](event);
				}
			}
        }

    }
    var obj = {};
	var fun = function (event) {
        console.log('fun: event: ', event);
        console.log('it is completely over!');
    };
    var fun2 = function () {
        console.log('it is 2 completely over!');
    };
	eventDispatcherDecorator(obj);
	obj.addEvent('over', function () {
		console.log('it is over!');
    });
    obj.addEvent('over', fun);
    obj.addEvent('over', fun2);
    obj.removeEvent('over', fun2);

	obj.dispatchEvent({type: 'over'});


	function RedCircleBuilder(){
		this.item = new Circle();
		this.init();
	}
	RedCircleBuilder.prototype.init = function() {
		//NOTHING
	};

	RedCircleBuilder.prototype.get = function() {
		return this.item;
	};

	
	function BlueCircleBuilder(){
		this.item = new Circle();

		this.init();
	}

	BlueCircleBuilder.prototype.init = function() {
		this.item.color("blue");

		var rect = new Rect();
				rect.color("yellow");
				rect.move(40,40);
				selfDestructDecorator(rect);
		this.item.get().append(rect.get());
	}; 
	BlueCircleBuilder.prototype.get = function() {
		return this.item;
	};	

	ShapeFactory = function(){
        this.types = {};
        this.create = function(type){
            return new this.types[type]().get();
        };

        this.register = function(type, cls){
            if(cls.prototype.init && cls.prototype.get){
                this.types[type] = cls;
            }
        }
	};

	function Stage(id){
		this.index = 0;
		this.context = $(id);
		this.SIG = 'stageItem_';
	}

	Stage.prototype.add = function (item){
		++this.index;
		item.addClass(this.SIG + this.index);
		this.context.append(item);
	};

	Stage.prototype.remove = function(index){
		this.context.remove('.' + this.SIG + index);
	}

	function CompositeController(a){
		this.a = a;
	}

	CompositeController.prototype.action = function (act){
		var args = Array.prototype.slice.call(arguments);
				args.shift();
		for(var item in this.a){
			this.a[item][act].apply(this.a[item],args);
		}
	};

	function flyWeightFader(item) {
		if (item.hasClass('circle')) {
			item.fadeTo(0.5, item.css('opacity') * 0.5);
		}
    }


	var CircleGeneratorSingleton = (function(){
		var instance;

		function init(){
			var _aCircle = [],
					_stage,
					_sf = new ShapeFactory(),
					_cc = new CompositeController(_aCircle);

			function _position(circle, left, top){
				circle.move(left, top);
			}
			function registerShape(name,cls){
				_sf.register(name, cls);
			}
			function setStage(stg){
				_stage = stg;
			}

			function create(left, top,type){
				var circle = _sf.create(type);
				var index = _aCircle.length - 1;
				circle.move(left, top);
                circle.setID(_aCircle.length);
                _aCircle.push(circle);

                if (index !== -1) {
                	_aCircle[index].next(circle);
				}

				return shapeFacade(circle);
			}
			
			function chainTint(count) {
				var index = Math.max(0, _aCircle.length - count);
				var clr = "#" +
							Math.floor(Math.random() * 255).toString(16)
							+ Math.floor(Math.random() * 255).toString(16)
							+ Math.floor(Math.random() * 255).toString(16);
				_aCircle[index].chainDo('color', [clr], count);
            }

			function tint(clr){
				_cc.action('color',clr);
			}

			function move(left, top){
				_cc.action('move',left, top);
			}

			function add(circle){
				_stage.add(_aCircle[circle.getID()].get());
			}

			function index(){
				return _aCircle.length;
			}

			return {
				index:index,
                create:create,
                add:add,
                register:registerShape,
                setStage:setStage,
                tint:tint,
                move:move,
                chainTint:chainTint,
			};
		}

		return {
			getInstance: function(){
				if(!instance){
					instance = init();
				}

				return instance;
			}
		}

	})();

    function RedState(obj){
        var on = 'red',
            off = 'rgba(255,0,0,.25)',
            _nextState;

        this.nextState= function (ns){
            _nextState = ns;
        };

        this.start = function(){
            obj.color(on);
            setTimeout(binderProxy(_nextState,_nextState.start),1000);
            setTimeout(function(){
                obj.color(off);
            },3000);

        };
    }

    function YellowState(obj){
        var on = 'yellow',
            off = 'rgba(255,255,0,.25)',
            _nextState;

        this.nextState= function (ns){
            _nextState = ns;
        };

        this.start = function(){
            obj.color(on);
            setTimeout(function(){
                obj.color(off);
                _nextState.start();
            },2000);

        };
    }

    function GreenState(obj){
        var on = 'green',
            off = 'rgba(0,255,0,.25)',
            _nextState;


        this.nextState= function (ns){
            _nextState = ns;
        };

        this.start = function(){
            obj.color(on);
            setTimeout(function(){
                obj.color(off);
                _nextState.start();
            },4000);

        };
    }

    $(win.document).ready(function(){
        var cg = CircleGeneratorSingleton.getInstance();
        cg.register('circle', RedCircleBuilder);
        cg.setStage(new Stage('.advert'));

        var red = cg.create(400,250,'circle');
        cg.add(red);

        var yellow = cg.create(400,325,'circle');
        yellow.color('rgba(255,255,0,.25)');
        cg.add(yellow);

        var green = cg.create(400,400,'circle');
        green.color('rgba(0,255,0,.25)');
        cg.add(green);

        var rs = new RedState(red),
            ys = new YellowState(yellow),
            gs = new GreenState(green);

        rs.nextState(ys);
        ys.nextState(gs);
        gs.nextState(rs);

        rs.start();


    });

})(window, jQuery);