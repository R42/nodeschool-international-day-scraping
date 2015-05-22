var Browser = require('./browser');

/*
 *  Let's scrap the landing.jobs
 *
 *   - go to landing.jobs
 *   - click ('SEE OUR CURATED JOB OFFERS')
 *   - fetch $('#job-list li .job')
 *   -
 * */

var browser = Browser('http://localhost:4444/wd/hub');

var offersPage = browser
  .get('https://landing.jobs')
  .waitForElement('link text', 'SEE OUR CURATED JOB OFFERS', 5000)
  .element('link text', 'SEE OUR CURATED JOB OFFERS')
  .click()
  .then(fetchOffers)
  .catch(console.log.bind(console, 'ERROR: '));


function fetchOffers(page) {
 console.log('fetchOffers');

 offersPage
  .waitForElement('css selector', '#job-list', 5000)
  .execute(extractFunctionBody(landingJobsScript))
  .then(printOffers)
  .catch(console.log.bind(console, 'ERROR: '));
}

function printOffers(offers) {
  console.log('offers', offers);

  offers.forEach(function(offer) {
    var result = {
     'Company Name': offer.company_name,
     'Job Title': offer.job_title,
     'Short Description': offer.short_desc,
     'Reward':  offer.reward_value
     };

     console.log(result);
  });
}

function extractFunctionBody(fn) {
 return fn.toString().match(/function\s+.+\(.*\)\s+\{([\s\S]+)\}/)[1];
}

function landingJobsScript() {

 var $offers = $('#job-list li .job');
 return $offers.map(mapper);

 function mapper(idx, offer) {
  var result = {};
  var $offerDetails = $(offer).find('.description');

   result.company_name = $offerDetails.find('.company_name').text().trim();
   result.job_title = $offerDetails.find('.job_title').text().trim();
   result.short_desc = $offerDetails.find('.short_desc').text().trim();
   result.reward_value = $(offer).find('.reward_value p').last().text();

   return result;
 }

}
