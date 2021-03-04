if ('serviceWorker' in navigator) {
  // register service worker
  navigator.serviceWorker.register('service-worker.js');
}
var itemList = document.getElementById("notes");

itemList.addEventListener("click", removeItem);

let count = Number(window.localStorage.getItem("count"));
if(!count){
    window.localStorage.setItem("count", "0");
}
console.log(count);
let createNote=(noteTitle,noteBody)=>{
    if (count > 0) {
        document.getElementById("no-notes").className = "hidden";
      }
    
    let li = document.createElement('li');
    let a = document.createElement('a');
    let h2 = document.createElement('h2');
    let xbutton = document.createElement('button');
    let p = document.createElement('p');
    xbutton.classList.add('delete');
    let bn= document.createTextNode('X');
    let htn = document.createTextNode(noteTitle);
    let ptn = document.createTextNode(noteBody);
    xbutton.appendChild(bn);
    h2.appendChild(htn);
    p.appendChild(ptn);
    

    a.appendChild(h2);
    a.appendChild(xbutton);
    a.appendChild(p);
   
    a.setAttribute("href", "#");

    li.appendChild(a);
    
    document.getElementById('notes').appendChild(li);
    
};
let createNoteFromInput = (e) => {
  e.preventDefault();
  var noteTitle = document.getElementById("new-note-title-input").value;
  var noteBody = document.getElementById("new-note-body-input").value;

  document.getElementById("new-note-title-input").value = "";
  document.getElementById("new-note-body-input").value = "";

  console.log("yes");
  
  count += 1;
  window.localStorage.setItem("count", count);

  while (window.localStorage.getItem(noteTitle)) {
    noteTitle = noteTitle + " - 1";
  }
  window.localStorage.setItem(noteTitle, noteBody);

  createNote(noteTitle, noteBody);
};

function removeItem(e) {
  //console.log('2');
  if (e.target.classList.contains("delete")) {
    console.log(e);
    if (
      confirm(
        'Are you sure to delete the "' +
          e.target.previousElementSibling.innerText +
          '" note?'
      )
    ) {
      //grab the parent
      // console.log(e.target.previousSibling.data);
      var li = e.target.parentElement.parentElement;

      itemList.removeChild(li);
      count -= 1;
      window.localStorage.setItem("count", count);
      window.localStorage.removeItem(e.target.previousElementSibling.innerText);
      if (count < 1) {
        document.getElementById("no-notes").className = "";
      }
    }
  }
}

for (i = 0; i < count + 1; i++) {
  console.log(window.localStorage.key(i));
  let noteTitle = window.localStorage.key(i);
  let noteBody = window.localStorage.getItem(noteTitle);
  if (noteTitle !== "count" && noteTitle) {
    createNote(noteTitle, noteBody);
  }
}

document
  .getElementById("input-form")
  .addEventListener("submit", createNoteFromInput, false);