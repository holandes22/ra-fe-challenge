var path = require("path");
var merge = require("webpack-merge");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");


var common = {
  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx$/],
        exclude: [/node_modules/],
        use: "babel-loader",
      },
      {
        test: [/\.scss$/, /\.css$/],
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader!sass-loader"
        })
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: "file-loader?name=images/[name].[ext]"
      },
      {
        test: /\.(ttf|eot|svg|woff2?)$/,
        use: "file-loader?name=fonts/[name].[ext]",
      },
    ]
  }
};

module.exports = [
  merge(common, {
    entry: [
      "font-awesome-loader",
      "./public/pic_100x100.jpg",
      "./src/app.scss",
      "./src/app.js"
    ],
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "app.js"
    },
    resolve: {
      modules: [
        "node_modules",
        path.resolve(__dirname, "src")
      ]
    },
    plugins: [
      new ExtractTextPlugin("app.css"),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: path.resolve(__dirname, "src", "index.html"),
        inject:   "body"
      }),

    ]
  })
];
