import React from 'react';
import * as THREE from 'three';
import oc from 'three-orbit-controls'
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js'

const OrbitControls = oc(THREE)

export default class Lines extends React.Component {
    componentDidMount() {
        let camera, scene, renderer;

        init();
        animate();
        
        function init() {
            camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight);
            camera.position.set( 0, 0, 20 );

            scene = new THREE.Scene();

            const curveWidth = 4,
            curveHeight = 0.5,
            bottomControlOffset = 4.4,
            topControlOffset = 4.4,
            numOfCurves = 120,
            curvesArr = [],
            pointsArr = [],
            allPointsArr = []

            for (let i = 0; i < numOfCurves; i++){
                let name = "curve" + i;

                if(i%2 === 0 ){
                    let d, b, c;
                    c = i/2;
                    if(i%4 === 0 ){d = -1; b = 1;}else{d = 1; b = -1;}
                    name = new THREE.CubicBezierCurve(
                        new THREE.Vector2( curveWidth*d, curveHeight*c, 0), // start point.
                        new THREE.Vector2( 0, curveHeight*c, 0 ), // first control point
                        new THREE.Vector2( 0, curveHeight*c, 0 ), // second control point
                        new THREE.Vector2( curveWidth*b, curveHeight*c, 0 )
                    )
                }else{
                    let d, c;
                    c = (i-1)/2;
                    if((i-1)%4 === 0){d = -1;}else{d = 1;}
                    name = new THREE.CubicBezierCurve(
                        new THREE.Vector2( curveWidth*d, curveHeight*c, 0),
                        new THREE.Vector2( bottomControlOffset*d, curveHeight*c, 0 ),
                        new THREE.Vector2( topControlOffset*d, curveHeight*(c+1), 0 ),
                        new THREE.Vector2( curveWidth*d, curveHeight*(c+1), 0 )
                    )
                }
                curvesArr.push(name)
                pointsArr.push(name.getPoints( 50 ))
                pointsArr[i].forEach(ele => {allPointsArr.push(ele.x, ele.y, 0)});
            } 

            const geometry = new LineGeometry();
           //geometry.setPositions( pts_arr );
            geometry.setPositions( allPointsArr ); 
            const material = new LineMaterial( { color: 0xffffff, linewidth: 2 } );
            material.resolution.set( window.innerWidth, window.innerHeight )

            const lines = new Line2( geometry, material );
            scene.add( lines );

            renderer = new THREE.WebGLRenderer( { antialias: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            document.body.appendChild( renderer.domElement );

            const controls = new OrbitControls( camera, renderer.domElement );
            controls.minDistance = 10;
            controls.maxDistance = Infinity;
            controls.minPolarAngle = Math.PI/2;
            controls.maxPolarAngle = Math.PI; 
        }

        function animate() {
            requestAnimationFrame( animate );
            renderer.render( scene, camera );
        }
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



// var curve0 = new THREE.CubicBezierCurve( //line
//     new THREE.Vector2( -curveWidth, 0, 0),               // start point.
//     new THREE.Vector2( 0, 0, 0 ),         // first control point
//     new THREE.Vector2( 0, 0, 0 ),   // second control point
//     new THREE.Vector2( curveWidth, 0, 0 )                   // end point
// );
// var curve1 = new THREE.CubicBezierCurve( //curve
//     new THREE.Vector2( curveWidth, 0, 0 ),                // start point.
//     new THREE.Vector2( bottomControlOffset, 0, 0 ),         // first control point
//     new THREE.Vector2( topControlOffset, curveHeight, 0 ),  // second control point
//     new THREE.Vector2( curveWidth, curveHeight, 0 )                   // end point
// );
// var curve2 = new THREE.CubicBezierCurve( //line
//     new THREE.Vector2( curveWidth, curveHeight*1, 0),               // start point.
//     new THREE.Vector2( 0, curveHeight*1, 0 ),         // first control point
//     new THREE.Vector2( 0, curveHeight*1, 0 ),  // second control point
//     new THREE.Vector2( -curveWidth, curveHeight*1, 0 )                   // end point
// );
// var curve3 = new THREE.CubicBezierCurve( //curve
//     new THREE.Vector2( -curveWidth, curveHeight*1, 0 ),                // start point.
//     new THREE.Vector2( -bottomControlOffset, curveHeight*1, 0 ),         // first control point
//     new THREE.Vector2( -topControlOffset, curveHeight*2, 0 ),  // second control point
//     new THREE.Vector2( -curveWidth, curveHeight*2, 0 )                   // end point
// );
// var curve4 = new THREE.CubicBezierCurve( //line
//     new THREE.Vector2( -curveWidth, curveHeight*2, 0),               // start point.
//     new THREE.Vector2( 0, curveHeight*2, 0 ),         // first control point
//     new THREE.Vector2( 0, curveHeight*2, 0 ),   // second control point
//     new THREE.Vector2( curveWidth, curveHeight*2, 0 )                   // end point
// );
// var curve5 = new THREE.CubicBezierCurve( //curve
//     new THREE.Vector2( curveWidth, curveHeight*2, 0 ),                // start point.
//     new THREE.Vector2( bottomControlOffset, curveHeight*2, 0 ),         // first control point
//     new THREE.Vector2( topControlOffset, curveHeight*3, 0 ),  // second control point
//     new THREE.Vector2( curveWidth, curveHeight*3, 0 )                   // end point
// );
// var curve6 = new THREE.CubicBezierCurve( //line
//     new THREE.Vector2( curveWidth, curveHeight*3, 0),               // start point.
//     new THREE.Vector2( 0, curveHeight*3, 0 ),         // first control point
//     new THREE.Vector2( 0, curveHeight*3, 0 ),  // second control point
//     new THREE.Vector2( -curveWidth, curveHeight*3, 0 )                   // end point
// );
// var curve7 = new THREE.CubicBezierCurve( //curve
//     new THREE.Vector2( -curveWidth, curveHeight*3, 0 ),                // start point.
//     new THREE.Vector2( -bottomControlOffset, curveHeight*3, 0 ),         // first control point
//     new THREE.Vector2( -topControlOffset, curveHeight*4, 0 ),  // second control point
//     new THREE.Vector2( -curveWidth, curveHeight*4, 0 )                   // end point
// );
// var curve8 = new THREE.CubicBezierCurve( //line
//     new THREE.Vector2( -curveWidth, curveHeight*4, 0),               // start point.
//     new THREE.Vector2( 0, curveHeight*4, 0 ),         // first control point
//     new THREE.Vector2( 0, curveHeight*4, 0 ),  // second control point
//     new THREE.Vector2( curveWidth, curveHeight*4, 0 )                   // end point
// );
// const points0 = curve0.getPoints( 50 );
// const points1 = curve1.getPoints( 50 );
// const points2 = curve2.getPoints( 50 );
// const points3 = curve3.getPoints( 50 );
// const points4 = curve4.getPoints( 50 );
// const points5 = curve5.getPoints( 50 );
// const points6 = curve6.getPoints( 50 );
// const points7 = curve7.getPoints( 50 );
// const points8 = curve8.getPoints( 50 );

// let pts_arr = []
// points0.forEach(ele => {pts_arr.push(ele.x, ele.y, 0)});
// points1.forEach(ele => {pts_arr.push(ele.x, ele.y, 0)});
// points2.forEach(ele => {pts_arr.push(ele.x, ele.y, 0)});
// points3.forEach(ele => {pts_arr.push(ele.x, ele.y, 0)});
// points4.forEach(ele => {pts_arr.push(ele.x, ele.y, 0)});
// points5.forEach(ele => {pts_arr.push(ele.x, ele.y, 0)});
// points6.forEach(ele => {pts_arr.push(ele.x, ele.y, 0)});
// points7.forEach(ele => {pts_arr.push(ele.x, ele.y, 0)});
// points8.forEach(ele => {pts_arr.push(ele.x, ele.y, 0)});

////////////////////////////////////////////////////////////////////////////////////

// const renderer = new THREE.WebGLRenderer( { antialias: true } );
// renderer.setPixelRatio( window.devicePixelRatio );
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
// camera.position.set(0, 0, 20);
// camera.lookAt(new THREE.Vector3(0, 0, 0));


// const scene = new THREE.Scene();
// const material = new THREE.LineBasicMaterial({ color: 0xfffffff });

// const curveWidth = 10,
// curveHeight = 6,
// bottomControlOffset = 3.5,
// topControlOffset = 1.5;

// var curve1 = new THREE.CubicBezierCurve(
//     new THREE.Vector2( -curveWidth/2, 0 ),                // start point.
//     new THREE.Vector2(
//     -(curveWidth/2) + bottomControlOffset, 0 ),         // first control point
//     new THREE.Vector2( -topControlOffset, curveHeight ),  // second control point
//     new THREE.Vector2( 0, curveHeight )                   // end point
// );
// var curve2 = new THREE.CubicBezierCurve(
//     new THREE.Vector2( curveWidth/2, 0 ),                // start point.
//     new THREE.Vector2(
//     (curveWidth/2) - bottomControlOffset, 0 ),         // first control point
//     new THREE.Vector2( topControlOffset, curveHeight ),  // second control point
//     new THREE.Vector2( 0, curveHeight )                   // end point
// );

// const points1 = curve1.getPoints( 50 );
// const points2 = curve2.getPoints( 50 );
// points2.reverse();

// const geometry = new THREE.BufferGeometry()

// //console.log(points1[0].x)
// let pts_arr = []
// points1.forEach(ele => {pts_arr.push(new THREE.Vector3(ele.x, ele.y, 0))});
// points2.forEach(ele => {pts_arr.push(new THREE.Vector3(ele.x, ele.y, 0))});
// geometry.setFromPoints(pts_arr);

// const line = new THREE.Line(geometry, material);

// scene.add(line);
// renderer.render(scene, camera);
