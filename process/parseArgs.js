"use strict";

const startsWith = require('mout/string/startsWith');
const isArray    = require('mout/lang/isArray');

const JSON_ARGS = new RegExp("::json$");

module.exports = function(argv) {

  /* istanbul ignore if  */
  if(arguments.length == 0)
    argv = process.argv.slice(2);

  var args = [];
  var dict = {};
  var rest;
  var r;
  var e = new RegExp("^--?([a-z_0-9/:-]+)(?:=(.*))?", "i");

  argv.forEach(function(arg, i) {
    var k;
    var v;
    if(rest !== undefined)
      return;
    if(arg == "--") {
      rest = argv.slice(i + 1).join(' ');
    } else if(!startsWith(arg, '-')) {
      args.push(arg);
    } else if(e.test(arg)) {
      r = e.exec(arg);
      k = r[1], v = r[2] === undefined ? true : r[2];

      if(JSON_ARGS.test(k)) {
        k = k.substr(0, k.length - 6);
        v = JSON.parse(v);
      }

      if(typeof v === 'string' && v !== '' && isFinite(v)) //mout isFinite force parseFloat
        v = parseFloat(v);

      if(dict[k] !== undefined) {
        if(!isArray(dict[k]))
          dict[k] = [dict[k]];

        dict[k].push(v);
      } else {
        dict[k] = v;
      }
    }
  });

  return {args, dict, rest};
};
