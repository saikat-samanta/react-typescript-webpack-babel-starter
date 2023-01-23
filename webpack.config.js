const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // dev/prod mode
  mode: "development",
  // entry point for webpack, for single entry point
  // entry: path.resolve(__dirname, "./src"),

  // for multiple entry point object key and bundle file name will be same when output['filename'] is not hardcoded.
  entry: {
    bundle: path.resolve(__dirname, "./src"),
    // path: path.resolve(__dirname, "./src"),
  },

  // output of webpack
  output: {
    // output path
    path: path.resolve(__dirname, "./dist"),

    // bundle file name is fixed and always be bundle.js
    // filename: "bundle.js",

    // [name] will take the entry object key.
    // filename: "[name].js",
    //we can also create content hash with file name
    filename: "[name].[contenthash].js",

    // clean bundle before every build
    clean: true,

    // image name after bundling
    assetModuleFilename: "[name][ext]",
  },

  // which file should be handle. (for typescript)
  resolve: {
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
  },

  // source map for debug
  devtool: "source-map",

  // webpack dev server
  devServer: {
    static: {
      // path which will serve
      directory: path.resolve(__dirname, "./dist"),
    },
    // change default port
    port: 3000,
    // automatically open browser
    open: true,
    // hot reload enable
    hot: true,
    liveReload: true,
    // enable gzip compression
    compress: true,
    historyApiFallback: true,
  },

  // Loader
  module: {
    rules: [
      // loader for css
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]",
              },
            },
          },
        ],
      },
      // babel loader
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "ts-loader"],
        // use: {
        //   loader: "babel-loader",
        //   options: {
        //     // we can set this inside .babelrc also
        //     preset: ["@babel/preset-env"],
        //   },
        // },
      },
      // image loader. It's need changes in output object
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },

  // plugins
  plugins: [
    // this will create html file inside bundle.
    new HTMLWebpackPlugin({
      title: "Webpack app",
      filename: "index.html",
      // with template set webpack will use this template inside bundle
      template: "./public/index.html",
    }),
  ],
};
