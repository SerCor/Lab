/* labyrinth program */

class Laberinto{

    constructor( dimension,reference_point = [0,0],dimension3D = false,line_width = 10,scale = 1){
        this.reference_point = ({
            x:0,
            y:0
        })
        this.reference_point.x = reference_point[0];
        this.reference_point.y = reference_point[1];
        this.dimension = ({
            width:0,
            height:0,
        });
        this.line_width = line_width;
        this.scale = scale;

        this.dimension.width = dimension[0];
        this.dimension.height = dimension[1]

        this.init_point  =  ({
            x:0,
            y:0
        });
        this.end_point  =  ({
            x:0,
            y:0
        });
        
        
        this.player_position = ({
            x:this.init_point,
            y:0
        });
        
        /* Margin 5*/
        if( this.init_point[0] >= this.reference_point.x-5)
            this.init_point[0] -= 5;
        
        
        
        this.end_point = []; // The definition of end point is in the generateLabyrinth function 
        this.dimension3D = dimension3D;
        this.generateLabyrinth();
    }

    draw( scene, contourColor = "#B02735",contourWidth =.30, pathColor = "#B02735",pathWidth=.30){
        
        /* Draw contour */
        var line ;
        for(let i = 1; i < this.contour.length; i+=2){
            line  = new three3DExtras.tubeLine([this.reference_point.x + this.contour[i][1] /*Column-x*/, this.reference_point.y + this.contour[i][0]/*Row-y*/,this.VAL_Z],[this.reference_point.x + this.contour[i-1][1], this.reference_point.y + this.contour[i-1][0],this.VAL_Z],contourWidth,contourColor);
            scene.add(line.getObject3D());
        }

        
        for(let i = 0; i < this.path_lab.length; i++){
            line  = new three3DExtras.tubeLine([this.reference_point.x + this.path_lab[i][0][1] /*Column-x*/, this.reference_point.y + this.path_lab[i][0][0]/*Row-y*/,this.VAL_Z],[this.reference_point.x + this.path_lab[i][1][1], this.reference_point.y + this.path_lab[i][1][0],this.VAL_Z],pathWidth,pathColor);
            scene.add(line.getObject3D());
        }

        console.log("Fin de dibujado");


    }

    veirificateCollisions( pos ){
        if( pos.length != 2 )
            throw "";
        else{

        }
    }

    generateAdjacentNodes( posNode ){
        /** PARAM PosNode ---> Array [x --> Column,y ---> Row] */

        /* Genere the Adjacent Nodes of central node */
        let list = [];
        let i = 0 ;
        let weight;

        if( posNode[1] == 0){
            /* Is in the left contour */
            weight = Math.random();
            list.push([posNode[0]/*Row*/,posNode[1]+1/*Column*/,weight]); //Rigth
            this.matrix_wei[posNode[0]][posNode[1]+1].push([posNode[0],posNode[1],weight]); //Add the same value in the rigth node 
            
            if( posNode[0] == 0){
                /* Is in the bottom contour*/
                weight = Math.random();
                list.push([posNode[0]+1,posNode[1],weight]); //Top
                this.matrix_wei[posNode[0]+1][posNode[1]].push([posNode[0],posNode[1],weight]); //Add the same value in the top node 

            }else if( posNode[0] == this.dimension.height-1){
                /* Is in the top contour */
                /* This value is definite in other node */
                // list.push([posNode[0],posNode[1]-1,Math.random()]);   //Bottom 

           

            }else{
                /* Only left contour*/
                weight = Math.random();
                list.push([posNode[0]+1,posNode[1],weight]); //Top
                this.matrix_wei[posNode[0]+1][posNode[1]].push([posNode[0],posNode[1],weight]); //Add the same value in the top node 
                 /* This value is definite in other node */
                /* This value is definite in other node */
                // list.push([posNode[0],posNode[1] - 1,Math.random()]);   //Bottom 

            }
        }else if( posNode[1] ==  this.dimension.width -1 ){
            /* Is in the right contour */
            /* This value is definite in other node */
            // list.push([posNode[0]-1,posNode[1],Math.random()]); //Left

            if( posNode[1] == 0){
                /* Is in the bottom contour*/
                weight = Math.random();
                list.push([posNode[0]+1,posNode[1],weight]); //Top
                this.matrix_wei[posNode[0]+1][posNode[1]].push([posNode[0],posNode[1],weight]); //Add the same value in the top node 


            }else if( posNode[0]  == this.dimension.height-1){
                /* Is in the top contour */
                /* This value is definite in other node */
                // list.push([posNode[0],posNode[1]-1,Math.random()]);   //Bottom 

            }else{
                /* Only right contour*/
                weight = Math.random();
                list.push([posNode[0]+1,posNode[1],weight]); //Top
                this.matrix_wei[posNode[0]+1][posNode[1]].push([posNode[0],posNode[1],weight]); //Add the same value in the top node 
                 /* This value is definite in other node */
                // list.push([posNode[0],posNode[1]-1,Math.random()]);   //Bottom 

            }
        }else if( posNode[0] == 0 ){
            /* Is only in the bottom contour*/
            weight = Math.random();
            list.push([posNode[0]+1,posNode[1],weight]); //Top
            this.matrix_wei[posNode[0]+1][posNode[1]].push([posNode[0],posNode[1],weight]); //Add the same value in the top node 

            weight = Math.random();
            list.push([posNode[0]/*Row*/,posNode[1]+1/*Column*/,weight]); //Rigth
            this.matrix_wei[posNode[0]][posNode[1]+1].push([posNode[0],posNode[1],weight]); //Add the same value in the rigth node 
             /* This value is definite in other node */
            // list.push([posNode[0]-1,posNode[1],Math.random()]); //Left


        }else if( posNode[0] == this.dimension.height -1){
            /* Is only in the top contour */
             /* This value is definite in other node */
            // list.push([posNode[0]-1,posNode[1],Math.random()]); //Left

            weight = Math.random();
            list.push([posNode[0]/*Row*/,posNode[1]+1/*Column*/,weight]); //Rigth
            this.matrix_wei[posNode[0]][posNode[1]+1].push([posNode[0],posNode[1],weight]); //Add the same value in the rigth node 
             /* This value is definite in other node */
            // list.push([posNode[0],posNode[1]-1,Math.random()]);   //Bottom 
            

        }else{
            /* No problem with a contours */
            
             /* This value is definite in other node */
             //list.push([posNode[0]-1,posNode[1],Math.random()]); //Left
            weight = Math.random();
            list.push([posNode[0]+1,posNode[1],weight]); //Top
            this.matrix_wei[posNode[0]+1][posNode[1]].push([posNode[0],posNode[1],weight]); //Add the same value in the top node 


             /* This value is definite in other node */
            // list.push([posNode[0],posNode[1]-1,Math.random()]);   //Bottom 

            weight = Math.random();
            list.push([posNode[0]/*Row*/,posNode[1]+1/*Column*/,weight]); //Rigth
            this.matrix_wei[posNode[0]][posNode[1]+1].push([posNode[0],posNode[1],weight]); //Add the same value in the rigth node 
        }

        return list;
    }

    generateLabyrinth( ){
        /* Make aleatory labyrinth */

        const VAL_Z = this.dimension3D == true? 5:0;
        this.contour = [];

        /*  contour of Labyrinth */
        this.init_point.x = Math.floor(Math.random() * this.dimension.width);
        this.init_point.y = Math.floor(0);
        /* Bottom Line */      
        if( this.init_point.x == 0 )
            this.init_point.x ++;
        else if(this.init_point.x >= this.dimension.width-1)
            this.init_point.x --;
        
        this.contour.push([-1,this.dimension.width ]);
        this.contour.push([-1,this.init_point.x + 1]);

        this.contour.push([-1,this.init_point.x -1]);
        this.contour.push([-1,-1]);
        

        let side_of_end = Math.random() * 3;
        /* Generate end point  */

        /* Other Lines */
        if( side_of_end < 1)
        {   
            /*Define the end pont*/
            this.end_point.x = 0;
            this.end_point.y = Math.random() * this.dimension.height;

            if( this.end_point.y >= this.dimension.height -1)
                this.end_point.y --;
            else if(this.end_point.y == 0)
                this.end_point.y ++;

            /* Side --> Left */
            this.contour.push([0-1,0-1]);
            this.contour.push([this.end_point.y-1,this.end_point.x-1]);            

            this.contour.push([this.end_point.y+1,this.end_point.x-1]);            
            this.contour.push([this.dimension.height,0-1]);            

            /* Others */
            /*Top*/
            this.contour.push([this.dimension.height-1+1,-1]);        
            this.contour.push([this.dimension.height-1+1,this.dimension.width]);  

            /*Rigth*/
            this.contour.push([this.dimension.height,this.dimension.width]);        
            this.contour.push([0-1,this.dimension.width-1+1]);

        }else if( side_of_end < 2){
            this.end_point.x =  Math.random() * (this.dimension.width)
            this.end_point.y =  0;
            if( this.end_point.x >=  this.dimension.width -1 )
                this.end_point.x --;
            else if(this.end_point.x == 0)
                this.end_point.x++;

            /* Side --> Top*/
            this.contour.push([this.dimension.height-1+1,0-1]);        
            this.contour.push([this.dimension.height-1+1,this.end_point.x-1]);        

            this.contour.push([this.dimension.height-1+1,this.end_point.x+1]);        
            this.contour.push([this.dimension.height-1+1,this.dimension.width]);        


            /* Others */
            /*Rigth*/
            this.contour.push([this.dimension.height,this.dimension.width]);        
            this.contour.push([0-1,this.dimension.width-1+1]);

            /*Left*/
            this.contour.push([0-1,0-1]);
            this.contour.push([this.dimension.height,0-1]);

        }else{
            this.end_point.x =  0;
            this.end_point.y = Math.random() * this.dimension.height;
            if( this.end_point.y >= this.dimension.height - 1)
                this.end_point.y --;
            if( this.end_point.y == 0)
                this.end_point.y++;

            /* Side --> Rigth */
            this.contour.push([this.dimension.height,this.dimension.width-1+1]);
            this.contour.push([this.end_point.y+1,this.dimension.width-1+1]);
            
            this.contour.push([this.end_point.y-1,this.dimension.width-1+1]);
            this.contour.push([0-1,this.dimension.width-1+1]);

            /* Others */
            /*Left*/
            this.contour.push([0-1,0-1]);
            this.contour.push([this.dimension.height,0-1]);

            /*Top*/
            this.contour.push([this.dimension.height-1+1,-1]);        
            this.contour.push([this.dimension.height-1+1,this.dimension.width]);  

        }

        /* Generate weight matrix */
        this.matrix_wei  = new Array(this.dimension.height);
        for( let i = 0; i < this.dimension.height; i++){
            this.matrix_wei [i] = new Array(this.dimension.width);
            for(let j = 0; j < this.dimension.width; j++)
                this.matrix_wei[i][j] = new Array();
        }
            

        
        for(let i = 0; i < this.dimension.height ;i++){
            for( let j = 0 ; j < this.dimension.width;j++){
                this.matrix_wei[i][j] = this.matrix_wei [i][j].concat(this.generateAdjacentNodes([i,j]));
            }
        }

        this.prims();

    }
     prims( ) {

        // arbitrarily choose initial vertex from graph
        let nodo = [0 ,0];/*Row*/ /*Column*/
    

        // initialize empty edges array and empty MST
        let MST = [];
        let edges = [];
        let minEdge = [null , [null,null, Infinity]];
        let visited = [];
        

    
        // run prims algorithm until we create an MST
        // that contains every vertex from the graph
        while (MST.length < this.dimension.width * this.dimension.height -1) {


            // mark this vertex as visited
            visited.push(nodo[0]+" "+nodo[1]);

            // add each edge to list of potential edges
            let len = this.matrix_wei[nodo[0]][nodo[1]].length;
            for (var r = 0; r < len ; r++) {
                if(visited.indexOf(this.matrix_wei[nodo[0]][nodo[1]][r][0] + " " + this.matrix_wei[nodo[0]][nodo[1]][r][1]) == -1){
                    // console.log("PUSH: "+ this.matrix_wei[nodo[0]][nodo[1]][r][0] + " " + this.matrix_wei[nodo[0]][nodo[1]][r][1]);
                    edges.push([[nodo[0],nodo[1]],this.matrix_wei[nodo[0]][nodo[1]][r]]); 
                }
                /* Two Arrays  First --> Origin Node[x,y]  Second ---> Final Node[x,y,weigth] */
            }
    
            // find edge with the smallest weight to a vertex
            // that has not yet been visited
            for (var e = 0; e < edges.length; e++) {
                // console.log(edges[1]);
                if (edges[e][1][2] < minEdge[1][2] && visited.indexOf(edges[e][1][0]+" "+edges[e][1][1]) == -1) {
                    minEdge = edges[e];
                }else{
                }
            }
    
            // remove min weight edge from list of edges
            // console.log("Antes: " + edges.length);
            edges.splice(edges.indexOf(minEdge), 1);
            // console.log("Despues: " + edges.length);
            
            // push min edge to MST
            MST.push(minEdge);
            
            // console.log(MST.length);
            // start at new vertex and reset min edge

            nodo = [minEdge[1][0],minEdge[1][1]];
            minEdge = [null , [null,null, Infinity]];
        }
    
        this.path_lab = MST;
        // console.log("MATRIZ DE PESO:");
        // console.log(this.matrix_wei);
        // console.log("Path:");
        // console.log(this.path_lab );
    }

   
}

