// The flying object class
/**
 * @author David Infante, Jose Ariza
 * 
 */

class Bullets {
    
    constructor(maxBullets, scene, aMaterial) {
        this.material = aMaterial;
        this.objWidth = 1;
        this.maxBullets = maxBullets;
        this.bullets = [];
        this.launched = [];
        this.target = [];
        for(var i=0; i<maxBullets; ++i){
            this.launched[i] = false;
            this.target[i] = new THREE.Vector3( 0, 0, 0 );
            this.bullets[i] = this.createObject();
            scene.add(this.bullets[i]);
        }
    }

    getLaunched(i) {
        return this.launched[i];
    }

    setLaunched(i) {
        this.launched[i] = true;
    }

    getParameters(i) {
        var parameters = {x: this.bullets[i].position.x, y: this.bullets[i].position.y,
            z: this.bullets[i].position.z, radio: this.objWidth/2};
        return parameters;
    }

    createObject() {
        var bullet = new Physijs.SphereMesh(new THREE.SphereGeometry(this.objWidth/2, 20,20), this.material);
        bullet.position.x = 1;
        bullet.position.y = 5;
        bullet.position.z = -50;
        bullet.castShadow = true;
        return bullet;
    }

    setInitPosition(i) {
        this.bullets[i].position.x = 1;
        this.bullets[i].position.y = 1;
        this.bullets[i].position.z = -100;
    }

    dispara(i, position, target) {
        this.target[i].x = target.x;
        this.target[i].y = target.y;
        this.target[i].z = target.z;
        this.launched[i] = true;
        this.bullets[i].position.x = position.x;
        this.bullets[i].position.y = position.y + 10;
        this.bullets[i].position.z = position.z;
    }

    update(i) {
        console.log("ENTRO");
        //this.bullets[i].position.x += this.target[i].x/10;
        //this.bullets[i].position.y += this.target[i].y/10;
        this.bullets[i].position.z -= 0.1;
        /*
        if(this.bullets[i].position.x > 100 || this.bullets[i].position.x < -100 || this.bullets[i].position.z > 100 || this.bullets[i].position.z < -100 || 
            this.bullets[i].position.y > 100 || this.bullets[i].position.y < this.bullets[i].objWidth/2){
                console.log("RESETEO");
            this.launched[i] = false;
            this.setInitPosition(i);
        }
        console.log(this.bullets[i].position.x);
        console.log(this.bullets[i].position.y);
        console.log(this.bullets[i].position.z);
        */

    }
}