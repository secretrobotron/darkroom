(function(){
  
  require(['input-canvas', 'render-canvas'], function(InputCanvas, RenderCanvas){

    function start(){
      var inputContainers = document.querySelectorAll('div.canvas-container.input');
      var outputContainer = document.querySelector('div.canvas-container.output');
      var controls = document.querySelectorAll('div.controls > ul > li');

      var inputCanvases = [];
      var outputCanvas = new RenderCanvas(outputContainer, outputContainer.querySelector('canvas'));

      Array.prototype.forEach.call(inputContainers, function(inputContainer, index){
        var inputCanvas = new InputCanvas(inputContainer, inputContainer.querySelector('canvas'), {
          onChange: function(){
            outputCanvas.render(inputCanvases);
          }
        });
        inputCanvases.push(inputCanvas);

        controls[index].addEventListener('click', function(e){
          inputCanvases[index].focus = true;
          inputCanvases[(index + 1) % 2].focus = false;
          outputCanvas.focus = false;
        }, false);

      });

      controls[2].addEventListener('click', function(e){
        inputCanvases[0].focus = false;
        inputCanvases[1].focus = false;
        outputCanvas.focus = true;
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