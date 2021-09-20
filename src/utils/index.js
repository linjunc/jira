/*
 * @Author: 林俊丞
 * @Date: 2021-09-20 14:36:48
 * @LastEditors: 林俊丞
 * @LastEditTime: 2021-09-20 14:56:14
 * @Description: 
 */
// 改变对象本身是不好的
// 处理0的情况 !! 表示转换为 bool值
export const isFalsy = value => value === 0 ? false : !value
export const cleanObject = (object) => {
    const result = {
        ...object
    }
    Object.keys(result).forEach(key => {
        const value = result[key]
        if (isFalsy(value)) {
            delete result[key]
        }
    })
    return result
}