/*!
 * @pixi/filter-dot - v2.5.0
 * Compiled Wed, 10 Jan 2018 17:38:59 UTC
 *
 * @pixi/filter-dot is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
import{Filter}from"pixi.js";var vertex="attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}",fragment="precision mediump float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform vec4 filterArea;\nuniform sampler2D uSampler;\n\nuniform float angle;\nuniform float scale;\n\nfloat pattern()\n{\n   float s = sin(angle), c = cos(angle);\n   vec2 tex = vTextureCoord * filterArea.xy;\n   vec2 point = vec2(\n       c * tex.x - s * tex.y,\n       s * tex.x + c * tex.y\n   ) * scale;\n   return (sin(point.x) * sin(point.y)) * 4.0;\n}\n\nvoid main()\n{\n   vec4 color = texture2D(uSampler, vTextureCoord);\n   float average = (color.r + color.g + color.b) / 3.0;\n   gl_FragColor = vec4(vec3(average * 10.0 - 5.0 + pattern()), color.a);\n}\n",DotFilter=function(e){function n(n,t){void 0===n&&(n=1),void 0===t&&(t=5),e.call(this,vertex,fragment),this.scale=n,this.angle=t}e&&(n.__proto__=e),n.prototype=Object.create(e&&e.prototype),n.prototype.constructor=n;var t={scale:{configurable:!0},angle:{configurable:!0}};return t.scale.get=function(){return this.uniforms.scale},t.scale.set=function(e){this.uniforms.scale=e},t.angle.get=function(){return this.uniforms.angle},t.angle.set=function(e){this.uniforms.angle=e},Object.defineProperties(n.prototype,t),n}(Filter);export{DotFilter};
//# sourceMappingURL=filter-dot.es.js.map
