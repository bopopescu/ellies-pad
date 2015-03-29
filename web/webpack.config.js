var webpack = require("webpack");

module.exports = {
  context: __dirname,
  entry: "./src/app.js",
  module: {
    preloaders: [
    ],
    loaders: [
      {test: /\.js$/, loaders: ["envify-loader"]}
    ]
  },
  output: {
    filename: "app.js"
  }
};
