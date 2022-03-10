# 基础类型赋值
```
let 变量名:变量类型

const 变量名:变量类型 = 初始化的值
```

## 数组类型
```ts
//指定一个数组的内容既可以是number或者string

let arr1 = (string | number)[]

let arr2 = Array<string | number>
```

## 元组类型 tuple
```ts
//定义与赋值的需要一一对应

let tuple = [string, number, boolean]

tuple = ['aa', 1, false]
```

## 枚举类型
```ts
enum Roles {

    SUMPER_ADMIN = 1, ADMIN, USER

}
```

## 灵活类型
```ts
let value:any

value=123

value="aaa"

let anyArr :(any)[]=[1,'aa']
```

## void类型
```ts
// void类型 void类型像是与any类型相反，

表示没有任何类型，当一个函数没有返回值时，通常会见到其返回值类型是 void：

const consoleText = (text: string): void => {

    console.log(text);

}
```

##  never 类型
```ts
//永不存在的值的类型

const errorFunc = (message: string): never => {

    throw new Error(message);

}

const infinteFunc = (): never => {

    while (true) { }

}
```

## 类型断言

```js
//js写法

const getLength = target => {

    if (target.length || target.length == 0) {

        return target.length

    } else {

        return target.toString().length

    }

}
```

```ts
//ts类型断言

const tsGetLength = (target: string | number): number => {

    if ((<string>target).length || (target as string).length == 0) {

        return (target as string).length

    } else {

        return target.toString().length

    }

}

let tsetleng: number

tsetleng = tsGetLength('1234567dd890')

console.log(tsetleng, "tsetleng")
```
