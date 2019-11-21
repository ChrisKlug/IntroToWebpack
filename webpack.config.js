const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
    mode: 'development',
    entry: {
        demo: './src/demo/app.js',
        style: './Styles/styles.less'
    },
    resolve: {
        extensions: ['.ts', '.js'],
        // alias: {
        //     handlebars: 'handlebars/dist/handlebars.min.js'
        // }
    },
    externals: {
        handlebars: 'Handlebars'
    },
    module: {
        rules: [
            { test: /\.ts$/, use: 'ts-loader' },
            { test: /\.html$/, use: 'html-loader' },
            { 
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8000,
                        name: 'images/[name].[ext]'
                    }
                }
            }
        ]
    },
    output: {
        filename: '[name].[hash].bundle.js',
        path: path.resolve('./dist')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html'
        })
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 9000,
        overlay: true
    }
}

module.exports = (env, args) => {
    if (env && env.prod) {
        config.mode = "production";
        config.output.filename = "[name].[hash].min.js";
        delete config.devtool;
    }
    return config;
}