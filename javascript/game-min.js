// Generated by CoffeeScript 1.4.0
(function(){NAN.Game=function(){function e(e){var t,n,r;e==null&&(e=!0),e&&$.audioPlayerA.playString("0123456789"),$.backgroundBlockId=0,this.score=new NAN.Score,this.gridId=0,this.init(),this.gridMargin=2,this.containerHeight=670,this.containerWidth=600,this.numGridRows=5,this.numGridColumns=5,this.numGrids=this.numGridColumns*this.numGridRows,this.gridWidth=(this.containerWidth-100)/this.numGridRows,this.gridHeight=this.gridWidth,this.gridXOffset=110,this.gridYOffset=(this.containerWidth-this.numGridColumns*this.gridWidth)/2,setStyleRuleValue(".board","width",""+this.containerWidth+"px"),setStyleRuleValue(".board","height",""+this.containerHeight+"px"),setStyleRuleValue(".number","line-height",""+this.gridHeight+"px"),setStyleRuleValue(".square","height",""+(this.gridHeight-this.gridMargin*2)+"px"),setStyleRuleValue(".square","width",""+(this.gridWidth-this.gridMargin*2)+"px"),this.gameOver=!1,this.grids=[],this.mouse=new NAN.Mouse,this.paused=!0,this.timeLeft=60,this.timeTotal=60,this.gridQueue=[];for(t=n=0,r=this.numGridRows;0<=r?n<r:n>r;t=0<=r?++n:--n)this.grids[t]=[];this.startTime=getTime(),this.gridsToShow=[]}return e.prototype.getEventPosition=function(e){var t,n;return n=e.originalEvent.targetTouches[0].pageX-$("#container").offset().left,t=e.originalEvent.targetTouches[0].pageY-$("#container").offset().top,{x:t,y:n}},e.prototype.getEventGrid=function(e){var t;return t=this.getEventPosition(e),this.getGridAt(t.x,t.y)},e.prototype.newGrid=function(e,t,n){var r;return n==null&&(n=!0),r=new NAN.Grid(e,t,this,n),this.grids[e][t]=r,this.gridQueue.push(r)},e.prototype.getGridAt=function(e,t){var n,r,i,s;s=this.gridQueue;for(r=0,i=s.length;r<i;r++){n=s[r];if(n.testInside(e,t))return n}return null},e.prototype.init=function(){return this.time=0},e.prototype.movementEnd=function(){var e,t,n,r,i,s,o,u;t=!0,u=this.grids;for(r=0,s=u.length;r<s;r++){n=u[r];for(i=0,o=n.length;i<o;i++)e=n[i],e!==null&&e.deltaX!==0&&(t=!1)}return t},e.prototype.nextFrame=function(){var e,t,n,r,i,s,o,u,a;o=function(){a=[];for(var e=0,t=this.numGridRows;0<=t?e<t:e>t;0<=t?e++:e--)a.push(e);return a}.apply(this).reverse(),u=[];for(n=0,i=o.length;n<i;n++)e=o[n],u.push(function(){var n,r,i;i=[];for(t=n=0,r=this.numGridColumns;0<=r?n<r:n>r;t=0<=r?++n:--n)this.grids[e][t]===null||!this.grids[e][t].exist?e>0&&this.grids[e-1][t]!==null?(this.grids[e-1][t].deltaX+=this.gridHeight,this.grids[e][t]=this.grids[e-1][t],this.grids[e-1][t].moveTo(e,t),i.push(this.grids[e-1][t]=null)):e===0?(this.newGrid(e,t,!1),this.gridsToShow.push(this.grids[e][t]),this.grids[e][t].getElement().hide(),i.push(this.grids[e][t].getElement().css("opacity",0))):i.push(void 0):i.push(void 0);return i}.call(this));return u},e.prototype.updateGrids=function(){var e,t,n,r,i;t=[],i=this.gridQueue;for(n=0,r=i.length;n<r;n++)e=i[n],e===null||e.exist===!1?0:(e.update(),t.push(e));return this.gridQueue=t},e.prototype.getPaused=function(){return this.gameOver?!0:this.time<=60?!0:$.numberShow&&!$.numberShow.finished?!0:this.movementEnd()?!1:!0},e.prototype.update=function(){var e,t,n,r,i,s,o,u;this.paused=this.getPaused();if(this.time<this.numGridRows*5){if(this.time%5===0){t=this.time/5;for(n=r=0,o=this.numGridColumns;0<=o?r<o:r>o;n=0<=o?++r:--r)this.newGrid(t,n)}}else this.nextFrame();if(this.movementEnd()){u=this.gridsToShow;for(i=0,s=u.length;i<s;i++)e=u[i],e.show();this.gridsToShow=[]}return this.updateGrids(),this.score.update(),this.time+=1,$.numberShow&&($.numberShow.update(),$.numberShow.finished&&($.numberShow=null)),this.paused||(this.timeLeft-=.02),this.timeLeft<5?$("#game-count-down").css("color","#a44"):$("#game-count-down").css("color","#454"),$("#game-count-down").html(Math.max(0,Math.floor(this.timeLeft))),this.timeLeft<0&&!this.gameOver&&this.over(),$("#progressbar").attr("value",""+this.timeLeft/this.timeTotal*100)},e.prototype.over=function(){var e,t=this;return $.audioPlayerA.playString("9876543210"),e=2e3,this.finalScore=this.score.value,this.score.addValue(-this.finalScore),this.gameOver=!0,new NAN.RotateTask("#game-over-screen",-1),this.timeLeft>=0&&$(".score").fadeOut(500),setTimeout(function(){return t.score.addValue(t.finalScore),$(".score").fadeIn(500)},e),setTimeout(function(){return $.audioPlayerA.playString(t.finalScore.toString()),$.audioPlayerB.playString(t.finalScore.toString())},e*1.5)},e}(),this.gameHint=function(e){return $("#game-area-hint").html(e),$("#game-area-hint").fadeIn(250),setTimeout(function(){return $("#game-area-hint").fadeOut(250)},1500)},this.switchToNanScreen=function(){return new NAN.RotateTask("#nan-screen"),queryNumber(0,function(e){return $.totalPlayers=e},0),queryNumber(-1,function(e){return $.totalNumbers=e},0)},this.newGame=function(){var e;return $("#number-show").hide(0),$("#game-area").hide(0),new NAN.RotateTask("#game-area"),$.game=new NAN.Game,$.gameUpdater&&clearInterval($.gameUpdater),e=.7,setTimeout(function(){return gameHint("连出你认为特殊的数字")},2500),setTimeout(function(){return gameHint("数字性质越特殊, 分数越高")},4600),$(".square").remove(),$("#number-show").hide(),$("#number-show").css("opacity","0.0"),$("#how-to-play").slideUp(0),setTimeout(function(){return $.gameUpdater=setInterval(function(){return $.game.update()},20)},2e3*e)},$.dataServer="http://4.getwb.sinaapp.com/counter/",this.queryNumber=function(e,t,n){var r;return n==null&&(n=1),r="",console.log(n),n===1?r="inc.php":r="check.php",$.ajax({type:"GET",url:""+$.dataServer+r+"?num="+e}).done(function(e){if(t)return t(e)})},this.listenClick=function(e,t){var n=this;return e.click(function(){return t()}),e.on("touchstart",function(){return t()})},this.init=function(){var e=this;return $("#game-area-hint").hide(0),$("#container").css("opacity",0),$("#container").css("visibility","visible"),$("#container").animate({opacity:1},1e3),$("#container").show(),$.totalPlayers="many",$.totalNumbers="lots of",$("#nan-screen").hide(0),setInterval(function(){return $("#nan-player-count").html("and "+$.totalPlayers+" players with "+$.totalNumbers+" numbers")},100),queryNumber(0,function(e){return $("#welcome-screen-user-count").html("你是第"+e+"个玩家")}),$.currentScreen="#welcome-screen",$.mobileMode=mobileMode(),$.mobileMode&&setStyleRuleValue(".square:hover","border-radius","20%"),$.audioPlayerA=new NAN.AudioPlayer("a"),$.audioPlayerB=new NAN.AudioPlayer("b"),$.audioPlayerB.playString("02468"),$.analyzer=new window.NAN.Analyzer,$.game=new NAN.Game(!1),$.inTransition=!1,listenClick($("#game-over-hint"),function(){if(!$.inTransition)return newGame()}),listenClick($("#welcome-screen"),function(){if(!$.inTransition)return newGame()}),listenClick($("#nan-screen"),function(){if(!$.inTransition)return newGame()}),listenClick($("#game-over-nan"),function(){if(!$.inTransition)return switchToNanScreen()}),$("body").mouseup(function(){return $.game.mouse.endPath()}),$("#game-over-screen").hide(0),$("#container").on("touchstart",function(e){var t;return t=$.game.getEventGrid(e),t&&t.mouseDown(),!1}),$("#container").on("touchmove",function(e){var t;return t=$.game.getEventGrid(e),t&&t.mouseOver(),console.log(t),!1}),$("#container").on("touchend",function(e){return $.game.mouse.endPath(),!1})},$(document).ready(function(){return init()})}).call(this);