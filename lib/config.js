/* jslint node: true, esnext: true */

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
  _getHome() {
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
      config = require(this._getHome() + '/' + this.CONFIG_FILE);
    } catch (e) {
      throw new Error('Configuration file is missing.');
    }

    return config;
  }
};

module.exports = Config.getConfig();
