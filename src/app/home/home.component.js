"use strict";

import starUtils from './starUtils'

let  gl;  

let  attributeCoords;  
let  bufferCoords;    

let  uniformModelTransform;
let  modelTransform;
let colorLocation;

let stars = [];
let starCoords = [];

const SPEED = 0.01;
const R_SPEED = 4;
const MIN_SIZE = 0.1;
const MAX_SIZE = 0.3;
const INIT_STAR_NUM = 4;

let perClick = 1;
let pause = false;

let canvas;

//Initialize the program
function init() {

    //Get graphics context
    canvas = document.getElementById( "gl-canvas" );
    let  options = {  
        alpha: false,
        depth: false
    };

    gl = canvas.getContext("webgl2", options);
    if ( !gl ) { alert( "WebGL 2.0 isn't available" ); }

    //Load shaders
    let program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    //setup locations
    attributeCoords = gl.getAttribLocation(program, "a_coords");
    uniformModelTransform = gl.getUniformLocation(program, "u_transform");
    colorLocation = gl.getUniformLocation(program, "color");

    // create coordinates of a star
    let  t;
    for(let i = 0; i <= 10; i++){
        t = (2 * Math.PI * i)/10;
        if (i%2) starCoords[i] = [Math.cos(t), Math.sin(t)];
        else starCoords[i] = [Math.cos(t)/2, Math.sin(t)/2];
    }

    // create a new star at mouse click location
    let x,y;
    canvas.addEventListener("click", function(event){
        for (let t = 0; t < perClick; t++){
            let rect = event.target.getBoundingClientRect();
            x = -1+(2*(event.clientX-rect.left)/canvas.width);
            y = -1+2*((canvas.height-(event.clientY-rect.top))/canvas.height);
            newStar(x, y);
        } 
    });

    // set up screen
    gl.clearColor(0,0,0,1); 
    gl.viewport(0, 0, window.innerWidth, window.innerHeight);
    window.addEventListener('resize', () => {
        gl.viewport(0, 0, window.innerWidth, window.innerHeight); 
    });

    // set up buffer
    bufferCoords = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferCoords);
    gl.vertexAttribPointer(attributeCoords, 2, gl.FLOAT, false, 0, 0); 
    gl.enableVertexAttribArray(attributeCoords); 

    // starting stars
    for (let i = 0; i < INIT_STAR_NUM; i++) newStar(0, 0);

    draw();
}

// create star and add to stars array
function newStar(x, y) {
    let size = ((Math.random()*MAX_SIZE*100)+MIN_SIZE*100)/100;
    const star = {
        modelTransform: mult(translate(x,y,0.0), 
                    mult(scalem(size, size, 0),mat4())),
        color:     [255, 255, 255],
        coords:    starCoords,
        direction: Math.random()*2*Math.PI,
        rotation: (Math.random()*R_SPEED)-R_SPEED/2,
        centroid:  function() {return getCentroid(star.coords)}
    }
    stars.push(star); 
}

// Draws the contents of the canvas
 function draw() {  
    gl.canvas.width  = window.innerWidth;
    gl.canvas.height = window.innerHeight;

    for (let i = 0; i < stars.length; i++){
        gl.bufferData(gl.ARRAY_BUFFER, flatten(stars[i].coords), gl.STREAM_DRAW);
        gl.uniformMatrix4fv(uniformModelTransform,false,flatten(stars[i].modelTransform));
        gl.uniform3fv(colorLocation, stars[i].color);

        if (!pause){
            // Rotate around centroid
            let p = mult(stars[i].modelTransform,stars[i].centroid());
            stars[i].modelTransform = mult(translate(-p[0],-p[1],0.0,0.0),stars[i].modelTransform);
            stars[i].modelTransform = mult(rotateZ(stars[i].rotation),stars[i].modelTransform);
            stars[i].modelTransform = mult(translate(p[0],p[1],0.0,0.0),stars[i].modelTransform);

            // Change directions if off canvas
            if (p[0] > 1)  stars[i].direction = Math.random()*Math.PI/2 + Math.PI/2;
            if (p[0] < -1) stars[i].direction = Math.random()*Math.PI/2 - Math.PI/2;
            if (p[1] > 1)  stars[i].direction = Math.random()*Math.PI/2 + Math.PI;
            if (p[1] < -1) stars[i].direction = Math.random()*Math.PI/2;

            // Translate
            stars[i].modelTransform = mult(translate(Math.cos(stars[i].direction)*SPEED,
                                                     Math.sin(stars[i].direction)*SPEED,0.0),
                                                     stars[i].modelTransform);
        }
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 11);
    }
    requestAnimationFrame(draw);
}

function getCentroid(coords){
    let start=0, numPoints=coords.length;
    let xCentroid = 0.0, yCentroid=0.0;
    for (let i=start; i<numPoints; i++){
        xCentroid += coords[i][0];
        yCentroid += coords[i][1]; 
    }
    return vec4(xCentroid/numPoints, yCentroid/numPoints, 0.0,1.0);
}

function pauseButton(){pause = !pause;};
function morePerClick(){perClick++;};    
