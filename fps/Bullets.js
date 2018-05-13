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
            this.bullets[i] = this.createObject(i);
            scene.add(this.bullets[i]);
        }
    }

    getLaunched(i) {
        return this.launched[i];
    }

    setLaunched(i) {
        this.launched[i] = false;
    }

    getParameters(i) {
        var parameters = {x: this.bullets[i].position.x, y: this.bullets[i].position.y,
            z: this.bullets[i].position.z, radio: this.objWidth/2};
        return parameters;
    }

    createObject(i) {
        var bullet = new Physijs.SphereMesh(new THREE.SphereGeometry(this.objWidth/2, 20,20), this.material, 1);
        bullet.position.x = i;
        bullet.position.y = 0.5;
        bullet.position.z = -50;
        bullet.castShadow = true;
        return bullet;
    }

    setInitPosition(i) {
        this.bullets[i].position.x = i;
        this.bullets[i].position.y = 0.5;
        this.bullets[i].position.z = -50;
    }

    dispara(i, position, target) {
        this.target[i].x = target.x;
        this.target[i].y = target.y;
        this.target[i].z = target.z;
        this.bullets[i].position.x = position.x;
        this.bullets[i].position.y = position.y + 5;
        this.bullets[i].position.z = position.z;
        this.launched[i] = true;
        this.bullets[i].__dirtyPosition = true;
    }

    update(i) {
        //console.log("ENTRO");
        /*
        this.bullets[i].position.x += this.target[i].x/100;
        this.bullets[i].position.y += this.target[i].y/100;
        this.bullets[i].position.z += this.target[i].z/100;
        this.bullets[i].__dirtyPosition = true;
        */

       
        var fuerza = new THREE.Vector3(this.target[i].x*10, this.target[i].y*10, this.target[i].z*10);
        this.bullets[i].applyCentralImpulse( fuerza );

        console.log(this.bullets[i].position.y);
        
        /*
        if(this.bullets[i].position.x > 100 || this.bullets[i].position.x < -100 || this.bullets[i].position.z > 100 || this.bullets[i].position.z < -100 || 
            this.bullets[i].position.y > 100 || this.bullets[i].position.y < this.bullets[i].objWidth/2){
                console.log("RESETEO");
                this.setInitPosition(i);
            this.launched[i] = false;
        }
        */
        
        

    }
}