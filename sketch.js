// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

var  m;
var r1,r2;
////var c1,c2;
var f=[0,0,0,0];
var lst=[1,2,3,4,5,6,7,8,9,10,12];
var cl1,cl2,cl3;
var cnt=0,period=20;
var rn1=0,rn2=0;
var app=p5.Vector();
//boolean pressed;
var token=0,token2=0;
var base;
var c = -0.3;
function setup() {
  createCanvas(displayWidth, displayHeight);
  rectMode(CENTER);
  m= new Mover(2, width/2, 35);
  c=c.toPrecision(1)
  //c1 = createShape(ELLIPSE,width-height/15,hevaright/2,height/15,height/15);
  //c1.setFill(cl3);
  //c1.setStroke(cl1);
  //c2 = createShape(ELLIPSE,height/15,height/2,height/15,height/15);
  //c2.setFill(cl3);
  //c2.setStroke(cl2);
  colorMode(RGB, 100);
  cl1=color(255,0,0);
  cl2=color(255,255,0);
  cl3=color(0,0,0);
  base=createVector(0,0)
  f[0]=p5.Vector.fromAngle(PI);
  f[1]=p5.Vector.fromAngle(-PI/2);
  f[2]=p5.Vector.fromAngle(0);
  f[3]=p5.Vector.fromAngle(PI/2);
  stroke(255);
  textAlign(CENTER);
}

function keyReleased(){
  //pressed=false;
    console.log(keyCode);
    if(token<4 && token>=0)
      token=keyCode-LEFT_ARROW;
    token2&=(~(1<<token));
  }
  
   function keyPressed()
    {
       token=keyCode-LEFT_ARROW;
       //println(token);
       if(token<4 && token>=0)
       {
          token2|=(1<<token);
       }
    }
var malpha,mgamma;
var mob=0;
var score=500;
window.addEventListener('deviceorientation', function(e) 
{
  mob=1;
  malpha = e.alpha;
  mgamma = e.gamma;
});
var stx=["Bring the target here","Yes, now keep it here"]
var ix=0
function draw() {
  background(0);
  textSize(14)
  text(stx[ix],width/2,height/2)
  textSize(20)
  text("SCORE"+int(score),width-width/10,height/10)
  noFill();
  ellipseMode(CENTER);
  stroke(color(255,255,255));
  rect(width/2,height/2,height/4,height/4);
  stroke(color(255,122,255));
  rect(width/2,height/2,height/6,height/6);
  if(m.location.y>height/2-height/12 && m.location.y<height/2+height/12 && m.location.x>width/2-width/12 && m.location.x<width/2+width/12)
  {
      ix=1
      score=score+.2;
      fill(255,255,255,20)
      rect(width/2,height/2,height/6,height/6)
      fill(0,0,0)
  }
  else {
      ix=0
      score=score-0.03
  }
    if(token2>0)
    {
      for(var i=0;i<4;i++)
        {
        println(token2);
        if((token2>>i&1)==1)
        base.add(f[i]);
        }
    }
    else base.mult(0);
    m.applyForce(base);
            
    if(cnt===0){
      rn1=lst[int(random(11))];
      for(var j=0;j<4;j++)
      {
          if(((rn1>>j)&1)==1)
          {
            app=f[j].copy();
            app.mult(1+rn1*6);
            m.applyForce(app);
          }
      }
      //c1.setFill(cl3);
      //c2.setFill(cl3);
    }
    else{
      app.mult(0);
      //if(rn1%3===0)c1.setFill(cl1);
      //if(rn1%3===1)c2.setFill(cl2);
    }
    m.update();
    m.display();
    m.checkEdges();
    var friction = m.velocity.copy(); 
    friction.setMag(c);    
    m.applyForce(friction);
    cnt=(cnt+1)%period;   
}