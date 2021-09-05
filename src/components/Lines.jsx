import React from 'react';
import * as THREE from 'three';
import oc from 'three-orbit-controls'
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'


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
            const multiple = 8;
            const curveWidth = 4*multiple,
            curveHeight = 0.5*multiple,
            bottomControlOffset = 4.4*multiple,
            topControlOffset = 4.4*multiple,
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

            const group = new THREE.Group();
            const geometry = new LineGeometry();
            //geometry.setPositions( pts_arr );
                geometry.setPositions( allPointsArr );
                const material = new LineMaterial( { color: 0xffffff, linewidth: 2 } );
                material.resolution.set( window.innerWidth, window.innerHeight )
                const lines = new Line2( geometry, material );
                group.add(lines);

            const loader = new THREE.FontLoader();
            const helvetica = 'https://cdn.rawgit.com/mrdoob/three.js/master/examples/fonts/helvetiker_regular.typeface.json'
            loader.load( helvetica, function ( font ) {
            //https://cdn.rawgit.com/mrdoob/three.js/master/examples/fonts/helvetiker_regular.typeface.json        

                    const walTxt = 'Walk43';
                    const geometryTxt = new THREE.TextGeometry(walTxt, {
                        font: font,
                        size: 24,
                        height: 5,
                        curveSegments: 12,
                        bevelEnabled: false,
                        bevelThickness: 1,
                        bevelSize: 8,
                        bevelSegments: 5
                    });
                    geometryTxt.rotateZ(-Math.PI/2);
                    const materialTxt = new THREE.MeshBasicMaterial( {color: 0x0000ff} )
                    const texts = new THREE.Mesh(geometryTxt, materialTxt)
                    texts.position.x = -190
                    texts.position.y = 270
                    geometryTxt.translate( 0,-100,0)
                    // texts.position.set(0, 200, 0);
                    // camera.position.set(300,300,300);
                    // camera.lookAt(lines.position);

                    group.add(texts);
            } );

            loader.load( helvetica, function ( font ) {
                //https://cdn.rawgit.com/mrdoob/three.js/master/examples/fonts/helvetiker_regular.typeface.json        
    
                        const walTxt = 'Walk41';
                        const geometryTxt = new THREE.TextGeometry(walTxt, {
                            font: font,
                            size: 5,
                            height: 5,
                            curveSegments: 12,
                            bevelEnabled: false,
                            bevelThickness: 1,
                            bevelSize: 8,
                            bevelSegments: 5
                        });
                        const materialTxt = new THREE.MeshBasicMaterial( {color: 0x61DFFF} )
                        const texts = new THREE.Mesh(geometryTxt, materialTxt)
                        texts.position.set(0, 2, 0);
                        texts.position.x = -150
                        texts.position.y = 220
                        // camera.position.set(300,300,300);
                        // camera.lookAt(lines.position);
                        geometryTxt.translate( 0,-100,0)
                        group.add(texts);
                } );
            geometry.translate( 0,-100,0)    
            scene.add(group);

            renderer = new THREE.WebGLRenderer( { antialias: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            document.body.appendChild( renderer.domElement );

            const controls = new OrbitControls( camera, renderer.domElement );
            controls.minDistance = 10;
            controls.maxDistance = Infinity;
            // controls.minPolarAngle = Math.PI/2;
            // controls.maxPolarAngle = Math.PI; 
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
