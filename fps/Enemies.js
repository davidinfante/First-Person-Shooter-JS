/// The Enemies class
/**
 * @author David Infante, Jose Ariza
 * 
 */

class Enemies {

  constructor (scene) {

    this.enemies = [];
    this.enemyType = [];
    this.dead = [];

    this.scene = scene;

    var loader = new THREE.TextureLoader();
    var diana = loader.load ("imgs/diana.png");

    this.mat = Physijs.createMaterial(new THREE.MeshPhongMaterial ({map: diana}), 1, 1);

    var objetivo1 = new Physijs.BoxMesh (new THREE.BoxGeometry (7.5, 10, 2.5, 1, 1, 1), this.mat, 1);
    objetivo1.applyMatrix (new THREE.Matrix4().makeTranslation (5, 11, -200));
    objetivo1.receiveShadow = true;
    objetivo1.autoUpdateMatrix = false;
    this.enemyType.push("Big");
    this.dead.push(false);
    this.enemies.push(objetivo1);
    this.scene.add(objetivo1);
    this.addBulletListener(this.enemies.length - 1);

    var objetivo2 = new Physijs.BoxMesh (new THREE.BoxGeometry (7.5, 10, 2.5, 1, 1, 1), this.mat, 1);
    objetivo2.applyMatrix (new THREE.Matrix4().makeTranslation (5, 11, -210));
    objetivo2.receiveShadow = true;
    objetivo2.autoUpdateMatrix = false;
    this.enemyType.push("Big");
    this.dead.push(false);
    this.enemies.push(objetivo2);
    this.scene.add(objetivo2);
    this.addBulletListener(this.enemies.length - 1);

    /*
    var objetivo2 = new Physijs.BoxMesh (new THREE.BoxGeometry (7.5, 10, 2.5, 1, 1, 1), mat, 1);
    objetivo2.applyMatrix (new THREE.Matrix4().makeTranslation (-5, 11, -200));
    objetivo2.receiveShadow = true;
    objetivo2.autoUpdateMatrix = false;
    this.enemyType.push("Big");
    this.enemies.push(objetivo2);
    */

    
    return this;
  }

  /*
  newEnemy(that){
    var objetivo1 = new Physijs.BoxMesh (new THREE.BoxGeometry (7.5, 10, 2.5, 1, 1, 1), that.mat, 1);
    objetivo1.applyMatrix (new THREE.Matrix4().makeTranslation (5, 11, -210));
    objetivo1.receiveShadow = true;
    objetivo1.autoUpdateMatrix = false;
    that.enemyType.push("Big");
    that.dead.push(false);
    that.enemies.push(objetivo1);
    scene.add(objetivo1);
  }
  */

  addBulletListener(i){
    var that = this;
    this.enemies[i].addEventListener ( 'collision' , function (elOtroObjeto , velocidad , rotacion , normal) { 
      console.log(elOtroObjeto._physijs.mass);
      if(elOtroObjeto._physijs.mass > 0 && !that.dead[i]){
        that.dead[i] = true;
        var sound = new Howl({
          src: ['sounds/death.mp3'], volume: 0.3
        });
        sound.play();
        if(that.enemyType[i] == "Big"){
          scene.updateScore(10);
        }
        //that.newEnemy(that);
      }
    });
  }

  getEnemies(i) {
    return this.enemies[i];
  }

  getEnemiesSize() {
    return this.enemies.length;
  }
}
