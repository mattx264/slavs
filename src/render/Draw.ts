import {Map} from '../map/map';
import {Character} from '../character/Character';
import {Urbanistic} from '../character/Urbanistic';
import {Village} from '../character/village';
import {Point} from '../interface/point'
export class Draw {
    private list: any[] = [];
    private _r: number = 30;
    private urbanisticDrawLine = null;
    ctx: CanvasRenderingContext2D;

    public constructor(private map: Map) {
        var canvas = <HTMLCanvasElement>document.getElementById('canvas')
        this.ctx = canvas.getContext('2d');
        this.ctx.canvas.width = 1000;
        this.ctx.canvas.height = 500;
        this.setupClick(canvas);
        this.map = map;
        //
        this.animation();
    }
    private clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    }
    public animation = () => {
        //setTimeout(()=>{
        this.clear();
        this.drawUrbanistic();
        this.drawCharacter();
        if (this.urbanisticDrawLine != null) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.urbanisticDrawLine.start.x, this.urbanisticDrawLine.start.y);
            this.ctx.lineTo(this.urbanisticDrawLine.end.x, this.urbanisticDrawLine.end.y);
            this.ctx.stroke();
        }
        requestAnimationFrame(this.animation)
        //},1000/60)
    }
    private drawUrbanistic() {
        for (let i = 0; i < this.map.Urbanistic.length; i++) {

            let urbanistic: Urbanistic = this.map.Urbanistic[i];
            this.ctx.beginPath();
            this.ctx.arc(urbanistic.x, urbanistic.y, this._r, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = 'green';
            this.ctx.fill();
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = urbanistic.player.color;
            this.ctx.stroke();

            if (urbanistic.showInside === true) {
                if (urbanistic.armySlotSlot) {
                    for (let i = 0; i < urbanistic.armySlotSlot.length; i++) {
                        //todo finish this
                        let position = urbanistic.radius * 2;
                        let armyPoint = new Point(urbanistic.x, urbanistic.y + position);
                        this.ctx.beginPath();
                        this.ctx.rect(armyPoint.x, armyPoint.y, 20, 20);
                        this.ctx.strokeStyle = "red";

                        this.ctx.stroke();
                    }
                }
                // this.ctx.beginPath();
                // this.ctx.arc(urbanistic.x, urbanistic.y, this._r * 2, 0, 2 * Math.PI, false);
                // this.ctx.fillStyle = 'brown';
                // this.ctx.fill();
                this.ctx.beginPath();
                let position = urbanistic.radius * 2;
                let btnPoint = new Point(urbanistic.x, urbanistic.y - position);
                this.ctx.arc(btnPoint.x, btnPoint.y, 20, 0, 2 * Math.PI, false);
                this.ctx.fillStyle = 'red';
                this.ctx.fill();
                this.ctx.closePath();
                this.ctx.beginPath();

                // this.ctx.arc(urbanistic.x - position, urbanistic.y, 10, 0, 2 * Math.PI, false);
                // this.ctx.fillStyle = 'gold';
                // this.ctx.fill();
                // this.ctx.closePath();
                //todo this.map.buttons.length have to be change to check if button is added or move this logic some other place
                if (this.map.buttons.length == 0) {
                    this.map.addButtons(btnPoint, urbanistic.MassMobilization);
                    //this.map.addButtons(btnPoint, urbanistic.MassMobilization)
                }

            } else {
                this.ctx.fillText(urbanistic.population.toString(), urbanistic.x, urbanistic.y - this._r - 10);
                this.ctx.fillText(urbanistic.food.toString(), urbanistic.x + 20, urbanistic.y - this._r - 10);

            }
        }
        for (let i = 0; i < this.map.Road.length; i++) {
            let road = this.map.Road[i]
            this.ctx.beginPath();
            this.ctx.moveTo(road.x1, road.y1);
            this.ctx.strokeStyle = '#795548';
            this.ctx.lineWidth = 3;
            this.ctx.bezierCurveTo(road.cx1, road.cy1, road.cx2, road.cy2, road.x2, road.y2);
            this.ctx.stroke();
        }
    }
    private drawCharacter() {

        for (let i = 0; i < this.map.Character.length; i++) {
            let character: Character = this.map.Character[i];
            let point = character.draw();
            if (point === null) {//it get to end
                this.map.Character.splice(i, 1);
                i--;
            } else {
                this.ctx.beginPath();
                this.ctx.rect(point.x, point.y, 20, 20);
                this.ctx.stroke();
            }
        }
    }

    public addRoad(object: any) {
        this.ctx.beginPath();
        this.ctx.moveTo(object.x1, object.y1);
        this.ctx.bezierCurveTo(object.cx1, object.cy1, object.cx2, object.cy2, object.x2, object.y2);
        this.ctx.stroke();
    }
    private setupClick(elem: any) {

        // Add event listener for `click` events.
        elem.addEventListener('click', (event) => {

            for (let i = 0; i < this.map.buttons.length; i++) {
                let button = this.map.buttons[i];

                if (Math.sqrt(Math.pow(event.pageX - button.point.x, 2) + Math.pow(event.pageY - button.point.y, 2)) < 20) {
                    button.click();
                    return;
                    //return will cancel active urbanistic we dont wnat thisreturn;
                }
            }
            this.map.diactivateUrbanistic();

            for (let i = 0; i < this.map.Urbanistic.length; i++) {
                let urbanistic: Urbanistic = this.map.Urbanistic[i];

                if (Math.sqrt(Math.pow(event.pageX - urbanistic.x, 2) + Math.pow(event.pageY - urbanistic.y, 2)) < this._r) {
                    urbanistic.Clicked();
                    return;
                }


            }
        }, false);

        elem.addEventListener('mousedown', (event) => {

            for (let i = 0; i < this.map.Urbanistic.length; i++) {
                let urbanistic: Urbanistic = this.map.Urbanistic[i];
                if (Math.sqrt(Math.pow(event.pageX - urbanistic.x, 2) + Math.pow(event.pageY - urbanistic.y, 2)) < this._r) {
                    this.urbanisticDrawLine = urbanistic;
                    this.urbanisticDrawLine.start = {};
                    this.urbanisticDrawLine.end = {}
                    this.urbanisticDrawLine.start.x = urbanistic.x;
                    this.urbanisticDrawLine.start.y = urbanistic.y;
                    this.urbanisticDrawLine.urbanistic = urbanistic;

                }

            }
        }, false);
        elem.addEventListener('mousemove', (event) => {
            if (this.urbanisticDrawLine != null) {
                this.urbanisticDrawLine.end.x = event.pageX;
                this.urbanisticDrawLine.end.y = event.pageY;

            }

        }, false);
        elem.addEventListener('mouseup', (event) => {

            for (let i = 0; i < this.map.Urbanistic.length; i++) {
                let urbanistic: Urbanistic = this.map.Urbanistic[i];
                if (Math.sqrt(Math.pow(event.pageX - urbanistic.x, 2) + Math.pow(event.pageY - urbanistic.y, 2)) < this._r) {
                    this.urbanisticDrawLine.Send(this.urbanisticDrawLine.urbanistic, urbanistic);
                    break;
                }

            }
            this.urbanisticDrawLine = null;
        }, false);
    }
    private drawMap() {


        // ctx.globalCompositeOperation = 'destination-over';
        // ctx.clearRect(0, 0, 300, 300); // clear canvas

        // ctx.fillStyle = 'rgba(0,0,0,0.4)';
        // ctx.strokeStyle = 'rgba(0,153,255,0.4)';
        // ctx.save();
        // ctx.translate(150, 150);

        // // Earth
        // var time = new Date();
        // ctx.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds());
        // ctx.translate(105, 0);
        // ctx.fillRect(0, -12, 50, 24); // Shadow
        // ctx.drawImage(earth, -12, -12);

        // // Moon
        // ctx.save();
        // ctx.rotate(((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds());
        // ctx.translate(0, 28.5);
        // ctx.drawImage(moon, -3.5, -3.5);
        // ctx.restore();

        // ctx.restore();

        // ctx.beginPath();
        // ctx.arc(150, 150, 105, 0, Math.PI * 2, false); // Earth orbit
        // ctx.stroke();

        // ctx.drawImage(sun, 0, 0, 300, 300);

        window.requestAnimationFrame(() => this.drawMap());
    }
    public start() {
        this.drawMap();

    }
}
//}