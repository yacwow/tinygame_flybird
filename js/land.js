const land=document.querySelector('.land');
const landStyle=getComputedStyle(land);
const landWidth=parseInt(landStyle.width);
const landHeight=parseInt(landStyle.height);
const landTop = parseFloat(landStyle.top);

class Land extends Rectangle{
    constructor(){
        super(landWidth,landHeight,0,landTop,-100,0,land)
    }

    onMove(){
        if(this.left<=-landWidth/2){
            this.left=0;
        }
    }
}