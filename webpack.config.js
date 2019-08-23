const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index',
    output: {
        path: path.resolve(__dirname, 'lib/'),
        filename: '[name].js',
        libraryTarget: 'umd',
        libraryExport: 'default',
        library: 'two',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    }
};