var myCanvas = document.getElementById("myCanvas");
//取到上下文对象
var ctx = myCanvas.getContext("2d");
//画笔的颜色  宽度
ctx.strokeStyle = "#fff";
ctx.lineWidth = 11;
ctx.shadowBlur = 9;
ctx.shadowColor = "#fff";

function renderTime() {
  //获取当前时间
  var date = new Date();
  var today = date.toDateString();
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  var ms = date.getMilliseconds();
  var rs = s + ms / 1000;
  //1.背景  2.圆弧     3.文字时间日期
  //实现渐变
  grandint = ctx.createRadialGradient(150, 150, 5, 150, 150, 300);
  //规定渐变颜色  0 ~ 1
  grandint.addColorStop(0, "#03303a");
  grandint.addColorStop(1, "#000");
  //将渐变颜色填充到画布里面
  ctx.fillStyle = grandint;
  ctx.fillRect(0, 0, 300, 300);

  ctx.beginPath();
  ctx.arc(125, 125, 110, deg(270), deg(h * 30 - 90));
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(125, 125, 90, deg(270), deg(m * 6 - 90));
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(125, 125, 70, deg(270), deg(rs * 6 - 90));
  ctx.stroke();

  ctx.font = "12px Helvetica";
  ctx.fillStyle = "rgba(0,255,255,1)";
  ctx.fillText(today, 85, 130);

  ctx.font = "12px Helvetica";
  ctx.fillStyle = "rgba(0,255,255,1)";
  var h = ("0" + h).slice(-2);
  var m = ("0" + m).slice(-2);
  var s = ("0" + s).slice(-2);
  ctx.fillText(h + ":" + m + ":" + s + ":" + ms, 85, 150);
}
setInterval(renderTime, 40);
//将角度转成弧度
function deg(deg) {
  var f = Math.PI / 180;
  return deg * f;
}
