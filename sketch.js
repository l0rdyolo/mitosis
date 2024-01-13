class Cell{
    constructor(x,y,radius , color){
        this.x = x;
        this.y = y;

        this.velocity ={
            x:0,y:0
        }

        this.color = color || {
            r:random(0,255),
            g:random(0,255),
            b:random(0,255)
        }

        this.acceleration = 1;

        this.radius = radius;
        this.yPressure = 1;
        this.xPressure = 1;
        this.width = this.radius * this.xPressure;
        this.height = this.radius * this.yPressure;

        this.readyToMitosis = false;
        this.mitosed = false;
    }

    draw(){
        noStroke();
        fill(
            this.color.r,
            this.color.g,
            this.color.b,
            map(this.radius,0,100,0,255)
        )
        ellipse(
            this.x,
            this.y,
            this.width,
            this.height
        )
    }

    calculateDimensions(){
        this.width = this.radius * this.xPressure;
        this.height = this.radius * this.yPressure;
    }

    mitosis(){
        if (!this.mitosed) {
            this.radius = random(10,51);
            this.color = {
                r:random(0,255),
                g:random(0,255),
                b:random(0,255)
            }
            let newCell
            newCell = new Cell(this.x, this.y, this.radius , this.color)
            cells.push(newCell);
            this.velocity.x = random(-1,1);
            this.velocity.y =  random(-1,1);
            newCell.velocity.x = random(-1,1);
            newCell.velocity.y = random(-1,1);

            this.mitosed = true;
        }
    }


    update(){
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y

        this.velocity.x = this.velocity.x * this.acceleration
        if(this.velocity >= 0){
            this.acceleration -= 0.01
        }
        if(this.radius < 100){
            this.radius += 0.5
            this.calculateDimensions();    
            this.mitosed = false;
        }
        else{
            this.mitosis();
        }
    }
}

let cells = [];
let aCell ;
function setup() {
     aCell = new Cell(width/2,height/2,50);
     cells.push(aCell)
    createCanvas(800, 800);
  }

  function draw() {
    translate(width/2, height/2)
    background(220);
     cells.forEach(cell => {
        cell.draw();
        cell.update();
    });
  }