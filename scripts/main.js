'use strict';
//////////// API request ///////////
const mainApi = 'http://verba.piweek.com/api/';
const authorsApi = mainApi + 'authors/?page_size=200';
let quotes = [];
let authors = [];
let getButtonQuote = document.querySelector('.js-load-quotes-btn');
let nextQuoteUrl = mainApi + 'quotes/';
const quoteContainer = document.querySelector('.quotes-container');
const authorsContainer = document.querySelector('.js-authors-container');
const authorsButton = document.querySelector('.js-authors-link');
const filterButton = document.querySelector('.js-filter-btn');
const closeFilterButton = document.querySelector('.js-close-btn');


function getApiQuotes() {

    $.get(nextQuoteUrl, function(quotesData, status) {
        if (status === 'success') {
            nextQuoteUrl = quotesData.next;

            for (var i = 0; i < quotesData.results.length; i++) {
                let quote = {
                    text: quotesData.results[i].text,
                    author: quotesData.results[i].author.name,
                };
                quotes.push(quote);
                printQuotes();
            }
        } else {
            console.log('Error del servidor, puede que el archivo no exista o que se haya producido un error interno en el servidor');
        }
        return quotes;
    });
}

function printQuotes() {
  quoteContainer.innerHTML = '';
  for (var i = 0; i < quotes.length; i++) {
    var quote = quotes[i].text;
    if (quote.length > 90) {
      quoteContainer.innerHTML += `
      <div class="card">
        <h1>'${quote.substring(0, 90)}...'</h1>
        <h2>${quotes[i].author}</h2>
      </div>
     `;
    } else {
      quoteContainer.innerHTML += `
      <div class="card">
        <h1>'${quote}'</h1>
        <h2>${quotes[i].author}</h2>
      </div>
     `;
    }
  }
}


function getAuthorsList() {

    $.get(authorsApi, function(authorsData, status) {
        if (status === 'success') {
            for (var i = 0; i < authorsData.results.length; i++) {
                let author = {
                    name: authorsData.results[i].name,
                    url: authorsData.results[i].url,
                };
                authors.push(author);
            }
            console.log(authors);
        } else {
            console.log('Error del servidor, puede que el archivo no exista o que se haya producido un error interno en el servidor');
        }
        return authors;
    });

}

function printAuthors() {
  authorsContainer.classList.toggle('hidden');
    authorsContainer.innerHTML = '';
    for (var i = 0; i < authors.length; i++) {
        authorsContainer.innerHTML += `
    <div class="author-btn">
      ${authors[i].name}
    </div>
   `;
    }
}

getApiQuotes();
getAuthorsList();

getButtonQuote.addEventListener('click', getApiQuotes);
authorsButton.addEventListener('click', printAuthors);

//////////// Modal///////////

function modalToggle() {
  const filterModal = document.querySelector('.js-filter-modal');
  filterModal.classList.toggle('hidden');
  const body = document.querySelector('body');
  body.classList.toggle('overflow-hidden');
}

filterButton.addEventListener('click', modalToggle);
closeFilterButton.addEventListener('click', modalToggle);
