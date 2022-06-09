const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

let mode = "development"
if (process.env.NODE_ENV === 'production') {
	mode = "production"
}
console.log(mode + ' mode')

module.exports = {
	mode: mode,
	entry: {
		main: './src/index.js'
	},
	output: {
		filename: '[name].[contenthash].js',
		assetModuleFilename: 'assets/images/[name][ext]',
		clean: true,
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		}),
		new HtmlWebpackPlugin({
			template: './src/pages/index.pug',
		}),
	],

	module: {
		rules: [
			{
				test: /\.?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.(le|c)ss$/,
				use: [
					(mode === 'development') ? "style-loader" : MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'less-loader'
				],
			},
			{
       			test: /\.(png|svg|jpg|jpeg|gif)$/,
    		    type: 'asset/resource',
    		    generator: {filename: 'assets/images/[name][ext]'}
      		},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				type: 'asset/resource',
				generator: {filename: 'assets/fonts/[name][ext]'},
			},
			{
				test: /\.html$/,
				use: ['html-loader'],
			},
			{
				test: /\.pug$/,
				loader: 'pug-loader',
				exclude: /(node_modules|bower_components)/,
			},
		],
	},
}