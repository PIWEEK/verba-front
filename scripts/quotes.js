'use strict';

const mainApi = 'http://verba-mujer.es/api/';
const quotesApi = mainApi + 'quotes/';
const manifestoContainer = $(document).find('#manifesto');

let Quote = (function(){

    let quote = {};

    let quoteContainer = $(document).find('#quotes-container');
    let loadMoreButton = $(document).find('#load-more-quotes');
    let applyFilterButton = $(document).find('.js-apply-filter-btn');
    let nextQuotesUrl = quotesApi;

    let printTags = function(tags) {
        let tagsHtml = '';

        for (let i = 0; i < tags.length; i++) {
            let tag = tags[i].name;
            tagsHtml += `
                <div class="quote-tag" id="${tag}">
                  <p>${tag}</p>
                </div>
           `;
        }

        return tagsHtml;
    };

    let print = function(quote) {
        let tagsHtml = printTags($(quote.tags));

        let text = quote.text;
        if (text.length > 90) {
            return `
              <div class="card" data-url="${quote.url}">
                <h1>"${text.substring(0, 90)}..."</h1>
                <h2>${quote.author}</h2>
                <div class="quote-tags">
                    ${tagsHtml}
                </div>
              </div>
             `;
        }

        return `
              <div class="card" data-url="${quote.url}">
                <h1>"${text}"</h1>
                <h2>${quote.author}</h2>
                 <div class="quote-tags">
                    ${tagsHtml}
                </div>
              </div>
               `;
    };

    let printQuotes = function(quotes, htmlContainer) {
        let htmlQuote = '';
        for (let i = 0; i < quotes.length; i++) {
            let quote = quotes[i];
            htmlQuote += print(quote);
        }

        htmlContainer.append(htmlQuote);
    };

    let printLoadMoreButton = function() {
      if (nextQuotesUrl === null) {
          loadMoreButton.hide();
      }  else {
          loadMoreButton.show();
      }
    };

    quote.getQuotes = function() {

        $.get(nextQuotesUrl, function(quotesData, status) {
            let quotes = [];

            if (status === 'success') {
                nextQuotesUrl = quotesData.next;

                for (let i = 0; i < quotesData.results.length; i++) {
                    let quoteResult = quotesData.results[i];
                    let quote = {
                        text: quoteResult.text,
                        author: quoteResult.author.name,
                        url: quoteResult.url,
                        tags: quoteResult.tags,
                    };
                    quotes.push(quote);
                }

                printQuotes(quotes, quoteContainer);
                printLoadMoreButton();
            } else {
                console.log('Error del servidor, puede que el archivo no exista o que se haya producido un error interno en el servidor');
            }
        });

        quote.showQuotesList();
    };


    quote.getFilteredQuotes = function(filterUrl) {
        nextQuotesUrl = filterUrl;
        quoteContainer.html('');

        Quote.getQuotes();
    };

    quote.refreshQuotes = function() {
        quote.getFilteredQuotes(quotesApi);
    };

    quote.showDetail = function() {
        $('#quotes-list').hide();
        loadMoreButton.hide();

        $('#quote-detail').show();
        manifestoContainer.hide();
    };

    quote.showQuotesList = function() {
        $('#quotes-list').show();
        printLoadMoreButton();

        $('#quote-detail').hide();
        manifestoContainer.hide();
    };

    quote.hideAll = function() {
        $('#quotes-list').hide();
        loadMoreButton.hide();
        $('#quote-detail').hide();
    };

    quote.printQuoteDetail = function(quoteData) {
        let quoteDetail = $('#quote-detail');
        let author = quoteData.author;

        quoteDetail.find('.quote-text').html(quoteData.text);
        quoteDetail.find('.quote-author').html(author.name);
        quoteDetail.find('.author-detail-image > img').attr('src', author.image);
        let quotes = [];


        for (let i = 0; i < quoteData.related_quotes.length; i++) {
            let relatedQuote = quoteData.related_quotes[i];
            let quote = {
                text: relatedQuote.text,
                author: relatedQuote.author_name,
                url: relatedQuote.url,
            };
            quotes.push(quote);
        }

        let quoteDetailContainer = quoteDetail.find('.related-quotes');
        quoteDetailContainer.html('');
        printQuotes(quotes, quoteDetailContainer);

        Quote.showDetail();
    };

    return quote;
})();
