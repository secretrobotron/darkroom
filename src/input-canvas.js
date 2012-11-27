define(['canvas'], function(Canvas){
  
  function InputCanvas(container, colour, options){
    options = options || {};

    var _onChange = options.onChange || function(){};
    var _onDrop = options.onDrop || function(){};
    var _currentImage;
    var _container = container;
    var _colour = colour;
    var _this = this;
    var _offset = [0, 0];

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

          _currentImage = document.createElement('canvas');
          var tempContext = _currentImage.getContext('2d');

          _currentImage.width = img.width;
          _currentImage.height = img.height;

          tempContext.drawImage(img, 0, 0);

          var imageData = tempContext.getImageData(0, 0, _currentImage.width, _currentImage.height);
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

          _container.appendChild(_currentImage);

          _onChange();

          _currentImage.addEventListener('mousedown', function(e){
            e.preventDefault();

            var originalMousePositionX = e.clientX;
            var originalMousePositionY = e.clientY;
            var originalCanvasPositionX = _currentImage.offsetLeft;
            var originalCanvasPositionY = _currentImage.offsetTop;

            function onMouseMove(e){
              e.preventDefault();
              _currentImage.style.left = originalCanvasPositionX - originalMousePositionX + e.clientX + 'px';
              _currentImage.style.top = originalCanvasPositionY - originalMousePositionY + e.clientY + 'px';
              _offset = [_currentImage.offsetLeft, _currentImage.offsetTop];
              _onChange();
            }

            function onMouseUp(e){
              window.removeEventListener('mousemove', onMouseMove, false);
              window.removeEventListener('mouseup', onMouseUp, false);
            }

            window.addEventListener('mousemove', onMouseMove, false);
            window.addEventListener('mouseup', onMouseUp, false);
          }, false);
        };

        img.src = reader.result;
        
        _onDrop();
      };
      reader.readAsDataURL(file);

      return false;
    }, false);

  }

  return InputCanvas;
});