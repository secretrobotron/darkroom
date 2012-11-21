define(['canvas'], function(Canvas){
  
  function InputCanvas(container, canvas, options){
    options = options || {};

    Canvas.call(this, container, canvas);

    var _onChange = options.onChange || function(){};
    var _this = this;

    this.canvas.addEventListener('dragover', function(e){
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
      return false;
    }, false);

    this.canvas.addEventListener('drop', function(e){
      e.preventDefault();
      e.stopPropagation();

      var file = e.dataTransfer.files[0];

      var reader = new FileReader();
      reader.onload = function(e){
        var img = new Image();
        img.onload = function(){
          var aspectRatio = img.height / img.width;
          _canvas.getContext('2d').drawImage(img, 0, 0, _this.canvas.width, _this.canvas.height * aspectRatio);
          _onDrop(_this);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }, false);

    this.canvas.addEventListener('mousedown', function(e){
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

  }

  InputCanvas.prototype = Object.create(Canvas.prototype);

  return InputCanvas;
});