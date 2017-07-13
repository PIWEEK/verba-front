'use strict';
//////////// API request ///////////
const mainApi = 'http://verba.piweek.com/api/';
const authorsApi = mainApi + 'authors/?page_size=200';
const tagsApi = mainApi + 'tags/?page_size=200';
let quotes = [];
let authors = [];
let tags = [];
let getButtonQuote = document.querySelector('.js-load-quotes-btn');
let nextQuoteUrl = mainApi + 'quotes/';
const quoteContainer = $(document).find('.quotes-container');
const authorsContainer = $(document).find('.js-authors-container');
const tagsContainer = $(document).find('.js-tags-container');
const authorsButton = $(document).find('.js-authors-link');
const tagsButton = $(document).find('.js-tags-link');
const filterButton = $(document).find('.js-filter-btn');
const closeFilterButton = $(document).find('.js-close-btn');


function getApiQuotes() {

    $.get(nextQuoteUrl, function(quotesData, status) {
        if (status === 'success') {
            nextQuoteUrl = quotesData.next;

            for (let i = 0; i < quotesData.results.length; i++) {
                let quoteResult = quotesData.results[i];
                let quote = {
                    text: quoteResult.text,
                    author: quoteResult.author.name,
                    url: quoteResult.url,
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
    let htmlQuote = '';

    for (let i = 0; i < quotes.length; i++) {
        let quote = quotes[i].text;
        if (quote.length > 90) {
            htmlQuote += `
              <div class="card">
                <h1>'${quote.substring(0, 90)}...'</h1>
                <h2>${quotes[i].author}</h2>
                <p class="quoteUrl hidden">${quotes[i].url}</p>
              </div>
             `;
        } else {
            htmlQuote += `
              <div class="card">
                <h1>'${quote}'</h1>
                <h2>${quotes[i].author}</h2>
              </div>
               `;
        }
    }

    quoteContainer.html(htmlQuote);
}


function getAuthorsList() {
    $.get(authorsApi, function(authorsData, status) {
        if (status === 'success') {
            for (let i = 0; i < authorsData.results.length; i++) {
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

function getTagsList() {
    $.get(tagsApi, function(tagsData, status) {
        if (status === 'success') {
            for (var i = 0; i < tagsData.results.length; i++) {
                let tag = {
                    name: tagsData.results[i].name,
                };
                tags.push(tag);
            }
            console.log(tags);
        } else {
            console.log('Error del servidor, puede que el archivo no exista o que se haya producido un error interno en el servidor');
        }
        return tags;
    });
}

function printAuthors() {
    authorsContainer.toggleClass('hidden');
    let htmlAuthor = '';

    for (let i = 0; i < authors.length; i++) {
        htmlAuthor += `
            <div class="author-btn">
              ${authors[i].name}
            </div>
           `;
    }

    authorsContainer.html(htmlAuthor);
}

function loadQuoteDetail() {
    let quoteUrl = $(this).find('.quoteUrl');
}

function printTags() {
    tagsContainer.toggleClass('hidden');
    let htmlTag = '';

    for (let i = 0; i < tags.length; i++) {
        htmlTag += `
            <div class="author-btn">
              ${tags[i].name}
            </div>
           `;
    }

    tagsContainer.html(htmlTag);
}


getApiQuotes();
getAuthorsList();
getTagsList();

getButtonQuote.click(getApiQuotes);
authorsButton.click(printAuthors);
tagsButton.click(printTags);


//////////// Modal///////////

function modalToggle() {
    const filterModal = document.querySelector('.js-filter-modal');
    filterModal.classList.toggle('hidden');
    const body = document.querySelector('body');
    body.classList.toggle('overflow-hidden');
}

filterButton.click(modalToggle);
closeFilterButton.click(modalToggle);

// $(".js-filter-modal").on("show", function () {
//   $("body").addClass("overflow-hidden");
// }).on("hidden", function () {
//   $("body").removeClass("overflow-hidden")
// });
