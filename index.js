var loaderUtils = require('loader-utils');
var type = require('tf-type');

// function getLoaderConfig(context) {
// 	var query = loaderUtils.getOptions(context) || {};
// 	var configKey = query.config || 'htmlHotLoader';
// 	var config = context.options && context.options.hasOwnProperty(configKey) ? context.options[configKey] : {};

// 	delete query.config;

// 	return Object.assign({}, query, config);
// }

module.exports = function(source) {

    // Handle filenames (#106)
    var webpackRemainingChain = loaderUtils.getRemainingRequest(this).split("!");
    var filename = webpackRemainingChain[webpackRemainingChain.length - 1];

    // var loaderOptions = getLoaderConfig(this); 
    var loaderOptions = loaderUtils.parseQuery(this.query) || {}; 

    var files = loaderOptions.files;

    if (type.isString(files)) {
        files = [].concat(files);
    }

    if (type.isObject(files)) {
        var temp = [];

        for (var i in files) {
            temp.push(files[i]);
        }

        files = temp;
    }

    if (!type.isArray(files)) {
        throw new Error('files必须是字符串、数组、对象')
    }

    var content = loaderOptions.content || '';
    content = type.isFunction(content) ? content(filename, source) : content;

    if (files.indexOf(filename) > -1) {
        source += '\n' + content;
    }


    this.callback(null, source);
};
