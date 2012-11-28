(function(){
  
  require(['input-canvas', 'render-canvas'], function(InputCanvas, RenderCanvas){

    var dropFunction = function(){};

    function start(){
      var inputContainers = document.querySelectorAll('div.canvas-container.input');
      var outputContainer = document.querySelector('div.canvas-container.output');
      var outputCanvas = outputContainer.querySelector('canvas');
      var reverseButton = document.querySelector('.reverse');
      var mainContainer = document.querySelector('div.main');
      var currentInputCanvas;
      var afterDropFunction;

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
      }

      function afterDrop2(){
        inputContainers[1].classList.remove('empty');
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

      dropFunction = function(e){
        var file = e.dataTransfer.files[0];

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
      dropFunction(e);
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
