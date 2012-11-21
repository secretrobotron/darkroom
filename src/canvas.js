define([], function(){
  
  function Canvas(container, canvas){
    var _this = this;

    var _container = container;
    var _canvas = canvas;

    Object.defineProperties(_this, {
      canvas: {
        enumerable: true,
        value: _canvas
      },
      container: {
        enumerable: true,
        value: _container
      },
      offset: {
        enumerable: true,
        get: function(){
          return _canvas.offsetLeft;
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