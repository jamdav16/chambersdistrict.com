var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: ['./src/js/main.js', './src/css/style.scss', './src/js/jquery-3.3.1.min.js'],
    mode: 'none',
    module: {
        rules: [{
            test: /\.(s*)css$/,
            use: ExtractTextPlugin.extract({
                use: ['css-loader', 'sass-loader']
            })
        },
        {
            test: /\.(gif|png|jpg|svg|ico)$/i,
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
        },
        {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/'
                }
            }]
        },
        {
            test: /jquery.+\.js$/,
            use: [{
                loader: 'expose-loader',
                options: 'jQuery'
            },{
                loader: 'expose-loader',
                options: '$'
            }]
        }]
    },
    output: {
        filename: 'script.js',
        publicPath: '/'
    },
    devServer: {
        contentBase: "./dist",
        watchContentBase: true
    },
    plugins: [
        new ExtractTextPlugin({filename:'app.bundle.css'})
    ],
    externals: {
        jquery: 'jQuery'
    }
};