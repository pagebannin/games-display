const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const mode = process.env.NODE_ENV || "development";
const port = process.env.PORT || 3000;
let target = "web";

if (mode === "production") {
  target = "browserslist";
}

module.exports = {
  mode,
  target,
  entry: {
    app: "./src/index.js",
    serviceWorker: "./src/serviceWorker.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "/",
  },
  devServer: {
    host: "localhost",
    static: {
      directory: path.join(__dirname, "dist"),
    },
    historyApiFallback: true,
    proxy: {
      "/api/**": {
        target: `https://api.rawg.io`,
        secure: true,
        changeOrigin: true,
        logLevel: "debug",
      },
    },
    port,
    hot: true,
    //  open: true,
  },
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
      inject: true,
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
