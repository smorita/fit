module.exports = {
  mode: "production",
  // mode: "development",
  entry: "./src/index.js",
  output: {
    path: `${__dirname}/public`,
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    contentBase: "public",
    open: true,
  },
};
