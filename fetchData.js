const apiData = './mostsbooks.json'; 


const fetchBookData = async () => {
    try {
        const response = await fetch(apiData);
        const data = await response.json();
        const books = data.results.books; // 
        displayBooks(books);
    } catch (error) {
        console.error('Error fetching book data:', error);
    }
};

// Function to display books on the page
function displayBooks(books) {
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = ""; // Clear existing books

    books.forEach((book, index) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        const bookImage = document.createElement("img");
        bookImage.src = book.book_image;
        bookImage.alt = book.title;

        const bookTitle = document.createElement("div");
        bookTitle.classList.add("title");
        bookTitle.textContent = book.title;

        const bookAuthor = document.createElement("div");
        bookAuthor.classList.add("author");
        bookAuthor.textContent = `by ${book.author}`;

        const viewButton = document.createElement("button");
        viewButton.textContent = "View";
        viewButton.addEventListener("click", () => showBookDetails(book));

        const buyButton = document.createElement("button");
        buyButton.textContent = "Buy";
        buyButton.addEventListener("click", () => showBuyLinks(book)); 

        bookCard.appendChild(bookImage);
        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(viewButton);
        bookCard.appendChild(buyButton);

        bookList.appendChild(bookCard);
    });
}


function showBookDetails(book) {
    const modal = document.getElementById("book-modal");

    document.getElementById("modal-title").textContent = book.title;
    document.getElementById("modal-author").textContent = `by ${book.author}`;
    document.getElementById("modal-description").textContent = book.description;

    modal.style.display = "block";
}


function showBuyLinks(book) {
    const buyLinks = document.getElementById("buy-links");
    buyLinks.innerHTML = ""; 

    book.buy_links.forEach(link => {
        const anchor = document.createElement("a");
        anchor.href = link.url;
        anchor.target = "_blank";
        anchor.textContent = `Buy from ${link.name}`;
        buyLinks.appendChild(anchor);
    });

    modal.style.display = "block";




}




const modal = document.getElementById("book-modal");
const closeButton = document.getElementsByClassName("close")[0];

closeButton.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}


fetchBookData();
