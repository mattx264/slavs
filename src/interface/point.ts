export interface IPoint{
    x:number;
    y:number;
    equal(point:Point):boolean
}
export class Point implements IPoint{
    x:number;
    y:number;
    constructor(x:number,y:number){
        this.x=x;
        this.y=y;
    }
    equal(point:Point):boolean{
        if(this.x===point.x && this.y===point.y)
            return true;
        return false;
    }
}
export class BezierCordination{
    constructor(public x1:number,public y1:number,public x2:number,public y2,
    public cx1:number,public cy1,public cx2:number,public cy2:number){

    }
}