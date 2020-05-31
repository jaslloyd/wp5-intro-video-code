const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  entry: "./src/index",
  cache: false,

  mode: "development",
  devtool: "source-map",

  optimization: {
    minimize: false,
  },

  output: {
    publicPath: "http://localhost:3003/",
  },

  resolve: {
    extensions: [".jsx", ".js", ".json"],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: require.resolve("babel-loader"),
        options: {
          presets: [require.resolve("@babel/preset-react")],
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      // Unique Identifier for the module, will be used for import .... from [name]
      name: "nav",
      library: { type: "var", name: "nav" },
      filename: "remoteEntry.js",
      // Other 'remote' that this module pulls from
      remotes: {},
      // List of files it exposes, i.e Things can be imported and used in other hosts or remotes
      exposes: {
        Header: "./src/Header",
      },
      // Modules to be shared to the hosts consuming this.
      shared: ["react", "react-dom", "@material-ui/core", "@material-ui/icons"],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      chunks: ["main"],
    }),
  ],
};
