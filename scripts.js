
// define library array
const myLibrary = [];

// ----------------------------------------------------------------- Constructor ----------------------
function Book(title, author, read) {
    this.id = this.createRandomId();
    this.title = title;
    this.author = author;
    this.read = read;
}

// ---------------------------------------------------------------Prototype Functions--------------------

// Pass in the readButton and then toggle read on its child element -> the svg
Book.prototype.toggleRead = function(readButton) {
    const id = this.id;
    this.read = !this.read;
    readButton.children[0].classList.toggle("read");
    
}

Book.prototype.createRandomId = function() {
    const min = 1000;
    const max = 9999;
    let id;
    let isDuplicate;

    do {
        id = Math.floor(Math.random() * (max - min + 1)) + min;
        isDuplicate = myLibrary.some(book => book.id === id);
    } while (isDuplicate);
    return id;
}

// -----------------------------------------------------------------Other Functions-----------------------------------------

// Add book to myLibrary Array
function addBookToLibrary(title, author, read) {
    const main = document.querySelector("main");
    let readingStatus;
    if(read == "yes") {
        readingStatus = true;
    } else {
        readingStatus = false;
    }
    const book = new Book(title, author, readingStatus);
    myLibrary.push(book);
    displayBooks();
}

function createReadIcon(value) {
    if(value == true) {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="readCheck icon read"><title>read</title><path d="M21.59,11.59L23,13L13.5,22.5L8.42,17.41L9.83,16L13.5,19.68L21.59,11.59M4,16V3H6L9,3A4,4 0 0,1 13,7C13,8.54 12.13,9.88 10.85,10.55L14,16H12L9.11,11H6V16H4M6,9H9A2,2 0 0,0 11,7A2,2 0 0,0 9,5H6V9Z" /></svg>`
    } else {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="readCheck icon"><title>read</title><path d="M21.59,11.59L23,13L13.5,22.5L8.42,17.41L9.83,16L13.5,19.68L21.59,11.59M4,16V3H6L9,3A4,4 0 0,1 13,7C13,8.54 12.13,9.88 10.85,10.55L14,16H12L9.11,11H6V16H4M6,9H9A2,2 0 0,0 11,7A2,2 0 0,0 9,5H6V9Z" /></svg>`
    }
}

function createCard(book) {
    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.setAttribute("data-index", `${book.id}`);

    const iconContainer = document.createElement("div");
    iconContainer.classList.add("iconContainer");

    const title = document.createElement("h2");
    const author = document.createElement("h3");
    const readButton = document.createElement("button");
    readButton.classList.add("readButton");
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteButton");
    
    title.textContent = `${book.title}`;
    author.textContent = `By: ${book.author}`;
    
    readButton.innerHTML = createReadIcon(book.read);
    deleteButton.innerHTML = 
    `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="delete icon"><title>delete</title><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>
    `;

    iconContainer.appendChild(readButton);
    iconContainer.appendChild(deleteButton);

    newCard.appendChild(title);
    newCard.appendChild(author);
    newCard.appendChild(iconContainer);
    
    return newCard;
}

function displayBooks() {
    const main = document.querySelector("main");

    // clear main element and then render cards with updated list
    // avoids double printing cards
    main.innerHTML = "";
    
    myLibrary.forEach((book) => {
        console.log(book);
        const newCard = createCard(book);
        main.appendChild(newCard);
    })
}

// -----------------------------------------------------------------EVENT LISTENERS-----------------------------------------
const main = document.querySelector("main");
const addNew = document.querySelector(".addNew");
const close = document.querySelector(".close");
const addBook = document.querySelector(".addBook");

// Delete card
main.addEventListener("click", (event) => {
    const val = event.target;
    const deleteButton = event.target.closest(".deleteButton");
    
    if(!deleteButton) {
        return;
    } else {
        const parentCard = deleteButton.offsetParent;
        const id = deleteButton.offsetParent.dataset.index;
        console.log(parentCard);
        console.log(id);
        
        // .remove() doesnt work because myLibrary array needs to be updated
        // remove from array and re-render
        const bookIndex = myLibrary.findIndex((book) => book.id == id);
        if(bookIndex !== -1) {
            myLibrary.splice(bookIndex, 1);
            displayBooks();
        }
    }
}) 

// Toggle Read
main.addEventListener("click", (event) => {
    const val = event.target;
    const readButton = event.target.closest(".readButton");
    
    if(!readButton) {
        return;
    } else {
        const id = readButton.offsetParent.dataset.index;
        const correctBook = myLibrary.filter((book) => book.id == id);

        if(correctBook) {
            correctBook[0].toggleRead(readButton);
        }
    }
}) 


addNew.addEventListener("click", function() {
    console.log("Add New");
    const dialog = document.querySelector("dialog");
    dialog.showModal();
})

close.addEventListener("click", function() {
    const dialog = document.querySelector("dialog");
    dialog.close();
})

addBook.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("prevented");
    const form = document.querySelector(".bookForm");
    const title = form.elements["title"].value;
    const author = form.elements["author"].value;
    const read = form.elements["read"].value;

    addBookToLibrary(title, author, read);
    displayBooks();
})


displayBooks();
