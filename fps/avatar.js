/// The Avatar class
/**
 * @author David Infante, Jose Ariza
 * 
 */
class Avatar {

    constructor(camera, scene) {

        var mat = Physijs.createMaterial(new THREE.MeshPhongMaterial ({color: 0x000000}),1,0);
        this.avatar = new Physijs.CylinderMesh (new THREE.CylinderGeometry (5, 5, 5, 16, 8), mat , 1000);
        this.avatar.material.transparent = true;
        this.avatar.material.opacity = 0.0;
        this.avatar.position.y = 5;
        this.avatar.__dirtyPosition = true;
        scene.add(this.avatar);
        this.camera = camera;

        var thatCamera = this.camera;
        var loader = new THREE.TextureLoader();
        var objLoader = new THREE.OBJLoader();
        objLoader.load( "models/m4a1_s.obj", function ( object ) {
            var textura = loader.load ("imgs/wood.jpg");
            var mat = new THREE.MeshLambertMaterial ({map: textura});
            object.children[1].position.x = 0;
            object.children[1].position.y = 0;
            object.children[1].position.z = 0;
            object.children[1].scale.x = 0.2;
            object.children[1].scale.y = 0.2;
            object.children[1].scale.z = 0.2;
            object.children[1].rotation.x = 0.1;
            object.children[1].rotation.y = 3.4;
            object.children[1].position.x = 2;
            object.children[1].position.y = -1;
            object.children[1].position.z = -2;
            var mesh = new THREE.Mesh(object.children[1], mat);
            thatCamera.add(object.children[1]);

        });

        this.avatar.add(this.camera);
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
        console.log("ENTRO");
        var fuerza = new THREE.Vector3(0, 20000, 0);
        this.avatar.applyCentralImpulse( fuerza );
    }

    moveForward() {
        var target = this.camera.getWorldDirection();
        this.avatar.position.x += target.x;
        this.avatar.position.z += target.z;
        this.avatar.__dirtyPosition = true;
    }

    moveBackward() {
        var target = this.camera.getWorldDirection();
        this.avatar.position.x += -target.x;
        this.avatar.position.z += -target.z;
        this.avatar.__dirtyPosition = true;
    }

    moveLeft() {
        var target = this.camera.getWorldDirection();
        this.avatar.position.x += target.z;
        this.avatar.position.z += -target.x;
        this.avatar.__dirtyPosition = true;
    }

    moveRight() {
        var target = this.camera.getWorldDirection();
        this.avatar.position.x += -target.z;
        this.avatar.position.z += target.x;
        this.avatar.__dirtyPosition = true;
    }
        

}