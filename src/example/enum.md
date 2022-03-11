# 枚举

## 数字枚举
```ts
enum Status {
    Uploading, // 0
    Success,  // 1
    Failed  // 2
}
Status('Uploacing')
Status.Uploading

// 如果某个字段使用了计算值或者常量 那么该字段后面紧接着的字段必须设置初始值
const test = 1
const getIndex = () => {
    return 2
}
enum Status {
    Uploading = test, // 1
    Success = getIndex(),  // 2
    Failed = 5  // 5 必须设置
}
```

## 字符串枚举
```ts
// 字符串枚举要求每个字段的值必须是字符串自变量
// 或者是该枚举值中另一个字符串枚举成员
enum Message {
    Error = 'Error', // 自变量常量
    Success = 'Success',
    Failed = Error // 同一个枚举值中另一个枚举成员
}
```

## 异构枚举
```ts
enum Result {
    Failed = 0,
    Success = 'success'
}
```

## 枚举成员类型 & 联合枚举类型
1. 不带初始值的枚举成员
    1. `enum E { A }`
    2. `enum E { A = 'a' }`
    3. ` enum E { A = 1 } `
    枚举值中所有成员满足以上三种情况中的一个 这个枚举值或者它的成员 就可以作为类型来使用
```ts
enum Animals {
    Dog = 1,
    Cat = 2
}
interface Dog {
    type: Animals.Dog
}
const dog: Dog = {
    type: 1 // 成功
    type: Animals.Dog // 成功
    type: Animals.Cat // 失败
}
```
2. 当枚举值中所有成员满足以上三种情况之一，这个枚举值是一个联合枚举类型
    相当于`string | number`
```ts
enum Status {
    Off,
    On
}
interface Ligin {
    Status: Status
}
const light: Ligin = {
    status: Off // 可以
    status: On // 可以
    status: Animals.Dog // 报错
}
```

## const 修饰
```ts
const enum Animals {
    // 把枚举值编译成一个js中真实存在的对象
}
```