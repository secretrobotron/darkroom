(function(){
  
  require(['input-canvas', 'render-canvas'], function(InputCanvas, RenderCanvas){

    function start(){
      var inputContainers = document.querySelectorAll('div.canvas-container.input');
      var outputContainer = document.querySelector('div.canvas-container.output');
      var controls = document.querySelectorAll('div.controls > ul > li');
      var mainContainer = document.querySelector('div.main');

      var inputCanvases = [];
      var outputCanvas = new RenderCanvas(outputContainer, outputContainer.querySelector('canvas'));

      controls[0].classList.add('on');

      //debugging
      if(window.location.search.indexOf('debug') > -1){
        mainContainer.classList.add('debug');
      }

      Array.prototype.forEach.call(inputContainers, function(inputContainer, index){
        var inputCanvas = new InputCanvas(inputContainer, inputContainer.querySelector('canvas'), {
          onChange: function(){
            //outputCanvas.render(inputCanvases);
          },
          onDrop: function(){
          }
        });
        inputCanvases.push(inputCanvas);

        controls[index].addEventListener('click', function(e){
          inputCanvases[index].focus = true;
          inputCanvases[(index + 1) % 2].focus = false;
          controls[index].classList.add('on');
          controls[(index + 1) % 2].classList.remove('on');
          controls[2].classList.remove('on');
          outputCanvas.focus = false;
        }, false);

      });

      controls[2].addEventListener('click', function(e){
        inputCanvases[0].focus = false;
        inputCanvases[1].focus = false;
        outputCanvas.focus = true;
        controls[0].classList.remove('on');
        controls[1].classList.remove('on');
        controls[2].classList.add('on');
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