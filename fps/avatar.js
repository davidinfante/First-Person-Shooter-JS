/// The Avatar class
/**
 * @author David Infante, Jose Ariza
 * 
 */
class Avatar {

    constructor(camera, controls, scene) {

        this.avatar = new Physijs.CylinderMesh (new THREE.CylinderGeometry (5, 5, 10, 16, 8), 0xFFFFFF, 1);
        this.avatar.position.y = 20;
        this.avatar.__dirtyPosition = true;
        scene.add(this.avatar);
        this.avatar.add(camera);
        this.controls = controls;
        this.jumping = false;

    }

    getJumping() {
        return this.jumping;
    }

    setJumping() {
        this.jumping = true;
    }

    getPosition() {
        var pos = new THREE.Vector3();
        pos.x = this.avatar.position.x;
        pos.y = this.avatar.position.y;
        pos.z = this.avatar.position.z;
        return pos;
    }

    jump() {
        console.log("SALTANDO");
        if(this.jumping){
            if(this.avatar.position.y > 20)
                this.jumping = false;
            else
                this.avatar.position.y += 1;
        }
        this.avatar.__dirtyPosition = true;
    }

    moveForward() {
        var target = this.controls.getTarget();
        this.avatar.position.x += target.x/100;
        this.avatar.position.z += target.z/100;
        this.avatar.__dirtyPosition = true;
        console.log(this.avatar.position.x);
    }

    moveBackward() {
        var target = this.controls.getTarget();
        this.avatar.position.x += -target.x/100;
        this.avatar.position.z += -target.z/100;
        this.avatar.__dirtyPosition = true;
    }

    moveLeft() {
        var target = this.controls.getTarget();
        this.avatar.position.x += target.z/100;
        this.avatar.position.z += -target.x/100;
        this.avatar.__dirtyPosition = true;
    }

    moveRight() {
        var target = this.controls.getTarget();
        this.avatar.position.x += -target.z/100;
        this.avatar.position.z += target.x/100;
        this.avatar.__dirtyPosition = true;
    }
        

}