import * as path from "path";
import * as webpack from "webpack";

import * as  HtmlWebpackPlugin from "html-webpack-plugin";
// import * as HtmlWebpackHardDiskPlugin from "html-webpack-harddisk-plugin";
// import * as CleanWebpackPlugin from "clean-webpack-plugin";
import * as ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

export default <webpack.Configuration>{
  mode: "development",
  entry: {
    vendor: [
      "@babel/polyfill", // Required to support async/await
    ],
    main: ["./src/index.tsx"]
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  // https://github.com/gaearon/react-hot-loader#source-maps
  // devtool: "source-map",
  devtool: "eval",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      // "react-hot-loader": path.resolve(path.join(__dirname, "./../../")),
      react: path.resolve(path.join(__dirname, "./node_modules/react")),
    },
  },
  // devServer: {
  //   // contentBase: "./dist",
  //   hot: true,
  //   port: 80
  // },
  module: {
    rules: [
      {
        test: /\.(svg|ttf|woff|png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            // options: {}
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "postcss-loader", "less-loader"]
      },
      // {
      //   test: /\.scss$/,
      //   use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
      // },
      // {
      //   test: /\.tsx?$/,
      //   loader: "awesome-typescript-loader",
      // },
      // { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    browsers: "last 2 versions", // or whatever your project requires
                  }
                }
              ],
              "@babel/preset-typescript",
              "@babel/preset-react"
            ],
            plugins: [
              ["@babel/plugin-proposal-decorators", { legacy: true }],
              ["@babel/plugin-proposal-class-properties", { loose: true }],
              "react-hot-loader/babel",
            ]
          }
        }
      },
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new webpack.NamedModulesPlugin(),
    // new CleanWebpackPlugin(["./dist"]),
    new HtmlWebpackPlugin({
      title: "Hot Module Replacement",
      template: "src/index.html",
      // alwaysWriteToDisk: true
    }),
    // new HtmlWebpackHardDiskPlugin({ outputPath: "./dist" }),
    // new webpack.HotModuleReplacementPlugin()
  ],
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  }
};