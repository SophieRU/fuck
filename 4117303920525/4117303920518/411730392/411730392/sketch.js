// let points = [
// [7,10],[12,6],[12,4],[9,1],[10,-2],[10,-7],[5,-10],[1,-11],[1,-13],[-3,-13],[-14,-4],[-13,4],
// [-11,9],[-12,13],[-10,16],[-8,17],[-5,13],[3,13],[7,16],[10,15],[10,13],[7,10]
// ]


// let points =[[6, -3], [5, 0], [7, 2],[7,4],[6,5],[9,5],[9,6],[8,7],[7,8],[6,8],[5,10],[4,10],[4,9],[5,8],[4,5],[0,5],[-2,4],[-4,1],[-4,-6],[-5,-7],[-10,-6],[-9,-7],[-4,-8],[-3,-7],[-1,-5],[4,4],[3,2],[3,1],[5,-3],[4,-4],[5,-4],[6,-3],[4,1],[5,2],[1,-4],[2,-5],[2,-8],[8,-8],[7,-7],[3,-7],[3,-1],[4,-1],[3,-1],[2,-3],[0,-5],[-4,-2],[-3,-4],[-1,-5],[-1,-9],[5,-10],[6,-9],[0,-8],[0,-5],[1,0],[-1,3],[5,-4],[6,-4],[7,-3],[6,1]];

let points = [[-2, 0], [-1,-1], [0, -1],[1,0],[1,2],[0,3],[-1,3],[-2,2],[-3,2],[-4,1],[-4,-2],[-5,-4],[-4,-4],[-3,-2],[-2,-1],[-2,-3], [-2,-4], [-1, -4],[0,-4],[0,-2],[2,-2],[2,-4], [4, -4],[4,1],[3,2],[1,2],[1,2]]; //list資料
var fill_colors = "80ffdb-5390d9-7400b8-6930c3-64dfdf".split("-").map(a=>"#"+a)
var line_colors = "ffadad-ffd6a5-fdffb6-caffbf-9bf6ff-a0c4ff-ffc6ff".split("-").map(a=>"#"+a)
//class 類別,粒子
class Obj{  //宣告一個類別,針對一個畫的圖案
  constructor(args){ //預設值,基本資料
    // this.p    =args.p || {x: random(width) , y: random(height)}//描述該物件的初始位置
    this.p    =args.p || createVector(random(width),random(height))
    // this.v    ={x: random(-1,1) , y: random(-1,1)}//設定一個物件的移動速度
    this.v=createVector(random(-1,1),random(-1,1))
    this.size =random(10,30)//一個物件放大倍率
    this.color=random(fill_colors)//充滿顏色
    this.stroke=random(line_colors)//外框線條顏色
  }
  draw(){//劃出單一物件形狀
    push()//執行push()後,依照我的設定,設定原點(0,0)的位置
      translate(this.p.x,this.p.y)//以該物件為原點
      scale(this.v.x<0?1:-1,-1)//如果this.v.x<0條件成立,值為1,否則為-1
      fill(this.color)
      fill(this.stroke)
      strokeWeight(4)
    beginShape()
      for(var k=0; k < points.length;k=k+1){
        // line(points[k][0]*this.size,points[k][1]*this.size,points[k+1][0]*this.size,points[k+1][1]*this.size)
        curveVertex(points[k][0]*this.size,points[k][1]*this.size)
      }
      endShape()
      pop()//執行pop(),原點(0,0)設定回到整個視窗左上角
  }
  update(){//移動的程式碼內容
    // this.p.x=this.p.x+this.v.x
    // this.p.y=this.p.y+this.v.y
    this.p.add(this.v)//設定好向量後,使用add,就可以取代上面兩行
    //向量sub==>減號

    //知道滑鼠的位置,並建立一個滑鼠的向量
  //   let mouseV = createVector(mouseX,mouseY)//把滑鼠位置轉換成一個向量值
  //   let delta = mouseV.sub(this.p).limit(this.v.mag()*2)//sub計算出滑鼠所在位置向量(mouseV)到物件向量(this.p)
  //  //tjis.v.mag()代表該物件的速度大小(一個向量值有大小與方向)
  //   this.p.add(delta)

    if(this.p.x<=0 || this.p.x>=width){
      this.v.x=-this.v.x
    }
    if(this.p.y<=0 || this.p.y>=height)
    this.v.y=-this.v.y
  }
  isBallInRanger(x,y){//判斷飛彈是否移動到物件範圍內
    let d = dist(x,y,this.p.x,this.p.y)//計算兩點之間的距離
    if(d<4*this.size){
      return true
    }else{
      return false//滑鼠
    }
  }
}


//+++++++++++++++++++++++++
var ball
var balls=[]//把產生的"所有"的物件
//+++++++++++++++++++++++++++
var bullet
var bullets=[]
//++++++++++++++++++++++++++++++++++
var monster
var monsters=[]
//+++++++++++++++++++++++++++++++++
var shipP
//++++++++++++++++++++++++++++++++++

var score = 0

function preload(){//程式碼準備執行之前,所執行的程式碼內容,比setup()更早執行
  elephant_sound = loadSound("sound/elephant.wav")
  bullet_sound = loadSound("sound/Launching wire.wav")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  shipP= createVector(width/2,height/2)//預設砲台位置
  for(var i=0;i<20;i=i+1){//i=0,1,2,3,4,8,10
    ball = new Obj({}) //產生一個Obj class元件
    balls.push(ball) //把ball的物件放到balls陣列內
  }
    for(var i=0;i<10;i=i+1){//i=0,1,2,3,4,8,10
    monster = new Monster({}) //產生一個Obj class元件
    monsters.push(monster) //把ball的物件放到balls陣列內

}
}
function draw() {
   background(220);
  // for(var j=0;j<balls.length;j=j+1){
  // ball=balls[j]
  // ball.draw()
  // ball.update()
  // }

if(keyPressed){
  if(key=="ArrowLeft"|| key=="a"){
    shipP.x=shipP.x -5
  }
  if(key=="ArrowRight"|| key=="d"){
    shipP.x=shipP.x +5
  }
  if(key=="ArrowUp"|| key=="w"){
    shipP.y=shipP.y -5
  }
  if(key=="ArrowDown"|| key=="s"){
    shipP.y=shipP.y +5
  }
}

  for(let ball of balls)
  {
    ball.draw()
    ball.update()
    for(let bullet of bullets){
  if(ball.isBallInRanger(bullet.p.x,bullet.p.y)){
    balls.splice(balls.indexOf(ball),1)
    bullets.splice(bullets.indexOf(bullet),1)
    score = score - 1
    elephant_sound.play()

}
}
}

  for(let bullet of bullets)
  {
    bullet.draw()
    bullet.update()
  }
  for(let monster of monsters){

    if(monster.dead == true && monster.num>4 ){
      monsters.splice(monsters.indexOf(monster),1)
    }
    
  
    monster.draw()
    monster.update()
    for(let bullet of bullets){
      if(monster.isBallInRanger(bullet.p.x,bullet.p.y)){
        // monsters.splice(monsters.indexOf(monster),1)
        bullets.splice(bullets.indexOf(bullet),1)
        score = score + 1
        monster.dead = true//死掉
       
        // elephant_sound.play()
    
  }
  }
  }

    textSize(50)
    text(score,50,50)//顯示分數內容
  push()//重新規劃原點(0,0)
  let dx = mouseX - width/2
  let dy = mouseY - height/2
  let angle = atan2(dy,dx)
  translate(shipP.x,shipP.y)
  
  fill("#7400b8")
  noStroke()
  rotate(angle)
    triangle(-25,-25,-25,25,50,0)//設定三個點,畫成一個三角形
    ellipse(0,0,50)
    pop()//恢復原本設定,原點(0,0)在視窗的左上角
}

function mousePressed(){
//   ball= new Obj({
// p:{x:mouseX,y:mouseY}
//   })
//   balls.push(ball)

// for(let ball of balls){
//   if(ball.isBallInRanger(mouseX,mouseY)){
//     balls.splice(balls.indexOf(ball),1)
//     score =score+1//分數加一
//   }
// }
bullet = new Bullet({})//在滑鼠按下的地方,產生一個新的bullet class元件
bullets.push(bullet)  //把bullet的物件放入到bullets陣列內
bullet_sound.play()
 }

 function keyPressed(){
    if(key==" "){//按下空白鍵,發射飛彈
      bullet = new Bullet({})
      bullets.push(bullet)
      bullet_sound.play()
    }
    

 }
