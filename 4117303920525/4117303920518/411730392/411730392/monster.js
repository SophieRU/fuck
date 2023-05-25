var monster_colors = "001219-005f73-0a9396-94d2bd-e9d8a6-ee9b00-ca6702-bb3e03-ae2012-9b2226".split("-").map(a=>"#"+a)
    class Monster{
        constructor(args){//預設值,基本資料
        this.r = args.r || random(70,150) //設計怪物的主體，傳參數,a,args.r 設定速度，大小，初始顯示位置......
        this.p = args.p || createVector(random(width),random(height))   //建立一個向量，{x:width/2, y:height/2}   
        this.v = args.v || createVector(random(-1,1),random(-1,1)) // 移動速度，如果沒傳參數，就會利用亂數抽出x，y軸的移動速度
        this.color = args.color || random(monster_colors)
        this.mode = random(["happy","angry"])
        this.dead = false //代表活著
        this.num = 0
    }
    draw(){ //畫出元件
      if(this.dead == false ){
       push() //把原點(0,0)座標移到物件中心位置
        translate(this.p.x,this.p.y)
        fill(this.color)
        noStroke()
        ellipse(0,0,this.r)
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    if(this.mode=="happy"){
        fill(255)
        ellipse(0,0,this.r/2)
        fill(0)
        ellipse(0,0,this.r/3)
    }
    else{
        fill(255)
        arc(0,0,this.r/2,this.r/2,0,PI)
        fill(0)
        arc(0,0,this.r/3,this.r/3,0,PI)
    }
    stroke(this.color)
    strokeWeight(4)
    noFill()
    // line(this.r/2,0,this.r,0)
    for(var j=0;j<8;j++){
      rotate(PI/4)    
      beginShape()
        for(var i=0;i<(this.r/3);i++){
            vertex(this.r/2+i,sin(i/4+frameCount/4)*16)

        } 
    endShape()


      }

       pop()//恢復原點到整個視窗左上角
      }
      else{ //怪物死亡畫面
      this.num=this.num+1
      push()
       translate(this.p.x,this.p.y)
       fill(this.color)
       noStroke()
       ellipse(0,0,this.r)
       stroke(255)
       line(-this.r/2,0,this.r/2,0)
       stroke(this.color)
       strokeWeight(4)
       noFill()
       for(var j=0;j<8;j++){
         rotate(PI/4)
         line(this.r/2,0,this.r,0)    
        }
      pop()
      }
    }
    update(){ //
      this.p.add(this.v)
    //   ++++++++碰牆彈回
      if(this.p.x<=0 || this.p.x>=width){
        this.v.x=-this.v.x
      }
      if(this.p.y<=0 || this.p.y>=height)
      this.v.y=-this.v.y
    }
    isBallInRanger(x,y){
      let d = dist(x,y,this.p.x,this.p.y)//計算兩點之間的距離
      if(d<this.r/2){
        return true
      }else{
        return false//滑鼠
      }
    }
}
