/// The Model Facade class. The root node of the graph.
/**
 * @param renderer - The renderer to visualize the scene
 */
 
class TheScene extends THREE.Scene {
  
  constructor (renderer) {
    super();
    
    // Attributes
    this.ambientLight = null;
    this.spotLight = null;
    this.camera = null;
    this.controls = null;
    this.ground = null;
    this.skybox = null;
    this.crosshair = null;
    this.fly = [];
    this.launched = [];
    for(var i=0; i<10; ++i){
      this.launched[i] = false;
    }
    this.index = 0;
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
    this.camera.position.set (0, 10, 0);

    this.controls = new THREE.FirstPersonControls (this.camera, renderer);
    this.controls.lookSpeed = 0.5;
    this.controls.movementSpeed = 50;
    this.controls.noFly = true;
    this.controls.lookVertical = true;
    this.controls.constrainVertical = true;
    this.controls.verticalMin = 1.0;
    this.controls.verticalMax = 2.0;
    this.controls.lon = -150;
    this.controls.lat = 120;

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
    this.fly[this.index].dispara(this.avatar.getPosition(), this.controls.getTarget());
    this.launched[this.index] = true;
    this.index++;
  }
  
  /// It creates lights and adds them to the graph
  createLights () {
    // add subtle ambient lighting
    this.ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
    this.add (this.ambientLight);
    
    // add spotlight for the shadows
    this.spotLight = new THREE.SpotLight( 0xffffff );
    this.spotLight.position.set( 60, 60, 40 );
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
    var loader = new THREE.TextureLoader();
    var textura = loader.load ("imgs/wood.jpg");
    var model = new THREE.Object3D();
    
    for(var i=0; i<10; i++){
      this.fly[i] = new FlyObj();
      this.add(this.fly[i]);
    }

    this.ground = new Ground (200, 300, new THREE.MeshPhongMaterial ({map: textura}));
    model.add (this.ground);

    this.crosshair = new Crosshair();
    model.add( this.crosshair );

    this.avatar = new Avatar(this.camera, this.controls);
    model.add(this.avatar);

    this.skybox = new Skybox();
    model.add(this.skybox);

    return model;
  }

  
  /// 
  /**
   * @controls - The GUI information
   */
  animate (controls) {
    this.axis.visible = controls.axis;
    this.spotLight.visible = controls.lightonoff;
    this.spotLight.intensity = controls.lightIntensity;

    for(var i=0; i<10; ++i){
      if(this.launched[i])
        this.fly[i].update();
    }
  }
  
  moveForwCamera () {
    this.camera.position.z += 0;
  }

  moveBackCamera () {
    this.camera.position.z -= 1;
  }

  moveLeftCamera () {
    this.camera.position.x += 1;
  }

  moveRightCamera () {
    this.camera.position.x -= 1;
  }

  moveAvatar(){
    this.avatar.moveAvatar();
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

