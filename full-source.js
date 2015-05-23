var Browser = require('./browser');

var browser = Browser('http://localhost:4444/wd/hub');

browser
 .get('http://nodeschool.io/international-day/')
 .waitForElement('css selector',  '.event-list', 5000)
 .elementsByCssSelector('.event-list li')
 .then(function(elements) {
   elements.forEach(function(e) { e.text(print); });

   function print(err, text) {
    console.log('Location: ', text);
   }

  })
 .fin(function(){ browser.quit(); })
 .done();
