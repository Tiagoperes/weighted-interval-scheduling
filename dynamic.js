(function () {
  'use strict';

  function compatibles(intervals, index) {
    var i = index - 1;
    while (i >= 0 && intervals[i].end > intervals[index].start) i--;
    return i;
  }

  function resetSolutionInfo(intervals) {
    _.forEach(intervals, function (interval) {
      interval.chosen = false;
    });
  }

  function markSolution(intervals, best) {
    var i = intervals.length - 1;

    resetSolutionInfo(intervals);

    while (i >= 0) {
      let compatibleIndex = compatibles(intervals, i);
      if (intervals[i].weight + best[compatibleIndex + 1] === best[i + 1]) {
        intervals[i].chosen = true;
        i = compatibleIndex;
      } else {
        i--;
      }
    }
  }

  function optimal(intervals) {
    var best = [];
    intervals = _.orderBy(intervals, 'end');
    best[0] = 0;
    for (let i = 0; i < intervals.length; i++) {
      let including = intervals[i].weight + best[compatibles(intervals, i) + 1];
      let excluding = best[i];
      best[i + 1] = _.max([including, excluding]);
    }
    markSolution(intervals, best);
    return _.last(best);
  }

  window.scheduling = window.scheduling || {};
  scheduling.dynamic = {optimal: optimal};
}());
