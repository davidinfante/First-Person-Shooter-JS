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
    this.direction = [];

    this.scene = scene;

    var loader = new THREE.TextureLoader();
    var diana = loader.load ("imgs/diana.png");

    this.mat = Physijs.createMaterial(new THREE.MeshPhongMaterial ({map: diana}), 1, 1);

    var objetivo1 = new Physijs.BoxMesh (new THREE.BoxGeometry (7.5, 10, 2.5, 1, 1, 1), this.mat, 1);
    objetivo1.applyMatrix (new THREE.Matrix4().makeTranslation (100, 11, -150));
    objetivo1.receiveShadow = true;
    objetivo1.autoUpdateMatrix = false;
    this.enemyType.push("Big");
    this.dead.push(false);
    this.direction.push("left");
    this.enemies.push(objetivo1);
    this.scene.add(objetivo1);
    this.addBulletListener(this.enemies.length - 1);

    var objetivo2 = new Physijs.BoxMesh (new THREE.BoxGeometry (7.5, 10, 2.5, 1, 1, 1), this.mat, 1);
    objetivo2.applyMatrix (new THREE.Matrix4().makeTranslation (-100, 11, -250));
    objetivo2.receiveShadow = true;
    objetivo2.autoUpdateMatrix = false;
    this.enemyType.push("Big");
    this.dead.push(false);
    this.direction.push("right");
    this.enemies.push(objetivo2);
    this.scene.add(objetivo2);
    this.addBulletListener(this.enemies.length - 1);

    var objetivo3 = new Physijs.BoxMesh (new THREE.BoxGeometry (7.5, 10, 2.5, 1, 1, 1), this.mat, 1);
    objetivo3.applyMatrix (new THREE.Matrix4().makeTranslation (100, 11, -350));
    objetivo3.receiveShadow = true;
    objetivo3.autoUpdateMatrix = false;
    this.enemyType.push("Big");
    this.dead.push(false);
    this.direction.push("left");
    this.enemies.push(objetivo3);
    this.scene.add(objetivo3);
    this.addBulletListener(this.enemies.length - 1);

    var objetivo4 = new Physijs.BoxMesh (new THREE.BoxGeometry (7.5, 10, 2.5, 1, 1, 1), this.mat, 1);
    objetivo4.applyMatrix (new THREE.Matrix4().makeTranslation (-100, 11, -450));
    objetivo4.receiveShadow = true;
    objetivo4.autoUpdateMatrix = false;
    this.enemyType.push("Big");
    this.dead.push(false);
    this.direction.push("right");
    this.enemies.push(objetivo4);
    this.scene.add(objetivo4);
    this.addBulletListener(this.enemies.length - 1);
    
    return this;
  }

  addBulletListener(i) {
    var that = this;
    this.enemies[i].addEventListener ( 'collision' , function (elOtroObjeto , velocidad , rotacion , normal) {
      if (elOtroObjeto._physijs.mass > 0 && !that.dead[i]) {
        that.dead[i] = true;
        var sound = new Howl({
          src: ['sounds/death.mp3'], volume: 0.3
        });
        sound.play();
        if (that.enemyType[i] == "Big") {
          scene.updateScore(10);
        }
      }
    });
  }

  getEnemies(i) {
    return this.enemies[i];
  }

  getEnemiesSize() {
    return this.enemies.length;
  }

  animate(level) {
    for (var i = 0; i < this.enemies.length; ++i) {
      if (this.enemies[i].position.x >= 100) this.direction[i] = "left";
      else if (this.enemies[i].position.x <= -100) this.direction[i] = "right";

      if (this.direction[i] == "left") {
        this.enemies[i].applyCentralImpulse(new THREE.Vector3(-1,0,0));
      }
      else if (this.direction[i] == "right") {
        this.enemies[i].applyCentralImpulse(new THREE.Vector3(1,0,0));
      }
      console.log(this.enemies[i].position.x);
    }
  }

}
