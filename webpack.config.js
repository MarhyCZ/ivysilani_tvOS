var
  webpack = require('webpack'),
  root = __dirname + '/web/app',
  entry = {
    app: './web/app/app.js'
  },
  output = {
    path: __dirname,
    filename: '[name].js'
  }

module.exports.development = {
  devtool: 'eval',
  entry: entry,
  output: output,
  resolve: {
    alias: {
      'handlebars': 'handlebars/runtime.js'
    },
    modules: [root, 'node_modules']
  },
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /node_modules|bower_components|native/,
      use: [{
        loader: 'babel-loader'
      }]
    }, {
      test: /\.hbs$/,
      use: [{
        loader: 'handlebars-loader'
      }]
    }, {
      test: /\.css$|\.json/,
      use: [{
        loader: 'raw-loader'
      }]
    }]
  }
}

module.exports.production = {
  entry: entry,
  output: output,
  resolve: {
    alias: {
      'handlebars': 'handlebars/runtime.js'
    },
    modules: [root, 'node_modules']
  },
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /node_modules|bower_components|native/,
      use: [{
        loader: 'babel-loader'
      }]
    }, {
      test: /\.hbs$/,
      use: [{
        loader: 'handlebars-loader'
      }]
    }, {
      test: /\.css$|\.json/,
      use: [{
        loader: 'raw-loader'
      }]
    }]
  }
}
