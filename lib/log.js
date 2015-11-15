/* jslint node: true */

/**
 * Encapsulates logging in order to support different methods.
 *
 * @param {String} message
 * @method log
 */
var log = function(message) {
  console.log(message);
};

module.exports = log;
