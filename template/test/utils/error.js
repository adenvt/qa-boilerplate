const logger = require('mocha-logger')

/**
 * Dump error into informative console log
 * @param {Error} error
 * @returns {void}
 */
function handleError (err) {
  if (err.response && err.response.body) {
    if (typeof err.response.body === 'object') {
      if (err.response.body.code && err.response.body.message) {
        logger.error(
          err.response.body.code,
          err.response.body.message,
          `\n===== Response Errors:\n${JSON.stringify(err.response.body.errors, null, 2)}\n=====`,
        )
      }
    } else {
      logger.error(
        err.message,
        `\n===== Response:\n${JSON.stringify(err.response.body, null, 2)}\n=====`,
      )
    }
  }
}

module.exports = handleError
