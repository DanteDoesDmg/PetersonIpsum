const path = require("path");
var Html = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
const entryFile = "main.js";
module.exports = {
    entry: ['whatwg-fetch',`./${entryFile}`],
    output: {
        filename: "out.js",
        path: path.resolve(__dirname, `/build`)
    },
    devServer: {
        contentBase: path.join(__dirname, `.`),
        publicPath: "/build/",
        compress: true,
        port: 3001
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                // Ta reguła przetwarza pliki z rozszerzeniem .scss (zgodnie z wartością w test)
                test: /\.scss$/,
                use: [
                    // Załącza CSS-a do tagu <style> HTML-a wynikowego
                    'style-loader',
                    // Importuje CSS do JS (umożliwia wykonanie require() w pliku .js)
                    'css-loader',
                    // Uruchomienie Autoprefixera w celu dodania vendor prefixes do CSS-a
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                new autoprefixer({
                                    browsers: [
                                        'ie 11'
                                    ]
                                })
                            ]
                        }
                    },
                    // Przetworzenie plików .scss ma CSS
                    'sass-loader'
                ]
            }]
    },
    plugins: [
        new Html({
            filename: 'index.html',
            template: './index.html'
        })
    ]
};