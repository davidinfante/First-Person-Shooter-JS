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

        this.camera.name = "cam";

        var objLoader = new THREE.OBJLoader();
        objLoader.load( "models/m4a1_s.obj", function ( object ) {
            object.scale.x = 0.2;
            object.scale.y = 0.2;
            object.scale.z = 0.2;
            object.rotation.y = 3.14/2;
            object.position.x = 0;
            object.position.y = 8;
            object.position.z = 12;
            var camera = scene.getObjectByName( "cam", true);
            camera.add( object );
        });

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