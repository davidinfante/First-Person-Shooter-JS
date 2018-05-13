/// The Model Facade class. The root node of the graph.
/**
 * @param renderer - The renderer to visualize the scene
 */
 
class TheScene extends Physijs.Scene {
  
  constructor (renderer) {
    super();
    this.setGravity(new THREE.Vector3 (0, -10, 0));

    // Attributes
    this.ambientLight = null;
    this.spotLight = null;
    this.camera = null;
    this.controls = null;
    this.map = null;
    this.skybox = null;
    this.crosshair = null;
    this.Bullets = null;
    this.index = 0;
    this.maxBullets = 20;
    this.avatar = null;
    this.createLights ();
    this.createCamera (renderer);
    this.axis = new THREE.AxisHelper (25);
    this.add (this.axis);
    this.model = this.createModel ();
    this.add (this.model);


  }
  
  /// It creates the camera and adds it to the graph
  /**
   * @param renderer - The renderer associated with the camera
   */
  createCamera (renderer) {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set (0, 5, 0);
    var look = new THREE.Vector3 (8,8,8);
    this.camera.lookAt(look);

    /*this.controls = new THREE.TrackballControls (this.camera, renderer);
    this.controls.rotateSpeed = 5;
    this.controls.zoomSpeed = -2;
    this.controls.panSpeed = 0.5;
    this.controls.target = look;*/

    this.controls = new THREE.FirstPersonControls (this.camera, renderer);
    this.controls.lookSpeed = 0.1;
    this.controls.movementSpeed = 50;
    this.controls.noFly = true;
    this.controls.lookVertical = true;
    this.controls.constrainVertical = true;
    this.controls.verticalMin = 1.0;
    this.controls.verticalMax = 2.0;
    this.controls.lon = -150;
    this.controls.lat = 120;
    this.controls.target = look;

    // Create the Crosshair
    var crosshair = new Crosshair();
    this.camera.add( crosshair );

    // Place it in the center
    var crosshairPercentX = 50;
    var crosshairPercentY = 50;
    var crosshairPositionX = (crosshairPercentX / 100) * 2 - 1;
    var crosshairPositionY = (crosshairPercentY / 100) * 2 - 1;
    crosshair.position.set((crosshairPercentX / 100) * 2 - 1, (crosshairPercentY / 100) * 2 - 1, -0.3);

    //this.add(this.camera);
  }

  dispara() {
    if(this.index >= this.maxBullets) this.index = 0;
    this.bullets.dispara(this.index, this.avatar.getPosition(), this.controls.getTarget(), this.camera.position.y);
    this.index++;
  }

  jump(){
    this.avatar.jump();
  }
  
  /// It creates lights and adds them to the graph
  createLights () {
    // add subtle ambient lighting
    this.ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
    this.add (this.ambientLight);
    
    // add spotlight for the shadows
    this.spotLight = new THREE.SpotLight( 0xffffff );
    this.spotLight.position.set( 0, 500, 1000 );
    this.spotLight.intensity = 1;
    this.spotLight.castShadow = true;
    // the shadow resolution
    this.spotLight.shadow.mapSize.width=2048;
    this.spotLight.shadow.mapSize.height=2048;
    this.add (this.spotLight);
  }
  
  /// It creates the geometric model: ground
  /**
   * @return The model
   */
  createModel () {
    var model = new THREE.Object3D();

    this.crosshair = new Crosshair();
    model.add( this.crosshair );

    this.avatar = new Avatar(this.camera, this.controls, this);
    //model.add(this.avatar);

    this.skybox = new Skybox();
    model.add(this.skybox);

    var loader = new THREE.TextureLoader();
    var textura = loader.load ("imgs/wood.jpg");

    this.bullets = new Bullets(this.maxBullets, this, (new THREE.MeshPhongMaterial ({map: textura})));

    //Creates the map
    var loader = new THREE.TextureLoader();
    var textura = loader.load ("imgs/wood.jpg");
    var mat = Physijs.createMaterial(new THREE.MeshPhongMaterial ({map: textura}),1,0);
    this.map = new Map(mat, 0);
    for (var i = 0; i < this.map.getMapSize(); ++i) {
      this.add(this.map.getMap(i));
    }

    return model;
  }


  
  /// 
  /**
   * @controls - The GUI information
   */
  animate (controls) {
    this.simulate();
    this.axis.visible = controls.axis;
    this.spotLight.visible = controls.lightonoff;
    this.spotLight.intensity = controls.lightIntensity;

    for(var i=0; i<this.maxBullets; ++i){
      if(this.bullets.getLaunched(i))
        this.bullets.update(i);
    }
    /*
    if(this.avatar.getJumping())
      this.avatar.jump();
      */
  }
  
  moveForward () {
    this.avatar.moveForward();
  }

  moveBackward () {
    this.avatar.moveBackward();
  }

  moveLeft () {
    this.avatar.moveLeft();
  }

  moveRight () {
    this.avatar.moveRight();
  }


  /// It returns the camera
  /**
   * @return The camera
   */
  getCamera () {
    return this.camera;
  }
  
  /// It returns the camera controls
  /**
   * @return The camera controls
   */
  getCameraControls () {
    return this.controls;
  }
  
  /// It updates the aspect ratio of the camera
  /**
   * @param anAspectRatio - The new aspect ratio for the camera
   */
  setCameraAspect (anAspectRatio) {
    this.camera.aspect = anAspectRatio;
    this.camera.updateProjectionMatrix();
  }
  
}

