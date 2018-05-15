
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
    var mat = Physijs.createMaterial(new THREE.MeshPhongMaterial ({map: textura}),1,0);
    
    var a1 = new Physijs.BoxMesh (new THREE.BoxGeometry (200, 0.0, 200, 1, 1, 1), mat, 0);
    a1.applyMatrix (new THREE.Matrix4().makeTranslation (0,0,0));
    a1.receiveShadow = true;
    a1.autoUpdateMatrix = false;
    this.map.push(a1);
    ++this.map_size;

    var a2 = new Physijs.BoxMesh (new THREE.BoxGeometry (100, 6, 400, 1, 1, 1), mat, 0);
    a2.applyMatrix (new THREE.Matrix4().makeTranslation (0,3,-300));
    a2.receiveShadow = true;
    a2.autoUpdateMatrix = false;
    this.map.push(a2);
    ++this.map_size;

    //More parts of the map


    var textura = loader.load ("imgs/diana.png");
    var mat = Physijs.createMaterial(new THREE.MeshPhongMaterial ({map: textura}),1,1);

    var objetivo = new Physijs.BoxMesh (new THREE.BoxGeometry (5, 10, 5, 1, 1, 1), mat, 5);
    objetivo.applyMatrix (new THREE.Matrix4().makeTranslation (0,10,-200));
    objetivo.receiveShadow = true;
    objetivo.autoUpdateMatrix = false;
    this.map.push(objetivo);
    ++this.map_size;

    objetivo.addEventListener ( 'collision' , function (elOtroObjeto , velocidad , rotacion , normal) { 
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
