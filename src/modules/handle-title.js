function setTitle(title) {
    document && (document.title = title) // document为真才会执行下面语句
}

function getTitle() {
    return document ? document.title : ''
}

let documentTitle = getTitle()