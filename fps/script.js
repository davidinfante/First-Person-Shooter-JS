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
  var key = event.which;

  switch(key) {
    case 87:
      scene.moveForward();
    break;
    case 83:
      scene.moveBackward();
    break;
    case 65:
      scene.moveLeft();
    break;
    case 68:
      scene.moveRight();
    break;
  }
}


/// It processes the wheel rolling of the mouse
/**
 * @param event - Mouse information
 */
function onMouseWheel (event) {

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
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  return renderer;
}

/// It renders every frame
function render() {
  requestAnimationFrame(render);

  stats.update();

  var delta = clock.getDelta();

  scene.getCameraControls().update(delta);
  scene.animate(GUIcontrols);
  renderer.render(scene, scene.getCamera());
  scene.simulate();
}

/// The main function
$(function () {
  'use strict';
  Physijs.scripts.worker = '../libs/physijs_worker.js';
  Physijs.scripts.ammo = '../libs/ammo.js';
  // create a render and set the size
  renderer = createRenderer();
  // add the output of the renderer to the html element
  $("#WebGL-output").append(renderer.domElement);
  // liseners
  window.addEventListener ("resize", onWindowResize);
  window.addEventListener ("mousedown", onMouseDown, true);
  window.addEventListener("keydown", onKeyDown, true);

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  scene = new TheScene (renderer.domElement);

  clock = new THREE.Clock();

  createGUI(true);

  render();
});
