define([], function(){
  
  function RenderCanvas(outputCanvas){

    this.render = function(canvas1, canvas2, offsetX1, offsetY1, offsetX2, offsetY2){
      var ctx = outputCanvas.getContext('2d');

      outputCanvas.width = canvas1.width;
      outputCanvas.height = canvas1.height;

      ctx.clearRect(0, 0, outputCanvas.width, outputCanvas.height);

      // Composite!
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(canvas1.canvas, offsetX1, offsetY1);
      ctx.globalCompositeOperation = 'lighter';
      ctx.drawImage(canvas2.canvas, offsetX2, offsetY2);
    };
  }

  return RenderCanvas;

});