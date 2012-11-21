define(['canvas'], function(Canvas){
  
  function InputCanvas(container, canvas, options){
    options = options || {};

    Canvas.call(this, container, canvas);

    var _onChange = options.onChange || function(){};
    var _onDrop = options.onDrop || function(){};
    var _this = this;
    var _canvas = canvas;

    this.canvas.addEventListener('drop', function(e){
      e.preventDefault();
      e.stopPropagation();

      var file = e.dataTransfer.files[0];

      var canvasWidth = _canvas.width;
      var canvasHeight = _canvas.height;

      var reader = new FileReader();
      reader.onload = function(e){
        var img = new Image();
        img.onload = function(){
          var aspectRatio = img.height / img.width;
          _canvas.getContext('2d').drawImage(img, 0, 0, canvasWidth, canvasHeight * aspectRatio);
          _onChange();
        };
        img.src = reader.result;
        _onDrop();
      };
      reader.readAsDataURL(file);

      return false;
    }, false);

    this.canvas.addEventListener('mousedown', function(e){
      e.preventDefault();

      var originalMousePositionX = e.clientX;
      var originalMousePositionY = e.clientY;
      var originalCanvasPositionX = _canvas.offsetLeft;
      var originalCanvasPositionY = _canvas.offsetTop;

      function onMouseMove(e){
        _canvas.style.left = originalCanvasPositionX - originalMousePositionX + e.clientX + 'px';
        _canvas.style.top = originalCanvasPositionY - originalMousePositionY + e.clientY + 'px';
        _onChange();
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

  InputCanvas.prototype.renderTinted = function(colour){
    var tempCanvas = document.createElement('canvas');
    var tempContext = tempCanvas.getContext('2d');

    tempCanvas.width = this.canvas.width;
    tempCanvas.height = this.canvas.height;

    tempContext.drawImage(this.canvas, 0, 0);

    tempContext.globalCompositeOperation = 'destination-atop';
    tempContext.globalAlpha = 0.5;

    tempContext.fillStyle = colour;
    tempContext.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    return tempCanvas;
  };

  return InputCanvas;
});