const { override, addWebpackAlias, overrideDevServer } = require('customize-cra')
const path = require('path')
const addDevServerConfig = () => config => {
    // 在这里写你自己的配置
    return {
        ...config,
        headers: {
            "Cross-Origin-Opener-Policy": "same-origin",
            "Cross-Origin-Embedder-Policy": "require-corp",
        }
    };
}
module.exports = {
    webpack: override(
        addWebpackAlias({
            '@': path.resolve(__dirname, 'src')
        })
    ),
    devServer: overrideDevServer(addDevServerConfig())
}