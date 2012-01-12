Texturizr = {
  apply: (selector, textures, size = 100) ->
    canvas = document.createElement "canvas"
    canvas.width = canvas.height = size
    for texture in textures
      texture.render canvas
    url = canvas.toDataURL "image/png"
    $(selector).css "background", "url(" + url + ")"

  applyOverBackgroundColor: (selector, texture, size = 100) ->
    backgroundColor = $(selector).css "background-color"
    backgroundTexture = new ColorTexture backgroundColor
    textures = [backgroundTexture, texture]
    this.apply selector, textures, size
}

class Texture

class ColorTexture extends Texture
  constructor: (@fillStyle) ->

  render: (@canvas) ->
    ctx = @canvas.getContext "2d"
    ctx.fillStyle = @fillStyle
    ctx.fillRect 0, 0, @canvas.width, @canvas.height

class StripeTexture extends Texture
  constructor: (@strokeStyle, @offset, @lineWidth) ->

  render: (@canvas) ->
    @ctx = @canvas.getContext "2d"
    x = y = @offset/2
    while x < @canvas.width
      this.drawStripe(x, 0)
      x += @offset
    while y < @canvas.height
      this.drawStripe(0, y)
      y += @offset
    @ctx.strokeStyle = @strokeStyle
    @ctx.lineWidth = @lineWidth
    @ctx.stroke()

  drawStripe: (x, y) ->
    @ctx.moveTo x - @canvas.width, y - @canvas.height
    @ctx.lineTo x + @canvas.width, y + @canvas.height

class GrainTexture extends Texture
  constructor: (@amount) ->

  render: (@canvas) ->
    ctx = @canvas.getContext "2d"
    for x in [0..@canvas.width]
      for y in [0..@canvas.height]
         opacity = Math.random() * @amount
         ctx.fillStyle = "rgba(0, 0, 0, " + opacity + ")"
         ctx.fillRect x, y, 1, 1

