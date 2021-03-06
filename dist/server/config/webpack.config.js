'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var config = {
    devtool: '#cheap-module-eval-source-map',
    entry: {
      manager: [require.resolve('./polyfills'), require.resolve('../../client/manager')],
      preview: [require.resolve('./polyfills'), require.resolve('./error_enhancements'), require.resolve('webpack-hot-middleware/client') + '?reload=true']
    },
    output: {
      path: _path2.default.join(__dirname, 'dist'),
      filename: 'static/[name].bundle.js',
      publicPath: '/'
    },
    plugins: [new _webpack2.default.DefinePlugin((0, _utils.loadEnv)()), new _utils.OccurenceOrderPlugin(), new _webpack2.default.HotModuleReplacementPlugin(), new _caseSensitivePathsWebpackPlugin2.default(), new _WatchMissingNodeModulesPlugin2.default(_utils.nodeModulesPaths)],
    module: {
      loaders: [{
        test: /\.jsx?$/,
        loader: require.resolve('babel-loader'),
        query: _babel2.default,
        include: _utils.includePaths,
        exclude: _utils.excludePaths
      }, {
        test: /\.scss$/,
        loader: "style!css!sass?sourceMap",
        // exclude: /node_modules/,
        // exclude是指在执行webpack大宝的时候，想要忽略的目录，
        // 而我们在从node_modules中引入组件展示的时候，样式肯定是在node_modules中,所以node_module不能够忽略过去
        include: _utils.includePaths
      }]
    },
    resolve: {
      // Add support to NODE_PATH. With this we could avoid relative path imports.
      // Based on this CRA feature: https://github.com/facebookincubator/create-react-app/issues/253
      fallback: _utils.nodePaths,
      alias: {
        // This is to add addon support for NPM2
        '@kadira/storybook-addons': require.resolve('@kadira/storybook-addons')
      }
    }
  };

  return config;
};

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _caseSensitivePathsWebpackPlugin = require('case-sensitive-paths-webpack-plugin');

var _caseSensitivePathsWebpackPlugin2 = _interopRequireDefault(_caseSensitivePathsWebpackPlugin);

var _WatchMissingNodeModulesPlugin = require('./WatchMissingNodeModulesPlugin');

var _WatchMissingNodeModulesPlugin2 = _interopRequireDefault(_WatchMissingNodeModulesPlugin);

var _utils = require('./utils');

var _babel = require('./babel.js');

var _babel2 = _interopRequireDefault(_babel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }