var cnt=$(".list").length,val,cnt_ac=$(".li_ac").length
$(document)
// .click(function(){
//     val=$("#main").val()
//     input()
// })
.on("click",".check",function(){
    if($(this).parent().is(".li_ac")){
        $(this).parent().removeClass("li_ac")
    }else{
        $(this).parent().addClass("li_ac")
    }
    items()
})
.on("click","#all",function(){
    $("#list").removeClass()
    $(".sp_ac").removeClass("sp_ac")
    $(this).addClass("sp_ac")
})
.on("click","#act",function(){
    $("#list").removeClass()
    $("#list").addClass("act")
    $(".sp_ac").removeClass("sp_ac")
    $(this).addClass("sp_ac")
})
.on("click","#com",function(){
    $("#list").removeClass()
    $("#list").addClass("com")
    $(".sp_ac").removeClass("sp_ac")
    $(this).addClass("sp_ac")
})
.on("click","#cle",function(){
    $(".li_ac").remove()
    items()
    if(cnt<=0){
        $("#all_sel").text("")
        $("#controll").css({"display":"none"})
    }
})
.on("click","#all_sel",function(){
    if($(this).is(".all_ac")){
        $(this).removeClass("all_ac")
        $(".list").removeClass("li_ac")
        items()
    }else{
        $(this).addClass("all_ac")
        $(".list").addClass("li_ac")
        items()
    }
})
.on("dblclick",".list p",function(){
    $(".list_input").append(`<p class="text">${$(".li_inp").val()}</p>`).removeClass("list_input").children(".li_inp").remove()
    $(this).parent(".list").addClass("list_input").append(`
        <input type="text" value="${$(this).text()}" size="44" class="li_inp">
    `)
    $(this).remove()
})
.on("mouseenter",".list",function(){
    $(this).addClass("hov")
})
.on("mouseleave",".list",function(){
    $(this).removeClass("hov")
})
.on("click",".close",function(){
    $(this).parent(".list").remove()
    items()
})
.keydown(function(key){
    if(key.keyCode==13){
        val=$("#main").val()
        input()
    }
})
.on("blur","input",function(){
    val=$("#main").val()
    input()
})
function input(){
    $(".list_input").append(`<p class="text">${$(".li_inp").val()}</p>`).removeClass("list_input").children(".li_inp").remove()
    val=val+""
    val.replace(/(^\s*)|(\s*$)/, '');
    if(val==""||val==" "){
        return
    }
    $("#controll").before(`
            <li class="list">
                <div class="check"></div>
                <p class="text"></p>
                <p class="close">X</p>
            </li>
        `)
    $(".list:nth-last-child(2) .text").text(val)
    $("#main").val("")
    $("#all_sel").removeClass("all_ac")
    items()
    if(cnt>=1){
        $("#all_sel").text("❯")
        $("#controll").css({"display":"flex"})
    }
}
function items(){
    cnt=$(".list").length
    cnt_ac=$(".li_ac").length
    $("#item").text(`${cnt-cnt_ac} items left`)
    console.log(cnt-cnt_ac)
    $(".list").children(".check").html("")
    $(".li_ac").children(".check").html("&check;")
    if(cnt-cnt_ac==0){
        $("#all_sel").addClass("all_ac")
    }else{
        $("#all_sel").removeClass("all_ac")
    }
    if(cnt<=0){
        $("#all_sel").text("")
        $("#controll").css({"display":"none"})
    }
}