export default {
  notBlank({ name }) {
    return (v) => !!v || name + ' is required'
  },
  number({ name }) {
    return (v) =>
      /^\d+\.?\d*?$/.test(v) || name + ' has incorrect format. Correct is 0.00'
  },
  maxDecimals({ name, value }) {
    return (v) =>
      !new RegExp('\\.\\d{' + (value + 1) + ',}').test(v) ||
      name + ' has too many decimal places (max ' + value + ').'
  },
  gte({ name, value }) {
    return (v) =>
      parseFloat(v) >= parseFloat(value) ||
      name + ' must be greater or equal ' + value
  },
  lte({ name, value }) {
    return (v) =>
      parseFloat(v) <= parseFloat(value) ||
      name + ' must be less or equal ' + value
  },
  walletAddress({ name }) {
    return (v) =>
      /^0x[A-Fa-f0-9]{40}$/.test(v) ||
      name + ' must be in format 0x1234512345123451234512345123451234512345'
  },
  redditUsernameRegex: '[A-Za-z0-9\\-_]{3,20}',
  twitterUsernameRegex: '[A-Za-z0-9_]{3,20}',
}
