var count = Number(window.localStorage.getItem("count"));
if(!count){
    Number(window.localStorage.setItem("count", "0"));
}
function createNote(noteTitle,noteBody){
    count+=1;
   document.getElementById("no-notes").classList.add("hidden");
    let li = document.createElement('li');
    let a = document.createElement('a');
    let h2 = document.createElement('h2');
    let xbutton = document.createElement('button');
    let p = document.createElement('p');
    xbutton.classList.add('delete');
    let bn= document.createTextNode('X');
    let htn = document.createTextNode(noteTitle);
    let ptn = document.createTextNode(noteBody);
    h2.appendChild(htn);
    p.appendChild(ptn);
    xbutton.appendChild(bn);

    a.appendChild(h2);
    a.appendChild(p);
    a.appendChild(xbutton);
    a.setAttribute("href", "#");

    li.appendChild(a);
    
    document.getElementById('notes').appendChild(li);
    
}
function createFormInput(e){
    e.preventDefault()
    let noteTitle=document.getElementById('new-note-title-input').value;
    let noteBody = document.getElementById('new-note-body-input').value;
    document.getElementById('new-note-body-input').value = " ";
    document.getElementById('new-note-title-input').value = " ";
    
    createNote(noteTitle,noteBody);
    count+=1;
    window.localStorage.setItem("count", count);
    window.localStorage.setItem(noteTitle,noteBody);
}
function removeNote(e){
    
    if(e.target.classList.contains("delete")){
        if(confirm("Are U sure, you wanna delete this note?" )){
            let li = e.target.parentElement.parentElement;
            let ul = document.getElementById("notes");
            ul.remove(li);
        }

    }
     count-=1;
     window.localStorage.setItem("count",count);
     window.localStorage.removeItem(e.target.previousElementSibling.innerText)
    if(count<1){
        document.getElementById("no-notes").className=" ";
    }

}
for(let i=0;i<count+1;i++){
    let noteTitle= window.localStorage.key(i);
    let noteBody = window.localStorage.getItem(noteTitle);
    if(noteTitle!=count && noteTitle){
        createNote(noteTitle,noteBody);
    }
    
}
document.getElementById('input-form').addEventListener('submit',createFormInput,false);
document.getElementById('notes').addEventListener("click",removeNote)