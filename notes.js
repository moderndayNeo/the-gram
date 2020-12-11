// WITH file-loader

var path = require('path')

module.exports = {
    entry: './app/frontend/packs/index.jsx',
    output: {
        filename: './public/packs',
    },
    module: {
        rules: [
            {
                test: [/\.jsx?$/],
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ['@babel/env', '@babel/react'],
                    },
                },
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '*'],
    },
}

// WITHOUT file-loader

var path = require('path')

module.exports = {
    entry: './app/frontend/packs/index.jsx',
    output: {
        filename: './public/packs',
    },
    module: {
        rules: [
            {
                test: [/\.jsx?$/],
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ['@babel/env', '@babel/react'],
                    },
                },
            },
        ],
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '*'],
    },
}


/*
delete package.lock.json
npm i file-loader
git push heroku master
trying

try:
delete package.lock.json
git push heroku master
trying


try:
npm uninstall file-loader
git push heroku master 
trying

try:
npm uninstall file-loader
delete package.lock.json
git push heroku master 
trying


 */
