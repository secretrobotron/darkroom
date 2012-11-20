(function(){
  
  require(['input-canvas', 'render-canvas'], function(InputCanvas, RenderCanvas){

    function start(){
      var inputCanvasContainer = document.querySelector('.input-canvas-container');
      var outputCanvasContainer = document.querySelector('.output-canvas-container');

      var renderCanvas = new RenderCanvas();

      var inputCanvas1 = new InputCanvas({
        onAdjust: function(){
          renderCanvas.render(inputCanvas1.canvas, inputCanvas2.canvas, inputCanvas1.offset, inputCanvas2.offset);
        },
        onDrop: function(){
          renderCanvas.render(inputCanvas1.canvas, inputCanvas2.canvas, inputCanvas1.offset, inputCanvas2.offset);
        }
      });
      
      var inputCanvas2 = new InputCanvas({
        onAdjust: function(){
          renderCanvas.render(inputCanvas1.canvas, inputCanvas2.canvas, inputCanvas1.offset, inputCanvas2.offset);
        },
        onDrop: function(){
          renderCanvas.render(inputCanvas1.canvas, inputCanvas2.canvas, inputCanvas1.offset, inputCanvas2.offset);
        }
      });

      inputCanvasContainer.appendChild(inputCanvas1.inputElement);
      inputCanvasContainer.appendChild(inputCanvas2.inputElement);
      outputCanvasContainer.appendChild(renderCanvas.outputElement);
    }

    if(document.readyState === 'complete'){
      start();
    }
    else {
      document.addEventListener('DOMContentLoaded', start, false);  
    }

  });

}());