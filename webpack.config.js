module.exports = {
  mode: "production",
  // mode: "development",
  entry: "./src/index.js",
  output: {
    path: `${__dirname}/docs`,
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
    static: {
      directory: "docs",
    },
    open: true,
  },
  performance: {
    maxAssetSize: 1000000,
    maxEntrypointSize: 1000000,
  },
};
