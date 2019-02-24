require('webpack')
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

const srcRoot = path.resolve(__dirname, 'web/app/')
const distRoot = path.resolve(__dirname, 'web/dist/')

const entry = {
  app: srcRoot + '/app.js'
}
const output = {
  path: distRoot,
  filename: '[name].js'
}

const env = process.env.NODE_ENV || 'development'
const isProd = env === 'production'

const stats = {
  modules: false,
  chunks: false,
  colors: true
}

module.exports = {
  devtool: isProd ? '' : 'eval-source-map',
  mode: isProd ? 'production' : 'development',
  entry: entry,
  output: output,
  resolve: {
    alias: {
      'handlebars': 'handlebars/runtime.js'
    },
    modules: [srcRoot, 'node_modules']
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
  },
  plugins: [
    new CopyPlugin([
      { from: srcRoot + '/assets', to: distRoot + '/assets' }
    ])
  ],
  devServer: {
    contentBase: distRoot,
    compress: true,
    inline: false,
    port: 9001,
    stats
  }
}
