const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const webpack = require("webpack");

const appName = process.env.APP;

module.exports = {
    entry: path.resolve(__dirname, `../../apps/${appName}/src/index.ts`),
    output: {
        filename: "js/[name].[contenthash].js",
        chunkFilename: "js/[name].[contenthash].bundle.js",
        path: path.resolve(__dirname, `../../apps/${appName}/dist`)
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: [
                    path.resolve(__dirname, `../../apps/${appName}/src`),
                    path.resolve(__dirname, "../../packages")
                ],
                use: {
                    loader: "babel-loader?cacheDirectory=true"
                }
            },
            {
                test: /\.(ts|tsx)$/,
                include: [
                    path.resolve(__dirname, `../../apps/${appName}/src`),
                    path.resolve(__dirname, "../../packages")
                ],
                use: [
                    "babel-loader?cacheDirectory=true",
                    {
                        loader: "ts-loader",
                        options: {
                            configFile: path.resolve(__dirname, `../../apps/${appName}/tsconfig.json`),
                            appendTsSuffixTo: [/\.vue$/]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024 // 10kb  指定大小 小于该值则使用inline模式
                    }
                },
                generator: {
                    filename: "static/[hash][ext][query]"
                }
            },
            {
                test: /\.vue$/,
                loader: "vue-loader"
            }
        ]
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, `../../apps/${appName}/src`)
        },
        extensions: [".js", ".ts", ".vue"]
    },
    plugins: [
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: false,
            __VUE_PROD_DEVTOOLS__: false
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, `../../apps/${appName}/public/index.html`)
        })
    ]
};