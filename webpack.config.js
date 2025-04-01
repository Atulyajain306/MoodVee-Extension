const CopyPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const path=require("path")

module.exports={
    mode: "development",
    entry:{
       popup:"./src/popup.jsx" 
    },
    output:{
      path: path.resolve(__dirname,"dist"),
      filename:"[name].js",
    },
    resolve: {
        extensions: [".js", ".jsx"] // Allow Webpack to resolve .jsx files
    },
    module :{
        rules :[{
           test: /\.(js|jsx)$/,
           exclude: /node_modules/,
           use:{
            loader:"babel-loader",
            options: {
                presets:["@babel/preset-env","@babel/preset-react"]
            }
           }
        },
        {
            test: /\.css$/,  
            use: ["style-loader", "css-loader"]  
        },
        {
            test: /\.(png|jpg|jpeg|gif|svg)$/i,  // ✅ Add support for image imports
            type: "asset/resource",
            generator: {
                filename: "images/[name][ext]"  // ✅ Ensures images go into /dist/images/
            }
        }

    ]
    },
    devtool: "cheap-module-source-map",
    plugins:[new HtmlWebpackPlugin({
        template: "./src/popup.html",
        filename: "popup.html"
    }),
    new CopyPlugin({
        patterns:[
            {from: "public"},
        ]
    })
]
}