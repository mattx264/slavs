//import {Urbanistic} from 
import {Urbanistic} from './Urbanistic';
import {Map} from '../map/map';
import {Road} from './Road';
import {Player} from './player';
import {Point} from '../interface/point';
import {CharacterInfo, CharacterType} from './Character'
export class Village extends Urbanistic {
    constructor(public x: number, public y: number, public road: Road[], public player: Player, map: Map) {
        super(x, y, road, player, map);
        this._population = 12;
        if (player.index > 0)
            this.timer();
    }
    public Clicked() {
        if (this.player.index == 1) {

            this._showInside = true;

        }
    }
    private timer() {
        this.interval = setInterval(() => {
            if (this._foodMax > this._food)
                this._food += (this.population * 0.01);
            if (this._populationMax > this._population)
                this._population += (this._population * 0.01);

        }, 1000);
    }
    public MassMobilization = () => {
        console.log("Pospolite ruszenie")
        let num = this._population / 2
        this._population = num;
        //todo remove warrior 
        this._warrior = num;
        //todo this have to be dynamic and it need slot max
        this._armySlot[0]={type:ArmyType.WARRIOR,number:num};
    }
    public Send = (urbanisticStart: Urbanistic, urbanisticEnd: Urbanistic) => {
        if (!urbanisticStart.point.equal(urbanisticEnd.point)) {
            if (urbanisticEnd.player.index != 1) {
                if (this._warrior > 0 || this._knight > 0)
                    if (this._warrior+this._knight<=this._food){
                        let food=this._warrior+this._knight;
                        this._food-=food;
                        this.map.addCharacter(urbanisticStart, urbanisticEnd, new CharacterInfo(CharacterType.ATTACK, this._warrior, this._knight, food));
                    }
            }
        }

    }
    
}
export enum ArmyType{
    WARRIOR,
    KNIGHT
}