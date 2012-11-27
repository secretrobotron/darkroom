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
        renderCanvas.render(inputCanvas1, inputCanvas2, inputCanvas1.offset[0], inputCanvas1.offset[1], inputCanvas2.offset[0], inputCanvas2.offset[1]);
      }

      var inputCanvas1 = new InputCanvas(inputContainers[0], 'red', { onChange: canvasChangeHandler });
      var inputCanvas2 = new InputCanvas(inputContainers[1], 'blue', { onChange: canvasChangeHandler });
      var renderCanvas = new RenderCanvas(outputCanvas);

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
