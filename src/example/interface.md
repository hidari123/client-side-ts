# 接口
```ts
const getFullName = ({fristName, lastName})=>{
    return `${ fristName }   ${ lastName } `
}

// 想要限制这个方法的入参类型
// fristName，lastName只能是string类型的数据
const getFullNameTS = ({fristName,lastName}:{fristName:string,lastName:string}) :string=>{
    return `${fristName}   ${lastName}`
}

// 使用interface定义接口限制类型
interface NameRule {
	fristName: string,
	lastName: string,
}

const getFullNameTS = ({fristName,lastName}:NameRule) :string=>{
    return `${fristName}   ${lastName}`
}
```

## 接口定义属性
```ts

/**
 * 可选属性 属性名后加 ?
 */
interface FoodRules{
    color?: string,
    name: string
}

const getFood = ({color , name}:FoodRules)=>{
    return `a ${color ? color : '' } ${name}` 
}

console.log(getFood({
    name: 'apple'
}))

/**
 * 额外的属性检查
 */
console.log(getFood({
     name: 'apple',
     num: 5
} as  FoodRules))
//报错

// 解决方法：
//    1. 类型断言

console.log(getFood({
    name: 'apple',
    num: 5
} as  FoodRules))


//     2. 索引签名重新定义接口
interface FoodRules{
    color?: string,
    name: string,
    [propValue:string]:any  // 索引签名，添加后可传入任意多的参数
}

//     3. 类型兼容性

let objs ={
    name: 'apple',
    num:5
}

const b = a // b 里面有的属性 a 里面也必须有 多了无所谓

console.log(getFood(objs)) // objs 当作一个变量传递到 getFood 中 
```

## 接口定义只读属性
```ts
// 属性名前加 readonly
interface FoodRules{
    color?: string,
    readonly name: string,
}

// 数组只读
interface ArrInter {
    0: number,
    readonly 1: string
}
```

## 接口定义函数结构
```ts
type AddFunc = (num1: number, num2: number) => number
const add: AddFunc = (n1, n2) => n1 + n2
```

## 接口定义索引类型
```ts
interface RoleDic1 = {
    [id: number]: string
}
const role: RoleDic1 = {
    0: 'hidari'
}

interface RoleDic2 = {
    [id: string]: string
}
const role: RoleDic2 = {
    name: 'hidari',
    0: 'hidari'  // 也可以 自动将 number 类型 转化为 string 类型
}
```

## 接口的继承
```ts
interface Vegetables {
    color: string
}
interface Tomato extends Vegetables {
    radius: number // 继承 Vegetables 中的 color 属性后 又增加一个自己的属性
}
const tomato: Tomato = {
    radius: 1,
    color: 'red'
}
```

## 混合类型接口 => 直接给函数添加属性
```ts
interface Counter {  // 定义接口
    (): viod, // 没有参数 没有返回值
    count: number // 有一个属性 count
}
const getCounter = (): Counter => {  // 定义一个获取 Couner 的函数
    const c = () => { c.count++}
    c.count = 0
    return c
}
const counter: Counter = getCounter() // 调用函数 指定 counter 类型是 Counter 类型
counter()
console.log(counter.count)  // 1
counter()
console.log(counter.count)  // 2
counter()
console.log(counter.count)  // 3
```