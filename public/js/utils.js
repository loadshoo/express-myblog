const utils = {
    /**
     * [jsonPaser description] 处理数据库查询出的多余数据
     * @param  {[Array, Object]} data [description] 需要处理的数据
     * @return {[type]}      [description] 处理后的数据
     */
    jsonPaser(data) {
        // console.log(data[0].toJSON(),'data')
        if (Object.prototype.toString.call(data) === '[object Array]') {
            data.forEach((v, i, arr) => {
                data[i] = data[i].toJSON();
            })
            return data
        } else if (Object.prototype.toString.call(data) === '[object Object]') {
            return data.toJSON()
        }
    }
}

module.exports = utils;