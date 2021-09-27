/*
 * @Author: 林俊丞
 * @Date: 2021-09-20 22:06:17
 * @LastEditors: cheng
 * @LastEditTime: 2021-09-23 23:35:14
 * @Description: 使用 firebase 服务不需要使用开发者开发
 */

import User from "types/User";
// 全局 URL
const apiUrl = process.env.REACT_APP_API_URL;
// 保存本地存储中的 token 键
const localStorageKey = "__auth_provider_token__";
// 获取 token 的值
export const getToken = () => window.localStorage.getItem(localStorageKey);
// 处理响应，重新设置 token
export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};
// 当用户登录的时候，调用函数设置 token
export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      throw Promise.reject(await response.json());
    }
  });
};
// 当用户注册时调用，同时也要注册一个 token
export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      // 这里需要扔一个错误
      throw Promise.reject(await response.json());
    }
  });
};

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);