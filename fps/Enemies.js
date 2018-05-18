
/// The Enemies class
/**
 * @author David Infante, Jose Ariza
 * 
 */

class Enemies {

  constructor () {

    this.enemies_size = 0;
    this.enemies = [];

    var loader = new THREE.TextureLoader();
    var diana = loader.load ("imgs/diana.png");

    var mat = Physijs.createMaterial(new THREE.MeshPhongMaterial ({map: diana}), 1, 1);

    var objetivo1 = new Physijs.BoxMesh (new THREE.BoxGeometry (7.5, 10, 2.5, 1, 1, 1), mat, 1);
    objetivo1.applyMatrix (new THREE.Matrix4().makeTranslation (5, 11, -200));
    objetivo1.receiveShadow = true;
    objetivo1.autoUpdateMatrix = false;
    this.enemies.push(objetivo1);
    ++this.enemies_size;

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
    this.enemies.push(objetivo2);
    ++this.enemies_size;

    objetivo2.addEventListener ( 'collision' , function (elOtroObjeto , velocidad , rotacion , normal) { 
      var sound = new Howl({
        src: ['sounds/death.mp3'], volume: 0.3
      });
      sound.play();
    });
    

    return this;
  }

  getEnemies(i) {
    return this.enemies[i];
  }

  getEnemiesSize() {
    return this.enemies_size;
  }
}
