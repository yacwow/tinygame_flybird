const sky=document.querySelector('.sky');
const skyStyle=getComputedStyle(sky);
const skyWidth=parseInt(skyStyle.width);
const skyHeight=parseInt(skyStyle.height);


class Sky extends Rectangle{
    constructor(){
        super(skyWidth,skyHeight,0,0,-50,0,sky)
    }

    onMove(){
        if(this.left<=-skyWidth/2){
            this.left=0;
        }
    }
}
// var sky1=new Sky();

// setInterval(() => {
//     sky1.move(1);
// }, (50));