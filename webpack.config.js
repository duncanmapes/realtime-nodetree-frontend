const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    //disable: process.env.NODE_ENV === "development"
});

const S3Plugin = require('webpack-s3-plugin');

var s3 = () => { return; }
if(process.env.DEPLOY == 'true'){
  var s3 = new S3Plugin({
        directory:'dist',
        s3Options: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          region: 'us-east-1'
        },
        s3UploadOptions: {
          Bucket: process.env.AWS_BUCKET
        },
        // cloudfrontInvalidateOptions: {
        //   DistributionId: process.env.CLOUDFRONT_DISTRIBUTION_ID,
        //   Items: ["/*"]
        // }
      });
}

module.exports = {
  entry:['./src/index.js','react-hot-loader/patch','./src/styles/app.scss'],

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({title: 'Development'}),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({
      template: "./static/index.html",
      filename: "./index.html"
    }),
    extractSass,
    s3
  ],

//   devServer: {
//     contentBase: './dist',
//     hot: process.env.MODE === "development"
//   },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: false }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
            use: [
                {
                    loader: "css-loader",
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true
                    }
                }
            ],
            // use style-loader in development
            fallback: "style-loader"
        })
    }
    // {
    //     test: /\.scss$/,
    //     use: [{
    //         loader: "style-loader"
    //     }, {
    //         loader: "css-loader"
    //     }, {
    //         loader: "sass-loader",
    //         options: {
    //             //includePaths: ["absolute/path/a", "absolute/path/b"]
    //         }
    //     }]
    // }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },

  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  
};