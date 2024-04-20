const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const openBrowser = require("react-dev-utils/openBrowser");
const Dotenv = require("dotenv-webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { sentryWebpackPlugin } = require("@sentry/webpack-plugin");
require("dotenv").config();

const getENVFile = (_env) => {
  return path.join(__dirname, ".env");
};

const getWebpackConfig = (env) => {
  /** @type {import('webpack').Configuration} */
  const config = {
    mode: env.production ? "production" : "development",
    target: "web",
    entry: path.resolve(__dirname, "src"),
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "[name].[contenthash].js",
      clean: true,
      asyncChunks: true,
      globalObject: "this",
      publicPath: "/",
    },
    resolve: {
      extensions: [".tsx", ".jsx", ".ts", ".js", ".css", ".scss", ".sass"],
    },
    optimization: {
      minimize: env.production,
      moduleIds: "deterministic",
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 0,
      },
    },
    devtool: env.production ? "source-map" : "inline-source-map",
    devServer: {
      static: {
        directory: path.join(__dirname, "build"),
        publicPath: "/",
        serveIndex: true,
        watch: true,
      },
      open: false,
      onListening: function (devServer) {
        const { port } = devServer.server.address();
        openBrowser(`https://localhost:${port}`);
      },
      hot: !env.production,
      devMiddleware: {
        index: true,
        mimeTypes: { html: "text/html" },
        serverSideRender: true,
        writeToDisk: true,
      },
      historyApiFallback: true,
      compress: env.production,
    },
    module: {
      rules: [
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false, // Ref: https://webpack.js.org/configuration/module/#resolvefullyspecified
          },
        },
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.(css|s[ac]ss)$/i, // This regex matches both .scss and .sass files
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        // image loader. It's need changes in output object
        {
          test: /\.(png|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.svg$/,
          use: ["@svgr/webpack"],
        },
      ],
    },
    plugins: [
      new CopyPlugin({
        // # Need to come before HtmlWebpackPlugin
        patterns: [
          {
            from: "./public",
            globOptions: {
              ignore: ["**/index.html"],
            },
          },
        ],
      }),
      new HtmlWebpackPlugin({
        title: "React Webpack App",
        filename: "index.html",
        template: "public/index.html",
      }),
      // # Gives the build progress
      new webpack.ProgressPlugin(),

      // # This plugin extracts CSS into separate files. It creates a CSS file per JS file which contains CSS. It supports On-Demand-Loading of CSS and SourceMaps (if source maps are enabled).
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
      new Dotenv({
        path: getENVFile(env),
        defaults: path.join(__dirname, ".env"),
      }),
      sentryWebpackPlugin({
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: "org-name",
        project: "project-name",
        include: {
          paths: ["."],
          // # URL prefix to add to the beginning of all filenames. Defaults to ~/ but you might want to set this to the full URL. This is also useful if your files are stored in a sub folder. eg: url-prefix '~/static/js'
          urlPrefix: "~/",
        },
        ext: ["map", "js"],
        ignore: ["node_modules", "webpack.config.js"],
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
        openAnalyzer: !!env.analyze,
      }),
    ],
  };
  return config;
};

module.exports = (env) => {
  const webpackConfig = getWebpackConfig(env);
  return webpackConfig;
};
