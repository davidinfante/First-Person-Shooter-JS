/// The Avatar class
/**
 * @author David Infante, Jose Ariza
 * 
 */
class Avatar {

    constructor(camera, controls, scene) {

        var mat = Physijs.createMaterial(new THREE.MeshPhongMaterial ({color: 0x000000}),1,0);
        this.avatar = new Physijs.CylinderMesh (new THREE.CylinderGeometry (5, 5, 5, 16, 8), mat , 10);
        this.avatar.position.y = 5;
        this.avatar.__dirtyPosition = true;
        scene.add(this.avatar);
        this.camera = camera;

        var loader = new THREE.OBJLoader();
        loader.load('/models/m4a1.obj', function (objetct){ 
            object.position.x = 20;
            object.position.y = 20;
            object.position.y = 10;
            scene.add(object)});

        this.avatar.add(this.camera);
        this.controls = controls;
        this.jumping = false;

    }

    getPosition() {
        var pos = new THREE.Vector3();
        pos.x = this.avatar.position.x;
        pos.y = this.avatar.position.y;
        pos.z = this.avatar.position.z;
        return pos;
    }

    jump() {
        /*
        console.log("SALTANDO");
        if(this.jumping){
            if(this.avatar.position.y > 20)
                this.jumping = false;
            else
                this.avatar.position.y += 1;

        }
        this.avatar.__dirtyPosition = true;
        */
        console.log("ENTRO");
        var fuerza = new THREE.Vector3(0, 150, 0);
        this.avatar.applyCentralImpulse( fuerza );
    }

    moveForward() {
        var target = this.controls.getTarget();
        this.avatar.position.x += target.x/100;
        this.avatar.position.z += target.z/100;
        this.avatar.__dirtyPosition = true;
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