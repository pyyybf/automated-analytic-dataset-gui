const path = require('path');

const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
    webpack: {
        alias: {
            '@': resolve('src'),
        },
        configure: (webpackConfig, {env, paths}) => {
            const buildPath = '../build';

            paths.appBuild = path.resolve(__dirname, buildPath);
            webpackConfig.output = {
                ...webpackConfig.output,
                path: paths.appBuild,
            };
            return webpackConfig;
        },
    }
};