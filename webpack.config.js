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
		colors_and_types: './src/pages/colors_and_types/colors_and_types.js'
	},
	output: {
		filename: './pages/[name]/[name].[contenthash].js',
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
			filename: './pages/[name]/[name].[contenthash].css',
		}),
		new HtmlWebpackPlugin({
			template: './src/pages/colors_and_types/colors_and_types.pug',
			filename: './pages/[name]/[name].html'
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
      			test: /\.pug$/,
      			use:[
      				'@webdiscus/pug-loader',
      			] 
      		},
		],
	},

	devServer: {
  		static: {
  	    	directory: path.join(__dirname, 'dist'),
  	  	},
  	  	compress: true,
  	  	port: 8080,
  	},
}