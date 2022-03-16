const arrayMap = <T, U>(array: T[], callback: (item: T, i: number, array: ReadonlyArray<T>) => U): U[] => {
    let i = -1
    const len = array.length
    const resArray = []
    while( ++i < len ) {
        resArray.push(callback(array[i], i, array))
    }
    return resArray
}
export = arrayMap