const numberDom=document.querySelector('.number');
const timeDom=document.querySelector('.time');
class Game {
    constructor() {
        this.land = new Land(-100);
        this.sky = new Sky();
        this.bird = new Bird();
        this.pipeProducer = new pipePairProducer(-100);
        this.timer = null;
        this.gameOver = false//if true,stop the game
        this.num = 0;//number of pipe passed
        this.timePassed=0;
        this.timeTimer=null;//for timeCount
        this.timeLast=0;
    }
    start() {
        if (this.timer) return;
        //refresh the game if gameOver
        if (this.gameOver) window.location.reload();
        this.pipeProducer.startProduce();
        this.bird.startSwing();
        this.timer = setInterval(() => {
            const duration = 0.016;
            this.sky.move(duration);
            this.land.move(duration);
            this.bird.move(duration);

            this.pipeProducer.pipePairArr.forEach(item => {
                item.move(duration);
            })
            if (this.isGameOver()) {
                this.stopTimeCount();
                this.timePassed=0;
                this.timeTimer=null;
                this.stop();
                this.gameOver = true;
            }
            this.count();
        }, 16)
    }
    //we have dom.left,top,width stored,we use it to decide whether pipe and bird hit
    standardOver(dom1, dom2) {
        let centerBirdX = dom1.left + dom1.width / 2;
        let centerBirdY = dom1.top + dom1.height / 2;
        let centerPipeX = dom2.left + dom2.width / 2;
        let centerPipeY = dom2.top + dom2.height / 2;
        let xDistance = centerBirdX - centerPipeX;
        let yDistance = centerBirdY - centerPipeY;
        if (Math.abs(xDistance) < dom1.width / 2 + dom2.width / 2 && Math.abs(yDistance) < dom1.height / 2 + dom2.height / 2) {
            return true;
        }
        return false;
    }
    isGameOver() {
        if (this.bird.top == this.bird.maxY || this.bird.top == 0) return true;
        for (let i = 0; i < this.pipeProducer.pipePairArr.length; i++) {
            if (this.standardOver(this.bird, this.pipeProducer.pipePairArr[i].upPipe) ||
                this.standardOver(this.bird, this.pipeProducer.pipePairArr[i].downPipe)) {
                return true;
            }

        }
        return false;
    }

    domEnter(dom1, dom2) {
        let centerBirdX = dom1.left + dom1.width/2;
        let centerPipeX = dom2.left+dom2.width/2;
        if (Math.abs(centerBirdX-centerPipeX)<1){
                if(this.domOver(dom1,dom2)){
                    return true;
                }

        } 
        return false;
    }
    domOver(dom1, dom2) {
        let BirdX = dom1.left;
        let PipeX = dom2.left + dom2.width;
        if (Math.abs(BirdX-PipeX)) return true;
        return false;
    }
    count() {
        for (let i = 0; i < this.pipeProducer.pipePairArr.length; i++) {
            const pair=this.pipeProducer.pipePairArr[i];
            if (this.domEnter(this.bird, pair.upPipe)) {
                //console.log('in')
                this.num++;
               // console.log(this.num);
               //numberDom.className=numberDom.className=='.number'?'.number .change':'.number';
               numberDom.innerHTML=`passedPipe:${this.num}`;
            }
        }
    }
    stop() {
        clearInterval(this.timer);
        this.timer = null;
        this.bird.stopSwing();
        this.pipeProducer.stopProduce();
    }
    //monitor keyboard event
    monEvent() {
        //setInterval(()=>console.log(this.num),1000);
        window.onkeydown = (e) => {
            if (e.key == 'Enter') {
                if (this.timer) {this.stop();
                this.stopTimeCount()}
                else {this.start();
                    this.startTimeCount();
                }
            }
            if (e.key == " ") this.bird.jump();
        }
    }
    startTimeCount(){
         const date=new Date().getTime();
        this.timeTimer=setInterval(() => {
            this.timeLast=this.timePassed+new Date().getTime()-date;
            let ms=Math.floor( this.timeLast%1000/10);
            let second=Math.floor(this.timeLast/1000)%60;
            let minute=Math.floor(this.timeLast/60000)%60;
            timeDom.innerHTML=`lastTime:M:${minute},S:${second},MS:${ms}`;
        }, 10);
    }
    stopTimeCount(){
        this.timePassed=this.timeLast
        clearInterval(this.timeTimer);
        this.timeTimer=null;
    }

}

var game = new Game();
//game.start();
game.monEvent();