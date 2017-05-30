const path = require('path');

const webpack = require('webpack');
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

const is_production = process.env.NODE_ENV === 'production';

const appRoot = __dirname;

module.exports = {

    watch: true,

    entry: {
        app: "./src/index.js",
    },

    output: {
        path: path.join(appRoot, "./build/"),
        filename: "[name].js"
    },

    devtool: "#source-map",

    module: {
        rules: [

            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            presets: [
                                'react',
                                'stage-2',
                                ["env", {
                                    "targets": {
                                        "browsers": ["last 2 versions", "safari >= 7"]
                                    }
                                }]
                            ],
                            plugins: ['transform-runtime']
                        }
                    }
                ]
            },

            {
                test: /\.jsx?$/,
                use: "eslint-loader",
                exclude: /node_modules/
            }
        ]
    },

    // ref: https://webpack.js.org/configuration/resolve/
    resolve: {
        modules: [
            path.resolve(appRoot, "src"),
            "node_modules"
        ]
    },

    plugins: [

        new webpack.DefinePlugin({
          'process.env':{
            'NODE_ENV': JSON.stringify(is_production ? 'production' : 'development')
          }
        }),

        new CommonsChunkPlugin("commons"),

        // new StatsPlugin('stats.json', {
        //   chunkModules: true,
        //   // exclude: [/node_modules[\\\/]react/]
        // })
    ],

};
