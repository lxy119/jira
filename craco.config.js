const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': ' #1890ff','@font-size-base': '16px'},
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};