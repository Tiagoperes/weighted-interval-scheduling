(function () {
  'use strict';

  function createInterval(maxSize, tmin, tmax) {
    var start = _.random(tmin, tmax),
        end = _.random(start + 1, start + maxSize);

    return {
      weight: Math.random(),
      start: start,
      end: end < tmax ? end : tmax
    };
  }

  function generateProblem(n, maxSize, tmin, tmax) {
    var intervals = [];
    for (let i = 0; i < n; i++) {
      intervals.push(createInterval(maxSize, tmin, tmax));
    }
    return intervals;
  }

  window.scheduling = window.scheduling || {};
  scheduling.problem = {generate: generateProblem};
}());
