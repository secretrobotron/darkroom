(function(){
  
  require(['input-canvas', 'render-canvas'], function(InputCanvas, RenderCanvas){

    function start(){
      var inputContainers = document.querySelectorAll('div.canvas-container.input');
      var outputContainer = document.querySelector('div.canvas-container.output');
      var outputCanvas = outputContainer.querySelector('canvas');
      var controls = document.querySelectorAll('div.controls > ul > li');
      var mainContainer = document.querySelector('div.main');

      controls[0].classList.add('on');

      //debugging
      if(window.location.search.indexOf('debug') > -1){
        mainContainer.classList.add('debug');
      }

      function canvasChangeHandler(){
        var ctx = outputCanvas.getContext('2d');
        outputCanvas.width = 1080;
        outputCanvas.height = 720;

        console.log(inputCanvas1.offset);
        console.log(inputCanvas2.offset);

        var imageData1 = inputCanvas1.getImageData();
        var imageData2 = inputCanvas2.getImageData();

        ctx.clearRect(0, 0, outputCanvas.width, outputCanvas.height);

        var imageData = ctx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
        var pixels = imageData.data;
        var pixels1 = imageData1.data;
        var pixels2 = imageData2.data;
        for(var i = 0, l = pixels.length; i < l; i+=4){
          pixels[i] = pixels1[i];
          pixels[i+1] = pixels2[i+1];
          pixels[i+2] = pixels2[i+2];
          pixels[i+3] = 255;
        }

        ctx.putImageData(imageData, 0, 0);
      }

      var inputCanvas1 = new InputCanvas(inputContainers[0], 'red', { onChange: canvasChangeHandler });
      var inputCanvas2 = new InputCanvas(inputContainers[1], 'blue', { onChange: canvasChangeHandler });

      // var inputCanvas1 = new InputCanvas(inputContainers[0], 'blue');
      // var inputCanvas2 = new InputCanvas(inputContainers[1], 'red');

      Array.prototype.forEach.call(inputContainers, function(inputContainer, index){
        controls[index].addEventListener('click', function(e){
          e.preventDefault();
          inputContainers[index].classList.add('top');
          inputContainers[(index + 1) % 2].classList.remove('top');
          controls[index].classList.add('on');
          controls[(index + 1) % 2].classList.remove('on');
          controls[2].classList.remove('on');
        }, false);
      });

    }

    if(document.readyState === 'complete'){
      start();
    }
    else {
      document.addEventListener('DOMContentLoaded', start, false);  
    }

  });

}());