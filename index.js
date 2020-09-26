const cheerio = require('cheerio');

var h1 = 0;
var h2 = 0;
var h3 = 0;
var depth;

module.exports = {
  book: {},
  hooks: {
    "page": function(page) {
      if(this.options.pluginsConfig['depth'] !== undefined)
        depth = this.options.pluginsConfig['depth'];
      else
        depth = 0;
      $ = cheerio.load(page.content);
      $('h1, h2, h3').each(function(i, h){
        if($(h).get(0).tagName == 'h1'){
          h1 += 1;
          h2 = 0;
          h3 = 0;
          $('<span style="visibility: hidden; display: none;" class="book-chapter book-chapter-1">' + h1 + '. ' +$(h).text() + '</span>').insertBefore($(h));
        }
        if(depth === 1) return true;

        if($(h).get(0).tagName == 'h2'){
          h2 += 1;
          h3 = 0;
          $('<span style="visibility: hidden; display: none;" class="book-chapter book-chapter-2">' + h1 + '.' + h2 + '. ' +$(h).text() + '</span>').insertBefore($(h));
        }
        if(depth === 2) return true;

        if($(h).get(0).tagName == 'h3'){
          h3 += 1;
          $('<span style="visibility: hidden; display: none;" class="book-chapter-3">' + h1 + '.' + h2 + '.' +h3 + '. ' + $(h).text() + '</span>').insertBefore($(h));
        }
      });
      page.content = $.html();
      return page;
    }
  }
}
