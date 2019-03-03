function rand(n){
    return Math.floor(Math.random() * n);
}

function draw1(){
    var canvas = document.getElementById('background1');
    if(!canvas || !canvas.getContext)
        return -1;

    canvas.width = screen.width +40;
    canvas.height = screen.height +20;

    var ctx = canvas.getContext('2d');

    ctx.fillStyle = "rgba(0, 175, 255, 0.4)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var r = 60;//正三角形の1辺（全体的に解像度を無視している感）
    ctx.fillStyle = "rgba(0, 175, 255, 0.1)";

    //ランダムに正六角形を配置する（各正三角形にランダムに色を配置した方が良いが向き考えるの面倒　誰かやって）
    for(var i=0; i<canvas.width*canvas.height/1000; i++){
        let x = rand(canvas.width/r/0.866 + 1);
        let y = r*rand(canvas.height/r + 1) + x%2*r/2;
        x *= r*0.866;
        
        ctx.beginPath();
        ctx.moveTo(x, y-r);
        ctx.lineTo(x+r*0.866, y-r/2);
        ctx.lineTo(x+r*0.866, y+r/2);
        ctx.lineTo(x, y+r);
        ctx.lineTo(x-r*0.866, y+r/2);
        ctx.lineTo(x-r*0.866, y-r/2);
        ctx.closePath();
        ctx.fill();
    }
}

function draw2(){
    var canvas = document.getElementById('background2');
    if(!canvas || !canvas.getContext)
        return -1;

    canvas.width = screen.width +40;
    canvas.height = screen.height +20;

    var ctx = canvas.getContext('2d');

    var r = 60;//正三角形の1辺（全体的に解像度を無視して

    //正六角形の輪郭（各辺に(ry
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    for(var i=0; i<canvas.width*canvas.height/5000; i++){
        let x = rand(canvas.width/r/1.732 + 1);
        let y = 2*r*rand(canvas.height/r/2 + 1) + x%2*r;
        x *= r*1.732;
        
        ctx.beginPath();
        ctx.moveTo(x, y-2*r);
        ctx.lineTo(x+r*1.732, y-r);
        ctx.lineTo(x+r*1.732, y+r);
        ctx.lineTo(x, y+2*r);
        ctx.lineTo(x-r*1.732, y+r);
        ctx.lineTo(x-r*1.732, y-r);
        ctx.closePath();
        ctx.stroke();
    }

    //ひし形ではない何か
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    for(var i=0; i<canvas.width*canvas.height/25000; i++){
        let x = rand(canvas.width/r/1.732 + 1);
        let y = 2*r*rand(canvas.height/r/2 + 1) + x%2*r;
        x *= r*1.732;
        
        ctx.beginPath();
        ctx.moveTo(x, y-2*r);
        ctx.lineTo(x-r*1.732, y+r);
        ctx.closePath();
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(x+r*1.732, y-r);
        ctx.lineTo(x, y+2*r);
        ctx.closePath();
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(x, y-2*r);
        ctx.lineTo(x+r*1.732, y+r);
        ctx.closePath();
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(x, y+2*r);
        ctx.lineTo(x-r*1.732, y-r);
        ctx.closePath();
        ctx.stroke();
    }
}

var triangle_data;
function draw3(){
    canvas3 = document.getElementById('background3');
    if(!canvas3 || !canvas3.getContext)
        return -1;

    canvas3.width = screen.width +40;
    canvas3.height = screen.height +20;

    ctx3 = canvas3.getContext('2d');
    var r = 60;//正三角形の1辺（全体的に解像度を無視している感）

    l = 40;
    ctx3.fillStyle = "rgba(12, 19, 117, 0.2)";

    triangle_data = [];

    //破片
    for(var i=0; i<Math.floor(canvas3.width*canvas3.height/20000); i++){
        let x = rand(canvas3.width + 1);
        let y = rand(canvas3.height+1);
        
        triangle_data[i] = [];
        triangle_data[i][0] = (rand(l*2)-l);
        triangle_data[i][1] = (rand(l*2)-l);
        triangle_data[i][2] = (rand(l*2)-l);
        triangle_data[i][3] = (rand(l*2)-l);
        triangle_data[i][4] = (rand(l*2)-l);
        triangle_data[i][5] = (rand(l*2)-l);
        triangle_data[i][6] = rand(360);
        triangle_data[i][7] = rand(360);
        triangle_data[i][8] = rand(360);
        triangle_data[i][9] = 2*(rand(5)-2);
        triangle_data[i][10] = 2*(rand(5)-2);
        triangle_data[i][11] = 2*(rand(5)-2);
        triangle_data[i][12] = x;
        triangle_data[i][13] = y;
    }
    window.requestAnimationFrame(fragment_anime);
}

radian = function(degree){
    return degree / 180 * Math.PI
}

rotate = function(x0, y0, tx, ty, tz){
    let z1 = y0*Math.sin(radian(tx));
    let y1 = y0*Math.cos(radian(tx));

    let x1 = z1*Math.sin(radian(ty)) + x0*Math.cos(radian(ty));

    let x2 = x1*Math.cos(radian(tz)) - y1*Math.sin(radian(tz));
    let y2 = x1*Math.sin(radian(tz)) + y1*Math.cos(radian(tz));

    var xy = [x2, y2];
    return xy;
}

var start_time = 1;
fragment_anime = function(timestamp){
    ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
    for(var i=0; i<triangle_data.length; i++){
        triangle_data[i][12]+=5;
        triangle_data[i][6] += triangle_data[i][9];
        triangle_data[i][7] += triangle_data[i][10];
        triangle_data[i][8] += triangle_data[i][11];

        ctx3.beginPath();
        let xy = rotate(triangle_data[i][0], triangle_data[i][1], triangle_data[i][6], triangle_data[i][7], triangle_data[i][8]);
        ctx3.moveTo(triangle_data[i][12]+xy[0], triangle_data[i][13]+xy[1]);
        xy = rotate(triangle_data[i][2], triangle_data[i][3], triangle_data[i][6], triangle_data[i][7], triangle_data[i][8]);
        ctx3.lineTo(triangle_data[i][12]+xy[0], triangle_data[i][13]+xy[1]);
        xy = rotate(triangle_data[i][4], triangle_data[i][5], triangle_data[i][6], triangle_data[i][7], triangle_data[i][8]);
        ctx3.lineTo(triangle_data[i][12]+xy[0], triangle_data[i][13]+xy[1]);
        ctx3.closePath();
        ctx3.fill();
        
        if(triangle_data[i][12]>canvas3.width){
            let x = 0;
            let y = rand(canvas3.height+1);
        triangle_data[i][0] = rand(l*2)-l;
        triangle_data[i][1] = rand(l*2)-l;
        triangle_data[i][2] = rand(l*2)-l;
        triangle_data[i][3] = rand(l*2)-l;
        triangle_data[i][4] = rand(l*2)-l;
        triangle_data[i][5] = rand(l*2)-l;
        triangle_data[i][6] = rand(360);
        triangle_data[i][7] = rand(360);
        triangle_data[i][8] = rand(360);
        triangle_data[i][9] = rand(2)==0 ? 2 : -2;
        triangle_data[i][10] = rand(2)==0 ? 2 : -2;
        triangle_data[i][11] = rand(2)==0 ? 2 : -2;
        triangle_data[i][12] = x;
        triangle_data[i][13] = y;
        }

    }

    if(timestamp/2000>=start_time){
        start_time++;
        draw2();
    }

    window.requestAnimationFrame(fragment_anime);
}

window.onload = function(){
    draw1();
    draw2();
    draw3();
}

//cssアニメーション用class発行
window.onscroll = function(){
    var y = Math.round(window.pageYOffset/window.innerHeight);
    if(1<=y&&y<=2){
        document.getElementsByClassName("content")[y-1].classList.add("active");
    }
}