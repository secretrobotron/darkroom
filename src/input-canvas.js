define([], function(){
  
  function InputCanvas(container, colour, options){
    options = options || {};

    var _onChange = options.onChange || function(){};
    var _renderCanvas = document.createElement('canvas');
    var _container = container;
    var _colour = colour;
    var _this = this;
    var _offset = [0, 0];

    function render(image){
      var tempContext = _renderCanvas.getContext('2d');

      _renderCanvas.width = image.width;
      _renderCanvas.height = image.height;

      tempContext.drawImage(image, 0, 0);

      var imageData = tempContext.getImageData(0, 0, _renderCanvas.width, _renderCanvas.height);
      var pixels = imageData.data;
      var i, l;
      if(_colour === 'red'){
        for(i = 0, l = pixels.length; i < l; i+=4){
          pixels[i+1] = pixels[i+2] = 0;
        }
      }
      else {
        for(i = 0, l = pixels.length; i < l; i+=4){
          pixels[i] = 0;
        }
      }
      tempContext.putImageData(imageData, 0, 0);
    }

    _container.addEventListener('dragover', function(e){
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
      return false;
    }, false);

    _container.addEventListener('drop', function(e){
      e.preventDefault();
      e.stopPropagation();

      var file = e.dataTransfer.files[0];

      var reader = new FileReader();
      reader.onload = function(e){
        var img = new Image();
        img.onload = function(){
          _container.innerHTML = '';

          _sourceImage = img;
          _renderCanvas = document.createElement('canvas');
          render(img);
          _container.appendChild(_renderCanvas);

          _onChange();
        };

        img.src = reader.result;
      };
      reader.readAsDataURL(file);

      return false;
    }, false);

    _container.addEventListener('mousedown', function(e){
      e.preventDefault();

      var originalMousePositionX = e.clientX;
      var originalMousePositionY = e.clientY;
      var originalCanvasPositionX = _renderCanvas.offsetLeft;
      var originalCanvasPositionY = _renderCanvas.offsetTop;

      function onMouseMove(e){
        e.preventDefault();
        _renderCanvas.style.left = originalCanvasPositionX - originalMousePositionX + e.clientX + 'px';
        _renderCanvas.style.top = originalCanvasPositionY - originalMousePositionY + e.clientY + 'px';
        _offset = [_renderCanvas.offsetLeft, _renderCanvas.offsetTop];
        _onChange();
      }

      function onMouseUp(e){
        window.removeEventListener('mousemove', onMouseMove, false);
        window.removeEventListener('mouseup', onMouseUp, false);
      }

      window.addEventListener('mousemove', onMouseMove, false);
      window.addEventListener('mouseup', onMouseUp, false);
    }, false);

    this.getImageData = function(){
      return _renderCanvas ? _renderCanvas.getContext('2d').getImageData(0, 0, _renderCanvas.width, _renderCanvas.height) : {data:[]};
    };

    Object.defineProperties(this, {
      canvas: {
        get: function(){
          return _renderCanvas;
        }
      },
      width: {
        get: function(){
          return _renderCanvas.width;
        }
      },
      height: {
        get: function(){
          return _renderCanvas.height;
        }
      },
      offset: {
        get: function(){
          return _offset;
        }
      },
      colour: {
        get: function(){
          return _colour;
        },
        set: function(colour){
          _colour = colour;
          render();
          _onChange();
        }
      }
    });

  }

  return InputCanvas;
});