# 装饰器
```JSON
"experimentalDecorators": true // 打开装饰器
```
1. 装饰器用`@`修饰，写在定义的函数后面
2. 装饰器工厂返回一个函数，用`@function()`使用装饰器
3. 同一个目标可以使用多个装饰器，普通装饰器从后往前调用，都是装饰器工厂，从上往下求值，求值返回函数作为装饰器，从后往前依次调用

## 类装饰器
```ts
// 定义两个装饰器工厂
function setName() {
    console.log('get setName')
    return (target) => {
        console.log('setName')
    }
}
function setAge() {
    console.log('get setAge')
    return (target) => {
        console.log('setAge')
    }
}
@setName()
@setAge()
/**
 * 输出：
 * get setName 从前往后求值
 * get setAge
 * setAge  从后往前调用
 * setName
 */
class classDec {}
```

```ts
// 定义装饰器工厂
let sign = null
function setName(name: string) {
    return (target: new() => any) => {
        sign = target
        console.log(target.name)
    }
}
@setName('hidari')
class ClassDec {
    constructor ()
}
console.log(sign === ClassDec) // true
console.log(sign === ClassDec.prototype.constructor) //true
```

### 通过装饰器修改类的原型对象和构造函数
```ts
// 通过装饰器修改类的原型对象和构造函数
function addName(constructor: new() => any) {
    constructor.prototype.name = 'hidari'
}
@addName
class ClassA {}
interface ClassA {
    name: string
}
// 通过设定同名接口，把name添加到类的原型对象
// 可以用 a.name 取到
const a = new ClassA()
console.log(a.name)
```

### 通过装饰器求改类的操作
```ts
// 通过装饰器求改类的操作
function classDecorator<T extends { new(...args: any[]): {} }>(target: T) {
    // 返回一个类 继承被修饰的类
    return class extends target {
        public newProperty = 'new property'
        public hello = 'override'
    }
}
// 装饰器返回的类的构造函数替换被装饰的类的声明
@classDecorator()
class Greeter {
    public property = 'property'
    public hello: string
    constructor(m: string) {
        this.hello = m
    }
}
console.log(new Greeter('world'))
/**
 * 既包含原来的内容又包含装饰器里的内容，使用新的类替换原来的类，Greeter 包含两个类里面声明的所有东西
 * hello: 'override'
 * newProperty: 'new property'
 * property: 'property'
 */

// 如果不继承
function classDecorator(target: any): any {
    return class {
        public newProperty = 'new property'
        public hello = 'override'
    }
}
@classDecorator()
class Greeter {
    public property = 'property'
    public hello: string
    constructor(m: string) {
        this.hello = m
    }
}
console.log(new Greeter('world'))
/**
 * 只包含装饰器里面的类替换原来的类，没有继承
 * hello: 'override'
 * newProperty: 'new property'
 */
```

## 方法装饰器
方法装饰器可以处理方法的属性描述符，方法的定义，运行时当作函数调用，包含三个参数
1. 装饰静态函数 => 代表类的构造函数，装饰实例成员 => 类的实例对象
2. 成员名字
3. 成员属性描述符`configurable`可配置，`writable`可写，`enumerable`可枚举
```js
// es6 中 属性描述符
interface ObjWithAnyKeys {
    [key: string]: any
}
let obj: ObjWithAnyKeys = {
    age: 18
}
Object.defineProperty(obj, 'name', {
    value: 'hidari',
    writable: false,
    configurable: false,
    enumerable: false
})
Object.defineProperty(obj, 'name', {
    value: 'hidari',
    writable: true // 报错 因为 configurable: false，设置不可配置
})
console.log(obj.name)
obj.name = 'test'
console.log(obj.name) // 没有打印出东西，设置不可写
for (const key in obj) {
    console.log(key) // age (没有设置属性描述符，定义可读可写可配置可枚举),enumerable 为 false，无法遍历出 name 属性
    // enumerable 设置为 true 后： age, name
}

// 不支持 es5 的浏览器 不能使用 属性描述符
function enumerable(bool: boolean) {
    return (target: any, propertyName: string, descriptor: PropertyDesctiptor) => {
        // 修饰静态函数 => 类的构造函数
        console.log(target)
        // 修改属性描述符
        descriptor.enumerable = bool
    }
}
class ClassB {
    constructor (public age: number) {}
    @enumerable(false) // 不可枚举
    public getAge() {
        // 继承的被修饰的 getAge 作为 ClassB 的构造函数
        return this.age
    }
}
const classB = new ClassB(18)
for (const key in classB) {
    console.log(key) // age (getAge不可枚举)
}

function enumerable(bool: boolean): any {
    return (target: any, propertyName: string, descriptor: PropertyDesctiptor) => {
        return {
            value: function () {
                return 'not age'
            }
            enumerable: bool
        }
    }
}
class ClassB {
    constructor (public age: number) {}
    @enumerable(false) // 不可枚举
    public getAge() {
        // 继承的被修饰的 getAge 作为 ClassB 的构造函数
        return this.age
    }
}
const classB = new ClassB(18)
console.log(classB.getAge())  // not age 修饰器替换原来的值
for (const key in classB) {
    console.log(key) // age (getAge不可枚举)
}
```

## 访问器装饰器
在 `get()` `set()` 前面使用一个装饰器整体，不可同时设置两个
```ts
function enumerable(bool: boolean) {
    return (target: any, propertyName: string, descriptor: PropertyDesctiptor) => {
        descriptor.enumerable = bool
    }
}
class ClassC {
    private _name: string
    constructor(name: string) {
        this._name = name
    }
    @enumerable(false)
    get name() {
        return this._name
    }
    set name(name) {
        this._name = name
    }
}
const classC = new ClassC('hidari')
for (const key in classC) {
    console.log(key) // _name
    // 去掉装饰器 @enumerable(false)
    // => _name, name
    // @enumerable(true)
    // => _name, name
}
```

## 属性装饰器
1. 装饰静态函数 => 代表类的构造函数，装饰实例成员 => 类的实例对象
2. 成员名字
无法操作属性的属性描述符，只能判断某个类中是否声明了某个名字的属性
```ts
function printPropertyName (target: any, propertyName: string) {
    console.log(propertyName)
}
class ClassD {
    @printPropertyName
    // name
    public name: string
}
```

## 参数装饰器
1. 装饰静态函数 => 代表类的构造函数，装饰实例成员 => 类的实例对象
2. 成员名字
3. 参数在函数参数列表中的索引
4. 返回值会被忽略
```ts
function required(target: any, propertyName: string, index: number) {
    console.log(`修饰的是${propertyName}的第${index + 1}个参数`)
}
class ClassE {
    public name: string = 'hidari'
    public age: number = 18
    // infoType 前使用装饰器
    public getInfo(prefix: string, @required infoType: string): any {
        return prefix + ' ' + this[infoType]
    }
}
interface ClassE {
    [key: string]: string | number | Function
}
const classE = new ClassE()
classE.getInfo('hihi', 'age')
// 修饰的是 getInfo 的第2个参数
```