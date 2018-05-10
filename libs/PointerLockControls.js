

THREE.PointerLockControls = function ( camera ) {

	var scope = this;

	camera.rotation.set( 0, 0, 0 );

	var pitchObject = new THREE.Object3D();
	pitchObject.add( camera );

	var yawObject = new THREE.Object3D();
	yawObject.position.y = 10;
	yawObject.add( pitchObject );

	var PI_2 = Math.PI / 2;
	
	// Using a vector http://threejs.org/docs/api/math/Vector2.html
	// for virtual rotation. Basically we directly modify this vector
	// instead of applying the movement to the rotation
	var virtualRotation = THREE.Vector2(pitchObject.rotation.x, yawObject.rotation.y);
	// Just a temporary vector
	var tmp = THREE.Vector2(0, 0);

	var onMouseMove = function ( event ) {

		if ( scope.enabled === false ) return;

		var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
		
		// Modify the virtual rotation instead of the real one
		virtualRotation.y -= movementX * 0.002;
		virtualRotation.x -= movementY * 0.002;
		virtualRotation.x = Math.max( - PI_2, Math.min( PI_2, virtualRotation.x ) );
		
		// Set the movement direction
		tmp.set(pitchObject.rotation.x - virtualRotation.x, yawObject.rotation.y - virtualRotation.y);
		// Let's set its length to 1
		tmp.normalize();

    		// Now apply the virtual rotation
		yawObject.rotation.y += tmp.y * 0.002;
	  	pitchObject.rotation.x += tmp.x * 0.002;
	};

	this.dispose = function() {

		document.removeEventListener( 'mousemove', onMouseMove, false );

	};

	document.addEventListener( 'mousemove', onMouseMove, false );

	this.enabled = false;

	this.getObject = function () {

		return yawObject;

	};

	this.getDirection = function() {

		// assumes the camera itself is not rotated

		var direction = new THREE.Vector3( 0, 0, - 1 );
		var rotation = new THREE.Euler( 0, 0, 0, "YXZ" );

		return function( v ) {

			rotation.set( pitchObject.rotation.x, yawObject.rotation.y, 0 );

			v.copy( direction ).applyEuler( rotation );

			return v;

		};

	}();

};