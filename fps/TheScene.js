/// The Model Facade class. The root node of the graph.
/**
 * @param renderer - The renderer to visualize the scene
 */
 
class TheScene extends Physijs.Scene {
  
  constructor (renderer, aCamera) {

    super();
    this.setGravity(new THREE.Vector3 (0, -50, 0));

    this.camera = aCamera;
    this.createCrosshair(renderer);

    this.avatar = null;
    this.map = null;
    this.enemies = null;
    this.skybox = null;
    this.Bullets = null;
    this.index = 0;
    this.maxBullets = 20;
    this.actualAmmo = 20; //Balas totales antes de acabar el juego
    this.score = 0;

    this.createHUD();

    this.createAvatar();
    this.avatar.loadWeapons();
    this.place = this.createPlace();
    this.createBullets();
    this.createEnemies();


    this.ambientLight = null;
    this.spotLight = null;
    this.createLights();

    this.add(this.place);
  }
  
  createHUD() {
    var score = document.createElement('div');
    score.id = "score";
    score.style.position = 'absolute';
    score.style.width = 1;
    score.style.height = 1;
    score.innerHTML = "Puntuación: " + this.score;
    score.style.top = 50 + 'px';
    score.style.left = 50 + 'px';
    score.style.fontSize = 50 + 'px';
    score.style.color = "white";
    document.body.appendChild(score);
    var ammo = document.createElement('div');
    ammo.id = "ammo";
    ammo.style.position = 'absolute';
    ammo.style.width = 1;
    ammo.style.height = 1;
    ammo.innerHTML = "Munición: " + this.actualAmmo;
    ammo.style.top = 100 + 'px';
    ammo.style.left = 50 + 'px';
    ammo.style.fontSize = 50 + 'px';
    ammo.style.color = "white";
    document.body.appendChild(ammo);
  }

  updateHUD() {
    var text = document.getElementById("ammo");
    text.innerHTML = "Munición: " + this.actualAmmo;
  }

  /// It creates the camera and adds it to the graph
  /**
   * @param renderer - The renderer associated with the camera
   */
  createCrosshair(renderer) {
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
      this.actualAmmo--;
    }
  }
  
  /// It creates lights and adds them to the graph
  createLights() {
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
  
  /// It creates the place
  /**
   * @return place
   */
  createPlace() {
    var place = new THREE.Object3D();    

    this.skybox = new Skybox();
    place.add(this.skybox);

    //Creates the map
    this.map = new Map();
    for (var i = 0; i < this.map.getMapSize(); ++i) {
      this.add(this.map.getMap(i));
    }

    return place;
  }

  /// It creates the avatar
  /**
   *
   */
  createAvatar() {
    this.avatar = new Avatar(this.camera, this);
  }

  /// It creates the bullets
  /**
   *
   */
  createBullets() {
    var loader = new THREE.TextureLoader();
    var textura = loader.load ("imgs/bullettext.jpg");
    this.bullets = new Bullets(this.maxBullets, this, (new THREE.MeshPhongMaterial ({map: textura})));
  }

  /// It creates the enemies
  /**
   *
   */
  createEnemies() {
    this.enemies = new Enemies();
    for (var i = 0; i < this.enemies.getEnemiesSize(); ++i) {
      this.add(this.enemies.getEnemies(i));
    }
  }

  endGame() {
    enableControls = false;
    controls.enabled = false;
    moveForward = false;
    moveBackward = false;
    moveLeft = false;
    moveRight = false;
    jumping = false;

    var finalScore = document.createElement('div');
    finalScore.id = "finalScore";
    finalScore.style.position = 'absolute';
    finalScore.style.width = 1;
    finalScore.style.height = 1;
    finalScore.innerHTML = "Puntuación final: " + this.score;
    finalScore.style.top = 400 + 'px';
    finalScore.style.left = 750 + 'px';
    finalScore.style.fontSize = 50 + 'px';
    finalScore.style.color = "white";
    document.body.appendChild(finalScore);
    var restart = document.createElement('div');
    restart.id = "restart";
    restart.style.position = 'absolute';
    restart.style.width = 1;
    restart.style.height = 1;
    restart.innerHTML = "Pulsa la tecla P para volver a jugar";
    restart.style.top = 450 + 'px';
    restart.style.left = 600 + 'px';
    restart.style.fontSize = 50 + 'px';
    restart.style.color = "white";
    document.body.appendChild(restart);
  }
  
  /// 
  /**
   * @controls - The GUI information
   */
  animate (GUIcontrols, delta) {
    this.simulate();

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

    this.updateHUD();

    if (this.actualAmmo == 0) {
      this.endGame();
    }
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
  
  newGame() {
    document.getElementById("finalScore").style.display = 'none';
    document.getElementById("restart").style.display = 'none';

    this.avatar.setInitialPosition();
    this.actualAmmo = 20;
    this.score = 0;
    for (var i = 0; i < this.enemies.getEnemiesSize(); ++i) {
      this.remove(this.enemies.getEnemies(i));
    }
    this.createEnemies();

    enableControls = true;
    controls.enabled = true;
  }

}

