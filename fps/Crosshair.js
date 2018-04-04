/**
 * @author David Infante
 * 
 */

class Crosshair extends THREE.Object3D {

  constructor (aMaterial) {
    super();

    this.material = aMaterial;

    this.crosshair = null;
    
    this.crosshair = this.createRoot();
    this.add (this.crosshair);
  }
  
  //It creates de tree's root
  createRoot() {
    var root = new THREE.Object3D();
    root.castShadow = true;
    root.autoUpdateMatrix = false;
    root.updateMatrix();
    root.add(this.createCrosshair("U"));
    root.add(this.createCrosshair("D"));
    root.add(this.createCrosshair("L"));
    root.add(this.createCrosshair("R"));
    return root;
  }

  /// It creates the crosshair
  createCrosshair(part) {
    var rectangle = new THREE.Mesh (new THREE.BoxGeometry (0.5, 2, 0.1), this.material);

    rectangle.castShadow = false;
    rectangle.autoUpdateMatrix = false;
    
    switch (part) {
      case "U":
        rectangle.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0, 29, 0));
      break;
      case "D":
        rectangle = new THREE.Mesh (new THREE.BoxGeometry (0.5, 2, 0.1), this.material);
        rectangle.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0, 25, 0));
      break;
      case "L":
        rectangle = new THREE.Mesh (new THREE.BoxGeometry (2, 0.5, 0.1), this.material);
        rectangle.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (-2, 27, 0));
      break;
      case "R":
        rectangle = new THREE.Mesh (new THREE.BoxGeometry (2, 0.5, 0.1), this.material);
        rectangle.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (2, 27, 0));
      break;
    }

    rectangle.updateMatrix();

    return rectangle;
  }

  moveCrosshair(Tx, Ty, Tz) {
    this.crosshair.applyMatrix (new THREE.Matrix4().makeTranslation (Tx, Ty, Tz));
  }

  rotateCrosshair(Rx, Ry, Rz) {
    this.crosshair.rotation.x = Rx;
    this.crosshair.rotation.y = Ry;
    this.crosshair.rotation.z = Rz;
  }
  
}