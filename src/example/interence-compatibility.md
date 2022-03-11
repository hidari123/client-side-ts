# 类型推论和兼容性

## 基础兼容性
```ts
interface Info {
    name: string
}
let info: Info
const info1 = {name: 'hidari', age: 18}
info = info1 // 正确，info1 必须包含 info ，可以有 info 中没有的参数

// 深度递归遍历
interface Info {
    name: string,
    info: { age: number }
}
let info: Info
const info2 = {name: 'hidari', info: {age: 18}} // 正确
```

## 函数兼容性
1. 参数个数
```ts
let x = (a: number) => 0
let y = (b: bumber, c: string) => 0
y = x // 正确 
x = y // 报错
// 右边的函数参数个数小于等于左边的函数参数个数

// eg
const arrs = [1, 2, 3]
arrs.forEach((item, index, array) => {
    console.log(item)
})
// =>
arrs.forEach(item => {
    console.log(item)
})
// 设定的时候有三个参数，可能实际用的时候只用了一个 所以要求赋值的函数参数个数小于等于被赋值的函数的参数个数
```
2. 参数类型
```ts
let x = (a: number) => 0
let y = (b: string) => 0
x = y // 报错
```
3. 可选参数和剩余参数
```ts
const getSum = (arr: number[], callback: (...args: number[]) => number): number => {
    return callback(...arr)
}
// reduce 两个两个遍历函数
// 这串代码将 这个数组里的代码相加求和
// ...args 剩余参数 可以有任意多个 类型要一致
// 剩余参数是无数个可选参数组成的
getSum([1, 2], (...args: number): number => args.reduce((a,b) => a + b, 0))
```
4. 函数参数双向协变
```ts
let funcA = (arg: number | string): void => {}
let funcB = (arg: number): void => {}
funcA = funcB
funcB = funcA
// 都可以 都可以使用 number 类型
```
5. 返回值类型
```ts
let x = (): string | number => 0
let y = (): string => 'a'
let z = (): boolean => false
x = y
y = x // 报错 y 只能是 string 类型，x 可以是 string 可以是 number
y = z // 报错
```
6. 函数重载
```ts
function merge(arg1: number, arg2: number): number
function merge(arg1: string, arg2: string): string
function merge(arg1: any, arg2: any) {
    return arg1 + arg2
}
merge(1, 2) // number 类型
merge('1', '2') // string 类型

function sum(arg1: number, arg2: number): number
function sum(arg1: any, arg2: any): any {
    return arg1 + arg2
}
let func = merge
// 相当于 =>
let func: {
    (arg1: number, arg2: number): number
    (arg1: string, arg2: string): string
}
func = sum // 报错
```

## 枚举兼容性
```ts
// number 枚举类型只与 number 类型兼容，不同枚举值之间不兼容
enum Status {
    On,
    Off
}

enum Animal {
    Dog,
    Cat
}
let s = Status.On
s = 2 // 成功 只要赋值时 number 类型就可以
s = Animal.Dog // 报错
```

## 类兼容性
```ts
// public
class Animal {
    public static age: number
    constructor(public name: string) {}
}
class People {
    public static age: string
    constructor(public name: string) {}
}
class Food {
    constructor(public name: number) {}
}
// 当使用 类 作为类类型时 检测的是实例
let animal: Animal
let people: People
let food: Food
animal = people // 成功 不检测类的静态成员和构造函数 只比较实例 两个实例都是 public name: string 所以兼容
animal = food // 报错

// private
class Parent {
    private age: number
    constructor() {}
}
class Child extends Parent {
    constructor () {
        super()
    }
}
class Other {
    private age: number
    constructor() {}
}

const children: Parent = new Child() // 成功 子类可以赋值给父类的值
const other: Parent = new Other() // 报错 private
```

## 泛型兼容性
```ts
interface Data<T> {}
let data1: Data<number>
let data2: Data<string>
data1 = data2 // 成功 因为接口里面什么都没有 不管传 number 还是 string 都没有影响

interface Data<T> {
    data: T
}
let data1: Data<number>
let data2: Data<string>
data1 = data2 // 失败 里面有data对象
```