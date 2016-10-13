//module slavs {
    import {Draw} from "./render/Draw";
    import {Map} from "./map/Map";
    import {StartUp} from "./test/StartUp"
    export class App {
        constructor() {
            

            let map=new Map(StartUp.map());
            let draw=new Draw(map);
            draw.start();
            //
            //map.add
        }
    }
    window.onload = () => {
        new App();
    };

   
    
//
//}
