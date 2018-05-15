/// The Avatar class
/**
 * @author David Infante, Jose Ariza
 * 
 */
class Avatar {

    constructor(camera, controls, scene) {

        var mat = Physijs.createMaterial(new THREE.MeshPhongMaterial ({color: 0x000000}),1,0);
        this.avatar = new Physijs.BoxMesh (new THREE.BoxGeometry (10,5,10), mat , 1000);
        //this.avatar.material.transparent = true;
        //this.avatar.material.opacity = 0.0;
        this.avatar.position.y = 5;
        this.avatar.__dirtyPosition = true;
        scene.add(this.avatar);
        this.camera = camera;
        this.controls = controls;

        var thatCamera = this.camera;

        /*var mtlLoader = new THREE.MTLLoader();
        //mtlLoader.setBaseUrl( "textures/" );
        //mtlLoader.setPath( "textures/" );
        mtlLoader.load( "textures/AK47.mtl" , function ( materials ) {
            materials.preload();*/

            var objLoader = new THREE.OBJLoader();
            //objLoader.setMaterials( materials );
            //objLoader.setPath( "models/" );
            objLoader.load( "models/m4a1_s.obj", function ( object ) {
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
                thatCamera.add(object.children[1]);

            });
        //});

        this.avatar.add(this.camera);
    }

    getPosition() {
        var pos = new THREE.Vector3();
        pos.x = this.avatar.position.x;
        pos.y = this.avatar.position.y;
        pos.z = this.avatar.position.z;
        return pos;
    }

    jump() {
        jumping = false;
        var fuerza = new THREE.Vector3(0, 20000, 0);
        this.avatar.applyCentralImpulse( fuerza );
    }

    updateControls() {
        controls.getObject().position.x =  this.avatar.position.x;
        controls.getObject().position.y =  this.avatar.position.y+5;
        controls.getObject().position.z = this.avatar.position.z;
    }

    moveForward(x, z) {
        var target = this.camera.getWorldDirection();
        this.avatar.translateX( target.x );
        this.avatar.translateZ( target.z );
        this.avatar.__dirtyPosition = true;
    }

    moveBackward(x, z) {
        var target = this.camera.getWorldDirection();
        this.avatar.translateX( -target.x );
        this.avatar.translateZ( -target.z );
        this.avatar.__dirtyPosition = true;
    }

    moveLeft(x, z) {
        var target = this.camera.getWorldDirection();
        this.avatar.translateX( target.z );
        this.avatar.translateZ( -target.x );
        this.avatar.__dirtyPosition = true;
    }

    moveRight(x, z) {
        var target = this.camera.getWorldDirection();
        this.avatar.translateX( -target.z );
        this.avatar.translateZ( target.x );
        this.avatar.__dirtyPosition = true;
    }        

}