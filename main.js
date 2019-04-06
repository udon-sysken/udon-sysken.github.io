onscroll = function(){
    var articles = document.getElementsByTagName("article");
    var y = document.documentElement.clientHeight;
    for(var a of articles){
        if(a.getBoundingClientRect().top < y*2/3)
            a.classList.add("active");
    }
}

onmousemove = function(e){
    var mouse_x = e.pageX - document.documentElement.clientWidth/2;
    var mouse_y = e.pageY - document.documentElement.clientHeight/2;

    var translate_x = mouse_x>0 ? Math.sqrt(mouse_x) : -Math.sqrt(-mouse_x);
    var translate_y = mouse_y>0 ? Math.sqrt(mouse_y) : -Math.sqrt(-mouse_y);

    document.getElementById("header").style.backgroundPosition = "center,"+translate_x+"px "+translate_y+"px, center";
}

stacks_number = 0;

function back(){
    if(0<stacks_number)
    stacks_number--;
    output_library();
}

function next(){
    if(stacks_number<Math.floor(library.length/5))
    stacks_number++;
    output_library();
}

function output_library(){
    if(0==stacks_number)
    document.getElementById("back").classList.add("hidden");
    else
    document.getElementById("back").classList.remove("hidden");
    if(stacks_number==Math.floor(library.length/5))
    document.getElementById("next").classList.add("hidden");
    else
    document.getElementById("next").classList.remove("hidden");

    document.getElementById("page_number").innerHTML = (stacks_number+1)+"/"+Math.ceil(library.length/5);

    var books_info = "";
    for(var i = 0; i<5&&stacks_number*5+i<library.length; i++){
        books_info += "<table>";
        books_info += "<tr>";
        books_info += "<th>title</th>";
        books_info += "<td>";

    if(library[stacks_number*5+i].sup_title!=undefined)
    books_info += "<h6>" + library[stacks_number*5+i].sup_title + "</h6>";
    books_info += "<h5>" + library[stacks_number*5+i].title + "</h5>";
    if(library[stacks_number*5+i].sub_title!=undefined)
    books_info += "<h6>" + library[stacks_number*5+i].sub_title + "</h6>";

    books_info += "</td>";
    books_info += "</tr>";

    books_info += "<tr>";
    books_info += "<th>author</th>";
    books_info += '<td class="items">';

    for(var j=0; j<library[stacks_number*5+i].author.length; j++){
        books_info += "<ruby>";
        books_info += library[stacks_number*5+i].author[j];
        //books_info += "<rt>"+library[stacks_number*5+i].author_ruby[j]+"</rt>";
        books_info += "</ruby>";
    }

    books_info += "</td>";
    books_info += "</tr>";

    books_info += "</table>";
    }
    
    document.getElementById("stacks").innerHTML = books_info;
}


window.onload = function(){
    output_library();
}
