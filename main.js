(function () {
  'use strict';

  const TMIN = 0,
        TMAX = 100,
        MAX_SIZE = 10;

  function getIntervals(n, maxSize, tmin, tmax) {
    if (n instanceof Array) {
      return n;
    }

    maxSize = maxSize || MAX_SIZE;
    tmin = tmin || TMIN;
    tmax = tmax || TMAX;
    window.scheduling.trange = tmax - tmin;

    return scheduling.problem.generate(n, maxSize, tmin, tmax);
  }

  function solve(intervals, strategy) {
    var start = new Date().getTime();
    var solution = strategy(intervals);
    return {
      solution: solution,
      time: new Date().getTime() - start
    };
  }

  function execute(n, maxSize, tmin, tmax) {
    var intervals = getIntervals(n, maxSize, tmin, tmax);
    var ordered = _.orderBy(intervals, 'end');
    var recursive, dynamic;
    console.log('--------------------------------------------');
    window.scheduling.lastInput = intervals;
    scheduling.graphics.printIntervalsToScreen(ordered);
    console.log('Recursive solution:');
    recursive = solve(intervals, scheduling.recursive.optimal);
    console.log(recursive.solution);
    console.log('Time taken: ' + recursive.time + 'ms');
    console.log('\nDP solution:');
    dynamic = solve(intervals, scheduling.dynamic.optimal);
    console.log(dynamic.solution);
    console.log('Time taken: ' + dynamic.time + 'ms');
    console.log('\nCorrect: ' + _.isEqual(dynamic.solution, recursive.solution));
    scheduling.graphics.printSolution(ordered);
  }

  window.scheduling = window.scheduling || {};
  scheduling.execute = execute;
}());
