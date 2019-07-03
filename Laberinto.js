/* labyrinth program */

class Laberinto{

    constructor( dimension,reference_point = [0,0],dimension3D = false ){
        this.reference_point = reference_point;
        this.dimension = dimension;
        this.init_point  = [reference_point[0] + Math.random() * dimension[0],reference_point[1] ];
        /* Margin 5*/
        if( this.init_point[0] >= this.reference_point[0]-5)
            this.init_point[0] -= 5;
        
        this.end_point = []; // The definition of end point is in the generateLabyrinth function 
        this.dimension3D = dimension3D;
        this.generateLabyrinth();
    }

    draw( scene, material = new THREE.LineBasicMaterial( { color: 0xffffff,linewidth: 3 } )){
        
        /* Draw contour */
        this.contour.forEach(element => {
            scene.add(new THREE.Line( element, material ))
        });

        /*Draw content */


    }

    veirificateCollisions( pos ){
        if( pos.length != 2 )
            throw "";
        else{

        }
    }

    generateLabyrinth( ){
        /* Make aleatory labyrinth */

        const VAL_Z = this.dimension3D == true? 5:0;
        this.contour = [];
        this.content = [];
        let geometry = new THREE.Geometry();

        /* Draw contour of Labyrinth */
        /* Bottom Line */ 
        geometry.vertices.push(new THREE.Vector3( this.reference_point[0],this.reference_point[1], VAL_Z));        
        geometry.vertices.push(new THREE.Vector3( this.init_point[0], this.reference_point[1], VAL_Z));
        this.contour.push(geometry);

        geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3( this.init_point[0] + 5 ,this.reference_point[1], VAL_Z));   
        geometry.vertices.push(new THREE.Vector3( this.reference_point[0] + this.dimension[0] ,this.reference_point[1], VAL_Z));        
        this.contour.push(geometry);

        let side_of_end = Math.random() * 3;
        /* Generate end point  */

        this.end_point = [];

        /* Other Lines */
        if( side_of_end < 1)
        {   
            this.end_point = [this.reference_point[0],this.reference_point[1] + Math.random() * this.dimension[1]];
            if( this.end_point[1] >= this.reference_point[1] + this.dimension[1] - 5)
                this.end_point[1] -= 5;

            /* Side --> Left */
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3( this.reference_point[0] ,this.reference_point[1], VAL_Z));        
            geometry.vertices.push(new THREE.Vector3( this.reference_point[0] ,this.end_point[1], VAL_Z));   
            this.contour.push(geometry);

            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3( this.reference_point[0] ,this.end_point[1] + 2, VAL_Z));    
            geometry.vertices.push(new THREE.Vector3( this.reference_point[0] ,this.reference_point[1] + this.dimension[1], VAL_Z));   
            this.contour.push(geometry);
            
            /* Others */
            /*Top*/
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3( this.reference_point[0] ,this.reference_point[1] + this.dimension[1], VAL_Z));        
            geometry.vertices.push(new THREE.Vector3( this.reference_point[0] + this.dimension[0],this.reference_point[1] + this.dimension[1], VAL_Z));   
            this.contour.push(geometry);
            /*Rigth*/
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3( this.reference_point[0] + this.dimension[0]  ,this.reference_point[1] + this.dimension[1], VAL_Z))
            geometry.vertices.push(new THREE.Vector3( this.reference_point[0] + this.dimension[0]  ,this.reference_point[1] , VAL_Z))
            this.contour.push(geometry);


        }else if( side_of_end < 2){
            this.end_point = [ this.reference_point[0] + Math.random() * (this.dimension[0]), this.reference_point[1]];
            if( this.end_point[0] >= this.reference_point[0] + this.dimension[0] -5 )
                this.end_point[0] -= 5;

            /* Side --> Top*/
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3( this.reference_point[0] ,this.reference_point[1] + this.dimension[1], VAL_Z));        
            geometry.vertices.push(new THREE.Vector3( this.end_point[0] ,this.reference_point[1] + this.dimension[1], VAL_Z));   
            this.contour.push(geometry);

            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3( this.end_point[0] + 5,this.reference_point[1] + this.dimension[1], VAL_Z));        
            geometry.vertices.push(new THREE.Vector3( this.reference_point[0] + this.dimension[0],this.reference_point[1] + this.dimension[1], VAL_Z));   
            this.contour.push(geometry);

            /* Others */
            /*Rigth*/
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3( this.reference_point[0] + this.dimension[0]  ,this.reference_point[1] + this.dimension[1], VAL_Z))
            geometry.vertices.push(new THREE.Vector3( this.reference_point[0] + this.dimension[0]  ,this.reference_point[1] , VAL_Z))
            this.contour.push(geometry);
            /*Left*/
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3( this.reference_point[0] ,this.reference_point[1], VAL_Z));        
            geometry.vertices.push(new THREE.Vector3( this.reference_point[0] ,this.reference_point[1] + this.dimension[1], VAL_Z));   
            this.contour.push(geometry);

        }else{
            this.end_point = [this.reference_point[0] + this.dimension[0] , this.reference_point[1] + Math.random() * this.dimension[1]];
            if( this.end_point[1] >= this.reference_point[1] + this.dimension[1] - 5)
                this.end_point[1] -= 5;
                
            /* Side --> Rigth */
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3( this.reference_point[0] + this.dimension[0]  ,this.reference_point[1] , VAL_Z))
            geometry.vertices.push(new THREE.Vector3( this.reference_point[0] + this.dimension[0]  ,this.end_point[1], VAL_Z))
            this.contour.push(geometry);
            
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3( this.reference_point[0] + this.dimension[0]  , this.end_point[1] + 2, VAL_Z))
            geometry.vertices.push(new THREE.Vector3( this.reference_point[0] + this.dimension[0]  , this.reference_point[1] + this.dimension[1], VAL_Z))
            this.contour.push(geometry);

            /* Others */
            /*Left*/
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3( this.reference_point[0] ,this.reference_point[1], VAL_Z));        
            geometry.vertices.push(new THREE.Vector3( this.reference_point[0] ,this.reference_point[1] + this.dimension[1], VAL_Z));   
            this.contour.push(geometry);
            /*Top*/
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3( this.reference_point[0] ,this.reference_point[1] + this.dimension[1], VAL_Z));        
            geometry.vertices.push(new THREE.Vector3( this.reference_point[0] + this.dimension[0],this.reference_point[1] + this.dimension[1], VAL_Z));   
            this.contour.push(geometry);

        }
        

     
    }

}