/// The Model Facade class. The root node of the graph.
/**
 * @param renderer - The renderer to visualize the scene
 */
 
class TheScene extends Physijs.Scene {
  
  constructor (renderer, aCamera) {

    super();
    this.setGravity(new THREE.Vector3 (0, -50, 0));

    // Attributes
    this.camera = aCamera;
    this.createCamera (renderer);
    this.avatar = null;
    this.map = null;
    this.skybox = null;
    this.Bullets = null;
    this.index = 0;
    this.maxBullets = 20;
    this.model = this.createModel();
    this.avatar.loadWeapons();
    this.ambientLight = null;
    this.spotLight = null;
    this.createLights ();
    this.axis = new THREE.AxisHelper (25);
    this.add (this.axis);
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
    if(this.index >= this.maxBullets) {
      this.index = 0;
      this.bullets.reload();
    }
    if (!disparando) {
      this.bullets.dispara(this.index, this.avatar.getPosition(), this.camera.getWorldDirection(), this.avatar.getActiveWeapon());
      this.index++;
    }
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

    this.avatar = new Avatar(this.camera, controls, this);

    this.skybox = new Skybox();
    model.add(this.skybox);

    var loader = new THREE.TextureLoader();
    var textura = loader.load ("imgs/bullettext.jpg");

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
    console.log (this.avatar.getActiveWeapon());

    this.simulate();
    this.axis.visible = GUIcontrols.axis;

    if (moveForward) this.avatar.moveForward();
    if (moveBackward) this.avatar.moveBackward();
    if (moveLeft) this.avatar.moveLeft();
    if (moveRight) this.avatar.moveRight();

    if (jumping) {
      this.avatar.jump();
    }

    if (disparando) {
      this.avatar.animateWeapon();
    }

    this.avatar.updateControls();
  }

  changeWeapon() {
    this.avatar.changeWeapon();
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

