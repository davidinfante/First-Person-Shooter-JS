// Hola fidel
/**
 * @author David Infante, Jose Ariza
 * 
 */

/// Several functions, including the main

/// The scene graph
scene = null;

/// The GUI information
GUIcontrols = null;

/// The object for the statistics
stats = null;

/// A boolean to know if the left button of the mouse is down
mouseDown = false;

clock = null;

renderer = null;

camera = null;
controls = null;
moveForward = false;
moveBackward = false;
moveLeft = false;
moveRight = false;
jumping = false;

/// It creates the GUI and, optionally, adds statistic information
/**
 * @param withStats - A boolean to show the statictics or not
 */
function createGUI (withStats) {
  GUIcontrols = new function() {
    this.axis = false;
    this.lightonoff = true;
    this.lightIntensity = 1;
  }

  var gui = new dat.GUI();

  var axisLights = gui.addFolder ('Axis and Lights');
    axisLights.add(GUIcontrols, 'axis').name('Axis on/off :');
    axisLights.add(GUIcontrols, 'lightonoff').name('Light on/off :');
    axisLights.add(GUIcontrols, 'lightIntensity', 0, 1.0).name('Light intensity :');

    if (withStats)
      stats = initStats();
}

/// It adds statistics information to a previously created Div
/**
 * @return The statistics object
 */
function initStats() {

  var stats = new Stats();

  stats.setMode(0); // 0: fps, 1: ms

  // Align top-left
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';

  $("#Stats-output").append( stats.domElement );

  return stats;
}

/// It shows a feed-back message for the user
/**
 * @param str - The message
 */
function setMessage (str) {
  document.getElementById ("Messages").innerHTML = "<h2>"+str+"</h2>";
}

/// It processes the clic-down of the mouse
/**
 * @param event - Mouse information
 */
function onMouseDown (event) {
  if(event.buttons == 1)
    scene.dispara();
  else if(event.buttons == 2)
    scene.jump();
}

/// It processes keyboard information
/**
 * @param event - Keyboard information
 */
function onKeyDown (event) {
  switch ( event.keyCode ) {

    case 38: // up
    case 87: // w
      moveForward = true;
      break;

    case 37: // left
    case 65: // a
      moveLeft = true;
      break;

    case 40: // down
    case 83: // s
      moveBackward = true;
      break;

    case 39: // right
    case 68: // d
      moveRight = true;
      break;

    case 32: // space
      jumping = true;
      break;

    case 81: //q
      scene.changeWeapon();
      break;

  }
}

/// It processes keyboard information
/**
 * @param event - Keyboard information
 */
function onKeyUp (event) {
  switch( event.keyCode ) {

    case 38: // up
    case 87: // w
      moveForward = false;
      break;

    case 37: // left
    case 65: // a
      moveLeft = false;
      break;

    case 40: // down
    case 83: // s
      moveBackward = false;
      break;

    case 39: // right
    case 68: // d
      moveRight = false;
      break;

    case 32: // space
      jumping = false;
      break;
  }
}


/// It processes the wheel rolling of the mouse
/**
 * @param event - Mouse information
 */
function onMouseWheel (event) {
  scene.changeWeapon();
}

/// It processes the window size changes
function onWindowResize () {
  scene.setCameraAspect (window.innerWidth / window.innerHeight);
  renderer.setSize (window.innerWidth, window.innerHeight);
}

/// It creates and configures the WebGL renderer
/**
 * @return The renderer
 */
function createRenderer () {
  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild( renderer.domElement );
  renderer.shadowMap.enabled = true;
  return renderer;
}

/// It renders every frame
function render() {
  requestAnimationFrame(render);

  stats.update();

  var delta = clock.getDelta();
  //scene.getCameraControls().update(delta);

  scene.animate(GUIcontrols, delta);
  renderer.render(scene, scene.getCamera());
  scene.simulate();
}

/// The main function
$(function () {
  'use strict';
  Physijs.scripts.worker = '../libs/physijs_worker.js';
  Physijs.scripts.ammo = '../libs/ammo.js';


  var instructions = document.getElementById( 'instructions' );
  var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

  if ( havePointerLock ) {

    var element = document.body;

    var pointerlockchange = function ( event ) {

      if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {

        controlsEnabled = true;
        controls.enabled = true;

        blocker.style.display = 'none';

      } else {

        controls.enabled = false;

        blocker.style.display = 'block';

        instructions.style.display = '';

      }

    };

    var pointerlockerror = function ( event ) {

      instructions.style.display = '';

    };

    // Hook pointer lock state change events
    document.addEventListener( 'pointerlockchange', pointerlockchange, false );
    document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
    document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

    document.addEventListener( 'pointerlockerror', pointerlockerror, false );
    document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
    document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

    instructions.addEventListener( 'click', function ( event ) {

      instructions.style.display = 'none';

      // Ask the browser to lock the pointer
      element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
      element.requestPointerLock();

    }, false );

  } else {

    instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';

  }

  var controlsEnabled = false;
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

  // create a render and set the size
  renderer = createRenderer();
  // add the output of the renderer to the html element
  $("#WebGL-output").append(renderer.domElement);
  // liseners
  window.addEventListener ("resize", onWindowResize);
  window.addEventListener ("mousedown", onMouseDown, true);
  window.addEventListener("keydown", onKeyDown, true);
  window.addEventListener("keyup", onKeyUp, true);
  window.addEventListener ("mousewheel", onMouseWheel, true);   // For Chrome an others
  window.addEventListener ("DOMMouseScroll", onMouseWheel, true); // For Firefox

  //raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  scene = new TheScene (renderer.domElement, camera);
  controls = new THREE.PointerLockControls (camera);
  scene.add( controls.getObject() );

  clock = new THREE.Clock();

  createGUI(true);

  render();
});
