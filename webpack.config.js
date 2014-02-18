module.exports = {
  entry: "./src/main.js",
  output: {
    path: "./dist/",
    filename: "myawesomeproject.js",
    library: "MyAwesomeProject",
    libraryTarget: "umd"
  },
  watch: true,
  watchDelay: 500,
  devtool: 'source-map'
}
