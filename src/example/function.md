# 函数
```ts
//写法
let add: (x: number, y: number) => number // 定义一个函数
add = (arg1: number, arg2: number) => arg1 + arg2 // 使用这个函数

// 推荐使用类型别名定义函数
type Add = (x: number, y: number) => number
//相当于
interface Add {
    (x: number, y: number): number
}

// 指定一个函数 是 Add 类型
let addFunc: Add
addFunc = (arg1: number, arg2: number) => arg1 + arg2
```

## 可选参数
```ts
// JS 中 可选参数需要用 undefined 占位
// TS 中 可选参数要放到最后写
type AddFunction = (arg1: number, arg2: number, arg3?: number) => number
let addFunction: AddFunction
addFunction = (x: number, y: number) => x + y
addFunction = (x: number, y: number, z: number) => x + y + z
```

## 默认参数
```ts
// 和 ES6 相同
addFunction = (x: number, y: number = 3) => x + y
```

## 剩余运算符
```js
let obj1 = {
    a: 'a',
    b: 'b'
}
let obj2 = {
    ...obj1,
    c: 'c'
}
obj2 // {a: 'a', b: 'b', c: 'c'}
```
```ts
const handleData = (arg1: number, ...args: number[]) => {}
```

## 重载
```ts
// 为同一个函数提供多个函数类型定义来进行函数重载
function handleData(x: string): string[]
function handleData(x: number): number[]
// 方便计算机知道数组是什么类型
function handleData(x: any):any {
    if(typeof x === 'string') {
        return x.split('')
    } else {
        return x.toString().split('').map((item) => Number(item))
    }
}
// 函数实现
```