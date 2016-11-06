// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

function Mover(x,y,m) {
  this.location = createVector(x, y);
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  this.mass = m;

  this.applyForce=function(force) {
    var f = force.copy(); //not doing this will divide force incessently
    f.div(this.mass);
    this.acceleration.add(f);
  };
  
  this.update = function() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(5);
    this.location.add(this.velocity);
    this.acceleration.set(0, 0);
  };

  this.display=function() {
    stroke(255);
    fill(255);
    ellipse(this.location.x,this.location.y,this.mass,this.mass);
    var pv=this.velocity.copy(),pv2=this.velocity.copy();
    pv.rotate(PI/2).setMag(this.mass);
    pv2.rotate(-PI/2).setMag(this.mass);
    push();
    translate(this.location.x+this.velocity.x*10,this.location.y+this.velocity.y*10);
    triangle(this.velocity.x*10,this.velocity.y*10,pv.x,pv.y,pv2.x,pv2.y);
    pop();
  };
  this.checkEdges=function() {

    if (this.location.x > width-2*height/15) {
      this.location.x = width-2*height/15;
      //velocity.x *= -1;
    } else if (this.location.x < 2*height/15) {
      this.location.x = 2*height/15;
      //velocity.x *= -1;
    }

    if (this.location.y > height) {
      //velocity.y *= -1;
      this.location.y = height;
    }else if (this.location.y < 0) {
      this.location.y = 0;
      //velocity.y *= -1;
    }

  };

}