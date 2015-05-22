var wd = require('wd');
var xtend = require('xtend');

module.exports = Browser;

var DEFAULT_CAPABILITIES = {
  browserName: process.env.BROWSER || 'phantomjs'
};

function Browser(url, capabilities) {
  capabilities = xtend(DEFAULT_CAPABILITIES, capabilities);

  var instance = wd.promiseChainRemote(url)
    .init(capabilities)
    .setWindowSize(1400, 900);

  return instance;
}
