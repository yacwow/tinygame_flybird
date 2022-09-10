class Rectangle{
    constructor(width,height,left,top,xSpeed,ySpeed,dom){
        this.width=width;
        this.height=height;
        this.left=left;
        this.top=top;
        this.xSpeed=xSpeed
        this.ySpeed=ySpeed;
        this.dom=dom;
        this.render();
    }

    render(){
        this.dom.style.width=this.width+'px';
        this.dom.style.height=this.height+'px';
        this.dom.style.left=this.left+'px';
        this.dom.style.top=this.top+'px';
    }
    move(duration){
        this.left+=this.xSpeed*duration;
        this.top+=this.ySpeed*duration;
        if(this.onMove){
            //if subclass has onMove method,call the function
            this.onMove();
        }
        this.render();
    }
}