# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

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

