import formidable = require('formidable')
import path = require('path')
const { IncomingForm } = require('formidable')

export = function (req): Promise<formidable.File> {
    return new Promise ((resolve, reject) => {
        const form = new IncomingForm()
        form.encoding = 'utf-8'
        form.uploadDir = path.join(__dirname, '../files/')
        form.keepExtensions = true
        form.parse(req, (err, fields, files) => {
            const { file } = files
            if (!err) resolve(file)
            else reject(err)
        })
    })
}