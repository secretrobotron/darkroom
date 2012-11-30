(function(){

  require(['input-canvas', 'render-canvas'], function(InputCanvas, RenderCanvas){

    var readFunction = function(){};

    var fileInput;
    var cover;

    function start(){
      var canvases = document.querySelector('.canvases');
      var inputContainers = document.querySelectorAll('div.canvas-container.input');
      var outputContainer = document.querySelector('div.canvas-container.output');
      var outputCanvas = outputContainer.querySelector('canvas');
      var reverseButton = document.querySelector('.reverse');
      var saveButton = document.querySelector('.save');
      var mainContainer = document.querySelector('div.main');
      var fileInput = document.querySelector('.file-input');
      var cover = document.querySelector('.cover');
      var currentInputCanvas;
      var afterDropFunction;
      var coverClick;

      function render(){
        renderCanvas.render(inputCanvas1, inputCanvas2, inputCanvas1.offset[0], inputCanvas1.offset[1], inputCanvas2.offset[0], inputCanvas2.offset[1]);
      }

      var inputCanvas1 = new InputCanvas(inputContainers[0], 'red', { onChange: render });
      var inputCanvas2 = new InputCanvas(inputContainers[1], 'blue', { onChange: render });
      var renderCanvas = new RenderCanvas(outputCanvas);

      currentInputCanvas = inputCanvas1;

      function afterDrop1(){
        inputContainers[0].classList.remove('top');
        inputContainers[0].classList.remove('empty');
        inputContainers[1].classList.add('top');
        inputContainers[1].classList.add('empty');
        currentInputCanvas = inputCanvas2;
        afterDropFunction = afterDrop2;
        inputCanvas1.deactivateMouseControls();
        inputCanvas2.activateMouseControls();
        cover.classList.add('dropped-1');
      }

      function afterDrop2(){
        inputContainers[1].classList.remove('empty');
        cover.removeEventListener('click', coverClick, false);
        cover.style.display = "none";
        document.querySelector('.photos').classList.add('disabled');
        document.querySelector('.move').classList.remove('disabled');
      }

      afterDropFunction = afterDrop1;
      inputCanvas1.activateMouseControls();

      reverseButton.addEventListener('click', function(e){
        if(inputCanvas1.colour === 'blue'){
          inputCanvas1.colour = 'red';
          inputCanvas2.colour = 'blue';
        }
        else {
          inputCanvas1.colour = 'blue';
          inputCanvas2.colour = 'red';
        }
        render();
      }, false);

      readFunction = function(file){
        var reader = new FileReader();
        reader.onload = function(e){
          var img = new Image();
          img.onload = function(){
            currentInputCanvas.setImage(img);
            afterDropFunction();
          };

          img.src = reader.result;
        };

        reader.readAsDataURL(file);
      };

      coverClick = function() {
        fileInput.click();
      }

      if ( cover ) {
        cover.addEventListener('click', coverClick, false);
      }

      fileInput.addEventListener('change', function(e){
        readFunction(e.target.files[0]);
      }, false);

      saveButton.addEventListener('click', function(e){
        var xhr = new XMLHttpRequest();
        var canvasDataURI = outputCanvas.toDataURL('image/jpeg');

        xhr.open('POST', '/save', true);
        xhr.onreadystatechange = function(e){
          if(e.target.readyState === 4){
            console.log(e.target.response);
          }
        };
        xhr.setRequestHeader('Content-Type', 'image/jpeg');
        xhr.send(canvasDataURI);
      }, false);

    }

    if(document.readyState === 'complete'){
      start();
    }
    else {
      document.onreadystatechange = start;
    }

    document.addEventListener('drop', function(e){
      e.preventDefault();
      e.stopPropagation();
      readFunction(e.dataTransfer.files[0]);
      return false;
    }, false);

    document.addEventListener('dragover', function(e){
      e.preventDefault();
      e.stopPropagation();
      e.dataTransfer.dropEffect = 'copy';
      return false;
    }, false);

  });

}());
