'use strict';
//////////// API request ///////////
const mainApi = 'http://verba.piweek.com/api/';
const authorsApi = mainApi + 'authors/?page_size=200';
const quotesApi = mainApi + 'quotes/';
const tagsApi = mainApi + 'tags/?page_size=200';
const filterQuotesApi = quotesApi + '?author=31';
const authorsContainer = $(document).find('.js-authors-container');
const tagsContainer = $(document).find('.js-tags-container');
const authorsButton = $(document).find('.js-authors-link');
const tagsButton = $(document).find('.js-tags-link');
const filterButton = $(document).find('.js-filter-btn');
const applyFilter = $(document).find('.js-apply-filter-btn');
const closeFilterButton = $(document).find('.js-close-btn');


//////////// Quotes ///////////

$(function() {
    Quote.getQuotes();
});


$(document).on('click', '.card', function(event){
    let card = event.target.closest('.card');
    let quoteUrl = card.getAttribute('data-url');

    $.get(quoteUrl, function(quoteData, status) {
        Quote.printQuoteDetail(quoteData);
    })
});

$(document).on('click', '.author-btn', function(event){
    let author_btn = $(event.target);
    author_btn.toggleClass("selected");
});


$('.js-load-quotes-btn').click(function() {
    Quote.getQuotes()
});

$('.js-back-btn').click(function() {
    Quote.toggleDetailAndList();
});

//////////// Filters ///////////

function getAuthorsList() {
    $.get(authorsApi, function(authorsData, status) {
        let authors = [];
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

        printAuthors(authors);
    });
}

function getTagsList() {
    $.get(tagsApi, function(tagsData, status) {
        let tags = [];

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

        printTags(tags);
    });
}

function printAuthors(authors) {
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

function printTags(tags) {
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


function modalToggle() {
    $(document).find('.js-filter-modal').toggleClass('hidden');
    $(document).find('body').toggleClass('overflow-hidden');
}

filterButton.click(function() {
    modalToggle();
    getAuthorsList();
    getTagsList();
});

authorsButton.click(function() {
    authorsContainer.toggleClass('hidden');
});

tagsButton.click(function() {
    tagsContainer.toggleClass('hidden');
});

applyFilter.click(function() {
    Quote.getFilteredQuotes(filterQuotesApi);
    modalToggle();
});

closeFilterButton.click(modalToggle);
