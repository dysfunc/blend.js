'use strict';

/*!
 *                __                      __
 *               /\ \__                  /\ \        __
 *     __   __  _\ \ ,_\    __    ___    \_\ \      /\_\    ____
 *   /'__`\/\ \/'\\ \ \/  /'__`\/' _ `\  /'_` \     \/\ \  /',__\
 *  /\  __/\/>  </ \ \ \_/\  __//\ \/\ \/\ \_\ \  __ \ \ \/\__, `\
 *  \ \____\/\_/\_\ \ \__\ \____\ \_\ \_\ \___,_\/\_\_\ \ \/\____/
 *   \/____/\//\/_/  \/__/\/____/\/_/\/_/\/__,_ /\/_/\ \_\ \/___/
 *                                                  \ \____/
 *                                                   \/___/
 * @author   Kieran Boyle (github.com/dysfunc)
 * @version  1.0.0
 * @link     https://github.com/dysfunc/extend.js
 *
 */

var extend = (function(){
  /*
   * Determine whether an Object is a plain object or not (created using "{}" or "new Object")
   * @param  {Object}  obj Object we want to check
   * @return {Boolean}     True/False result
   */
  var isPlainObject = function(obj){
   return !(typeof(obj) !== 'object' || obj && obj.nodeType || obj !== null && obj === obj.window || obj && obj.constructor && !Object.prototype.hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf'));
  };

  /**
   * Removes duplicates from an Array
   * @param  {Array}  Array Array to dedup
   * @return {Array}        Array containing only unique values
   */
  var unique = function(array){
    var a = array.concat();

    for(var i = 0; i < a.length; ++i){
      for(var j = i + 1; j < a.length; ++j){
        if(a[i] === a[j]){
          a.splice(j--, 1);
        }
      }
    }

    return a;
  };

  /**
   * Merge the contents of two or more objects into the target object
   * @param  {Boolean} deep      If true, the merge becomes recursive (optional)
   * @param  {Boolean} dedup     If true, arrays will be deduped after merge
   * @param  {Object}  target    The object receiving the new properties
   * @param  {Object}  arguments One or more additional objects to merge with the first
   * @return {Object}            The target object with the new contents
   *
   * merge(object, object2)             // shallow copy
   * merge(true, object, object2)       // deep copy
   * merge(true, true, object, object2) // deep copy + dedup arrays
   */
  var merge = function(target){
    var i = 1,
        deep = false,
        dedup = false;

    if(typeof(target) === 'boolean'){
      deep = target;
      target = arguments[1] || {};
      i++;

      if(typeof(target) === 'boolean'){
        dedup = target;
        target = arguments[2] || {};
        i++;
      }
    }

    [].slice.call(arguments, i).forEach(function(obj){
      var src, copy, isArray, clone;

      if(obj === target){
        return;
      }

      if(deep && obj instanceof Array){
        target = dedup ? unique(target.concat(obj)) : target.concat(obj);
      }
      else{
        for(var key in obj){
          src = target[key];
          copy = obj[key];

          if(target === copy || src === copy){
            continue;
          }

          if((isArray = copy instanceof Array) || deep && copy && (isPlainObject(copy))){
            if(isArray){
              clone = (src && src instanceof Array) ? src : [];
            }else{
              clone = (src && isPlainObject(src)) ? src : {};
            }

            isArray = false;

            if(dedup){
              target[key] = merge(deep, dedup, clone, copy);
            }else{
              target[key] = merge(deep, clone, copy);
            }
          }
          else if(copy !== undefined){
            target[key] = copy;
          }
        }
      }
    });

    return target;
  };

  return merge;
}());

/**
 * Export to all the things!
 * @param {String} name       String containing the global namespace reference
 * @param {Mixed}  definition Object or function definition
 */
function exporter(name, definition){
  // amd
  if(typeof define === 'function'){
    define(definition);

  // commonjs / browserify / node
  }
  else if(typeof exports === 'object'){
    module.exports = definition;

  // browser
  }else{
    if(typeof window !== 'undefined'){
      window[name] = definition;
    }
  }
}

exporter('extend', extend);
