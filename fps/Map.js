
/// The Map class
/**
 * @author David Infante, Jose Ariza
 * 
 * @param aMaterial - The material of the map
 * @param mass - Physijs mass
 */

class Map {

  constructor (aMaterial, mass) {

    this.material = aMaterial;
    this.map_size = 0;
    this.map = [];
    
    var a1 = new Physijs.BoxMesh (new THREE.BoxGeometry (200, 0.0, 200, 1, 1, 1), this.material, mass);
    a1.applyMatrix (new THREE.Matrix4().makeTranslation (0,0,0));
    a1.receiveShadow = true;
    a1.autoUpdateMatrix = false;
    this.map.push(a1);
    ++this.map_size;

    var a2 = new Physijs.BoxMesh (new THREE.BoxGeometry (100, 6, 400, 1, 1, 1), this.material, mass);
    a2.applyMatrix (new THREE.Matrix4().makeTranslation (0,3,300));
    a2.receiveShadow = true;
    a2.autoUpdateMatrix = false;
    this.map.push(a2);
    ++this.map_size;

    //More parts of the map

    return this;
  }

  getMap(i) {
    return this.map[i];
  }

  getMapSize() {
    return this.map_size;
  }
}
