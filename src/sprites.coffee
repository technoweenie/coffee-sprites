class Animation
  constructor: (img, x, y, w, h, last_frame, frame_rate) ->
    @image: img
    @x1: 0
    @y1: 0
    @start_x: x
    @start_y: y
    @frame_w: w
    @frame_h: h
    @last_frame: last_frame
    @frame_rate: frame_rate
    @current_frame: 0

  draw: (ctx, x, y, w, h) ->
    # set current rectangle
    @x1: @current_frame * @frame_w
    @y1: @start_y

    # Draw image (clip to x1,y1-> w,h, draw at x,y and w,h of sprite)
    ctx.drawImage @image, @x1, @y1, @frame_w, @frame_h, x, y, w, h

    @frame_counter += 1

    if @frame_counter >= @frame_rate
      if @current_frame >= @last_frame
        @current_frame: 0
      else
        @current_frame += 1

      @frame_counter: 0

class Sprite
  constructor: (x, y, w, h, start_animation) ->
    @x: x
    @y: y
    @w: w
    @h: h
    @animations: {}
    @current_animation: start_animation

  add_animation: (name, animation) ->
    animation.frameCounter: 0
    @animations[name]: animation

  set_animation: (name) ->
    @current_animation: name

  move: (mod_x, mod_y) ->
    @x += mod_x
    @y += mod_y

  draw: (ctx) ->
    @animations[@current_animation].draw ctx, @x, @y, @w, @h