/**
 * @file 启动文件
 * @author
 */
module.exports = {
    WENKU: {
        balance: 'random',
        protocol: 'http',
        pack: 'querystring',
        unpack: 'string',
        encoding: 'utf-8',
        retry: 1,
        timeout: 20000,
        customLog: {
            'tracecode': 'responseContext.extras.headers.tracecode',
            'logid': 'requestContext.headers.x_bd_logid'
        },
        // proxy: require('./proxy.conf.js'),
        server: [{
            host: 'yf-iknow-heter00.yf01.baidu.com',
            port: 8083

            // host: 'cp01-linpo.epc.baidu.com',
            // port: 8080
        }]
    },
    WENKUJSON: {
        balance: 'random',
        protocol: 'http',
        pack: 'querystring',
        unpack: 'json',
        encoding: 'gbk',
        retry: 1,
        timeout: 2500,
        customLog: {
            'tracecode': 'responseContext.extras.headers.tracecode',
            'logid': 'requestContext.headers.x_bd_logid'
        },
        // proxy: require('./proxy.conf.js'),
        server: [{
            host: 'yf-iknow-heter00.yf01.baidu.com',
            port: 8083
            // host: 'cp01-linpo.epc.baidu.com',
            // port: 8080
        }]
    },
    WENKUSERVICE: {
        balance: 'random',
        protocol: 'http',
        pack: 'querystring',
        unpack: 'json',
        encoding: 'utf-8',
        retry: 1,
        timeout: 2500,
        customLog: {
            'tracecode': 'responseContext.extras.headers.tracecode',
            'logid': 'requestContext.headers.x_bd_logid'
        },
        server: [{
            host: '10.36.4.130',
            port: 80
        }]
    },
    FENGCHAO: {
        balance: 'random',
        protocol: 'http',
        pack: 'json',
        unpack: 'json',
        encoding: 'utf-8',
        retry: 1,
        method: 'POST',
        timeout: 2500,
        customLog: {
            'tracecode': 'responseContext.extras.headers.tracecode',
            'logid': 'requestContext.headers.x_bd_logid'
        },
        // proxy: require('./proxy.conf.js'),
        server: [{
            host: 'fun.baidu.com',
            port: 80
        }]
    },
    // 请求大搜query
    SEARCH: {
        balance: 'random',
        protocol: 'http',
        pack: 'querystring',
        unpack: 'querystring',
        encoding: 'utf-8',
        retry: 1,
        headers: {
            host: 'ess.baidu.com',
            Authorization: 'Basic YmR3ZW5rdToxMGRiZDVjMzJjZTBlMGZlNzBjNmU5N2NmZDk5Mjk0ZQ=='
        },
        method: 'get',
        timeout: 2500,
        customLog: {
            'tracecode': 'responseContext.extras.headers.tracecode',
            'logid': 'requestContext.headers.x_bd_logid'
        },
        // proxy: require('./proxy.conf.js'),
        server: [{
            host: 'ess.baidu.com',
            port: 80
        }]
    },
    // 请求凤巢广告
    FENGCHAOAD: {
        balance: 'random',
        protocol: 'http',
        pack: 'json',
        unpack: 'json',
        encoding: 'utf-8',
        retry: 1,
        method: 'POST',
        timeout: 1500,
        customLog: {
            'tracecode': 'responseContext.extras.headers.tracecode',
            'logid': 'requestContext.headers.x_bd_logid'
        },
        server: [{
            host: 'nj03-biz-indbd06.nj03.baidu.com',
            port: 8101
        }]
        // headers: {
        //     host: 'wk.baidu.com'
        // },
        // webfoot: 'group.smartbns-from_product=wapwenku-asp%group.flow-wise-apnginx.ASP.all:ws'
    },
    // 知识营销
    ZSYX: {
        balance: 'random',
        protocol: 'http',
        pack: 'json',
        unpack: 'string',
        encoding: 'utf-8',
        retry: 1,
        method: 'POST',
        timeout: 2000,
        customLog: {
            'tracecode': 'responseContext.extras.headers.tracecode',
            'logid': 'requestContext.headers.x_bd_logid'
        },
        server: [{
            host: 'kmars2.baidu.com',
            port: 80
        }]
    }
};
