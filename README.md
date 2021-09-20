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





## Mock 方案

1. json
2. 请求拦截
3. 本地node 服务器
4. json-server

配置 `package.json`

```json
"json-server": "json-server __json_server_mock__/db.json --watch"
```

