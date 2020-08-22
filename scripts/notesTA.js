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
        notesObj = []; //it is an array that will store the notes and we'll pass this array into localStorage 
    }
    else {
        notesObj = JSON.parse(notes); //JSON.parse() is used to convert string to an obj or array
    }

    let html = "";

    //here notesobj is an array so we can apply foreach loop here, index is the numbering of index i.e 0,1,2,... and element is whatever content is in the array.
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
        notesElm.innerHTML = html; //if notesobj
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

    /*The splice() method adds/removes items to/from an array, and returns the removed item(s).
     syntax : array.splice(index, howmany, item1, ....., itemX)
     index => Required. An integer that specifies at what position to add/remove items, Use negative values to specify the position from the end of the array
     howmany =>	Optional. The number of items to be removed. If set to 0, no items will be removed
*/
    notesObj.splice(index, 1); 

    localStorage.setItem("showNotes", JSON.stringify(notesObj)); // after deleting notes, to work delete method , we have to retrive localStorage so that it work fine.
    showNotes(); // this will now show the updated app.
}

// now we'll work on search option .

let search = document.getElementById('searchTxt');
search.addEventListener("input",function(){

    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText; //The innerText property sets or returns the text content of the specified node, and all its descendants.
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
})