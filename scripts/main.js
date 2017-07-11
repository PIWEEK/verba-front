'use strict';

const requestAuthor = new XMLHttpRequest();
const requestQuotes = new XMLHttpRequest();
const mainApi = 'http://localhost:8000/api/';
const quotesApi= mainApi + 'quotes/';
const authorsApi= mainApi + 'authors/';
const successRequest = 200;
const failRequest = 400;
let quotes = [];

function getApiQuotes() {
  requestQuotes.open('GET', quotesApi, true);

  requestQuotes.onload = function() {
    if (requestQuotes.status >= successRequest && requestQuotes.status < failRequest) {
      let data = JSON.parse(requestQuotes.responseText);
      for (var i = 0; i < data.length; i++) {
       let quote = {
        text: data[i].text,
      };
      quotes.push(quote);
      }
      console.log(quotes);
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
