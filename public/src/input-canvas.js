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
          _offset = [0, 0];
          _container.innerHTML = '';

          _sourceImage = img;
          render(img);
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
      var originalOffset = _offset.slice();

      function onMouseMove(e){
        e.preventDefault();
        _offset[0] = originalOffset[0] - originalMousePositionX + e.clientX;
        _offset[1] = originalOffset[1] - originalMousePositionY + e.clientY;
        _onChange();
      }

      function onMouseUp(e){
        window.removeEventListener('mousemove', onMouseMove, false);
        window.removeEventListener('mouseup', onMouseUp, false);
      }

      window.addEventListener('mousemove', onMouseMove, false);
      window.addEventListener('mouseup', onMouseUp, false);
    }, false);

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