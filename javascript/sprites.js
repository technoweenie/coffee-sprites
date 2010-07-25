var Animation, Sprite;
Animation = function(img, x, y, w, h, last_frame, frame_rate) {
  this.image = img;
  this.x1 = 0;
  this.y1 = 0;
  this.start_x = x;
  this.start_y = y;
  this.frame_w = w;
  this.frame_h = h;
  this.last_frame = last_frame;
  this.frame_rate = frame_rate;
  this.current_frame = 0;
  return this;
};
Animation.prototype.draw = function(ctx, x, y, w, h) {
  this.x1 = this.current_frame * this.frame_w;
  this.y1 = this.start_y;
  ctx.drawImage(this.image, this.x1, this.y1, this.frame_w, this.frame_h, x, y, w, h);
  this.frame_counter += 1;
  if (this.frame_counter >= this.frame_rate) {
    this.current_frame >= this.last_frame ? (this.current_frame = 0) : this.current_frame += 1;
    this.frame_counter = 0;
    return this.frame_counter;
  }
};

Sprite = function(x, y, w, h, start_animation) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.animations = {};
  this.current_animation = start_animation;
  return this;
};
Sprite.prototype.add_animation = function(name, animation) {
  animation.frameCounter = 0;
  this.animations[name] = animation;
  return this.animations[name];
};
Sprite.prototype.set_animation = function(name) {
  this.current_animation = name;
  return this.current_animation;
};
Sprite.prototype.move = function(mod_x, mod_y) {
  this.x += mod_x;
  return this.y += mod_y;
};
Sprite.prototype.draw = function(ctx) {
  return this.animations[this.current_animation].draw(ctx, this.x, this.y, this.w, this.h);
};
