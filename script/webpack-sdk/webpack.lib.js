const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const libName = process.env.LIB;
const libOutName = process.env.OUT_NAME;

const packagePath = path.resolve(__dirname, "../../packages");


module.exports = {
    mode: "production",
    entry: path.resolve(packagePath, `${libName}/src/index.ts`),
    output: {
        filename: "index.js",
        path: path.resolve(packagePath, `${libName}/lib`),
        libraryTarget: "umd",
        library: libOutName,
        globalObject: "this"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    packagePath
                ],
                use: {
                    loader: "babel-loader?cacheDirectory=true"
                }
            },
            {
                test: /\.ts$/,
                include: [
                    packagePath
                ],
                use: [
                    "babel-loader?cacheDirectory=true",
                    "ts-loader" // ts-loader 生成typing支持更好
                ]
            }
        ]
    },
    resolve: {
        alias: {
            "@": path.resolve(packagePath, `${libName}/src`)
        },
        extensions: [".js", ".ts"],
        fallback: {
            fs: false
        }
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
    optimization: {
        minimizer: [
            new TerserPlugin()
        ]
    }
};
