export  class StartUp{
    public static map()
    {
        return {
            urbanisticLocation:[{x:130,y:250,road:[0],player:0,region:1},{x:300,y:230 ,road:[0,1],player:0  ,region:1 },
            {   x:260,y:90,road:[1,2],player:1,region:1},{   x:390,y:100,road:[2],player:0,region:1}],
            roads:[{x1:130 ,y1:250,x2:300 ,y2:230,cx1:200,cy1:257,cx2:274,cy2:344},
                {x1:300 ,y1:230,x2:260 ,y2:90,cx1:200,cy1:200,cx2:100,cy2:80},
                {x1:260 ,y1:90,x2:390 ,y2:100,cx1:300,cy1:50,cx2:390,cy2:100}
            ],players:[{index:1,color:'#f44336'},{index:0,color:'#9e9e9e'},{index:2,color:'#ffeb3b'},{index:3,color:'#3f51b5'}]
        }
    }
}3