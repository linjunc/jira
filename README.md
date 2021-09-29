# 开发笔记

## 一、使用到的技术栈

1. React17
2. React Hook
3. TS4
4. Hook + Content
5. React Query
6. CSS in JS
7. React Router 6 



## 二、命令行日志

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

安装 react-beautiful-dnd ，一个实现拖拽的库

```shell
yarn add react-beautiful-dnd
```



## 三、Mock 方案

### 1. 代码侵入（请求本地 Json）

缺点：

1. 相比于其他方案的 Mock 效果不好
2. 与真实接口切换非常麻烦（需要侵入代码切换环境的行为都是不好的）

### 2. 请求拦截

例如：`Mock.js` 

示例：

拦截的请求地址，请求方式，响应的数据

```js
Mock.mock(/\\/api\\/linjunc\\/ljc/, 'get', {
	//设置响应数据
})

```

优点：

1. 与前端代码分离
2. 可生成随机数据

缺点

1. 数据是动态生成的假数据，无法模拟增删改查
2. 只支持 ajax，不支持 fetch

### 3. 接口管理工具

例如： `rap`、`swagger` 、`moco`

优点：

1. 配置功能强大，接口管理和 Mock 一体

缺点：

1. 功能强大所以配置复杂，
2. 依赖后端，看后端脸色

### 4. 本地 node 服务器

采用 `json-server`

优点：

1. 配置简单
2. 自定义程度高
3. 增删改查真实

缺点：

1. 无法跟随后端 API 的修改而自动修改

配置 `package.json`

```json
"json-server": "json-server __json_server_mock__/db.json --watch"
```

## 四、 传统 CSS 的缺陷 相比于 （CSS in JS)

这是一种组织 CSS 代码的方式，常用的有两个 `styled-component` 和 `emotion`

在上个简书项目的开发中采用了 `styled-component` ，这次项目采用了 `emotion` ，从体验上来看 `emotion` 更胜一筹，但是两者的几乎没有什么差别吧，基本一样的~

### 1. 缺乏作用域

传统的 CSS 只有一个全局作用域，比如说一个 `class` 选择器可以匹配全局的元素，这到项目的后期，是非常恐怖的，样式的层级难以理清，导致失控，而 CSS in JS 的方式可以通过独特的选择符，来实现作用域的效果

### 2. 隐式依赖，样式难以追踪

在传统 CSS 中 ，由于选择器优先级的关系，元素样式设置都是一件麻烦事

而在 CSS in JS 中可以直接对指定的组件单个进行样式设置

```html
export const Title = styled.h1`
  color: green;
`
<Title>
  什么颜色
</Title>
```

### 3. 没有变量

传统 CSS 中没有变量，在 CSS in JS 中可以方便的控制变量，这也得益于 JS 模块化的作用

```js
const Container = styled.div(props => ({
  display: 'flex',
  flexDirection: props.column && 'column'
}))
```

### 4. CSS 选择器与 HTML 元素耦合

给一个元素设置样式，我们首先需要设置他的标签，然后，再设置 CSS 样式，这样就会造成，HTML 和 CSS 耦合，例如当需要修改 `h1` 标签为 `h2` 标签时，我们需要修改  HTML 再修改 CSS 代码

而再 CSS in JS 中采用的是另一种模式，通过组件驱动样式，我们设置一个样式是什么什么样的组件，这个组件即包含了 HTML 结构，又包含了 CSS ，这样美哉~

## 五、接口开发

由于视频采用的是老师的工具，导致了这个项目部署以后会有用不了的问题，因此还是决定自己写一下接口，调用自己的数据，这样这个项目也算是自己完全掌握的，为了减少前端代码的修改，所有的接口规范都用尽量和本地存储数据样例保持一致，路由地址也会尽可能的一致吧

采用工具时的本地存储信息，我们的数据格式以这个为主，数据存储在远端数据库中

![image-20210928171138392](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210928171138392.png)

### 1. 技术选型

采用的是 KOA 框架，原因：使用起来方便简单，最重要的是最近刚学的，用来练练手

数据库采用的是 MongoDB 数据库，结合 `mongoose` 使用，对前端及其友好

### 2. 接口文档

开发之前，先把文档写好，我一定能行

请求 url：

| 请求地址             | 请求方式 | 参数                                                         | 返回成功信息                                                 | 返回失败信息                                                 | 作用         |
| -------------------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------ |
| /login               | POST     | password，username                                           | ![image-20210928172149075](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210928172149075.png) | ![image-20210928172125638](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210928172125638.png) | 登录         |
| /register            | POST     | password,<br />username                                      | ![image-20210928172540915](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210928172540915.png) | ![image-20210928172613212](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210928172613212.png) | 注册         |
| /projects            | GET      |                                                              | created: 1604989757139 id: 1 name: "快递管理" organization: "快递组" ownerId: 193416192 personId: 2 pin: true |                                                              | 获取列表     |
| /projects            | POST     | name,organization,personId                                   | ![image-20210928180304505](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210928180304505.png) |                                                              | 新增项目     |
| /projects/number     | PATCH    | ![image-20210928180713161](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210928180713161.png) |                                                              |                                                              | 编辑项目     |
| /projects/number     | DELETE   |                                                              | ![image-20210928180839511](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210928180839511.png) |                                                              | 删除项目     |
| /users               | GET      |                                                              | id: 1 name: "高修文" organization: "外卖组" ownerId: 193416192 |                                                              | 获取用户     |
| /projects?name=a     | GET      | name                                                         | 同/projects                                                  |                                                              | 查询项目     |
| /projects?personId=1 | GET      | personId                                                     | 同/projects                                                  |                                                              | id查询       |
| /taskTypes           | GET      |                                                              | ![image-20210928175524429](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210928175524429.png) |                                                              | 获取类型     |
| /kanbans?projectId=1 | GET      | projectId                                                    | ![image-20210928175637832](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210928175637832.png) |                                                              | 获取看板数据 |
| /tasks?projectId=1   | GET      | projectId                                                    | ![image-20210928175858873](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210928175858873.png) |                                                              | 获取项目任务 |
| /epics?projectId=1   | GET      | projectId                                                    | ![image-20210928180035418](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210928180035418.png) |                                                              | 获取任务组   |

好像有点多啊


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

### 11. 怎么理解 component composition 这种透传数据的模式

引用官网的一句话

> Context 主要应用场景在于*很多*不同层级的组件需要访问同样一些的数据。请谨慎使用，因为这会使得组件的复用性变差。
>
> **如果你只是想避免层层传递一些属性，[组件组合（component composition）](https://zh-hans.reactjs.org/docs/composition-vs-inheritance.html)有时候是一个比 context 更好的解决方案。**

**我们把我们需要用到数据的那个组件直接丢到数据来源的 props 身上** ，然后消费数据，把消费完的组件，也就是要被渲染到页面的内容，通过 `props` 传回来。这就是 `component compositon` ，简单粗暴，我们在原来的地方，直接渲染这个组件即可

例如：我们在 `Page` 组件中需要传递个 `Auth` 组件 `user` 信息，它们之间有很多的深层嵌套

我们可以这么做 （官网例子）

```tsx
function Page(props) {
  const user = props.user;
  const userLink = (
    <Link href={user.permalink}>
      <Avatar user={user} size={props.avatarSize} />
    </Link>
  );
  return <PageLayout userLink={userLink} />;
}

// 现在，我们有这样的组件：
<Page user={user} avatarSize={avatarSize} />
// ... 渲染出 ...Page的子组件
<PageLayout userLink={...} />
// ... 渲染出 ...PageLayout的子组件
<NavigationBar userLink={...} />
// ... 渲染出 ...
{props.userLink}
```

这样我们只用传递 `userLink` 即可，

### 12. 为什么创建和编辑中的关闭按钮，只有一个起作用？

造成这个问题主要原因在于这段代码

```tsx
const close = () => {
    setEditingProjectId({ editingProjectId: undefined });
    setProjectCreate({ projectCreate: undefined });
}
```

测试发现哪条语句在前面，哪个就生效，在前面的那个不会生效，初步判断造成问题的原因是异步操作，但是还没有找到解决的方法

更正问题来源：由于后面的那一条会把前面的数据重新设置上去造成的

最终将这里的两次调用抽成了一次，将 `seturl...` 函数抽象成两个，一个读取，一个设置

### 13. 搜索框的功能是如何实现的？ 

在 `useTask` 中触发，发送请求

```tsx
export const useTasks = (param?: Partial<Task>) => {
    const client = useHttp()
    // 搜索框请求在这里触发
    return useQuery<Task[]>(['tasks', param], () => client('tasks', { data: param }))
}
```

