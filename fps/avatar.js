/// The Avatar class
/**
 * @author David Infante, Jose Ariza
 * 
 */
class Avatar extends THREE.Object3D {

    constructor(camera, controls) {
        super();

        this.avatar = new Physijs.CylinderMesh (new THREE.CylinderGeometry (5, 5, 10, 16, 8), 0xFFFFFF, 1);
        this.avatar.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0, 5, 0));
        this.add(this.avatar);
        this.add(camera);
        this.controls = controls;
        this.jumping = false;
        this.goingUp = true;

        var objLoader = new THREE.OBJLoader();
        objLoader.load( "models/m4a1_s.obj", function ( object ) {
            object.scale.x = 0.2;
            object.scale.y = 0.2;
            object.scale.z = 0.2;
            object.rotation.y = 3.14/2;
            object.position.x = 0;
            object.position.y = 8;
            object.position.z = 12;
            scene.add( object );
        });

    }

    getJumping() {
        return this.jumping;
    }

    setJumping() {
        this.jumping = true;
    }

    getPosition() {
        var pos = new THREE.Vector3();
        pos.x = this.position.x;
        pos.y = this.position.y;
        pos.z = this.position.z;
        return pos;
    }

    jump() {
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

    moveForward() {
        var target = this.controls.getTarget();
        this.position.x += target.x/100;
        this.position.z += target.z/100;
    }

    moveBackward() {
        var target = this.controls.getTarget();
        this.position.x += -target.x/100;
        this.position.z += -target.z/100;
    }

    moveLeft() {
        var target = this.controls.getTarget();
        this.position.x += target.z/100;
        this.position.z += -target.x/100;
    }

    moveRight() {
        var target = this.controls.getTarget();
        this.position.x += -target.z/100;
        this.position.z += target.x/100;
    }
        

}