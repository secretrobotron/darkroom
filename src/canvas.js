define([], function(){
  
  function Canvas(container, canvas){
    var _this = this;

    var _container = container;

    var containerRect = container.getBoundingClientRect();

    Object.defineProperties(_this, {
      canvas: {
        enumerable: true,
        value: _canvas
      },
      container: {
        enumerable: true,
        value: _container
      },
      offsetX: {
        enumerable: true,
        get: function(){
          return _canvas.offsetLeft;
        }
      },
      offsetY: {
        enumerable: true,
        get: function(){
          return _canvas.offsetTop;
        }
      },
      focus: {
        enumerable: true,
        get: function(){
          return _container.classList.contains('top');
        },
        set: function(val){
          val ? _container.classList.add('top') : _container.classList.remove('top');
        }
      }
    });

  }

  return Canvas;

});