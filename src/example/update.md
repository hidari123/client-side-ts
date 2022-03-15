# TS标准更新

## promise
### ES6 中写法
```js
function getIndex(bool) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(1)
            if (bool) {
                resolve('a')
            } else {
                reject(Error('error'))
            }
        }, 1000)
    })
}
getIndex(true).then(res => {
    console.log(res)
}).catch(error => {
    console.log(error)
})

// async await
async function asyncFunc() {
    try {
        const res = await getIndex(true)
        console.log(res)
    }.catch (error) {
        console.log(error)
    }
}
asyncFunc()
```
### TS 中写法
```ts
interface Res {
    data: {
        [key: string]: any
    }
}
namespace axios {
    export function post(url: string, config: object): Promise<Res> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let res: Res = { data: {} }
                if (url === '/login') res.data.user_id = 111
                else { res.data.role = 'admin' }
                console.log(2)
                resolve(res)
            }, 1000)
        })
    }
}
interface Info {
    user_name: string
    password: string
}
async function loginReq({user_name, password}: Info) {
    try {
        cosole.log(1)
        const res = await axios.post('/login', {
            data: {
                user_name,
                password
            }
        })
        console.log(3)
        return res
    } catch (error) {
        throw new Error(error)
    }
}
async function getRoleReq(user_id: number) {
    try {
        const res = await axios.post('/user_roles', {
            data: {
                user_id
            }
        })
        return res
    } catch (error) {
        throw new Error(error)
    }
}
loginReq({ user_name: 'hidari', password: '111' }).then(res => {
    const { data: { user_id } } = res
    getRoleReq(user_id).then(res => {
        const { data: { role }} = res
        cosole.log(role)
    })
})
// 1 2 3 2
```

## 动态引入表达式
```ts
async function getTime(format: string) {
    const moment = await import('moment')
    return moment.default().format(format)
}
getTime('L').then(res => {
    console.log(res)
})
```

## 弱类型探测
任何包含可选属性的值都是弱类型，如果值的属性和弱类型的值没有任何重叠，就会报错
```ts
interface ObjIn {
    name?: string
    age?: string
}
let objIn = {
    sex = 'man'
}
function printInfo(info: objIn) {
    console.log(info)
}
printInfo(info) // 报错
printInfo(info as ObjIn) // 使用类型断言 成功
```

## 拓展运算符
```ts
function mergeOptions<T, U extends string>(op1: T, op2: U) {
    return { ...op1, op2 }
    // 如果属性名和属性值相同可以简写
    // 相当于 => return { ...op1, op2: op2 }
}
console.log(mergeOptions({ a:'a' }, 'name'))
// { a: 'a', op2: 'name'}

// 从泛型变量中解析 rest 结果
function getExcludeProp<T extends { props: string }>(obj: T) {
    let { props, ...rest } = obj
    // 除了 props 之外 剩余属性组成的对象
    return rest
}
const objInfo = {
    props: 'something',
    name: 'hidari',
    age: 18
}
console.log(getExcludeProp(objInfo))
// { name: 'hidari', age: 18 }
```