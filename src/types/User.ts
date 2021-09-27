// 内部资源包
// 定义人员基本信息接口
// 这里需要多添加一个 token 字段，在登陆时需要记录登录信息，通过 token 令牌认证
export default interface User {
    id: number;
    name: string;
    email: string;
    title: string;
    organization: string;
    token: string; 
}
 