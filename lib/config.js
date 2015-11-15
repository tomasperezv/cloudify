/* jslint node: true, esnext: true */
var log = require('./log');

/**
 * @Object Config
 */
var Config = {

  /**
   * @type {String} CONFIG_FILE
   */
  CONFIG_FILE: '.cloudify.json',

  /**
   * @method getHome
   * @return {String}
   * @private
   */
  getHome() {
    return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
  },

  /**
   * @method geConfig
   * @return {Object}
   * @public
   */
  getConfig() {
    var config = null;
    try {
      config = require(this._getHome() + this.CONFIG_FILE);
    } catch (e) {
      log('Error: ' + this.CONFIG_FILE + ' not found');
      return -1;
    }

    return config;
  }
};

module.exports = Config.getConfig();
