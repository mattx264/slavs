import {Point} from '../interface/point';
import {Urbanistic} from './Urbanistic';
import {Helper} from '../helpers/Helper';
export class Road {
    FirstUrbanistic: Urbanistic;
    SeconddUrbanistic: Urbanistic;
    get beginPoint(): Point {
        return new Point(this.x1, this.y1);
    }
    get endPoint(): Point {
        return new Point(this.x2, this.y2);
    }
    equal(road: Road): boolean {
        if (this.beginPoint.equal(road.beginPoint) === true && this.endPoint.equal(road.endPoint) === true)
            return true
        return false
    }
    addUrbanistic(urbanistic: Urbanistic) {
        if (Helper.isInsideCircle(urbanistic.point, this.beginPoint, urbanistic.radius) == false) {
            this.FirstUrbanistic = urbanistic;
        } else {
            this.SeconddUrbanistic = urbanistic;
        }
    }
    isBetween(urbanistic: Urbanistic,urbanistic2: Urbanistic):boolean{
        if((this.FirstUrbanistic.equal(urbanistic)||this.FirstUrbanistic.equal(urbanistic2))
        &&(this.SeconddUrbanistic.equal(urbanistic)||this.SeconddUrbanistic.equal(urbanistic2))){
            return true
        }
        return false;
    }
    isFirst(urbanistic: Urbanistic):boolean{
        if(this.FirstUrbanistic.equal(urbanistic)){
            return true;
        }
        return false;
    }
    isInList(roadList: Road[]) {
        for (let i = 0; i < roadList.length; i++) {
            if (roadList[i].equal(this))
                return true;
        }
        return false;
    }
    constructor(public x1: number, public y1: number, public cx1: number, public cy1: number,
        public cx2: number, public cy2: number, public x2: number, public y2: number) {
        this.FirstUrbanistic = null;

        this.SeconddUrbanistic = null;
    }
}