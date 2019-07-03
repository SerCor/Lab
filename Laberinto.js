/* labyrinth program */

class Laberinto{

    constructor( dimension,reference_point = [0,0],dimension3D = false ){
        this.reference_point = reference_point;
        this.dimension = dimension;
        this.init_point_x  = reference_point[0] + Math.random() * (dimension[0]-5);
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
        geometry.vertices.push(new THREE.Vector3( this.init_point_x , this.reference_point[1], VAL_Z));
        this.contour.push(geometry);

        geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3( this.init_point_x  + 5 ,this.reference_point[1], VAL_Z));   
        geometry.vertices.push(new THREE.Vector3( this.reference_point[0] + this.dimension[0] ,this.reference_point[1], VAL_Z));        
        this.contour.push(geometry);

        let side_of_end = Math.random() * 3;

        /* Other Lines */
        if( side_of_end < 1)
        {
            /* Side --> Left */
            let end_point_y = this.reference_point[1] + Math.random() * (this.dimension[1]-2);
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3( this.reference_point[0] ,this.reference_point[1], VAL_Z));        
            geometry.vertices.push(new THREE.Vector3( this.reference_point[0] ,end_point_y, VAL_Z));   
            this.contour.push(geometry);

            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3( this.reference_point[0] ,end_point_y + 2, VAL_Z));    
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
            /* Side --> Top*/
            let end_point_x = this.reference_point[0] + Math.random() * (this.dimension[0]-5);
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3( this.reference_point[0] ,this.reference_point[1] + this.dimension[1], VAL_Z));        
            geometry.vertices.push(new THREE.Vector3( end_point_x ,this.reference_point[1] + this.dimension[1], VAL_Z));   
            this.contour.push(geometry);

            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3( end_point_x + 5,this.reference_point[1] + this.dimension[1], VAL_Z));        
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
            /* Side --> Rigth */
            let end_point_y = this.reference_point[1] + Math.random() * (this.dimension[1]-2);
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3( this.reference_point[0] + this.dimension[0]  ,this.reference_point[1] , VAL_Z))
            geometry.vertices.push(new THREE.Vector3( this.reference_point[0] + this.dimension[0]  ,end_point_y, VAL_Z))
            this.contour.push(geometry);
            
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3( this.reference_point[0] + this.dimension[0]  , end_point_y + 2, VAL_Z))
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