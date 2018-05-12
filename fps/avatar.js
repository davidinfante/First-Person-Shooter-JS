/// The Avatar class
/**
 * @author David Infante, Jose Ariza
 * 
 */

class Avatar extends THREE.Object3D {

    constructor(camera, controls){
        super();
        this.avatar = new THREE.Mesh (new THREE.CylinderGeometry (5,5,10, 16, 8));
        this.avatar.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0, 5, 0));
        this.add(this.avatar);
        this.add(camera);
        this.controls = controls;
    }

    getPosition() {
        var pos = new THREE.Vector3();
        pos.x = this.position.x;
        pos.y = 7;
        pos.z = this.position.z;
        return pos;
    }

    moveAvatar(){
        var target = this.controls.getTarget();
        this.position.x += target.x/100;
        this.position.z += target.z/100;
        //this.position.y += target.y/100;
    }

}