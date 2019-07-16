/* Implementation of order linked list */

class Linked_List{
    constructor(){
        this.head = null;
        this.size = 0;
    }

    add( element ){
        let newNode = new Node(element);
        if( this.head === null )    /* Empty List*/
            this.head = newNode;
        else{
            let actualPtr = this.head ;
            let beforePtr = null;

            while( actualPtr != null && actualPtr.data > element )
                actualPtr = actualPtr.next;
            
            if( beforePtr === null){
                // First Element in the list 
                newNode.next = this.head.next;
                this.head = newNode;
            }else{
                newNode.next = beforePtr.next;
                beforePtr.next = newNode;
            }
        }
    }

    del( element ){
        if( this.head === null )
            return false;
        else{
            if( typeof(element) === "Iterator_List"){
                
            }
            let actualPtr = this.head ;
            let beforePtr = null;

            while( actualPtr != null && actualPtr.data != element )
                actualPtr = actualPtr.next;
            
            if( beforePtr === null){
                // First Element in the list 
                this.head = this.head.next;
            }else{
                beforePtr.next = actualPtr.next;
            }
        }
    }

    show(){

    }


}