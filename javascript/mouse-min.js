// Generated by CoffeeScript 1.4.0
(function(){NAN.Mouse=function(){function e(){this.path=[],this.state="none"}return e.prototype.checkPath=function(){var e,t,n,r;t=!0,this.path.length<2&&(t=!1);if(this.path.length>0)for(e=n=0,r=this.path.length-1;0<=r?n<r:n>r;e=0<=r?++n:--n)this.path[e].grid.isConnecting(this.path[e+1].grid)===!1&&(t=!1);return t},e.prototype.evaluatePath=function(){var e,t,n,r,i,s;t="",s=this.path;for(r=0,i=s.length;r<i;r++)e=s[r],n=e.grid.value,t+=n.toString();return t},e.prototype.beginPath=function(){return this.path=[],this.state="select"},e.prototype.endPath=function(){var e,t,n,r,i,s,o,u,a,f;if(this.state==="none"||$.game.gameOver)return;if(this.checkPath()&&!$.numberShow){r=this.evaluatePath(),i=$.analyzer.analyze(r),e=i.descriptions.filter(function(e){return e!==null&&e!==""}).join("<br>");if(i.score===0)gameHint("这只是一个平凡的数, 放了它吧");else{$.numberShow=new NAN.NumberShow({n:r,descriptions:e,score:i.score}),$.game.score.addValue(i.score),$.audioPlayerB.playString(r);if(i.score!==0)for(t=s=0,a=this.path.length;0<=a?s<a:s>a;t=0<=a?++s:--s)n=this.path[t],n.grid.clean()}}f=this.path;for(o=0,u=f.length;o<u;o++)n=f[o],n.grid.selected=!1;return this.state="none",this.path=[]},e.prototype.addGrid=function(e){var t,n,r,i,s;if(this.path.length>=8)return;if(this.path.length===0&&e.value===0){gameHint("不能以0开始哦");return}t=!1,s=this.path;for(r=0,i=s.length;r<i;r++)n=s[r],n.x===e.x&&n.y===e.y&&(t=!0);if(!t)if(this.path.length===0||this.path[this.path.length-1].grid.isConnecting(e))return e.makeSound(),e.selected=!0,n={x:e.x,y:e.y,grid:e},this.path.push(n)},e}()}).call(this);