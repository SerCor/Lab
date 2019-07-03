
class Graph{
    constructor(){
        this.list_ady = [];
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

}
