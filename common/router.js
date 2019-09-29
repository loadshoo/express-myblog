var fs = require('fs');
var path = require('path')

/**
 * [setRouter 深度遍历目标文件夹下所有js文件,并动态设置路由]
 * @param {[Object]} app [全局express对象]
 * @param {[String]} url [路由文件根路径]
 */
function setRouter(app, url) {
    /**
     * [pathDir node中fs模块，获取路径下所有文件，只能遍历第一层]
     * @pathDir {[Object]}
     */
    let pathDir = fs.readdirSync(url);
    let pathList = [];
    //深度遍历目标文件夹下所有js文件
    pathDir.forEach((v, i, arr) => {
        let fileDir = path.join(url, v);
        let status = fs.statSync(fileDir);
        // console.log(status.isFile())
        if (status.isFile()) {
            /**
             * [if 判断文件扩展名是否为js]
             * @param  {[type]} fileDir [description]
             * @return {[type]} [description]
             */
            if (fileDir.split('.')[1] === 'js') {
                pathList.push(fileDir.split('.')[0]);
            }
        } else if (status.isDirectory()) {
            return setRouter(app, fileDir);
        }

    })
    /**
     * [遍历所得内容，对内容进行处理，加载路由中间件]
     * @param {[routerModule]}        [description]
     */
    pathList.forEach((item, index) => {
        let routerModule = require('../' + item);
        pathList[index] = item.replace('routes', '');
        if (pathList[index] === '/index') {
            app.use('/', routerModule); //首页路由
        } else {
            app.use(pathList[index], routerModule); //其它路由
        }
    })
}


module.exports = setRouter;