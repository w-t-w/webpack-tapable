const {resolve} = require('path');

const OUTPUT_DIR = resolve(process.cwd(), './build');

const webpackConfig = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: OUTPUT_DIR
    }
};

module.exports = webpackConfig;