const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {

  let results = [];
  let useArr = [];

  if (!Array.isArray(arr)) {
    throw new Error ('\'arr\' parameter must be an instance of the Array!');
  }

  if(arr.length === 0) {
    return []
  }

  const checkValue = (value) => {
    if (value === '--double-next' || value === '--double-prev' || value === '--discard-next') {
      return 'пропустить';
    }
  };

  const checkUseItem = (value) => {
    if(useArr.some(it => it === value)) {
      return 'пропустить';
    }
  }

  for (let i = 0; i < arr.length; i++) {
    if(arr[i] === '--double-next') {
      if(i === arr.length - 1) {
        continue
      } else {
        if(checkValue(arr[i + 1]) === 'пропустить' || checkUseItem(i + 1) === 'пропустить') {
          continue
        }
        results.push(arr[i + 1]);
        continue
      }
    }

    if(arr[i] === '--discard-prev') {
      if(i === 0) {
        continue
      } else {
        if(checkValue(arr[i - 1]) === 'пропустить' || checkUseItem(i - 1) === 'пропустить') {
          continue
        }
        results.pop();
        continue
      }
    }

    if(arr[i] === '--double-prev') {
      console.log('prev')
      if(i === 0) {
        continue
      } else {
        console.log(arr[i - 1])
        if(checkValue(arr[i - 1]) === 'пропустить' || checkUseItem(i - 1) === 'пропустить') {
          continue
        }
        results.push(arr[i - 1]);
        continue
      }
    }

    if(arr[i] === '--discard-next') {
      if(i === arr.length - 1) {
        continue
      } else {
        useArr.push(i + 1);
        i += 1;
        continue
      }
    }

    if(checkValue(arr[i]) !== 'пропустить')
      results.push(arr[i]);
  }

  return results
}

module.exports = {
  transform
};
