
class Graph{
    constructor( weigths ){
        this.list_w = weigths;
    }

    add( list ){
        this.list_ady.push( list );
    }

    remove( source, node_remove ){
       return source.forEach(element => {
           if( element.remove(node_remove) )
                return true;
       }) == true?true:false; 
    }

    prim( init = false ){
        if( init === false ){
            
        }else{
            
        }   
        
        let soruce = new Array( this.list_w.length );
        for(let i = 0; i < this.list_w.length; i++){
            this.list_w[i] = i;
        }

    }


}
