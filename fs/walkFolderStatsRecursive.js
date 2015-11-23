"use strict";
var fs      = require('fs');
var path    = require('path');
var async   = require('async');
var forEach = require('mout/array/forEach');
var debounce= require('mout/function/debounce');
var diff    = require('mout/date/diff')


var readStatRecursive = function(dir, done, cb) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          readStatRecursive(file, function(err, res) {
            results = results.concat(res);
            next();
          }, cb);
        } else {
          results.push(file);
          stat.file_path = file;
          cb(err, stat)
          next();
        }
      });
    })();
  });
};




module.exports = function(dir_path, taskcb, endcb){
  var queue = async.queue(function(stat, cb){
      if(stat)
        taskcb(stat);
      cb();
  }, 10);

  var done = false ;
  readStatRecursive(dir_path ,
   function(err){
     done = true ;
     queue.push(null);
   },
   function(err , stats){
    queue.push(stats)
  })

  queue.drain = function(){
    if(done)
      endcb();
  }
}
