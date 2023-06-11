import ajax from "./ajax";

export const reqQueryTable = (require,path) => {
    //格式化antd时间选择器内容
    for (let value in require) {
        if (require[value] instanceof Array) {
            require[value + '_date'] = require[value] +''
            require[value] = undefined
        }
    }
    return ajax(path,require)
}

export const reqDeleteRows = (require,path) => ajax(path,require,'p')