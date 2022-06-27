//requires
const fs = require('fs')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

//paths
const PATHS = {
  src: path.resolve(__dirname, './src'),
  dist: path.resolve(__dirname, './dist'),
}
const PAGES_DIR = path.resolve(__dirname, 'src/pages');
const PAGES = fs
  .readdirSync(PAGES_DIR)
  .map(item => item.replace(/\.[^/.]+$/, ''))
  .filter(item => item != 'layouts');

//pages plugin

const sitePages = PAGES
  .map(name => new HtmlWebpackPlugin({
    template: `./src/pages/${name}/${name}.pug`,
    filename: `./pages/${name}/${name}.html`,
    chunks: [name],
  }));

//mode
let mode = 'development'
if (process.env.NODE_ENV === 'production') {
	mode = 'production'
}
console.log("pages :\n" ,sitePages)
console.log(mode + ' mode')

module.exports = {
	mode: mode,
	entry: {
		colors_and_types: './src/pages/colors_and_types/colors_and_types.js',
		form_elements: './src/pages/form_elements/form_elements.js',
	},
	output: {
		filename: './pages/[name]/[name].js',
		clean: true,
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	},

	plugins: [
		// new BundleAnalyzerPlugin(),
		new MiniCssExtractPlugin({
			filename: './pages/[name]/[name].css',
		}),
	]
	.concat(sitePages),

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
					mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
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
			directory: PATHS.dist,
		},
		compress: true,
		port: 8080,
	},
}