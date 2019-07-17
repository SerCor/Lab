
const control_labyrinth = {
    /* Dimension of labyrinth */
        width: 25,
        heigth: 25,
    init : function(){
        /* Init space for three js, the timer time, and load the marked saved */
        
        let scene = new THREE.Scene();
        let camera = new THREE.PerspectiveCamera( 70, 1 , 0.1, 500 );

        let renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        let zone_canvas =  document.getElementById("scene");
        let canvas = renderer.domElement;
        zone_canvas.appendChild( canvas );


        labery = new Laberinto([control_labyrinth.width,control_labyrinth.heigth],[-(control_labyrinth.width / 2),-(control_labyrinth.heigth/2)]);
        labery.draw(scene);
        camera.position.z = 30;

        let animate = function () {
            requestAnimationFrame( animate );

            renderer.render( scene, camera );
        };

        animate();
    },
};

window.addEventListener("load",control_labyrinth.init);

