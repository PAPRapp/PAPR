const isDev = process.env.NODE_ENV === 'development'
const path = require('path')

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    '@babel/polyfill', // enables async-await
    './client/index.js'
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },

  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, 'client')],
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        loader: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.json$/,
        loader: ['json-loader']
      },
      {
        test: /\.ttf$/,
        use: [
          {
            loader: 'ttf-loader',
            options: {
              name: './font/[hash].[ext]'
            }
          }
        ]
      }
    ]
  }
}
