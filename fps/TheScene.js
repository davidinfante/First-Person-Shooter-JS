
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
    this.robot = null;
    this.ground = null;
    this.fly = null;
    this.crosshair = null;
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
    this.camera.position.set (0, 7, -100);
    //var look = new THREE.Vector3 (5, 7, 0);
    //this.camera.lookAt(look);

    this.controls = new THREE.TrackballControls (this.camera, renderer);
    this.controls.rotateSpeed = 5;
    this.controls.zoomSpeed = -2;
    this.controls.panSpeed = 0.5;
    //this.controls.target = look;


    // Create the Crosshair
    var crosshair = new Crosshair();
    this.camera.add( crosshair );

    // Place it in the center
    var crosshairPercentX = 50;
    var crosshairPercentY = 50;
    var crosshairPositionX = (crosshairPercentX / 100) * 2 - 1;
    var crosshairPositionY = (crosshairPercentY / 100) * 2 - 1;
    crosshair.position.set((crosshairPercentX / 100) * 2 - 1, (crosshairPercentY / 100) * 2 - 1, -0.3);


    this.add(this.camera);
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
  
  /// It creates the geometric model: robot and ground
  /**
   * @return The model
   */
  createModel () {
    var loader = new THREE.TextureLoader();
    var textura = loader.load ("imgs/wood.jpg");
    var model = new THREE.Object3D();

    this.fly = new FlyObj();
    model.add (this.fly);

    this.robot = new Robot();
    //model.add (this.robot);
    
    this.ground = new Ground (200, 300, new THREE.MeshPhongMaterial ({map: textura}));
    model.add (this.ground);

    this.crosshair = new Crosshair();
    model.add( this.crosshair );

    return model;
  }

  
  /// It sets the robot position according to the GUI
  /**
   * @controls - The GUI information
   */
  animate (controls) {
    this.axis.visible = controls.axis;
    this.spotLight.visible = controls.light1onoff;
    this.spotLight.intensity = controls.lightIntensity;
    this.robot.animateRobot(controls.headRotation, controls.bodyRotation, controls.robotExtension);

    this.fly.update();
  }
  
  moveForwCamera () {
    this.camera.position.z += 1;
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

