const path = require("path");

module.exports = {
  entry: path.join(__dirname, "frontend", "calendar_app.jsx"),
  output: {
    path: path.join(__dirname, "app", "assets", "javascripts"),
    filename: "[name].bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx", "*"]
  },
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['env', 'react']
          }
        },
        exclude: /node_modules/
      }
    ]
  }
};
