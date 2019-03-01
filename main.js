function false_random(){
    //random嫌い～　誰かいい感じの疑似乱数関数作って
}

function draw(){
    var canvas = document.getElementById('background');
    if(!canvas || !canvas.getContext)
        return -1;

    canvas.width = screen.width;
    canvas.height = screen.height;

    var ctx = canvas.getContext('2d');
    ctx.fillStyle = "rgb(12, 19, 117)";

    //背景色（色離れすぎでは？）これ外してCSSでグラデーションした方が深みがでそう
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var r = 60;//正三角形の1辺（全体的に解像度を無視している感）
    ctx.fillStyle = "rgba(0, 175, 255, 0.2)";

    //ランダムに正六角形を配置する（各正三角形にランダムに色を配置した方が良いが向き考えるの面倒　誰かやって）
    for(var i=0; i<canvas.width*canvas.height/1000; i++){
        var x = Math.floor(Math.random() * (canvas.width/r/0.866 + 1));
        var y = r*Math.floor(Math.random() * (canvas.height/r + 1)) + x%2*r/2;
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

    //小さな正三角形4つ分の大きな正三角形を描く輪郭線（白）を入れたい　誰かやって
}

window.onload = draw;

//ここからアニメーション用
window.onscroll = function(){
    var y = Math.round(window.pageYOffset/window.innerHeight);
    if(1<=y&&y<=2){
        document.getElementsByClassName("content")[y-1].classList.add("active");
    }
}