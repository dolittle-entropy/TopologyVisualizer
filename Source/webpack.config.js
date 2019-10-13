const path = require("path");
const { AureliaPlugin } = require("aurelia-webpack-plugin");

module.exports = {
  entry: "aurelia-bootstrapper",

  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
    filename: "[name].js",    
    chunkFilename: "[name].js"
  },

  resolve: {
    extensions: [".ts", ".js"],
    modules: ["src", "node_modules"].map(x => path.resolve(x)),
  },

  module: {
    rules: [
      { test: /\.css$/i, use: ["style-loader", "css-loader"] },
      { test: /\.ts$/i, use: "awesome-typescript-loader" },
      { test: /\.html$/i, use: "html-loader" },
    ]
  },  

  plugins: [
    new AureliaPlugin(),
  ],
};