var ColorTexture, GrainTexture, StripeTexture, Texture, Texturizr;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

Texturizr = {
  apply: function(selector, textures, size) {
    var canvas, texture, url, _i, _len;
    if (size == null) size = 100;
    canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    for (_i = 0, _len = textures.length; _i < _len; _i++) {
      texture = textures[_i];
      texture.render(canvas);
    }
    url = canvas.toDataURL("image/png");
    return $(selector).css("background", "url(" + url + ")");
  },
  applyOverBackgroundColor: function(selector, texture, size) {
    var backgroundColor, backgroundTexture, textures;
    if (size == null) size = 100;
    backgroundColor = $(selector).css("background-color");
    backgroundTexture = new ColorTexture(backgroundColor);
    textures = [backgroundTexture, texture];
    return this.apply(selector, textures, size);
  }
};

Texture = (function() {

  function Texture() {}

  return Texture;

})();

ColorTexture = (function() {

  __extends(ColorTexture, Texture);

  function ColorTexture(fillStyle) {
    this.fillStyle = fillStyle;
  }

  ColorTexture.prototype.render = function(canvas) {
    var ctx;
    this.canvas = canvas;
    ctx = this.canvas.getContext("2d");
    ctx.fillStyle = this.fillStyle;
    return ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  };

  return ColorTexture;

})();

StripeTexture = (function() {

  __extends(StripeTexture, Texture);

  function StripeTexture(strokeStyle, offset, lineWidth) {
    this.strokeStyle = strokeStyle;
    this.offset = offset;
    this.lineWidth = lineWidth;
  }

  StripeTexture.prototype.render = function(canvas) {
    var x, y;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    x = y = this.offset / 2;
    while (x < this.canvas.width) {
      this.drawStripe(x, 0);
      x += this.offset;
    }
    while (y < this.canvas.height) {
      this.drawStripe(0, y);
      y += this.offset;
    }
    this.ctx.strokeStyle = this.strokeStyle;
    this.ctx.lineWidth = this.lineWidth;
    return this.ctx.stroke();
  };

  StripeTexture.prototype.drawStripe = function(x, y) {
    this.ctx.moveTo(x - this.canvas.width, y - this.canvas.height);
    return this.ctx.lineTo(x + this.canvas.width, y + this.canvas.height);
  };

  return StripeTexture;

})();

GrainTexture = (function() {

  __extends(GrainTexture, Texture);

  function GrainTexture(amount) {
    this.amount = amount;
  }

  GrainTexture.prototype.render = function(canvas) {
    var ctx, opacity, x, y, _ref, _results;
    this.canvas = canvas;
    ctx = this.canvas.getContext("2d");
    _results = [];
    for (x = 0, _ref = this.canvas.width; 0 <= _ref ? x <= _ref : x >= _ref; 0 <= _ref ? x++ : x--) {
      _results.push((function() {
        var _ref2, _results2;
        _results2 = [];
        for (y = 0, _ref2 = this.canvas.height; 0 <= _ref2 ? y <= _ref2 : y >= _ref2; 0 <= _ref2 ? y++ : y--) {
          opacity = Math.random() * this.amount;
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
