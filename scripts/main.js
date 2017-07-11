'use strict';

const requestAuthor = new XMLHttpRequest();
const requestQuotes = new XMLHttpRequest();
const requestMoreQuotes = new XMLHttpRequest();
const mainApi = 'http://localhost:8000/api/';
const quotesApi= mainApi + 'quotes/';
const moreQuotesApi = quotesApi + '?page=';
const authorsApi= mainApi + 'authors/';
const successRequest = 200;
const failRequest = 400;
let quotes = [];
let getButtonQuote = document.querySelector('.button-quote');
let counterQuote = 0;
const quoteContainer = document.querySelector('.quotes-container');



function getApiQuotes() {

  requestQuotes.open('GET', quotesApi, true);

  requestQuotes.onload = function() {
    if (requestQuotes.status >= successRequest && requestQuotes.status < failRequest) {
      let data = JSON.parse(requestQuotes.responseText);
      for (var i = 0; i < data.results.length; i++) {
       let quote = {
         text: data.results[i].text,
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
  quoteContainer.innerHTML = "";
  for (var i = 0; i < quotes.length; i++) {
   quoteContainer.innerHTML += `
   <p>"${quotes[i].text}"</p>
   `;
}
}

function getMoreQuotes() {
  requestMoreQuotes.open('GET', moreQuotesApi + counterQuote, true);

  requestMoreQuotes.onload = function() {
    counterQuote = counterQuote + 1;
    if (requestMoreQuotes.status >= successRequest && requestMoreQuotes.status < failRequest) {
      let data = JSON.parse(requestMoreQuotes.responseText);
      for (var i = 0; i < data.results.length; i++) {
       let quote = {
         text: data.results[i].text,
      };
      quotes.push(quote);
      printmoreQuotes();
      }
    } else {
      console.log('Error del servidor, puede que el archivo no exista o que se haya producido un error interno en el servidor');
    }
    return quotes;
  };

  requestMoreQuotes.onerror = function() {
    console.log('Error al tratar de conectarse con el servidor');
  };

  requestQuotes.send();
  return quotes;
  }

getButtonQuote.addEventListener( 'click' , getMoreQuotes);
