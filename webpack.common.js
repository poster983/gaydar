const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const {InjectManifest} = require("workbox-webpack-plugin");

module.exports = {
    entry: {
        app: path.resolve(__dirname, "src", "js", "app.js")
    },
    output: {
        path: path.resolve(__dirname, "dist"), //__dirname + "/public/js/webpack"
        filename: "js/[name].js",
        publicPath: "./dist/",
    },
    module: {
        rules: [{
            test: /\.(html)$/,
            use: {
                loader: "html-loader"
            }
        }]
    },
    plugins: [
        new webpack.IgnorePlugin(/vertx/),
        new CopyWebpackPlugin([
            {
                from: "./node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js",
                to: path.resolve(__dirname, "dist", "js") //"polyfill/webcomponents-lite.js"
            },
        ]),
        //workbox service worker 
        new InjectManifest({
            swSrc: path.resolve(__dirname, "src", "js", "sw.js"),
            swDest: path.resolve(__dirname, "sw.js"),
            include: [/\.html$/, /\.js$/, /\.css$/, /\.woff2$/],
            globDirectory: ".",
            globPatterns: [
                //"**/*.{css,woff2,html}"
                "index.html",
                "./src/styles/*.css",
                "./src/sounds/*.{mp3,ogg}"
            ],
        }),
        new CleanWebpackPlugin([
            path.resolve(__dirname, "dist", "precache-manifest.*.js") //workbox precash clean
        ], {
            dry: false //Testing
        }),
    ]
}