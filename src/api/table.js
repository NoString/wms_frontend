import ajax from "./ajax";

export const reqQueryTable = (require,path) => ajax(path,require == null ? {} : require,'g')