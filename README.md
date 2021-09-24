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

安装 json-server 启动一个 server 服务

```shell
yarn add json-server -D
```

安装 qs

```shell
yarn add qs
```

安装 ts 版 qs 来处理 post

```shell
 yarn add @types/qs -D
```

安装 emotion 采用 CSS in JS

```js
yarn add @emotion/react @emotion/styled
```

安装 dayjs 处理时间格式 `YYYY-MM-DD`

```shell
yarn add dayjs
```

安装新版 `jira-dev-tool`

```shell
yarn add jira-dev-tool@next
```

利用一个  `why-did-you-render` 库，来显示**什么东西在渲染**

```shell
yarn add @welldone-software/why-did-you-render
```

> 在 src 目录下新建一个 `wdyr.ts` 文件，然后在官网找到 `wdyr.js` 的内容，cv，再在 index.tsx 中的第一行引入  

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

同时注意，在 `fetch` 中返回错误，不能用 return 需要用 `throw` ，抛出 promise 错误

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

### 6. 在采用 antd 自定义组件的时候，如何开放更多的类型呢？

我们可以利用 `React` 自带的方法，获取到组件身上的全部类型

```ts
type SelectProps = React.ComponentProps<typeof Select>
```

然后，通过 `extends` 来继承 `SelectProps` 身上的方法

```ts
interface IdSelectProps extends SelectProps 
```

但是这样会有类型冲突的问题

![image-20210924105645394](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210924105645394.png)

因此我们需要排除掉我们在这里使用过的类型，采用 `Omit` 方法

```tsx
interface IdSelectProps extends Omit<SelectProps, 'value' | "onChange" | "options" | "defaultOptionName">
```

这样我们定义的类型就能够接收所有的 `props` 了，最后还要解构一下其他的 `props` 噢

### 7. 什么时候命名 ts，tsx 文件呢？

当包含模板文件的时候采用 `tsx` 文件，不包含模板代码的时候使用 `ts` 文件，不然会引起误会

### 8. 在代码中出现的 !! 是什么意思呢

```tsx
onCheckedChange?.(!!num)
```

例如这里的 `!!num` 

它代表的意思是 `Boolean(num)` 将 `num` 转化成 `boolean` 类型 `true or false`

### 9. 在组件中我们不能使用 hook，那我们如何更改组件状态呢？

我们可以在我们的自定义 hook 中，暴露一个函数，我们通过调用这个函数来实现状态的更新

### 10. 在请求数据返回之前如果页面被卸载了，造成报错如何解决

这个问题的来源是，我们在请求数据的时候，**我们登出了页面**，当前的 `setData` **还没有结束**，当完成时，需要渲染的页面已经不存在了，因此我们**需要判断一下**，页面是否被卸载再来渲染组件

为此我们写了一个自定义的 `hook` 用来判断组件是否被卸载

```tsx
export const useMountedRef = () => {
    const mountedRef = useRef(false)
    // 通过 useEffect hook 来监听组件状态 
    useEffect(() => {
        mountedRef.current = true
        return () => {
            mountedRef.current = false
        }
    })
    return mountedRef
}
```

主要利用了 `useEffect` 的特性，当组件卸载时执行 `return` ，当我们写自定义 hook 的话，如果返回一个函数，非常大概率是需要使用 `useMemo` 或 `useCallback` 

非常重要

