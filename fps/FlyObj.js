// The flying object class
/**
 * @author David Infante, Jose Ariza
 * 
 */

class FlyObj extends THREE.Mesh {
    
    constructor() {
        super();

        this.objWidth = 8;
        this.ball = null;
        this.speed = null;
        this.timePast = null;
        this.speed = 10;
        this.collision = false;
        this.target = new THREE.Vector3( 0, 0, 0 );
        this.createObject();
    }

    getParameters() {
        var parameters = {x: this.ball.position.x, y: this.ball.position.y,
            z: this.ball.position.z, radio: this.objWidth/2};
        return parameters;
    }

    setCollision() {
        this.collision = true;
    }

    createObject() {
        this.ball = new THREE.Mesh (
            new THREE.SphereGeometry(this.objWidth/2, 20,20));
        this.ball.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0, 0, 0),);
        this.ball.position.x = 1;
        this.ball.position.y = 1;
        this.ball.position.z = -100;
        this.ball.castShadow = true;
        this.add(this.ball);
    }

    dispara(position, target) {
        this.target.x = target.x;
        this.target.y = target.y;
        this.target.z = target.z;
        this.ball.position.x = position.x;
        this.ball.position.y = position.y;
        this.ball.position.z = position.z;
    }

    update() {
        this.position.x += this.target.x/100;
        this.position.y += this.target.y/100;
        this.position.z += this.target.z/100;
    }
}