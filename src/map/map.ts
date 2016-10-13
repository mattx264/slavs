//module slavs{
import {Draw} from '../render/Draw';
import {Character,CharacterInfo} from '../character/Character';
import {Road} from '../character/Road';
import {Urbanistic} from '../character/Urbanistic';
import {Village} from '../character/village';
import {Player} from '../character/player';
import {Point} from '../interface/point'
//import {Graph} from '../helpers/graph';
declare var Graph;
export class Map {
    Urbanistic: Urbanistic[];
    Road: Road[];
    Character: Character[];
    buttons:any[];
    Player:Player[];
    public addCharacter(start: Urbanistic, end: Urbanistic, characterInfo:CharacterInfo) {
        //todo this have to be dynamic
        var map = { '1': { '2': 1 }, '2': { '1': 1, '3': 1 }, '3': { '2': 1, '4': 1 }, '4': { '3': 1 } },
            graph = new Graph(map);
     //todo finish this in good way
        let list = graph.findShortestPath((this.Urbanistic.indexOf(start) + 1).toString(), (this.Urbanistic.indexOf(end) + 1).toString());
      let returnList=[]; 
        for (let i = 0; i < list.length-1; i++) {
            let index = parseInt(list[i]) - 1;
            let index2 = parseInt(list[i + 1]) - 1;
            let urbanistic = this.Urbanistic[index];
            let urbanistic2 = this.Urbanistic[index2];
            returnList.push(this.roadBetween(urbanistic, urbanistic2));
        }
        console.log(list);
        console.log(returnList);
        this.Character.push(new Character(start, end,returnList,characterInfo));

    }
    
    private roadBetween(urbanistic: Urbanistic, urbanistic2: Urbanistic): any {
        for (let i = 0; i < this.Road.length; i++) {
            if (this.Road[i].isBetween(urbanistic, urbanistic2) == true) {
                if(this.Road[i].isFirst(urbanistic)==true){
                     return {road:this.Road[i],isFirst:true};
                }
                return {road:this.Road[i],isFirst:false};
            }
        }
        return null;
    }
    public clearButton(){
        this.buttons=[];
    }
    public addButtons(point:Point,click:Function){
        this.buttons.push({'point':point,click:click})
    }
    public diactivateUrbanistic(){
        for(let i=0;i<this.Urbanistic.length;i++){
            let urbanistic=this.Urbanistic[i];
            urbanistic.showInside=false;
        }
    }
    constructor(mapData) {
        //load map -> maybe json with info about map ???
        /*
    MAP 1-* REGIONS *-* PROPERTISES
        *-*
        Graphic Element eg forest - 
        */
        this.buttons=[];
        this.Road = [];
        for (let i = 0; i < mapData.roads.length; i++) {
            //  draw.addRoad(mapData.roads[i])
            let r = mapData.roads[i];
            this.Road.push(new Road(r.x1, r.y1, r.cx1, r.cy1, r.cx1, r.cy1, r.x2, r.y2));
        }
        this.Player=[];
        for(let i=0;i<mapData.players.length;i++){
            let player=mapData.players[i];
            this.Player[player.index]=new Player(player.index, player.color);
        }
        this.Urbanistic = [];
        for (let i = 0; i < mapData.urbanisticLocation.length; i++) {
            // draw.addCity(mapData.urbanisticLocation[i])
            let roadList: Road[] = [];
            let urbanistic=mapData.urbanisticLocation[i];
            for (let j = 0; j < this.Road.length; j++) {
                if (mapData.urbanisticLocation[i].road.indexOf(j) > -1) {
                    let road = this.Road[j];
                    roadList.push(road);
                }
            }
            this.Urbanistic.push(new Village(urbanistic.x, urbanistic.y, roadList,this.Player[urbanistic.player], this));
        }
        
        this.Character = [];
        let regionList = new Region();
    }

}
class MapData {

}
export class Region {
    constructor() {

    }
}
//}