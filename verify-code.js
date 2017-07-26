/* 
 * Verify code for browser, use canvas to generate code
 * @param {Object} options setting
 */
function verifyCode(options) {
  if (options && typeof options !== 'object') {
    return new TypeError('Param `options` is not a object');
  }
  // base set
  options = options || {};
  options.width = options.width || 90;
  options.height = options.height || 30;
  options.baseBackgroundColor = options.baseBackgroundColor || '#fff';
  options.codeLength = options.codeLength || 4;
  /*
  * get random float value amount [start, end)
  */
  var randFloat = function(start, end) {
    return start + Math.random() * (end - start);
  };

  /*
  * get random integer value amount [start, end)
  */
  var randInt = function(start, end) {
    return Math.floor(Math.random() * (end - start)) + start;
  };

  var items = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPRSTUVWXYZ23456789'.split('');
  var vcode = '';
  var canvas = document.createElement('canvas');
  canvas.width = options.width;
  canvas.height = options.height;
  var ctx = canvas.getContext('2d');

  // background set
  ctx.fillStyle = options.baseBackgroundColor;
  ctx.fillRect(0, 0, options.width, options.height);
  ctx.globalAlpha = 0.8;
  ctx.font = '15px sans-serif';

  for (var i = 0; i < 10; i++) {
    ctx.fillStyle = 'rgb(' + randInt(160, 230) + ',' + randInt(160, 230) + ',' + randInt(160, 230) + ')';
    for (var j = 0; j < 5; j++) {
      ctx.fillText(items[randInt(0, items.length)], randFloat(-10, options.width + 10), randFloat(-10, options.height + 10));
    }
  }

  // verify code set
  var color = 'rgb(' + randInt(0, 120) + ',' + randInt(0, 120) + ',' + randInt(0, 120) + ')';
  ctx.font = 'bold 30px sans-serif';
  for (var i = 0; i < options.codeLength; i++) {
    var j = randInt(0, items.length);
    ctx.fillStyle = color;
    ctx.fillText(items[j], 5 + i * 23, 25);
    var a = randFloat(0.85, 1.0); // scales horizontally
    var b = randFloat(-0.04, 0);  // skews horizontally
    var c = randFloat(-0.3, 0.3); // skews vertically
    var d = randFloat(0.85, 1.0); // scales vertically
    ctx.transform(a, b, c, d, 0, 0);
    vcode += items[j];
  }

  // sin line set
  ctx.beginPath();
  ctx.strokeStyle = color;
  var A = randFloat(10, options.height / 2);
  var b = randFloat(options.height / 4, 3 * options.height / 4);
  var f = randFloat(options.height / 4, 3 * options.height / 4);
  var T = randFloat(options.height * 1.5, options.width);
  var w = 2 * Math.PI / T;
  var S = function(x) {
    return A * Math.sin(w * x + f) + b;
  }
  ctx.linewidth = 5;
  for (var x = -20; x < 200; x += 4) {
    ctx.moveTo(x, S(x));
    ctx.lineTo(x + 3, S(x + 3));
  }
  ctx.closePath();
  ctx.stroke();

  return {
    code: vcode,
    dataURL: canvas.toDataURL()
  };
};
