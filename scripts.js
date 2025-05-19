
const myLibrary = [
    {
        title: "A",
        author: "AA",
        pages: 1,
        read: "yes"
    },
    {
        title: "B",
        author: "BB",
        pages: 1,
        read: "yes"
    },
    {
        title: "CC",
        author: "CCC",
        pages: 1,
        read: "no"
    },
];

function Book(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;
}

function addBookToLibrary(title, author, read) {
    const main = document.querySelector("main");
    const book = new Book(title, author, read);
    myLibrary.push(book);
    displayBooks();
}

function createCard(book) {
    const newCard = document.createElement("div");
    newCard.classList.add("card");

    const title = document.createElement("h2");
    const author = document.createElement("h3");
    const read = document.createElement("p");
    const deleteButton = document.createElement("button");

    title.textContent = `${book.title}`;
    author.textContent = `${book.author}`;
    read.textContent = `${book.read}`;
    deleteButton.textContent = "delete";
    deleteButton.classList.add("delete");

    newCard.appendChild(title);
    newCard.appendChild(author);
    newCard.appendChild(read);
    newCard.appendChild(deleteButton);
    
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

function deleteCard() {
    

}

// EVENT LISTENERS
const main = document.querySelector("main");
const addNew = document.querySelector(".addNew");
const close = document.querySelector(".close");
const addBook = document.querySelector(".addBook");

main.addEventListener("click", (event) => {
    const val = event.target;

    if(!event.target.className.includes("delete")) {
        return;
    } else {
        val.parentNode.remove();
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