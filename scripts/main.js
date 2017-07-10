'use strict';

const request = new XMLHttpRequest();
const mainApi = 'https://verba.com';
const successRequest = 200;
const failRequest = 400;

function getApiData() {
  request.open('GET', mainApi, true);

  request.onload = function() {
    if (request.status >= successRequest && request.status < failRequest) {
      let data = JSON.parse(request.responseText);
      let quote = {
        name: data.Author.name,
        birth: data.Author.birth_date || 'No hay fecha de nacimiento',
        death: data.Author.death_date || 'No hay fecha de defunción',
        picture: data.Author.image || 'placeholder',
        pictureAlt: data.Author.image_alt ||'No hay descripción de imagen',
        bio: data.Author.bio || 'No hay bio',
        wikiLink: data.Author.wiki_link || 'No hay link disponible',
        text: data.Quote.text,
        date: data.Quote.date || "No hay fecha",
        source: data.Quote.source || " No hay fuente disponible",
      };

    } else {
      console.log('Error del servidor, puede que el archivo no exista o que se haya producido un error interno en el servidor');
    }
    return quote;
  };

  request.onerror = function() {
    console.log('Error al tratar de conectarse con el servidor');
  };

  request.send();
  return quote;
}

function printQuote(quote) {
}
