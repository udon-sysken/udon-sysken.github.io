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

function draw_hexagon_tile(ctx){
    ctx.fillStyle = "rgba(0, 175, 255, 0.4)";
    ctx.fillRect(0, 0, canvas_width, canvas_height);

    ctx.fillStyle = "rgba(0, 175, 255, 0.1)";
    for(var i=0; i<rate_area(1000); i++){
        let x = rand(canvas_width/r/0.866);
        let y = r*rand(canvas_height/r) - x%2*r/2;
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


window.onload = function(){
    r = 60;
    l = 40;
    canvas_width = screen.width +40;
    canvas_height = screen.height +20;
    
    canvas1 = open_canvas('hexagon_tile');
    ctx1 = canvas1.getContext('2d');
    draw_hexagon_tile(ctx1);
}