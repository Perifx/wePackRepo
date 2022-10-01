
const pathModule=require("path");
const HtmlWebpackPlugin=require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports={

mode:"production",
entry:"./src/index.js",
output:{ //الفايل الي هيطلع

filename:"script.boundle.js",
path:pathModule.resolve(__dirname,"dist"),
// __dirname: path بياخد ال 
assetModuleFilename: 'images/[name][ext]' //يعني حط الاسم الاول ده بعد كده الصوره


},

module:{
rules:[
    
    { //loader of css

test:/\.css$/i, // css دي الي بتشغل ال 
use:[MiniCssExtractPlugin.loader,"css-loader"],
// style-loader:html  <style></style> وتعمل  module عملته الي هو الفايل الي اتحول  css الي ال    module بتمسك ال  
// css-loader:وتربط ملف ال  head وتحطه في ال 
}, 
{
test:/\.(png||svg||jpg||jpeg||gif)$/i,
type:'asset/resource'

},
{
  test: /\.s[ac]ss$/i,
  use: [
    // Creates `style` nodes from JS strings
    // "style-loader",
    //or
    // Creates css separate file 
    MiniCssExtractPlugin.loader,
    // Translates CSS into CommonJS
    "css-loader",
    // Compiles Sass to CSS
    "sass-loader",
  ],
},
],

},
plugins:[
new HtmlWebpackPlugin({template:"./src/index.html"}),
 new MiniCssExtractPlugin({filename:"style.min.css"})

],
optimization: {
  minimizer: [
    // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
    "...",
    new CssMinimizerPlugin(),
    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminMinify,
        options: {
          // Lossless optimization with custom option
          // Feel free to experiment with options for better result for you
          plugins: [
            ["gifsicle", { interlaced: true }],
            ["mozjpeg", { quality: 60 }],
            ["optipng", { optimizationLevel: 5 }],
            // Svgo configuration here https://github.com/svg/svgo#configuration
            [
              "svgo",
              {
                name: 'preset-default',
                params: {
                  overrides: {
                    // customize plugin options
                    convertShapeToPath: {
                      convertArcs: true
                    },
                    // disable plugins
                    convertPathData: false
                  }
                }
              }
            ],
          ],
        },
      },
    }),
  ],
}
}