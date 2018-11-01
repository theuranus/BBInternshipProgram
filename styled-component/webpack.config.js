const path = require('path');

module.exports = {
	entry: './src/entry.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
            { test: /\.jsx?$/, loader: ['babel-loader?cacheDirectory'] },
            { test: /\.css$/, use: ['style-loader','css-loader'] }
		]
    },
    mode: "development"
}