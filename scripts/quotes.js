'use strict';

const mainApi = 'http://verba-mujer.es/api/';

let Quote = (function(){

    let quote = {};

    let quoteContainer = $(document).find('#quotes-container');
    let loadMoreButton = $(document).find('#load-more-quotes');
    let nextQuotesUrl = mainApi + 'quotes';

    let print = function(quote) {
        let text = quote.text;
        if (text.length > 90) {
            return `
              <div class="card" data-url="${quote.url}">
                <h1>"${text.substring(0, 90)}..."</h1>
                <h2>${quote.author}</h2>
                <p class="js-quote-url hidden">${quote.url}</p>
              </div>
             `;
        }

        return `
              <div class="card">
                <h1>"${text}"</h1>
                <h2>${quote.author}</h2>
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
                    };
                    quotes.push(quote);
                }

                printQuotes(quotes, quoteContainer);
                printLoadMoreButton();
            } else {
                console.log('Error del servidor, puede que el archivo no exista o que se haya producido un error interno en el servidor');
            }

        });

    };

    quote.getFilteredQuotes = function(filterUrl) {
        nextQuotesUrl = filterUrl;
        quoteContainer.html('');

        Quote.getQuotes();
    };

    quote.showDetail = function() {
        $('#quotes-list').hide();
        loadMoreButton.hide();

        $('#quote-detail').show();
    };

    quote.hideDetail = function() {
        $('#quotes-list').show();
        printLoadMoreButton();

        $('#quote-detail').hide();
    };

    quote.printQuoteDetail = function(quoteData) {
        Quote.showDetail();

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
    };

    return quote;
})();
