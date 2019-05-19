const webpack = require('webpack');
const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const HTMLWebpackRootPlugin = require('html-webpack-root-plugin')

const debug = process.env.NODE_ENV !== 'production';

// Plugins
const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(debug ? 'development' : 'production'),
  }),
  new ProgressBarPlugin(),
  new CleanWebpackPlugin(),
  new HTMLWebpackPlugin({
    title: 'boilerplate',
    inject: true,
    filename: path.resolve(__dirname, 'dist', 'boilerplate', 'index.html'),
  }),
  new HTMLWebpackRootPlugin('root'),
]

if (!debug) {
  plugins.push(new webpack.HashedModuleIdsPlugin())
}

// Config
module.exports = {
  context: path.join(__dirname, 'src'),
  cache: true,
  entry: {
    boilerplate: [
      './boilerplate/index.jsx',
    ],
  },
  output: {
    filename: '[name]/static/scripts/[name].min.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            '@babel/preset-react',
            '@babel/preset-env',
          ],
          plugins: [
            ['@babel/plugin-proposal-class-properties', { loose: true }],
          ],
        },
        include: [
          path.join(__dirname, 'src'),
        ],
      },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./node_modules'],
            },
          },
        ],
      },
      // {
      //   test: /\.(woff(2)?|ttf|eot)/,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         name: 'fonts/[hash]-[name].[ext]',
      //         // name: '[name].[ext]',
      //         // outputPath: '/static/fonts/',
      //         // emitFile: false,
      //       },
      //     },
      //   ],
      // },
      // {
      //   test: /\.(png|jp(e*)g|gif|svg)$/i,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         name: 'images/[hash]-[name].[ext]',
      //         limit: 8192,
      //       },
      //     },
      //   ],
      // },
    ],
  },
  optimization: {
    // minimize: true,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          },
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins,
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css'],
    alias: {
      boilerplateModules: path.resolve('./src/boilerplate/modules'),
      boilerplateComponents: path.resolve('./src/boilerplate/components'),
    },
  },
  devtool: debug ? 'eval' : 'source-map',
  mode: debug ? 'development' : 'production',
  devServer: {
    host: '0.0.0.0',
    port: 2600,
    inline: true,
    publicPath: '/',
    contentBase: 'dist',
    watchContentBase: true,
    writeToDisk: true,
    historyApiFallback: {
      rewrites:[
        { from: /^\/boilerplate\/.*$/, to: '/boilerplate/' },
      ],
    },
  },
}
