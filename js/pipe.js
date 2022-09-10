const gameWidth=document.querySelector('.container').clientWidth;
//there's no div in index html,create by js
class Pipe extends Rectangle{
    constructor(height,top,speed,dom){
        super(52,height,gameWidth,top,speed,0,dom)
    }
    onMove(){
        if(this.left<-this.width){
            this.dom.remove();
        }
    }
}
function getRandom(min,max){
    return Math.floor(Math.random() * (max - min) + min);
}
//create up and down pipe pair
class pipePair{
    constructor(speed){
        this.domSpace=200//distance between two pipe
        this.minHeight=80//min height of pipe
        this.maxHeight=landTop-this.domSpace-this.minHeight//for cal of up pipe
        const upHeight=getRandom(this.minHeight,this.maxHeight);
        const upDom=document.createElement('div');
        upDom.className='pipe up';
        this.upPipe=new Pipe(upHeight,0,speed,upDom);

        const downHeight=landTop-upHeight-this.domSpace;
        const downTop=landTop-downHeight;
        const downDom=document.createElement('div');
        downDom.className='pipe down';
        this.downPipe=new Pipe(downHeight,downTop,speed,downDom);
        // gameDom.appendChild(this.upPipe);
        // gameDom.appendChild(this.downPipe);
        gameDom.appendChild(upDom)
        gameDom.appendChild(downDom)
    }
    //check if this pair is useless
    get isUseless(){
        return this.upPipe.left<this.upPipe.width;
    }

    move(duration){
        this.upPipe.move(duration);
        this.downPipe.move(duration);
    }

}

//we need more than one pipepair
class pipePairProducer{
    constructor(speed){
        this.speed=speed;
        this.pipePairArr=[];//store all the pipePair
        this.timer=null;//use interval to create pipePair
    }
    startProduce(){
        if(this.timer){
            return ;
        }
        this.timer=setInterval(()=>{
            this.pipePairArr.push(new pipePair(this.speed));
            for(let i=0;i<this.pipePairArr.length;i++){
                if (this.pipePairArr[i].isUseLess) {
                    this.pipePairArr.splice(i, 1);
                    i--;
                }
            }
        },1500);
    }
    stopProduce(){
        clearInterval(this.timer);
        this.timer=null;
    }
}
// var pipppppp=new pipePairProducer(-100);
// pipppppp.startProduce();

// setInterval(()=>{
//     pipppppp.pipePairArr.forEach((pair)=>{
//         pair.move(0.016)
//     })
// },16)
