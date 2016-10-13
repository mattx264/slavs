import {Urbanistic} from './Urbanistic';
import {Point} from '../interface/Point';
import {Road} from '../Character/road';
import {Helper} from'../helpers/helper'
enum CharacterStatus {
    ACTIVE,
    DONE,
    FIGHT
}
export class Character {
    public x: number;
    public y: number;
    private currentIndex: number;
    private currentRoad: Road;
    private procentage: number;
    private interval: any;
    private status: CharacterStatus;
    private speed: number;
    private directionBack: boolean;
    constructor(private start: Urbanistic, private end: Urbanistic, private roadList: any[],private characterInfo:CharacterInfo) {
        //to do star* to find path
        //startPoint.findPath(endPoint):Road[];

        this.status = CharacterStatus.ACTIVE;
        this.speed = 0.01;
        this.currentIndex = 0;
        this.currentRoad = this.roadList[this.currentIndex].road;
        //check what is begin of 

        this.setInit();
        this.timer();


    }
    private setInit() {
        if (this.roadList[this.currentIndex].isFirst == true) {
            this.directionBack = true;
            this.procentage = .99;
        } else {
            this.directionBack = false;
            this.procentage = 0;
        }
    }
    public draw(): Point {
        if (this.status === CharacterStatus.ACTIVE) {
            this.getCubicBezierXYatPercent();
            return new Point(this.x, this.y);
        } else if (this.status === CharacterStatus.DONE) {
            return null;
        }
    }
    private timer() {
        this.interval = setInterval(() => {
            if (this.procentage > 1 || this.procentage < 0) {
                if (this.roadList.length == this.currentIndex + 1) {
                    this.status = CharacterStatus.DONE;
                    if(this.characterInfo.type==CharacterType.ATTACK){
                        this.end.raid(this.start)
                    }
                    clearInterval(this.interval);
                }
                else {
                    this.currentIndex++;
                    this.currentRoad = this.roadList[this.currentIndex].road;
                    this.setInit();
                }

            }
            if (this.directionBack) {
                this.procentage -= 0.01;
            } else {
                this.procentage += 0.01;
            }

        }, 100);
    }
    getCubicBezierXYatPercent() {
        this.x = this.CubicN(this.procentage, this.currentRoad.x1, this.currentRoad.cx1, this.currentRoad.cx2, this.currentRoad.x2);
        this.y = this.CubicN(this.procentage, this.currentRoad.y1, this.currentRoad.cy1, this.currentRoad.cy2, this.currentRoad.y2);
        this.x -= 10;
        this.y -= 10;
    }
    CubicN(pct, a, b, c, d) {
        var t2 = pct * pct;
        var t3 = t2 * pct;
        return a + (-a * 3 + pct * (3 * a - a * pct)) * pct + (3 * b + pct * (-6 * b + b * 3 * pct)) *
            pct + (c * 3 - c * 3 * pct) * t2 + d * t3;
    }
    getBezierLength() {
        // chord = (p3-p0).Length;
        // cont_net = (p0 - p1).Length + (p2 - p1).Length + (p3 - p2).Length;

        // app_arc_length = (cont_net + chord) / 2;
    }
}
export class CharacterInfo{
    constructor(public type:CharacterType,public value1:number, public value2?:number,public value3?:number){

    }
}
export enum CharacterType{
    ATTACK,
    food,
    people,
    money
}