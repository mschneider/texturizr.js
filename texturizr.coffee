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

  ### StripeTexture(options)
  # mandatory options
  #  color: color of the stripes
  #  spacing: horizontal distance between the stripes
  # optional parameters (default)
  #  offsetX(0): offset in x direction
  #  offsetY(0): offset in y direction
  #  rotation(pi/4): rotation in radian relative to the x-axis clockwise
  #  width(1): width of a stripe
  ###
  constructor: (options) ->
    @color = options.color
    @spacing = options.spacing
    @width = options.width || 1
    @rotation = options.rotation || ( Math.PI / 4 )
    @ascent = Math.tan @rotation
    @offsetX = options.offsetX || 0
    @offsetY = options.offsetY || 0

  render: (@canvas) ->
    @ctx = @canvas.getContext "2d"
    @ctx.beginPath()
    x = y = 0
    while x <= @canvas.width
      this.drawStripe(x, 0)
      x += @spacing
    while y <= @canvas.height
      this.drawStripe(0, y) unless y == 0
      y += @spacing * Math.abs @ascent
    @ctx.closePath()
    @ctx.strokeStyle = @color
    @ctx.lineWidth = @width
    @ctx.stroke()

  drawStripe: (x, y) ->
    x += @offsetX
    y += @offsetY
    @ctx.moveTo x - @canvas.width, y - (@ascent * @canvas.height)
    @ctx.lineTo x + @canvas.width, y + (@ascent * @canvas.height)

class GrainTexture extends Texture
  constructor: (@amount) ->

  render: (@canvas) ->
    ctx = @canvas.getContext "2d"
    for x in [0..@canvas.width]
      for y in [0..@canvas.height]
         opacity = Math.random() * @amount
         ctx.fillStyle = "rgba(0, 0, 0, " + opacity + ")"
         ctx.fillRect x, y, 1, 1

