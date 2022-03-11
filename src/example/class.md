# 类

## get & set 存取器
可以直接作为属性调用
```js
class MyClass {
	constructor() {
		// ...
	}
	get prop() {
		return 'getter';
	}
	set prop(value) {
		console.log('setter: ' + value);
	}
}
let inst = new MyClass();
inst.prop = 123;
// setter: 123
inst.prop
	// 'getter'
```
```js
// set 和 get 相当于 创建一个属性（activeToBoolean）让Class中某一个属性（active）进行一些规则转化

// 在一些项目中，如果一个字段，后端只返回0或1的时候，但是你业务逻辑中要将0和1对应转换成true或者false的时候，如果直接转的话，保存的时候转后端又要写一次，非常麻烦。
export class Person {
  public active = 0 // 用户状态是不是激活 1是激活,0是没有

  public constructor(obj?: object) {
    Object.assign(this, obj)
  }
  public get activeToBoolean(): boolean {
    return this.active === 1
  }

  public set activeToBoolean(val: boolean) {
    this.active = val ? 1 : 0
  }
}

// 用的时候直接用它的实例
const p = new Person({ active: 1 })
console.log(p.activeToBoolean) // 输出 true
p.active = 0
console.log(p.activeToBoolean) // 输出 false

p.activeToBoolean = true
console.log(p.active) // 1
```

## 继承
1. 继承时 `this`方法指代的是子类对象
2. 子类的`__proto__`指向父类本身
3. 子类的`prototype`属性的`__proto__`指向父类的`prototype`属性
4. 实例的`__proto__`属性的`__proto__`指向父类实例的`__proto__`
5. ES5 先创建 子类实例对象 `this` ，再将父类创造的属性，方法添加到`this`上
   ES6 先从 父类 取到实例对象`this`，再调用`super`函数，将子类的函数方法加到`this`上，所以要先调用`super`方法，再用 `this`

## super
1. `super`作为函数
```js
// 代表父类的 constructor
class Parent {
    constructor (name) {
        this.name = name
    }
    getName () {
        return this.name
    }
    static getNames () {
        return this.name
    }
}

// 继承可以继承到 constructor构造函数 方法 和 静态方法
// 子类的构造函数中必须调用一次 super函数 没有参数可以不写参数 super()
// 继承得到的 this 添加的东西会添加到子类的实例上
class Child extends Parent {
    constructor (name, age) {
        super (name)
        this.age = age
    }
}
```
2. `super`作为函数
```js
// 普通方法中 => 父类的原型对象
class Parent {
    constructor () {
        this.type = 'paerent'
    }
    getName () {
        return this.type
    }
}
Parent.getType = () => {
    return 'is parent'
}
class child extends Parent {
    constructor () {
        super ()
        console.log('constructor' + super.getName())
    }
    getParentName () {
        console.log('getParentName' + super.getName())
    }
    getParentType () {
        console.log('getParentType' + super.getType())
    }
}
// 会报错 因为 getType 是 Parent 本身定义的方法
// super 在 普通方法 getParentName 中 指代的是 父类的原型对象 取不到 父类本身定义的方法
c.getParentType()
```
```js
// 静态方法中 => 父类
class child extends Parent {
    constructor () {
        super ()
        console.log('constructor' + super.getName())
    }
    static getParentType () {
        console.log('getParentType' + super.getType())
    }
}
// 可正常打印
child.getParentType()
```

## 属性修饰符
1. `public`都可以访问
2. `private`私有的，只能内部调用
3. 1. `protected`子类可以调用父类的`protected`修饰的方法，
   2.  不能调用父类`protected`修饰的属性；
   3. `protected`修饰`constructor`，这个类不能再创建实例，只能被继承
4. `readonly`
5. 在`参数`前加上`访问限定符`，既可以指定属性是什么类型，又可以把这个属性放到实例上

## 静态属性
```ts
class Parent {
    public static age: number = 18
    public static getAge() {
        return Parent.age
    }
    constructor () {}
}
const p = new Parent()
// age 是 Parent 的一个静态属性，不能通过实例访问
console.log(p.age) // 报错
console.log(Parent.age) // 正常
```

## 抽象类
1. 不能直接创建实例，只能被类继承
2. 抽象方法和抽象存取器都不能包含实际的代码块，存值器不能包含返回值的类型
```ts
abstract class People {
    public abstract _name: string
    abstract get insideName(): string
    abstract set insideName(value: string)
}
class P extends People {
    public _name: string
    public insideName: string
}
```

## 接口
```ts
interface FoodInteface {
    type: string
}
class FoodClass implements FoodInterface {
    public type: string
}
class FoodClass implements FoodInterface {
    // static 静态属性 访问的时候只能通过类本身来访问 实例上不会有 type 属性
    // 接口检测的是使用该接口定义的类创建的实例 实例上没有就会报错
    public static type: string // 报错
}
```
```ts
// 接口继承类
class A {
    protected name: string
}
interface I extends A {}
class B implements I {
    // protected 只能在继承这个类的子类中访问
    // B 不是继承的 A 无法使用 name 属性
    public name: string // 报错
}
// 需要继承
class B extends A implements I {
    public name: string // 不报错
}
```