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
        this.jumping = false;
        this.goingUp = true;
    }

    getJumping(){
        return this.jumping;
    }

    setJumping(){
        this.jumping = true;
    }

    getPosition() {
        var pos = new THREE.Vector3();
        pos.x = this.position.x;
        pos.y = this.position.y;
        pos.z = this.position.z;
        return pos;
    }

    jump(){
        console.log("SALTANDO");
        if(this.goingUp){
            if(this.position.y > 20)
                this.goingUp = false;
            else
                this.position.y += 1;
        }
        else{
            if(this.position.y == 0){
                this.jumping = false;
                this.goingUp = true;
            }
            else
                this.position.y -= 1;
        }
    }

    moveForward(){
        var target = this.controls.getTarget();
        this.position.x += target.x/100;
        this.position.z += target.z/100;
    }

    moveBackward(){
        var target = this.controls.getTarget();
        this.position.x += -target.x/100;
        this.position.z += -target.z/100;
    }

    moveLeft(){
        var target = this.controls.getTarget();
        this.position.x += target.z/100;
        this.position.z += -target.x/100;
    }

    moveRight(){
        var target = this.controls.getTarget();
        this.position.x += -target.z/100;
        this.position.z += target.x/100;
    }
        

}