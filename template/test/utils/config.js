require('dotenv').config()

const _   = require('lodash')
const cfg = require('../../test.config.js')
const env = process.env.NODE_ENV || 'development'

module.exports = _.merge({}, cfg.global, _.get(cfg, env, {}))
