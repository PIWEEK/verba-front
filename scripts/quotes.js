let Quote = (function(){

    let quote = {};

    quote.print = function(quote) {
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

    quote.printQuotes = function(quotes, htmlContainer) {
        let htmlQuote = '';
        for (let i = 0; i < quotes.length; i++) {
            let quote = quotes[i];
            htmlQuote += Quote.print(quote);
        }

        htmlContainer.html(htmlQuote);
    };

    quote.hideQuotesList = function() {
        $('#quotes-list').html('');
    };

    quote.showQuoteDetail = function(quoteData) {
        let quoteDetail = $('#quote-detail');
        let author = quoteData.author;
        quoteDetail.toggleClass('hidden');

        quoteDetail.find('.quote-text').html(quoteData.text);
        quoteDetail.find('.quote-author').html(author.name);
        quoteDetail.find('.author-image > img').attr('src', author.image);
        // quoteDetail.find('.related-quotes').html(Quote.printQuotes(quoteDetail.))
    };

    return quote;
})();