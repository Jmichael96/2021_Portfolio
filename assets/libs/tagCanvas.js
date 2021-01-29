// /**
//  * Copyright (C) 2010-2015 Graham Breach
//  *
//  * This program is free software: you can redistribute it and/or modify
//  * it under the terms of the GNU Lesser General Public License as published by
//  * the Free Software Foundation, either version 3 of the License, or
//  * (at your option) any later version.
//  *
//  * This program is distributed in the hope that it will be useful,
//  * but WITHOUT ANY WARRANTY; without even the implied warranty of
//  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  * GNU Lesser General Public License for more details.
//  * 
//  * You should have received a copy of the GNU Lesser General Public License
//  * along with this program.  If not, see <http://www.gnu.org/licenses/>.
//  */
// /**
//  * jQuery.tagcanvas 2.9
//  * For more information, please contact <graham@goat1000.com>
//  */
// (function($){
// "use strict";
// var i, j, abs = Math.abs, sin = Math.sin, cos = Math.cos, max = Math.max,
//   min = Math.min, ceil = Math.ceil, sqrt = Math.sqrt, pow = Math.pow,
//   hexlookup3 = {}, hexlookup2 = {}, hexlookup1 = {
//   0:"0,",   1:"17,",  2:"34,",  3:"51,",  4:"68,",  5:"85,",
//   6:"102,", 7:"119,", 8:"136,", 9:"153,", a:"170,", A:"170,",
//   b:"187,", B:"187,", c:"204,", C:"204,", d:"221,", D:"221,",
//   e:"238,", E:"238,", f:"255,", F:"255,"  
//   }, Oproto, Tproto, TCproto, Mproto, Vproto, TSproto, TCVproto,
//   doc = document, ocanvas, handlers = {};
// for(i = 0; i < 256; ++i) {
//   j = i.toString(16);
//   if(i < 16)
//     j = '0' + j;
//   hexlookup2[j] = hexlookup2[j.toUpperCase()] = i.toString() + ',';
// }
// function Defined(d) {
//   return typeof d != 'undefined';
// }
// function IsObject(o) {
//   return typeof o == 'object' && o != null;
// }
// function Clamp(v, mn, mx) {
//   return isNaN(v) ? mx : min(mx, max(mn, v));
// }
// function Nop() {
//   return false;
// }
// function TimeNow() {
//   return new Date().valueOf();
// }
// function SortList(l, f) {
//   var nl = [], tl = l.length, i;
//   for(i = 0; i < tl; ++i)
//     nl.push(l[i]);
//   nl.sort(f);
//   return nl;
// }
// function Shuffle(a) {
//   var i = a.length-1, t, p;
//   while(i) {
//     p = ~~(Math.random()*i);
//     t = a[i];
//     a[i] = a[p];
//     a[p] = t;
//     --i;
//   }
// }
// function Vector(x, y, z) {
//   this.x = x;
//   this.y = y;
//   this.z = z;
// }
// Vproto = Vector.prototype;
// Vproto.length = function() {
//   return sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
// };
// Vproto.dot = function(v) {
//   return this.x * v.x + this.y * v.y + this.z * v.z;
// };
// Vproto.cross = function(v) {
//   var x = this.y * v.z - this.z * v.y,
//     y = this.z * v.x - this.x * v.z,
//     z = this.x * v.y - this.y * v.x;
//   return new Vector(x, y, z);
// };
// Vproto.angle = function(v) {
//   var dot = this.dot(v), ac;
//   if(dot == 0)
//     return Math.PI / 2.0;
//   ac = dot / (this.length() * v.length());
//   if(ac >= 1)
//     return 0;
//   if(ac <= -1)
//     return Math.PI;
//   return Math.acos(ac);
// };
// Vproto.unit = function() {
//   var l = this.length();
//   return new Vector(this.x / l, this.y / l, this.z / l);
// };
// function MakeVector(lg, lt) {
//   lt = lt * Math.PI / 180;
//   lg = lg * Math.PI / 180;
//   var x = sin(lg) * cos(lt), y = -sin(lt), z = -cos(lg) * cos(lt);
//   return new Vector(x, y, z);
// }
// function Matrix(a) {
//   this[1] = {1: a[0],  2: a[1],  3: a[2]};
//   this[2] = {1: a[3],  2: a[4],  3: a[5]};
//   this[3] = {1: a[6],  2: a[7],  3: a[8]};
// }
// Mproto = Matrix.prototype;
// Matrix.Identity = function() {
//   return new Matrix([1,0,0, 0,1,0, 0,0,1]);
// };
// Matrix.Rotation = function(angle, u) {
//   var sina = sin(angle), cosa = cos(angle), mcos = 1 - cosa;
//   return new Matrix([
//     cosa + pow(u.x, 2) * mcos, u.x * u.y * mcos - u.z * sina, u.x * u.z * mcos + u.y * sina,
//     u.y * u.x * mcos + u.z * sina, cosa + pow(u.y, 2) * mcos, u.y * u.z * mcos - u.x * sina,
//     u.z * u.x * mcos - u.y * sina, u.z * u.y * mcos + u.x * sina, cosa + pow(u.z, 2) * mcos
//   ]);
// }
// Mproto.mul = function(m) {
//   var a = [], i, j, mmatrix = (m.xform ? 1 : 0);
//   for(i = 1; i <= 3; ++i)
//     for(j = 1; j <= 3; ++j) {
//       if(mmatrix)
//         a.push(this[i][1] * m[1][j] +
//           this[i][2] * m[2][j] +
//           this[i][3] * m[3][j]);
//       else
//         a.push(this[i][j] * m);
//     }
//   return new Matrix(a);
// };
// Mproto.xform = function(p) {
//   var a = {}, x = p.x, y = p.y, z = p.z;
//   a.x = x * this[1][1] + y * this[2][1] + z * this[3][1];
//   a.y = x * this[1][2] + y * this[2][2] + z * this[3][2];
//   a.z = x * this[1][3] + y * this[2][3] + z * this[3][3];
//   return a;
// };
// function PointsOnSphere(n,xr,yr,zr,magic) {
//   var i, y, r, phi, pts = [], off = 2/n, inc;
//   inc = Math.PI * (3 - sqrt(5) + (parseFloat(magic) ? parseFloat(magic) : 0));
//   for(i = 0; i < n; ++i) {
//     y = i * off - 1 + (off / 2);
//     r = sqrt(1 - y*y);
//     phi = i * inc;
//     pts.push([cos(phi) * r * xr, y * yr, sin(phi) * r * zr]);
//   }
//   return pts;
// }
// function Cylinder(n,o,xr,yr,zr,magic) {
//   var phi, pts = [], off = 2/n, inc, i, j, k, l;
//   inc = Math.PI * (3 - sqrt(5) + (parseFloat(magic) ? parseFloat(magic) : 0));
//   for(i = 0; i < n; ++i) {
//     j = i * off - 1 + (off / 2);
//     phi = i * inc;
//     k = cos(phi);
//     l = sin(phi);
//     pts.push(o ? [j * xr, k * yr, l * zr] : [k * xr, j * yr, l * zr]);
//   }
//   return pts;
// }
// function Ring(o, n, xr, yr, zr, j) {
//   var phi, pts = [], inc = Math.PI * 2 / n, i, k, l;
//   for(i = 0; i < n; ++i) {
//     phi = i * inc;
//     k = cos(phi);
//     l = sin(phi);
//     pts.push(o ? [j * xr, k * yr, l * zr] : [k * xr, j * yr, l * zr]);
//   }
//   return pts;
// }
// function PointsOnCylinderV(n,xr,yr,zr,m) { return Cylinder(n, 0, xr, yr, zr, m) }
// function PointsOnCylinderH(n,xr,yr,zr,m) { return Cylinder(n, 1, xr, yr, zr, m) }
// function PointsOnRingV(n, xr, yr, zr, offset) {
//   offset = isNaN(offset) ? 0 : offset * 1;
//   return Ring(0, n, xr, yr, zr, offset);
// }
// function PointsOnRingH(n, xr, yr, zr, offset) {
//   offset = isNaN(offset) ? 0 : offset * 1;
//   return Ring(1, n, xr, yr, zr, offset);
// }
// function CentreImage(t) {
//   var i = new Image;
//   i.onload = function() {
//     var dx = i.width / 2, dy = i.height / 2;
//     t.centreFunc = function(c, w, h, cx, cy) {
//       c.setTransform(1, 0, 0, 1, 0, 0);
//       c.globalAlpha = 1;
//       c.drawImage(i, cx - dx, cy - dy);
//     };
//   };
//   i.src = t.centreImage;
// }
// function SetAlpha(c,a) {
//   var d = c, p1, p2, ae = (a*1).toPrecision(3) + ')';
//   if(c[0] === '#') {
//     if(!hexlookup3[c])
//       if(c.length === 4)
//         hexlookup3[c] = 'rgba(' + hexlookup1[c[1]] + hexlookup1[c[2]] + hexlookup1[c[3]];
//       else
//         hexlookup3[c] = 'rgba(' + hexlookup2[c.substr(1,2)] + hexlookup2[c.substr(3,2)] + hexlookup2[c.substr(5,2)];
//     d = hexlookup3[c] + ae;
//   } else if(c.substr(0,4) === 'rgb(' || c.substr(0,4) === 'hsl(') {
//     d = (c.replace('(','a(').replace(')', ',' + ae));
//   } else if(c.substr(0,5) === 'rgba(' || c.substr(0,5) === 'hsla(') {
//     p1 = c.lastIndexOf(',') + 1, p2 = c.indexOf(')');
//     a *= parseFloat(c.substring(p1,p2));
//     d = c.substr(0,p1) + a.toPrecision(3) + ')';
//   }
//   return d;
// }
// function NewCanvas(w,h) {
//   // if using excanvas, give up now
//   if(window.G_vmlCanvasManager)
//     return null;
//   var c = doc.createElement('canvas');
//   c.width = w;
//   c.height = h;
//   return c;
// }
// // I think all browsers pass this test now...
// function ShadowAlphaBroken() {
//   var cv = NewCanvas(3,3), c, i;
//   if(!cv)
//     return false;
//   c = cv.getContext('2d');
//   c.strokeStyle = '#000';
//   c.shadowColor = '#fff';
//   c.shadowBlur = 3;
//   c.globalAlpha = 0;
//   c.strokeRect(2,2,2,2);
//   c.globalAlpha = 1;
//   i = c.getImageData(2,2,1,1);
//   cv = null;
//   return (i.data[0] > 0);
// }
// function SetGradient(c, l, o, g) {
//   var gd = c.createLinearGradient(0, 0, l, 0), i;
//   for(i in g)
//     gd.addColorStop(1 - i, g[i]);
//   c.fillStyle = gd;
//   c.fillRect(0, o, l, 1);
// }
// function FindGradientColour(tc, p, r) {
//   var l = 1024, h = 1, gl = tc.weightGradient, cv, c, i, d;
//   if(tc.gCanvas) {
//     c = tc.gCanvas.getContext('2d');
//     h = tc.gCanvas.height;
//   } else {
//     if(IsObject(gl[0]))
//       h = gl.length;
//     else
//       gl = [gl];
//     tc.gCanvas = cv = NewCanvas(l, h);
//     if(!cv)
//       return null;
//     c = cv.getContext('2d');
//     for(i = 0; i < h; ++i)
//       SetGradient(c, l, i, gl[i]);
//   }
//   r = max(min(r || 0, h - 1), 0);
//   d = c.getImageData(~~((l - 1) * p), r, 1, 1).data;
//   return 'rgba(' + d[0] + ',' + d[1] + ',' + d[2] + ',' + (d[3]/255) + ')';
// }
// function TextSet(ctxt, font, colour, strings, padx, pady, shadowColour,
//   shadowBlur, shadowOffsets, maxWidth, widths, align) {
//   var xo = padx + (shadowBlur || 0) + 
//     (shadowOffsets.length && shadowOffsets[0] < 0 ? abs(shadowOffsets[0]) : 0),
//     yo = pady + (shadowBlur || 0) + 
//     (shadowOffsets.length && shadowOffsets[1] < 0 ? abs(shadowOffsets[1]) : 0), i, xc;
//   ctxt.font = font;
//   ctxt.textBaseline = 'top';
//   ctxt.fillStyle = colour;
//   shadowColour && (ctxt.shadowColor = shadowColour);
//   shadowBlur && (ctxt.shadowBlur = shadowBlur);
//   shadowOffsets.length && (ctxt.shadowOffsetX = shadowOffsets[0],
//     ctxt.shadowOffsetY = shadowOffsets[1]);
//   for(i = 0; i < strings.length; ++i) {
//     xc = 0;
//     if(widths) {
//       if('right' == align) {
//         xc = maxWidth - widths[i];
//       } else if('centre' == align) {
//         xc = (maxWidth - widths[i]) / 2;
//       }
//     }
//     ctxt.fillText(strings[i], xo + xc, yo);
//     yo += parseInt(font);
//   }
// }
// function RRect(c, x, y, w, h, r, s) {
//   if(r) {
//     c.beginPath();
//     c.moveTo(x, y + h - r);
//     c.arcTo(x, y, x + r, y, r);
//     c.arcTo(x + w, y, x + w, y + r, r);
//     c.arcTo(x + w, y + h, x + w - r, y + h, r);
//     c.arcTo(x, y + h, x, y + h - r, r);
//     c.closePath();
//     c[s ? 'stroke' : 'fill']();
//   } else {
//     c[s ? 'strokeRect' : 'fillRect'](x, y, w, h);
//   }
// }
// function TextCanvas(strings, font, w, h, maxWidth, stringWidths, align, valign,
//   scale) {
//   this.strings = strings;
//   this.font = font;
//   this.width = w;
//   this.height = h;
//   this.maxWidth = maxWidth;
//   this.stringWidths = stringWidths;
//   this.align = align;
//   this.valign = valign;
//   this.scale = scale;
// }
// TCVproto = TextCanvas.prototype;
// TCVproto.SetImage = function(image, w, h, position, padding, align, valign,
//   scale) {
//   this.image = image;
//   this.iwidth = w * this.scale;
//   this.iheight = h * this.scale;
//   this.ipos = position;
//   this.ipad = padding * this.scale;
//   this.iscale = scale;
//   this.ialign = align;
//   this.ivalign = valign;
// };
// TCVproto.Align = function(size, space, a) {
//   var pos = 0;
//   if(a == 'right' || a == 'bottom')
//     pos = space - size;
//   else if(a != 'left' && a != 'top')
//     pos = (space - size) / 2;
//   return pos;
// };
// TCVproto.Create = function(colour, bgColour, bgOutline, bgOutlineThickness,
//   shadowColour, shadowBlur, shadowOffsets, padding, radius) {
//   var cv, cw, ch, c, x1, x2, y1, y2, offx, offy, ix, iy, iw, ih, rr,
//     sox = abs(shadowOffsets[0]), soy = abs(shadowOffsets[1]), shadowcv, shadowc;
//   padding = max(padding, sox + shadowBlur, soy + shadowBlur);
//   x1 = 2 * (padding + bgOutlineThickness);
//   y1 = 2 * (padding + bgOutlineThickness);
//   cw = this.width + x1;
//   ch = this.height + y1;
//   offx = offy = padding + bgOutlineThickness;

//   if(this.image) {
//     ix = iy = padding + bgOutlineThickness;
//     iw = this.iwidth;
//     ih = this.iheight;
//     if(this.ipos == 'top' || this.ipos == 'bottom') {
//       if(iw < this.width)
//         ix += this.Align(iw, this.width, this.ialign);
//       else
//         offx += this.Align(this.width, iw, this.align);
//       if(this.ipos == 'top')
//         offy += ih + this.ipad;
//       else
//         iy += this.height + this.ipad;
//       cw = max(cw, iw + x1);
//       ch += ih + this.ipad;
//     } else {
//       if(ih < this.height)
//         iy += this.Align(ih, this.height, this.ivalign);
//       else
//         offy += this.Align(this.height, ih, this.valign);
//       if(this.ipos == 'right')
//         ix += this.width + this.ipad;
//       else
//         offx += iw + this.ipad;
//       cw += iw + this.ipad;
//       ch = max(ch, ih + y1);
//     }
//   }

//   cv = NewCanvas(cw, ch);
//   if(!cv)
//     return null;
//   x1 = y1 = bgOutlineThickness / 2;
//   x2 = cw - bgOutlineThickness;
//   y2 = ch - bgOutlineThickness;
//   rr = min(radius, x2 / 2, y2 / 2);
//   c = cv.getContext('2d');
//   if(bgColour) {
//     c.fillStyle = bgColour;
//     RRect(c, x1, y1, x2, y2, rr);
//   }
//   if(bgOutlineThickness) {
//     c.strokeStyle = bgOutline;
//     c.lineWidth = bgOutlineThickness;
//     RRect(c, x1, y1, x2, y2, rr, true);
//   }
//   if(shadowBlur || sox || soy) {
//     // use a transparent canvas to draw on
//     shadowcv = NewCanvas(cw, ch);
//     if(shadowcv) {
//       shadowc = c;
//       c = shadowcv.getContext('2d');
//     }
//   }

//   // don't use TextSet shadow support because it adds space for shadow
//   TextSet(c, this.font, colour, this.strings, offx, offy, 0, 0, [],
//     this.maxWidth, this.stringWidths, this.align);
      
//   if(this.image)
//     c.drawImage(this.image, ix, iy, iw, ih);

//   if(shadowc) {
//     // draw the text and image with the added shadow
//     c = shadowc;
//     shadowColour && (c.shadowColor = shadowColour);
//     shadowBlur && (c.shadowBlur = shadowBlur);
//     c.shadowOffsetX = shadowOffsets[0];
//     c.shadowOffsetY = shadowOffsets[1];
//     c.drawImage(shadowcv, 0, 0);
//   }
//   return cv;
// };
// function ExpandImage(i, w, h) {
//   var cv = NewCanvas(w, h), c;
//   if(!cv)
//     return null;
//   c = cv.getContext('2d');
//   c.drawImage(i, (w - i.width) / 2, (h - i.height) / 2);
//   return cv;
// }
// function ScaleImage(i, w, h) {
//   var cv = NewCanvas(w, h), c;
//   if(!cv)
//     return null;
//   c = cv.getContext('2d');
//   c.drawImage(i, 0, 0, w, h);
//   return cv;
// }
// function AddBackgroundToImage(i, w, h, scale, colour, othickness, ocolour,
//   padding, radius, ofill) {
//   var cw = w + ((2 * padding) + othickness) * scale,
//     ch = h + ((2 * padding) + othickness) * scale,
//     cv = NewCanvas(cw, ch), c, x1, y1, x2, y2, ocanvas, cc, rr;
//   if(!cv)
//     return null;
//   othickness *= scale;
//   radius *= scale;
//   x1 = y1 = othickness / 2;
//   x2 = cw - othickness;
//   y2 = ch - othickness;
//   padding = (padding * scale) + x1; // add space for outline
//   c = cv.getContext('2d');
//   rr = min(radius, x2 / 2, y2 / 2);
//   if(colour) {
//     c.fillStyle = colour;
//     RRect(c, x1, y1, x2, y2, rr);
//   }
//   if(othickness) {
//     c.strokeStyle = ocolour;
//     c.lineWidth = othickness;
//     RRect(c, x1, y1, x2, y2, rr, true);
//   }
  
//   if(ofill) {
//     // use compositing to colour in the image and border
//     ocanvas = NewCanvas(cw, ch);
//     cc = ocanvas.getContext('2d');
//     cc.drawImage(i, padding, padding, w, h);
//     cc.globalCompositeOperation = 'source-in';
//     cc.fillStyle = ocolour;
//     cc.fillRect(0, 0, cw, ch);
//     cc.globalCompositeOperation = 'destination-over';
//     cc.drawImage(cv, 0, 0);
//     cc.globalCompositeOperation = 'source-over';
//     c.drawImage(ocanvas, 0, 0);
//   } else {
//     c.drawImage(i, padding, padding, i.width, i.height);
//   }
//   return {image: cv, width: cw / scale, height: ch / scale};
// }
// /**
//  * Rounds off the corners of an image
//  */
// function RoundImage(i, r, iw, ih, s) {
//   var cv, c, r1 = parseFloat(r), l = max(iw, ih);
//   cv = NewCanvas(iw, ih);
//   if(!cv)
//     return null;
//   if(r.indexOf('%') > 0)
//     r1 = l * r1 / 100;
//   else
//     r1 = r1 * s;
//   c = cv.getContext('2d');
//   c.globalCompositeOperation = 'source-over';
//   c.fillStyle = '#fff';
//   if(r1 >= l/2) {
//     r1 = min(iw,ih) / 2;
//     c.beginPath();
//     c.moveTo(iw/2,ih/2);
//     c.arc(iw/2,ih/2,r1,0,2*Math.PI,false);
//     c.fill();
//     c.closePath();
//   } else {
//     r1 = min(iw/2,ih/2,r1);
//     RRect(c, 0, 0, iw, ih, r1, true);
//     c.fill();
//   }
//   c.globalCompositeOperation = 'source-in';
//   c.drawImage(i, 0, 0, iw, ih);
//   return cv;
// }
// /**
//  * Creates a new canvas containing the image and its shadow
//  * Returns an object containing the image and its dimensions at z=0
//  */
// function AddShadowToImage(i, w, h, scale, sc, sb, so) {
//   var sw = abs(so[0]), sh = abs(so[1]), 
//     cw = w + (sw > sb ? sw + sb : sb * 2) * scale,
//     ch = h + (sh > sb ? sh + sb : sb * 2) * scale,
//     xo = scale * ((sb || 0) + (so[0] < 0 ? sw : 0)),
//     yo = scale * ((sb || 0) + (so[1] < 0 ? sh : 0)), cv, c;
//   cv = NewCanvas(cw, ch);
//   if(!cv)
//     return null;
//   c = cv.getContext('2d');
//   sc && (c.shadowColor = sc);
//   sb && (c.shadowBlur = sb * scale);
//   so && (c.shadowOffsetX = so[0] * scale, c.shadowOffsetY = so[1] * scale);
//   c.drawImage(i, xo, yo, w, h);
//   return {image: cv, width: cw / scale, height: ch / scale};
// }
// function FindTextBoundingBox(s,f,ht) {
//   var w = parseInt(s.toString().length * ht), h = parseInt(ht * 2 * s.length),
//     cv = NewCanvas(w,h), c, idata, w1, h1, x, y, i, ex;
//   if(!cv)
//     return null;
//   c = cv.getContext('2d');
//   c.fillStyle = '#000';
//   c.fillRect(0,0,w,h);
//   TextSet(c,ht + 'px ' + f,'#fff',s,0,0,0,0,[],'centre')

//   idata = c.getImageData(0,0,w,h);
//   w1 = idata.width; h1 = idata.height;
//   ex = {
//     min: { x: w1, y: h1 },
//     max: { x: -1, y: -1 }
//   };
//   for(y = 0; y < h1; ++y) {
//     for(x = 0; x < w1; ++x) {
//       i = (y * w1 + x) * 4;
//       if(idata.data[i+1] > 0) {
//         if(x < ex.min.x) ex.min.x = x;
//         if(x > ex.max.x) ex.max.x = x;
//         if(y < ex.min.y) ex.min.y = y;
//         if(y > ex.max.y) ex.max.y = y;
//       }
//     }
//   }
//   // device pixels might not be css pixels
//   if(w1 != w) {
//     ex.min.x *= (w / w1);
//     ex.max.x *= (w / w1);
//   }
//   if(h1 != h) {
//     ex.min.y *= (w / h1);
//     ex.max.y *= (w / h1);
//   }

//   cv = null;
//   return ex;
// }
// function FixFont(f) {
//   return "'" + f.replace(/(\'|\")/g,'').replace(/\s*,\s*/g, "', '") + "'";
// }
// function AddHandler(h,f,e) {
//   e = e || doc;
//   if(e.addEventListener)
//     e.addEventListener(h,f,false);
//   else
//     e.attachEvent('on' + h, f);
// }
// function RemoveHandler(h,f,e) {
//   e = e || doc;
//   if(e.removeEventListener)
//     e.removeEventListener(h, f);
//   else
//     e.detachEvent('on' + h, f);
// }
// function AddImage(i, o, t, tc) {
//   var s = tc.imageScale, mscale, ic, bc, oc, iw, ih;
//   // image not loaded, wait for image onload
//   if(!o.complete)
//     return AddHandler('load',function() { AddImage(i,o,t,tc); }, o);
//   if(!i.complete)
//     return AddHandler('load',function() { AddImage(i,o,t,tc); }, i);

//   // Yes, this does look like nonsense, but it makes sure that both the
//   // width and height are actually set and not just calculated. This is
//   // required to keep proportional sizes when the images are hidden, so
//   // the images can be used again for another cloud.
//   o.width = o.width;
//   o.height = o.height;

//   if(s) {
//     i.width = o.width * s;
//     i.height = o.height * s;
//   }
//   // the standard width of the image, with imageScale applied
//   t.iw = i.width;
//   t.ih = i.height;
//   if(tc.txtOpt) {
//     ic = i;
//     mscale = tc.zoomMax * tc.txtScale;
//     iw = t.iw * mscale;
//     ih = t.ih * mscale;
//     if(iw < o.naturalWidth || ih < o.naturalHeight) {
//       ic = ScaleImage(i, iw, ih);
//       if(ic)
//         t.fimage = ic;
//     } else {
//       iw = t.iw;
//       ih = t.ih;
//       mscale = 1;
//     }
//     if(parseFloat(tc.imageRadius))
//       t.image = t.fimage = i = RoundImage(t.image, tc.imageRadius, iw, ih, mscale);
//     if(!t.HasText()) {
//       if(tc.shadow) {
//         ic = AddShadowToImage(t.image, iw, ih, mscale, tc.shadow, tc.shadowBlur,
//           tc.shadowOffset);
//         if(ic) {
//           t.fimage = ic.image;
//           t.w = ic.width;
//           t.h = ic.height;
//         }
//       }
//       if(tc.bgColour || tc.bgOutlineThickness) {
//         bc = tc.bgColour == 'tag' ? GetProperty(t.a, 'background-color') :
//           tc.bgColour;
//         oc = tc.bgOutline == 'tag' ? GetProperty(t.a, 'color') : 
//           (tc.bgOutline || tc.textColour);
//         iw = t.fimage.width;
//         ih = t.fimage.height;
//         if(tc.outlineMethod == 'colour') {
//           // create the outline version first, using the current image state
//           ic = AddBackgroundToImage(t.fimage, iw, ih, mscale, bc,
//             tc.bgOutlineThickness, t.outline.colour, tc.padding, tc.bgRadius, 1);
//           if(ic)
//             t.oimage = ic.image;
//         }
//         ic = AddBackgroundToImage(t.fimage, iw, ih, mscale, bc, 
//           tc.bgOutlineThickness, oc, tc.padding, tc.bgRadius);
//         if(ic) {
//           t.fimage = ic.image;
//           t.w = ic.width;
//           t.h = ic.height;
//         }
//       }
//       if(tc.outlineMethod == 'size') {
//         if(tc.outlineIncrease > 0) {
//           t.iw += 2 * tc.outlineIncrease;
//           t.ih += 2 * tc.outlineIncrease;
//           iw = mscale * t.iw;
//           ih = mscale * t.ih;
//           ic = ScaleImage(t.fimage, iw, ih);
//           t.oimage = ic;
//           t.fimage = ExpandImage(t.fimage, t.oimage.width, t.oimage.height);
//         } else {
//           iw = mscale * (t.iw + (2 * tc.outlineIncrease));
//           ih = mscale * (t.ih + (2 * tc.outlineIncrease));
//           ic = ScaleImage(t.fimage, iw, ih);
//           t.oimage = ExpandImage(ic, t.fimage.width, t.fimage.height);
//         }
//       }
//     }
//   }
//   t.Init();
// }
// function GetProperty(e,p) {
//   var dv = doc.defaultView, pc = p.replace(/\-([a-z])/g,function(a){return a.charAt(1).toUpperCase()});
//   return (dv && dv.getComputedStyle && dv.getComputedStyle(e,null).getPropertyValue(p)) ||
//     (e.currentStyle && e.currentStyle[pc]);
// }
// function FindWeight(a, wFrom, tHeight) {
//   var w = 1, p;
//   if(wFrom) {
//     w = 1 * (a.getAttribute(wFrom) || tHeight);
//   } else if(p = GetProperty(a,'font-size')) {
//     w = (p.indexOf('px') > -1 && p.replace('px','') * 1) ||
//       (p.indexOf('pt') > -1 && p.replace('pt','') * 1.25) ||
//       p * 3.3;
//   }
//   return w;
// }
// function EventToCanvasId(e) {
//   return e.target && Defined(e.target.id) ? e.target.id :
//     e.srcElement.parentNode.id;
// }
// function EventXY(e, c) {
//   var xy, p, xmul = parseInt(GetProperty(c, 'width')) / c.width,
//     ymul = parseInt(GetProperty(c, 'height')) / c.height;
//   if(Defined(e.offsetX)) {
//     xy = {x: e.offsetX, y: e.offsetY};
//   } else {
//     p = AbsPos(c.id);
//     if(Defined(e.changedTouches))
//       e = e.changedTouches[0];
//     if(e.pageX)
//       xy = {x: e.pageX - p.x, y: e.pageY - p.y};
//   }
//   if(xy && xmul && ymul) {
//     xy.x /= xmul;
//     xy.y /= ymul;
//   }
//   return xy;
// }
// function MouseOut(e) {
//   var cv = e.target || e.fromElement.parentNode, tc = TagCanvas.tc[cv.id];
//   if(tc) {
//    tc.mx = tc.my = -1;
//    tc.UnFreeze();
//    tc.EndDrag();
//   }
// }
// function MouseMove(e) {
//   var i, t = TagCanvas, tc, p, tg = EventToCanvasId(e);
//   for(i in t.tc) {
//     tc = t.tc[i];
//     if(tc.tttimer) {
//       clearTimeout(tc.tttimer);
//       tc.tttimer = null;
//     }
//   }
//   if(tg && t.tc[tg]) {
//     tc = t.tc[tg];
//     if(p = EventXY(e, tc.canvas)) {
//       tc.mx = p.x;
//       tc.my = p.y;
//       tc.Drag(e, p);
//     }
//     tc.drawn = 0;
//   }
// }
// function MouseDown(e) {
//   var t = TagCanvas, cb = doc.addEventListener ? 0 : 1,
//     tg = EventToCanvasId(e);
//   if(tg && e.button == cb && t.tc[tg]) {
//     t.tc[tg].BeginDrag(e);
//   }
// }
// function MouseUp(e) {
//   var t = TagCanvas, cb = doc.addEventListener ? 0 : 1,
//     tg = EventToCanvasId(e), tc;
//   if(tg && e.button == cb && t.tc[tg]) {
//     tc = t.tc[tg];
//     MouseMove(e);
//     if(!tc.EndDrag() && !tc.touchState)
//       tc.Clicked(e);
//   }
// }
// function TouchDown(e) {
//   var tg = EventToCanvasId(e), tc = (tg && TagCanvas.tc[tg]), p;
//   if(tc && e.changedTouches) {
//     if(e.touches.length == 1 && tc.touchState == 0) {
//       tc.touchState = 1;
//       tc.BeginDrag(e);
//       if(p = EventXY(e, tc.canvas)) {
//         tc.mx = p.x;
//         tc.my = p.y;
//         tc.drawn = 0;
//       }
//     } else if(e.targetTouches.length == 2 && tc.pinchZoom) {
//       tc.touchState = 3;
//       tc.EndDrag();
//       tc.BeginPinch(e);
//     } else {
//       tc.EndDrag();
//       tc.EndPinch();
//       tc.touchState = 0;
//     }
//   }
// }
// function TouchUp(e) {
//   var tg = EventToCanvasId(e), tc = (tg && TagCanvas.tc[tg]);
//   if(tc && e.changedTouches) {
//     switch(tc.touchState) {
//     case 1:
//       tc.Draw();
//       tc.Clicked();
//       break;
//     case 2:
//       tc.EndDrag();
//       break;
//     case 3:
//       tc.EndPinch();
//     }
//     tc.touchState = 0;
//   }
// }
// function TouchMove(e) {
//   var i, t = TagCanvas, tc, p, tg = EventToCanvasId(e);
//   for(i in t.tc) {
//     tc = t.tc[i];
//     if(tc.tttimer) {
//       clearTimeout(tc.tttimer);
//       tc.tttimer = null;
//     }
//   }
//   tc = (tg && t.tc[tg]);
//   if(tc && e.changedTouches && tc.touchState) {
//     switch(tc.touchState) {
//     case 1:
//     case 2:
//       if(p = EventXY(e, tc.canvas)) {
//         tc.mx = p.x;
//         tc.my = p.y;
//         if(tc.Drag(e, p))
//           tc.touchState = 2;
//       }
//       break;
//     case 3:
//       tc.Pinch(e);
//     }
//     tc.drawn = 0;
//   }
// }
// function MouseWheel(e) {
//   var t = TagCanvas, tg = EventToCanvasId(e);
//   if(tg && t.tc[tg]) {
//     e.cancelBubble = true;
//     e.returnValue = false;
//     e.preventDefault && e.preventDefault();
//     t.tc[tg].Wheel((e.wheelDelta || e.detail) > 0);
//   }
// }
// function Scroll(e) {
//   var i, t = TagCanvas;
//   clearTimeout(t.scrollTimer);
//   for(i in t.tc) {
//     t.tc[i].Pause();
//   }
//   t.scrollTimer = setTimeout(function() {
//     var i, t = TagCanvas;
//     for(i in t.tc) {
//       t.tc[i].Resume();
//     }
//   }, t.scrollPause);
// }
// function DrawCanvas() {
//   DrawCanvasRAF(TimeNow());
// }
// function DrawCanvasRAF(t) {
//   var tc = TagCanvas.tc, i;
//   TagCanvas.NextFrame(TagCanvas.interval);
//   t = t || TimeNow();
//   for(i in tc)
//     tc[i].Draw(t);
// }
// function AbsPos(id) {
//   var e = doc.getElementById(id), r = e.getBoundingClientRect(),
//     dd = doc.documentElement, b = doc.body, w = window,
//     xs = w.pageXOffset || dd.scrollLeft,
//     ys = w.pageYOffset || dd.scrollTop,
//     xo = dd.clientLeft || b.clientLeft,
//     yo = dd.clientTop || b.clientTop;
//   return { x: r.left + xs - xo, y: r.top + ys - yo };
// }
// function Project(tc,p1,sx,sy) {
//   var m = tc.radius * tc.z1 / (tc.z1 + tc.z2 + p1.z);
//   return {
//     x: p1.x * m * sx,
//     y: p1.y * m * sy,
//     z: p1.z,
//     w: (tc.z1 - p1.z) / tc.z2
//   };
// }
// /**
//  * @constructor
//  * for recursively splitting tag contents on <br> tags
//  */
// function TextSplitter(e) {
//   this.e = e;
//   this.br = 0;
//   this.line = [];
//   this.text = [];
//   this.original = e.innerText || e.textContent;
// }
// TSproto = TextSplitter.prototype;
// TSproto.Empty = function() {
//   for(var i = 0; i < this.text.length; ++i)
//     if(this.text[i].length)
//       return false;
//   return true;
// };
// TSproto.Lines = function(e) {
//   var r = e ? 1 : 0, cn, cl, i;
//   e = e || this.e;
//   cn = e.childNodes;
//   cl = cn.length;

//   for(i = 0; i < cl; ++i) {
//     if(cn[i].nodeName == 'BR') {
//       this.text.push(this.line.join(' '));
//       this.br = 1;
//     } else if(cn[i].nodeType == 3) {
//       if(this.br) {
//         this.line = [cn[i].nodeValue];
//         this.br = 0;
//       } else {
//         this.line.push(cn[i].nodeValue);
//       }
//     } else {
//       this.Lines(cn[i]);
//     }
//   }
//   r || this.br || this.text.push(this.line.join(' '));
//   return this.text;
// };
// TSproto.SplitWidth = function(w, c, f, h) {
//   var i, j, words, text = [];
//   c.font = h + 'px ' + f;
//   for(i = 0; i < this.text.length; ++i) {
//     words = this.text[i].split(/\s+/);
//     this.line = [words[0]];
//     for(j = 1; j < words.length; ++j) {
//       if(c.measureText(this.line.join(' ') + ' ' + words[j]).width > w) {
//         text.push(this.line.join(' '));
//         this.line = [words[j]];
//       } else {
//         this.line.push(words[j]);
//       }
//     }
//     text.push(this.line.join(' '));
//   }
//   return this.text = text;
// };
// /**
//  * @constructor
//  */
// function Outline(tc,t) {
//   this.ts = null;
//   this.tc = tc;
//   this.tag = t;
//   this.x = this.y = this.w = this.h = this.sc = 1;
//   this.z = 0;
//   this.pulse = 1;
//   this.pulsate = tc.pulsateTo < 1;
//   this.colour = tc.outlineColour;
//   this.adash = ~~tc.outlineDash;
//   this.agap = ~~tc.outlineDashSpace || this.adash;
//   this.aspeed = tc.outlineDashSpeed * 1;
//   if(this.colour == 'tag')
//     this.colour = GetProperty(t.a, 'color');
//   else if(this.colour == 'tagbg')
//     this.colour = GetProperty(t.a, 'background-color');
//   this.Draw = this.pulsate ? this.DrawPulsate : this.DrawSimple;
//   this.radius = tc.outlineRadius | 0;
//   this.SetMethod(tc.outlineMethod);
// }
// Oproto = Outline.prototype;
// Oproto.SetMethod = function(om) {
//   var methods = {
//     block: ['PreDraw','DrawBlock'],
//     colour: ['PreDraw','DrawColour'],
//     outline: ['PostDraw','DrawOutline'],
//     classic: ['LastDraw','DrawOutline'],
//     size: ['PreDraw','DrawSize'],
//     none: ['LastDraw']
//   }, funcs = methods[om] || methods.outline;
//   if(om == 'none') {
//     this.Draw = function() { return 1; }
//   } else {
//     this.drawFunc = this[funcs[1]];
//   }
//   this[funcs[0]] = this.Draw;
// };
// Oproto.Update = function(x,y,w,h,sc,z,xo,yo) {
//   var o = this.tc.outlineOffset, o2 = 2 * o;
//   this.x = sc * x + xo - o;
//   this.y = sc * y + yo - o;
//   this.w = sc * w + o2;
//   this.h = sc * h + o2;
//   this.sc = sc; // used to determine frontmost
//   this.z = z;
// };
// Oproto.Ants = function(c) {
//   if(!this.adash)
//     return;
//   var l = this.adash, g = this.agap, s = this.aspeed, length = l + g,
//     l1 = 0, l2 = l, g1 = g, g2 = 0, seq = 0, ants;
//   if(s) {
//     seq = abs(s) * (TimeNow() - this.ts) / 50;
//     if(s < 0)
//       seq = 8.64e6 - seq;
//     s = ~~seq % length;
//   }
//   if(s) {
//     if(l >= s) {
//       l1 = l - s;
//       l2 = s;
//     } else {
//       g1 = length - s;
//       g2 = g - g1;
//     }
//     ants = [l1, g1, l2, g2];
//   } else {
//     ants = [l,g];
//   }
//   c.setLineDash(ants);
// }
// Oproto.DrawOutline = function(c,x,y,w,h,colour) {
//   var r = min(this.radius, h/2, w/2);
//   c.strokeStyle = colour;
//   this.Ants(c);
//   RRect(c, x, y, w, h, r, true);
// };
// Oproto.DrawSize = function(c,x,y,w,h,colour,tag,x1,y1) {
//   var tw = tag.w, th = tag.h, m, i, sc;
//   if(this.pulsate) {
//     if(tag.image)
//       sc = (tag.image.height + this.tc.outlineIncrease) / tag.image.height;
//     else
//       sc = tag.oscale;
//     i = tag.fimage || tag.image;
//     m = 1 + ((sc - 1) * (1-this.pulse));
//     tag.h *= m;
//     tag.w *= m;
//   } else {
//     i = tag.oimage;
//   }
//   tag.alpha = 1;
//   tag.Draw(c, x1, y1, i);
//   tag.h = th;
//   tag.w = tw;
//   return 1;
// };
// Oproto.DrawColour = function(c,x,y,w,h,colour,tag,x1,y1) {
//   if(tag.oimage) {
//     if(this.pulse < 1) {
//       tag.alpha = 1 - pow(this.pulse, 2);
//       tag.Draw(c, x1, y1, tag.fimage);
//       tag.alpha = this.pulse;
//     } else {
//       tag.alpha = 1;
//     }
//     tag.Draw(c, x1, y1, tag.oimage);
//     return 1;
//   }
//   return this[tag.image ? 'DrawColourImage' : 'DrawColourText'](c,x,y,w,h,colour,tag,x1,y1);
// };
// Oproto.DrawColourText = function(c,x,y,w,h,colour,tag,x1,y1) {
//   var normal = tag.colour;
//   tag.colour = colour;
//   tag.alpha = 1;
//   tag.Draw(c,x1,y1);
//   tag.colour = normal;
//   return 1;
// };
// Oproto.DrawColourImage = function(c,x,y,w,h,colour,tag,x1,y1) {
//   var ccanvas = c.canvas, fx = ~~max(x,0), fy = ~~max(y,0), 
//     fw = min(ccanvas.width - fx, w) + .5|0, fh = min(ccanvas.height - fy,h) + .5|0, cc;
//   if(ocanvas)
//     ocanvas.width = fw, ocanvas.height = fh;
//   else
//     ocanvas = NewCanvas(fw, fh);
//   if(!ocanvas)
//     return this.SetMethod('outline'); // if using IE and images, give up!
//   cc = ocanvas.getContext('2d');

//   cc.drawImage(ccanvas,fx,fy,fw,fh,0,0,fw,fh);
//   c.clearRect(fx,fy,fw,fh);
//   if(this.pulsate) {
//     tag.alpha = 1 - pow(this.pulse, 2);
//   } else {
//     tag.alpha = 1;
//   }
//   tag.Draw(c,x1,y1);
//   c.setTransform(1,0,0,1,0,0);
//   c.save();
//   c.beginPath();
//   c.rect(fx,fy,fw,fh);
//   c.clip();
//   c.globalCompositeOperation = 'source-in';
//   c.fillStyle = colour;
//   c.fillRect(fx,fy,fw,fh);
//   c.restore();
//   c.globalAlpha = 1;
//   c.globalCompositeOperation = 'destination-over';
//   c.drawImage(ocanvas,0,0,fw,fh,fx,fy,fw,fh);
//   c.globalCompositeOperation = 'source-over';
//   return 1;
// };
// Oproto.DrawBlock = function(c,x,y,w,h,colour) {
//   var r = min(this.radius, h/2, w/2);
//   c.fillStyle = colour;
//   RRect(c, x, y, w, h, r);
// };
// Oproto.DrawSimple = function(c, tag, x1, y1, ga, useGa) {
//   var t = this.tc;
//   c.setTransform(1,0,0,1,0,0);
//   c.strokeStyle = this.colour;
//   c.lineWidth = t.outlineThickness;
//   c.shadowBlur = c.shadowOffsetX = c.shadowOffsetY = 0;
//   c.globalAlpha = useGa ? ga : 1;
//   return this.drawFunc(c,this.x,this.y,this.w,this.h,this.colour,tag,x1,y1);
// };
// Oproto.DrawPulsate = function(c, tag, x1, y1) {
//   var diff = TimeNow() - this.ts, t = this.tc,
//     ga = t.pulsateTo + ((1 - t.pulsateTo) * 
//     (0.5 + (cos(2 * Math.PI * diff / (1000 * t.pulsateTime)) / 2)));
//   this.pulse = ga = TagCanvas.Smooth(1,ga);
//   return this.DrawSimple(c, tag, x1, y1, ga, 1);
// };
// Oproto.Active = function(c,x,y) {
//   var a = (x >= this.x && y >= this.y &&
//     x <= this.x + this.w && y <= this.y + this.h);
//   if(a) {
//     this.ts = this.ts || TimeNow();
//   } else {
//     this.ts = null;
//   }
//   return a;
// };
// Oproto.PreDraw = Oproto.PostDraw = Oproto.LastDraw = Nop;
// /**
//  * @constructor
//  */
// function Tag(tc, text, a, v, w, h, col, bcol, bradius, boutline, bothickness,
//   font, padding, original) {
//   this.tc = tc;
//   this.image = null;
//   this.text = text;
//   this.text_original = original;
//   this.line_widths = [];
//   this.title = a.title || null;
//   this.a = a;
//   this.position = new Vector(v[0], v[1], v[2]);
//   this.x = this.y = this.z = 0;
//   this.w = w;
//   this.h = h;
//   this.colour = col || tc.textColour;
//   this.bgColour = bcol || tc.bgColour;
//   this.bgRadius = bradius | 0;
//   this.bgOutline = boutline || this.colour;
//   this.bgOutlineThickness = bothickness | 0;
//   this.textFont = font || tc.textFont;
//   this.padding = padding | 0;
//   this.sc = this.alpha = 1;
//   this.weighted = !tc.weight;
//   this.outline = new Outline(tc,this);
// }
// Tproto = Tag.prototype;
// Tproto.Init = function(e) {
//   var tc = this.tc;
//   this.textHeight = tc.textHeight;
//   if(this.HasText()) {
//     this.Measure(tc.ctxt,tc);
//   } else {
//     this.w = this.iw;
//     this.h = this.ih;
//   }

//   this.SetShadowColour = tc.shadowAlpha ? this.SetShadowColourAlpha : this.SetShadowColourFixed;
//   this.SetDraw(tc);
// };
// Tproto.Draw = Nop;
// Tproto.HasText = function() {
//   return this.text && this.text[0].length > 0;
// };
// Tproto.EqualTo = function(e) {
//   var i = e.getElementsByTagName('img');
//   if(this.a.href != e.href)
//     return 0;
//   if(i.length)
//     return this.image.src == i[0].src;
//   return (e.innerText || e.textContent) == this.text_original;
// };
// Tproto.SetImage = function(i) {
//   this.image = this.fimage = i;
// };
// Tproto.SetDraw = function(t) {
//   this.Draw = this.fimage ? (t.ie > 7 ? this.DrawImageIE : this.DrawImage) : this.DrawText;
//   t.noSelect && (this.CheckActive = Nop);
// };
// Tproto.MeasureText = function(c) {
//   var i, l = this.text.length, w = 0, wl;
//   for(i = 0; i < l; ++i) {
//     this.line_widths[i] = wl = c.measureText(this.text[i]).width;
//     w = max(w, wl);
//   }
//   return w;
// };
// Tproto.Measure = function(c,t) {
//   var extents = FindTextBoundingBox(this.text, this.textFont, this.textHeight),
//     s, th, f, soff, cw, twidth, theight, img, tcv;
//   // add the gap at the top to the height to make equal gap at bottom
//   theight = extents ? extents.max.y + extents.min.y : this.textHeight;
//   c.font = this.font = this.textHeight + 'px ' + this.textFont;
//   twidth = this.MeasureText(c);
//   if(t.txtOpt) {
//     s = t.txtScale;
//     th = s * this.textHeight;
//     f = th + 'px ' + this.textFont;
//     soff = [s * t.shadowOffset[0], s * t.shadowOffset[1]];
//     c.font = f;
//     cw = this.MeasureText(c);
//     tcv = new TextCanvas(this.text, f, cw + s, (s * theight) + s, cw,
//       this.line_widths, t.textAlign, t.textVAlign, s);

//     if(this.image)
//       tcv.SetImage(this.image, this.iw, this.ih, t.imagePosition, t.imagePadding,
//         t.imageAlign, t.imageVAlign, t.imageScale);

//     img = tcv.Create(this.colour, this.bgColour, this.bgOutline,
//       s * this.bgOutlineThickness, t.shadow, s * t.shadowBlur, soff,
//       s * this.padding, s * this.bgRadius);

//     // add outline image using highlight colour
//     if(t.outlineMethod == 'colour') {
//       this.oimage = tcv.Create(this.outline.colour, this.bgColour, this.outline.colour,
//         s * this.bgOutlineThickness, t.shadow, s * t.shadowBlur, soff,
//         s * this.padding, s * this.bgRadius);

//     } else if(t.outlineMethod == 'size') {
//       extents = FindTextBoundingBox(this.text, this.textFont,
//         this.textHeight + t.outlineIncrease);
//       th = extents.max.y + extents.min.y;
//       f = (s * (this.textHeight + t.outlineIncrease)) + 'px ' + this.textFont;
//       c.font = f;
//       cw = this.MeasureText(c);

//       tcv = new TextCanvas(this.text, f, cw + s, (s * th) + s, cw,
//         this.line_widths, t.textAlign, t.textVAlign, s);
//       if(this.image)
//         tcv.SetImage(this.image, this.iw + t.outlineIncrease,
//           this.ih + t.outlineIncrease, t.imagePosition, t.imagePadding,
//           t.imageAlign, t.imageVAlign, t.imageScale);
          
//       this.oimage = tcv.Create(this.colour, this.bgColour, this.bgOutline,
//         s * this.bgOutlineThickness, t.shadow, s * t.shadowBlur, soff,
//         s * this.padding, s * this.bgRadius);

//       this.oscale = this.oimage.width / img.width;
//       if(t.outlineIncrease > 0)
//         img = ExpandImage(img, this.oimage.width, this.oimage.height);
//       else
//         this.oimage = ExpandImage(this.oimage, img.width, img.height);
//     }
//     if(img) {
//       this.fimage = img;
//       twidth = this.fimage.width / s;
//       theight = this.fimage.height / s;
//     }
//     this.SetDraw(t);
//     t.txtOpt = !!this.fimage;
//   }
//   this.h = theight;
//   this.w = twidth;
// };
// Tproto.SetFont = function(f, c, bc, boc) {
//   this.textFont = f;
//   this.colour = c;
//   this.bgColour = bc;
//   this.bgOutline = boc;
//   this.Measure(this.tc.ctxt, this.tc);
// };
// Tproto.SetWeight = function(w) {
//   var tc = this.tc, modes = tc.weightMode.split(/[, ]/), m, s, wl = w.length;
//   if(!this.HasText())
//     return;
//   this.weighted = true;
//   for(s = 0; s < wl; ++s) {
//     m = modes[s] || 'size';
//     if('both' == m) {
//       this.Weight(w[s], tc.ctxt, tc, 'size', tc.min_weight[s], 
//         tc.max_weight[s], s);
//       this.Weight(w[s], tc.ctxt, tc, 'colour', tc.min_weight[s],
//         tc.max_weight[s], s);
//     } else {
//       this.Weight(w[s], tc.ctxt, tc, m, tc.min_weight[s], tc.max_weight[s], s);
//     }
//   }
//   this.Measure(tc.ctxt, tc);
// };
// Tproto.Weight = function(w, c, t, m, wmin, wmax, wnum) {
//   w = isNaN(w) ? 1 : w;
//   var nweight = (w - wmin) / (wmax - wmin);
//   if('colour' == m)
//     this.colour = FindGradientColour(t, nweight, wnum);
//   else if('bgcolour' == m)
//     this.bgColour = FindGradientColour(t, nweight, wnum);
//   else if('bgoutline' == m)
//     this.bgOutline = FindGradientColour(t, nweight, wnum);
//   else if('outline' == m)
//     this.outline.colour = FindGradientColour(t, nweight, wnum);
//   else if('size' == m) {
//     if(t.weightSizeMin > 0 && t.weightSizeMax > t.weightSizeMin) {
//       this.textHeight = t.weightSize * 
//         (t.weightSizeMin + (t.weightSizeMax - t.weightSizeMin) * nweight);
//     } else {
//       // min textHeight of 1
//       this.textHeight = max(1, w * t.weightSize);
//     }
//   }
// };
// Tproto.SetShadowColourFixed = function(c,s,a) {
//   c.shadowColor = s;
// };
// Tproto.SetShadowColourAlpha = function(c,s,a) {
//   c.shadowColor = SetAlpha(s, a);
// };
// Tproto.DrawText = function(c,xoff,yoff) {
//   var t = this.tc, x = this.x, y = this.y, s = this.sc, i, xl;
//   c.globalAlpha = this.alpha;
//   c.fillStyle = this.colour;
//   t.shadow && this.SetShadowColour(c,t.shadow,this.alpha);
//   c.font = this.font;
//   x += xoff / s;
//   y += (yoff / s) - (this.h / 2);
//   for(i = 0; i < this.text.length; ++i) {
//     xl = x;
//     if('right' == t.textAlign) {
//       xl += this.w / 2 - this.line_widths[i];
//     } else if('centre' == t.textAlign) {
//       xl -= this.line_widths[i] / 2;
//     } else {
//       xl -= this.w / 2;
//     }
//     c.setTransform(s, 0, 0, s, s * xl, s * y);
//     c.fillText(this.text[i], 0, 0);
//     y += this.textHeight;
//   }
// };
// Tproto.DrawImage = function(c,xoff,yoff,im) {
//   var x = this.x, y = this.y, s = this.sc,
//     i = im || this.fimage, w = this.w, h = this.h, a = this.alpha,
//     shadow = this.shadow;
//   c.globalAlpha = a;
//   shadow && this.SetShadowColour(c,shadow,a);
//   x += (xoff / s) - (w / 2);
//   y += (yoff / s) - (h / 2);
//   c.setTransform(s, 0, 0, s, s * x, s * y);
//   c.drawImage(i, 0, 0, w, h);
// };
// Tproto.DrawImageIE = function(c,xoff,yoff) {
//   var i = this.fimage, s = this.sc,
//     w = i.width = this.w*s, h = i.height = this.h * s,
//     x = (this.x*s) + xoff - (w/2), y = (this.y*s) + yoff - (h/2);
//   c.setTransform(1,0,0,1,0,0);
//   c.globalAlpha = this.alpha;
//   c.drawImage(i, x, y);
// };
// Tproto.Calc = function(m,a) {
//   var pp, t = this.tc, mnb = t.minBrightness,
//     mxb = t.maxBrightness, r = t.max_radius;
//   pp = m.xform(this.position);
//   this.xformed = pp;
//   pp = Project(t, pp, t.stretchX, t.stretchY);
//   this.x = pp.x;
//   this.y = pp.y;
//   this.z = pp.z;
//   this.sc = pp.w;
//   this.alpha = a * Clamp(mnb + (mxb - mnb) * (r - this.z) / (2 * r), 0, 1);
//   return this.xformed;
// };
// Tproto.UpdateActive = function(c, xoff, yoff) {
//   var o = this.outline, w = this.w, h = this.h,
//     x = this.x - w/2, y = this.y - h/2;
//   o.Update(x, y, w, h, this.sc, this.z, xoff, yoff);
//   return o;
// };
// Tproto.CheckActive = function(c,xoff,yoff) {
//   var t = this.tc, o = this.UpdateActive(c, xoff, yoff);
//   return o.Active(c, t.mx, t.my) ? o : null;
// };
// Tproto.Clicked = function(e) {
//   var a = this.a, t = a.target, h = a.href, evt;
//   if(t != '' && t != '_self') {
//     if(self.frames[t]) {
//       self.frames[t].document.location = h;
//     } else{
//       try {
//         if(top.frames[t]) {
//           top.frames[t].document.location = h;
//           return;
//         }
//       } catch(err) {
//         // different domain/port/protocol?
//       }
//       window.open(h, t);
//     }
//     return;
//   }
//   if(doc.createEvent) {
//     evt = doc.createEvent('MouseEvents');
//     evt.initMouseEvent('click', 1, 1, window, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null);
//     if(!a.dispatchEvent(evt))
//       return;
//   } else if(a.fireEvent) {
//     if(!a.fireEvent('onclick'))
//       return;
//   }
//   doc.location = h;
// };
// /**
//  * @constructor
//  */
// function TagCanvas(cid,lctr,opt) {
//   var i, p, c = doc.getElementById(cid), cp = ['id','class','innerHTML'], raf;

//   if(!c) throw 0;
//   if(Defined(window.G_vmlCanvasManager)) {
//     c = window.G_vmlCanvasManager.initElement(c);
//     this.ie = parseFloat(navigator.appVersion.split('MSIE')[1]);
//   }
//   if(c && (!c.getContext || !c.getContext('2d').fillText)) {
//     p = doc.createElement('DIV');
//     for(i = 0; i < cp.length; ++i)
//       p[cp[i]] = c[cp[i]];
//     c.parentNode.insertBefore(p,c);
//     c.parentNode.removeChild(c);
//     throw 0;
//   }
//   for(i in TagCanvas.options)
//     this[i] = opt && Defined(opt[i]) ? opt[i] : 
//       (Defined(TagCanvas[i]) ? TagCanvas[i] : TagCanvas.options[i]);

//   this.canvas = c;
//   this.ctxt = c.getContext('2d');
//   this.z1 = 250 / max(this.depth, 0.001);
//   this.z2 = this.z1 / this.zoom;
//   this.radius = min(c.height, c.width) * 0.0075; // fits radius of 100 in canvas
//   this.max_radius = 100;
//   this.max_weight = [];
//   this.min_weight = [];
//   this.textFont = this.textFont && FixFont(this.textFont);
//   this.textHeight *= 1;
//   this.imageRadius = this.imageRadius.toString();
//   this.pulsateTo = Clamp(this.pulsateTo, 0, 1);
//   this.minBrightness = Clamp(this.minBrightness, 0, 1);
//   this.maxBrightness = Clamp(this.maxBrightness, this.minBrightness, 1);
//   this.ctxt.textBaseline = 'top';
//   this.lx = (this.lock + '').indexOf('x') + 1;
//   this.ly = (this.lock + '').indexOf('y') + 1;
//   this.frozen = this.dx = this.dy = this.fixedAnim = this.touchState = 0;
//   this.fixedAlpha = 1;
//   this.source = lctr || cid;
//   this.repeatTags = min(64, ~~this.repeatTags);
//   this.minTags = min(200, ~~this.minTags);
//   if(~~this.scrollPause > 0)
//     TagCanvas.scrollPause = ~~this.scrollPause;
//   else
//     this.scrollPause = 0;
//   if(this.minTags > 0 && this.repeatTags < 1 && (i = this.GetTags().length))
//     this.repeatTags = ceil(this.minTags / i) - 1;
//   this.transform = Matrix.Identity();
//   this.startTime = this.time = TimeNow();
//   this.mx = this.my = -1;
//   this.centreImage && CentreImage(this);
//   this.Animate = this.dragControl ? this.AnimateDrag : this.AnimatePosition;
//   this.animTiming = (typeof TagCanvas[this.animTiming] == 'function' ?
//     TagCanvas[this.animTiming] : TagCanvas.Smooth);
//   if(this.shadowBlur || this.shadowOffset[0] || this.shadowOffset[1]) {
//     // let the browser translate "red" into "#ff0000"
//     this.ctxt.shadowColor = this.shadow;
//     this.shadow = this.ctxt.shadowColor;
//     this.shadowAlpha = ShadowAlphaBroken();
//   } else {
//     delete this.shadow;
//   }
//   this.Load();
//   if(lctr && this.hideTags) {
//     (function(t) {
//     if(TagCanvas.loaded)
//       t.HideTags();
//     else
//       AddHandler('load', function() { t.HideTags(); }, window);
//     })(this);
//   }

//   this.yaw = this.initial ? this.initial[0] * this.maxSpeed : 0;
//   this.pitch = this.initial ? this.initial[1] * this.maxSpeed : 0;
//   if(this.tooltip) {
//     this.ctitle = c.title;
//     c.title = '';
//     if(this.tooltip == 'native') {
//       this.Tooltip = this.TooltipNative;
//     } else {
//       this.Tooltip = this.TooltipDiv;
//       if(!this.ttdiv) {
//         this.ttdiv = doc.createElement('div');
//         this.ttdiv.className = this.tooltipClass;
//         this.ttdiv.style.position = 'absolute';
//         this.ttdiv.style.zIndex = c.style.zIndex + 1;
//         AddHandler('mouseover',function(e){e.target.style.display='none';},this.ttdiv);
//         doc.body.appendChild(this.ttdiv);
//       }
//     }
//   } else {
//     this.Tooltip = this.TooltipNone;
//   }
//   if(!this.noMouse && !handlers[cid]) {
//     handlers[cid] = [
//       ['mousemove', MouseMove],
//       ['mouseout', MouseOut],
//       ['mouseup', MouseUp],
//       ['touchstart', TouchDown],
//       ['touchend', TouchUp],
//       ['touchcancel', TouchUp],
//       ['touchmove', TouchMove]
//     ];
//     if(this.dragControl) {
//       handlers[cid].push(['mousedown', MouseDown]);
//       handlers[cid].push(['selectstart', Nop]);
//     }
//     if(this.wheelZoom) {
//       handlers[cid].push(['mousewheel', MouseWheel]);
//       handlers[cid].push(['DOMMouseScroll', MouseWheel]);
//     }
//     if(this.scrollPause) {
//       handlers[cid].push(['scroll', Scroll, window]);
//     }
//     for(i = 0; i < handlers[cid].length; ++i) {
//       p = handlers[cid][i];
//       AddHandler(p[0], p[1], p[2] ? p[2] : c);
//     }
//   }
//   if(!TagCanvas.started) {
//     raf = window.requestAnimationFrame = window.requestAnimationFrame ||
//       window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
//       window.msRequestAnimationFrame;
//     TagCanvas.NextFrame = raf ? TagCanvas.NextFrameRAF :
//       TagCanvas.NextFrameTimeout;
//     TagCanvas.interval = this.interval;
//     TagCanvas.NextFrame(this.interval);
//     TagCanvas.started = 1;
//   }
// }
// TCproto = TagCanvas.prototype;
// TCproto.SourceElements = function() {
//   if(doc.querySelectorAll)
//     return doc.querySelectorAll('#' + this.source);
//   return [doc.getElementById(this.source)];
// };
// TCproto.HideTags = function() {
//   var el = this.SourceElements(), i;
//   for(i = 0; i < el.length; ++i)
//     el[i].style.display = 'none';
// };
// TCproto.GetTags = function() {
//   var el = this.SourceElements(), etl, tl = [], i, j, k;
//   for(k = 0; k <= this.repeatTags; ++k) {
//     for(i = 0; i < el.length; ++i) {
//       etl = el[i].getElementsByTagName('a');
//       for(j = 0; j < etl.length; ++j) {
//         tl.push(etl[j]);
//       }
//     }
//   }
//   return tl;
// };
// TCproto.Message = function(text) {
//   var tl = [], i, p, tc = text.split(''), a, t, x, z;
//   for(i = 0; i < tc.length; ++i) {
//     if(tc[i] != ' ') {
//       p = i - tc.length / 2;
//       a = doc.createElement('A');
//       a.href = '#';
//       a.innerText = tc[i];
//       x = 100 * sin(p / 9);
//       z = -100 * cos(p / 9);
//       t = new Tag(this, tc[i], a, [x,0,z], 2, 18, '#000', '#fff', 0, 0, 0,
//         'monospace', 2, tc[i]);
//       t.Init();
//       tl.push(t);
//     }
//   }
//   return tl;
// };
// TCproto.CreateTag = function(e) {
//   var im, i, t, txt, ts, font, bc, boc, p = [0, 0, 0];
//   if('text' != this.imageMode) {
//     im = e.getElementsByTagName('img');
//     if(im.length) {
//       i = new Image;
//       i.src = im[0].src;

//       if(!this.imageMode) {
//         t = new Tag(this, "", e, p, 0, 0);
//         t.SetImage(i);
//         //t.Init();
//         AddImage(i, im[0], t, this);
//         return t;
//       }
//     }
//   }
//   if('image' != this.imageMode) {
//     ts = new TextSplitter(e);
//     txt = ts.Lines();
//     if(!ts.Empty()) {
//       font = this.textFont || FixFont(GetProperty(e,'font-family'));
//       if(this.splitWidth)
//         txt = ts.SplitWidth(this.splitWidth, this.ctxt, font, this.textHeight);

//       bc = this.bgColour == 'tag' ? GetProperty(e, 'background-color') :
//         this.bgColour;
//       boc = this.bgOutline == 'tag' ? GetProperty(e, 'color') : this.bgOutline;
//     } else {
//       ts = null;
//     }
//   }
//   if(ts || i) {
//     t = new Tag(this, txt, e, p, 2, this.textHeight + 2,
//       this.textColour || GetProperty(e,'color'), bc, this.bgRadius,
//       boc, this.bgOutlineThickness, font, this.padding, ts && ts.original);
//     if(i) {
//       t.SetImage(i);
//       AddImage(i, im[0], t, this);
//     } else {
//       t.Init();
//     }
//     return t;
//   }
// };
// TCproto.UpdateTag = function(t, a) {
//   var colour = this.textColour || GetProperty(a, 'color'),
//     font = this.textFont || FixFont(GetProperty(a, 'font-family')),
//     bc = this.bgColour == 'tag' ? GetProperty(a, 'background-color') :
//       this.bgColour, boc = this.bgOutline == 'tag' ? GetProperty(a, 'color') :
//       this.bgOutline;
//   t.a = a;
//   t.title = a.title;
//   if(t.colour != colour || t.textFont != font || t.bgColour != bc ||
//     t.bgOutline != boc)
//     t.SetFont(font, colour, bc, boc);
// };
// TCproto.Weight = function(tl) {
//   var ll = tl.length, w, i, s, weights = [], valid,
//     wfrom = this.weightFrom ? this.weightFrom.split(/[, ]/) : [null],
//     wl = wfrom.length;
//   for(i = 0; i < ll; ++i) {
//     weights[i] = [];
//     for(s = 0; s < wl; ++s) {
//       w = FindWeight(tl[i].a, wfrom[s], this.textHeight);
//       if(!this.max_weight[s] || w > this.max_weight[s])
//         this.max_weight[s] = w;
//       if(!this.min_weight[s] || w < this.min_weight[s])
//         this.min_weight[s] = w;
//       weights[i][s] = w;
//     }
//   }
//   for(s = 0; s < wl; ++s) {
//     if(this.max_weight[s] > this.min_weight[s])
//       valid = 1;
//   }
//   if(valid) {
//     for(i = 0; i < ll; ++i) {
//       tl[i].SetWeight(weights[i]);
//     }
//   }
// };
// TCproto.Load = function() {
//   var tl = this.GetTags(), taglist = [], shape, t,
//     shapeArgs, rx, ry, rz, vl, i, tagmap = [], pfuncs = {
//       sphere: PointsOnSphere,
//       vcylinder: PointsOnCylinderV,
//       hcylinder: PointsOnCylinderH,
//       vring: PointsOnRingV,
//       hring: PointsOnRingH
//     };

//   if(tl.length) {
//     tagmap.length = tl.length;
//     for(i = 0; i < tl.length; ++i)
//       tagmap[i] = i;
//     this.shuffleTags && Shuffle(tagmap);
//     rx = 100 * this.radiusX;
//     ry = 100 * this.radiusY;
//     rz = 100 * this.radiusZ;
//     this.max_radius = max(rx, max(ry, rz));

//     for(i = 0; i < tl.length; ++i) {
//       t = this.CreateTag(tl[tagmap[i]]);
//       if(t)
//         taglist.push(t);
//     }
//     this.weight && this.Weight(taglist, true);
  
//     if(this.shapeArgs) {
//       this.shapeArgs[0] = taglist.length;
//     } else {
//       shapeArgs = this.shape.toString().split(/[(),]/);
//       shape = shapeArgs.shift();
//       if(typeof window[shape] === 'function')
//         this.shape = window[shape];
//       else
//         this.shape = pfuncs[shape] || pfuncs.sphere;
//       this.shapeArgs = [taglist.length, rx, ry, rz].concat(shapeArgs);
//     }
//     vl = this.shape.apply(this, this.shapeArgs);
//     this.listLength = taglist.length;
//     for(i = 0; i < taglist.length; ++i)
//       taglist[i].position = new Vector(vl[i][0], vl[i][1], vl[i][2]);
//   }
//   if(this.noTagsMessage && !taglist.length) {
//     i = (this.imageMode && this.imageMode != 'both' ? this.imageMode + ' ': '');
//     taglist = this.Message('No ' + i + 'tags');
//   }
//   this.taglist = taglist;
// };
// TCproto.Update = function() {
//   var tl = this.GetTags(), newlist = [],
//     taglist = this.taglist, found,
//     added = [], removed = [], vl, ol, nl, i, j;

//   if(!this.shapeArgs)
//     return this.Load();

//   if(tl.length) {
//     nl = this.listLength = tl.length;
//     ol = taglist.length;

//     // copy existing list, populate "removed"
//     for(i = 0; i < ol; ++i) {
//       newlist.push(taglist[i]);
//       removed.push(i);
//     }

//     // find added and removed tags
//     for(i = 0; i < nl; ++i) {
//       for(j = 0, found = 0; j < ol; ++j) {
//         if(taglist[j].EqualTo(tl[i])) {
//           this.UpdateTag(newlist[j], tl[i]);
//           found = removed[j] = -1;
//         }
//       }
//       if(!found)
//         added.push(i);
//     }

//     // clean out found tags from removed list
//     for(i = 0, j = 0; i < ol; ++i) {
//       if(removed[j] == -1)
//         removed.splice(j,1);
//       else
//         ++j;
//     }

//     // insert new tags in gaps where old tags removed
//     if(removed.length) {
//       Shuffle(removed);
//       while(removed.length && added.length) {
//         i = removed.shift();
//         j = added.shift();
//         newlist[i] = this.CreateTag(tl[j]);
//       }

//       // remove any more (in reverse order)
//       removed.sort(function(a,b) {return a-b});
//       while(removed.length) {
//         newlist.splice(removed.pop(), 1);
//       }
//     }

//     // add any extra tags
//     j = newlist.length / (added.length + 1);
//     i = 0;
//     while(added.length) {
//       newlist.splice(ceil(++i * j), 0, this.CreateTag(tl[added.shift()]));
//     }

//     // assign correct positions to tags
//     this.shapeArgs[0] = nl = newlist.length;
//     vl = this.shape.apply(this, this.shapeArgs);
//     for(i = 0; i < nl; ++i)
//       newlist[i].position = new Vector(vl[i][0], vl[i][1], vl[i][2]);

//     // reweight tags
//     this.weight && this.Weight(newlist);
//   }
//   this.taglist = newlist;
// };
// TCproto.SetShadow = function(c) {
//   c.shadowBlur = this.shadowBlur;
//   c.shadowOffsetX = this.shadowOffset[0];
//   c.shadowOffsetY = this.shadowOffset[1];
// };
// TCproto.Draw = function(t) {
//   if(this.paused)
//     return;
//   var cv = this.canvas, cw = cv.width, ch = cv.height, max_sc = 0,
//     tdelta = (t - this.time) * TagCanvas.interval / 1000,
//     x = cw / 2 + this.offsetX, y = ch / 2 + this.offsetY, c = this.ctxt,
//     active, a, i, aindex = -1, tl = this.taglist, l = tl.length,
//     frontsel = this.frontSelect, centreDrawn = (this.centreFunc == Nop), fixed;
//   this.time = t;
//   if(this.frozen && this.drawn)
//     return this.Animate(cw,ch,tdelta);
//   fixed = this.AnimateFixed();
//   c.setTransform(1,0,0,1,0,0);
//   for(i = 0; i < l; ++i)
//     tl[i].Calc(this.transform, this.fixedAlpha);
//   tl = SortList(tl, function(a,b) {return b.z-a.z});
  
//   if(fixed && this.fixedAnim.active) {
//     active = this.fixedAnim.tag.UpdateActive(c, x, y);
//   } else {
//     this.active = null;
//     for(i = 0; i < l; ++i) {
//       a = this.mx >= 0 && this.my >= 0 && this.taglist[i].CheckActive(c, x, y);
//       if(a && a.sc > max_sc && (!frontsel || a.z <= 0)) {
//         active = a;
//         aindex = i;
//         active.tag = this.taglist[i];
//         max_sc = a.sc;
//       }
//     }
//     this.active = active;
//   }

//   this.txtOpt || (this.shadow && this.SetShadow(c));
//   c.clearRect(0,0,cw,ch);
//   for(i = 0; i < l; ++i) {
//     if(!centreDrawn && tl[i].z <= 0) {
//       // run the centreFunc if the next tag is at the front
//       try { this.centreFunc(c, cw, ch, x, y); }
//       catch(e) {
//         alert(e);
//         // don't run it again
//         this.centreFunc = Nop;
//       }
//       centreDrawn = true;
//     }

//     if(!(active && active.tag == tl[i] && active.PreDraw(c, tl[i], x, y)))
//       tl[i].Draw(c, x, y);
//     active && active.tag == tl[i] && active.PostDraw(c);
//   }
//   if(this.freezeActive && active) {
//     this.Freeze();
//   } else {
//     this.UnFreeze();
//     this.drawn = (l == this.listLength);
//   }
//   if(this.fixedCallback) {
//     this.fixedCallback(this,this.fixedCallbackTag);
//     this.fixedCallback = null;
//   }
//   fixed || this.Animate(cw, ch, tdelta);
//   active && active.LastDraw(c);
//   cv.style.cursor = active ? this.activeCursor : '';
//   this.Tooltip(active,this.taglist[aindex]);
// };
// TCproto.TooltipNone = function() { };
// TCproto.TooltipNative = function(active,tag) {
//   if(active)
//     this.canvas.title = tag && tag.title ? tag.title : '';
//   else
//     this.canvas.title = this.ctitle;
// };
// TCproto.SetTTDiv = function(title, tag) {
//   var tc = this, s = tc.ttdiv.style;
//   if(title != tc.ttdiv.innerHTML)
//     s.display = 'none';
//   tc.ttdiv.innerHTML = title;
//   tag && (tag.title = tc.ttdiv.innerHTML);
//   if(s.display == 'none' && ! tc.tttimer) {
//     tc.tttimer = setTimeout(function() {
//       var p = AbsPos(tc.canvas.id);
//       s.display = 'block';
//       s.left = p.x + tc.mx + 'px';
//       s.top = p.y + tc.my + 24 + 'px';
//       tc.tttimer = null;
//     }, tc.tooltipDelay);
//   }
// };
// TCproto.TooltipDiv = function(active,tag) {
//   if(active && tag && tag.title) {
//     this.SetTTDiv(tag.title, tag);
//   } else if(!active && this.mx != -1 && this.my != -1 && this.ctitle.length) {
//     this.SetTTDiv(this.ctitle);
//   } else {
//     this.ttdiv.style.display = 'none';
//   }
// };
// TCproto.Transform = function(tc, p, y) {
//   if(p || y) {
//     var sp = sin(p), cp = cos(p), sy = sin(y), cy = cos(y),
//       ym = new Matrix([cy,0,sy, 0,1,0, -sy,0,cy]),
//       pm = new Matrix([1,0,0, 0,cp,-sp, 0,sp,cp]);
//     tc.transform = tc.transform.mul(ym.mul(pm));
//   }
// };
// TCproto.AnimateFixed = function() {
//   var fa, t1, angle, m, d;
//   if(this.fadeIn) {
//     t1 = TimeNow() - this.startTime;
//     if(t1 >= this.fadeIn) {
//       this.fadeIn = 0;
//       this.fixedAlpha = 1;
//     } else {
//       this.fixedAlpha = t1 / this.fadeIn;
//     }
//   }
//   if(this.fixedAnim) {
//     if(!this.fixedAnim.transform)
//       this.fixedAnim.transform = this.transform;
//     fa = this.fixedAnim, t1 = TimeNow() - fa.t0, angle = fa.angle,
//       m, d = this.animTiming(fa.t, t1);
//     this.transform = fa.transform;
//     if(t1 >= fa.t) {
//       this.fixedCallbackTag = fa.tag;
//       this.fixedCallback = fa.cb;
//       this.fixedAnim = this.yaw = this.pitch = 0;
//     } else {
//       angle *= d;
//     }
//     m = Matrix.Rotation(angle, fa.axis);
//     this.transform = this.transform.mul(m);
//     return (this.fixedAnim != 0);
//   }
//   return false;
// };
// TCproto.AnimatePosition = function(w, h, t) {
//   var tc = this, x = tc.mx, y = tc.my, s, r;
//   if(!tc.frozen && x >= 0 && y >= 0 && x < w && y < h) {
//     s = tc.maxSpeed, r = tc.reverse ? -1 : 1;
//     tc.lx || (tc.yaw = ((x * 2 * s / w) - s) * r * t);
//     tc.ly || (tc.pitch = ((y * 2 * s / h) - s) * -r * t);
//     tc.initial = null;
//   } else if(!tc.initial) {
//     if(tc.frozen && !tc.freezeDecel)
//       tc.yaw = tc.pitch = 0;
//     else
//       tc.Decel(tc);
//   }
//   this.Transform(tc, tc.pitch, tc.yaw);
// };
// TCproto.AnimateDrag = function(w, h, t) {
//   var tc = this, rs = 100 * t * tc.maxSpeed / tc.max_radius / tc.zoom;
//   if(tc.dx || tc.dy) {
//     tc.lx || (tc.yaw = tc.dx * rs / tc.stretchX);
//     tc.ly || (tc.pitch = tc.dy * -rs / tc.stretchY);
//     tc.dx = tc.dy = 0;
//     tc.initial = null;
//   } else if(!tc.initial) {
//     tc.Decel(tc);
//   }
//   this.Transform(tc, tc.pitch, tc.yaw);
// };
// TCproto.Freeze = function() {
//   if(!this.frozen) {
//     this.preFreeze = [this.yaw, this.pitch];
//     this.frozen = 1;
//     this.drawn = 0;
//   }
// };
// TCproto.UnFreeze = function() {
//   if(this.frozen) {
//     this.yaw = this.preFreeze[0];
//     this.pitch = this.preFreeze[1];
//     this.frozen = 0;
//   }
// };
// TCproto.Decel = function(tc) {
//   var s = tc.minSpeed, ay = abs(tc.yaw), ap = abs(tc.pitch);
//   if(!tc.lx && ay > s)
//     tc.yaw = ay > tc.z0 ? tc.yaw * tc.decel : 0;
//   if(!tc.ly && ap > s)
//     tc.pitch = ap > tc.z0 ? tc.pitch * tc.decel : 0;
// };
// TCproto.Zoom = function(r) {
//   this.z2 = this.z1 * (1/r);
//   this.drawn = 0;
// };
// TCproto.Clicked = function(e) {
//   var a = this.active;
//   try {
//     if(a && a.tag)
//       if(this.clickToFront === false || this.clickToFront === null)
//         a.tag.Clicked(e);
//       else
//         this.TagToFront(a.tag, this.clickToFront, function() {
//           a.tag.Clicked(e);
//         }, true);
//   } catch(ex) {
//   }
// };
// TCproto.Wheel = function(i) {
//   var z = this.zoom + this.zoomStep * (i ? 1 : -1);
//   this.zoom = min(this.zoomMax,max(this.zoomMin,z));
//   this.Zoom(this.zoom);
// };
// TCproto.BeginDrag = function(e) {
//   this.down = EventXY(e, this.canvas);
//   e.cancelBubble = true;
//   e.returnValue = false;
//   e.preventDefault && e.preventDefault();
// };
// TCproto.Drag = function(e, p) {
//   if(this.dragControl && this.down) {
//     var t2 = this.dragThreshold * this.dragThreshold,
//       dx = p.x - this.down.x, dy = p.y - this.down.y;
//     if(this.dragging || dx * dx + dy * dy > t2) {
//       this.dx = dx;
//       this.dy = dy;
//       this.dragging = 1;
//       this.down = p;
//     }
//   }
//   return this.dragging;
// };
// TCproto.EndDrag = function() {
//   var res = this.dragging;
//   this.dragging = this.down = null;
//   return res;
// };
// function PinchDistance(e) {
//   var t1 = e.targetTouches[0], t2 = e.targetTouches[1];
//   return sqrt(pow(t2.pageX - t1.pageX, 2) + pow(t2.pageY - t1.pageY, 2));
// }
// TCproto.BeginPinch = function(e) {
//   this.pinched = [PinchDistance(e), this.zoom];
//   e.preventDefault && e.preventDefault();
// };
// TCproto.Pinch = function(e) {
//   var z, d, p = this.pinched;
//   if(!p)
//     return;
//   d = PinchDistance(e);
//   z = p[1] * d / p[0];
//   this.zoom = min(this.zoomMax,max(this.zoomMin,z));
//   this.Zoom(this.zoom);
// };
// TCproto.EndPinch = function(e) {
//   this.pinched = null;
// };
// TCproto.Pause = function() { this.paused = true; };
// TCproto.Resume = function() { this.paused = false; };
// TCproto.SetSpeed = function(i) {
//   this.initial = i;
//   this.yaw = i[0] * this.maxSpeed;
//   this.pitch = i[1] * this.maxSpeed;
// };
// TCproto.FindTag = function(t) {
//   if(!Defined(t))
//     return null;
//   Defined(t.index) && (t = t.index);
//   if(!IsObject(t))
//     return this.taglist[t];
//   var srch, tgt, i;
//   if(Defined(t.id))
//     srch = 'id', tgt = t.id;
//   else if(Defined(t.text))
//     srch = 'innerText', tgt = t.text;

//   for(i = 0; i < this.taglist.length; ++i)
//     if(this.taglist[i].a[srch] == tgt)
//       return this.taglist[i];
// };
// TCproto.RotateTag = function(tag, lt, lg, time, callback, active) {
//   var t = tag.Calc(this.transform, 1), v1 = new Vector(t.x, t.y, t.z),
//     v2 = MakeVector(lg, lt), angle = v1.angle(v2), u = v1.cross(v2).unit();
//   if(angle == 0) {
//     this.fixedCallbackTag = tag;
//     this.fixedCallback = callback;
//   } else {
//     this.fixedAnim = {
//       angle: -angle,
//       axis: u,
//       t: time,
//       t0: TimeNow(),
//       cb: callback,
//       tag: tag,
//       active: active
//     };
//   }
// };
// TCproto.TagToFront = function(tag, time, callback, active) {
//   this.RotateTag(tag, 0, 0, time, callback, active);
// };
// TagCanvas.Start = function(id,l,o) {
//   TagCanvas.Delete(id);
//   TagCanvas.tc[id] = new TagCanvas(id,l,o);
// };
// function tccall(f,id) {
//   TagCanvas.tc[id] && TagCanvas.tc[id][f]();
// }
// TagCanvas.Linear = function(t, t0) { return t0 / t; }
// TagCanvas.Smooth = function(t, t0) { return 0.5 - cos(t0 * Math.PI / t) / 2; }
// TagCanvas.Pause = function(id) { tccall('Pause',id); };
// TagCanvas.Resume = function(id) { tccall('Resume',id); };
// TagCanvas.Reload = function(id) { tccall('Load',id); };
// TagCanvas.Update = function(id) { tccall('Update',id); };
// TagCanvas.SetSpeed = function(id, speed) {
//   if(IsObject(speed) && TagCanvas.tc[id] &&
//     !isNaN(speed[0]) && !isNaN(speed[1])) {
//     TagCanvas.tc[id].SetSpeed(speed);
//     return true;
//   }
//   return false;
// };
// TagCanvas.TagToFront = function(id, options) {
//   if(!IsObject(options))
//     return false;
//   options.lat = options.lng = 0;
//   return TagCanvas.RotateTag(id, options);
// };
// TagCanvas.RotateTag = function(id, options) {
//   if(IsObject(options) && TagCanvas.tc[id]) {
//     if(isNaN(options.time))
//       options.time = 500;
//     var tt = TagCanvas.tc[id].FindTag(options);
//     if(tt) {
//       TagCanvas.tc[id].RotateTag(tt, options.lat, options.lng,
//         options.time, options.callback, options.active);
//       return true;
//     }
//   }
//   return false;
// };
// TagCanvas.Delete = function(id) {
//   var i, c;
//   if(handlers[id]) {
//     c = doc.getElementById(id);
//     if(c) {
//       for(i = 0; i < handlers[id].length; ++i)
//         RemoveHandler(handlers[id][i][0], handlers[id][i][1], c);
//     }
//   }
//   delete handlers[id];
//   delete TagCanvas.tc[id];
// };
// TagCanvas.NextFrameRAF = function() {
//   requestAnimationFrame(DrawCanvasRAF);
// };
// TagCanvas.NextFrameTimeout = function(iv) {
//   setTimeout(DrawCanvas, iv);
// };
// TagCanvas.tc = {};
// TagCanvas.options = {
// z1: 20000,
// z2: 20000,
// z0: 0.0002,
// freezeActive: false,
// freezeDecel: false,
// activeCursor: 'pointer',
// pulsateTo: 1,
// pulsateTime: 3,
// reverse: false,
// depth: 0.5,
// maxSpeed: 0.05,
// minSpeed: 0,
// decel: 0.95,
// interval: 20,
// minBrightness: 0.1,
// maxBrightness: 1,
// outlineColour: '#ffff99',
// outlineThickness: 2,
// outlineOffset: 5,
// outlineMethod: 'outline',
// outlineRadius: 0,
// textColour: '#ff99ff',
// textHeight: 15,
// textFont: 'Helvetica, Arial, sans-serif',
// shadow: '#000',
// shadowBlur: 0,
// shadowOffset: [0,0],
// initial: null,
// hideTags: true,
// zoom: 1,
// weight: false,
// weightMode: 'size',
// weightFrom: null,
// weightSize: 1,
// weightSizeMin: null,
// weightSizeMax: null,
// weightGradient: {0:'#f00', 0.33:'#ff0', 0.66:'#0f0', 1:'#00f'},
// txtOpt: true,
// txtScale: 2,
// frontSelect: false,
// wheelZoom: true,
// zoomMin: 0.3,
// zoomMax: 3,
// zoomStep: 0.05,
// shape: 'sphere',
// lock: null,
// tooltip: null,
// tooltipDelay: 300,
// tooltipClass: 'tctooltip',
// radiusX: 1,
// radiusY: 1,
// radiusZ: 1,
// stretchX: 1,
// stretchY: 1,
// offsetX: 0,
// offsetY: 0,
// shuffleTags: false,
// noSelect: false,
// noMouse: false,
// imageScale: 1,
// paused: false,
// dragControl: false,
// dragThreshold: 4,
// centreFunc: Nop,
// splitWidth: 0,
// animTiming: 'Smooth',
// clickToFront: false,
// fadeIn: 0,
// padding: 0,
// bgColour: null,
// bgRadius: 0,
// bgOutline: null,
// bgOutlineThickness: 0,
// outlineIncrease: 4,
// textAlign: 'centre',
// textVAlign: 'middle',
// imageMode: null,
// imagePosition: null,
// imagePadding: 2,
// imageAlign: 'centre',
// imageVAlign: 'middle',
// noTagsMessage: true,
// centreImage: null,
// pinchZoom: false,
// repeatTags: 0,
// minTags: 0,
// imageRadius: 0,
// scrollPause: false,
// outlineDash: 0,
// outlineDashSpace: 0,
// outlineDashSpeed: 1
// };
// for(i in TagCanvas.options) TagCanvas[i] = TagCanvas.options[i];
// window.TagCanvas = TagCanvas;
// jQuery.fn.tagcanvas = function(options, lctr) {
//   var fn = {
//     pause: function() {
//       $(this).each(function() { tccall('Pause',$(this)[0].id); });
//     },
//     resume: function() {
//       $(this).each(function() { tccall('Resume',$(this)[0].id); });
//     },
//     reload: function() {
//       $(this).each(function() { tccall('Load',$(this)[0].id); });
//     },
//     update: function() {
//       $(this).each(function() { tccall('Update',$(this)[0].id); });
//     },
//     tagtofront: function() {
//       $(this).each(function() { TagCanvas.TagToFront($(this)[0].id, lctr); });
//     },
//     rotatetag: function() {
//       $(this).each(function() { TagCanvas.RotateTag($(this)[0].id, lctr); });
//     },
//     'delete': function() {
//       $(this).each(function() { TagCanvas.Delete($(this)[0].id); });
//     },
//     setspeed: function() {
//       $(this).each(function() { TagCanvas.SetSpeed($(this)[0].id, lctr); });
//     }
//   };
//   if(typeof options == 'string' && fn[options]) {
//     fn[options].apply(this);
//     return this;
//   } else {
//     TagCanvas.jquery = 1;
//     $(this).each(function() { TagCanvas.Start($(this)[0].id, lctr, options); });
//     return TagCanvas.started;
//   }
// };

// // set a flag for when the window has loaded
// AddHandler('load',function(){TagCanvas.loaded=1},window);
// })(jQuery);
// // !function(t){"use strict";var i,e,s,h,n,a,o,r,l,u,g=Math.abs,c=Math.sin,f=Math.cos,d=Math.max,m=Math.min,p=Math.ceil,w=Math.sqrt,x=Math.pow,v={},T={},y={0:"0,",1:"17,",2:"34,",3:"51,",4:"68,",5:"85,",6:"102,",7:"119,",8:"136,",9:"153,",a:"170,",A:"170,",b:"187,",B:"187,",c:"204,",C:"204,",d:"221,",D:"221,",e:"238,",E:"238,",f:"255,",F:"255,"},S=document,b={};for(i=0;i<256;++i)e=i.toString(16),i<16&&(e="0"+e),T[e]=T[e.toUpperCase()]=i.toString()+",";function C(t){return void 0!==t}function z(t){return"object"==typeof t&&null!=t}function D(t,i,e){return isNaN(t)?e:m(e,d(i,t))}function A(){return!1}function I(){return(new Date).valueOf()}function M(t){for(var i,e,s=t.length-1;s;)e=~~(Math.random()*s),i=t[s],t[s]=t[e],t[e]=i,--s}function F(t,i,e){this.x=t,this.y=i,this.z=e}function O(t){this[1]={1:t[0],2:t[1],3:t[2]},this[2]={1:t[3],2:t[4],3:t[5]},this[3]={1:t[6],2:t[7],3:t[8]}}function k(t,i,e,s,h){var n,a,o,r,l,u=[],g=2/t;for(l=Math.PI*(3-w(5)+(parseFloat(h)?parseFloat(h):0)),n=0;n<t;++n)o=w(1-(a=n*g-1+g/2)*a),r=n*l,u.push([f(r)*o*i,a*e,c(r)*o*s]);return u}function P(t,i,e,s,h,n){var a,o,r,l,u,g,d=[],m=2/t;for(o=Math.PI*(3-w(5)+(parseFloat(n)?parseFloat(n):0)),r=0;r<t;++r)l=r*m-1+m/2,u=f(a=r*o),g=c(a),d.push(i?[l*e,u*s,g*h]:[u*e,l*s,g*h]);return d}function E(t,i,e,s,h,n){var a,o,r,l,u=[],g=2*Math.PI/i;for(o=0;o<i;++o)r=f(a=o*g),l=c(a),u.push(t?[n*e,r*s,l*h]:[r*e,n*s,l*h]);return u}function R(t,i,e,s,h){return P(t,0,i,e,s,h)}function B(t,i,e,s,h){return P(t,1,i,e,s,h)}function N(t,i,e,s,h){return E(0,t,i,e,s,h=isNaN(h)?0:1*h)}function _(t,i,e,s,h){return E(1,t,i,e,s,h=isNaN(h)?0:1*h)}function L(t,i){if(window.G_vmlCanvasManager)return null;var e=S.createElement("canvas");return e.width=t,e.height=i,e}function H(t,i,e,s){var h,n=t.createLinearGradient(0,0,i,0);for(h in s)n.addColorStop(1-h,s[h]);t.fillStyle=n,t.fillRect(0,e,i,1)}function W(t,i,e){var s,h,n,a,o=1024,r=1,l=t.weightGradient;if(t.gCanvas)h=t.gCanvas.getContext("2d"),r=t.gCanvas.height;else{if(z(l[0])?r=l.length:l=[l],t.gCanvas=s=L(o,r),!s)return null;for(h=s.getContext("2d"),n=0;n<r;++n)H(h,o,n,l[n])}return e=d(m(e||0,r-1),0),"rgba("+(a=h.getImageData(~~((o-1)*i),e,1,1).data)[0]+","+a[1]+","+a[2]+","+a[3]/255+")"}function X(t,i,e,s,h,n,a,o,r,l,u,c){var f,d,m=h+(o||0)+(r.length&&r[0]<0?g(r[0]):0),p=n+(o||0)+(r.length&&r[1]<0?g(r[1]):0);for(t.font=i,t.textBaseline="top",t.fillStyle=e,a&&(t.shadowColor=a),o&&(t.shadowBlur=o),r.length&&(t.shadowOffsetX=r[0],t.shadowOffsetY=r[1]),f=0;f<s.length;++f)d=0,u&&("right"==c?d=l-u[f]:"centre"==c&&(d=(l-u[f])/2)),t.fillText(s[f],m+d,p),p+=parseInt(i)}function Y(t,i,e,s,h,n,a){n?(t.beginPath(),t.moveTo(i,e+h-n),t.arcTo(i,e,i+n,e,n),t.arcTo(i+s,e,i+s,e+n,n),t.arcTo(i+s,e+h,i+s-n,e+h,n),t.arcTo(i,e+h,i,e+h-n,n),t.closePath(),t[a?"stroke":"fill"]()):t[a?"strokeRect":"fillRect"](i,e,s,h)}function U(t,i,e,s,h,n,a,o,r){this.strings=t,this.font=i,this.width=e,this.height=s,this.maxWidth=h,this.stringWidths=n,this.align=a,this.valign=o,this.scale=r}function V(t,i,e){var s=L(i,e);return s?(s.getContext("2d").drawImage(t,(i-t.width)/2,(e-t.height)/2),s):null}function q(t,i,e){var s=L(i,e);return s?(s.getContext("2d").drawImage(t,0,0,i,e),s):null}function G(t,i,e,s,h,n,a,o,r,l){var u,g,c,f,d,p,w,x,v=i+(2*o+n)*s,T=e+(2*o+n)*s,y=L(v,T);return y?(r*=s,f=v-(n*=s),d=T-n,o=o*s+(g=c=n/2),u=y.getContext("2d"),x=m(r,f/2,d/2),h&&(u.fillStyle=h,Y(u,g,c,f,d,x)),n&&(u.strokeStyle=a,u.lineWidth=n,Y(u,g,c,f,d,x,!0)),l?((w=(p=L(v,T)).getContext("2d")).drawImage(t,o,o,i,e),w.globalCompositeOperation="source-in",w.fillStyle=a,w.fillRect(0,0,v,T),w.globalCompositeOperation="destination-over",w.drawImage(y,0,0),w.globalCompositeOperation="source-over",u.drawImage(p,0,0)):u.drawImage(t,o,o,t.width,t.height),{image:y,width:v/s,height:T/s}):null}function j(t,i,e){var s,h,n,a,o,r,l,u,g=parseInt(t.toString().length*e),c=parseInt(2*e*t.length),f=L(g,c);if(!f)return null;for((s=f.getContext("2d")).fillStyle="#000",s.fillRect(0,0,g,c),X(s,e+"px "+i,"#fff",t,0,0,0,0,[],"centre"),u={min:{x:n=(h=s.getImageData(0,0,g,c)).width,y:a=h.height},max:{x:-1,y:-1}},r=0;r<a;++r)for(o=0;o<n;++o)l=4*(r*n+o),h.data[l+1]>0&&(o<u.min.x&&(u.min.x=o),o>u.max.x&&(u.max.x=o),r<u.min.y&&(u.min.y=r),r>u.max.y&&(u.max.y=r));return n!=g&&(u.min.x*=g/n,u.max.x*=g/n),a!=c&&(u.min.y*=g/a,u.max.y*=g/a),f=null,u}function Z(t){return"'"+t.replace(/(\'|\")/g,"").replace(/\s*,\s*/g,"', '")+"'"}function Q(t,i,e){(e=e||S).addEventListener?e.addEventListener(t,i,!1):e.attachEvent("on"+t,i)}function J(t,i,e,s){var h,n,a,o,r,l,u=s.imageScale;return i.complete?t.complete?(i.width=i.width,i.height=i.height,u&&(t.width=i.width*u,t.height=i.height*u),e.iw=t.width,e.ih=t.height,s.txtOpt&&(n=t,h=s.zoomMax*s.txtScale,r=e.iw*h,l=e.ih*h,r<i.naturalWidth||l<i.naturalHeight?(n=q(t,r,l))&&(e.fimage=n):(r=e.iw,l=e.ih,h=1),parseFloat(s.imageRadius)&&(e.image=e.fimage=t=function(t,i,e,s,h){var n,a,o=parseFloat(i),r=d(e,s);return(n=L(e,s))?(i.indexOf("%")>0?o=r*o/100:o*=h,(a=n.getContext("2d")).globalCompositeOperation="source-over",a.fillStyle="#fff",o>=r/2?(o=m(e,s)/2,a.beginPath(),a.moveTo(e/2,s/2),a.arc(e/2,s/2,o,0,2*Math.PI,!1),a.fill(),a.closePath()):(Y(a,0,0,e,s,o=m(e/2,s/2,o),!0),a.fill()),a.globalCompositeOperation="source-in",a.drawImage(t,0,0,e,s),n):null}(e.image,s.imageRadius,r,l,h)),e.HasText()||(s.shadow&&(n=function(t,i,e,s,h,n,a){var o,r,l=g(a[0]),u=g(a[1]),c=i+(l>n?l+n:2*n)*s,f=e+(u>n?u+n:2*n)*s,d=s*((n||0)+(a[0]<0?l:0)),m=s*((n||0)+(a[1]<0?u:0));return(o=L(c,f))?(r=o.getContext("2d"),h&&(r.shadowColor=h),n&&(r.shadowBlur=n*s),a&&(r.shadowOffsetX=a[0]*s,r.shadowOffsetY=a[1]*s),r.drawImage(t,d,m,i,e),{image:o,width:c/s,height:f/s}):null}(e.image,r,l,h,s.shadow,s.shadowBlur,s.shadowOffset))&&(e.fimage=n.image,e.w=n.width,e.h=n.height),(s.bgColour||s.bgOutlineThickness)&&(a="tag"==s.bgColour?K(e.a,"background-color"):s.bgColour,o="tag"==s.bgOutline?K(e.a,"color"):s.bgOutline||s.textColour,r=e.fimage.width,l=e.fimage.height,"colour"==s.outlineMethod&&(n=G(e.fimage,r,l,h,a,s.bgOutlineThickness,e.outline.colour,s.padding,s.bgRadius,1))&&(e.oimage=n.image),(n=G(e.fimage,r,l,h,a,s.bgOutlineThickness,o,s.padding,s.bgRadius))&&(e.fimage=n.image,e.w=n.width,e.h=n.height)),"size"==s.outlineMethod&&(s.outlineIncrease>0?(e.iw+=2*s.outlineIncrease,e.ih+=2*s.outlineIncrease,r=h*e.iw,l=h*e.ih,n=q(e.fimage,r,l),e.oimage=n,e.fimage=V(e.fimage,e.oimage.width,e.oimage.height)):(r=h*(e.iw+2*s.outlineIncrease),l=h*(e.ih+2*s.outlineIncrease),n=q(e.fimage,r,l),e.oimage=V(n,e.fimage.width,e.fimage.height))))),void e.Init()):Q("load",function(){J(t,i,e,s)},t):Q("load",function(){J(t,i,e,s)},i)}function K(t,i){var e=S.defaultView,s=i.replace(/\-([a-z])/g,function(t){return t.charAt(1).toUpperCase()});return e&&e.getComputedStyle&&e.getComputedStyle(t,null).getPropertyValue(i)||t.currentStyle&&t.currentStyle[s]}function $(t,i,e){var s,h=1;return i?h=1*(t.getAttribute(i)||e):(s=K(t,"font-size"))&&(h=s.indexOf("px")>-1&&1*s.replace("px","")||s.indexOf("pt")>-1&&1.25*s.replace("pt","")||3.3*s),h}function tt(t){return t.target&&C(t.target.id)?t.target.id:t.srcElement.parentNode.id}function it(t,i){var e,s,h=parseInt(K(i,"width"))/i.width,n=parseInt(K(i,"height"))/i.height;return C(t.offsetX)?e={x:t.offsetX,y:t.offsetY}:(s=ft(i.id),C(t.changedTouches)&&(t=t.changedTouches[0]),t.pageX&&(e={x:t.pageX-s.x,y:t.pageY-s.y})),e&&h&&n&&(e.x/=h,e.y/=n),e}function et(t){var i=t.target||t.fromElement.parentNode,e=wt.tc[i.id];e&&(e.mx=e.my=-1,e.UnFreeze(),e.EndDrag())}function st(t){var i,e,s,h=wt,n=tt(t);for(i in h.tc)(e=h.tc[i]).tttimer&&(clearTimeout(e.tttimer),e.tttimer=null);n&&h.tc[n]&&((s=it(t,(e=h.tc[n]).canvas))&&(e.mx=s.x,e.my=s.y,e.Drag(t,s)),e.drawn=0)}function ht(t){var i=wt,e=S.addEventListener?0:1,s=tt(t);s&&t.button==e&&i.tc[s]&&i.tc[s].BeginDrag(t)}function nt(t){var i,e=wt,s=S.addEventListener?0:1,h=tt(t);h&&t.button==s&&e.tc[h]&&(i=e.tc[h],st(t),i.EndDrag()||i.touchState||i.Clicked(t))}function at(t){var i,e=tt(t),s=e&&wt.tc[e];s&&t.changedTouches&&(1==t.touches.length&&0==s.touchState?(s.touchState=1,s.BeginDrag(t),(i=it(t,s.canvas))&&(s.mx=i.x,s.my=i.y,s.drawn=0)):2==t.targetTouches.length&&s.pinchZoom?(s.touchState=3,s.EndDrag(),s.BeginPinch(t)):(s.EndDrag(),s.EndPinch(),s.touchState=0))}function ot(t){var i=tt(t),e=i&&wt.tc[i];if(e&&t.changedTouches){switch(e.touchState){case 1:e.Draw(),e.Clicked();break;case 2:e.EndDrag();break;case 3:e.EndPinch()}e.touchState=0}}function rt(t){var i,e,s,h=wt,n=tt(t);for(i in h.tc)(e=h.tc[i]).tttimer&&(clearTimeout(e.tttimer),e.tttimer=null);if((e=n&&h.tc[n])&&t.changedTouches&&e.touchState){switch(e.touchState){case 1:case 2:(s=it(t,e.canvas))&&(e.mx=s.x,e.my=s.y,e.Drag(t,s)&&(e.touchState=2));break;case 3:e.Pinch(t)}e.drawn=0}}function lt(t){var i=wt,e=tt(t);e&&i.tc[e]&&(t.cancelBubble=!0,t.returnValue=!1,t.preventDefault&&t.preventDefault(),i.tc[e].Wheel((t.wheelDelta||t.detail)>0))}function ut(t){var i,e=wt;for(i in clearTimeout(e.scrollTimer),e.tc)e.tc[i].Pause();e.scrollTimer=setTimeout(function(){var t,i=wt;for(t in i.tc)i.tc[t].Resume()},e.scrollPause)}function gt(){ct(I())}function ct(t){var i,e=wt.tc;for(i in wt.NextFrame(wt.interval),t=t||I(),e)e[i].Draw(t)}function ft(t){var i=S.getElementById(t).getBoundingClientRect(),e=S.documentElement,s=S.body,h=window,n=h.pageXOffset||e.scrollLeft,a=h.pageYOffset||e.scrollTop,o=e.clientLeft||s.clientLeft,r=e.clientTop||s.clientTop;return{x:i.left+n-o,y:i.top+a-r}}function dt(t){this.e=t,this.br=0,this.line=[],this.text=[],this.original=t.innerText||t.textContent}function mt(t,i){this.ts=null,this.tc=t,this.tag=i,this.x=this.y=this.w=this.h=this.sc=1,this.z=0,this.pulse=1,this.pulsate=t.pulsateTo<1,this.colour=t.outlineColour,this.adash=~~t.outlineDash,this.agap=~~t.outlineDashSpace||this.adash,this.aspeed=1*t.outlineDashSpeed,"tag"==this.colour?this.colour=K(i.a,"color"):"tagbg"==this.colour&&(this.colour=K(i.a,"background-color")),this.Draw=this.pulsate?this.DrawPulsate:this.DrawSimple,this.radius=0|t.outlineRadius,this.SetMethod(t.outlineMethod)}function pt(t,i,e,s,h,n,a,o,r,l,u,g,c,f){this.tc=t,this.image=null,this.text=i,this.text_original=f,this.line_widths=[],this.title=e.title||null,this.a=e,this.position=new F(s[0],s[1],s[2]),this.x=this.y=this.z=0,this.w=h,this.h=n,this.colour=a||t.textColour,this.bgColour=o||t.bgColour,this.bgRadius=0|r,this.bgOutline=l||this.colour,this.bgOutlineThickness=0|u,this.textFont=g||t.textFont,this.padding=0|c,this.sc=this.alpha=1,this.weighted=!t.weight,this.outline=new mt(t,this)}function wt(t,i,e){var s,h,n,a,o=S.getElementById(t),r=["id","class","innerHTML"];if(!o)throw 0;if(C(window.G_vmlCanvasManager)&&(o=window.G_vmlCanvasManager.initElement(o),this.ie=parseFloat(navigator.appVersion.split("MSIE")[1])),o&&(!o.getContext||!o.getContext("2d").fillText)){for(h=S.createElement("DIV"),s=0;s<r.length;++s)h[r[s]]=o[r[s]];throw o.parentNode.insertBefore(h,o),o.parentNode.removeChild(o),0}for(s in wt.options)this[s]=e&&C(e[s])?e[s]:C(wt[s])?wt[s]:wt.options[s];if(this.canvas=o,this.ctxt=o.getContext("2d"),this.z1=250/d(this.depth,.001),this.z2=this.z1/this.zoom,this.radius=.0075*m(o.height,o.width),this.max_radius=100,this.max_weight=[],this.min_weight=[],this.textFont=this.textFont&&Z(this.textFont),this.textHeight*=1,this.imageRadius=this.imageRadius.toString(),this.pulsateTo=D(this.pulsateTo,0,1),this.minBrightness=D(this.minBrightness,0,1),this.maxBrightness=D(this.maxBrightness,this.minBrightness,1),this.ctxt.textBaseline="top",this.lx=(this.lock+"").indexOf("x")+1,this.ly=(this.lock+"").indexOf("y")+1,this.frozen=this.dx=this.dy=this.fixedAnim=this.touchState=0,this.fixedAlpha=1,this.source=i||t,this.repeatTags=m(64,~~this.repeatTags),this.minTags=m(200,~~this.minTags),~~this.scrollPause>0?wt.scrollPause=~~this.scrollPause:this.scrollPause=0,this.minTags>0&&this.repeatTags<1&&(s=this.GetTags().length)&&(this.repeatTags=p(this.minTags/s)-1),this.transform=O.Identity(),this.startTime=this.time=I(),this.mx=this.my=-1,this.centreImage&&function(t){var i=new Image;i.onload=function(){var e=i.width/2,s=i.height/2;t.centreFunc=function(t,h,n,a,o){t.setTransform(1,0,0,1,0,0),t.globalAlpha=1,t.drawImage(i,a-e,o-s)}},i.src=t.centreImage}(this),this.Animate=this.dragControl?this.AnimateDrag:this.AnimatePosition,this.animTiming="function"==typeof wt[this.animTiming]?wt[this.animTiming]:wt.Smooth,this.shadowBlur||this.shadowOffset[0]||this.shadowOffset[1]?(this.ctxt.shadowColor=this.shadow,this.shadow=this.ctxt.shadowColor,this.shadowAlpha=function(){var t,i=L(3,3);return!!i&&((t=i.getContext("2d")).strokeStyle="#000",t.shadowColor="#fff",t.shadowBlur=3,t.globalAlpha=0,t.strokeRect(2,2,2,2),t.globalAlpha=1,i=null,t.getImageData(2,2,1,1).data[0]>0)}()):delete this.shadow,this.Load(),i&&this.hideTags&&(a=this,wt.loaded?a.HideTags():Q("load",function(){a.HideTags()},window)),this.yaw=this.initial?this.initial[0]*this.maxSpeed:0,this.pitch=this.initial?this.initial[1]*this.maxSpeed:0,this.tooltip?(this.ctitle=o.title,o.title="","native"==this.tooltip?this.Tooltip=this.TooltipNative:(this.Tooltip=this.TooltipDiv,this.ttdiv||(this.ttdiv=S.createElement("div"),this.ttdiv.className=this.tooltipClass,this.ttdiv.style.position="absolute",this.ttdiv.style.zIndex=o.style.zIndex+1,Q("mouseover",function(t){t.target.style.display="none"},this.ttdiv),S.body.appendChild(this.ttdiv)))):this.Tooltip=this.TooltipNone,!this.noMouse&&!b[t])for(b[t]=[["mousemove",st],["mouseout",et],["mouseup",nt],["touchstart",at],["touchend",ot],["touchcancel",ot],["touchmove",rt]],this.dragControl&&(b[t].push(["mousedown",ht]),b[t].push(["selectstart",A])),this.wheelZoom&&(b[t].push(["mousewheel",lt]),b[t].push(["DOMMouseScroll",lt])),this.scrollPause&&b[t].push(["scroll",ut,window]),s=0;s<b[t].length;++s)Q((h=b[t][s])[0],h[1],h[2]?h[2]:o);wt.started||(n=window.requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame,wt.NextFrame=n?wt.NextFrameRAF:wt.NextFrameTimeout,wt.interval=this.interval,wt.NextFrame(this.interval),wt.started=1)}function xt(t){var i=t.targetTouches[0],e=t.targetTouches[1];return w(x(e.pageX-i.pageX,2)+x(e.pageY-i.pageY,2))}function vt(t,i){wt.tc[i]&&wt.tc[i][t]()}for(i in(o=F.prototype).length=function(){return w(this.x*this.x+this.y*this.y+this.z*this.z)},o.dot=function(t){return this.x*t.x+this.y*t.y+this.z*t.z},o.cross=function(t){return new F(this.y*t.z-this.z*t.y,this.z*t.x-this.x*t.z,this.x*t.y-this.y*t.x)},o.angle=function(t){var i,e=this.dot(t);return 0==e?Math.PI/2:(i=e/(this.length()*t.length()))>=1?0:i<=-1?Math.PI:Math.acos(i)},o.unit=function(){var t=this.length();return new F(this.x/t,this.y/t,this.z/t)},a=O.prototype,O.Identity=function(){return new O([1,0,0,0,1,0,0,0,1])},O.Rotation=function(t,i){var e=c(t),s=f(t),h=1-s;return new O([s+x(i.x,2)*h,i.x*i.y*h-i.z*e,i.x*i.z*h+i.y*e,i.y*i.x*h+i.z*e,s+x(i.y,2)*h,i.y*i.z*h-i.x*e,i.z*i.x*h-i.y*e,i.z*i.y*h+i.x*e,s+x(i.z,2)*h])},a.mul=function(t){var i,e,s=[],h=t.xform?1:0;for(i=1;i<=3;++i)for(e=1;e<=3;++e)h?s.push(this[i][1]*t[1][e]+this[i][2]*t[2][e]+this[i][3]*t[3][e]):s.push(this[i][e]*t);return new O(s)},a.xform=function(t){var i={},e=t.x,s=t.y,h=t.z;return i.x=e*this[1][1]+s*this[2][1]+h*this[3][1],i.y=e*this[1][2]+s*this[2][2]+h*this[3][2],i.z=e*this[1][3]+s*this[2][3]+h*this[3][3],i},(l=U.prototype).SetImage=function(t,i,e,s,h,n,a,o){this.image=t,this.iwidth=i*this.scale,this.iheight=e*this.scale,this.ipos=s,this.ipad=h*this.scale,this.iscale=o,this.ialign=n,this.ivalign=a},l.Align=function(t,i,e){var s=0;return"right"==e||"bottom"==e?s=i-t:"left"!=e&&"top"!=e&&(s=(i-t)/2),s},l.Create=function(t,i,e,s,h,n,a,o,r){var l,u,c,f,p,w,x,v,T,y,S,b,C,z,D,A,I,M=g(a[0]),F=g(a[1]);return p=2*((o=d(o,M+n,F+n))+s),x=2*(o+s),u=this.width+p,c=this.height+x,T=y=o+s,this.image&&(S=b=o+s,C=this.iwidth,z=this.iheight,"top"==this.ipos||"bottom"==this.ipos?(C<this.width?S+=this.Align(C,this.width,this.ialign):T+=this.Align(this.width,C,this.align),"top"==this.ipos?y+=z+this.ipad:b+=this.height+this.ipad,u=d(u,C+p),c+=z+this.ipad):(z<this.height?b+=this.Align(z,this.height,this.ivalign):y+=this.Align(this.height,z,this.valign),"right"==this.ipos?S+=this.width+this.ipad:T+=C+this.ipad,u+=C+this.ipad,c=d(c,z+x))),(l=L(u,c))?(p=x=s/2,D=m(r,(w=u-s)/2,(v=c-s)/2),f=l.getContext("2d"),i&&(f.fillStyle=i,Y(f,p,x,w,v,D)),s&&(f.strokeStyle=e,f.lineWidth=s,Y(f,p,x,w,v,D,!0)),(n||M||F)&&(A=L(u,c))&&(I=f,f=A.getContext("2d")),X(f,this.font,t,this.strings,T,y,0,0,[],this.maxWidth,this.stringWidths,this.align),this.image&&f.drawImage(this.image,S,b,C,z),I&&(f=I,h&&(f.shadowColor=h),n&&(f.shadowBlur=n),f.shadowOffsetX=a[0],f.shadowOffsetY=a[1],f.drawImage(A,0,0)),l):null},(r=dt.prototype).Empty=function(){for(var t=0;t<this.text.length;++t)if(this.text[t].length)return!1;return!0},r.Lines=function(t){var i,e,s,h=t?1:0;for(e=(i=(t=t||this.e).childNodes).length,s=0;s<e;++s)"BR"==i[s].nodeName?(this.text.push(this.line.join(" ")),this.br=1):3==i[s].nodeType?this.br?(this.line=[i[s].nodeValue],this.br=0):this.line.push(i[s].nodeValue):this.Lines(i[s]);return h||this.br||this.text.push(this.line.join(" ")),this.text},r.SplitWidth=function(t,i,e,s){var h,n,a,o=[];for(i.font=s+"px "+e,h=0;h<this.text.length;++h){for(a=this.text[h].split(/\s+/),this.line=[a[0]],n=1;n<a.length;++n)i.measureText(this.line.join(" ")+" "+a[n]).width>t?(o.push(this.line.join(" ")),this.line=[a[n]]):this.line.push(a[n]);o.push(this.line.join(" "))}return this.text=o},(s=mt.prototype).SetMethod=function(t){var i={block:["PreDraw","DrawBlock"],colour:["PreDraw","DrawColour"],outline:["PostDraw","DrawOutline"],classic:["LastDraw","DrawOutline"],size:["PreDraw","DrawSize"],none:["LastDraw"]},e=i[t]||i.outline;"none"==t?this.Draw=function(){return 1}:this.drawFunc=this[e[1]],this[e[0]]=this.Draw},s.Update=function(t,i,e,s,h,n,a,o){var r=this.tc.outlineOffset,l=2*r;this.x=h*t+a-r,this.y=h*i+o-r,this.w=h*e+l,this.h=h*s+l,this.sc=h,this.z=n},s.Ants=function(t){if(this.adash){var i,e=this.adash,s=this.agap,h=this.aspeed,n=e+s,a=0,o=e,r=s,l=0,u=0;h&&(u=g(h)*(I()-this.ts)/50,h<0&&(u=864e4-u),h=~~u%n),h?(e>=h?(a=e-h,o=h):l=s-(r=n-h),i=[a,r,o,l]):i=[e,s],t.setLineDash(i)}},s.DrawOutline=function(t,i,e,s,h,n){var a=m(this.radius,h/2,s/2);t.strokeStyle=n,this.Ants(t),Y(t,i,e,s,h,a,!0)},s.DrawSize=function(t,i,e,s,h,n,a,o,r){var l,u,g,c=a.w,f=a.h;return this.pulsate?(g=a.image?(a.image.height+this.tc.outlineIncrease)/a.image.height:a.oscale,u=a.fimage||a.image,l=1+(g-1)*(1-this.pulse),a.h*=l,a.w*=l):u=a.oimage,a.alpha=1,a.Draw(t,o,r,u),a.h=f,a.w=c,1},s.DrawColour=function(t,i,e,s,h,n,a,o,r){return a.oimage?(this.pulse<1?(a.alpha=1-x(this.pulse,2),a.Draw(t,o,r,a.fimage),a.alpha=this.pulse):a.alpha=1,a.Draw(t,o,r,a.oimage),1):this[a.image?"DrawColourImage":"DrawColourText"](t,i,e,s,h,n,a,o,r)},s.DrawColourText=function(t,i,e,s,h,n,a,o,r){var l=a.colour;return a.colour=n,a.alpha=1,a.Draw(t,o,r),a.colour=l,1},s.DrawColourImage=function(t,i,e,s,h,n,a,o,r){var l=t.canvas,g=~~d(i,0),c=~~d(e,0),f=m(l.width-g,s)+.5|0,p=m(l.height-c,h)+.5|0;return u?(u.width=f,u.height=p):u=L(f,p),u?(u.getContext("2d").drawImage(l,g,c,f,p,0,0,f,p),t.clearRect(g,c,f,p),this.pulsate?a.alpha=1-x(this.pulse,2):a.alpha=1,a.Draw(t,o,r),t.setTransform(1,0,0,1,0,0),t.save(),t.beginPath(),t.rect(g,c,f,p),t.clip(),t.globalCompositeOperation="source-in",t.fillStyle=n,t.fillRect(g,c,f,p),t.restore(),t.globalAlpha=1,t.globalCompositeOperation="destination-over",t.drawImage(u,0,0,f,p,g,c,f,p),t.globalCompositeOperation="source-over",1):this.SetMethod("outline")},s.DrawBlock=function(t,i,e,s,h,n){var a=m(this.radius,h/2,s/2);t.fillStyle=n,Y(t,i,e,s,h,a)},s.DrawSimple=function(t,i,e,s,h,n){var a=this.tc;return t.setTransform(1,0,0,1,0,0),t.strokeStyle=this.colour,t.lineWidth=a.outlineThickness,t.shadowBlur=t.shadowOffsetX=t.shadowOffsetY=0,t.globalAlpha=n?h:1,this.drawFunc(t,this.x,this.y,this.w,this.h,this.colour,i,e,s)},s.DrawPulsate=function(t,i,e,s){var h=I()-this.ts,n=this.tc,a=n.pulsateTo+(1-n.pulsateTo)*(.5+f(2*Math.PI*h/(1e3*n.pulsateTime))/2);return this.pulse=a=wt.Smooth(1,a),this.DrawSimple(t,i,e,s,a,1)},s.Active=function(t,i,e){var s=i>=this.x&&e>=this.y&&i<=this.x+this.w&&e<=this.y+this.h;return this.ts=s?this.ts||I():null,s},s.PreDraw=s.PostDraw=s.LastDraw=A,(h=pt.prototype).Init=function(t){var i=this.tc;this.textHeight=i.textHeight,this.HasText()?this.Measure(i.ctxt,i):(this.w=this.iw,this.h=this.ih),this.SetShadowColour=i.shadowAlpha?this.SetShadowColourAlpha:this.SetShadowColourFixed,this.SetDraw(i)},h.Draw=A,h.HasText=function(){return this.text&&this.text[0].length>0},h.EqualTo=function(t){var i=t.getElementsByTagName("img");return this.a.href!=t.href?0:i.length?this.image.src==i[0].src:(t.innerText||t.textContent)==this.text_original},h.SetImage=function(t){this.image=this.fimage=t},h.SetDraw=function(t){this.Draw=this.fimage?t.ie>7?this.DrawImageIE:this.DrawImage:this.DrawText,t.noSelect&&(this.CheckActive=A)},h.MeasureText=function(t){var i,e,s=this.text.length,h=0;for(i=0;i<s;++i)this.line_widths[i]=e=t.measureText(this.text[i]).width,h=d(h,e);return h},h.Measure=function(t,i){var e,s,h,n,a,o,r,l,u,g=j(this.text,this.textFont,this.textHeight);r=g?g.max.y+g.min.y:this.textHeight,t.font=this.font=this.textHeight+"px "+this.textFont,o=this.MeasureText(t),i.txtOpt&&(h=(s=(e=i.txtScale)*this.textHeight)+"px "+this.textFont,n=[e*i.shadowOffset[0],e*i.shadowOffset[1]],t.font=h,a=this.MeasureText(t),u=new U(this.text,h,a+e,e*r+e,a,this.line_widths,i.textAlign,i.textVAlign,e),this.image&&u.SetImage(this.image,this.iw,this.ih,i.imagePosition,i.imagePadding,i.imageAlign,i.imageVAlign,i.imageScale),l=u.Create(this.colour,this.bgColour,this.bgOutline,e*this.bgOutlineThickness,i.shadow,e*i.shadowBlur,n,e*this.padding,e*this.bgRadius),"colour"==i.outlineMethod?this.oimage=u.Create(this.outline.colour,this.bgColour,this.outline.colour,e*this.bgOutlineThickness,i.shadow,e*i.shadowBlur,n,e*this.padding,e*this.bgRadius):"size"==i.outlineMethod&&(s=(g=j(this.text,this.textFont,this.textHeight+i.outlineIncrease)).max.y+g.min.y,h=e*(this.textHeight+i.outlineIncrease)+"px "+this.textFont,t.font=h,a=this.MeasureText(t),u=new U(this.text,h,a+e,e*s+e,a,this.line_widths,i.textAlign,i.textVAlign,e),this.image&&u.SetImage(this.image,this.iw+i.outlineIncrease,this.ih+i.outlineIncrease,i.imagePosition,i.imagePadding,i.imageAlign,i.imageVAlign,i.imageScale),this.oimage=u.Create(this.colour,this.bgColour,this.bgOutline,e*this.bgOutlineThickness,i.shadow,e*i.shadowBlur,n,e*this.padding,e*this.bgRadius),this.oscale=this.oimage.width/l.width,i.outlineIncrease>0?l=V(l,this.oimage.width,this.oimage.height):this.oimage=V(this.oimage,l.width,l.height)),l&&(this.fimage=l,o=this.fimage.width/e,r=this.fimage.height/e),this.SetDraw(i),i.txtOpt=!!this.fimage),this.h=r,this.w=o},h.SetFont=function(t,i,e,s){this.textFont=t,this.colour=i,this.bgColour=e,this.bgOutline=s,this.Measure(this.tc.ctxt,this.tc)},h.SetWeight=function(t){var i,e,s=this.tc,h=s.weightMode.split(/[, ]/),n=t.length;if(this.HasText()){for(this.weighted=!0,e=0;e<n;++e)"both"==(i=h[e]||"size")?(this.Weight(t[e],s.ctxt,s,"size",s.min_weight[e],s.max_weight[e],e),this.Weight(t[e],s.ctxt,s,"colour",s.min_weight[e],s.max_weight[e],e)):this.Weight(t[e],s.ctxt,s,i,s.min_weight[e],s.max_weight[e],e);this.Measure(s.ctxt,s)}},h.Weight=function(t,i,e,s,h,n,a){var o=((t=isNaN(t)?1:t)-h)/(n-h);"colour"==s?this.colour=W(e,o,a):"bgcolour"==s?this.bgColour=W(e,o,a):"bgoutline"==s?this.bgOutline=W(e,o,a):"outline"==s?this.outline.colour=W(e,o,a):"size"==s&&(e.weightSizeMin>0&&e.weightSizeMax>e.weightSizeMin?this.textHeight=e.weightSize*(e.weightSizeMin+(e.weightSizeMax-e.weightSizeMin)*o):this.textHeight=d(1,t*e.weightSize))},h.SetShadowColourFixed=function(t,i,e){t.shadowColor=i},h.SetShadowColourAlpha=function(t,i,e){t.shadowColor=function(t,i){var e,s,h=t,n=(1*i).toPrecision(3)+")";return"#"===t[0]?(v[t]||(4===t.length?v[t]="rgba("+y[t[1]]+y[t[2]]+y[t[3]]:v[t]="rgba("+T[t.substr(1,2)]+T[t.substr(3,2)]+T[t.substr(5,2)]),h=v[t]+n):"rgb("===t.substr(0,4)||"hsl("===t.substr(0,4)?h=t.replace("(","a(").replace(")",","+n):"rgba("!==t.substr(0,5)&&"hsla("!==t.substr(0,5)||(e=t.lastIndexOf(",")+1,s=t.indexOf(")"),i*=parseFloat(t.substring(e,s)),h=t.substr(0,e)+i.toPrecision(3)+")"),h}(i,e)},h.DrawText=function(t,i,e){var s,h,n=this.tc,a=this.x,o=this.y,r=this.sc;for(t.globalAlpha=this.alpha,t.fillStyle=this.colour,n.shadow&&this.SetShadowColour(t,n.shadow,this.alpha),t.font=this.font,a+=i/r,o+=e/r-this.h/2,s=0;s<this.text.length;++s)h=a,"right"==n.textAlign?h+=this.w/2-this.line_widths[s]:"centre"==n.textAlign?h-=this.line_widths[s]/2:h-=this.w/2,t.setTransform(r,0,0,r,r*h,r*o),t.fillText(this.text[s],0,0),o+=this.textHeight},h.DrawImage=function(t,i,e,s){var h=this.x,n=this.y,a=this.sc,o=s||this.fimage,r=this.w,l=this.h,u=this.alpha,g=this.shadow;t.globalAlpha=u,g&&this.SetShadowColour(t,g,u),h+=i/a-r/2,n+=e/a-l/2,t.setTransform(a,0,0,a,a*h,a*n),t.drawImage(o,0,0,r,l)},h.DrawImageIE=function(t,i,e){var s=this.fimage,h=this.sc,n=s.width=this.w*h,a=s.height=this.h*h,o=this.x*h+i-n/2,r=this.y*h+e-a/2;t.setTransform(1,0,0,1,0,0),t.globalAlpha=this.alpha,t.drawImage(s,o,r)},h.Calc=function(t,i){var e,s=this.tc,h=s.minBrightness,n=s.maxBrightness,a=s.max_radius;return e=t.xform(this.position),this.xformed=e,e=function(t,i,e,s){var h=t.radius*t.z1/(t.z1+t.z2+i.z);return{x:i.x*h*e,y:i.y*h*s,z:i.z,w:(t.z1-i.z)/t.z2}}(s,e,s.stretchX,s.stretchY),this.x=e.x,this.y=e.y,this.z=e.z,this.sc=e.w,this.alpha=i*D(h+(n-h)*(a-this.z)/(2*a),0,1),this.xformed},h.UpdateActive=function(t,i,e){var s=this.outline,h=this.w,n=this.h,a=this.x-h/2,o=this.y-n/2;return s.Update(a,o,h,n,this.sc,this.z,i,e),s},h.CheckActive=function(t,i,e){var s=this.tc,h=this.UpdateActive(t,i,e);return h.Active(t,s.mx,s.my)?h:null},h.Clicked=function(t){var i,e=this.a,s=e.target,h=e.href;if(""==s||"_self"==s){if(S.createEvent){if((i=S.createEvent("MouseEvents")).initMouseEvent("click",1,1,window,0,0,0,0,0,0,0,0,0,0,null),!e.dispatchEvent(i))return}else if(e.fireEvent&&!e.fireEvent("onclick"))return;S.location=h}else if(self.frames[s])self.frames[s].document.location=h;else{try{if(top.frames[s])return void(top.frames[s].document.location=h)}catch(t){}window.open(h,s)}},(n=wt.prototype).SourceElements=function(){return S.querySelectorAll?S.querySelectorAll("#"+this.source):[S.getElementById(this.source)]},n.HideTags=function(){var t,i=this.SourceElements();for(t=0;t<i.length;++t)i[t].style.display="none"},n.GetTags=function(){var t,i,e,s,h=this.SourceElements(),n=[];for(s=0;s<=this.repeatTags;++s)for(i=0;i<h.length;++i)for(t=h[i].getElementsByTagName("a"),e=0;e<t.length;++e)n.push(t[e]);return n},n.Message=function(t){var i,e,s,h,n,a,o=[],r=t.split("");for(i=0;i<r.length;++i)" "!=r[i]&&(e=i-r.length/2,(s=S.createElement("A")).href="#",s.innerText=r[i],n=100*c(e/9),a=-100*f(e/9),(h=new pt(this,r[i],s,[n,0,a],2,18,"#000","#fff",0,0,0,"monospace",2,r[i])).Init(),o.push(h));return o},n.CreateTag=function(t){var i,e,s,h,n,a,o,r,l=[0,0,0];return"text"!=this.imageMode&&(i=t.getElementsByTagName("img")).length&&((e=new Image).src=i[0].src,!this.imageMode)?((s=new pt(this,"",t,l,0,0)).SetImage(e),J(e,i[0],s,this),s):("image"!=this.imageMode&&(h=(n=new dt(t)).Lines(),n.Empty()?n=null:(a=this.textFont||Z(K(t,"font-family")),this.splitWidth&&(h=n.SplitWidth(this.splitWidth,this.ctxt,a,this.textHeight)),o="tag"==this.bgColour?K(t,"background-color"):this.bgColour,r="tag"==this.bgOutline?K(t,"color"):this.bgOutline)),n||e?(s=new pt(this,h,t,l,2,this.textHeight+2,this.textColour||K(t,"color"),o,this.bgRadius,r,this.bgOutlineThickness,a,this.padding,n&&n.original),e?(s.SetImage(e),J(e,i[0],s,this)):s.Init(),s):void 0)},n.UpdateTag=function(t,i){var e=this.textColour||K(i,"color"),s=this.textFont||Z(K(i,"font-family")),h="tag"==this.bgColour?K(i,"background-color"):this.bgColour,n="tag"==this.bgOutline?K(i,"color"):this.bgOutline;t.a=i,t.title=i.title,t.colour==e&&t.textFont==s&&t.bgColour==h&&t.bgOutline==n||t.SetFont(s,e,h,n)},n.Weight=function(t){var i,e,s,h,n=t.length,a=[],o=this.weightFrom?this.weightFrom.split(/[, ]/):[null],r=o.length;for(e=0;e<n;++e)for(a[e]=[],s=0;s<r;++s)i=$(t[e].a,o[s],this.textHeight),(!this.max_weight[s]||i>this.max_weight[s])&&(this.max_weight[s]=i),(!this.min_weight[s]||i<this.min_weight[s])&&(this.min_weight[s]=i),a[e][s]=i;for(s=0;s<r;++s)this.max_weight[s]>this.min_weight[s]&&(h=1);if(h)for(e=0;e<n;++e)t[e].SetWeight(a[e])},n.Load=function(){var t,i,e,s,h,n,a,o,r=this.GetTags(),l=[],u=[],g={sphere:k,vcylinder:R,hcylinder:B,vring:N,hring:_};if(r.length){for(u.length=r.length,o=0;o<r.length;++o)u[o]=o;for(this.shuffleTags&&M(u),s=100*this.radiusX,h=100*this.radiusY,n=100*this.radiusZ,this.max_radius=d(s,d(h,n)),o=0;o<r.length;++o)(i=this.CreateTag(r[u[o]]))&&l.push(i);for(this.weight&&this.Weight(l,!0),this.shapeArgs?this.shapeArgs[0]=l.length:(t=(e=this.shape.toString().split(/[(),]/)).shift(),"function"==typeof window[t]?this.shape=window[t]:this.shape=g[t]||g.sphere,this.shapeArgs=[l.length,s,h,n].concat(e)),a=this.shape.apply(this,this.shapeArgs),this.listLength=l.length,o=0;o<l.length;++o)l[o].position=new F(a[o][0],a[o][1],a[o][2])}this.noTagsMessage&&!l.length&&(o=this.imageMode&&"both"!=this.imageMode?this.imageMode+" ":"",l=this.Message("No "+o+"tags")),this.taglist=l},n.Update=function(){var t,i,e,s,h,n,a=this.GetTags(),o=[],r=this.taglist,l=[],u=[];if(!this.shapeArgs)return this.Load();if(a.length){for(s=this.listLength=a.length,e=r.length,h=0;h<e;++h)o.push(r[h]),u.push(h);for(h=0;h<s;++h){for(n=0,t=0;n<e;++n)r[n].EqualTo(a[h])&&(this.UpdateTag(o[n],a[h]),t=u[n]=-1);t||l.push(h)}for(h=0,n=0;h<e;++h)-1==u[n]?u.splice(n,1):++n;if(u.length){for(M(u);u.length&&l.length;)h=u.shift(),n=l.shift(),o[h]=this.CreateTag(a[n]);for(u.sort(function(t,i){return t-i});u.length;)o.splice(u.pop(),1)}for(n=o.length/(l.length+1),h=0;l.length;)o.splice(p(++h*n),0,this.CreateTag(a[l.shift()]));for(this.shapeArgs[0]=s=o.length,i=this.shape.apply(this,this.shapeArgs),h=0;h<s;++h)o[h].position=new F(i[h][0],i[h][1],i[h][2]);this.weight&&this.Weight(o)}this.taglist=o},n.SetShadow=function(t){t.shadowBlur=this.shadowBlur,t.shadowOffsetX=this.shadowOffset[0],t.shadowOffsetY=this.shadowOffset[1]},n.Draw=function(t){if(!this.paused){var i,e,s,h,n=this.canvas,a=n.width,o=n.height,r=0,l=(t-this.time)*wt.interval/1e3,u=a/2+this.offsetX,g=o/2+this.offsetY,c=this.ctxt,f=-1,d=this.taglist,m=d.length,p=this.frontSelect,w=this.centreFunc==A;if(this.time=t,this.frozen&&this.drawn)return this.Animate(a,o,l);for(h=this.AnimateFixed(),c.setTransform(1,0,0,1,0,0),s=0;s<m;++s)d[s].Calc(this.transform,this.fixedAlpha);if(d=function(t,i){var e,s=[],h=t.length;for(e=0;e<h;++e)s.push(t[e]);return s.sort(i),s}(d,function(t,i){return i.z-t.z}),h&&this.fixedAnim.active)i=this.fixedAnim.tag.UpdateActive(c,u,g);else{for(this.active=null,s=0;s<m;++s)(e=this.mx>=0&&this.my>=0&&this.taglist[s].CheckActive(c,u,g))&&e.sc>r&&(!p||e.z<=0)&&(f=s,(i=e).tag=this.taglist[s],r=e.sc);this.active=i}for(this.txtOpt||this.shadow&&this.SetShadow(c),c.clearRect(0,0,a,o),s=0;s<m;++s){if(!w&&d[s].z<=0){try{this.centreFunc(c,a,o,u,g)}catch(t){alert(t),this.centreFunc=A}w=!0}i&&i.tag==d[s]&&i.PreDraw(c,d[s],u,g)||d[s].Draw(c,u,g),i&&i.tag==d[s]&&i.PostDraw(c)}this.freezeActive&&i?this.Freeze():(this.UnFreeze(),this.drawn=m==this.listLength),this.fixedCallback&&(this.fixedCallback(this,this.fixedCallbackTag),this.fixedCallback=null),h||this.Animate(a,o,l),i&&i.LastDraw(c),n.style.cursor=i?this.activeCursor:"",this.Tooltip(i,this.taglist[f])}},n.TooltipNone=function(){},n.TooltipNative=function(t,i){this.canvas.title=t?i&&i.title?i.title:"":this.ctitle},n.SetTTDiv=function(t,i){var e=this,s=e.ttdiv.style;t!=e.ttdiv.innerHTML&&(s.display="none"),e.ttdiv.innerHTML=t,i&&(i.title=e.ttdiv.innerHTML),"none"!=s.display||e.tttimer||(e.tttimer=setTimeout(function(){var t=ft(e.canvas.id);s.display="block",s.left=t.x+e.mx+"px",s.top=t.y+e.my+24+"px",e.tttimer=null},e.tooltipDelay))},n.TooltipDiv=function(t,i){t&&i&&i.title?this.SetTTDiv(i.title,i):!t&&-1!=this.mx&&-1!=this.my&&this.ctitle.length?this.SetTTDiv(this.ctitle):this.ttdiv.style.display="none"},n.Transform=function(t,i,e){if(i||e){var s=c(i),h=f(i),n=c(e),a=f(e),o=new O([a,0,n,0,1,0,-n,0,a]),r=new O([1,0,0,0,h,-s,0,s,h]);t.transform=t.transform.mul(o.mul(r))}},n.AnimateFixed=function(){var t,i,e,s,h;return this.fadeIn&&((i=I()-this.startTime)>=this.fadeIn?(this.fadeIn=0,this.fixedAlpha=1):this.fixedAlpha=i/this.fadeIn),!!this.fixedAnim&&(this.fixedAnim.transform||(this.fixedAnim.transform=this.transform),t=this.fixedAnim,i=I()-t.t0,e=t.angle,h=this.animTiming(t.t,i),this.transform=t.transform,i>=t.t?(this.fixedCallbackTag=t.tag,this.fixedCallback=t.cb,this.fixedAnim=this.yaw=this.pitch=0):e*=h,s=O.Rotation(e,t.axis),this.transform=this.transform.mul(s),0!=this.fixedAnim)},n.AnimatePosition=function(t,i,e){var s,h,n=this,a=n.mx,o=n.my;!n.frozen&&a>=0&&o>=0&&a<t&&o<i?(s=n.maxSpeed,h=n.reverse?-1:1,n.lx||(n.yaw=(2*a*s/t-s)*h*e),n.ly||(n.pitch=(2*o*s/i-s)*-h*e),n.initial=null):n.initial||(n.frozen&&!n.freezeDecel?n.yaw=n.pitch=0:n.Decel(n)),this.Transform(n,n.pitch,n.yaw)},n.AnimateDrag=function(t,i,e){var s=this,h=100*e*s.maxSpeed/s.max_radius/s.zoom;s.dx||s.dy?(s.lx||(s.yaw=s.dx*h/s.stretchX),s.ly||(s.pitch=s.dy*-h/s.stretchY),s.dx=s.dy=0,s.initial=null):s.initial||s.Decel(s),this.Transform(s,s.pitch,s.yaw)},n.Freeze=function(){this.frozen||(this.preFreeze=[this.yaw,this.pitch],this.frozen=1,this.drawn=0)},n.UnFreeze=function(){this.frozen&&(this.yaw=this.preFreeze[0],this.pitch=this.preFreeze[1],this.frozen=0)},n.Decel=function(t){var i=t.minSpeed,e=g(t.yaw),s=g(t.pitch);!t.lx&&e>i&&(t.yaw=e>t.z0?t.yaw*t.decel:0),!t.ly&&s>i&&(t.pitch=s>t.z0?t.pitch*t.decel:0)},n.Zoom=function(t){this.z2=this.z1*(1/t),this.drawn=0},n.Clicked=function(t){var i=this.active;try{i&&i.tag&&(!1===this.clickToFront||null===this.clickToFront?i.tag.Clicked(t):this.TagToFront(i.tag,this.clickToFront,function(){i.tag.Clicked(t)},!0))}catch(t){}},n.Wheel=function(t){var i=this.zoom+this.zoomStep*(t?1:-1);this.zoom=m(this.zoomMax,d(this.zoomMin,i)),this.Zoom(this.zoom)},n.BeginDrag=function(t){this.down=it(t,this.canvas),t.cancelBubble=!0,t.returnValue=!1,t.preventDefault&&t.preventDefault()},n.Drag=function(t,i){if(this.dragControl&&this.down){var e=this.dragThreshold*this.dragThreshold,s=i.x-this.down.x,h=i.y-this.down.y;(this.dragging||s*s+h*h>e)&&(this.dx=s,this.dy=h,this.dragging=1,this.down=i)}return this.dragging},n.EndDrag=function(){var t=this.dragging;return this.dragging=this.down=null,t},n.BeginPinch=function(t){this.pinched=[xt(t),this.zoom],t.preventDefault&&t.preventDefault()},n.Pinch=function(t){var i,e,s=this.pinched;s&&(e=xt(t),i=s[1]*e/s[0],this.zoom=m(this.zoomMax,d(this.zoomMin,i)),this.Zoom(this.zoom))},n.EndPinch=function(t){this.pinched=null},n.Pause=function(){this.paused=!0},n.Resume=function(){this.paused=!1},n.SetSpeed=function(t){this.initial=t,this.yaw=t[0]*this.maxSpeed,this.pitch=t[1]*this.maxSpeed},n.FindTag=function(t){if(!C(t))return null;if(C(t.index)&&(t=t.index),!z(t))return this.taglist[t];var i,e,s;for(C(t.id)?(i="id",e=t.id):C(t.text)&&(i="innerText",e=t.text),s=0;s<this.taglist.length;++s)if(this.taglist[s].a[i]==e)return this.taglist[s]},n.RotateTag=function(t,i,e,s,h,n){var a=t.Calc(this.transform,1),o=new F(a.x,a.y,a.z),r=function(t,i){return i=i*Math.PI/180,t=t*Math.PI/180,new F(c(t)*f(i),-c(i),-f(t)*f(i))}(e,i),l=o.angle(r),u=o.cross(r).unit();0==l?(this.fixedCallbackTag=t,this.fixedCallback=h):this.fixedAnim={angle:-l,axis:u,t:s,t0:I(),cb:h,tag:t,active:n}},n.TagToFront=function(t,i,e,s){this.RotateTag(t,0,0,i,e,s)},wt.Start=function(t,i,e){wt.Delete(t),wt.tc[t]=new wt(t,i,e)},wt.Linear=function(t,i){return i/t},wt.Smooth=function(t,i){return.5-f(i*Math.PI/t)/2},wt.Pause=function(t){vt("Pause",t)},wt.Resume=function(t){vt("Resume",t)},wt.Reload=function(t){vt("Load",t)},wt.Update=function(t){vt("Update",t)},wt.SetSpeed=function(t,i){return!(!z(i)||!wt.tc[t]||isNaN(i[0])||isNaN(i[1]))&&(wt.tc[t].SetSpeed(i),!0)},wt.TagToFront=function(t,i){return!!z(i)&&(i.lat=i.lng=0,wt.RotateTag(t,i))},wt.RotateTag=function(t,i){if(z(i)&&wt.tc[t]){isNaN(i.time)&&(i.time=500);var e=wt.tc[t].FindTag(i);if(e)return wt.tc[t].RotateTag(e,i.lat,i.lng,i.time,i.callback,i.active),!0}return!1},wt.Delete=function(t){var i,e,s,h,n;if(b[t]&&(e=S.getElementById(t)))for(i=0;i<b[t].length;++i)s=b[t][i][0],h=b[t][i][1],(n=(n=e)||S).removeEventListener?n.removeEventListener(s,h):n.detachEvent("on"+s,h);delete b[t],delete wt.tc[t]},wt.NextFrameRAF=function(){requestAnimationFrame(ct)},wt.NextFrameTimeout=function(t){setTimeout(gt,t)},wt.tc={},wt.options={z1:2e4,z2:2e4,z0:2e-4,freezeActive:!1,freezeDecel:!1,activeCursor:"pointer",pulsateTo:1,pulsateTime:3,reverse:!1,depth:.5,maxSpeed:.05,minSpeed:0,decel:.95,interval:20,minBrightness:.1,maxBrightness:1,outlineColour:"#ffff99",outlineThickness:2,outlineOffset:5,outlineMethod:"outline",outlineRadius:0,textColour:"#ff99ff",textHeight:15,textFont:"Helvetica, Arial, sans-serif",shadow:"#000",shadowBlur:0,shadowOffset:[0,0],initial:null,hideTags:!0,zoom:1,weight:!1,weightMode:"size",weightFrom:null,weightSize:1,weightSizeMin:null,weightSizeMax:null,weightGradient:{0:"#f00",.33:"#ff0",.66:"#0f0",1:"#00f"},txtOpt:!0,txtScale:2,frontSelect:!1,wheelZoom:!0,zoomMin:.3,zoomMax:3,zoomStep:.05,shape:"sphere",lock:null,tooltip:null,tooltipDelay:300,tooltipClass:"tctooltip",radiusX:1,radiusY:1,radiusZ:1,stretchX:1,stretchY:1,offsetX:0,offsetY:0,shuffleTags:!1,noSelect:!1,noMouse:!1,imageScale:1,paused:!1,dragControl:!1,dragThreshold:4,centreFunc:A,splitWidth:0,animTiming:"Smooth",clickToFront:!1,fadeIn:0,padding:0,bgColour:null,bgRadius:0,bgOutline:null,bgOutlineThickness:0,outlineIncrease:4,textAlign:"centre",textVAlign:"middle",imageMode:null,imagePosition:null,imagePadding:2,imageAlign:"centre",imageVAlign:"middle",noTagsMessage:!0,centreImage:null,pinchZoom:!1,repeatTags:0,minTags:0,imageRadius:0,scrollPause:!1,outlineDash:0,outlineDashSpace:0,outlineDashSpeed:1},wt.options)wt[i]=wt.options[i];window.TagCanvas=wt,jQuery.fn.tagcanvas=function(i,e){var s={pause:function(){t(this).each(function(){vt("Pause",t(this)[0].id)})},resume:function(){t(this).each(function(){vt("Resume",t(this)[0].id)})},reload:function(){t(this).each(function(){vt("Load",t(this)[0].id)})},update:function(){t(this).each(function(){vt("Update",t(this)[0].id)})},tagtofront:function(){t(this).each(function(){wt.TagToFront(t(this)[0].id,e)})},rotatetag:function(){t(this).each(function(){wt.RotateTag(t(this)[0].id,e)})},delete:function(){t(this).each(function(){wt.Delete(t(this)[0].id)})},setspeed:function(){t(this).each(function(){wt.SetSpeed(t(this)[0].id,e)})}};return"string"==typeof i&&s[i]?(s[i].apply(this),this):(wt.jquery=1,t(this).each(function(){wt.Start(t(this)[0].id,e,i)}),wt.started)},Q("load",function(){wt.loaded=1},window)}(jQuery);
/**
 * Copyright (C) 2010-2015 Graham Breach
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
/**
 * TagCanvas 2.9
 * For more information, please contact <graham@goat1000.com>
 */
(function(){var M,K,L=Math.abs,ah=Math.sin,w=Math.cos,s=Math.max,aD=Math.min,ap=Math.ceil,F=Math.sqrt,at=Math.pow,h={},l={},m={0:"0,",1:"17,",2:"34,",3:"51,",4:"68,",5:"85,",6:"102,",7:"119,",8:"136,",9:"153,",a:"170,",A:"170,",b:"187,",B:"187,",c:"204,",C:"204,",d:"221,",D:"221,",e:"238,",E:"238,",f:"255,",F:"255,"},x,c,Q,aF,H,aG,aa,C=document,p,b={};for(M=0;M<256;++M){K=M.toString(16);if(M<16){K="0"+K}l[K]=l[K.toUpperCase()]=M.toString()+","}function ai(i){return typeof i!="undefined"}function I(i){return typeof i=="object"&&i!=null}function av(i,j,aH){return isNaN(i)?aH:aD(aH,s(j,i))}function aA(){return false}function G(){return new Date().valueOf()}function A(aH,aK){var j=[],aI=aH.length,aJ;for(aJ=0;aJ<aI;++aJ){j.push(aH[aJ])}j.sort(aK);return j}function an(j){var aI=j.length-1,aH,aJ;while(aI){aJ=~~(Math.random()*aI);aH=j[aI];j[aI]=j[aJ];j[aJ]=aH;--aI}}function ae(i,aH,j){this.x=i;this.y=aH;this.z=j}H=ae.prototype;H.length=function(){return F(this.x*this.x+this.y*this.y+this.z*this.z)};H.dot=function(i){return this.x*i.x+this.y*i.y+this.z*i.z};H.cross=function(j){var i=this.y*j.z-this.z*j.y,aI=this.z*j.x-this.x*j.z,aH=this.x*j.y-this.y*j.x;return new ae(i,aI,aH)};H.angle=function(j){var i=this.dot(j),aH;if(i==0){return Math.PI/2}aH=i/(this.length()*j.length());if(aH>=1){return 0}if(aH<=-1){return Math.PI}return Math.acos(aH)};H.unit=function(){var i=this.length();return new ae(this.x/i,this.y/i,this.z/i)};function aj(aH,j){j=j*Math.PI/180;aH=aH*Math.PI/180;var i=ah(aH)*w(j),aJ=-ah(j),aI=-w(aH)*w(j);return new ae(i,aJ,aI)}function R(i){this[1]={1:i[0],2:i[1],3:i[2]};this[2]={1:i[3],2:i[4],3:i[5]};this[3]={1:i[6],2:i[7],3:i[8]}}aF=R.prototype;R.Identity=function(){return new R([1,0,0,0,1,0,0,0,1])};R.Rotation=function(aI,i){var j=ah(aI),aH=w(aI),aJ=1-aH;return new R([aH+at(i.x,2)*aJ,i.x*i.y*aJ-i.z*j,i.x*i.z*aJ+i.y*j,i.y*i.x*aJ+i.z*j,aH+at(i.y,2)*aJ,i.y*i.z*aJ-i.x*j,i.z*i.x*aJ-i.y*j,i.z*i.y*aJ+i.x*j,aH+at(i.z,2)*aJ])};aF.mul=function(aH){var aI=[],aL,aK,aJ=(aH.xform?1:0);for(aL=1;aL<=3;++aL){for(aK=1;aK<=3;++aK){if(aJ){aI.push(this[aL][1]*aH[1][aK]+this[aL][2]*aH[2][aK]+this[aL][3]*aH[3][aK])}else{aI.push(this[aL][aK]*aH)}}}return new R(aI)};aF.xform=function(aH){var j={},i=aH.x,aJ=aH.y,aI=aH.z;j.x=i*this[1][1]+aJ*this[2][1]+aI*this[3][1];j.y=i*this[1][2]+aJ*this[2][2]+aI*this[3][2];j.z=i*this[1][3]+aJ*this[2][3]+aI*this[3][3];return j};function q(aI,aK,aQ,aN,aP){var aL,aO,j,aM,aR=[],aH=2/aI,aJ;aJ=Math.PI*(3-F(5)+(parseFloat(aP)?parseFloat(aP):0));for(aL=0;aL<aI;++aL){aO=aL*aH-1+(aH/2);j=F(1-aO*aO);aM=aL*aJ;aR.push([w(aM)*j*aK,aO*aQ,ah(aM)*j*aN])}return aR}function W(aJ,aH,aM,aT,aQ,aS){var aR,aU=[],aI=2/aJ,aK,aP,aO,aN,aL;aK=Math.PI*(3-F(5)+(parseFloat(aS)?parseFloat(aS):0));for(aP=0;aP<aJ;++aP){aO=aP*aI-1+(aI/2);aR=aP*aK;aN=w(aR);aL=ah(aR);aU.push(aH?[aO*aM,aN*aT,aL*aQ]:[aN*aM,aO*aT,aL*aQ])}return aU}function N(aH,aI,aL,aR,aP,aN){var aQ,aS=[],aJ=Math.PI*2/aI,aO,aM,aK;for(aO=0;aO<aI;++aO){aQ=aO*aJ;aM=w(aQ);aK=ah(aQ);aS.push(aH?[aN*aL,aM*aR,aK*aP]:[aM*aL,aN*aR,aK*aP])}return aS}function am(aJ,j,aH,aI,i){return W(aJ,0,j,aH,aI,i)}function au(aJ,j,aH,aI,i){return W(aJ,1,j,aH,aI,i)}function d(aJ,i,j,aH,aI){aI=isNaN(aI)?0:aI*1;return N(0,aJ,i,j,aH,aI)}function n(aJ,i,j,aH,aI){aI=isNaN(aI)?0:aI*1;return N(1,aJ,i,j,aH,aI)}function ao(aH){var j=new Image;j.onload=function(){var aI=j.width/2,i=j.height/2;aH.centreFunc=function(aN,aK,aL,aJ,aM){aN.setTransform(1,0,0,1,0,0);aN.globalAlpha=1;aN.drawImage(j,aJ-aI,aM-i)}};j.src=aH.centreImage}function U(aK,i){var aJ=aK,aI,aH,j=(i*1).toPrecision(3)+")";if(aK[0]==="#"){if(!h[aK]){if(aK.length===4){h[aK]="rgba("+m[aK[1]]+m[aK[2]]+m[aK[3]]}else{h[aK]="rgba("+l[aK.substr(1,2)]+l[aK.substr(3,2)]+l[aK.substr(5,2)]}}aJ=h[aK]+j}else{if(aK.substr(0,4)==="rgb("||aK.substr(0,4)==="hsl("){aJ=(aK.replace("(","a(").replace(")",","+j))}else{if(aK.substr(0,5)==="rgba("||aK.substr(0,5)==="hsla("){aI=aK.lastIndexOf(",")+1,aH=aK.indexOf(")");i*=parseFloat(aK.substring(aI,aH));aJ=aK.substr(0,aI)+i.toPrecision(3)+")"}}}return aJ}function P(i,j){if(window.G_vmlCanvasManager){return null}var aH=C.createElement("canvas");aH.width=i;aH.height=j;return aH}function al(){var j=P(3,3),aI,aH;if(!j){return false}aI=j.getContext("2d");aI.strokeStyle="#000";aI.shadowColor="#fff";aI.shadowBlur=3;aI.globalAlpha=0;aI.strokeRect(2,2,2,2);aI.globalAlpha=1;aH=aI.getImageData(2,2,1,1);j=null;return(aH.data[0]>0)}function ak(aL,j,aK,aJ){var aI=aL.createLinearGradient(0,0,j,0),aH;for(aH in aJ){aI.addColorStop(1-aH,aJ[aH])}aL.fillStyle=aI;aL.fillRect(0,aK,j,1)}function k(aJ,aH,j){var aI=1024,aN=1,aM=aJ.weightGradient,aL,aP,aK,aO;if(aJ.gCanvas){aP=aJ.gCanvas.getContext("2d");aN=aJ.gCanvas.height}else{if(I(aM[0])){aN=aM.length}else{aM=[aM]}aJ.gCanvas=aL=P(aI,aN);if(!aL){return null}aP=aL.getContext("2d");for(aK=0;aK<aN;++aK){ak(aP,aI,aK,aM[aK])}}j=s(aD(j||0,aN-1),0);aO=aP.getImageData(~~((aI-1)*aH),j,1,1).data;return"rgba("+aO[0]+","+aO[1]+","+aO[2]+","+(aO[3]/255)+")"}function X(aQ,aJ,j,aU,aT,aR,aP,aL,aI,aS,aK,aO){var aN=aT+(aL||0)+(aI.length&&aI[0]<0?L(aI[0]):0),aH=aR+(aL||0)+(aI.length&&aI[1]<0?L(aI[1]):0),aM,aV;aQ.font=aJ;aQ.textBaseline="top";aQ.fillStyle=j;aP&&(aQ.shadowColor=aP);aL&&(aQ.shadowBlur=aL);aI.length&&(aQ.shadowOffsetX=aI[0],aQ.shadowOffsetY=aI[1]);for(aM=0;aM<aU.length;++aM){aV=0;if(aK){if("right"==aO){aV=aS-aK[aM]}else{if("centre"==aO){aV=(aS-aK[aM])/2}}}aQ.fillText(aU[aM],aN+aV,aH);aH+=parseInt(aJ)}}function ar(aL,i,aK,j,aI,aJ,aH){if(aJ){aL.beginPath();aL.moveTo(i,aK+aI-aJ);aL.arcTo(i,aK,i+aJ,aK,aJ);aL.arcTo(i+j,aK,i+j,aK+aJ,aJ);aL.arcTo(i+j,aK+aI,i+j-aJ,aK+aI,aJ);aL.arcTo(i,aK+aI,i,aK+aI-aJ,aJ);aL.closePath();aL[aH?"stroke":"fill"]()}else{aL[aH?"strokeRect":"fillRect"](i,aK,j,aI)}}function g(aN,i,aL,aI,aM,aH,aJ,aK,j){this.strings=aN;this.font=i;this.width=aL;this.height=aI;this.maxWidth=aM;this.stringWidths=aH;this.align=aJ;this.valign=aK;this.scale=j}aa=g.prototype;aa.SetImage=function(aK,j,aI,i,aJ,aM,aH,aL){this.image=aK;this.iwidth=j*this.scale;this.iheight=aI*this.scale;this.ipos=i;this.ipad=aJ*this.scale;this.iscale=aL;this.ialign=aM;this.ivalign=aH};aa.Align=function(j,aH,i){var aI=0;if(i=="right"||i=="bottom"){aI=aH-j}else{if(i!="left"&&i!="top"){aI=(aH-j)/2}}return aI};aa.Create=function(aU,a0,aT,a1,aZ,aY,i,aX,aP){var aN,aL,aV,a6,a3,a2,aJ,aI,aH,j,aM,aK,aO,aW,aS,a5=L(i[0]),a4=L(i[1]),aQ,aR;aX=s(aX,a5+aY,a4+aY);a3=2*(aX+a1);aJ=2*(aX+a1);aL=this.width+a3;aV=this.height+aJ;aH=j=aX+a1;if(this.image){aM=aK=aX+a1;aO=this.iwidth;aW=this.iheight;if(this.ipos=="top"||this.ipos=="bottom"){if(aO<this.width){aM+=this.Align(aO,this.width,this.ialign)}else{aH+=this.Align(this.width,aO,this.align)}if(this.ipos=="top"){j+=aW+this.ipad}else{aK+=this.height+this.ipad}aL=s(aL,aO+a3);aV+=aW+this.ipad}else{if(aW<this.height){aK+=this.Align(aW,this.height,this.ivalign)}else{j+=this.Align(this.height,aW,this.valign)}if(this.ipos=="right"){aM+=this.width+this.ipad}else{aH+=aO+this.ipad}aL+=aO+this.ipad;aV=s(aV,aW+aJ)}}aN=P(aL,aV);if(!aN){return null}a3=aJ=a1/2;a2=aL-a1;aI=aV-a1;aS=aD(aP,a2/2,aI/2);a6=aN.getContext("2d");if(a0){a6.fillStyle=a0;ar(a6,a3,aJ,a2,aI,aS)}if(a1){a6.strokeStyle=aT;a6.lineWidth=a1;ar(a6,a3,aJ,a2,aI,aS,true)}if(aY||a5||a4){aQ=P(aL,aV);if(aQ){aR=a6;a6=aQ.getContext("2d")}}X(a6,this.font,aU,this.strings,aH,j,0,0,[],this.maxWidth,this.stringWidths,this.align);if(this.image){a6.drawImage(this.image,aM,aK,aO,aW)}if(aR){a6=aR;aZ&&(a6.shadowColor=aZ);aY&&(a6.shadowBlur=aY);a6.shadowOffsetX=i[0];a6.shadowOffsetY=i[1];a6.drawImage(aQ,0,0)}return aN};function v(aI,j,aJ){var aH=P(j,aJ),aK;if(!aH){return null}aK=aH.getContext("2d");aK.drawImage(aI,(j-aI.width)/2,(aJ-aI.height)/2);return aH}function ax(aI,j,aJ){var aH=P(j,aJ),aK;if(!aH){return null}aK=aH.getContext("2d");aK.drawImage(aI,0,0,j,aJ);return aH}function aC(aU,aP,aV,aZ,aQ,aO,aM,aS,aK,aL){var aI=aP+((2*aS)+aO)*aZ,aR=aV+((2*aS)+aO)*aZ,aJ=P(aI,aR),aY,aX,aH,aW,j,a0,aT,aN;if(!aJ){return null}aO*=aZ;aK*=aZ;aX=aH=aO/2;aW=aI-aO;j=aR-aO;aS=(aS*aZ)+aX;aY=aJ.getContext("2d");aN=aD(aK,aW/2,j/2);if(aQ){aY.fillStyle=aQ;ar(aY,aX,aH,aW,j,aN)}if(aO){aY.strokeStyle=aM;aY.lineWidth=aO;ar(aY,aX,aH,aW,j,aN,true)}if(aL){a0=P(aI,aR);aT=a0.getContext("2d");aT.drawImage(aU,aS,aS,aP,aV);aT.globalCompositeOperation="source-in";aT.fillStyle=aM;aT.fillRect(0,0,aI,aR);aT.globalCompositeOperation="destination-over";aT.drawImage(aJ,0,0);aT.globalCompositeOperation="source-over";aY.drawImage(a0,0,0)}else{aY.drawImage(aU,aS,aS,aU.width,aU.height)}return{image:aJ,width:aI/aZ,height:aR/aZ}}function aq(aK,j,aJ,aN,aO){var aL,aM,aH=parseFloat(j),aI=s(aJ,aN);aL=P(aJ,aN);if(!aL){return null}if(j.indexOf("%")>0){aH=aI*aH/100}else{aH=aH*aO}aM=aL.getContext("2d");aM.globalCompositeOperation="source-over";aM.fillStyle="#fff";if(aH>=aI/2){aH=aD(aJ,aN)/2;aM.beginPath();aM.moveTo(aJ/2,aN/2);aM.arc(aJ/2,aN/2,aH,0,2*Math.PI,false);aM.fill();aM.closePath()}else{aH=aD(aJ/2,aN/2,aH);ar(aM,0,0,aJ,aN,aH,true);aM.fill()}aM.globalCompositeOperation="source-in";aM.drawImage(aK,0,0,aJ,aN);return aL}function Z(aN,aT,aP,aJ,aR,aS,aI){var aU=L(aI[0]),aO=L(aI[1]),aK=aT+(aU>aS?aU+aS:aS*2)*aJ,j=aP+(aO>aS?aO+aS:aS*2)*aJ,aM=aJ*((aS||0)+(aI[0]<0?aU:0)),aH=aJ*((aS||0)+(aI[1]<0?aO:0)),aL,aQ;aL=P(aK,j);if(!aL){return null}aQ=aL.getContext("2d");aR&&(aQ.shadowColor=aR);aS&&(aQ.shadowBlur=aS*aJ);aI&&(aQ.shadowOffsetX=aI[0]*aJ,aQ.shadowOffsetY=aI[1]*aJ);aQ.drawImage(aN,aM,aH,aT,aP);return{image:aL,width:aK/aJ,height:j/aJ}}function t(aT,aL,aR){var aS=parseInt(aT.toString().length*aR),aK=parseInt(aR*2*aT.length),aI=P(aS,aK),aO,j,aJ,aN,aQ,aP,aH,aM;if(!aI){return null}aO=aI.getContext("2d");aO.fillStyle="#000";aO.fillRect(0,0,aS,aK);X(aO,aR+"px "+aL,"#fff",aT,0,0,0,0,[],"centre");j=aO.getImageData(0,0,aS,aK);aJ=j.width;aN=j.height;aM={min:{x:aJ,y:aN},max:{x:-1,y:-1}};for(aP=0;aP<aN;++aP){for(aQ=0;aQ<aJ;++aQ){aH=(aP*aJ+aQ)*4;if(j.data[aH+1]>0){if(aQ<aM.min.x){aM.min.x=aQ}if(aQ>aM.max.x){aM.max.x=aQ}if(aP<aM.min.y){aM.min.y=aP}if(aP>aM.max.y){aM.max.y=aP}}}}if(aJ!=aS){aM.min.x*=(aS/aJ);aM.max.x*=(aS/aJ)}if(aN!=aK){aM.min.y*=(aS/aN);aM.max.y*=(aS/aN)}aI=null;return aM}function o(i){return"'"+i.replace(/(\'|\")/g,"").replace(/\s*,\s*/g,"', '")+"'"}function ad(i,j,aH){aH=aH||C;if(aH.addEventListener){aH.addEventListener(i,j,false)}else{aH.attachEvent("on"+i,j)}}function a(i,j,aH){aH=aH||C;if(aH.removeEventListener){aH.removeEventListener(i,j)}else{aH.detachEvent("on"+i,j)}}function aw(aL,aH,aP,aK){var aQ=aK.imageScale,aN,aI,aM,j,aJ,aO;if(!aH.complete){return ad("load",function(){aw(aL,aH,aP,aK)},aH)}if(!aL.complete){return ad("load",function(){aw(aL,aH,aP,aK)},aL)}aH.width=aH.width;aH.height=aH.height;if(aQ){aL.width=aH.width*aQ;aL.height=aH.height*aQ}aP.iw=aL.width;aP.ih=aL.height;if(aK.txtOpt){aI=aL;aN=aK.zoomMax*aK.txtScale;aJ=aP.iw*aN;aO=aP.ih*aN;if(aJ<aH.naturalWidth||aO<aH.naturalHeight){aI=ax(aL,aJ,aO);if(aI){aP.fimage=aI}}else{aJ=aP.iw;aO=aP.ih;aN=1}if(parseFloat(aK.imageRadius)){aP.image=aP.fimage=aL=aq(aP.image,aK.imageRadius,aJ,aO,aN)}if(!aP.HasText()){if(aK.shadow){aI=Z(aP.image,aJ,aO,aN,aK.shadow,aK.shadowBlur,aK.shadowOffset);if(aI){aP.fimage=aI.image;aP.w=aI.width;aP.h=aI.height}}if(aK.bgColour||aK.bgOutlineThickness){aM=aK.bgColour=="tag"?Y(aP.a,"background-color"):aK.bgColour;j=aK.bgOutline=="tag"?Y(aP.a,"color"):(aK.bgOutline||aK.textColour);aJ=aP.fimage.width;aO=aP.fimage.height;if(aK.outlineMethod=="colour"){aI=aC(aP.fimage,aJ,aO,aN,aM,aK.bgOutlineThickness,aP.outline.colour,aK.padding,aK.bgRadius,1);if(aI){aP.oimage=aI.image}}aI=aC(aP.fimage,aJ,aO,aN,aM,aK.bgOutlineThickness,j,aK.padding,aK.bgRadius);if(aI){aP.fimage=aI.image;aP.w=aI.width;aP.h=aI.height}}if(aK.outlineMethod=="size"){if(aK.outlineIncrease>0){aP.iw+=2*aK.outlineIncrease;aP.ih+=2*aK.outlineIncrease;aJ=aN*aP.iw;aO=aN*aP.ih;aI=ax(aP.fimage,aJ,aO);aP.oimage=aI;aP.fimage=v(aP.fimage,aP.oimage.width,aP.oimage.height)}else{aJ=aN*(aP.iw+(2*aK.outlineIncrease));aO=aN*(aP.ih+(2*aK.outlineIncrease));aI=ax(aP.fimage,aJ,aO);aP.oimage=v(aI,aP.fimage.width,aP.fimage.height)}}}}aP.Init()}function Y(aI,aH){var j=C.defaultView,i=aH.replace(/\-([a-z])/g,function(aJ){return aJ.charAt(1).toUpperCase()});return(j&&j.getComputedStyle&&j.getComputedStyle(aI,null).getPropertyValue(aH))||(aI.currentStyle&&aI.currentStyle[i])}function u(j,aI,aH){var i=1,aJ;if(aI){i=1*(j.getAttribute(aI)||aH)}else{if(aJ=Y(j,"font-size")){i=(aJ.indexOf("px")>-1&&aJ.replace("px","")*1)||(aJ.indexOf("pt")>-1&&aJ.replace("pt","")*1.25)||aJ*3.3}}return i}function f(i){return i.target&&ai(i.target.id)?i.target.id:i.srcElement.parentNode.id}function S(aJ,aK){var aI,aH,i=parseInt(Y(aK,"width"))/aK.width,j=parseInt(Y(aK,"height"))/aK.height;if(ai(aJ.offsetX)){aI={x:aJ.offsetX,y:aJ.offsetY}}else{aH=ab(aK.id);if(ai(aJ.changedTouches)){aJ=aJ.changedTouches[0]}if(aJ.pageX){aI={x:aJ.pageX-aH.x,y:aJ.pageY-aH.y}}}if(aI&&i&&j){aI.x/=i;aI.y/=j}return aI}function B(aH){var j=aH.target||aH.fromElement.parentNode,i=y.tc[j.id];if(i){i.mx=i.my=-1;i.UnFreeze();i.EndDrag()}}function af(aL){var aI,aH=y,j,aK,aJ=f(aL);for(aI in aH.tc){j=aH.tc[aI];if(j.tttimer){clearTimeout(j.tttimer);j.tttimer=null}}if(aJ&&aH.tc[aJ]){j=aH.tc[aJ];if(aK=S(aL,j.canvas)){j.mx=aK.x;j.my=aK.y;j.Drag(aL,aK)}j.drawn=0}}function z(aI){var j=y,i=C.addEventListener?0:1,aH=f(aI);if(aH&&aI.button==i&&j.tc[aH]){j.tc[aH].BeginDrag(aI)}}function aE(aJ){var aH=y,j=C.addEventListener?0:1,aI=f(aJ),i;if(aI&&aJ.button==j&&aH.tc[aI]){i=aH.tc[aI];af(aJ);if(!i.EndDrag()&&!i.touchState){i.Clicked(aJ)}}}function T(aI){var j=f(aI),i=(j&&y.tc[j]),aH;if(i&&aI.changedTouches){if(aI.touches.length==1&&i.touchState==0){i.touchState=1;i.BeginDrag(aI);if(aH=S(aI,i.canvas)){i.mx=aH.x;i.my=aH.y;i.drawn=0}}else{if(aI.targetTouches.length==2&&i.pinchZoom){i.touchState=3;i.EndDrag();i.BeginPinch(aI)}else{i.EndDrag();i.EndPinch();i.touchState=0}}}}function r(aH){var j=f(aH),i=(j&&y.tc[j]);if(i&&aH.changedTouches){switch(i.touchState){case 1:i.Draw();i.Clicked();break;case 2:i.EndDrag();break;case 3:i.EndPinch()}i.touchState=0}}function az(aL){var aI,aH=y,j,aK,aJ=f(aL);for(aI in aH.tc){j=aH.tc[aI];if(j.tttimer){clearTimeout(j.tttimer);j.tttimer=null}}j=(aJ&&aH.tc[aJ]);if(j&&aL.changedTouches&&j.touchState){switch(j.touchState){case 1:case 2:if(aK=S(aL,j.canvas)){j.mx=aK.x;j.my=aK.y;if(j.Drag(aL,aK)){j.touchState=2}}break;case 3:j.Pinch(aL)}j.drawn=0}}function ag(aH){var i=y,j=f(aH);if(j&&i.tc[j]){aH.cancelBubble=true;aH.returnValue=false;aH.preventDefault&&aH.preventDefault();i.tc[j].Wheel((aH.wheelDelta||aH.detail)>0)}}function ac(aI){var aH,j=y;clearTimeout(j.scrollTimer);for(aH in j.tc){j.tc[aH].Pause()}j.scrollTimer=setTimeout(function(){var aK,aJ=y;for(aK in aJ.tc){aJ.tc[aK].Resume()}},j.scrollPause)}function O(){E(G())}function E(aI){var j=y.tc,aH;y.NextFrame(y.interval);aI=aI||G();for(aH in j){j[aH].Draw(aI)}}function ab(aH){var aK=C.getElementById(aH),i=aK.getBoundingClientRect(),aN=C.documentElement,aL=C.body,aM=window,aI=aM.pageXOffset||aN.scrollLeft,aO=aM.pageYOffset||aN.scrollTop,aJ=aN.clientLeft||aL.clientLeft,j=aN.clientTop||aL.clientTop;return{x:i.left+aI-aJ,y:i.top+aO-j}}function V(j,aI,aJ,aH){var i=j.radius*j.z1/(j.z1+j.z2+aI.z);return{x:aI.x*i*aJ,y:aI.y*i*aH,z:aI.z,w:(j.z1-aI.z)/j.z2}}function aB(i){this.e=i;this.br=0;this.line=[];this.text=[];this.original=i.innerText||i.textContent}aG=aB.prototype;aG.Empty=function(){for(var j=0;j<this.text.length;++j){if(this.text[j].length){return false}}return true};aG.Lines=function(aJ){var aI=aJ?1:0,aK,j,aH;aJ=aJ||this.e;aK=aJ.childNodes;j=aK.length;for(aH=0;aH<j;++aH){if(aK[aH].nodeName=="BR"){this.text.push(this.line.join(" "));this.br=1}else{if(aK[aH].nodeType==3){if(this.br){this.line=[aK[aH].nodeValue];this.br=0}else{this.line.push(aK[aH].nodeValue)}}else{this.Lines(aK[aH])}}}aI||this.br||this.text.push(this.line.join(" "));return this.text};aG.SplitWidth=function(aH,aO,aL,aK){var aJ,aI,aN,aM=[];aO.font=aK+"px "+aL;for(aJ=0;aJ<this.text.length;++aJ){aN=this.text[aJ].split(/\s+/);this.line=[aN[0]];for(aI=1;aI<aN.length;++aI){if(aO.measureText(this.line.join(" ")+" "+aN[aI]).width>aH){aM.push(this.line.join(" "));this.line=[aN[aI]]}else{this.line.push(aN[aI])}}aM.push(this.line.join(" "))}return this.text=aM};function J(i,j){this.ts=null;this.tc=i;this.tag=j;this.x=this.y=this.w=this.h=this.sc=1;this.z=0;this.pulse=1;this.pulsate=i.pulsateTo<1;this.colour=i.outlineColour;this.adash=~~i.outlineDash;this.agap=~~i.outlineDashSpace||this.adash;this.aspeed=i.outlineDashSpeed*1;if(this.colour=="tag"){this.colour=Y(j.a,"color")}else{if(this.colour=="tagbg"){this.colour=Y(j.a,"background-color")}}this.Draw=this.pulsate?this.DrawPulsate:this.DrawSimple;this.radius=i.outlineRadius|0;this.SetMethod(i.outlineMethod)}x=J.prototype;x.SetMethod=function(aH){var j={block:["PreDraw","DrawBlock"],colour:["PreDraw","DrawColour"],outline:["PostDraw","DrawOutline"],classic:["LastDraw","DrawOutline"],size:["PreDraw","DrawSize"],none:["LastDraw"]},i=j[aH]||j.outline;if(aH=="none"){this.Draw=function(){return 1}}else{this.drawFunc=this[i[1]]}this[i[0]]=this.Draw};x.Update=function(aN,aM,aO,aJ,aK,aL,aI,i){var j=this.tc.outlineOffset,aH=2*j;this.x=aK*aN+aI-j;this.y=aK*aM+i-j;this.w=aK*aO+aH;this.h=aK*aJ+aH;this.sc=aK;this.z=aL};x.Ants=function(aM){if(!this.adash){return}var aJ=this.adash,aL=this.agap,aP=this.aspeed,j=aJ+aL,aK=0,aI=aJ,i=aL,aO=0,aN=0,aH;if(aP){aN=L(aP)*(G()-this.ts)/50;if(aP<0){aN=8640000-aN}aP=~~aN%j}if(aP){if(aJ>=aP){aK=aJ-aP;aI=aP}else{i=j-aP;aO=aL-i}aH=[aK,i,aI,aO]}else{aH=[aJ,aL]}aM.setLineDash(aH)};x.DrawOutline=function(aL,i,aK,j,aH,aJ){var aI=aD(this.radius,aH/2,j/2);aL.strokeStyle=aJ;this.Ants(aL);ar(aL,i,aK,j,aH,aI,true)};x.DrawSize=function(aO,aR,aP,aS,aM,j,aT,aI,aQ){var aL=aT.w,aH=aT.h,aJ,aK,aN;if(this.pulsate){if(aT.image){aN=(aT.image.height+this.tc.outlineIncrease)/aT.image.height}else{aN=aT.oscale}aK=aT.fimage||aT.image;aJ=1+((aN-1)*(1-this.pulse));aT.h*=aJ;aT.w*=aJ}else{aK=aT.oimage}aT.alpha=1;aT.Draw(aO,aI,aQ,aK);aT.h=aH;aT.w=aL;return 1};x.DrawColour=function(aI,aL,aJ,aM,aH,i,aN,j,aK){if(aN.oimage){if(this.pulse<1){aN.alpha=1-at(this.pulse,2);aN.Draw(aI,j,aK,aN.fimage);aN.alpha=this.pulse}else{aN.alpha=1}aN.Draw(aI,j,aK,aN.oimage);return 1}return this[aN.image?"DrawColourImage":"DrawColourText"](aI,aL,aJ,aM,aH,i,aN,j,aK)};x.DrawColourText=function(aJ,aM,aK,aN,aH,i,aO,j,aL){var aI=aO.colour;aO.colour=i;aO.alpha=1;aO.Draw(aJ,j,aL);aO.colour=aI;return 1};x.DrawColourImage=function(aM,aP,aN,aQ,aL,i,aT,j,aO){var aR=aM.canvas,aJ=~~s(aP,0),aI=~~s(aN,0),aK=aD(aR.width-aJ,aQ)+0.5|0,aS=aD(aR.height-aI,aL)+0.5|0,aH;if(p){p.width=aK,p.height=aS}else{p=P(aK,aS)}if(!p){return this.SetMethod("outline")}aH=p.getContext("2d");aH.drawImage(aR,aJ,aI,aK,aS,0,0,aK,aS);aM.clearRect(aJ,aI,aK,aS);if(this.pulsate){aT.alpha=1-at(this.pulse,2)}else{aT.alpha=1}aT.Draw(aM,j,aO);aM.setTransform(1,0,0,1,0,0);aM.save();aM.beginPath();aM.rect(aJ,aI,aK,aS);aM.clip();aM.globalCompositeOperation="source-in";aM.fillStyle=i;aM.fillRect(aJ,aI,aK,aS);aM.restore();aM.globalAlpha=1;aM.globalCompositeOperation="destination-over";aM.drawImage(p,0,0,aK,aS,aJ,aI,aK,aS);aM.globalCompositeOperation="source-over";return 1};x.DrawBlock=function(aL,i,aK,j,aH,aJ){var aI=aD(this.radius,aH/2,j/2);aL.fillStyle=aJ;ar(aL,i,aK,j,aH,aI)};x.DrawSimple=function(aL,i,j,aI,aK,aJ){var aH=this.tc;aL.setTransform(1,0,0,1,0,0);aL.strokeStyle=this.colour;aL.lineWidth=aH.outlineThickness;aL.shadowBlur=aL.shadowOffsetX=aL.shadowOffsetY=0;aL.globalAlpha=aJ?aK:1;return this.drawFunc(aL,this.x,this.y,this.w,this.h,this.colour,i,j,aI)};x.DrawPulsate=function(aL,i,j,aI){var aJ=G()-this.ts,aH=this.tc,aK=aH.pulsateTo+((1-aH.pulsateTo)*(0.5+(w(2*Math.PI*aJ/(1000*aH.pulsateTime))/2)));this.pulse=aK=y.Smooth(1,aK);return this.DrawSimple(aL,i,j,aI,aK,1)};x.Active=function(aI,i,aH){var j=(i>=this.x&&aH>=this.y&&i<=this.x+this.w&&aH<=this.y+this.h);if(j){this.ts=this.ts||G()}else{this.ts=null}return j};x.PreDraw=x.PostDraw=x.LastDraw=aA;function e(aI,aS,aO,aR,aP,aJ,aH,aL,aQ,aK,aN,j,aM,i){this.tc=aI;this.image=null;this.text=aS;this.text_original=i;this.line_widths=[];this.title=aO.title||null;this.a=aO;this.position=new ae(aR[0],aR[1],aR[2]);this.x=this.y=this.z=0;this.w=aP;this.h=aJ;this.colour=aH||aI.textColour;this.bgColour=aL||aI.bgColour;this.bgRadius=aQ|0;this.bgOutline=aK||this.colour;this.bgOutlineThickness=aN|0;this.textFont=j||aI.textFont;this.padding=aM|0;this.sc=this.alpha=1;this.weighted=!aI.weight;this.outline=new J(aI,this)}c=e.prototype;c.Init=function(j){var i=this.tc;this.textHeight=i.textHeight;if(this.HasText()){this.Measure(i.ctxt,i)}else{this.w=this.iw;this.h=this.ih}this.SetShadowColour=i.shadowAlpha?this.SetShadowColourAlpha:this.SetShadowColourFixed;this.SetDraw(i)};c.Draw=aA;c.HasText=function(){return this.text&&this.text[0].length>0};c.EqualTo=function(aH){var j=aH.getElementsByTagName("img");if(this.a.href!=aH.href){return 0}if(j.length){return this.image.src==j[0].src}return(aH.innerText||aH.textContent)==this.text_original};c.SetImage=function(j){this.image=this.fimage=j};c.SetDraw=function(i){this.Draw=this.fimage?(i.ie>7?this.DrawImageIE:this.DrawImage):this.DrawText;i.noSelect&&(this.CheckActive=aA)};c.MeasureText=function(aK){var aI,aH=this.text.length,j=0,aJ;for(aI=0;aI<aH;++aI){this.line_widths[aI]=aJ=aK.measureText(this.text[aI]).width;j=s(j,aJ)}return j};c.Measure=function(aM,aP){var aN=t(this.text,this.textFont,this.textHeight),aQ,i,aJ,j,aH,aL,aO,aI,aK;aO=aN?aN.max.y+aN.min.y:this.textHeight;aM.font=this.font=this.textHeight+"px "+this.textFont;aL=this.MeasureText(aM);if(aP.txtOpt){aQ=aP.txtScale;i=aQ*this.textHeight;aJ=i+"px "+this.textFont;j=[aQ*aP.shadowOffset[0],aQ*aP.shadowOffset[1]];aM.font=aJ;aH=this.MeasureText(aM);aK=new g(this.text,aJ,aH+aQ,(aQ*aO)+aQ,aH,this.line_widths,aP.textAlign,aP.textVAlign,aQ);if(this.image){aK.SetImage(this.image,this.iw,this.ih,aP.imagePosition,aP.imagePadding,aP.imageAlign,aP.imageVAlign,aP.imageScale)}aI=aK.Create(this.colour,this.bgColour,this.bgOutline,aQ*this.bgOutlineThickness,aP.shadow,aQ*aP.shadowBlur,j,aQ*this.padding,aQ*this.bgRadius);if(aP.outlineMethod=="colour"){this.oimage=aK.Create(this.outline.colour,this.bgColour,this.outline.colour,aQ*this.bgOutlineThickness,aP.shadow,aQ*aP.shadowBlur,j,aQ*this.padding,aQ*this.bgRadius)}else{if(aP.outlineMethod=="size"){aN=t(this.text,this.textFont,this.textHeight+aP.outlineIncrease);i=aN.max.y+aN.min.y;aJ=(aQ*(this.textHeight+aP.outlineIncrease))+"px "+this.textFont;aM.font=aJ;aH=this.MeasureText(aM);aK=new g(this.text,aJ,aH+aQ,(aQ*i)+aQ,aH,this.line_widths,aP.textAlign,aP.textVAlign,aQ);if(this.image){aK.SetImage(this.image,this.iw+aP.outlineIncrease,this.ih+aP.outlineIncrease,aP.imagePosition,aP.imagePadding,aP.imageAlign,aP.imageVAlign,aP.imageScale)}this.oimage=aK.Create(this.colour,this.bgColour,this.bgOutline,aQ*this.bgOutlineThickness,aP.shadow,aQ*aP.shadowBlur,j,aQ*this.padding,aQ*this.bgRadius);this.oscale=this.oimage.width/aI.width;if(aP.outlineIncrease>0){aI=v(aI,this.oimage.width,this.oimage.height)}else{this.oimage=v(this.oimage,aI.width,aI.height)}}}if(aI){this.fimage=aI;aL=this.fimage.width/aQ;aO=this.fimage.height/aQ}this.SetDraw(aP);aP.txtOpt=!!this.fimage}this.h=aO;this.w=aL};c.SetFont=function(j,aI,aH,i){this.textFont=j;this.colour=aI;this.bgColour=aH;this.bgOutline=i;this.Measure(this.tc.ctxt,this.tc)};c.SetWeight=function(aH){var j=this.tc,aJ=j.weightMode.split(/[, ]/),i,aI,aK=aH.length;if(!this.HasText()){return}this.weighted=true;for(aI=0;aI<aK;++aI){i=aJ[aI]||"size";if("both"==i){this.Weight(aH[aI],j.ctxt,j,"size",j.min_weight[aI],j.max_weight[aI],aI);this.Weight(aH[aI],j.ctxt,j,"colour",j.min_weight[aI],j.max_weight[aI],aI)}else{this.Weight(aH[aI],j.ctxt,j,i,j.min_weight[aI],j.max_weight[aI],aI)}}this.Measure(j.ctxt,j)};c.Weight=function(aH,aM,aI,j,aL,aJ,aK){aH=isNaN(aH)?1:aH;var i=(aH-aL)/(aJ-aL);if("colour"==j){this.colour=k(aI,i,aK)}else{if("bgcolour"==j){this.bgColour=k(aI,i,aK)}else{if("bgoutline"==j){this.bgOutline=k(aI,i,aK)}else{if("outline"==j){this.outline.colour=k(aI,i,aK)}else{if("size"==j){if(aI.weightSizeMin>0&&aI.weightSizeMax>aI.weightSizeMin){this.textHeight=aI.weightSize*(aI.weightSizeMin+(aI.weightSizeMax-aI.weightSizeMin)*i)}else{this.textHeight=s(1,aH*aI.weightSize)}}}}}}};c.SetShadowColourFixed=function(aH,j,i){aH.shadowColor=j};c.SetShadowColourAlpha=function(aH,j,i){aH.shadowColor=U(j,i)};c.DrawText=function(aJ,aM,aI){var aN=this.tc,aL=this.x,aK=this.y,aO=this.sc,j,aH;aJ.globalAlpha=this.alpha;aJ.fillStyle=this.colour;aN.shadow&&this.SetShadowColour(aJ,aN.shadow,this.alpha);aJ.font=this.font;aL+=aM/aO;aK+=(aI/aO)-(this.h/2);for(j=0;j<this.text.length;++j){aH=aL;if("right"==aN.textAlign){aH+=this.w/2-this.line_widths[j]}else{if("centre"==aN.textAlign){aH-=this.line_widths[j]/2}else{aH-=this.w/2}}aJ.setTransform(aO,0,0,aO,aO*aH,aO*aK);aJ.fillText(this.text[j],0,0);aK+=this.textHeight}};c.DrawImage=function(aJ,aQ,aI,aL){var aN=this.x,aK=this.y,aR=this.sc,j=aL||this.fimage,aO=this.w,aH=this.h,aM=this.alpha,aP=this.shadow;aJ.globalAlpha=aM;aP&&this.SetShadowColour(aJ,aP,aM);aN+=(aQ/aR)-(aO/2);aK+=(aI/aR)-(aH/2);aJ.setTransform(aR,0,0,aR,aR*aN,aR*aK);aJ.drawImage(j,0,0,aO,aH)};c.DrawImageIE=function(aJ,aN,aI){var j=this.fimage,aO=this.sc,aM=j.width=this.w*aO,aH=j.height=this.h*aO,aL=(this.x*aO)+aN-(aM/2),aK=(this.y*aO)+aI-(aH/2);aJ.setTransform(1,0,0,1,0,0);aJ.globalAlpha=this.alpha;aJ.drawImage(j,aL,aK)};c.Calc=function(i,aH){var j,aK=this.tc,aJ=aK.minBrightness,aI=aK.maxBrightness,aL=aK.max_radius;j=i.xform(this.position);this.xformed=j;j=V(aK,j,aK.stretchX,aK.stretchY);this.x=j.x;this.y=j.y;this.z=j.z;this.sc=j.w;this.alpha=aH*av(aJ+(aI-aJ)*(aL-this.z)/(2*aL),0,1);return this.xformed};c.UpdateActive=function(aM,aH,aK){var aJ=this.outline,j=this.w,aI=this.h,i=this.x-j/2,aL=this.y-aI/2;aJ.Update(i,aL,j,aI,this.sc,this.z,aH,aK);return aJ};c.CheckActive=function(aJ,i,aI){var j=this.tc,aH=this.UpdateActive(aJ,i,aI);return aH.Active(aJ,j.mx,j.my)?aH:null};c.Clicked=function(aK){var j=this.a,aH=j.target,aI=j.href,i;if(aH!=""&&aH!="_self"){if(self.frames[aH]){self.frames[aH].document.location=aI}else{try{if(top.frames[aH]){top.frames[aH].document.location=aI;return}}catch(aJ){}window.open(aI,aH)}return}if(C.createEvent){i=C.createEvent("MouseEvents");i.initMouseEvent("click",1,1,window,0,0,0,0,0,0,0,0,0,0,null);if(!j.dispatchEvent(i)){return}}else{if(j.fireEvent){if(!j.fireEvent("onclick")){return}}}C.location=aI};function y(aN,j,aI){var aH,aK,aM=C.getElementById(aN),aJ=["id","class","innerHTML"],aL;if(!aM){throw 0}if(ai(window.G_vmlCanvasManager)){aM=window.G_vmlCanvasManager.initElement(aM);this.ie=parseFloat(navigator.appVersion.split("MSIE")[1])}if(aM&&(!aM.getContext||!aM.getContext("2d").fillText)){aK=C.createElement("DIV");for(aH=0;aH<aJ.length;++aH){aK[aJ[aH]]=aM[aJ[aH]]}aM.parentNode.insertBefore(aK,aM);aM.parentNode.removeChild(aM);throw 0}for(aH in y.options){this[aH]=aI&&ai(aI[aH])?aI[aH]:(ai(y[aH])?y[aH]:y.options[aH])}this.canvas=aM;this.ctxt=aM.getContext("2d");this.z1=250/s(this.depth,0.001);this.z2=this.z1/this.zoom;this.radius=aD(aM.height,aM.width)*0.0075;this.max_radius=100;this.max_weight=[];this.min_weight=[];this.textFont=this.textFont&&o(this.textFont);this.textHeight*=1;this.imageRadius=this.imageRadius.toString();this.pulsateTo=av(this.pulsateTo,0,1);this.minBrightness=av(this.minBrightness,0,1);this.maxBrightness=av(this.maxBrightness,this.minBrightness,1);this.ctxt.textBaseline="top";this.lx=(this.lock+"").indexOf("x")+1;this.ly=(this.lock+"").indexOf("y")+1;this.frozen=this.dx=this.dy=this.fixedAnim=this.touchState=0;this.fixedAlpha=1;this.source=j||aN;this.repeatTags=aD(64,~~this.repeatTags);this.minTags=aD(200,~~this.minTags);if(~~this.scrollPause>0){y.scrollPause=~~this.scrollPause}else{this.scrollPause=0}if(this.minTags>0&&this.repeatTags<1&&(aH=this.GetTags().length)){this.repeatTags=ap(this.minTags/aH)-1}this.transform=R.Identity();this.startTime=this.time=G();this.mx=this.my=-1;this.centreImage&&ao(this);this.Animate=this.dragControl?this.AnimateDrag:this.AnimatePosition;this.animTiming=(typeof y[this.animTiming]=="function"?y[this.animTiming]:y.Smooth);if(this.shadowBlur||this.shadowOffset[0]||this.shadowOffset[1]){this.ctxt.shadowColor=this.shadow;this.shadow=this.ctxt.shadowColor;this.shadowAlpha=al()}else{delete this.shadow}this.Load();if(j&&this.hideTags){(function(i){if(y.loaded){i.HideTags()}else{ad("load",function(){i.HideTags()},window)}})(this)}this.yaw=this.initial?this.initial[0]*this.maxSpeed:0;this.pitch=this.initial?this.initial[1]*this.maxSpeed:0;if(this.tooltip){this.ctitle=aM.title;aM.title="";if(this.tooltip=="native"){this.Tooltip=this.TooltipNative}else{this.Tooltip=this.TooltipDiv;if(!this.ttdiv){this.ttdiv=C.createElement("div");this.ttdiv.className=this.tooltipClass;this.ttdiv.style.position="absolute";this.ttdiv.style.zIndex=aM.style.zIndex+1;ad("mouseover",function(i){i.target.style.display="none"},this.ttdiv);C.body.appendChild(this.ttdiv)}}}else{this.Tooltip=this.TooltipNone}if(!this.noMouse&&!b[aN]){b[aN]=[["mousemove",af],["mouseout",B],["mouseup",aE],["touchstart",T],["touchend",r],["touchcancel",r],["touchmove",az]];if(this.dragControl){b[aN].push(["mousedown",z]);b[aN].push(["selectstart",aA])}if(this.wheelZoom){b[aN].push(["mousewheel",ag]);b[aN].push(["DOMMouseScroll",ag])}if(this.scrollPause){b[aN].push(["scroll",ac,window])}for(aH=0;aH<b[aN].length;++aH){aK=b[aN][aH];ad(aK[0],aK[1],aK[2]?aK[2]:aM)}}if(!y.started){aL=window.requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame;y.NextFrame=aL?y.NextFrameRAF:y.NextFrameTimeout;y.interval=this.interval;y.NextFrame(this.interval);y.started=1}}Q=y.prototype;Q.SourceElements=function(){if(C.querySelectorAll){return C.querySelectorAll("#"+this.source)}return[C.getElementById(this.source)]};Q.HideTags=function(){var aH=this.SourceElements(),j;for(j=0;j<aH.length;++j){aH[j].style.display="none"}};Q.GetTags=function(){var aM=this.SourceElements(),aL,aI=[],aK,aJ,aH;for(aH=0;aH<=this.repeatTags;++aH){for(aK=0;aK<aM.length;++aK){aL=aM[aK].getElementsByTagName("a");for(aJ=0;aJ<aL.length;++aJ){aI.push(aL[aJ])}}}return aI};Q.Message=function(aM){var aO=[],aI,j,aH=aM.split(""),aK,aN,aL,aJ;for(aI=0;aI<aH.length;++aI){if(aH[aI]!=" "){j=aI-aH.length/2;aK=C.createElement("A");aK.href="#";aK.innerText=aH[aI];aL=100*ah(j/9);aJ=-100*w(j/9);aN=new e(this,aH[aI],aK,[aL,0,aJ],2,18,"#000","#fff",0,0,0,"monospace",2,aH[aI]);aN.Init();aO.push(aN)}}return aO};Q.CreateTag=function(aL){var aO,aJ,aP,aK,aN,aH,aM,aI,j=[0,0,0];if("text"!=this.imageMode){aO=aL.getElementsByTagName("img");if(aO.length){aJ=new Image;aJ.src=aO[0].src;if(!this.imageMode){aP=new e(this,"",aL,j,0,0);aP.SetImage(aJ);aw(aJ,aO[0],aP,this);return aP}}}if("image"!=this.imageMode){aN=new aB(aL);aK=aN.Lines();if(!aN.Empty()){aH=this.textFont||o(Y(aL,"font-family"));if(this.splitWidth){aK=aN.SplitWidth(this.splitWidth,this.ctxt,aH,this.textHeight)}aM=this.bgColour=="tag"?Y(aL,"background-color"):this.bgColour;aI=this.bgOutline=="tag"?Y(aL,"color"):this.bgOutline}else{aN=null}}if(aN||aJ){aP=new e(this,aK,aL,j,2,this.textHeight+2,this.textColour||Y(aL,"color"),aM,this.bgRadius,aI,this.bgOutlineThickness,aH,this.padding,aN&&aN.original);if(aJ){aP.SetImage(aJ);aw(aJ,aO[0],aP,this)}else{aP.Init()}return aP}};Q.UpdateTag=function(aH,i){var aK=this.textColour||Y(i,"color"),j=this.textFont||o(Y(i,"font-family")),aJ=this.bgColour=="tag"?Y(i,"background-color"):this.bgColour,aI=this.bgOutline=="tag"?Y(i,"color"):this.bgOutline;aH.a=i;aH.title=i.title;if(aH.colour!=aK||aH.textFont!=j||aH.bgColour!=aJ||aH.bgOutline!=aI){aH.SetFont(j,aK,aJ,aI)}};Q.Weight=function(aN){var aJ=aN.length,aL,aH,aO,aK=[],j,aI=this.weightFrom?this.weightFrom.split(/[, ]/):[null],aM=aI.length;for(aH=0;aH<aJ;++aH){aK[aH]=[];for(aO=0;aO<aM;++aO){aL=u(aN[aH].a,aI[aO],this.textHeight);if(!this.max_weight[aO]||aL>this.max_weight[aO]){this.max_weight[aO]=aL}if(!this.min_weight[aO]||aL<this.min_weight[aO]){this.min_weight[aO]=aL}aK[aH][aO]=aL}}for(aO=0;aO<aM;++aO){if(this.max_weight[aO]>this.min_weight[aO]){j=1}}if(j){for(aH=0;aH<aJ;++aH){aN[aH].SetWeight(aK[aH])}}};Q.Load=function(){var aR=this.GetTags(),aM=[],aP,aQ,aL,aI,aH,j,aJ,aO,aK=[],aN={sphere:q,vcylinder:am,hcylinder:au,vring:d,hring:n};if(aR.length){aK.length=aR.length;for(aO=0;aO<aR.length;++aO){aK[aO]=aO}this.shuffleTags&&an(aK);aI=100*this.radiusX;aH=100*this.radiusY;j=100*this.radiusZ;this.max_radius=s(aI,s(aH,j));for(aO=0;aO<aR.length;++aO){aQ=this.CreateTag(aR[aK[aO]]);if(aQ){aM.push(aQ)}}this.weight&&this.Weight(aM,true);if(this.shapeArgs){this.shapeArgs[0]=aM.length}else{aL=this.shape.toString().split(/[(),]/);aP=aL.shift();if(typeof window[aP]==="function"){this.shape=window[aP]}else{this.shape=aN[aP]||aN.sphere}this.shapeArgs=[aM.length,aI,aH,j].concat(aL)}aJ=this.shape.apply(this,this.shapeArgs);this.listLength=aM.length;for(aO=0;aO<aM.length;++aO){aM[aO].position=new ae(aJ[aO][0],aJ[aO][1],aJ[aO][2])}}if(this.noTagsMessage&&!aM.length){aO=(this.imageMode&&this.imageMode!="both"?this.imageMode+" ":"");aM=this.Message("No "+aO+"tags")}this.taglist=aM};Q.Update=function(){var aQ=this.GetTags(),aP=[],aK=this.taglist,aR,aO=[],aM=[],aI,aN,aH,aL,aJ;if(!this.shapeArgs){return this.Load()}if(aQ.length){aH=this.listLength=aQ.length;aN=aK.length;for(aL=0;aL<aN;++aL){aP.push(aK[aL]);aM.push(aL)}for(aL=0;aL<aH;++aL){for(aJ=0,aR=0;aJ<aN;++aJ){if(aK[aJ].EqualTo(aQ[aL])){this.UpdateTag(aP[aJ],aQ[aL]);aR=aM[aJ]=-1}}if(!aR){aO.push(aL)}}for(aL=0,aJ=0;aL<aN;++aL){if(aM[aJ]==-1){aM.splice(aJ,1)}else{++aJ}}if(aM.length){an(aM);while(aM.length&&aO.length){aL=aM.shift();aJ=aO.shift();aP[aL]=this.CreateTag(aQ[aJ])}aM.sort(function(j,i){return j-i});while(aM.length){aP.splice(aM.pop(),1)}}aJ=aP.length/(aO.length+1);aL=0;while(aO.length){aP.splice(ap(++aL*aJ),0,this.CreateTag(aQ[aO.shift()]))}this.shapeArgs[0]=aH=aP.length;aI=this.shape.apply(this,this.shapeArgs);for(aL=0;aL<aH;++aL){aP[aL].position=new ae(aI[aL][0],aI[aL][1],aI[aL][2])}this.weight&&this.Weight(aP)}this.taglist=aP};Q.SetShadow=function(i){i.shadowBlur=this.shadowBlur;i.shadowOffsetX=this.shadowOffset[0];i.shadowOffsetY=this.shadowOffset[1]};Q.Draw=function(aR){if(this.paused){return}var aL=this.canvas,aJ=aL.width,aQ=aL.height,aT=0,aI=(aR-this.time)*y.interval/1000,aP=aJ/2+this.offsetX,aO=aQ/2+this.offsetY,aX=this.ctxt,aN,aY,aV,aH=-1,aK=this.taglist,aU=aK.length,j=this.frontSelect,aS=(this.centreFunc==aA),aM;this.time=aR;if(this.frozen&&this.drawn){return this.Animate(aJ,aQ,aI)}aM=this.AnimateFixed();aX.setTransform(1,0,0,1,0,0);for(aV=0;aV<aU;++aV){aK[aV].Calc(this.transform,this.fixedAlpha)}aK=A(aK,function(aZ,i){return i.z-aZ.z});if(aM&&this.fixedAnim.active){aN=this.fixedAnim.tag.UpdateActive(aX,aP,aO)}else{this.active=null;for(aV=0;aV<aU;++aV){aY=this.mx>=0&&this.my>=0&&this.taglist[aV].CheckActive(aX,aP,aO);if(aY&&aY.sc>aT&&(!j||aY.z<=0)){aN=aY;aH=aV;aN.tag=this.taglist[aV];aT=aY.sc}}this.active=aN}this.txtOpt||(this.shadow&&this.SetShadow(aX));aX.clearRect(0,0,aJ,aQ);for(aV=0;aV<aU;++aV){if(!aS&&aK[aV].z<=0){try{this.centreFunc(aX,aJ,aQ,aP,aO)}catch(aW){alert(aW);this.centreFunc=aA}aS=true}if(!(aN&&aN.tag==aK[aV]&&aN.PreDraw(aX,aK[aV],aP,aO))){aK[aV].Draw(aX,aP,aO)}aN&&aN.tag==aK[aV]&&aN.PostDraw(aX)}if(this.freezeActive&&aN){this.Freeze()}else{this.UnFreeze();this.drawn=(aU==this.listLength)}if(this.fixedCallback){this.fixedCallback(this,this.fixedCallbackTag);this.fixedCallback=null}aM||this.Animate(aJ,aQ,aI);aN&&aN.LastDraw(aX);aL.style.cursor=aN?this.activeCursor:"";this.Tooltip(aN,this.taglist[aH])};Q.TooltipNone=function(){};Q.TooltipNative=function(j,i){if(j){this.canvas.title=i&&i.title?i.title:""}else{this.canvas.title=this.ctitle}};Q.SetTTDiv=function(aI,j){var i=this,aH=i.ttdiv.style;if(aI!=i.ttdiv.innerHTML){aH.display="none"}i.ttdiv.innerHTML=aI;j&&(j.title=i.ttdiv.innerHTML);if(aH.display=="none"&&!i.tttimer){i.tttimer=setTimeout(function(){var aJ=ab(i.canvas.id);aH.display="block";aH.left=aJ.x+i.mx+"px";aH.top=aJ.y+i.my+24+"px";i.tttimer=null},i.tooltipDelay)}};Q.TooltipDiv=function(j,i){if(j&&i&&i.title){this.SetTTDiv(i.title,i)}else{if(!j&&this.mx!=-1&&this.my!=-1&&this.ctitle.length){this.SetTTDiv(this.ctitle)}else{this.ttdiv.style.display="none"}}};Q.Transform=function(aK,i,aM){if(i||aM){var j=ah(i),aL=w(i),aN=ah(aM),aJ=w(aM),aH=new R([aJ,0,aN,0,1,0,-aN,0,aJ]),aI=new R([1,0,0,0,aL,-j,0,j,aL]);aK.transform=aK.transform.mul(aH.mul(aI))}};Q.AnimateFixed=function(){var aH,j,aJ,i,aI;if(this.fadeIn){j=G()-this.startTime;if(j>=this.fadeIn){this.fadeIn=0;this.fixedAlpha=1}else{this.fixedAlpha=j/this.fadeIn}}if(this.fixedAnim){if(!this.fixedAnim.transform){this.fixedAnim.transform=this.transform}aH=this.fixedAnim,j=G()-aH.t0,aJ=aH.angle,i,aI=this.animTiming(aH.t,j);this.transform=aH.transform;if(j>=aH.t){this.fixedCallbackTag=aH.tag;this.fixedCallback=aH.cb;this.fixedAnim=this.yaw=this.pitch=0}else{aJ*=aI}i=R.Rotation(aJ,aH.axis);this.transform=this.transform.mul(i);return(this.fixedAnim!=0)}return false};Q.AnimatePosition=function(aH,aK,aI){var j=this,i=j.mx,aM=j.my,aJ,aL;if(!j.frozen&&i>=0&&aM>=0&&i<aH&&aM<aK){aJ=j.maxSpeed,aL=j.reverse?-1:1;j.lx||(j.yaw=((i*2*aJ/aH)-aJ)*aL*aI);j.ly||(j.pitch=((aM*2*aJ/aK)-aJ)*-aL*aI);j.initial=null}else{if(!j.initial){if(j.frozen&&!j.freezeDecel){j.yaw=j.pitch=0}else{j.Decel(j)}}}this.Transform(j,j.pitch,j.yaw)};Q.AnimateDrag=function(j,aJ,aI){var i=this,aH=100*aI*i.maxSpeed/i.max_radius/i.zoom;if(i.dx||i.dy){i.lx||(i.yaw=i.dx*aH/i.stretchX);i.ly||(i.pitch=i.dy*-aH/i.stretchY);i.dx=i.dy=0;i.initial=null}else{if(!i.initial){i.Decel(i)}}this.Transform(i,i.pitch,i.yaw)};Q.Freeze=function(){if(!this.frozen){this.preFreeze=[this.yaw,this.pitch];this.frozen=1;this.drawn=0}};Q.UnFreeze=function(){if(this.frozen){this.yaw=this.preFreeze[0];this.pitch=this.preFreeze[1];this.frozen=0}};Q.Decel=function(i){var aH=i.minSpeed,aI=L(i.yaw),j=L(i.pitch);if(!i.lx&&aI>aH){i.yaw=aI>i.z0?i.yaw*i.decel:0}if(!i.ly&&j>aH){i.pitch=j>i.z0?i.pitch*i.decel:0}};Q.Zoom=function(i){this.z2=this.z1*(1/i);this.drawn=0};Q.Clicked=function(aH){var i=this.active;try{if(i&&i.tag){if(this.clickToFront===false||this.clickToFront===null){i.tag.Clicked(aH)}else{this.TagToFront(i.tag,this.clickToFront,function(){i.tag.Clicked(aH)},true)}}}catch(j){}};Q.Wheel=function(j){var aH=this.zoom+this.zoomStep*(j?1:-1);this.zoom=aD(this.zoomMax,s(this.zoomMin,aH));this.Zoom(this.zoom)};Q.BeginDrag=function(i){this.down=S(i,this.canvas);i.cancelBubble=true;i.returnValue=false;i.preventDefault&&i.preventDefault()};Q.Drag=function(aJ,aI){if(this.dragControl&&this.down){var aH=this.dragThreshold*this.dragThreshold,j=aI.x-this.down.x,i=aI.y-this.down.y;if(this.dragging||j*j+i*i>aH){this.dx=j;this.dy=i;this.dragging=1;this.down=aI}}return this.dragging};Q.EndDrag=function(){var i=this.dragging;this.dragging=this.down=null;return i};function D(aH){var j=aH.targetTouches[0],i=aH.targetTouches[1];return F(at(i.pageX-j.pageX,2)+at(i.pageY-j.pageY,2))}Q.BeginPinch=function(i){this.pinched=[D(i),this.zoom];i.preventDefault&&i.preventDefault()};Q.Pinch=function(j){var aI,aH,i=this.pinched;if(!i){return}aH=D(j);aI=i[1]*aH/i[0];this.zoom=aD(this.zoomMax,s(this.zoomMin,aI));this.Zoom(this.zoom)};Q.EndPinch=function(i){this.pinched=null};Q.Pause=function(){this.paused=true};Q.Resume=function(){this.paused=false};Q.SetSpeed=function(j){this.initial=j;this.yaw=j[0]*this.maxSpeed;this.pitch=j[1]*this.maxSpeed};Q.FindTag=function(aH){if(!ai(aH)){return null}ai(aH.index)&&(aH=aH.index);if(!I(aH)){return this.taglist[aH]}var aI,aJ,j;if(ai(aH.id)){aI="id",aJ=aH.id}else{if(ai(aH.text)){aI="innerText",aJ=aH.text}}for(j=0;j<this.taglist.length;++j){if(this.taglist[j].a[aI]==aJ){return this.taglist[j]}}};Q.RotateTag=function(aP,aI,aO,i,aM,aH){var aN=aP.Calc(this.transform,1),aK=new ae(aN.x,aN.y,aN.z),aJ=aj(aO,aI),j=aK.angle(aJ),aL=aK.cross(aJ).unit();if(j==0){this.fixedCallbackTag=aP;this.fixedCallback=aM}else{this.fixedAnim={angle:-j,axis:aL,t:i,t0:G(),cb:aM,tag:aP,active:aH}}};Q.TagToFront=function(i,aH,aI,j){this.RotateTag(i,0,0,aH,aI,j)};y.Start=function(aH,i,j){y.Delete(aH);y.tc[aH]=new y(aH,i,j)};function ay(i,j){y.tc[j]&&y.tc[j][i]()}y.Linear=function(i,j){return j/i};y.Smooth=function(i,j){return 0.5-w(j*Math.PI/i)/2};y.Pause=function(i){ay("Pause",i)};y.Resume=function(i){ay("Resume",i)};y.Reload=function(i){ay("Load",i)};y.Update=function(i){ay("Update",i)};y.SetSpeed=function(j,i){if(I(i)&&y.tc[j]&&!isNaN(i[0])&&!isNaN(i[1])){y.tc[j].SetSpeed(i);return true}return false};y.TagToFront=function(j,i){if(!I(i)){return false}i.lat=i.lng=0;return y.RotateTag(j,i)};y.RotateTag=function(aH,i){if(I(i)&&y.tc[aH]){if(isNaN(i.time)){i.time=500}var j=y.tc[aH].FindTag(i);if(j){y.tc[aH].RotateTag(j,i.lat,i.lng,i.time,i.callback,i.active);return true}}return false};y.Delete=function(aI){var j,aH;if(b[aI]){aH=C.getElementById(aI);if(aH){for(j=0;j<b[aI].length;++j){a(b[aI][j][0],b[aI][j][1],aH)}}}delete b[aI];delete y.tc[aI]};y.NextFrameRAF=function(){requestAnimationFrame(E)};y.NextFrameTimeout=function(i){setTimeout(O,i)};y.tc={};y.options={z1:20000,z2:20000,z0:0.0002,freezeActive:false,freezeDecel:false,activeCursor:"pointer",pulsateTo:1,pulsateTime:3,reverse:false,depth:0.5,maxSpeed:0.05,minSpeed:0,decel:0.95,interval:20,minBrightness:0.1,maxBrightness:1,outlineColour:"#ffff99",outlineThickness:2,outlineOffset:5,outlineMethod:"outline",outlineRadius:0,textColour:"#ff99ff",textHeight:15,textFont:"Helvetica, Arial, sans-serif",shadow:"#000",shadowBlur:0,shadowOffset:[0,0],initial:null,hideTags:true,zoom:1,weight:false,weightMode:"size",weightFrom:null,weightSize:1,weightSizeMin:null,weightSizeMax:null,weightGradient:{0:"#f00",0.33:"#ff0",0.66:"#0f0",1:"#00f"},txtOpt:true,txtScale:2,frontSelect:false,wheelZoom:true,zoomMin:0.3,zoomMax:3,zoomStep:0.05,shape:"sphere",lock:null,tooltip:null,tooltipDelay:300,tooltipClass:"tctooltip",radiusX:1,radiusY:1,radiusZ:1,stretchX:1,stretchY:1,offsetX:0,offsetY:0,shuffleTags:false,noSelect:false,noMouse:false,imageScale:1,paused:false,dragControl:false,dragThreshold:4,centreFunc:aA,splitWidth:0,animTiming:"Smooth",clickToFront:false,fadeIn:0,padding:0,bgColour:null,bgRadius:0,bgOutline:null,bgOutlineThickness:0,outlineIncrease:4,textAlign:"centre",textVAlign:"middle",imageMode:null,imagePosition:null,imagePadding:2,imageAlign:"centre",imageVAlign:"middle",noTagsMessage:true,centreImage:null,pinchZoom:false,repeatTags:0,minTags:0,imageRadius:0,scrollPause:false,outlineDash:0,outlineDashSpace:0,outlineDashSpeed:1};for(M in y.options){y[M]=y.options[M]}window.TagCanvas=y;ad("load",function(){y.loaded=1},window)})();
