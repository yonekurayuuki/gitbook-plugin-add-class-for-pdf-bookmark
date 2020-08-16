const cheerio = require('cheerio');

var h1 = 0
var h2 = 0
var h3 = 0

module.exports = {
  hooks: {
    "page": function(page) {
      $ = cheerio.load(page.content);
      $('h1, h2, h3').each(function(i, h){
        if($(h).get(0).tagName == 'h1'){
          h1 += 1;
          h2 = 0;
          h3 = 0;
          $('<span style="visibility: hidden;" class="book-chapter book-chapter-1">' + h1 + '. ' +$(h).text() + '</span>').insertBefore($(h));
        }

        if($(h).get(0).tagName == 'h2'){
          h2 += 1;
          h3 = 0;
          $('<span style="visibility: hidden;" class="book-chapter book-chapter-2">' + h1 + '.' + h2 + '. ' +$(h).text() + '</span>').insertBefore($(h));
        }

        if($(h).get(0).tagName == 'h3'){
          h3 += 1;
          $('<span style="visibility: hidden;" class="book-chapter-3">' + h1 + '.' + h2 + '.' +h3 + '. ' + $(h).text() + '</span>').insertBefore($(h));
        }

      });
      page.content = $.html();
      return page;
    }
  }
}
