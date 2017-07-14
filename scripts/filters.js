'use strict';

let Filters = (function(){

    let filters = {};

    let authorFiltersAppliedContainer = $(document).find('#author-filters-applied');
    let tagFiltersAppliedContainer = $(document).find('#tag-filters-applied');
    let authors = [];
    let tags = [];

    let findAuthor = function(author_id) {
        for (let i = 0; i < authors.length; i++) {
            if (authors[i].id === author_id) {
                return i;
            }
        }

        return -1;
    };

    let findTag = function(tag) {
        for (let i = 0; i < tags.length; i++) {
            if (tags[i] === tag) {
                return i;
            }
        }

        return -1;
    };

    let buildFilteredQuotesUrl = function(urlFilters) {
        if (authors.length > 0) {
            urlFilters += 'author=';

            for (let i = 0; i < authors.length; i++) {
                urlFilters += authors[i].id;

                if (i < authors.length - 1) {
                    urlFilters += ',';
                } else {
                    urlFilters +='&';
                }
            }
        }

        if (tags.length > 0) {
            urlFilters += 'tags=';

            for (let i = 0; i < tags.length; i++) {
                urlFilters += tags[i];

                if (i < tags.length - 1) {
                    urlFilters += ',';
                }
            }
        }

        return urlFilters;
    };

    let printAppliedFilters = function() {
        let authorFilterHtml = '';
        for (let i = 0; i < authors.length; i++) {
            authorFilterHtml += `
                <div class="filter-author-applied " id="${authors[i].id}">
                  <p>${authors[i].name}</p>
                </div>
            `;
        }

        authorFiltersAppliedContainer.html(authorFilterHtml);

        let tagFilterHtml = '';

        for (let i = 0; i < tags.length; i++) {
            tagFilterHtml += `
                <div class="filter-tag-applied " id="${tags[i]}">
                  <p>${tags[i]}</p>
                </div>
            `;
        }

        tagFiltersAppliedContainer.html(tagFilterHtml);
    };

    filters.addAuthor = function(author) {
        if (findAuthor(author.id) < 0) {
            authors.push(author);
        }
    };

    filters.removeAuthor = function(author_id) {
        authors = $.grep(authors, function(author) {
            return author.id !== author_id;
        })
    };

    filters.addTag = function(tag) {
        if (findTag(tag) < 0) {
            tags.push(tag);
        }
    };

    filters.removeTag = function(tag_name) {
        tags = $.grep(tags, function(tag) {
            return tag !== tag_name;
        })
    };

    filters.applyFilters = function() {
        printAppliedFilters();
        let filterQuotesUrl = buildFilteredQuotesUrl(quotesApi + '?');
        Quote.getFilteredQuotes(filterQuotesUrl);
        filters.hideFilterModal();
    };

    filters.countPotentialFilteredQuotes = function() {
        let filterQuotesUrl = buildFilteredQuotesUrl(quotesApi + 'count?');
        Quote.getFilteredQuotes(filterQuotesUrl);

    };

    filters.showFilterModal = function () {
        $(document).find('.js-filter-modal').show();
        $(document).find('body').addClass('overflow-hidden');
    };

    filters.hideFilterModal = function () {
        $(document).find('.js-filter-modal').hide();
        $(document).find('body').removeClass('overflow-hidden');
    };

    return filters;

})();