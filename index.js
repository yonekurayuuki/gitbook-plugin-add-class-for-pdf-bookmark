const cheerio = require('cheerio');

module.exports = {
  hooks: {
    "page": function(page) {
      $('h1').each(function (i, h1)){
        $(h1).before('<span>hogehoge</span>')
      }
    }
  }
}
