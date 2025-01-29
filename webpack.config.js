const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './client/app.js',
 
  output: {
    path: path.resolve(__dirname, 'dist'), // Output to the 'dist' directory
    filename: 'bundle.js', // Your bundle file name
    publicPath: '/', // Important for React Router to work correctly
  },

 
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          },
      }, {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'client/assets'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './client/index.html',
      filename: 'index.html',
    }),
    new CopyPlugin({
      patterns: [{ from: './client/assets/style.css' }],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, './dist'),
    },
  },
  devtool: 'eval-source-map',
};