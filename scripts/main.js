'use strict';
//////////// API request ///////////
const requestAuthor = new XMLHttpRequest();
const requestQuotes = new XMLHttpRequest();
const requestMoreQuotes = new XMLHttpRequest();
const mainApi = 'http://localhost:8000/api/';
const quotesApi = mainApi + 'quotes/';
const moreQuotesApi = quotesApi + '?page=';
const authorsApi = mainApi + 'authors/';
const successRequest = 200;
const failRequest = 400;
let quotes = [];
let getButtonQuote = document.querySelector('.js-load-quotes-btn');
let counterQuote = 1;
const quoteContainer = document.querySelector('.quotes-container');
const filterButton = document.querySelector('.js-filter-btn');
const closeFilterButton = document.querySelector('.js-close-btn');



function getApiQuotes() {

  requestQuotes.open('GET', quotesApi, true);

  requestQuotes.onload = function() {
    if (requestQuotes.status >= successRequest && requestQuotes.status < failRequest) {
      let quotesData = JSON.parse(requestQuotes.responseText);
      for (var i = 0; i < quotesData.results.length; i++) {
        let quote = {
          text: quotesData.results[i].text,
          //authorLink: quotesData.results[i].author,
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
    quoteContainer.innerHTML += `
    <div class="card">
      <h1>'${quotes[i].text}'</h1>
    </div>
   `;
  }
}

function getMoreQuotes() {
  requestMoreQuotes.open('GET', moreQuotesApi + counterQuote, true);

  requestMoreQuotes.onload = function() {
    counterQuote = counterQuote + 1;
    if (requestMoreQuotes.status >= successRequest && requestMoreQuotes.status < failRequest) {
      let moreQuotesData = JSON.parse(requestMoreQuotes.responseText);
      for (var i = 0; i < moreQuotesData.results.length; i++) {
        let quote = {
          text: moreQuotesData.results[i].text,
        };
        quotes.push(quote);
        printQuotes();
      }
    } else {
      console.log('Error del servidor, puede que el archivo no exista o que se haya producido un error interno en el servidor');
    }
    return quotes;
  };

  requestMoreQuotes.onerror = function() {
    console.log('Error al tratar de conectarse con el servidor');
  };

  requestMoreQuotes.send();
  return quotes;
}

getButtonQuote.addEventListener('click', getMoreQuotes);
//////////// Modal///////////

function modalToggle() {
  const filterModal = document.querySelector('.js-filter-modal');
  filterModal.classList.toggle('hidden');
}

filterButton.addEventListener('click', modalToggle);
closeFilterButton.addEventListener('click', modalToggle);
