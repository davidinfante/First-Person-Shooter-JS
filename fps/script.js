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
/// It creates the GUI and, optionally, adds statistic information
/**
 * @param withStats - A boolean to show the statictics or not
 */
function createGUI (withStats) {
  GUIcontrols = new function() {
    this.axis = false;
    this.lightonoff = true;
    this.lightIntensity = 0.5;
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
/*function onMouseDown (event) {
  if (event.ctrlKey) {
    // The Trackballcontrol only works if Ctrl key is pressed
    scene.getCameraControls().enabled = true;
  } else {
    scene.getCameraControls().enabled = false;
  }
}*/

/// It processes keyboard information
/**
 * @param event - Keyboard information
 */
/*function onKeyDown (event) {
  var key = event.which;

  switch(key) {
    case 87:
      scene.moveForwRobot();
    break;
    case 83:
      scene.moveBackRobot();
    break;
    case 65:
      scene.moveLeftRobot();
    break;
    case 68:
      scene.moveRightRobot();
    break;
    case 37:
      scene.rotateRobot("L");
    break;
    case 39:
      scene.rotateRobot("R");
    break;
    case 38:
      scene.moveRobotTank("F");
    break;
    case 40:
      scene.moveRobotTank("B");
    break;
    case 86:
      scene.changeView();
    break;
  }
}*/

/// It processes the wheel rolling of the mouse
/**
 * @param event - Mouse information
 */
function onMouseWheel (event) {
  /*if (event.ctrlKey) {
    // The Trackballcontrol only works if Ctrl key is pressed
    scene.getCameraControls().enabled = true;
  } else {
    scene.getCameraControls().enabled = false;
  }*/
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
}

/// The main function
$(function () {
  // create a render and set the size
  renderer = createRenderer();
  // add the output of the renderer to the html element
  $("#WebGL-output").append(renderer.domElement);
  // liseners
  window.addEventListener ("resize", onWindowResize);
  //window.addEventListener ("mousedown", onMouseDown, true);
  //window.addEventListener("keydown", onKeyDown, true);
  //window.addEventListener ("mousewheel", onMouseWheel, true);   // For Chrome an others
  //window.addEventListener ("DOMMouseScroll", onMouseWheel, true); // For Firefox

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  scene = new TheScene (renderer.domElement);

  clock = new THREE.Clock();

  createGUI(true);

  render();
});
