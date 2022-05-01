const { NotImplementedError } = require('../extensions/index.js');

const MODERN_ACTIVITY = 15;
const HALF_LIFE_PERIOD = 5730;

/**
 * Determine the age of archeological find by using
 * given MODERN_ACTIVITY and HALF_LIFE_PERIOD values
 *
 * @param {String} sampleActivity string representation of current activity
 * @return {Number | Boolean} calculated age in years or false
 * in case of incorrect sampleActivity
 *
 * @example
 *
 * dateSample('1') => 22387
 * dateSample('WOOT!') => false
 *
 */
function dateSample(year) {
  let number = 0;
  if (typeof (year) === 'string') {
      if (year >= 1 && year <= 15) {
        number = Math.log(15 / year) / (0.693 / 5730);
      } else {
      return false
    }
  } else {
    return false
  }

  return Math.ceil(number)
}

module.exports = {
  dateSample
};
