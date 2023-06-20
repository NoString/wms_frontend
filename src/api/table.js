import ajax from "./ajax";

export const reqQueryTable = (require,path) => {
    return ajax(path,require)
}

export const reqDeleteRows = (require,path) => ajax(path,require,'p')

export const reqAddRows = (require,path) => ajax(path,require,'p')
export const reqEditRow = (require,path) => ajax(path,require,'p')