const webpack = require('webpack');

module.exports = {
    webpack: {
        plugins: {
            add: [
                new webpack.ProvidePlugin({
                    process: 'process/browser.js',
                    Buffer: ['buffer', 'Buffer'],  // Add Buffer polyfill
                })
            ]
        },
        configure: {
            resolve: {
                fallback: {
                    'fs': false,
                    'path': false,
                    'crypto': false,
                    'stream': false,
                    'buffer': require.resolve('buffer/'),  // Add buffer fallback
                }
            },
        },
    },
};
