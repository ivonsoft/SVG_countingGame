function Population_point(t,n,e,r,o,i){return{i:t,x_value:n,y_value:e,x_px:r,y_px:o,kierunek:i}}function animuj_rect(){var t=0,n=0,e=0,r=0,o=[],i=0,a=0,s=0,c=0,u=100,l=1,h=0,f=[],y=new Date,d=[],g=getRandomInteger(10,99);this.setValue=function(t){n=t},this.setValueDelay=function(t){i=t},this.setValuePlay=function(t){l=t},this.setValueAudio=function(t){0==l&&(d.s=t.s,d.m=t.m,d.e=t.e,d.w=t.w,d.e.volume=.04,d.s.volume=.04,d.m.volume=.04)},this.setValueNumer=function(n){t=n},this.setValuePoints=function(t){o=t},this.run=function(){if(e=setInterval(init,u),f.push("e"),0==l)try{play_train(d,f)}catch(n){console.log(n)}console.log("run: "+t+" timerID: "+e+", czy sound:"+h)},this.getValueTimer=function(){return e},this.stopSound=function(t){t[f[s]].currentTime=100},init=function(){var u=new Date;if(r+i>=o.length-1){if(0==l){if(0==a){d[f[s]].currentTime=d[f[s]].duration,f=["e"];try{play_train(d,f)}catch(h){console.log(h)}}if(f=["e"],"e"==f[0]&&d[f[s]].currentTime>.94*d[f[s]].duration){d[f[s]].currentTime=0,d[f[s]].volume=.04;try{play_train(d,f)}catch(h){console.log(h)}}if(a%g==0){g=getRandomInteger(11,299),f=["w"];try{play_train(d,f)}catch(h){console.log(h)}}}return 0==a&&(c=new Date),a++,void(a%50==0&&console.log("is waiting: "+u.dateDiff("s",c,u.getTime())+"sec, numer: "+t+" timerID: "+e+", delay:"+i+", newPos:"+r))}r+=1;var m=o[r-1],p=o[r],v=p.x-m.x,x=p.y-m.y,R=(Math.PI*x/v,parseInt(180*Math.atan2(x,v)/Math.PI));if(n.setAttribute("transform","translate("+parseInt(p.x)+","+parseInt(p.y)+") rotate("+R+", 0,0)"),Math.abs(R)>90&&Math.abs(R)<=180?n.children[1].setAttribute("transform","rotate(180,15,0)"):n.children[1].setAttribute("transform","rotate(0,0,0)"),0==l&&a>0){d[f[s]].currentTime=d[f[s]].duration,f=["m"];try{play_train(d,f)}catch(h){console.log(h)}}a=0,r%50==0&&console.log("running total time: "+u.dateDiff("s",y,u.getTime())+"sec, numer: "+t+", pos: "+r+",x: "+p.x+",y: "+p.y)},play_train=function(t,n){t[n[s]].duration>0&&(console.log("muzyka gra: "+n[s]),t[n[s]].play())}}function checkBrowser(){if(-1!=(navigator.userAgent.indexOf("Opera")||navigator.userAgent.indexOf("OPR")));else if(-1!=navigator.userAgent.indexOf("Chrome"));else if(-1!=navigator.userAgent.indexOf("Safari"));else if(-1==navigator.userAgent.indexOf("Firefox"))return-1!=navigator.userAgent.indexOf("MSIE")||1==!!document.documentMode?(alert("IE: Proszę użyć innej przeglądarki (Does not support IE, switch to other browser)"),-1):-1}function Point(t,n){this.x=t,this.y=n}function Vector(t,n){this.xc=t,this.yc=n}function collisionCircles(t,n){var e,r,o;return e=t.radius+n.radius,r=t.x-n.x,o=t.y-n.y,e>Math.sqrt(r*r+o*o)?!0:!1}function getRandomInteger(t,n){return Math.floor(Math.random()*(n-t+1))+t}function getRandomReal(t,n){return Math.random()*(n-t)+t}function getRandomColor(){var t=getRandomInteger(30,230),n=getRandomInteger(30,230),e=getRandomInteger(30,230);return"rgb("+t+", "+n+", "+e+")"}function s2d(t,n){return n||(n=10),t/n*constants.delay}function getRandomBallRadius(){return getRandomInteger(constants.minRadius,constants.maxRadius)}function getRandomSpeed(){return getRandomReal(-constants.randomSpeedRange,constants.randomSpeedRange)}function radiusToMass(t){return Math.PI*t*t*t}function collisionN(t,n){var e=new Vector(0,0),r=n.dy(t),o=n.dx(t),i=Math.atan2(r,o);return e.xc=Math.cos(i),e.yc=Math.sin(i),e}function verticalWallCollision(t,n){var e=t.cx,r=t.r;return e>=n.width-r||r>=e}function horizontalWallCollision(t,n){var e=t.cy,r=t.r;return e>=n.height-r||r>=e}function processWallCollision(t,n){if(verticalWallCollision(t.grupa,n))for(t.grupa.v.xc*=-1;verticalWallCollision(t.grupa,n);)t.move();if(horizontalWallCollision(t.grupa,n))for(t.grupa.v.yc*=-1;horizontalWallCollision(t.grupa,n);)t.move()}Date.prototype.dateDiff=function(t,n,e){t=t.toLowerCase();var r=e-n,o={w:6048e5,d:864e5,h:36e5,n:6e4,s:1e3};return Math.floor(r/o[t])},Array.prototype.next=function(){return this.obecny=this.obecny<this.length-1?++this.obecny:0,this[this.obecny]},Array.prototype.prev=function(){return this.obecny=this.obecny>0?--this.obecny:this.length-1,this[this.obecny]},Array.prototype.obecny=0,Array.prototype.contains=function(t){for(var n=0;n<this.length;n++)if(this[n]===t)return!0;return!1},Array.prototype.unique=function(){for(var t=[],n=0;n<this.length;n++)t.contains(this[n])||t.push(this[n]);return t};var constants={delay:3,numBalls:20,ballStrokeColor:"#444",epsilon:1,randomSpeedRange:200,minRadius:10,maxRadius:40};Vector.prototype.add=function(t){var n=new Vector(0,0);return n.xc=this.xc+t.xc,n.yc=this.yc+t.yc,n},Vector.prototype.diff=function(t){var n=new Vector(0,0);return n.xc=this.xc-t.xc,n.yc=this.yc-t.yc,n},Vector.prototype.multi=function(t){var n=new Vector(0,0);return n.xc=t*this.xc,n.yc=t*this.yc,n},Vector.prototype.dot=function(t){return this.xc*t.xc+this.yc*t.yc};