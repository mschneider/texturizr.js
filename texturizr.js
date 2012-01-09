var GrainTexture, StripedTexture, Texture;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

Texture = (function() {

  function Texture(bg, size) {
    var ctx;
    this.bg = bg;
    this.size = size;
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.canvas.height = this.size;
    ctx = this.canvas.getContext("2d");
    ctx.fillStyle = this.bg;
    ctx.fillRect(0, 0, this.size, this.size);
    this.render();
  }

  Texture.prototype.applyTo = function(element) {
    var url;
    url = this.canvas.toDataURL("image/png");
    return $(element).css("background", "url(" + url + ")");
  };

  return Texture;

})();

StripedTexture = (function() {

  __extends(StripedTexture, Texture);

  function StripedTexture() {
    StripedTexture.__super__.constructor.apply(this, arguments);
  }

  StripedTexture.prototype.render = function() {
    var ctx;
    ctx = this.canvas.getContext("2d");
    ctx.moveTo(-1, -6);
    ctx.lineTo(11, 6);
    ctx.moveTo(-6, -1);
    ctx.lineTo(6, 11);
    ctx.strokeStyle = "black";
    return ctx.stroke();
  };

  return StripedTexture;

})();

GrainTexture = (function() {

  __extends(GrainTexture, Texture);

  function GrainTexture() {
    GrainTexture.__super__.constructor.apply(this, arguments);
  }

  GrainTexture.prototype.render = function() {
    var ctx, opacity, x, y, _ref, _results;
    ctx = this.canvas.getContext("2d");
    _results = [];
    for (x = 0, _ref = this.canvas.width; 0 <= _ref ? x <= _ref : x >= _ref; 0 <= _ref ? x++ : x--) {
      _results.push((function() {
        var _ref2, _results2;
        _results2 = [];
        for (y = 0, _ref2 = this.canvas.height; 0 <= _ref2 ? y <= _ref2 : y >= _ref2; 0 <= _ref2 ? y++ : y--) {
          opacity = Math.random() * 0.08;
          ctx.fillStyle = "rgba(0, 0, 0, " + opacity + ")";
          _results2.push(ctx.fillRect(x, y, 1, 1));
        }
        return _results2;
      }).call(this));
    }
    return _results;
  };

  return GrainTexture;

})();
