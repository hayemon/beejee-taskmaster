const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// eslint-disable-next-line immutable/no-mutation
module.exports = {
    entry: path.join(__dirname, './src/index.jsx'),
    devServer: {
        hot: true,
        contentBase: 'build/',
        historyApiFallback: true
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index_bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            favicon: './public/favicon.ico',
            template: './src/index.html'
        })
    ]
}
