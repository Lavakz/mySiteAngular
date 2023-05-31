import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

// @ts-ignorek
import { init, draw } from './SpaceGame.js';
import { WebGLService } from '../../scene/services/web-gl.service';

const vertexShaderSource = `#version 300 es
in vec4 a_coords;
in vec3 a_normals;
in vec4 a_color;
in vec2 a_texCoord;
uniform mat4 u_modelViewMatrix;
uniform mat4 u_projectionMatrix;
uniform vec4 ambientProduct, diffuseProduct, specularProduct;
uniform vec4 lightPosition;
uniform vec4 thrusterPosition;
uniform float shininess;
out vec4 v_color;
out vec2 v_texCoord;
void main() {
v_color = a_color;
v_texCoord = a_texCoord;
vec3 pos = -(u_modelViewMatrix * a_coords).xyz;
vec3 light = (u_modelViewMatrix * lightPosition).xyz;
vec3 thruster = (u_modelViewMatrix * thrusterPosition).xyz;
vec3 L = normalize( light - pos );
vec3 E = normalize( -pos );
vec3 H = normalize( L + E );
vec4 NN = vec4(a_normals,0);
vec3 N = normalize( (u_modelViewMatrix*NN).xyz);
vec4 ambient = ambientProduct;
float Kd = max( dot(L, N), 0.0 );
vec4  diffuse = Kd * diffuseProduct;
float Ks = pow( max(dot(N, H), 0.0), shininess );
vec4  specular = Ks * specularProduct;
if( dot(L, N) < 0.8 ) {
specular = vec4(0.0, 0.0, 0.0, 1.0);
}
vec3 Lt = normalize( thruster - pos );
vec4  thrusterDiffuse = max( dot(Lt, N), 0.0 ) * vec4(0.0, 0.0, 1.0, 1.0);
gl_Position = u_projectionMatrix * u_modelViewMatrix * a_coords;
v_color = ambient + diffuse + specular + thrusterDiffuse;
v_color.a = 1.0;
}`;

const fragmentShaderSource = `#version 300 es
precision mediump float;
in vec2 v_texCoord;
in vec4 v_color;
out vec4 f_color;
uniform sampler2D u_textureMap;
uniform float textured;
void main() {
if (textured >= 0.0)
f_color = v_color * texture(u_textureMap, v_texCoord);
else
f_color = v_color;
}`;

function createShader(gl: any, sourceCode: any, type: any) {
  // Compiles either a shader of type gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
  const shader = gl.createShader(type);
  gl.shaderSource(shader, sourceCode);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    throw `Could not compile WebGL program. \n\n${info}`;
  }
  return shader;
}

@Component({
  selector: 'app-space-race-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './space-race-game.component.html',
  styleUrls: ['./space-race-game.component.sass'],
})
export class SpaceRaceGameComponent implements AfterViewInit {
  @ViewChild('glcanvas') private canvas: any | undefined;
  constructor(public webglService: WebGLService) {}
  ngAfterViewInit(): void {
    if (!this.canvas) {
      alert('canvas not supplied! cannot bind WebGL context!');
      return;
    }
    this.webglService.initialiseWebGLContext(this.canvas.nativeElement);
    const program: any = this.webglService.gl.createProgram();
    this.webglService.gl.attachShader(
      program,
      createShader(
        this.webglService.gl,
        vertexShaderSource,
        this.webglService.gl.VERTEX_SHADER
      )
    );
    this.webglService.gl.attachShader(
      program,
      createShader(
        this.webglService.gl,
        fragmentShaderSource,
        this.webglService.gl.FRAGMENT_SHADER
      )
    );
    this.webglService.gl.linkProgram(program);
    this.webglService.gl.useProgram(program);
    init(this.webglService.gl, program);
  }
  ngOnInit() {}
}
