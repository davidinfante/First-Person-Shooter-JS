// The flying object class
/**
 * @author David Infante, Jose Ariza
 * 
 */

class FlyObj extends THREE.Mesh {
    
    constructor(){
        super();

        //this.material = aMaterial;
        this.objWidth = 8;
        this.ball = null;
        this.createObject();
        this.speed = 10; //Math.floor((Math.random() * 10) + 1);
        this.timePast = Date.now();
    }

    createObject(){
        this.ball = new THREE.Mesh (
            new THREE.SphereGeometry(this.objWidth/2, 20,20), this.material);
        this.ball.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0, 40, 0));
        this.ball.castShadow = true;
        this.add(this.ball);
    }

    reset(){

    }

    update(){
        var timeActual = Date.now();
        this.ball.position.z += this.speed*(timeActual-this.timePast)/1000;
        this.timePast = timeActual;
    }
}