const _ = require('lodash')

/**
 * Simple Memory-Based Storage
 */
module.exports = {
  data: {},

  /**
   * Save item
   * @param {String} key
   * @param {*} value
   * @returns {*} value
   */
  set (key, value) {
    return _.set(this.data, key, value)
  },

  /**
   * Get item
   * @param {String} key
   * @param {*} defaultValue
   * @returns {*} value
   */
  get (key, defaultValue) {
    return _.get(this.data, key, defaultValue)
  },

  /**
   * Check has an item
   * @param {String} key
   * @returns {Boolean}
   */
  has (key) {
    return _.has(this.data, key)
  },

  /**
   * Get all items
   * @returns {*} All items
   */
  all () {
    return this.data
  },

  /**
   * Reset all data
   * @returns {void}
   */
  reset () {
    this.data = {}
  },
}
