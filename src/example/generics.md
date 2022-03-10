# 泛型

## 泛型变量
```ts
const getArray = <T, U>(param1: T, param2: U, times: number): [T, U] [] => {
    return new Array(times).fill(prama1, prama2)
}
getArray<number, string>(1, 'a', 3).forEach(item => {
    console.log(item[0]) // number 类型
    console.log(item[1]) // string 类型
})
```

## 泛型定义函数类型
```ts
const getArray: <T>(arg: T, times: number) => T[]
getArray = (arg: any, time: number) => {
    return new Array(times).fill(arg)
}
// 类型别名
type GetArray = <T>(arg: T, times: number) => T[]
let getArray: GetArray = (arg: any, time: number) => {
    return new Array(times).fill(arg)
}
// 接口
interface GetArray {
    <T>(arg: T, times: number): T[],
    array: T[]
}
```

## 泛型的限制
```ts
interface ValueWithLength {
    length: number // 要有 length 属性
}
const getArray: <T extends ValueWithLength>(arg: T, times): T[] => {
    return new Array(times).fill(arg)
}
getArray([1,2],3)
getArray('123',3)
getArray({
    length: 2
},3)
```

## 类型参数
```ts
// keyof 返回的是一个对象上所有属性名的数组
// 这里 K 代表 T 属性中的一个
const getProps = <T, K extends keyof T>(object: T, propName: K) => {
    return object[propName]
}
const objs = {
    a: 'a',
    b: 'b'
}
getProp(objs, 'c') // 报错 c 不存在这个数组中
```