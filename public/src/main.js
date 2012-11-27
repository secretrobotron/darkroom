(function(){
  
  require(['input-canvas', 'render-canvas'], function(InputCanvas, RenderCanvas){

    function start(){
      var inputContainers = document.querySelectorAll('div.canvas-container.input');
      var outputContainer = document.querySelector('div.canvas-container.output');
      var outputCanvas = outputContainer.querySelector('canvas');
      var reverse = document.querySelector('.reverse');
      var mainContainer = document.querySelector('div.main');

      var order = 0;

      //debugging
      if(window.location.search.indexOf('debug') > -1){
        mainContainer.classList.add('debug');
      }

      function render(){
        var canvas1 = order === 0 ? inputCanvas1 : inputCanvas2;
        var canvas2 = order === 0 ? inputCanvas2 : inputCanvas1;
        renderCanvas.render(canvas1, canvas2, canvas1.offset[0], canvas1.offset[1], canvas2.offset[0], canvas2.offset[1]);
      }

      var inputCanvas1 = new InputCanvas(inputContainers[0], 'red', { onChange: render });
      var inputCanvas2 = new InputCanvas(inputContainers[1], 'blue', { onChange: render });
      var renderCanvas = new RenderCanvas(outputCanvas);

      inputContainers[0].addEventListener('drop', function(e){
       inputContainers[0].classList.remove('top');
       inputContainers[0].classList.remove('empty');
       inputContainers[1].classList.add('top');
       inputContainers[1].classList.add('empty');
      }, false);

      inputContainers[1].addEventListener('drop', function(e){
       inputContainers[0].classList.add('top');
       inputContainers[1].classList.remove('top');
       inputContainers[1].classList.remove('empty');
      }, false);

      reverse.addEventListener('click', function(e){
        order = (order + 1) % 2;
        if(order === 0){
          inputCanvas1.colour = 'red';
          inputCanvas2.colour = 'blue';
        }
        else {
          inputCanvas1.colour = 'blue';
          inputCanvas2.colour = 'red';
        }
        render();
      }, false);

      document.addEventListener('drop', function(e){
        e.preventDefault();
        e.stopPropagation();
        return false;
      }, false);

      document.addEventListener('dragover', function(e){
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'copy';
        return false;
      }, false);

    }

    if(document.readyState === 'complete'){
      start();
    }
    else {
      document.addEventListener('DOMContentLoaded', start, false);  
    }

  });

}());
