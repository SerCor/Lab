
const control_lab = {
    /* Dimension of labyrinth */
        width: 25,
        heigth: 25,
        timer:0,
        try:0,
    init : function(){
        control_lab.timerContainer  = document.getElementById("timerContainer");
        control_lab.tryContainer = document.getElementById("tryContainer");

        /* Init space for three js, the timer time, and load the marked saved */
        
        let scene = new THREE.Scene();
        let camera = new THREE.PerspectiveCamera( 70, 1 , 0.1, 500 );

        let renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        let zone_canvas =  document.getElementById("scene");
        let canvas = renderer.domElement;
        zone_canvas.innerHTML = "";
        zone_canvas.appendChild( canvas );


        labery = new Laberinto([control_lab.width,control_lab.heigth],[-(control_lab.width / 2),-(control_lab.heigth/2)]);
        labery.draw(scene);
        camera.position.z = 30;

        let animate = function () {
            requestAnimationFrame( animate );

            renderer.render( scene, camera );
        };

        animate();
    },
    runGame:function(){
        /* Elements of time */
        if(this.handlerTimer)
            clearInterval(this.handlerTimer);

        control_lab.try++;
        control_lab.timer = 0;

        timerContainer.value = control_lab.timer;
        tryContainer.value = control_lab.try;

        control_lab.handlerTimer = setInterval(function(){ control_lab.timer++; timerContainer.value = control_lab.timer;},1000);

        /* Elements of position of gamer */

    },
    reInit:function(){
        this.try = 0;
        if(control_lab.handlerTimer)
            clearInterval(control_lab.handlerTimer);
        
        control_lab.init();
        control_lab.timerContainer.value = 0;
        control_lab.tryContainer.value = 0;
    }
};

window.addEventListener("load",control_lab.init);

