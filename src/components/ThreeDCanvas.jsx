import React from 'react';
import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'
import oc from 'three-orbit-controls'

const OrbitControls = oc(THREE)

export default class ThreeDCanvas extends React.Component {
    componentDidMount() {
      const f14 = this.props.data
      const data = f14[0].data.features[1].geometry.coordinates
      const element = document.getElementById('target');

      const scene  = new THREE.Scene();
      const renderer = new THREE.WebGLRenderer();
      const camera = new THREE.PerspectiveCamera( 120, window.innerWidth/window.innerHeight, 1, 20000 );
      // const controls = new TrackballControls(camera, element);

      const controls = new OrbitControls( camera, renderer.domElement );
            controls.minDistance = 100;
            controls.maxDistance = Infinity;
            controls.minPolarAngle = Math.PI/2;
            controls.maxPolarAngle = Math.PI; 

            renderer.setSize( window.innerWidth, window.innerHeight );
            element.appendChild(renderer.domElement);
            camera.position.set( 0, 20, 100 );
            controls.update();

      function objPos(data){
          let positions = [];
          let x, y, z;
          for(var i=0; i < data.length; i++){
              var Altitude = f14[0].data.features[0][i].properties.AltitudeMeters
              var interval = 1000000;
              x = (data[i][0]-data[0][0])*interval;
              y = (data[i][1]-data[0][1])*interval;
              z = Altitude * 1;

              positions.push({id:i, x:x, y:y, z:z});
          }
          return positions
      }

      let obj;

      function makeInstance(x, y, z){
          let geometry = new THREE.CylinderGeometry( 15, 15, 15, 15, 15 );
          var material = new THREE.MeshNormalMaterial( { color: 0xFFC300 } );
          obj = new THREE.Mesh(geometry, material);
          //obj.receiveShadow = true;
          //obj.castShadow = true;
          scene.add(obj);
          obj.position.x = x;
          obj.position.y = y;
          obj.position.z = z;
          return obj
      }

      const objs = [];
      objPos(data).forEach(ele => {objs.push(makeInstance(ele.x, ele.y, ele.z))});

      scene.add(camera);
      renderer.render( scene, camera );

      function resize() {
          var width = element.clientWidth;
          var height = element.clientHeight;

          renderer.setSize(width, height);
          camera.aspect = width/height;
          // controls.handleResize();
      }
      
      var t = 0;
      function animate() {
          requestAnimationFrame(animate);
          // t += 0.01; 
          //objs.rotation.y += 0.1 * Math.PI/180;
          // objs.forEach((ele, i) => ele.position.x = 20*Math.cos(t) + 0);
          // objs.forEach((ele, i) => ele.position.y = 20*Math.sin(t) + 0);
          //objs.forEach((ele, i) => ele.rotation.z += 1*i);
          controls.update();
          renderer.render(scene, camera);
      }

      resize();
      animate();
  }
    
  render(){
      return(
          <div id="container">
              <div id="target"></div>
          </div>
      )
      // return <div ref={ref => (this.mount = ref)} />;
  }
}

//ref
//https://blog.bitsrc.io/starting-with-react-16-and-three-js-in-5-minutes-3079b8829817