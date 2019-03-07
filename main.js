function rand(n){
    return Math.floor(Math.random() * (n + 1));
}

function radian(degree){
    return degree / 180 * Math.PI
}

function rate_area(n){
    return Math.floor(canvas_width*canvas_height / n);
}

function open_canvas(id){
    var canvas = document.getElementById(id);
    if(!canvas || !canvas.getContext)
        return -1;

    canvas.width = canvas_width;
    canvas.height = canvas_height;

    return canvas;
}

function draw_hexagon_tile(){
    ctx1.fillStyle = "rgba(0, 175, 255, 0.4)";
    ctx1.fillRect(0, 0, canvas_width, canvas_height);

    ctx1.fillStyle = "rgba(0, 175, 255, 0.1)";
    for(var i=0; i<rate_area(1000); i++){
        let x = rand(canvas_width/r/0.866);
        let y = r*rand(canvas_height/r) - x%2*r/2;
        x *= r*0.866;
        
        ctx1.beginPath();
        ctx1.moveTo(x, y-r);
        ctx1.lineTo(x+r*0.866, y-r/2);
        ctx1.lineTo(x+r*0.866, y+r/2);
        ctx1.lineTo(x, y+r);
        ctx1.lineTo(x-r*0.866, y+r/2);
        ctx1.lineTo(x-r*0.866, y-r/2);
        ctx1.closePath();
        ctx1.fill();
    }
}

function draw_diamond_line(){
    ctx2.strokeStyle = "rgba(0, 175, 255, 0.2)";
    for(var i=0; i<rate_area(5000); i++){
        let x = rand(canvas_width/r/1.732);
        let y = 2*r*rand(canvas_height/r/2) - x%2*r;
        x *= r*1.732;
        
        ctx2.beginPath();
        ctx2.moveTo(x, y-2*r);
        ctx2.lineTo(x+r*1.732, y-r);
        ctx2.lineTo(x+r*1.732, y+r);
        ctx2.lineTo(x, y+2*r);
        ctx2.lineTo(x-r*1.732, y+r);
        ctx2.lineTo(x-r*1.732, y-r);
        ctx2.closePath();
        ctx2.stroke();
    }

    ctx2.strokeStyle = "rgba(0, 175, 225, 0.05)";
    for(var i=0; i<rate_area(25000); i++){
        let x = rand(canvas_width/r/1.732);
        let y = 2*r*rand(canvas_height/r/2) - x%2*r;
        x *= r*1.732;
        
        ctx2.beginPath();
        ctx2.moveTo(x, y-2*r);
        ctx2.lineTo(x-r*1.732, y+r);
        ctx2.closePath();
        ctx2.stroke();
        
        ctx2.beginPath();
        ctx2.moveTo(x+r*1.732, y-r);
        ctx2.lineTo(x, y+2*r);
        ctx2.closePath();
        ctx2.stroke();
        
        ctx2.beginPath();
        ctx2.moveTo(x, y-2*r);
        ctx2.lineTo(x+r*1.732, y+r);
        ctx2.closePath();
        ctx2.stroke();
        
        ctx2.beginPath();
        ctx2.moveTo(x, y+2*r);
        ctx2.lineTo(x-r*1.732, y-r);
        ctx2.closePath();
        ctx2.stroke();
    }
}

function set_fragment(i, x){
    fragments[i]  = {
        points : [
            {x : rand(l*2)-l, y : rand(l*2)-l},
            {x : rand(l*2)-l, y : rand(l*2)-l},
            {x : rand(l*2)-l, y : rand(l*2)-l}
        ],
        center : {
            x : x,
            y : rand(canvas_height)
        },
        angle : {
            x : rand(360),
            y : rand(360),
            z : rand(360)
        },
        angular_speed : {
            x : 2*(rand(5)-2),
            y : 2*(rand(5)-2),
            z : 2*(rand(5)-2)
        }
    };
}

function rotate(f, i){
    var x0 = f.points[i].x;
    var y0 = f.points[i].y;
    var tx = radian(f.angle.x);
    var ty = radian(f.angle.y);
    var tz = radian(f.angle.z);

    var z1 = y0*Math.sin(tx);
    var y1 = y0*Math.cos(tx);
    var x1 = z1*Math.sin(ty) + x0*Math.cos(ty);

    var x2 = x1*Math.cos(tz) - y1*Math.sin(tz);
    var y2 = x1*Math.sin(tz) + y1*Math.cos(tz);

    return {x : x2, y : y2};
}

function draw_fragment(timestamp){
    ctx3.clearRect(0, 0, canvas_width, canvas_height);

    for(var i=0; i<fragments.length; i++){
        f = fragments[i];
        f.center.x += 5;
        f.angle.x += f.angular_speed.x;
        f.angle.y += f.angular_speed.y;
        f.angle.z += f.angular_speed.z;

        ctx3.beginPath();
        let xy;
        xy = rotate(f, 0);
        ctx3.moveTo(f.center.x + xy.x, f.center.y + xy.y);
        xy = rotate(f, 1);
        ctx3.lineTo(f.center.x + xy.x, f.center.y + xy.y);
        xy = rotate(f, 2);
        ctx3.lineTo(f.center.x + xy.x, f.center.y + xy.y);
        ctx3.closePath();
        ctx3.fill();
        
        if(f.center.x>canvas_width)
            set_fragment(i, 0);
    }

    if(timestamp/2000>=start_time){
        start_time++;
        ctx2.clearRect(0, 0, canvas_width, canvas_height);
        draw_diamond_line();
    }

    window.requestAnimationFrame(draw_fragment);
}

window.onload = function(){
    r = 60;
    l = 40;
    canvas_width = screen.width +40;
    canvas_height = screen.height +20;
    start_time = 1;
    
    fragments = [];
    for(var i=0; i<rate_area(20000); i++)
        set_fragment(i, rand(canvas_width));
    
    canvas1 = open_canvas('hexagon_tile');
    ctx1 = canvas1.getContext('2d');

    canvas2 = open_canvas('diamond_line');
    ctx2 = canvas2.getContext('2d');

    canvas3 = open_canvas('fragment');
    ctx3 = canvas3.getContext('2d');

    draw_hexagon_tile();
    draw_diamond_line();

    ctx3.fillStyle = "rgba(12, 19, 117, 0.2)";
    window.requestAnimationFrame(draw_fragment);
}

window.onscroll = function(){
    var y = Math.round(window.pageYOffset/window.innerHeight) -1;
    if(0<=y&&y<=1)
        document.getElementsByTagName("article")[y].classList.add("active");
}