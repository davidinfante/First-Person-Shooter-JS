// The flying object class
/**
 * @author David Infante, Jose Ariza
 * 
 */

class FlyObj extends THREE.Mesh {
    
    constructor() {
        super();

        this.objWidth = 1;
        this.ball = null;
        this.launched = false;
        this.collision = false;
        this.target = new THREE.Vector3( 0, 0, 0 );
        this.createObject();
    }

    getLaunched() {
        return this.launched;
    }

    setLaunched(launched) {
        this.launched = launched;
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

    setInitPosition() {
        this.ball.position.x = 1;
        this.ball.position.y = 1;
        this.ball.position.z = -100;
    }

    dispara(position, target) {
        this.target.x = target.x;
        this.target.y = target.y;
        this.target.z = target.z;
        this.launched = true;
        this.ball.position.x = position.x;
        this.ball.position.y = position.y + 8;
        this.ball.position.z = position.z;
    }

    update() {
        this.ball.position.x += this.target.x/10;
        this.ball.position.y += this.target.y/10;
        this.ball.position.z += this.target.z/10;
        console.log(this.position.y)
        if(this.ball.position.x > 100 || this.ball.position.x < -100 || this.ball.position.z > 100 || this.ball.position.z < -100 || 
            this.ball.position.y > 100 || this.ball.position.y < this.objWidth/2){
            this.launched = false;
            this.setInitPosition();
        }

    }
}