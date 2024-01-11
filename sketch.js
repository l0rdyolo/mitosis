class Cell{
    constructor(){
        this.x = 10;
        this.y = 10;

        this.radius = 50;
        this.yPressure = 1;
        this.height = this.radius * this.yPressure;

        this.readyToMitosis = false;
    }

    draw(){
        noStroke();
        fill(255, 0, 0, map(150,70,150,1000,1000))
        ellipse(
            this.x,
            this.y,
            this.radius,
            this.height
        )
    }

    update(dir){
        if(this.radius < 100){
            this.radius += 1
            this.height = this.radius * this.yPressure;
        }
        else{
            this.readyToMitosis = true;
        }

        if(this.readyToMitosis && this.height > 65){
            this.x += dir * 0.8
            this.yPressure -= 0.01;
            this.height = this.radius * this.yPressure;
        }
    }
}

let aCell = new Cell();
let bCell = new Cell();


function setup() {
    createCanvas(800, 800);
  }

  function draw() {
    translate(width/2, height/2)
    background(220);
    aCell.draw();
    bCell.draw()
    aCell.update(1);
    bCell.update(-1);

  }