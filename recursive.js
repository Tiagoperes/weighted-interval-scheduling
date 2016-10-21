(function () {
  'use strict';

  function compatibles(intervals, index) {
    var i = index - 1;
    while (i >= 0 && intervals[i].end > intervals[index].start) i--;
    return i;
  }

  function optimal(intervals, n) {
    var including, excluding;
    if (n < 0) return 0;
    including = intervals[n].weight + optimal(intervals, compatibles(intervals, n));
    excluding = optimal(intervals, n - 1);
    return _.max([including, excluding]);
  }

  function callToOptimal(intervals) {
    return optimal(_.orderBy(intervals, 'end'), intervals.length - 1);
  }

  window.scheduling = window.scheduling || {};
  scheduling.recursive = {optimal: callToOptimal};
}());
