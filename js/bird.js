const birdDom = document.querySelector('.bird');
const birdStyle = getComputedStyle(birdDom);
const birdWidth = parseInt(birdStyle.width);
const birdHeight = parseInt(birdStyle.height);
const birdTop = parseFloat(birdStyle.top);
const birdLeft = parseFloat(birdStyle.left);
const gameDom = document.querySelector(".container");
const gameHeight = gameDom.clientHeight;

class Bird extends Rectangle {
    constructor() {
        super(birdWidth, birdHeight, birdTop, birdLeft, 0, 0, birdDom);
        this.g = 1000; //px/s^2
        //record the max Y for bird
        this.maxY = gameHeight - landHeight - this.height;
        this.status = 1;//swing status
        this.timer = null;
        this.render();
    }
    startSwing() {
        if (this.timer) {
            return;
        }
        this.timer = setInterval(() => {
            this.status++;
            if (this.status === 4) {
                this.status = 1;
            }
            this.render();
        }, 200)
    }
    stopSwing() {
        clearInterval(this.timer);
        this.timer = null;
    }
    render() {
        super.render();
        this.dom.className = `bird swing${this.status}`
    }
    move(duration) {
        super.move(duration);
        this.ySpeed += this.g * duration;
    }
    onMove(){
        if(this.top<0){
            this.top=0
        }
        else if(this.top>this.maxY){
            this.top=this.maxY;
        }
    }
    jump() {
        this.ySpeed = -300;
    }
}

// var bird1 = new Bird();
// bird1.startSwing()

//setInterval(()=>{bird1.move(0.1),bird1.jump()},1000)