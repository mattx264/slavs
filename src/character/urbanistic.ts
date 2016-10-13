import {Road} from './Road'
import {Map} from '../map/map';
import {Point} from '../interface/point';
import {Player} from '../character/player';
export abstract class Urbanistic {
    protected _population: number;
    protected _populationMax: number;
    protected _warrior: number;
    protected _knight: number;
    public radius: number;
    protected interval;
    protected _food: number;
    protected _foodMax: number;
    protected _showInside: boolean;
    protected _money: number;
    protected _armySlot:any[];
    get population(): number {
        if (this._population == null)
            return 0;
        return parseInt(this._population.toString());

    }
    get food(): number {
        if (this._food == null)
            return 0;
        return parseInt(this._food.toString());
    }
    get point(): Point {
        return new Point(this.x, this.y);
    }
    get showInside(): boolean {
        return this._showInside;
    }
    set showInside(show: boolean) {
        this._showInside = show;
    }
    get armySlotSlot():any[]{
        return this._armySlot;
    }
    equal(urbanistic: Urbanistic): boolean {
        return urbanistic.point.equal(this.point) ? true : false;
    }
    constructor(public x: number, public y: number, public road: Road[], public player: Player, protected map: Map) {
        //todo diffrent radius for diffrent place OR maybe not
        this.radius = 30;
        this._food = 10;
        this._populationMax = 30;
        this._foodMax = 30;
        this._warrior=0;
        this._knight=0;
        this._showInside = false;
        this._armySlot=[];
        for (let i = 0; i < road.length; i++) {
            road[i].addUrbanistic(this);
        }
    }
    public MassMobilization = () => { };

    public Clicked() {
    }
    public Send = (urbanisticStart: Urbanistic, urbanisticEnd: Urbanistic) => {

    }
    public raid(from:Urbanistic){
       // if(from.player.index)
       //todo check if attacker have capitol of region if yes it can be capture else on raid
       //yes it has capitol
       
    }
}