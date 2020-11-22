const path = require("path");
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
    outputDir: './dist',
    lintOnSave: false,
    devServer: {
        port: 8080,
        proxy: 'https://dev.kernel.tools/api',
        //host: 'localhost',
        //public:
        //disableHostCheck: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: false,
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                "@": path.resolve(__dirname, './src'),
                "@js": path.resolve(__dirname, './src/js'),
                "@views": path.resolve(__dirname, './src/views'),
                "@lang": path.resolve(__dirname, './src/lang'),
            },
            extensions: ['.js', '.vue', '.json']
        },
        watchOptions: {
            poll: false,
            ignored: /node_modules/
        },
        plugins: [
            new VuetifyLoaderPlugin()
        ],
        module: {
            rules: [
                {
                    exclude: /node_modules/,
                }
            ],
            // loaders: [
            //  { test: /\.css$/, loader: "css-loader" }
            // ]
        },

    },
    css: {
        loaderOptions: {
            sass: {
                // additionalData: `@import "@/assets/css/style.scss"`
            }
        }
    },
}
