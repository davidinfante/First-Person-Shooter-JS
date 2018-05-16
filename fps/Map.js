
/// The Map class
/**
 * @author David Infante, Jose Ariza
 * 
 * @param aMaterial - The material of the map
 * @param mass - Physijs mass
 */

class Map {

  constructor () {

    this.map_size = 0;
    this.map = [];

    var loader = new THREE.TextureLoader();
    var textura = loader.load ("imgs/wood.jpg");
    var diana = loader.load ("imgs/diana.png");

    var mat = Physijs.createMaterial(new THREE.MeshPhongMaterial ({map: textura}),1,0);
    
    var start1 = new Physijs.BoxMesh (new THREE.BoxGeometry (200, 0.0, 200, 1, 1, 1), mat, 0);
    start1.applyMatrix (new THREE.Matrix4().makeTranslation (0, 0, 0));
    start1.receiveShadow = true;
    start1.autoUpdateMatrix = false;
    this.map.push(start1);
    ++this.map_size;

    var enemies2 = new Physijs.BoxMesh (new THREE.BoxGeometry (200, 8, 400, 1, 1, 1), mat, 0);
    enemies2.applyMatrix (new THREE.Matrix4().makeTranslation (0, 2, -300));
    enemies2.receiveShadow = true;
    enemies2.autoUpdateMatrix = false;
    this.map.push(enemies2);
    ++this.map_size;

    var bullets3 = new Physijs.BoxMesh (new THREE.BoxGeometry (50, 0.0, 50, 1, 1, 1), mat, 0);
    bullets3.applyMatrix (new THREE.Matrix4().makeTranslation (0, -10, 0));
    bullets3.receiveShadow = false;
    bullets3.autoUpdateMatrix = false;
    this.map.push(bullets3);
    ++this.map_size;

    var fenceS4 = new Physijs.BoxMesh (new THREE.BoxGeometry (200, 10, 20, 1, 1, 1), mat, 0);
    fenceS4.applyMatrix (new THREE.Matrix4().makeTranslation (0, 2.5, 100));
    fenceS4.receiveShadow = true;
    fenceS4.autoUpdateMatrix = false;
    this.map.push(fenceS4);
    ++this.map_size;

    var fenceE5 = new Physijs.BoxMesh (new THREE.BoxGeometry (20, 10, 200, 1, 1, 1), mat, 0);
    fenceE5.applyMatrix (new THREE.Matrix4().makeTranslation (100, 2.5, 0));
    fenceE5.receiveShadow = true;
    fenceE5.autoUpdateMatrix = false;
    this.map.push(fenceE5);
    ++this.map_size;

    var fenceW6 = new Physijs.BoxMesh (new THREE.BoxGeometry (20, 10, 200, 1, 1, 1), mat, 0);
    fenceW6.applyMatrix (new THREE.Matrix4().makeTranslation (-100, 2.5, 0));
    fenceW6.receiveShadow = true;
    fenceW6.autoUpdateMatrix = false;
    this.map.push(fenceW6);
    ++this.map_size;

    //More parts of the map

    mat = Physijs.createMaterial(new THREE.MeshPhongMaterial ({map: diana}), 1, 1);

    var objetivo1 = new Physijs.BoxMesh (new THREE.BoxGeometry (7.5, 10, 2.5, 1, 1, 1), mat, 1);
    objetivo1.applyMatrix (new THREE.Matrix4().makeTranslation (5, 11, -200));
    objetivo1.receiveShadow = true;
    objetivo1.autoUpdateMatrix = false;
    this.map.push(objetivo1);
    ++this.map_size;

    objetivo1.addEventListener ( 'collision' , function (elOtroObjeto , velocidad , rotacion , normal) { 
      var sound = new Howl({
        src: ['sounds/death.mp3'], volume: 0.3
      });
      sound.play();
    });

    var objetivo2 = new Physijs.BoxMesh (new THREE.BoxGeometry (7.5, 10, 2.5, 1, 1, 1), mat, 1);
    objetivo2.applyMatrix (new THREE.Matrix4().makeTranslation (-5, 11, -200));
    objetivo2.receiveShadow = true;
    objetivo2.autoUpdateMatrix = false;
    this.map.push(objetivo2);
    ++this.map_size;

    objetivo2.addEventListener ( 'collision' , function (elOtroObjeto , velocidad , rotacion , normal) { 
      var sound = new Howl({
        src: ['sounds/death.mp3'], volume: 0.3
      });
      sound.play();
    });
    

    return this;
  }

  getMap(i) {
    return this.map[i];
  }

  getMapSize() {
    return this.map_size;
  }
}
