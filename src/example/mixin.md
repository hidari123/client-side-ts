# 混入

## es6 对象混入
```js
let a = {
    a: 'a'
}
let b = {
    b: 'b'
}
Object.assign(a, b)
// {a: 'a', b: 'b'}
// a => {a: 'a', b: 'b'}
// b => { b: 'b' }
```