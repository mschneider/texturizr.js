class Texture
  constructor: (@bg, @size) ->
    @canvas = document.createElement("canvas")
    @canvas.width = @canvas.height = @size
    ctx = @canvas.getContext "2d"
    ctx.fillStyle = @bg
    ctx.fillRect 0, 0, @size, @size
    this.render()

  applyTo: (element) ->
    url = @canvas.toDataURL "image/png"
    $(element).css "background", "url(" + url + ")"

class StripedTexture extends Texture
  render: () ->
    ctx = @canvas.getContext "2d"
    ctx.moveTo -1, -6
    ctx.lineTo 11, 6
    ctx.moveTo -6, -1
    ctx.lineTo 6, 11
    ctx.strokeStyle = "black"
    ctx.stroke()

class GrainTexture extends Texture
  render: () ->
    ctx = @canvas.getContext "2d"
    for x in [0..@canvas.width]
      for y in [0..@canvas.height]
         opacity = Math.random() * 0.08
         ctx.fillStyle = "rgba(0, 0, 0, " + opacity + ")";
         ctx.fillRect(x, y, 1, 1);
