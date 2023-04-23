import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import webpack from "webpack";
import WorkboxWebpackPlugin from "workbox-webpack-plugin";

const isProduction = process.env.NODE_ENV == "production";

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(process.cwd(), "public"),
    filename: "main.js",
  },
  devServer: {
    host: "localhost",
    hot: true,
    static: {
      directory: path.join(process.cwd(), "public"),
    },
    compress: true,
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new MiniCssExtractPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
      {
        test: /\.m?js/,
        type: "javascript/auto",
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  resolve: {
    alias: {},
    extensions: [
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      ".ttf",
      ".eot",
      ".otf",
      ".svg",
      ".png",
      ".woff",
      ".woff2",
      ".css",
      ".scss",
      ".sass",
    ],
  },
};

export default () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
  } else {
    config.mode = "development";
  }
  return config;
};
