var webpack = require("webpack");

module.exports = {
  context: __dirname,
  devtool: "inline-source-map",
  entry: "./src/app.js",
  module: {
    preloaders: [],
    loaders: [
      {test: /\.jsx/, loaders: ["jsx-loader"]},
      {test: /\.less/, loaders: ["style-loader", "css-loader", "less-loader"]}
    ]
  },
  output: {
    path: __dirname + "/dist",
    filename: "app.js"
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({})
  ]
};
