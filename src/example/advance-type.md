# 高级类型

## 交叉类型
```ts
// T & U => & 符号交叉类型
const mergeFunc = <T, U>(arg1: T, arg2: U): T & U => {
    let res = {} as <T, U>
    // assign 接受两个对象，返回合并后的结果
    res = Object.assign(arg1, arg2)
    return res
}
mergeFunc({a: 'a'}, {b: 'b'}).a
```

## 联合类型
```ts
// type1 | type2 | type3
const getLength = (content: string | number): number => {
    if (typeof content === 'string') { return content.length }
    else { return content.toString().length }
}
```

## 类型保护
```ts
const valueList = [123, 'abc']
const getRandomValue = () => {
    const number = Math.random() * 10
    if (number < 5) { return valueList[0]}
    else { return valueList[1] }
}
const item = getRandomValue()

// 定义类型保护

/**
 * 1.
 */
function isString(value: number | string): value is string {
    return typeof value === 'string'
}

if(isString(item)) {
    console.log(item.length)
} else {
    console.log(item.toFiced())
}

/**
 * 2. typeof TS中是类型保护 只能 === 或 !==
 * string / number / boolean / symbol 只有四种类型
 */
if(typeof item === 'string') {
    console.log(item.length)
} else {
    console.log(item.toFiced())
}

/**
 * 3. instanceof
 * 某个实例是不是某个构造函数创建的实例
 */
class CreatByClass1 {
    public age = 3
    constructor() {}
}
class CreatByClass2 {
    public name = 'hidari'
    constructor() {}
}
function getRandomItem() {
    return Math.random() < 0.5 ? new CreatByclass1() : new CreatByclass2()
}
const item1 = getRandomItem()
if (item1 instanceof CreatByclass1) {
    console.log(item1.age)
} else {
    console.log(item1.name)
}
```

## none/undefined
```ts
// 任何类型的子类型
let values = 'i23'
// 相当于 =>
let values: string | undefined = '123'

string|undefined / string|null / string|null|undefined // 三种不同类型

const sum = (x: number, y?: number) => {
    return x + (y || 0)
}

const getLength = (value: string | null): number => {
    // 如果有 value 取 length，如果没有 取 ''
    return (value || '').length
}

function getSplicedStr(num: number | null) {
    function getRes(prefix: string) {
        // 定义函数时 还没有判断 num = num || 0.1 给默认值
        // 所以要类型断言 num! 表示不是空的
        return prefix + num!.toFixed().toString()
    }
    num = num || 0.1
    return getRes('hidari-')
}
console.log(getSplicedStr(1.2)) // hidari-1
```

## 类型别名
```ts
type TypeString = string
let str: TypeString // => let str: string
type PositionType<T> = {x: T, y: T}
const position1: PositionType<number> = {
    x: 1,
    y: -1
}

// 使用类型别名时 可以在属性中引用自己
type Childs<T> = {
    current: T,
    child?: Childs<T> // 树状结构 嵌套用法
}
let child: Childs<string> = {
    current: 'first',
    child: {
        current: 'second',
        child: {
            current: 'third',
            child: 'test' // 报错 不符合规定
        }
    }
}

type Childs = Childs[] // 报错 只能在属性中引用自己

// 类型别名为接口起别名时，不能用 instance 和 implements 不是真实的接口
type Alias = {
    num: number
}
interface Interface {
    num: number
}
let _alias: Interface = {
    num: 123
}
let _interface: Interface = {
    num: 321
}
_alias = _interface // 成功
```

## 自变量类型
1. 字符串自变量
```ts
type Name = 'hidari'
const name: Name = 'haha' // 失败 上面的 'hidari' 是作为类型使用的
type Direction = 'north' | 'east' | 'south' | 'west'
function getDirectionFirstLetter(direction: Direction) {
    return direction.subStr(0,1)
}
console.log(getDirectionFirstLetter('north'))

type Age = 18
interface Info {
    name: string,
    age: Age
}
const _info: InfoInterface = {
    name: 'hidari',
    age: 18
}
```
2. 枚举成员类型
符合三个条件
1. 不带`初始值`的枚举成员
2. 值为`字符串`或`自变量`
3. 值为`数值自变量` 或者`带有负号的数值自变量`

## 可辨识联合
两个要素
1. 具有普通的单例类型属性
2. 一个类型别名包含了哪些类型联合
```ts
// kind 普通单例类型属性特征
interface Square {
    kind: 'square'
    size: number
}
interface Rectangle {
    kind: 'rectangle'
    height: number
    width: number
}
interface Circle {
    kind: 'circle'
    radius: number
}
// 类型别名 Shape
type Shape = Square | Rectangle | Circle
function getArea(s: Shape) {
    switch (s.kind) {
        case 'Square': return s.size * s.size
        break
        case 'Rectangle': return s.height * s.width
        break
        // es7 ** 幂函数
        case 'Circle': return Math.PI * s.radius ** 2
    }
}
```

## 完整性检查
1. strictNullChecks
```ts
// 定义返回值类型为 number kind = Circle 时返回 null 报错
function getArea(s: Shape): number {
    switch (s.kind) {
        case 'Square': return s.size * s.size
        break
        case 'Rectangle': return s.height * s.width
        break
    }
}
```
2. never
```ts
function assertNever(value: never): never {
    throw new Error('Unexpected object: ' + value)
}
function getArea(s: Shape): number {
    switch (s.kind) {
        case 'Square': return s.size * s.size
        break
        case 'Rectangle': return s.height * s.width
        break
        default: return assertNever(s)
    }
}
```

## this类型
```ts
// 返回 this 实例 可以链式调用
class Counter {
    constructor(public count: number = 0) {}
    public add(value: number) {
        this.count += value
        return this
    }
    public sub(value: number) {
        this.count -= value
        return this
    }
}
let counter = new Counter(10)
console.log(counter.add(3).sub(2)) // 链式调用 10 + 3 - 2 = 11

class PowCounter extends Counter {
    constructor(public count: number = 0) {
        super(count)
    }
    public pow(value: number) {
        this.count = this.count ** value
        return this
    }
}
let powCounter = new PowCounter(2)
console.log(powCounter.pow(3).add(1).sub(3))
```

## 索引类型
1. keyof
```ts
// keyof 接口 相当于 接口内字段名组成的联合类型
interface Info {
    name: string
    age: number
}
let infoProp: keyof Info
infoProp = 'name'
infoProp = 'age'
infoProp = 'sex' // 报错

function getValue<T, K extends keyof T>(obj: T, names: K[]): Array<T[K]> {
    // 属性名对应的属性值
    return names.map(n => obj(n))
}
const infoObj = {
    name: 'hidari',
    age: 18
}
// 属性值组成的数组
let infoValues: Array<string | number> = getValue(infoObj, ['name'，'age'])
```
2. 索引访问操作符
```ts
type NameTypes = Info['name']

function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
    return o[name]
}
interface Objs<T> {
    [key: number]: T
}
const objs: Objs<number> = {
    age: 18
}
let keys: keyof Objs<number>
let keys: Objs<number>['name']

interface Type {
    a: never
    b: never
    c: string
    d: number
    e: undefined
    f: null
    g: object
}
// 返回 非 never undefined null 组成的联合类型
type Test = Type[keyof Type]
```
3. 映射类型
```ts
// 定义一个函数 传入参数 遍历函数中所有属性 做相关操作 返回新的类型
// => 给所有参数加同样的属性
interface Info {
    age: number
    name: string
    sex: string
}
type ReadonlyType<T> = {
    // in => for in 循环迭代器 keyof T => 所有类型属性名
    // in keyof 遍历所有属性名 返回组成的对象
    readonly [P in keyof T]: T[P]
    // readonly [P inkey of T]?: T[P] 全部变成可选属性
}
type ReadonlyInfo = ReadonlyType<Info>
// => 
/**
 * type ReadonlyInfo = {
 *      readonly age: number
 *      readonly name: string
 *      readonly sex: string
 *  }
 */

// TS 内置映射类型 Readonly Partial Pick Record
// 前三个 同态（相同类型的结构保持映射） Record 映射出新的属性值 不是同态
type type1 = Readonly<Info>
type type2 = Partial<Info> // 可选字段
type Pick<T, K extends keyof T> = {
    [P in K]: T[P]
}
type Record<K extends keyof any, T> = {
    [P in K]: T
}
const info: Info = {
    age: 18
    name: 'hidari',
    sex: 'woman'
}
// 选择其中一个或多个对象 使用 pick
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    let res: any = {}
    keys.map(key => {
        res[key] = obj[key]
    })
    // 返回其中一个或多个参数组成的对象
    return res
}
const name = pick(info.['name', 'age'])

// 把对象中的属性转化为其他值 使用 Record
function mapObj<K extends string | number, T, U>(obj: Record<K, T>, f: (x: T) => u): Record<K, U> {
    let res: any = {}
    for (const key in Obj) {
        res[key] = f(obj[key])
    }
    return res
}
const names = { 0: 'hello', 1: 'world', 2: 'bye' }
// 返回属性的长度
const lengths = mapObj(names, (s) => s.length)

// 映射类型逆向操作 拆包
// 包装：
type Proxy<T> = {
    get(): T
    set(value: T): void
}
type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>
}
function proxify<T>(obj: T): Proxify<T>{
    const result = {} as Proxify<T>
    for (const key in Obj) {
        result[key] = {
            // 属性值变成对象
            get: () => obj[key],
            set: (value) => obj[key] = value
        }
    }
    return result
}
let props = {
    name: 'hidari',
    age: 18
}
let proxyProps = proxify(props)
console.log(proxyProps.name.get())

// 拆包
function unproxify<T>(t: Proxify<T>): T {
    let result = {} as T
    for (const k in t) {
        result[k] = t[k].get()
    }
    return result
}
let originalProps = unproxify(proxyProps)

// 增加或移除修饰符
// 增加 '+' 移除 '-'
type RemoveReadonlyInfo<T> = {
    -readonly [P in keyof T]-?: T[P]
}

// keyof 和 映射 支持 数值类型和symbol类型
const stringIndex = 'a'
const numberIndex = 1
const symbolIndex = Symbol()
type Objs = {
    [stringIndex]: string,
    [numberIndex]: number,
    [symbolIndex]: symbol
}
type keysType = keyof Objs // => type keysType = 'a' | 1 | tyoeof symbolIndex 联合类型

type ReadonlyTypes<T> = {
    readonly [P in keyof T]: T[P]
}
let objs: ReadonlyTypes<Objs> = {
    a: 'aa',
    1: 11,
    [symbolIndex]: Symbol()
}

// 元组和数组的映射类型 会生成新的元组和数组 不会创建新的类型
type MapToPromise<T> = {
    [K in keyof T]: Promise<T[K]>
}
// 元组
type Tuple = [number, string, boolean]
type promiseTuple = MapToPromise<Tuple>
let tuple: promiseTuple = [
    new Promise((resolve, reject) => resolve(1)),
    new Promise((resolve, reject) => resolve('a')),
    new Promise((resolve, reject) => resolve(false)),
]
```

## unknown
1. 任何类型都可以复制给`unknown`类型
```ts
let value1: unknown
value1 = 'a'
value1 = 123
```
2. 如果没有类型断言或基于控制流的类型细化时，`unknown`不可赋值给其他类型，此时他只能复制给`unknown`和`any`类型
```ts
let value2: unknown
let value3: string = value2 // 报错
let value1 = value2 // 成功
```
3.  如果没有类型断言或基于控制流的类型细化时，不能在它上面进行任何操作
```ts
let value4: unknown
value4 += 1 // 报错
```
4. `unknown`与任何其他类型组成的交叉类型，最后都等于其他类型
```ts
type type1 = string & unknown // string
type type2 = unknown & unknown // unknown
type type3 = unknown & string[] // string[]
```
5. `unknown`与任何其他类型(除了`any`)组成的联合类型，都等于`unknown`类型
```ts
type type4 = unknown | string // unknown
type type5 = any | unknown // any
```
6. `never`类型是`unknown`的子类型
```ts
type type6 = never extends unknown ? true : false // true
```
7. `keyof unknown`等于类型`never`
```ts
type type7 = keyof unknown // never
```
8. 只能对`unknown`进行等或不等操作 不能进行其他操作
```ts
value1 === value2 // success
value1 !== value2 // succcess
value1 += value2 // false
```
9. `unknown`类型的值不能访问它的属性 作为函数调用和作为类创建实例
```ts
let value3: unknown
// value3.age false
// value3() false
// new value3() false
```
10. 使用映射类型时，如果遍历的是`unknown`类型，则不会映射任何属性
```ts
type Types<T> = {
    [P in keyof T]: number
}
type type8 = Types<any> // => [x: string]: number
type type9 = Types<unknown> // => type type9 = {}
```

## 条件类型
```ts
// T extends U ? X : Y
type Types<T> = T extends string ? string : number
let index: Types<false> // number
```
### 分步式条件类型
```ts
type Type1<T> = T extends any ? T : never
type Type2 = Type1<string | number> // => type type2 = <string | number>
// 检测 string 是否是 any 子类型？ 是，返回 string，number 是否是 any 子类型？是，返回 number

type Type3<T> = 
    T extends string ? string :
    T extends number ? number :
    T extends boolean ? boolean :
    T extends undefined ? undefined :
    T extends () => void ? () => void :
    object
type Type4 = Type3<() => void> // () => void
type Type5 = Type3<string[]> // object
type Type6 = Type3<(() => void) | string[]> // object | (() => void)

// 实际应用
// 看前面类型是不是后面的子类型
type Diff<T, U> = T extends U ? never : T
type Test = Diff<string | number | boolean, undefined | number>

// 条件类型和映射类型结合
type Type7<T> = {
    [K in keyof T]: T[K] extends (() => void) ? K : never
}[keyof T]// [keyof T] 索引访问类型 获取所有不为 never 的属性名
interface Part {
    id: number
    name: string
    subparts: Part[]
    undatePart(newName: string): void
}
type Test1 = Type7<Part>  // => type Test = 'undatePart'
```
### 条件类型的类型推断
```ts
// infer 推断类型
// 如果是数组 取数组元素的类型 如果不是数组 直接取类型
// T[number] 索引访问类型 传入一个 index 返回值的类型
type Type8<T> = T extends any[] ? T[number] : T
type Test2 = Type8<string[]> // type Test2 = string
type Test3 = Type8<string> // type Test3 = string

// infer 写法
// 通过 infer 可以计算出当前元素的类型是什么 并且返回推断的类型
type Type9<T> = T extends Array<infer U> ? U : T
type Test4 = Type9<string[]> // string
type Test5 = Type9<string> // string

// Exclude<T, U>
// 从前面的类型中去除后面的类型
type Type10 = Exclude<'a' | 'b' | 'c', 'a' | 'b'> // 'c'

// Extract<T, U>
// 选取出 T 中 可以赋值给 U 的类型
type Type11 = Extract<'a' | 'b' | 'c', 'c' | 'b'> // 'c' | 'b'

// NonNullable<T>
// 从 T 中 去掉 null 和 undefined
type Type12 = NonNullable<string | number | null | undefined> // string | number

// ReturnType<T>
// 获取函数返回值类型
type Type13 = ReturnType<() => string> // string
type Type13 = ReturnType<() => void> // void

// InstanceType<T>
// 获取构造类型的实例类型
class A {
    constructor() {}
}
type T1 = InstanceType<typeof A> // A
type T2 = InstanceType<any> // any
type T3 = InstanceType<never> // never
type T4 = InstanceType<string> // 报错 string 不满足 new(...args: any[]) => any （不是构造函数类型）

```