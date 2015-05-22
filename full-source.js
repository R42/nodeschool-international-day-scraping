
var Browser = require('./browser');

/*
 *  The nodeschool international day web's page isn't a static page.
 *  The  Event list ( left side ) will be loaded on document ready.
 *  How can we create a list/json of places that the event will occur ?
 *
 *   - curl http://nodeschool.io/international-day/ will return only the 'layout'
 *   - cheerio will save your ass when the web page that you are scraping is static ( one shot )
 *
 *   solution:
 *     Selenium Webdriver
 * */

var browser = Browser('http://localhost:4444/wd/hub');

/*
 *  GOAL: Fetch full page source
 *
 *  we have to wait until event-list be fetched from nodeschool server
 *  http://nodeschool.io/international-day/events.csv
 *
 *  obvioulsy, no one will scrape if upfront we know ( soubessemos ) that exist an available endpoint to do that.
 *  much more easier curl http://nodeschool.io/international-day/events.csv and parse the csv data.
 *
 *
 * */

browser
  .get('http://nodeschool.io/international-day/')
  .waitForElement('css selector',  '.event-list', 5000)
  .source()
  .then(console.log)
  .fin(function(){ browser.quit(); })
  .done();



