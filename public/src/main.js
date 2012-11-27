(function(){
  
  require(['input-canvas', 'render-canvas'], function(InputCanvas, RenderCanvas){

    function start(){
      var inputContainers = document.querySelectorAll('div.canvas-container.input');
      var outputContainer = document.querySelector('div.canvas-container.output');
      var outputCanvas = outputContainer.querySelector('canvas');
      var controls = document.querySelectorAll('div.controls > ul > li');
      var mainContainer = document.querySelector('div.main');

      var order = 0;

      controls[0].classList.add('on');

      //debugging
      if(window.location.search.indexOf('debug') > -1){
        mainContainer.classList.add('debug');
      }

      function render(){
        var canvas1 = order === 0 ? inputCanvas1 : inputCanvas2;
        var canvas2 = order === 0 ? inputCanvas2 : inputCanvas1;
        renderCanvas.render(canvas1, canvas2, canvas1.offset[0], canvas1.offset[1], canvas2.offset[0], canvas2.offset[1]);
        console.log(order);
      }

      var inputCanvas1 = new InputCanvas(inputContainers[0], 'red', { onChange: render });
      var inputCanvas2 = new InputCanvas(inputContainers[1], 'blue', { onChange: render });
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

      controls[2].addEventListener('click', function(e){
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

    }

    if(document.readyState === 'complete'){
      start();
    }
    else {
      document.addEventListener('DOMContentLoaded', start, false);  
    }

  });

}());
