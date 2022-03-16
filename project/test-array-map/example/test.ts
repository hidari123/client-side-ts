import arrayMap = require('../dist/hidari-array-map');
console.log(arrayMap([1,2], (item) => {
    return item + 2
})
)