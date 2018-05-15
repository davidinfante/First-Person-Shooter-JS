/// The Model Facade class. The root node of the graph.
/**
 * @param renderer - The renderer to visualize the scene
 */
 
class TheScene extends Physijs.Scene {
  
  constructor (renderer, aCamera) {

    super();
    this.setGravity(new THREE.Vector3 (0, -20, 0));

    // Attributes
    this.ambientLight = null;
    this.spotLight = null;
    this.camera = aCamera;
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
    // Create the Crosshair
    var crosshair = new Crosshair();
    this.camera.add( crosshair );

    // Place it in the center
    var crosshairPercentX = 50;
    var crosshairPercentY = 50;
    var crosshairPositionX = (crosshairPercentX / 100) * 2 - 1;
    var crosshairPositionY = (crosshairPercentY / 100) * 2 - 1;
    crosshair.position.set((crosshairPercentX / 100) * 2 - 1, (crosshairPercentY / 100) * 2 - 1, -0.3);
  }

  dispara() {
    if(this.index >= this.maxBullets){
      this.index = 0;
      this.bullets.reload();
    }
    this.bullets.dispara(this.index, this.avatar.getPosition(), this.camera.getWorldDirection());
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

    this.avatar = new Avatar(this.camera, controls, this);

    this.skybox = new Skybox();
    model.add(this.skybox);

    var loader = new THREE.TextureLoader();
    var textura = loader.load ("imgs/wood.jpg");

    this.bullets = new Bullets(this.maxBullets, this, (new THREE.MeshPhongMaterial ({map: textura})));

    //Creates the map
    var loader = new THREE.TextureLoader();
    var textura = loader.load ("imgs/wood.jpg");
    var mat = Physijs.createMaterial(new THREE.MeshPhongMaterial ({map: textura}),1,0);
    this.map = new Map();
    for (var i = 0; i < this.map.getMapSize(); ++i) {
      this.add(this.map.getMap(i));
    }

    return model;
  }


  
  /// 
  /**
   * @controls - The GUI information
   */
  animate (GUIcontrols, delta) {
    this.simulate();
    this.axis.visible = GUIcontrols.axis;
    this.spotLight.visible = GUIcontrols.lightonoff;
    this.spotLight.intensity = GUIcontrols.lightIntensity;


    //Controls and Movements update
    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;

    direction.z = Number( moveForward ) - Number( moveBackward );
    direction.x = Number( moveLeft ) - Number( moveRight );
    direction.normalize();

    if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
    if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;

    if (moveForward) this.avatar.moveForward( velocity.x*delta, velocity.z*delta );
    if (moveBackward) this.avatar.moveBackward( -velocity.x*delta, -velocity.z*delta );
    if (moveLeft) this.avatar.moveLeft( velocity.z*delta, -velocity.x*delta );
    if (moveRight) this.avatar.moveRight( velocity.x*delta, velocity.z*delta );

    if (jumping) {
      this.avatar.jump();
    }

    this.avatar.updateControls();
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

