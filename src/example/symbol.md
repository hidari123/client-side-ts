# symbol

## 创建

```ts
const s1 = Symbol()
const s2 = Symbol()
console.log(s1 === s2) // false

const s3 = Symbol('hidari')
const s4 = Symbol('hidari')
console.log(s3 === s4) // false

// 可以是 string 类型 或者 number 类型
const s = symbol(string | number)
```

## symbol 属性名
```ts
// 属性名
let prop = 'name'
const info = {
    // name: 'hidari'
    // [prop] : 'hidari'
    [`my${prop}is`] : 'hidari'
}

// symbol 属性名书写格式
const s5 = Symbol('name')
const info2 = {
    [s5]: 'hidari', // 保证不被别的属性或变量名覆盖
    age: 3,
    sex: 'woman'
}
info2[s5] = 'jiajia' // 可以修改
// info2.s5 = 'jiajia' // 不可以修改
```

## symbol 属性名遍历
```ts
// 打印出来都没有 Symbol值
for (const key in info2) {
    console.log(key)
}
console.log(Object.keys(info2))
console.log(Object.getOwnPropertyNames(info2))
console.log(JSON.stringify(info2))

// 返回所有 symbol 类型属性名
console.log(Object.getOwnPropertySymbols(info2))
// 返回所有类型属性名
console.log(Reflect.ownKeys(info2))
```

## symbol 静态方法
```ts
// Symbol.for() 先去找全局范围是否存在同名属性值 如果不存在则新建一个
const s6 = Symbol.for('hidari') 
const s7 = Symbol.for('hidari')
console.log(s6 === s7) // true

Symbol.keyFor() // 获取Symbol.for()在全局范围注册的属性的标识
console.log(Symbol.keyFor(s6)) // hidari
```

## 11个内置的 Symbol 值
```ts

/**
 * 1. 
 */
Symbol.hasInsance 
// 使用 instanceof 的时候调用
// instanceof 看一个对象是不是另外一个 对象 创建的实例

/**
 * 2. 
 */
Symbol.isConcatSpreadable // 一个数组会不会被扁平化
// 正常 concat
let arr = [1, 2]
console.log([].concat(arr, [3,4])) // [1,2,3,4]
// 此时 Symbol.isConcatSpreadable 值为 undefined
// 设置 Symbol.isConcatSpreadable 为 false
arr[Symbol.isConcatSpreadable] = false
console.log([].concat(arr, [3,4])) // [Array(2),3,4]
// 此时 Symbol.isConcatSpreadable 值为 false

/**
 * 3. 
 */
Symbol.species // 指定创建衍生对象的构造函数
class C extends Array {
    constructor (...args) {
        super(...args)
    }
    static get [Symbol.species] () {
        return Array
    }
    getName () {
        return 'hidari'
    }
}
const c = new C[1,2,3]
const a = c.map(item => item + 1)
console,log(a) // [2,3,4]
console.log(a instanceof C)  // false => ES6 和 TS 相同
console.log(a instanceof Array) // true

// 去掉 Symbol.species
class C extends Array {
    constructor (...args) {
        super(...args)
    }
    getName () {
        return 'hidari'
    }
}
const c = new C[1,2,3]
const a = c.map(item => item + 1)
console,log(a) // [2,3,4]
console.log(a instanceof C)  // TS中：false ES6中：true
console.log(a instanceof Array) // true

/**
 * 4. 
 */
Symbol.match // 在一个字符串上调用 match 方法时调用此方法
// 可以用这个方法在调用 match 时做一些计算
Symbol.replace
Symbol.search
Symbol.split
// 用法同上

/**
 * 5. 
 */
Symbol.iterator // 数组属性 设置默认遍历器方法

/**
 * 6. 
 */
Symbol.toPrimitive // 对象被转为原始类型会调用这个方法
Symbol.toStringTag // 对象调用 toString 时调用

/**
 * 7. 
 */
Symbol.unscopables // 指定对象的哪些属性无法被with获取到
```