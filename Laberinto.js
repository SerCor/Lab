/* labyrinth program */

class Laberinto{

    constructor( dimension,reference_point = [0,0],dimension3D = false ){
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

        this.dimension.width = dimension[0];
        this.dimension.height = dimension[1]

        this.init_point  = [this.reference_point.x+ Math.random() * dimension[0],this.reference_point.y ];
        /* Margin 5*/
        if( this.init_point[0] >= this.reference_point[0]-5)
            this.init_point[0] -= 5;
        
        this.end_point = []; // The definition of end point is in the generateLabyrinth function 
        this.dimension3D = dimension3D;
        this.generateLabyrinth();

        this.prims();

        // let m_weight = new Array( this.dimension[1] );

        // /* Generate random weigth */
        // for( let i = 0; i < this.dimension[0]; i++){
        //     m_weight[i] = new Array(this.dimension[0]);
        //     for(let j = 0; j < this.dimension[0]; j++)
        //         m_weight[i][j] = Math.random() * 10;
        // }

        // this.graph = new Graph( m_weight);

    }

    draw( scene, material = new THREE.LineBasicMaterial( { color: 0xffffff,linewidth: 3 } )){
        
        /* Draw contour */
        this.contour.forEach(element => {
            scene.add(new THREE.Line( element, material ))
        });

        /*Draw content */
        // for(let i = 0; i < this.matrix_wei.length ; i++){
        //     for( let j = 0 ; j < this.matrix_wei[i].length ;j++){
        //         let geo;
        //         let list = this.matrix_wei[i][j];
        //         for(let k = 0;k < list.length;k++){
        //             geo = new THREE.Geometry();
        //             geo.vertices.push(new THREE.Vector3( j+this.reference_point[0],this.reference_point.y+i, this.VAL_Z));  
        //             geo.vertices.push(new THREE.Vector3( list[k][0],list[k][1], this.VAL_Z));  
        //             scene.add(new THREE.Line( geo, material ))
        //         }

        //     }
        // }
        let geo;
        for(let i = 0; i < this.path_lab.length; i++){
            geo = new THREE.Geometry();
            geo.vertices.push(new THREE.Vector3( this.reference_point.x + this.path_lab[i][0][1] /*Column-x*/, this.reference_point.y + this.path_lab[i][0][0]/*Row-y*/,this.VAL_Z));  
            geo.vertices.push(new THREE.Vector3( this.reference_point.x + this.path_lab[i][1][0], this.reference_point.y + this.path_lab[i][1][0],this.VAL_Z));  
            scene.add(new THREE.Line( geo, material ))
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
        this.content = [];
        let geometry = new THREE.Geometry();

        /*  contour of Labyrinth */
        /* Bottom Line */ 
        geometry.vertices.push(new THREE.Vector3( this.reference_point[0],this.reference_point.y, VAL_Z));        
        geometry.vertices.push(new THREE.Vector3( this.init_point[0], this.reference_point.y, VAL_Z));
        this.contour.push(geometry);

        geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3( this.init_point[0] + 5 ,this.reference_point.y, VAL_Z));   
        geometry.vertices.push(new THREE.Vector3( this.reference_point.x+ this.dimension[0] ,this.reference_point.y, VAL_Z));        
        this.contour.push(geometry);

        let side_of_end = Math.random() * 3;
        /* Generate end point  */

        this.end_point = [];

        /* Other Lines */
        if( side_of_end < 1)
        {   
            this.end_point = [this.reference_point[0],this.reference_point.y + Math.random() * this.dimension[1]];
            if( this.end_point[1] >= this.reference_point.y + this.dimension[1] - 5)
                this.end_point[1] -= 5;

            /* Side --> Left */
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3( this.reference_point.x,this.reference_point.y, VAL_Z));        
            geometry.vertices.push(new THREE.Vector3( this.reference_point.x,this.end_point[1], VAL_Z));   
            this.contour.push(geometry);

            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3( this.reference_point.x,this.end_point[1] + 2, VAL_Z));    
            geometry.vertices.push(new THREE.Vector3( this.reference_point.x,this.reference_point.y + this.dimension[1], VAL_Z));   
            this.contour.push(geometry);
            
            /* Others */
            /*Top*/
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3( this.reference_point.x,this.reference_point.y + this.dimension[1], VAL_Z));        
            geometry.vertices.push(new THREE.Vector3( this.reference_point.x+ this.dimension[0],this.reference_point.y + this.dimension[1], VAL_Z));   
            this.contour.push(geometry);
            /*Rigth*/
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3( this.reference_point.x+ this.dimension[0]  ,this.reference_point.y + this.dimension[1], VAL_Z))
            geometry.vertices.push(new THREE.Vector3( this.reference_point.x+ this.dimension[0]  ,this.reference_point.y , VAL_Z))
            this.contour.push(geometry);


        }else if( side_of_end < 2){
            this.end_point = [ this.reference_point.x+ Math.random() * (this.dimension[0]), this.reference_point.y];
            if( this.end_point[0] >= this.reference_point.x+ this.dimension[0] -5 )
                this.end_point[0] -= 5;

            /* Side --> Top*/
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3( this.reference_point.x,this.reference_point.y + this.dimension[1], VAL_Z));        
            geometry.vertices.push(new THREE.Vector3( this.end_point[0] ,this.reference_point.y + this.dimension[1], VAL_Z));   
            this.contour.push(geometry);

            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3( this.end_point[0] + 5,this.reference_point.y + this.dimension[1], VAL_Z));        
            geometry.vertices.push(new THREE.Vector3( this.reference_point.x+ this.dimension[0],this.reference_point.y + this.dimension[1], VAL_Z));   
            this.contour.push(geometry);

            /* Others */
            /*Rigth*/
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3( this.reference_point.x+ this.dimension[0]  ,this.reference_point.y + this.dimension[1], VAL_Z))
            geometry.vertices.push(new THREE.Vector3( this.reference_point.x+ this.dimension[0]  ,this.reference_point.y , VAL_Z))
            this.contour.push(geometry);
            /*Left*/
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3( this.reference_point.x,this.reference_point.y, VAL_Z));        
            geometry.vertices.push(new THREE.Vector3( this.reference_point.x,this.reference_point.y + this.dimension[1], VAL_Z));   
            this.contour.push(geometry);

        }else{
            this.end_point = [this.reference_point.x+ this.dimension[0] , this.reference_point.y + Math.random() * this.dimension[1]];
            if( this.end_point[1] >= this.reference_point.y + this.dimension[1] - 5)
                this.end_point[1] -= 5;

            /* Side --> Rigth */
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3( this.reference_point.x+ this.dimension[0]  ,this.reference_point.y , VAL_Z))
            geometry.vertices.push(new THREE.Vector3( this.reference_point.x+ this.dimension[0]  ,this.end_point[1], VAL_Z))
            this.contour.push(geometry);
            
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3( this.reference_point.x+ this.dimension[0]  , this.end_point[1] + 2, VAL_Z))
            geometry.vertices.push(new THREE.Vector3( this.reference_point.x+ this.dimension[0]  , this.reference_point.y + this.dimension[1], VAL_Z))
            this.contour.push(geometry);

            /* Others */
            /*Left*/
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3( this.reference_point.x,this.reference_point.y, VAL_Z));        
            geometry.vertices.push(new THREE.Vector3( this.reference_point.x,this.reference_point.y + this.dimension[1], VAL_Z));   
            this.contour.push(geometry);
            /*Top*/
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3( this.reference_point.x,this.reference_point.y + this.dimension[1], VAL_Z));        
            geometry.vertices.push(new THREE.Vector3( this.reference_point.x+ this.dimension[0],this.reference_point.y + this.dimension[1], VAL_Z));   
            this.contour.push(geometry);

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






    }
     prims( ) {

        // arbitrarily choose initial vertex from graph
        let nodo = [0 /*Row*/,0/*Column*/];
    
        // initialize empty edges array and empty MST
        let MST = [];
        let edges = [];
        let minEdge = [null , [null,null, Infinity]];
        let visited = [];
        console.log("INIT");
        console.log(visited);
        console.log("------");


    
        // run prims algorithm until we create an MST
        // that contains every vertex from the graph
        while (MST.length !== this.dimension.width * this.dimension.height -1) {
            
            // mark this vertex as visited
            visited.push(nodo);
            console.log("visited:");
            console.log(visited);
            
            // add each edge to list of potential edges
            let len = this.matrix_wei[nodo[0]][nodo[1]].length;
            for (var r = 0; r < len ; r++) {
                if(visited.indexOf([this.matrix_wei[nodo[0]][nodo[1]][r][0],this.matrix_wei[nodo[0]][nodo[1]][r][1]]) == -1)
                    edges.push([[nodo[0],nodo[1]],this.matrix_wei[nodo[0]][nodo[1]][r]]); 
                /* Two Arrays  First --> Origin Node[x,y]  Second ---> Final Node[x,y,weigth] */
            }
    
            // find edge with the smallest weight to a vertex
            // that has not yet been visited
            for (var e = 0; e < edges.length; e++) {
                // console.log(edges[1]);
                if (edges[e][1][2] < minEdge[1][2] && visited.indexOf([edges[e][1][0],edges[e][1][1]]) == -1) {
                    minEdge = edges[e];
                }else{
                }
            }
    
            // remove min weight edge from list of edges
            edges.splice(edges.indexOf(minEdge), 1);
    
            // push min edge to MST
            MST.push(minEdge);
    
            // start at new vertex and reset min edge

            nodo = [minEdge[1][0],minEdge[1][1]];
            minEdge = [null , [null,null, Infinity]];
        }
    
        this.path_lab = MST;
        console.log(this.path_lab );
    }

   
}

