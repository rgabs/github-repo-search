'use strict';

// This is a custom Jest transformer turning style imports into empty objects.
// http://facebook.github.io/jest/docs/tutorial-webpack.html

module.exports = {
  process () {
    console.log('in process');
    return 'module.exports = {};';
  },
  getCacheKey () {
    console.log('in etca');
    // The output is always the same.
    return 'cssTransform';
  },
};
