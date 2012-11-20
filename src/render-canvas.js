define([], function(){
  
  function RenderCanvas(){

    var _outputElement = this.outputElement = document.createElement('div');
    var _canvas = document.createElement('canvas');
    
    _outputElement.appendChild(_canvas);
    _outputElement.classList.add('output-canvas');

    this.render = function(canvas1, canvas2, offset1, offset2){
      var ctx = _canvas.getContext('2d');
      ctx.clearRect(0, 0, _canvas.width, _canvas.height);
      ctx.globalAlpha = 0.5;
      ctx.drawImage(canvas1, offset1, 0);
      ctx.drawImage(canvas2, offset2, 0);
    };
  }

  return RenderCanvas;

});