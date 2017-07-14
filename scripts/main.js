'use strict';
//////////// API request ///////////
const authorsApi = mainApi + 'authors/?page_size=200';
const tagsApi = mainApi + 'tags/?page_size=200';
const authorsContainer = $(document).find('.js-authors-container');
const tagsContainer = $(document).find('.js-tags-container');
const authorsButton = $(document).find('.js-authors-link');
const tagsButton = $(document).find('.js-tags-link');
const filterButton = $(document).find('.js-filter-btn');
const applyFilter = $(document).find('.js-apply-filter-btn');
const closeFilterButton = $(document).find('.js-close-btn');
const manifestoButton = $(document).find('#manifesto-btn');
const homeButton = $(document).find('#logo-home');


//////////// Quotes ///////////

let WindowManager = (function() {
   let windowManager = {};

   windowManager.showHome = function() {
        Quote.refreshQuotes();
   };

   windowManager.showManifest = function() {
        Quote.hideAll();
       manifestoContainer.show();
   };

   return windowManager;
})();

$(function() {
    Quote.refreshQuotes();
});


$(document).on('click', '.card', function(event){
    let card = event.target.closest('.card');
    let quoteUrl = card.getAttribute('data-url');

    $.get(quoteUrl, function(quoteData, status) {
        Quote.printQuoteDetail(quoteData);
    })
});


$('.js-load-quotes-btn').click(function() {
    Quote.getQuotes()
});

$('.js-back-btn').click(function() {
    Quote.showQuotesList();
});

//////////// Filters modal ///////////

$(document).on('click', '.filter-option-btn.js-author', function(event){
    let author_btn = $(event.target);
    author_btn.toggleClass('selected');

    let author = {
        id: $(author_btn).attr('id'),
        name: $(author_btn).find('p').text(),
    };

    if (author_btn.hasClass('selected')) {
        Filters.addAuthor(author);
    } else {
        Filters.removeAuthor(author.id);
    }

    Filters.getNumOfFilteredQuotes();
});

$(document).on('click', '.filter-option-btn.js-tag', function(event){
    let tag_btn = $(event.target);
    tag_btn.toggleClass('selected');

    let tag = $(tag_btn).attr('id');

    if (tag_btn.hasClass('selected')) {
        Filters.addTag(tag);
    } else{
        Filters.removeTag(tag);
    }

    Filters.getNumOfFilteredQuotes();
});

function getAuthorsList() {
    $.get(authorsApi, function(authorsData, status) {
        let authors = [];
        if (status === 'success') {
            for (let i = 0; i < authorsData.results.length; i++) {
                let author = {
                    id: authorsData.results[i].id,
                    name: authorsData.results[i].name,
                    url: authorsData.results[i].url,
                };
                authors.push(author);
            }
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
            <div class="filter-option-btn js-author" id="${authors[i].id}">
              <p>${authors[i].name}</p>
            </div>
           `;
    }

    authorsContainer.html(htmlAuthor);
}

function printTags(tags) {
    let htmlTag = '';

    for (let i = 0; i < tags.length; i++) {
        htmlTag += `
            <div class="filter-option-btn js-tag" id="${tags[i].name}">
              <p>${tags[i].name}</p>
            </div>
           `;
    }

    tagsContainer.html(htmlTag);
}


filterButton.click(function() {
    Filters.showFilterModal();
    getAuthorsList();
    getTagsList();
});

authorsButton.click(function() {
    authorsContainer.toggleClass('hidden');
});

tagsButton.click(function() {
    tagsContainer.toggleClass('hidden');
});

manifestoButton.click(function() {
    WindowManager.showManifest();
});

homeButton.click(function() {
    WindowManager.showHome();
});

applyFilter.click(function() {
    Filters.applyFilters();
});

closeFilterButton.click(function() {
    Filters.hideFilterModal();
});
