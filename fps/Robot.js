
/// The Robot class
/**
 * @author David Infante, Jose Ariza
 * 
 */

class Robot extends THREE.Object3D {

  constructor (aMaterial) {
    super();

    this.material = aMaterial;

    // Objects for operating with the robot
    this.root = null;
    this.head = null;
    this.body = null;
    this.extension = null;

    //Provisional
    this.footHeight = 2;
    this.footWidth = 2;

    this.legWidth = 2;
    this.legHeight = 10;

    this.shoulderHeight = 3;
    this.shoulderWidth = 3;

    this.bodyHeight = 16;
    this.bodyWidth = 8;

    //Animation robot
    this.bodyRotation = 0;
    this.headRotation = 0;
    this.robotExtension = 0;
    
    this.root = this.createRoot();
    this.add (this.root);
  }
  
  //It creates de tree's root 
  createRoot() {
    var root = new THREE.Object3D();
    root.castShadow = true;
    root.autoUpdateMatrix = false;
    root.position.y = this.footHeight + this.legHeight + this.shoulderHeight/2;
    root.updateMatrix();
    root.add(this.createFoot("L"));
    root.add(this.createFoot("R"));
    root.add(this.createExtension());
    return root;
  }

  /// It creates the leg and the foot
  createFoot (tipo) {
    //Foot
    var foot = new THREE.Mesh (
      new THREE.ConeGeometry (this.footWidth, this.footHeight*2, 30, 16, 1), this.material);

    foot.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0, this.footHeight, 0));
    foot.castShadow = true;
    foot.autoUpdateMatrix = false;
    foot.position.y = -(this.footHeight + this.legHeight + this.shoulderHeight/2);
    if(tipo == "R")
      foot.position.x = this.bodyWidth/2 + this.shoulderWidth/2;
    else
      foot.position.x = -(this.bodyWidth/2 + this.shoulderWidth/2);
    foot.updateMatrix();

    //Leg
    var leg = new THREE.Mesh (
      new THREE.CylinderGeometry (this.legWidth/2,this.legWidth/2, this.legHeight, 16, 8), this.material);

    leg.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0, this.legHeight/2, 0));
    leg.castShadow = true;
    leg.autoUpdateMatrix = false;
    leg.position.y = this.footHeight;
    leg.updateMatrix();

    foot.add(leg);
    return foot;
  }

  //It creates de animation of extension
  createExtension() {
    this.extension = new THREE.Object3D();
    this.extension.position.y = this.robotExtension;
    this.extension.add(this.createBody());
    this.extension.add(this.createShoulders("R"));
    this.extension.add(this.createShoulders("L"));
    return this.extension;
  }

  //It creates de body
  createBody() {
    this.body = new THREE.Mesh (
      new THREE.CylinderGeometry (this.bodyWidth/2,this.bodyWidth/2, this.bodyHeight, 16, 8), this.material); 
    
    this.body.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0, -this.bodyHeight/4, 0));
    this.body.castShadow = true;
    this.body.rotation.x = this.bodyRotation;
    
    this.body.add(this.createHead());
    return this.body;
  }

  //It creates the head and the eye
  createHead() {
    //Head
    this.head = new THREE.Mesh (
      new THREE.SphereGeometry(this.bodyWidth/2.1, 20,20), this.material);

    this.head.position.y = this.bodyHeight/4;
    this.head.rotation.y = this.headRotation;
    this.head.castShadow = true;

    //Eye
    var eye = new THREE.Mesh (
      new THREE.CylinderGeometry (this.bodyWidth/10,this.bodyWidth/10, this.bodyWidth/6, 16, 8), this.material); 
    
    eye.position.y = this.bodyWidth/4;
    eye.position.z = this.bodyWidth/2.5;
    eye.rotation.x = 1.5708;
    eye.castShadow = true;

    this.head.add(eye);
    return this.head;
  }

  //It creates the shoulders and the mini legs
  createShoulders(tipo) {
    //Shoulder
    var shoulder = new THREE.Mesh (
      new THREE.BoxGeometry (this.shoulderHeight, this.shoulderHeight, this.shoulderHeight), this.material); 

    shoulder.castShadow = true;   
    if(tipo == "R")
      shoulder.position.x = this.bodyWidth/2 + this.shoulderWidth/2;
    else
      shoulder.position.x = -(this.bodyWidth/2 + this.shoulderWidth/2);
    
    //Mini leg
    var miniLeg = new THREE.Mesh (
      new THREE.CylinderGeometry (this.legWidth/2.1,this.legWidth/2.1, this.legHeight*20/100, 16, 8), this.material);

      miniLeg.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0, -(this.legHeight*20/100)/2, 0));
      miniLeg.castShadow = true;
      miniLeg.position.y = -this.shoulderHeight/2;

      shoulder.add(miniLeg);

    return shoulder;
  }

  //It animates de robot
  animateRobot(headRotation, bodyRotation, robotExtension) {
    //Head rotation
    this.headRotation = headRotation;
    this.head.rotation.y = this.headRotation;
    //Body rotation
    this.bodyRotation = bodyRotation;
    this.body.rotation.x = this.bodyRotation;
    //Robot extension
    if(robotExtension > this.legHeight*20/100)
      this.robotExtension = this.legHeight*20/100
    else
      this.robotExtension = robotExtension;
    this.extension.position.y = this.robotExtension;
  }

  
}