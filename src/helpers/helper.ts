import {Point} from '../interface/point'
export class Helper {
    static isInsideCircle(circleCenter: Point, point: Point, r: number): boolean {

        return Math.sqrt(Math.pow(point.x - circleCenter.x, 2) + Math.pow(point.y - circleCenter.y, 2)) < r ==true ? true : false;

    }
}