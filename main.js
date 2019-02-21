let inp = $('#inp');
let btn = $('#btn');
let u_div = document.getElementById('udt');
let u_text = document.getElementById('in_upd');
let u_btn = document.getElementById('u_btn');
let content = document.getElementById('content');
in_display();
btn.click(function(){
    console.log('www')
//     $.ajax({
//         url : `/add`,
//         method : 'post',
//         data : JSON.stringify({'k' : 'abc'})
//     })
    $.post('/add',{'data' : inp.val()},function(data){
        display(inp.val())
    })
})
function in_display(){
    $.get('/in_display',function(data){
        console.log(data);
        for(i = 0;i<data.length;i++){
            display(data[i]);
        }
    })
}
function display(data){
    let text = document.createTextNode(data);
    let li = document.createElement('li');
    let del_btn = document.createElement('button');
    let del_btn_text = document.createTextNode('delete');
    del_btn.appendChild(del_btn_text);
    let udt_btn = document.createElement('button');
    udt_btn.setAttribute('class','UdtBtn');
    let udt_btn_text = document.createTextNode('update');
    udt_btn.appendChild(udt_btn_text);
    li.appendChild(text);
    li.appendChild(del_btn);
    li.appendChild(udt_btn);
    content.appendChild(li);
    del_btn.addEventListener('click',function(){
        content.removeChild(this.parentElement);
        $.post('/del',{'data' : data});
    })
    udt_btn.addEventListener('click',function(){
        u_div.style.display = 'inline-block';
        u_btn.addEventListener('click',function(){
            u_text = u_text.value;
            console.log(u_text);
            $.post('/update',{'data': data ,'n_data' : u_text});
            udt_btn.parentElement.TEXT_NODE = u_text;
            u_div.style.display = 'none';
            location.reload();
        })
    })
    let line = document.createElement('hr');
    li.appendChild(line);   
}