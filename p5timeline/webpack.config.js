const path = require('path');
const webpack = require('webpack');

module.exports = {
    cache : true,
    entry: './dev/experiment.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'experiment.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};
