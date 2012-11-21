define(['canvas'], function(Canvas){
  
  function RenderCanvas(container, canvas){
    Canvas.call(this, container, canvas);
  }

  RenderCanvas.prototype = Object.create(Canvas.prototype);

  RenderCanvas.prototype.render = function(inputCanvases){
    var _canvas = this.canvas;

    var canvas1 = inputCanvases[0];
    var canvas2 = inputCanvases[1];

    var offset1 = canvas1.offset;
    var offset2 = canvas2.offset;

    var ctx = _canvas.getContext('2d');
    ctx.clearRect(0, 0, _canvas.width, _canvas.height);
    ctx.globalAlpha = 0.5;
    ctx.drawImage(canvas1, offset1, 0);
    ctx.drawImage(canvas2, offset2, 0);
  };

  return RenderCanvas;

});