'use strict';
//////////// API request ///////////
const requestAuthor = new XMLHttpRequest();
const requestQuotes = new XMLHttpRequest();
const requestMoreQuotes = new XMLHttpRequest();
const requestAuthorsList = new XMLHttpRequest();
const mainApi = 'http://localhost:8000/api/';
const authorsApi = mainApi + 'authors/';
const successRequest = 200;
const failRequest = 400;
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

  requestQuotes.open('GET', nextQuoteUrl, true);

  requestQuotes.onload = function() {
    if (requestQuotes.status >= successRequest && requestQuotes.status < failRequest) {
      let quotesData = JSON.parse(requestQuotes.responseText);
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
  };

  requestQuotes.onerror = function() {
    console.log('Error al tratar de conectarse con el servidor');
  };

  requestQuotes.send();
  return quotes;
}

getApiQuotes();

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


getButtonQuote.addEventListener('click', getApiQuotes);

function getAuthorsList() {

  requestAuthorsList.open('GET', authorsApi, true);

  requestAuthorsList.onload = function() {
    if (requestAuthorsList.status >= successRequest && requestAuthorsList.status < failRequest) {
      let authorsData = JSON.parse(requestAuthorsList.responseText);
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
  };

  requestAuthorsList.onerror = function() {
    console.log('Error al tratar de conectarse con el servidor');
  };

  requestAuthorsList.send();
  return authors;
}

getAuthorsList();

function printAuthors() {
  authorsContainer.innerHTML = '';
  for (var i = 0; i < authors.length; i++) {
    authorsContainer.innerHTML += `
    <div class="author-btn">
      ${authors[i].name}
    </div>
   `;
  }
}

authorsButton.addEventListener('click', printAuthors);

//////////// Modal///////////

function modalToggle() {
  const filterModal = document.querySelector('.js-filter-modal');
  filterModal.classList.toggle('hidden');
}

filterButton.addEventListener('click', modalToggle);
closeFilterButton.addEventListener('click', modalToggle);
