define([], function(){
  
  function InputCanvas(options){
    options = options || {};

    var _inputElement = this.inputElement = document.createElement('div');
    var _canvas = this.canvas = document.createElement('canvas');

    var _onAdjust = options.onAdjust || function(){};
    var _onDrop = options.onDrop || function(){};
    var _this = this;

    _inputElement.appendChild(_canvas);

    _inputElement.classList.add('input-canvas');

    _inputElement.addEventListener('dragover', function(e){
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
      return false;
    }, false);

    _inputElement.addEventListener('drop', function(e){
      e.preventDefault();
      e.stopPropagation();

      var file = e.dataTransfer.files[0];

      var reader = new FileReader();
      reader.onload = function(e){
        var img = new Image();
        img.onload = function(){
          var aspectRatio = img.height / img.width;
          _canvas.getContext('2d').drawImage(img, 0, 0, _canvas.width, _canvas.height * aspectRatio);
          _onDrop(_this);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }, false);

    _canvas.addEventListener('mousedown', function(e){
      var originalMousePosition = e.clientX;
      var originalCanvasPosition = _canvas.offsetLeft;

      function onMouseMove(e){
        _canvas.style.left = originalCanvasPosition - originalMousePosition + e.clientX + 'px';
        _onAdjust(_this);
      }

      function onMouseUp(e){
        window.removeEventListener('mousemove', onMouseMove, false);
        window.removeEventListener('mouseup', onMouseUp, false);
      }

      window.addEventListener('mousemove', onMouseMove, false);
      window.addEventListener('mouseup', onMouseUp, false);
    }, false);

    Object.defineProperties(_this, {
      offset: {
        get: function(){
          return _canvas.offsetLeft;
        }
      }
    });
  }

  return InputCanvas;
});