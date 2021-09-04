本次任务管理项目前端用到的技术栈是React17+React Hook+TS4，而后端采用的是一个第三方工具jira-dev-tool来进行mock








项目笔记：

axios和fetch的表现不一样，axios会在返回状态不是2xx的时候抛出异常，而fetch只有在断网时或者连接网络失败时抛出异常


JS中的typeof，是在runtime时运行的
return typeof 1==='number'
TS中的typeof 是在静态环境运行的
<typeof http>
utility type的用法：用泛型给它传入一个其它类型，然后utility type对这个类型进行某种操作
Parameters<typeof http>
Partial<Person> //Person接口里面的类型可选
Omit<Person,'name'|'age'>//删除Person接口里面的name和age变量类型


### interface 与 type 的区别

**interface**

- 只能描述 `object`/`class`/`function` 的类型
- 同名 `interface` 自动合并，利于扩展

**type**

- 不能重名
- 能描述所有数据

flex和grid布局的应用场景
1.要考虑是一维布局还是二维布局
一般来说，一维布局用flex，二维布局用grid
2.是从内容出发还是从布局出发
从内容出发：你先有一组内容（数量一般不固定），然后希望它们均匀的分布在容器中，由内容自己的大小决定占据的空间
从布局出发：先规划网格（数量一般比较固定），然后再把元素往里面填充
从内容出发：flex
从布局出发：grid 

