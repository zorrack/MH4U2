import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
var glob = require("glob");
const webpack = require('webpack');

export default {

    entry: glob.sync("./src/js/*.js"),
    // entry: path.join(__dirname, './src/js/init.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [{
            test: require.resolve('jquery'),
        use: [{
            loader: 'expose-loader',
            options: 'jQuery'
    },{
        loader: 'expose-loader',
        options: '$'
    }]
  }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Custom template',
            template: "./src/index.html",
            hash: true
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new ScriptExtHtmlWebpackPlugin({
            // sync: 'geolocation.js',
            defaultAttribute: 'defer'
        }),
    ],

    watch: true,

    stats: {
        colors: true
    },
    devtool: 'source-map'
};