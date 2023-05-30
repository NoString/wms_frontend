import ajax from "./ajax";

export const reqLogin = (username,password) => ajax("/user/login",{username,password},'p')