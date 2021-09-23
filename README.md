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

原因是 Hook 中的事件是异步的，例如 `useState` 是异步的，会先执行打印 `error`

严重问题，error 无法获取

解决！！！！

通过 `then` 的第二个参数，获取到返回错误的 `promise` 对象，然后，再通过 `throw` 抛出这个错误

被外层的 `catch` 接收，注意！！抛出错误中的 `then` 方法是一个异步事件，需要通过 `async` 来解决

```js
.then(data => {
    // 成功则处理stat
    console.log(data);
    setData(data)
    // throw new Error('222')
    return data
}, async(err) => {
    console.log('失败');
    // 卧槽，尼玛的，解决了catch 获取不到错误的问题
    throw Promise.reject(await err.then())
})
```

其他代码不变

### 4. 页面的不同 title 是如何实现的？

采用自定义的 hook `useDocumentTitle` ，监听title 的变化

```ts
export const useDocumentTitle = (title: string) =>{
    useEffect(() => {
        document.title = title
    }, [title])
}
```

但是这不是最优的方案，直接这样使用会造成页面退出时获取标题丢失，我们想要的是，当我们退出登录时，标题会到 `jira 平台...` 字样

我们需要将页面中的最开始的那个 `title` 保存起来，也就是 `jira...` 然后，在当前页面被卸载时，改变这个 `title` 

我们可以利用 `hook` 天然的闭包特性来实现，但是这样会造成的问题是，不利于别人阅读我们的代码，闭包还是一个挺难发现的东西，在 `hook` 中

我们可以使用 `useRef` ，它能够帮我们保存变量的最初始状态，也就是 `jira...` ，因此这样也可以解决我们的问题，我们添加多一个 `useEffect` 来监听页面的卸载，当卸载时我们就设置会原先的 `title`

最终版 `useDocumentTitle` 自定义 `hook`

```ts
// 添加 title 的 hook
export const useDocumentTitle = (title: string, keepOnUnmount: boolean = true) => {
    // 利用 useRef 自定义 hook 它会一直帮我们保存好这个 title值，不会改变，
    const oldTitle = useRef(document.title).current
    // const oldTitle = document.title
    useEffect(() => {
        document.title = title
    }, [title])
    // 页面卸载时，重新设置为原来的 title
    useEffect(() => {
        // 利用闭包不指定依赖得到的永远是旧title ，是代码初次运行时的 oldTitle
        // 不利于别人阅读
        return () => {
            if (!keepOnUnmount) {
                document.title = oldTitle
            }
        }
    }, [keepOnUnmount, oldTitle])
}
```

### 5. 为什么采用 Navigate 会无法设置默认跳转呢？

盲猜版本迭代

艹，不要安装 `beta4` 版本，安装 `beta.0` ，第四版中的 `Navigate` 失效了

