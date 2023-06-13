import ajax from "./ajax";

export const reqQueryTable = (require,path) => {
    return ajax(path,require)
}

export const reqDeleteRows = (require,path) => ajax(path,require,'p')