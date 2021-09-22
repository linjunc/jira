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

### 1. 怎么实现页面刷新后仍然是上一次的状态？

通过 `token` 以及本地存储实现，我们在登录时，会将token 存储到本地中，这一步不需要我们手动操作，用的老师的库会自动实现。我们在初始化页面的时候，需要挂载一个 `useMount` 方法进行初始化，在这个函数里，主要进行的是 `token` 令牌的判断，如果存在 `token` 我们就，发送一个请求去获取用户数据 `data`

然后返回 `user` 数据 

### 2. 为什么使用 catch 中的 err 会报错呢？

在 `TS4.4` 版本中规定了 `catch` 中的 `err` 对象默认类型为 `unknown` ，因此我们不能用它向其他东西赋值，我们可以先进行类型设置

那为什么使用连写的方式就可以呢 `login(values).catch(onError)` 原因是，我们的 `login` 调用是异步的，但是一旦调用就会执行 `catch` ，因此获取不到值

一方面可以采用 `async` 来解决，也可以连写

### 3. 为什么控制台打印 error 总是 null

原因是 Hook 中的事件是异步的，例如 `setState` 是异步的，会先执行打印 `error`

严重问题，error 无法获取
