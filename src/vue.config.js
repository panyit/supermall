module.exports = {
    devServer: {
        host: '0.0.0.0',
        port: 8080,
    },
    configureWebpack:{
        resolve:{
            alias:{
                'assets':'@/assets',
                'common':'@/commom',
                'components':'@/components',
                'network':'@/network',
                'views':'@/views',
            }
        }
    }
}