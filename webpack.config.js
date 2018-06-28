var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: ['./src/js/main.js', './src/css/style.scss'],
    mode: 'none',
    module: {
        rules: [{
            test: /\.(s*)css$/,
            use: ExtractTextPlugin.extract({
                use: ['css-loader', 'sass-loader']
            })
        },
        {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
              'file-loader',
              {
                loader: 'image-webpack-loader',
                options: {
                  bypassOnDebug: true,
                  disable: true,
                },
              },
            ],
        }]
    },
    output: {
        filename: 'script.js'
    },
    devServer: {
        contentBase: "./dist",
        watchContentBase: true
    },
    plugins: [
        new ExtractTextPlugin({filename:'app.bundle.css'})
    ]
};