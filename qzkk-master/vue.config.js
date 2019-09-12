module.exports = {
    publicPath: './',
    devServer: {
        open: true,
        host: 'localhost',
        port: 88,
        https: false,
        proxy: {//配置跨域
            '/api': {
                // target: 'http://219.244.186.2:81' ,//这里后台的地址模拟的;应该填写你们真实的后台接口
                target: 'http://localhost:81',
                ws: true,
                changOrigin: true,//允许跨域
                pathRewrite: {
                    '^/api': ''//请求的时候使用这个api就可以
                }
            }
        }
    }
}