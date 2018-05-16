/// The Avatar class
/**
 * @author David Infante, Jose Ariza
 * 
 */
class Avatar {

    constructor(camera, controls, scene) {

        var mat = Physijs.createMaterial(new THREE.MeshPhongMaterial ({color: 0x000000}), 1, 0);
        this.avatar = new THREE.Mesh (new THREE.BoxGeometry (5, 5, 5), mat);
        this.avatar.material.transparent = true;
        this.avatar.material.opacity = 0.0;
        this.avatar.position.y = 2.5;
        this.avatar.__dirtyPosition = true;
        scene.add(this.avatar);
        this.camera = camera;
        this.controls = controls;
        this.activeWeapon = 1;
        this.goingUp = true;
        this.recoil = true;

        this.avatar.add(this.camera);
    }

    getPosition() {
        var pos = new THREE.Vector3();
        pos.x = this.avatar.position.x;
        pos.y = this.avatar.position.y;
        pos.z = this.avatar.position.z;
        return pos;
    }

    getActiveWeapon() {
        return this.activeWeapon;
    }

    jump() {
        if (this.goingUp) {
            if (this.avatar.position.y > 15) this.goingUp = false;
            else this.avatar.position.y += 0.5;
        } else {
            if (this.avatar.position.y >= 2 && this.avatar.position.y <= 2.5) {
                jumping = false;
                this.goingUp = true;
            } else this.avatar.position.y -= 0.5;
        }
    }

    updateControls() {
        controls.getObject().position.set(this.avatar.position.x, this.avatar.position.y+5, this.avatar.position.z);
    }

    moveForward() {
        var target = this.camera.getWorldDirection();
        this.avatar.translateX( target.x );
        this.avatar.translateZ( target.z );
        //this.avatar.__dirtyPosition = true;
    }

    moveBackward() {
        var target = this.camera.getWorldDirection();
        this.avatar.translateX( -target.x );
        this.avatar.translateZ( -target.z );
        //this.avatar.__dirtyPosition = true;
    }

    moveLeft() {
        var target = this.camera.getWorldDirection();
        this.avatar.translateX( target.z );
        this.avatar.translateZ( -target.x );
        //this.avatar.__dirtyPosition = true;
    }

    moveRight() {
        var target = this.camera.getWorldDirection();
        this.avatar.translateX( -target.z );
        this.avatar.translateZ( target.x );
        //this.avatar.__dirtyPosition = true;
    }

    changeWeapon() {
        if (this.activeWeapon == 0) {
            this.camera.children[2].material.transparent = true;
            this.camera.children[2].material.opacity = 0.0;
            this.camera.children[1].material.transparent = false;
            this.camera.children[1].material.opacity = 1.0;
            this.activeWeapon = 1;
        } else if (this.activeWeapon == 1) {
            this.camera.children[1].material.transparent = true;
            this.camera.children[1].material.opacity = 0.0;
            this.camera.children[2].material.transparent = false;
            this.camera.children[2].material.opacity = 1.0;
            this.activeWeapon = 0;
        }
    }

    animateWeapon() {
        if (this.activeWeapon == 1) {
            if (this.recoil) {
                if (this.camera.children[1].rotation.x >= 0.2) this.recoil = false;
                else this.camera.children[1].rotation.x += 0.1;
            } else {
                if (this.camera.children[1].rotation.x >= 0 && this.camera.children[1].rotation.x <= 0.1) {
                    disparando = false;
                    this.recoil = true;
                } else this.camera.children[1].rotation.x -= 0.1;
            }
        } else if (this.activeWeapon == 0) {
            if (this.recoil) {
                if (this.camera.children[2].rotation.x >= 1.8) this.recoil = false;
                else this.camera.children[2].rotation.x += 0.1;
            } else {
                if (this.camera.children[2].rotation.x >= 0 && this.camera.children[2].rotation.x <= 0.1) {
                    disparando = false;
                    this.recoil = true;
                } else this.camera.children[2].rotation.x -= 0.1;
            }
        }
    }

    loadWeapons() {
        var thatCamera = this.camera;

        var mtlLoader = new THREE.MTLLoader();
        var objLoader = new THREE.OBJLoader();
        var texture = null;

        mtlLoader.setPath( "models/" );
        mtlLoader.load( "material.mtl" , function ( materials ) {
            materials.preload();
            
            objLoader.setMaterials( materials );
            objLoader.setPath( "models/" );
            objLoader.load( "m4a1_s.obj", function ( object ) {
                texture = THREE.ImageUtils.loadTexture('models/m4a1_stext.png');
                object.children[1].material = new THREE.MeshLambertMaterial({map: texture});

                //m4a1_s
                object.children[1].position.set(0, 0, 0);
                object.children[1].scale.set(0.2, 0.2, 0.2);
                object.children[1].rotation.set(0.1, 3.4, 0);
                object.children[1].position.set(2, -0.8, -2);
                thatCamera.add(object.children[1]);

            });
        });

        mtlLoader.setPath( "models/" );
        mtlLoader.load( "material.mtl" , function ( materials ) {
            materials.preload();

            objLoader.setMaterials( materials );
            objLoader.setPath( "models/" );
            objLoader.load( "escopeta.obj", function ( object ) {
                texture = THREE.ImageUtils.loadTexture('models/escopetatext.png');
                object.children[0].material = new THREE.MeshLambertMaterial({map: texture});
                
                //Escopeta
                object.children[0].position.set(0, 0, 0);
                object.children[0].scale.set(0.4, 0.4, 0.4);
                object.children[0].rotation.set(0.2, -1.2, 0);
                object.children[0].position.set(2, -1.4 , -6);
                thatCamera.add(object.children[0]);
                thatCamera.children[2].material.transparent = true;
                thatCamera.children[2].material.opacity = 0.0;

            });
        });

    }
}