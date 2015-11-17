'use strict';

var through = require('through2');

//options is an object that can have two props
//properties: could be a string with the name of one property that you want to ready of the file, or it can be an array of all the properties you want to get from the file
//callback: could be any custom function that receives the files list as a parameter. If no callback is provided, the plugin simply calls console.log
module.exports = function(options) {
  options = options || {};
  var getFileInfo = null,
      propertyToGet,
      defaults = {
                    properties: 'relative',
                    callback: function finalCallback (files){
                      for(var i=0; i<files.length; i++){
                        console.log(files[i]);
                      }
                    }
                  };

  options = Object.assign(defaults, options);

  //the getProperty just reads one property from the file, the one in the properties var
  var getProperty = function getProperty(file){
    return file[options.properties];
  };

  //the getMultipleProperties gets all the properties from the file specified in the array options.properties
  var getMultipleProperties = function getMultipleProperties(file){
    var obj = {};
    for(var i=0; i<options.properties.length; i++){
      obj[options.properties[i]] = file[options.properties[i]];
    }
    return obj;
  };

  var filesList = new Array();


  if( typeof options.properties == "string"){ //if properties is a string, then we're looking for one property only
  
    getFileInfo = getProperty;

  }else if( options.properties instanceof Array){ //if it's an array, we'll return all the properties in an object

    getFileInfo = getMultipleProperties;

  }else{

    throw new Error('The provided options to gulp-fileinfo are invalid');

  }

  function bufferContents(file, enc, cb) {
    
    filesList.push(getFileInfo(file));
    
    cb(null,file);
  }

  function endStream(cb) {
    
    options.callback(filesList);

    cb();

  }

  return through.obj(bufferContents, endStream);
};
