# 开发笔记

## 使用到的技术栈

1. React17
2. React Hook
3. TS4
4. Hook + Content
5. React Query
6. CSS in JS



## 命令行日志

初始化项目命令

使用 TS

```shell
 npx create-react-app jira --template typescript
```

安装 prettier

```js
yarn add prettier
```

创建配置文件 

```tsx
echo {} > .prettierrc.json
```

自动格式化

```shell
npx mrm@2 lint-staged
```

安装 json-server

```shell
yarn add json-server -D
```

安装 qs

```shell
yarn add qs
```

安装 ts 版 qs

```shell
 yarn add @types/qs -D
```

安装 emotion

```js
yarn add @emotion/react @emotion/styled
```

安装 dayjs 处理时间

```shell
yarn add dayjs
```

安装新版 `jira-dev-tool`

```shell
yarn add jira-dev-tool@next
```



## Mock 方案

1. json
2. 请求拦截
3. 本地node 服务器
4. json-server

配置 `package.json`

```json
"json-server": "json-server __json_server_mock__/db.json --watch"
```

## Q&A 文档

### 怎么实现页面刷新后仍然是上一次的状态？

通过 `token` 以及本地存储实现，我们在登录时，会将token 存储到本地中，这一步不需要我们手动操作，用的老师的库会自动实现。我们在初始化页面的时候，需要挂载一个 `useMount` 方法进行初始化，在这个函数里，主要进行的是 `token` 令牌的判断，如果存在 `token` 我们就，发送一个请求去获取用户数据 `data`

然后返回 `user` 数据 
