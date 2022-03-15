# 混入

## 对象混入

## es6 对象混入
```js
let a = {
    a: 'a'
}
let b = {
    b: 'b'
}
Object.assign(a, b)
// 把 b 混入 a
// a => {a: 'a', b: 'b'}
// b => { b: 'b' }
```

## TS 对象混入
```ts
interface ObjectA {
    a: string
}
interface ObjectB {
    b: string
}
let a: ObjectA = {
    a: 'a'
}
let b: ObjectB = {
    b: 'b'
}
let ab = Object.assign(a, b)
console.log(ab) // 类型 => 交叉类型 let ab = ObjectA & ObjectB，包含两个Obj的特性
// 打印结果 => {a: 'a', b: 'b'}
```

## 类的混入

### es6 类的混入
```js
class A {
    funcA () {
        console.log('here')
    }
}
class B {
    funcB () {
    }
}
const mixin = (target, from) => {
    // Object.getOwnPropertyNames 获取对象自身的属性，除去继承的属性
    Object.getOwnPropertyNames(from).forEach(key => {
        console.log(key)
        target[key] = from[key]
    })
}
mixin(B.prototype, A.prototype)
const b = new B()
// 包含 funcA 和 funcB
```

### TS 类的混入
```ts
class A {
    public isA: boolean
    public funcA() {}
}
class B {
    public isB: boolean
    public funcB() {}
}
class AB implements A, B {
    constructor() {}
    isA: boolean = false
    isB: boolean = false
    public funcA: () => void
    public funcB: () => void
    constructor() {}
}
function mixins(base: any, from: amy[]) {
    from.forEach(fromItem => {
        Object.getOwnPropertyNames(fromItem.prototype).forEach(key => {
            console.log(key)
            base.prototype[key] = formItem.prototype[key]
        })
    })
}
mixins(AB, [A, B]) // constructor, funcA, constructor, funcB
const ab = new ClassAB()
console.log(ab)
```