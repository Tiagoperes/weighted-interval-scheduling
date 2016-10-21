(function () {

  var timePixel;

  function printGrid() {
    $('.grid').remove();
    $('body').append('<ul class="grid"></ul>');
    for (let i = 0; i < window.scheduling.trange; i++) {
      let column = $('<li></li>');
      column.css('width', timePixel - 1);
      $('.grid').append(column);
    }
  }

  function calculateTimeToPixel() {
    timePixel = Math.floor($('body').width() / window.scheduling.trange);
    if (timePixel < 5) timePixel = 5;
  }

  function getIntervalGraphic(interval) {
    var graphic = $('<li>' + Math.round(interval.weight * 100) + '</li>');
    graphic.css({
      marginLeft: interval.start * timePixel,
      width: (interval.end - interval.start) * timePixel
    });
    return graphic;
  }

  function erase() {
    var list = $('.intervals');
    if (!list.length) {
      $('body').append('<ul class="intervals"></ul>');
      return $('.intervals');
    }
    list.html('');
    return list;
  }

  function printIntervalsToScreen(intervals) {
    var list = erase();
    calculateTimeToPixel();
    printGrid();
    _.forEach(intervals, function (interval) {
      list.append(getIntervalGraphic(interval));
    });
  }

  function printSolution(intervals) {
    var list = $('.intervals li');
    _.forEach(intervals, function (interval, i) {
      if (interval.chosen) {
        $(list[i]).addClass('solution');
      }
    });
  }

  window.scheduling = window.scheduling || {};
  scheduling.graphics = {
    printIntervalsToScreen: printIntervalsToScreen,
    printSolution: printSolution
  };

}());
