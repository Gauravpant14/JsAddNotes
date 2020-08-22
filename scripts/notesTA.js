showNotes(); //when we reload page it will direclty show the notes

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let text = document.getElementById('text1');
    let notes = localStorage.getItem("showNotes"); //showNotes is a key in a localStorage

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes); //JSON.parse() is used to convert string to an obj or array
    }

    notesObj.push(text.value);
    localStorage.setItem("showNotes", JSON.stringify(notesObj)); //JSON.stringify() is used covert aarray or obj to string cause ls only support string
    text.value = ""; // so that when we update page ..it start fresh.

    showNotes();

})

// Function to show elements from localSt

function showNotes() {
    let notes = localStorage.getItem("showNotes"); //showNotes is a key in a localStorage

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes); //JSON.parse() is used to convert string to an obj or array
    }

    let html = "";
    notesObj.forEach(function (element, index) {
        html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Note ${index + 1}</h5>
            <p class="card-text"> ${element}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
    </div>`
    });
    let notesElm = document.getElementById("Allnotes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }

}

//function to delete note

function deleteNote(index){
    let notes = localStorage.getItem("showNotes"); //showNotes is a key in a localStorage

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes); //JSON.parse() is used to convert string to an obj or array
    }

    notesObj.splice(index, 1);

    localStorage.setItem("showNotes", JSON.stringify(notesObj));
    showNotes();
}
