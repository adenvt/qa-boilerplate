module.exports = {
  global: { // Global config, shared across enviroment
    basicAuth: {
      user    : process.env.BASIC_USER, // value from .env file
      password: process.env.BASIC_PASS, // value from .env file
    },
    foo: 'bar',
  },
  development: {
    baseURL: 'https://example.com',
    login  : {
      user: 'username',
      pass: 'password',
    },
    foo: 'baz', // Replace global config
  },
  staging   : { baseURL: 'https://example.com' },
  production: { baseURL: 'https://example.com' },
}
