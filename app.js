var list = document.getElementById("list");

firebase.database().ref('todos').on('child_added', function (data) {


    //  if (todo.value == "") {
    //     alert("Enter something");
    // }
    // else {
        var li = document.createElement('li');
        li.setAttribute("class", "list")
        var check = document.createElement('input');
        check.setAttribute("type", "checkbox");
        check.setAttribute("class", "check");
        li.appendChild(check);

        var text = document.createTextNode(data.val().value);
        var label = document.createElement('label');
        label.appendChild(text);
        li.appendChild(label);
        var dbtn = document.createElement("button");
        dbtn.setAttribute("class", "btn2");
        dbtn.setAttribute("id" , data.val().key);
        var dicon = document.createElement('i');
        dicon.setAttribute("class", "fa fa-trash-o")
        dbtn.setAttribute("onclick", "deleteItem(this)");
        dbtn.appendChild(dicon);
        var edit = document.createElement("button");
        edit.setAttribute("class", "btn2");
        edit.setAttribute("id" , data.val().key )
        var eicon = document.createElement('i');
        eicon.setAttribute("class", "fa fa-pencil");
        edit.setAttribute("onclick", "editItem(this)");
        edit.appendChild(eicon);
        li.appendChild(edit);
        li.appendChild(dbtn);

        list.appendChild(li);
        todo.value = "";
    // }
    // console.log(li.childNodes[1].textContent)

})


function add() {
    var todo = document.getElementById("todo");
    var database = firebase.database().ref('todos')
    var key = database.push().key;
    var todos = {
        value: todo.value,
        key: key,
    };
    database.child(key).set(todos);
    todo.value = "";

   
}

function deleteItem(e) {
   
    firebase.database().ref('todos').child(e.id).remove();
    // console.log(e.id);
     e.parentNode.remove();
}
function deleteAll() {
    firebase.database().ref('todos').remove();
    list.innerHTML = "";
}
function editItem(a) {
    var ed = document.createElement("input");
    ed.setAttribute("type", "text");
    ed.setAttribute("class", "input2");
    ed.value = a.parentNode.childNodes[1].textContent;
    a.parentNode.childNodes[1].replaceWith(ed);
    var ubtn = document.createElement("button")
    ubtn.setAttribute("class", "btn2");
    var uicon = document.createElement('i');
    uicon.setAttribute("class", "fa fa-check");
    ubtn.appendChild(uicon);
    var e = a.parentNode.children[2];
    a.parentNode.children[2].replaceWith(ubtn);
    ubtn.onclick = function () {
        ed.replaceWith(ed.value);
        ubtn.replaceWith(e)

        // console.log(a);
        // var edit_todo = {
        //   value: ed,
        //   key: a.id,
        // };  
        // firebase.database().ref('todos').child(a.id).set(edit_todo); 


    }

    
    
    
}
