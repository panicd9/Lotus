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
                    "assert": require.resolve("assert/"),
                    'crypto': require.resolve("crypto-browserify"),
                    "stream": require.resolve("stream-browserify"),
                    'buffer': require.resolve('buffer/'),  // Add buffer fallback
                }
            },
        },
    },
};
