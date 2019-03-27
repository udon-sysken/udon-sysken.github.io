onscroll = function(){
    var articles = document.getElementsByTagName("article");
    var y = document.documentElement.clientHeight;
    for(var a of articles){
        if(a.getBoundingClientRect().top < y*2/3)
            a.classList.add("active");
    }
}